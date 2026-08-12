import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import { GoogleGenAI, Type } from "@google/genai";

/**
 * This server is a thin BFF, not a data store.
 *
 * Everything under /api is proxied to the .NET GTsPortal API, which owns the
 * PostgreSQL database. The only routes handled locally are /api/ai/*, because the
 * Gemini API key must stay server-side and never reach the browser.
 *
 * It previously served in-memory mock data for sessions, materials, quizzes, notes
 * and discussions, which is why the UI never reflected the real database.
 */

// Where the .NET API lives. In Railway, set this to the API service's internal URL.
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. Gemini AI features will return graceful fallback responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

async function startServer() {
  const app = express();
  const requestedPort = Number(process.env.PORT || 3000);
  const PORT = Number.isInteger(requestedPort) && requestedPort > 0 ? requestedPort : 3000;

  const listenOnPort = (port: number) => new Promise<number>((resolve, reject) => {
    const server = app.listen(port, '0.0.0.0', () => resolve(port));
    server.on('error', (err: any) => reject(err));
  });

  // --- LOCAL AI ROUTES ---
  // JSON parsing is scoped to these routes only. Applying it globally would consume
  // the request body before the proxy could forward it, breaking every POST and PUT.
  const ai = express.Router();
  ai.use(express.json({ limit: '10mb' }));

  ai.get("/health", (_req, res) => {
    res.json({ status: "ok", apiBaseUrl: API_BASE_URL, timestamp: new Date().toISOString() });
  });

  // AI Chat Tutor
  ai.post("/chat", async (req, res) => {
    const { message, context } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.json({
        reply: `[AI Assistant Mode]: As your Graduate Trainee mentor for "${context?.sessionName || 'the portal'}", here is an answer to your question: "${message}". \n\nKey Concept Breakdown:\n1. Ensure strict type signatures in C# and TypeScript.\n2. Handle exception boundaries with Global Exception Middleware or try-catch blocks.\n3. Always write unit tests before pushing code to production.`
      });
    }

    try {
      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          {
            role: 'user',
            parts: [{
              text: `Context: You are an enterprise L&D AI Tutor for Graduate Trainees (GTs).
Session Context: ${JSON.stringify(context || {})}
User Query: ${message}`
            }]
          }
        ],
        config: {
          systemInstruction: "You are an encouraging, expert enterprise Technical Architect and L&D Mentor. Provide clear, well-structured, production-grade answers with concise code examples in C#, SQL, TypeScript, or Azure where appropriate."
        }
      });

      res.json({ reply: response.text || "No response generated." });
    } catch (err: any) {
      console.error("Gemini AI Chat Error:", err);
      res.status(500).json({ error: "Failed to generate AI response", details: err.message });
    }
  });

  // AI Document / Notes Summarizer
  ai.post("/summarize", async (req, res) => {
    const { title, content } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.json({
        summary: `### AI Summary of ${title}\n\n- **Core Theme**: High performance enterprise system architecture.\n- **Key Takeaway**: Apply SOLID principles, proper indexing in SQL databases, and async/await non-blocking I/O.\n- **Action Item**: Review the code examples and complete the topic quiz.`
      });
    }

    try {
      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Summarize the following study material or note titled "${title}":\n\n${content}`,
        config: {
          systemInstruction: "Provide a concise executive summary with 3 key bullet points, a 2-sentence key takeaway, and 2 interview preparation questions based on this material."
        }
      });

      res.json({ summary: response.text });
    } catch (err: any) {
      res.status(500).json({ error: "Summarization failed", details: err.message });
    }
  });

  // AI Practice Quiz Generator
  ai.post("/generate-quiz", async (req, res) => {
    const { topicName, textContent } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.json({
        quizTitle: `AI Generated Practice Quiz: ${topicName || 'General Tech'}`,
        questions: [
          {
            id: `ai-q-1`,
            type: 'MCQ',
            prompt: `In ${topicName || 'software design'}, what is the primary purpose of Dependency Injection?`,
            options: [
              'To decouple high-level modules from low-level concrete implementations',
              'To speed up CPU clock cycles',
              'To encrypt database tables',
              'To automatically generate CSS styling'
            ],
            correctAnswer: 'To decouple high-level modules from low-level concrete implementations',
            explanation: 'Dependency Injection enforces the Dependency Inversion Principle, allowing flexible unit testing and swapping of implementations.'
          }
        ]
      });
    }

    try {
      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Generate 3 high quality multiple choice practice questions for GTs on the topic "${topicName}". Source Material: ${textContent || 'General enterprise topic'}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              quizTitle: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING, description: "Must be 'MCQ'" },
                    prompt: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ["id", "type", "prompt", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["quizTitle", "questions"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (err: any) {
      res.status(500).json({ error: "Quiz generation failed", details: err.message });
    }
  });

  app.use("/api/ai", ai);

  // --- PROXY EVERYTHING ELSE TO THE .NET API ---
  // pathFilter keeps the original /api prefix intact, which is what the .NET routes
  // expect ([Route("api/sessions")] and friends).
  app.use(
    createProxyMiddleware({
      target: API_BASE_URL,
      changeOrigin: true,
      pathFilter: (pathname) => pathname.startsWith('/api') && !pathname.startsWith('/api/ai'),
      on: {
        error: (err, _req, res) => {
          console.error(`[proxy] ${API_BASE_URL} unreachable:`, err.message);
          if (res && 'writeHead' in res && !res.headersSent) {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              message: 'The API is unavailable. Check that the .NET service is running and API_BASE_URL is correct.'
            }));
          }
        },
      },
    })
  );

  // Vite Middleware in Dev or Static Serve in Prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  let activePort = PORT;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      activePort = await listenOnPort(PORT + attempt);
      if (attempt > 0) {
        console.log(`Port ${PORT} was in use; started on fallback port ${activePort}.`);
      }
      break;
    } catch (err: any) {
      if (err?.code !== 'EADDRINUSE' || attempt === 4) {
        throw err;
      }
    }
  }

  console.log(`Server running on http://localhost:${activePort}`);
  console.log(`Proxying /api -> ${API_BASE_URL}`);
}

startServer();
