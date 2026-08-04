import React, { useState, useRef, useEffect } from 'react';
import { sendAiChatMessageApi } from '../services/api';
import { Bot, X, Send, Sparkles, Minimize2, Maximize2, FileText, HelpCircle, Code2, BookOpen, RefreshCw } from 'lucide-react';

interface AIAssistantProps {
  currentSessionName?: string;
  currentTopicTitle?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ currentSessionName, currentTopicTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am your AI Learning Assistant. I can explain complex technical concepts, summarize study materials, review code, or recommend interview prep questions for ${currentSessionName || 'your learning roadmap'}. How can I assist you today?`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await sendAiChatMessageApi(textToSend, {
        sessionName: currentSessionName,
        topicTitle: currentTopicTitle
      }, messages);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply || "I am processing your query based on enterprise L&D guidelines.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: "Apologies, I encountered a temporary connection issue. Please try again.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          onClick={() => setIsOpen(true)}
          className="relative p-[2.5px] rounded-full overflow-hidden shadow-[0_10px_35px_rgba(59,130,246,0.25)] hover:shadow-[0_14px_45px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:scale-[1.06] active:scale-95 cursor-pointer block"
          title="Open AI Learning Assistant"
          aria-label="Toggle AI Tutor"
          data-inspect-id="PrimaryButton"
        >
          {/* Relative Light Theme Gradient Border */}
          <div className="absolute -inset-[180%] bg-[conic-gradient(from_0deg,#2563eb,#3b82f6,#6366f1,#1d4ed8,#2563eb)] animate-spin-gradient opacity-90 group-hover:opacity-100 transition-opacity" />

          {/* Light Glassmorphic Pill Surface */}
          <div className="relative px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md flex items-center gap-2.5 border border-blue-400/60 text-slate-900 font-sans shadow-md hover:border-blue-600">
            <div className="relative flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Sparkles className="w-3.5 h-3.5 text-blue-600 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="flex flex-col text-left pr-1">
              <span className="font-extrabold text-xs tracking-wider text-blue-700 group-hover:text-blue-800 transition-all">
                AI TUTOR
              </span>
              <span className="text-[9px] text-slate-600 font-semibold leading-none tracking-tight">
                Enterprise Copilot
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 font-sans ${
        isMinimized ? 'w-80 h-16 overflow-hidden' : 'w-96 md:w-[420px] h-[580px]'
      }`}
    >
      {/* Header Bar */}
      <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 rounded-t-3xl flex items-center justify-between text-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 block leading-none">AI Learning Assistant</span>
            <span className="text-[10px] text-emerald-700 font-bold font-mono">Gemini 3.6 Flash • Active</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors hover:text-slate-900"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Preset Prompt Chips */}
          <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => handleSend("Explain SOLID Principles with C# examples")}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 font-semibold whitespace-nowrap border border-slate-200 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Code2 className="w-3 h-3 text-blue-600" />
              Explain SOLID
            </button>
            <button
              onClick={() => handleSend("Generate top 3 interview questions for ASP.NET Core")}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 font-semibold whitespace-nowrap border border-slate-200 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <HelpCircle className="w-3 h-3 text-amber-600" />
              Interview Prep
            </button>
            <button
              onClick={() => handleSend("What should I learn next after C# LINQ?")}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200 text-slate-700 font-semibold whitespace-nowrap border border-slate-200 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <BookOpen className="w-3 h-3 text-emerald-600" />
              Next Step
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-sans'
                  }`}
                >
                  {m.text}
                  <span className="block text-[9px] opacity-60 text-right mt-1.5 font-mono">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="text-xs italic font-medium">Gemini AI is crafting response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 rounded-b-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI tutor anything about learning materials..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition-colors shadow-md flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
