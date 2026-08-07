import React, { useState } from 'react';
import { Session, StudyMaterial, CategoryType } from '../../types';
import { mockStudyMaterials } from '../../data/mockData';
import { SessionTracker } from './SessionTracker';
import {
  ShieldCheck,
  Plus,
  Search,
  FileText,
  Layers,
  HelpCircle,
  Edit3,
  Trash2,
  ExternalLink,
  BookOpen,
  Download,
  Eye,
  Clock,
  Star,
  Award,
  CheckCircle2,
  X,
  Sparkles,
  Video,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FolderOpen,
  Tag,
  Table
} from 'lucide-react';

interface AdminDashboardProps {
  sessions: Session[];
  studyMaterials?: StudyMaterial[];
  onAddNewSession: () => void;
  onManageSessions: () => void;
  onOpenSessionTracker?: () => void;
  onSaveSession?: (sessionData: Partial<Session>) => void;
  onDeleteSession?: (sessionId: string) => void;
  onOpenRoadmapBuilder?: (session: Session) => void;
  onOpenMaterialUploader?: (session: Session) => void;
  onOpenQuizBuilder?: (session: Session) => void;
  onSelectSession?: (sessionId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  sessions,
  studyMaterials = mockStudyMaterials,
  onAddNewSession,
  onManageSessions,
  onOpenSessionTracker,
  onSaveSession,
  onDeleteSession,
  onOpenRoadmapBuilder,
  onOpenMaterialUploader,
  onOpenQuizBuilder,
  onSelectSession
}) => {
  const [activeOverviewSubTab, setActiveOverviewSubTab] = useState<'catalog' | 'tracker'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Close search suggestions when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // State for Material Reader Modal
  const [activeReadingMaterial, setActiveReadingMaterial] = useState<StudyMaterial | null>(null);
  const [showVersionHistoryId, setShowVersionHistoryId] = useState<string | null>(null);

  // Helper to get study materials for a specific session
  const getSessionMaterials = (session: Session): StudyMaterial[] => {
    if (session.studyMaterials && session.studyMaterials.length > 0) {
      return session.studyMaterials;
    }
    return studyMaterials.filter(m => m.sessionId === session.id);
  };

  // Collect all materials across sessions
  const allMaterials = React.useMemo(() => {
    const map = new Map<string, StudyMaterial>();
    sessions.forEach(s => {
      const mats = getSessionMaterials(s);
      mats.forEach(m => map.set(m.id, m));
    });
    return Array.from(map.values());
  }, [sessions, studyMaterials]);

  // Suggested Sessions for Autocomplete
  const suggestedSessions = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return sessions.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [sessions, searchQuery]);

  // Suggested Documents for Autocomplete
  const suggestedDocs = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allMaterials.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      (m.tags && m.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 5);
  }, [allMaterials, searchQuery]);

  // Filter sessions based on search & category
  const filteredSessions = sessions.filter(session => {
    const matchesCategory = selectedCategory === 'ALL' ||
      session.category === selectedCategory ||
      (selectedCategory === '.NET with C#' && (session.category === '.NET' || session.category === '.NET with C#')) ||
      (selectedCategory === 'SQL' && (session.category === 'SQL' || session.category === 'Data Modeling')) ||
      (selectedCategory === 'C2C' && (session.category === 'C2C' || session.category === 'Campus to Corporate'));

    const sessionMats = getSessionMaterials(session);
    const matchesSearch =
      session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session.trainerName && session.trainerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      sessionMats.some(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const categories = ['ALL', '.NET with C#', 'Insurance', 'SQL', 'C2C', 'Frontend'];

  // Material type icon & color map
  const getMaterialTypeBadge = (type: string) => {
    switch (type) {
      case 'PDF':
        return { icon: FileText, bg: 'bg-rose-500/10 text-rose-500 border-rose-500/20' };
      case 'PowerPoint':
        return { icon: FileText, bg: 'bg-amber-500/10 text-amber-500 border-amber-500/20' };
      case 'Word':
        return { icon: FileText, bg: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
      case 'YouTube':
        return { icon: Video, bg: 'bg-red-500/10 text-red-500 border-red-500/20' };
      case 'Udemy':
        return { icon: GraduationCap, bg: 'bg-purple-500/10 text-purple-500 border-purple-500/20' };
      case 'Notes':
      case 'Markdown':
        return { icon: BookOpen, bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
      default:
        return { icon: ExternalLink, bg: 'bg-slate-500/10 text-slate-500 border-slate-500/20' };
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900 dark:text-slate-100">

      {/* List of Existing Learning Sessions Cards directly below Console Card */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            <span className="text-slate-900 font-extrabold">Enterprise Learning Sessions ({filteredSessions.length})</span>
          </h2>
          <span className="text-xs text-slate-600 font-mono font-medium">
            Showing all published GT training modules
          </span>
        </div>

        {/* Filter and Search Bar for All Existing Sessions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Category Filters */}
          <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar with Autocomplete Suggestions */}
          <div ref={searchContainerRef} className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-3 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search sessions, topics..."
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-xs bg-white text-slate-900 placeholder-slate-500 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm transition-all duration-200"
            />

            {/* Autocomplete Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3 space-y-3 max-h-96 overflow-y-auto animate-fadeIn">
                {suggestedSessions.length === 0 && suggestedDocs.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-500 font-mono">
                    No matching sessions or documents found
                  </div>
                ) : (
                  <>
                    {/* Matching Sessions Section */}
                    {suggestedSessions.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-2">
                          Suggested Sessions ({suggestedSessions.length})
                        </span>
                        {suggestedSessions.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              setSearchQuery(s.name);
                              setIsSearchFocused(false);
                            }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 font-bold">
                                <FolderOpen className="w-3.5 h-3.5" />
                              </div>
                              <div className="truncate">
                                <span className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 block truncate">{s.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{s.category} • {s.durationHours} Hrs</span>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Documents Section */}
                    {suggestedDocs.length > 0 && (
                      <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-800 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-2">
                          Suggested Documents ({suggestedDocs.length})
                        </span>
                        {suggestedDocs.map((doc) => {
                          const parentSession = sessions.find(s => s.id === doc.sessionId);
                          const badgeStyle = getMaterialTypeBadge(doc.type);
                          const BadgeIcon = badgeStyle.icon;

                          return (
                            <div
                              key={doc.id}
                              onClick={() => {
                                setActiveReadingMaterial(doc);
                                setIsSearchFocused(false);
                              }}
                              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold flex items-center gap-1 flex-shrink-0 ${badgeStyle.bg}`}>
                                  <BadgeIcon className="w-3 h-3" />
                                  <span>{doc.type}</span>
                                </span>
                                <div className="truncate">
                                  <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 block truncate">{doc.title}</span>
                                  {parentSession && (
                                    <span className="text-[10px] text-slate-500 font-mono block truncate">
                                      {parentSession.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 group-hover:bg-emerald-500/20 flex-shrink-0 ml-2">
                                Read
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3 shadow-md">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching sessions found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search query or filter settings above.
            </p>
          </div>
        ) : (
          filteredSessions.map((session) => {
            return (
              <div
                key={session.id}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all text-slate-900"
                data-inspect-id="SessionCard"
              >
                {/* Session Card Content: Name, Trainer, Category, Description */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  {/* Thumbnail & Text Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={session.thumbnail}
                      alt={session.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 flex-shrink-0 shadow-sm"
                    />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category */}
                        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          {session.category}
                        </span>

                        {/* Trainer Name */}
                        {session.trainerName && (
                          <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Trainer: {session.trainerName}
                          </span>
                        )}

                        {/* Status Badge */}
                        <span
                          className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${(session.status || (session.isPublished !== false ? 'Published' : 'Draft')) === 'Published'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : (session.status === 'Archived')
                                ? 'bg-slate-100 text-slate-700 border-slate-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                        >
                          {session.status || (session.isPublished !== false ? 'Published' : 'Draft')}
                        </span>
                      </div>

                      {/* Session Name */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{session.name}</h3>

                      {/* Session Description */}
                      <p className="text-slate-600 text-xs max-w-3xl leading-relaxed">{session.description}</p>
                    </div>
                  </div>

                  {/* View Session Action Button */}
                  <div className="flex items-center gap-2 self-start md:self-center flex-shrink-0">
                    {onSelectSession && (
                      <button
                        onClick={() => onSelectSession(session.id)}
                        style={{
                          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 45%, #BFDBFE 100%)',
                          border: '1px solid #BFDBFE',
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)',
                        }}
                        className="font-extrabold text-xs px-5 py-3 rounded-2xl text-blue-800 hover:text-blue-900 flex items-center gap-2 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400"
                        title="View Session Details"
                      >
                        <BookOpen className="w-4 h-4 text-blue-700 fill-blue-700" />
                        <span className="text-blue-800 font-extrabold">View Session</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Material Reader Modal Overlay */}
      {activeReadingMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-fadeIn">

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{activeReadingMaterial.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Type: {activeReadingMaterial.type} • Version {activeReadingMaterial.currentVersion}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveReadingMaterial(null)}
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Document Preview */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-white block">Document Summary & Notes</span>
                <p className="text-slate-400">{activeReadingMaterial.description}</p>
              </div>

              {activeReadingMaterial.contentBody ? (
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                  {activeReadingMaterial.contentBody}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">
                  No preview text cached for this document. You can open or download the file via the link below.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                Enterprise L&D Content Reader
              </span>
              <div className="flex items-center gap-3">
                {activeReadingMaterial.url && activeReadingMaterial.url !== '#' && (
                  <a
                    href={activeReadingMaterial.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Open Full Document
                  </a>
                )}
                <button
                  onClick={() => setActiveReadingMaterial(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-700"
                >
                  Close Reader
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
