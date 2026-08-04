import React, { useState, useEffect, useMemo } from 'react';
import { Session, StudyMaterial } from '../types';
import { Search, X, BookOpen, FileText, ArrowRight, Layers, FolderOpen } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  onSelectSession: (sessionId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  sessions,
  onSelectSession
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Collect all study materials across sessions
  const allMaterials = useMemo(() => {
    const map = new Map<string, StudyMaterial>();
    sessions.forEach(s => {
      if (s.studyMaterials) {
        s.studyMaterials.forEach(m => map.set(m.id, m));
      }
    });
    return Array.from(map.values());
  }, [sessions]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingSessions = q.length > 0
    ? sessions.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.topics.some(t => t.title.toLowerCase().includes(q))
      )
    : sessions.slice(0, 4);

  const matchingDocs = q.length > 0
    ? allMaterials.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.tags && m.tags.some(t => t.toLowerCase().includes(q)))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-fadeIn space-y-2">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sessions, PDFs, PowerPoint slides, SQL, C# topics..."
            className="w-full bg-transparent text-white text-sm placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          
          {/* Sessions Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block px-2">
              {q ? `Matching Sessions (${matchingSessions.length})` : 'Recommended Learning Tracks'}
            </span>

            {matchingSessions.length === 0 && q ? (
              <div className="p-3 text-xs text-slate-500 font-mono px-2">No matching sessions</div>
            ) : (
              matchingSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                  className="p-3 hover:bg-slate-800 rounded-2xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white group-hover:text-blue-300 block">{session.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{session.category} • {session.durationHours} Hours</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 group-hover:text-blue-400">
                    <span className="text-[10px] font-mono">Open Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Study Materials & Documents Section */}
          {q.length > 0 && (
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block px-2">
                Matching Documents & Materials ({matchingDocs.length})
              </span>

              {matchingDocs.length === 0 ? (
                <div className="p-3 text-xs text-slate-500 font-mono px-2">No matching documents</div>
              ) : (
                matchingDocs.map((doc) => {
                  const parentSession = sessions.find(s => s.id === doc.sessionId);

                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        onSelectSession(doc.sessionId);
                        onClose();
                      }}
                      className="p-3 hover:bg-slate-800 rounded-2xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-white group-hover:text-purple-300 block">{doc.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {doc.type} {parentSession ? `• Session: ${parentSession.name}` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 group-hover:text-purple-400">
                        <span className="text-[10px] font-mono">View Material</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
          Enterprise L&D Fast Search • Press ESC or ⌘K to dismiss
        </div>

      </div>
    </div>
  );
};
