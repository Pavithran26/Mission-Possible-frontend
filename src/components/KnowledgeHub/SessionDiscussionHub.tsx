import React, { useState } from 'react';
import { 
  Session, 
  KnowledgeHubDiscussion, 
  KnowledgeHubDocument, 
  KnowledgeHubChatMessage, 
  User 
} from '../../types';
import { 
  MessageSquare, 
  FileText, 
  Radio, 
  Plus, 
  Upload, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  FileCode, 
  Hash, 
  ThumbsUp, 
  Search 
} from 'lucide-react';

interface SessionDiscussionHubProps {
  session: Session;
  discussions: KnowledgeHubDiscussion[];
  documents: KnowledgeHubDocument[];
  chatMessages: KnowledgeHubChatMessage[];
  currentUser: User;
  onOpenNewDiscussion: (topicId?: string) => void;
  onOpenNewDocument: (topicId?: string) => void;
  onSelectDiscussion: (discussion: KnowledgeHubDiscussion) => void;
  onSelectDocument: (doc: KnowledgeHubDocument) => void;
  onSendMessage: (channelId: string, topicId: string, content: string) => void;
}

export const SessionDiscussionHub: React.FC<SessionDiscussionHubProps> = ({
  session,
  discussions,
  documents,
  chatMessages,
  currentUser,
  onOpenNewDiscussion,
  onOpenNewDocument,
  onSelectDiscussion,
  onSelectDocument,
  onSendMessage
}) => {
  const [subTab, setSubTab] = useState<'questions' | 'documents' | 'chat'>('questions');
  const [sessionChatMessage, setSessionChatMessage] = useState('');

  // Session-specific filtered items
  const sessionDiscussions = discussions.filter(d => d.sessionId === session.id || d.topicName.toLowerCase().includes(session.category.toLowerCase()));
  const sessionDocuments = documents.filter(doc => doc.sessionId === session.id || doc.topicName.toLowerCase().includes(session.category.toLowerCase()));
  const sessionChats = chatMessages;

  const handleSendSessionChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionChatMessage.trim()) return;
    onSendMessage('chan-csharp-memory', 'topic-csharp', `[Session: ${session.name}] ${sessionChatMessage}`);
    setSessionChatMessage('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm animate-fadeIn">
      
      {/* Session Knowledge Hub Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Knowledge Hub ⭐ Session Integration
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">Category: {session.category}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {session.name} Discussion Hub
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Discuss questions, upload session notes, and chat live with peers and mentors enrolled in this session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenNewDiscussion()}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ask Question</span>
          </button>
          <button
            onClick={() => onOpenNewDocument()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-600" />
            <span>Upload Notes</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-2 w-fit">
        <button
          onClick={() => setSubTab('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'questions' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Session Questions ({sessionDiscussions.length})</span>
        </button>

        <button
          onClick={() => setSubTab('documents')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'documents' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Session Documents ({sessionDocuments.length})</span>
        </button>

        <button
          onClick={() => setSubTab('chat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'chat' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Radio className="w-4 h-4 text-amber-500" />
          <span>Session Live Chat (56 Messages)</span>
        </button>
      </div>

      {/* Questions Tab */}
      {subTab === 'questions' && (
        <div className="space-y-3">
          {sessionDiscussions.length === 0 ? (
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="text-xs font-bold text-slate-700">No session-specific questions asked yet.</p>
              <button
                onClick={() => onOpenNewDiscussion()}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ask First Question</span>
              </button>
            </div>
          ) : (
            sessionDiscussions.map((disc) => (
              <div
                key={disc.id}
                onClick={() => onSelectDiscussion(disc)}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-blue-400 cursor-pointer space-y-2 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {disc.state}
                  </span>
                  <span className="text-slate-500 font-mono text-[10px]">{disc.createdAt}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 hover:text-blue-700 transition-colors">{disc.title}</h4>
                <p className="text-slate-600 text-xs line-clamp-1">{disc.description}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Documents Tab */}
      {subTab === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sessionDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-blue-400 cursor-pointer space-y-2 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px] font-bold">
                  {doc.fileType} • {doc.version}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">{doc.fileSize}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1 hover:text-blue-700 transition-colors">{doc.name}</h4>
              <p className="text-slate-600 text-xs line-clamp-1">{doc.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Live Chat Tab */}
      {subTab === 'chat' && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-h-64 overflow-y-auto space-y-3">
            {sessionChats.map((msg) => (
              <div key={msg.id} className="text-xs space-y-1 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-blue-700">{msg.authorName} ({msg.authorRole})</span>
                  <span className="text-slate-500 font-mono text-[10px]">{msg.timestamp}</span>
                </div>
                <p className="text-slate-800">{msg.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendSessionChat} className="flex items-center gap-2">
            <input
              type="text"
              value={sessionChatMessage}
              onChange={(e) => setSessionChatMessage(e.target.value)}
              placeholder={`Type a real-time message for ${session.name}...`}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
