import React, { useState } from 'react';
import { 
  KnowledgeHubDiscussion, 
  KnowledgeHubDocument, 
  KnowledgeHubTopic 
} from '../../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  Search, 
  HelpCircle, 
  FileText, 
  Layers, 
  Code, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Flame,
  Lightbulb
} from 'lucide-react';

interface AiLearningCopilotPanelProps {
  discussions: KnowledgeHubDiscussion[];
  documents: KnowledgeHubDocument[];
  topics: KnowledgeHubTopic[];
  onSelectDiscussion: (discussion: KnowledgeHubDiscussion) => void;
  onSelectDocument: (doc: KnowledgeHubDocument) => void;
}

export const AiLearningCopilotPanel: React.FC<AiLearningCopilotPanelProps> = ({
  discussions,
  documents,
  topics,
  onSelectDiscussion,
  onSelectDocument
}) => {
  const [nlQuery, setNlQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryResult, setQueryResult] = useState<{
    text: string;
    suggestedDiscussions: KnowledgeHubDiscussion[];
    suggestedDocuments: KnowledgeHubDocument[];
    extractedFaqs?: { question: string; answer: string }[];
  } | null>(null);

  const sampleQueries = [
    'Show unanswered Azure questions',
    'Find React discussions related to state management',
    'Show documents about C# Memory Profiling & Async',
    'Extract FAQs from Security Runbook',
    'Detect duplicate SQL index questions'
  ];

  const handleQuerySubmit = (queryText: string) => {
    if (!queryText.trim()) return;

    setIsProcessing(true);
    setNlQuery(queryText);

    setTimeout(() => {
      const qLower = queryText.toLowerCase();

      let matchedDiscussions = discussions.filter(d => 
        d.title.toLowerCase().includes(qLower) ||
        d.description.toLowerCase().includes(qLower) ||
        d.tags.some(t => t.toLowerCase().includes(qLower)) ||
        d.topicName.toLowerCase().includes(qLower)
      );

      let matchedDocuments = documents.filter(doc => 
        doc.name.toLowerCase().includes(qLower) ||
        doc.description.toLowerCase().includes(qLower) ||
        doc.tags.some(t => t.toLowerCase().includes(qLower)) ||
        doc.topicName.toLowerCase().includes(qLower)
      );

      // Special cases for natural language queries
      if (qLower.includes('unanswered') || qLower.includes('azure')) {
        matchedDiscussions = discussions.filter(d => d.topicName === 'Azure' || d.state === 'Open' || d.state === 'In Progress');
      }
      if (qLower.includes('react') || qLower.includes('state')) {
        matchedDiscussions = discussions.filter(d => d.topicName === 'React');
      }
      if (qLower.includes('c#') || qLower.includes('memory') || qLower.includes('async')) {
        matchedDocuments = documents.filter(doc => doc.topicName === 'C#');
      }

      setQueryResult({
        text: `🤖 **AI Copilot Natural Language Insights for "${queryText}"**:\nFound ${matchedDiscussions.length} relevant community discussions and ${matchedDocuments.length} repository documents in Knowledge Hub. Below are top recommended items and AI summary insights.`,
        suggestedDiscussions: matchedDiscussions.slice(0, 3),
        suggestedDocuments: matchedDocuments.slice(0, 3),
        extractedFaqs: [
          { question: 'What is the primary cause of handle leaks in C# async streams?', answer: 'Not using IAsyncDisposable / await using when iterating over stream enumerators.' },
          { question: 'How to rotate Azure Key Vault secrets without restarting App Services?', answer: 'Use Azure App Configuration with Key Vault references and Sentinel cache refresh.' }
        ]
      });

      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-slate-900 border border-violet-500/30 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden">
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Learning Copilot • Gemini 3.6 Flash Engine</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Ask Anything in Natural Language Across Knowledge Hub
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Query discussions, analyze PDF manuals, summarize questions, extract FAQs, detect duplicate questions, or auto-generate code snippets instantly.
          </p>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400">Try Natural Queries:</span>
            {sampleQueries.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleQuerySubmit(chip)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-violet-600 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/80 hover:border-violet-500 transition-all shadow-sm"
              >
                "{chip}"
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Query Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleQuerySubmit(nlQuery); }}
          className="flex items-center gap-3"
        >
          <div className="relative flex-1">
            <Bot className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-violet-400" />
            <input
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="Ask AI Copilot (e.g. 'Show unanswered Azure questions' or 'Summarize C# memory guide')..."
              className="w-full bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-600/30 flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'AI Analyzing...' : 'Ask Copilot'}</span>
          </button>
        </form>
      </div>

      {/* Query Results View */}
      {queryResult && (
        <div className="space-y-6 animate-scaleUp">
          
          {/* AI Response Text Box */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-violet-500/30 space-y-3">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs">
              <Bot className="w-4 h-4" />
              <span>AI Copilot Analysis Result</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
              {queryResult.text}
            </p>
          </div>

          {/* Recommended Discussions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Recommended Community Discussions ({queryResult.suggestedDiscussions.length})</span>
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {queryResult.suggestedDiscussions.map((disc) => (
                <div
                  key={disc.id}
                  onClick={() => onSelectDiscussion(disc)}
                  className="bg-slate-900 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 cursor-pointer space-y-2 transition-all hover:scale-[1.005]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                      Topic: {disc.topicName}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">{disc.createdAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white hover:text-blue-400">{disc.title}</h4>
                  <p className="text-slate-400 text-xs line-clamp-1">{disc.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Documents */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Recommended Repository Documents ({queryResult.suggestedDocuments.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {queryResult.suggestedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onSelectDocument(doc)}
                  className="bg-slate-900 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 cursor-pointer space-y-2 transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                      {doc.fileType} • {doc.version}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">{doc.fileSize}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 hover:text-blue-400">{doc.name}</h4>
                  <p className="text-slate-400 text-xs line-clamp-1">{doc.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
