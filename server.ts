import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import {
  mockSessions,
  mockStudyMaterials,
  mockQuizzes,
  mockAnnouncements,
  mockNotifications,
  mockCurrentUser,
  mockPersonalNotes,
  mockDiscussions,
  mockBadges,
  mockCertificates
} from "./src/data/mockData";
import { Session, StudyMaterial, Quiz, PersonalNote, DiscussionPost } from "./src/types";

// In-memory persistent database state for dev session
let sessions: Session[] = [...mockSessions];
let studyMaterials: StudyMaterial[] = [...mockStudyMaterials];
let quizzes: Quiz[] = [...mockQuizzes];
let personalNotes: PersonalNote[] = [...mockPersonalNotes];
let discussions: DiscussionPost[] = [...mockDiscussions];
let notifications = [...mockNotifications];
let currentUser = { ...mockCurrentUser };

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
  const PORT = requestedPort;

  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES ---
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // User Profile
  app.get("/api/user", (req, res) => {
    res.json(currentUser);
  });

  app.post("/api/user/goal", (req, res) => {
    const { dailyGoalMinutes } = req.body;
    if (typeof dailyGoalMinutes === 'number') {
      currentUser.dailyGoalMinutes = dailyGoalMinutes;
    }
    res.json(currentUser);
  });

  // Sessions CRUD
  app.get("/api/sessions", (req, res) => {
    res.json(sessions);
  });

  app.get("/api/sessions/:id", (req, res) => {
    const session = sessions.find(s => s.id === req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    const sessionMaterials = studyMaterials.filter(m => m.sessionId === session.id);
    const sessionQuizzes = quizzes.filter(q => q.sessionId === session.id);
    const sessionDiscussions = discussions.filter(d => d.sessionId === session.id);
    res.json({
      ...session,
      studyMaterials: sessionMaterials,
      quizzes: sessionQuizzes,
      discussions: sessionDiscussions
    });
  });

  app.post("/api/sessions", (req, res) => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      name: req.body.name || "New Learning Session",
      category: req.body.category || ".NET with C#",
      description: req.body.description || "Created by Admin L&D",
      thumbnail: req.body.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      durationHours: Number(req.body.durationHours) || 10,
      difficulty: req.body.difficulty || "Intermediate",
      progressPercent: 0,
      isPublished: req.body.isPublished ?? true,
      rating: 5.0,
      ratingCount: 1,
      learningObjectives: req.body.learningObjectives || ["Master key concepts"],
      topics: req.body.topics || []
    };
    sessions.unshift(newSession);
    res.status(201).json(newSession);
  });

  app.put("/api/sessions/:id", (req, res) => {
    const index = sessions.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Session not found" });
    sessions[index] = { ...sessions[index], ...req.body };
    res.json(sessions[index]);
  });

  app.delete("/api/sessions/:id", (req, res) => {
    sessions = sessions.filter(s => s.id !== req.params.id);
    studyMaterials = studyMaterials.filter(m => m.sessionId !== req.params.id);
    quizzes = quizzes.filter(q => q.sessionId !== req.params.id);
    res.json({ success: true, message: "Session deleted" });
  });

  app.post("/api/sessions/:id/bookmark", (req, res) => {
    const session = sessions.find(s => s.id === req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    session.isBookmarked = !session.isBookmarked;
    res.json({ id: session.id, isBookmarked: session.isBookmarked });
  });

  // Study Materials
  app.get("/api/materials", (req, res) => {
    res.json(studyMaterials);
  });

  app.post("/api/materials", (req, res) => {
    const newMat: StudyMaterial = {
      id: `mat-${Date.now()}`,
      sessionId: req.body.sessionId,
      topicId: req.body.topicId,
      title: req.body.title || "New Document",
      type: req.body.type || "PDF",
      url: req.body.url || "#",
      description: req.body.description || "",
      durationOrPages: req.body.durationOrPages || "10 Pages",
      currentVersion: 1.0,
      versions: [
        { version: 1.0, updatedAt: new Date().toISOString().split('T')[0], updatedBy: 'Admin L&D', changeLog: 'Initial upload' }
      ],
      contentBody: req.body.contentBody || "",
      tags: req.body.tags || ["General"]
    };
    studyMaterials.unshift(newMat);
    res.status(201).json(newMat);
  });

  app.post("/api/materials/:id/new-version", (req, res) => {
    const mat = studyMaterials.find(m => m.id === req.params.id);
    if (!mat) return res.status(404).json({ error: "Material not found" });
    const newVer = Number((mat.currentVersion + 0.1).toFixed(1));
    mat.currentVersion = newVer;
    mat.contentBody = req.body.contentBody || mat.contentBody;
    mat.versions.unshift({
      version: newVer,
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy: req.body.updatedBy || 'Admin L&D',
      changeLog: req.body.changeLog || 'Version update'
    });
    res.json(mat);
  });

  // Quizzes & Attempts
  app.get("/api/quizzes", (req, res) => {
    res.json(quizzes);
  });

  app.post("/api/quizzes", (req, res) => {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      sessionId: req.body.sessionId,
      title: req.body.title || "Custom Quiz",
      passingScorePercent: req.body.passingScorePercent || 80,
      timeLimitMinutes: req.body.timeLimitMinutes || 15,
      questions: req.body.questions || []
    };
    quizzes.push(newQuiz);
    res.status(201).json(newQuiz);
  });

  app.post("/api/quizzes/:id/submit", (req, res) => {
    const quiz = quizzes.find(q => q.id === req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    const { userAnswers, timeTakenSeconds } = req.body;

    let correctCount = 0;
    quiz.questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (Array.isArray(q.correctAnswer)) {
        if (Array.isArray(userAns) && userAns.sort().join(',') === q.correctAnswer.sort().join(',')) {
          correctCount++;
        }
      } else if (userAns && String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercent >= quiz.passingScorePercent;

    if (passed) {
      currentUser.xp += 150;
      if (typeof timeTakenSeconds === 'number' && !Number.isNaN(timeTakenSeconds)) {
        currentUser.todayMinutesSpent += Math.round(timeTakenSeconds / 60);
      }
    }

    res.json({
      quizId: quiz.id,
      scorePercent,
      correctCount,
      totalQuestions: quiz.questions.length,
      passed,
      timeTakenSeconds,
      explanations: quiz.questions.map(q => ({
        questionId: q.id,
        prompt: q.prompt,
        userAnswer: userAnswers[q.id],
        correctAnswer: q.correctAnswer,
        isCorrect: Array.isArray(q.correctAnswer)
          ? Array.isArray(userAnswers[q.id]) && userAnswers[q.id].sort().join(',') === q.correctAnswer.sort().join(',')
          : String(userAnswers[q.id]).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase(),
        explanation: q.explanation
      }))
    });
  });

  // Personal Notes
  app.get("/api/notes", (req, res) => {
    res.json(personalNotes);
  });

  app.post("/api/notes", (req, res) => {
    const note: PersonalNote = {
      id: `note-${Date.now()}`,
      sessionId: req.body.sessionId,
      topicId: req.body.topicId,
      topicTitle: req.body.topicTitle || "General Note",
      content: req.body.content,
      highlightedText: req.body.highlightedText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    personalNotes.unshift(note);
    res.status(201).json(note);
  });

  app.delete("/api/notes/:id", (req, res) => {
    personalNotes = personalNotes.filter(n => n.id !== req.params.id);
    res.json({ success: true });
  });

  // Discussions Q&A
  app.get("/api/discussions", (req, res) => {
    res.json(discussions);
  });

  app.post("/api/discussions", (req, res) => {
    const newPost: DiscussionPost = {
      id: `disc-${Date.now()}`,
      sessionId: req.body.sessionId,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      title: req.body.title,
      body: req.body.body,
      createdAt: 'Just now',
      upvotes: 0,
      replies: []
    };
    discussions.unshift(newPost);
    res.status(201).json(newPost);
  });

  app.post("/api/discussions/:id/reply", (req, res) => {
    const post = discussions.find(d => d.id === req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const reply = {
      id: `rep-${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      body: req.body.body,
      createdAt: 'Just now',
      isAnswer: req.body.isAnswer || false
    };
    post.replies.push(reply);
    res.json(post);
  });

  // Announcements & Notifications
  app.get("/api/announcements", (req, res) => {
    res.json(mockAnnouncements);
  });

  app.get("/api/notifications", (req, res) => {
    res.json(notifications);
  });

  app.post("/api/notifications/read-all", (req, res) => {
    notifications = notifications.map(n => ({ ...n, read: true }));
    res.json(notifications);
  });

  // Global Analytics
  app.get("/api/analytics", (req, res) => {
    res.json({
      totalSessions: sessions.length,
      totalGTs: 124,
      totalActiveUsers: 88,
      averageProgress: 68,
      averageQuizScore: 84,
      mostViewedSession: ".NET with C# Enterprise Architecture",
      leastViewedSession: "Azure Cloud Infrastructure",
      mostDifficultTopic: "Async Programming & Task Concurrency",
      completionTrends: [
        { month: 'Jan', completed: 24, avgScore: 78 },
        { month: 'Feb', completed: 35, avgScore: 81 },
        { month: 'Mar', completed: 48, avgScore: 82 },
        { month: 'Apr', completed: 62, avgScore: 85 },
        { month: 'May', completed: 79, avgScore: 84 },
        { month: 'Jun', completed: 95, avgScore: 88 }
      ],
      trackProgressList: [
        { name: 'Insurance Domain', progress: 65 },
        { name: '.NET with C#', progress: 80 },
        { name: 'Frontend React', progress: 95 },
        { name: 'SQL & Database', progress: 55 },
        { name: 'Azure Cloud', progress: 20 }
      ]
    });
  });

  // Search Endpoint
  app.get("/api/search", (req, res) => {
    const q = (req.query.q as string || "").toLowerCase();
    if (!q) return res.json({ sessions: [], materials: [], quizzes: [] });

    const matchedSessions = sessions.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );

    const matchedMaterials = studyMaterials.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedQuizzes = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(q) ||
      quiz.questions.some(quest => quest.prompt.toLowerCase().includes(q))
    );

    res.json({
      sessions: matchedSessions,
      materials: matchedMaterials,
      quizzes: matchedQuizzes
    });
  });

  // --- GEMINI AI ENDPOINTS ---

  // AI Chat Tutor
  app.post("/api/ai/chat", async (req, res) => {
    const { message, context, chatHistory } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `[AI Assistant Mode]: As your Graduate Trainee mentor for "${context?.sessionName || 'the portal'}", here is an answer to your question: "${message}". \n\nKey Concept Breakdown:\n1. Ensure strict type signatures in C# and TypeScript.\n2. Handle exception boundaries with Global Exception Middleware or try-catch blocks.\n3. Always write unit tests before pushing code to production.`
      });
    }

    try {
      const response = await ai.models.generateContent({
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
  app.post("/api/ai/summarize", async (req, res) => {
    const { title, content } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        summary: `### AI Summary of ${title}\n\n- **Core Theme**: High performance enterprise system architecture.\n- **Key Takeaway**: Apply SOLID principles, proper indexing in SQL databases, and async/await non-blocking I/O.\n- **Action Item**: Review the code examples and complete the topic quiz.`
      });
    }

    try {
      const response = await ai.models.generateContent({
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
  app.post("/api/ai/generate-quiz", async (req, res) => {
    const { topicName, textContent } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
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
      const response = await ai.models.generateContent({
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
