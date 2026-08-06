import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Session, CategoryType, StudyMaterial } from '../../types';
import {
  Search,
  Filter,
  //Bookmark, 
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  FolderOpen,
  BookOpen,
  X,
  Check
} from 'lucide-react';

interface SessionsListProps {
  sessions: Session[];
  onSelectSession: (sessionId: string) => void;
  onToggleBookmark: (sessionId: string) => void;
}

const DOMAIN_THUMBNAILS: Record<string, string> = {
  '.NET with C#': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  '.NET': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  'Insurance': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
  'Frontend': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
  'SQL': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
  'C2C': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80'
};

const getThumbnail = (category: string, fallback: string): string => {
  return DOMAIN_THUMBNAILS[category] || fallback;
};

const getDisplayCategory = (category: string): string => {
  if (category === '.NET with C#') return '.NET';
  return category;
};

const heroVideo = '/videos/overall-final-vid-new.mp4';

export const SessionsList: React.FC<SessionsListProps> = ({
  sessions,
  onSelectSession,
  onToggleBookmark
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState<string>('');
  const [removingChip, setRemovingChip] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFilterDropdownOpen(false);
        setIsSearchFocused(false);
        setActiveCardId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allMaterials = useMemo(() => {
    const map = new Map<string, StudyMaterial>();
    sessions.forEach(s => {
      if (s.studyMaterials) {
        s.studyMaterials.forEach(m => map.set(m.id, m));
      }
    });
    return Array.from(map.values());
  }, [sessions]);

  const suggestedSessions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return sessions.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [sessions, searchQuery]);

  const suggestedDocs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allMaterials.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      (m.tags && m.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 5);
  }, [allMaterials, searchQuery]);

  const availableCategories = useMemo(() => {
    const catsMap = new Map<string, number>();
    sessions.forEach(s => {
      const count = catsMap.get(s.category) || 0;
      catsMap.set(s.category, count + 1);
    });
    return Array.from(catsMap.entries()).map(([cat, count]) => ({
      raw: cat,
      display: getDisplayCategory(cat),
      count
    }));
  }, [sessions]);

  const filteredCategoryOptions = useMemo(() => {
    if (!filterSearchQuery.trim()) return availableCategories;
    const q = filterSearchQuery.toLowerCase();
    return availableCategories.filter(c =>
      c.raw.toLowerCase().includes(q) || c.display.toLowerCase().includes(q)
    );
  }, [availableCategories, filterSearchQuery]);

  const handleToggleCategory = (categoryRaw: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryRaw)) {
        return prev.filter(c => c !== categoryRaw);
      } else {
        return [...prev, categoryRaw];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedCategories(availableCategories.map(c => c.raw));
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  const handleRemoveChip = (categoryRaw: string) => {
    setRemovingChip(categoryRaw);
    setTimeout(() => {
      setSelectedCategories(prev => prev.filter(c => c !== categoryRaw));
      setRemovingChip(null);
    }, 250);
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(s.category);
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.studyMaterials && s.studyMaterials.some(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">

      {/* Course Academy Hero Banner with Playable Right Video */}
      <div
        className="enterprise-hero-card p-6 lg:p-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 45%, #BFDBFE 100%)',
          borderRadius: '24px',
          border: '1px solid #BFDBFE',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.08)',
          color: '#0F172A'
        }}
      >
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%)' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left Text Information */}
          <div className="space-y-3 max-w-xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm"
              style={{
                backgroundColor: '#DBEAFE',
                color: '#1D4ED8',
                border: '1px solid #BFDBFE'
              }}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Resource Center • {filteredSessions.length} Modules</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              Knowledge Repository
            </h2>

            <p className="hero-desc text-xs lg:text-sm leading-relaxed text-slate-600 font-medium">
              Browse notes, guides, documents, and valuable resources organized to support your Graduate Trainee journey.
            </p>
          </div>

          {/* Right Side Playable Video Player */}
          <div
            className="w-full lg:w-[380px] xl:w-[420px] aspect-video flex-shrink-0 rounded-2xl overflow-hidden border border-slate-300 shadow-lg bg-black relative z-20"
          >
            <video
              src={heroVideo}
              controls
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support HTML5 video playback.
            </video>
          </div>
        </div>
      </div>
      {/* Search Bar & Multi-Select Filter Row */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div ref={searchContainerRef} className="relative w-full sm:w-72 md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 z-10 text-blue-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search sessions, topics, documents, or tags..."
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-xs bg-white text-slate-900 placeholder-slate-500 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm transition-all duration-200"
            />

            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 space-y-3 max-h-96 overflow-y-auto">
                {suggestedSessions.length === 0 && suggestedDocs.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-500 font-mono">
                    No matching sessions or documents found
                  </div>
                ) : (
                  <>
                    {suggestedSessions.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block px-2">
                          Suggested Sessions ({suggestedSessions.length})
                        </span>
                        {suggestedSessions.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              onSelectSession(s.id);
                              setIsSearchFocused(false);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-6 h-6 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 font-bold">
                                <FolderOpen className="w-3.5 h-3.5" />
                              </div>
                              <div className="truncate">
                                <span className="font-bold text-slate-900 group-hover:text-blue-700 block truncate">{s.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{getDisplayCategory(s.category)}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {suggestedDocs.length > 0 && (
                      <div className="space-y-1.5 border-t border-slate-100 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block px-2">
                          Suggested Documents ({suggestedDocs.length})
                        </span>
                        {suggestedDocs.map((doc) => {
                          const parentSession = sessions.find(s => s.id === doc.sessionId);

                          return (
                            <div
                              key={doc.id}
                              onClick={() => {
                                onSelectSession(doc.sessionId);
                                setIsSearchFocused(false);
                              }}
                              className="p-2 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="px-2 py-0.5 rounded border border-purple-200 bg-purple-50 text-purple-700 text-[10px] font-mono font-bold flex items-center gap-1 flex-shrink-0">
                                  <FileText className="w-3 h-3" />
                                  <span>{doc.type}</span>
                                </span>
                                <div className="truncate">
                                  <span className="font-bold text-slate-900 group-hover:text-blue-700 block truncate">{doc.title}</span>
                                  {parentSession && (
                                    <span className="text-[10px] text-slate-500 font-mono block truncate">
                                      Session: {parentSession.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 group-hover:bg-blue-100 flex-shrink-0 ml-2">
                                Open Track
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

          <div ref={filterDropdownRef} className="relative inline-block text-left w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all duration-200 w-full sm:w-auto justify-between sm:justify-start bg-white text-slate-900 border border-slate-300 hover:bg-blue-50 hover:border-blue-200 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {selectedCategories.length === 0
                    ? 'All Learning Tracks'
                    : `Learning Tracks (${selectedCategories.length} selected)`}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 space-y-3">
                <div className="relative">
                  <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={filterSearchQuery}
                    onChange={(e) => setFilterSearchQuery(e.target.value)}
                    placeholder="Search tracks..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-[11px] font-semibold">
                  <button onClick={handleSelectAll} className="text-blue-600 hover:text-blue-800">
                    Select All
                  </button>
                  <button onClick={handleClearAll} className="text-slate-500 hover:text-slate-800">
                    Clear All
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredCategoryOptions.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.raw);
                    return (
                      <label
                        key={cat.raw}
                        onClick={() => handleToggleCategory(cat.raw)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isChecked
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-slate-300 bg-white group-hover:border-blue-400'
                              }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={`font-medium ${isChecked ? 'text-blue-700 font-bold' : 'text-slate-700'}`}>
                            {cat.display}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-full font-bold">
                          {cat.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-slate-700 font-mono font-medium">
          Showing <span className="font-extrabold text-blue-950">{filteredSessions.length}</span> of <span className="font-extrabold text-blue-950">{sessions.length}</span> tracks
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-blue-200/60">
          <span className="text-[11px] text-slate-600 font-mono font-medium">Selected Filters:</span>
          {selectedCategories.map((catRaw) => {
            const display = getDisplayCategory(catRaw);
            const isRemoving = removingChip === catRaw;

            return (
              <div
                key={catRaw}
                className={`bg-white/90 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-2 text-xs text-blue-950 font-bold shadow-sm transition-all duration-250 ease-in-out ${isRemoving ? 'opacity-0 scale-90 -translate-x-2' : 'opacity-100 scale-100'
                  }`}
              >
                <span>{display}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChip(catRaw)}
                  className="p-0.5 rounded-full hover:bg-rose-500 transition-all duration-200 group focus:outline-none"
                >
                  <X className="w-3.5 h-3.5 text-blue-700 group-hover:text-white transition-colors" />
                </button>
              </div>
            );
          })}

          <button
            onClick={handleClearAll}
            className="text-xs text-blue-700 hover:text-blue-900 font-bold underline underline-offset-2 ml-1"
          >
            Reset Filters
          </button>
        </div>
      )}

      <div
        onClick={() => setActiveCardId(null)}
        className={`fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ease-in-out ${activeCardId !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Grid of Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {filteredSessions.map((session) => {
          const thumbnail = getThumbnail(session.category, session.thumbnail);
          const categoryDisplay = getDisplayCategory(session.category);
          const isActive = activeCardId === session.id;

          return (
            <div
              key={session.id}
              onClick={() => setActiveCardId(prev => prev === session.id ? null : session.id)}
              className={`
                group relative bg-white border rounded-[20px] overflow-hidden flex flex-col justify-between h-full
                transition-all duration-300 ease-out transform cursor-pointer
                ${isActive
                  ? 'z-50 scale-105 sm:scale-108 border-blue-600 shadow-[0_20px_50px_rgba(37,99,235,0.25)] ring-2 ring-blue-500/40'
                  : 'z-10 border-slate-200 hover:border-blue-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.15)]'
                }
              `}
              style={{
                boxShadow: isActive ? undefined : '0 10px 30px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={thumbnail}
                    alt={session.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-14 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="bg-[#DBEAFE] text-[#1D4ED8] text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#BFDBFE] shadow-sm">
                      {categoryDisplay}
                    </span>
                    {session.trainerName && (
                      <span className="bg-[#EFF6FF] text-[#2563EB] text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#BFDBFE] shadow-sm flex items-center gap-1">
                        <span className="text-blue-800 font-bold">Trainer:</span> {session.trainerName}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardId(null);
                        }}
                        className="w-8 h-8 rounded-full bg-white text-slate-700 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition-colors shadow-md"
                        title="Close active view (Esc)"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="space-y-1.5">
                    <h3 className={`text-base font-bold transition-colors leading-snug ${isActive ? 'text-blue-700 text-lg' : 'text-slate-900 group-hover:text-blue-700'}`}>
                      {session.name}
                    </h3>

                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  {isActive && session.topics && session.topics.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                        Included Topics ({session.topics.length})
                      </span>
                      <div className="space-y-1">
                        {session.topics.slice(0, 3).map((t, idx) => (
                          <div key={t.id || idx} className="flex items-center justify-between text-[11px] bg-blue-50/70 p-2 rounded-lg border border-blue-100">
                            <span className="text-slate-800 font-medium truncate">{t.title}</span>
                            <span className="text-[10px] text-blue-700 font-mono flex-shrink-0 font-bold ml-2">Unlocked</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSession(session.id);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 45%, #BFDBFE 100%)',
                    border: '1px solid #BFDBFE',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)',
                  }}
                  className="w-full font-extrabold text-xs py-3 rounded-xl text-blue-800 hover:text-blue-900 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400"
                >
                  <Play className="w-3.5 h-3.5 fill-blue-700 text-blue-700" />
                  <span className="text-blue-800 font-extrabold">{isActive ? 'Launch Learning Track' : 'Open Learning Track'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-md">
          <FolderOpen className="w-12 h-12 text-blue-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No learning sessions found</h3>
          <p className="text-slate-600 text-xs max-w-sm mx-auto">
            Try resetting your search query or selected learning track filters to view available modules.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              handleClearAll();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2"
          >
            Reset Search & Filters
          </button>
        </div>
      )}

    </div>
  );
};