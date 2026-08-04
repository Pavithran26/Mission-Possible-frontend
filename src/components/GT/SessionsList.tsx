import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Session, CategoryType, StudyMaterial } from '../../types';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  FileText, 
  FolderOpen,
  BookOpen,
  X,
  Check,
  CheckSquare,
  Square
} from 'lucide-react';

interface SessionsListProps {
  sessions: Session[];
  onSelectSession: (sessionId: string) => void;
  onToggleBookmark: (sessionId: string) => void;
}

const ALL_CATEGORIES: { raw: CategoryType; display: string }[] = [
  { raw: '.NET with C#', display: '.NET' },
  { raw: 'Insurance', display: 'Insurance' },
  { raw: 'SQL', display: 'SQL' },
  { raw: 'C2C', display: 'C2C' },
  { raw: 'Frontend', display: 'Frontend' },
  { raw: 'Database Modelling', display: 'Database' },
  { raw: 'Data Engineering', display: 'Data Eng' },
  { raw: 'System Design', display: 'System Design' },
  { raw: 'Git', display: 'Git' },
  { raw: 'DevOps', display: 'DevOps' },
  { raw: 'API Development', display: 'API Dev' },
  { raw: 'Testing', display: 'Testing' },
  { raw: 'Architecture', display: 'Architecture' }
];

// Professional domain-specific course thumbnails
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

export const SessionsList: React.FC<SessionsListProps> = ({
  sessions,
  onSelectSession,
  onToggleBookmark
}) => {
  // Pop to Front Active Card State
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Filter state (multi-select)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState<string>('');
  const [removingChip, setRemovingChip] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns & active card when clicking outside or pressing ESC
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

  // Handle ESC key to close dropdowns and active popped card
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

  // Matching Sessions for Autocomplete
  const suggestedSessions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return sessions.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [sessions, searchQuery]);

  // Matching Documents for Autocomplete
  const suggestedDocs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allMaterials.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      (m.tags && m.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 5);
  }, [allMaterials, searchQuery]);

  // Categories present in sessions
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

  // Filtered categories in dropdown search
  const filteredCategoryOptions = useMemo(() => {
    if (!filterSearchQuery.trim()) return availableCategories;
    const q = filterSearchQuery.toLowerCase();
    return availableCategories.filter(c =>
      c.raw.toLowerCase().includes(q) || c.display.toLowerCase().includes(q)
    );
  }, [availableCategories, filterSearchQuery]);

  // Toggle individual category selection
  const handleToggleCategory = (categoryRaw: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryRaw)) {
        return prev.filter(c => c !== categoryRaw);
      } else {
        return [...prev, categoryRaw];
      }
    });
  };

  // Select All Categories
  const handleSelectAll = () => {
    setSelectedCategories(availableCategories.map(c => c.raw));
  };

  // Clear All Category Filters
  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  // Remove single filter chip with smooth animation
  const handleRemoveChip = (categoryRaw: string) => {
    setRemovingChip(categoryRaw);
    setTimeout(() => {
      setSelectedCategories(prev => prev.filter(c => c !== categoryRaw));
      setRemovingChip(null);
    }, 250);
  };

  // Final Filtered Sessions
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
      
      {/* Course Academy Hero Banner with Modern Enterprise SaaS Styling */}
      <div 
        className="enterprise-hero-card p-6 lg:p-8 space-y-5 relative"
        style={{
          background: 'linear-gradient(90deg, #2E4CB8 0%, #37308E 45%, #13254A 100%)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          color: '#FFFFFF'
        }}
      >
        {/* Subtle radial glow behind title */}
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl" 
          style={{ background: 'radial-gradient(circle, rgba(124, 92, 255, 0.15) 0%, rgba(124, 92, 255, 0) 70%)' }}
        />
        
        {/* Header Title & Global Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <BookOpen className="w-3.5 h-3.5" style={{ color: '#4EA3FF' }} />
              <span>GT Learning Academy Catalog • {filteredSessions.length} Modules</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight" style={{ color: '#FFFFFF' }}>
              Technical Learning Sessions
            </h2>
            <p className="hero-desc text-xs lg:text-sm max-w-2xl leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.82)' }}>
              Explore hands-on GT engineering curricula, deep-dive technical modules, architectural frameworks, and domain tracks.
            </p>
          </div>

          <div ref={searchContainerRef} className="relative w-full lg:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 z-10" style={{ color: '#4EA3FF' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search sessions, topics, documents, or tags..."
              className="enterprise-hero-search w-full rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
              style={{
                backgroundColor: 'rgba(8, 14, 38, 0.75)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                color: '#FFFFFF'
              }}
            />

            {/* Autocomplete Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#0E1733] border border-slate-700 rounded-2xl shadow-2xl p-3 space-y-3 max-h-96 overflow-y-auto animate-fadeIn">
                {suggestedSessions.length === 0 && suggestedDocs.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400 font-mono">
                    No matching sessions or documents found
                  </div>
                ) : (
                  <>
                    {/* Matching Sessions Section */}
                    {suggestedSessions.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider block px-2">
                          Suggested Sessions ({suggestedSessions.length})
                        </span>
                        {suggestedSessions.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              onSelectSession(s.id);
                              setIsSearchFocused(false);
                            }}
                            className="p-2 hover:bg-[#18254F] rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#4EA3FF] flex-shrink-0 font-bold">
                                <FolderOpen className="w-3.5 h-3.5" />
                              </div>
                              <div className="truncate">
                                <span className="font-bold text-white group-hover:text-[#4EA3FF] block truncate">{s.name}</span>
                                <span className="text-[10px] text-slate-300 font-mono">{getDisplayCategory(s.category)} • {s.durationHours} hrs</span>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#4EA3FF] flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Documents Section */}
                    {suggestedDocs.length > 0 && (
                      <div className="space-y-1.5 border-t border-slate-700/60 pt-2">
                        <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider block px-2">
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
                              className="p-2 hover:bg-[#18254F] rounded-xl cursor-pointer transition-colors flex items-center justify-between text-xs group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="px-2 py-0.5 rounded border border-purple-400/30 bg-purple-500/20 text-purple-200 text-[10px] font-mono font-bold flex items-center gap-1 flex-shrink-0">
                                  <FileText className="w-3 h-3" />
                                  <span>{doc.type}</span>
                                </span>
                                <div className="truncate">
                                  <span className="font-bold text-white group-hover:text-[#4EA3FF] block truncate">{doc.title}</span>
                                  {parentSession && (
                                    <span className="text-[10px] text-slate-300 font-mono block truncate">
                                      Session: {parentSession.name}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-[#4EA3FF] bg-blue-500/15 px-2 py-0.5 rounded border border-blue-400/30 group-hover:bg-blue-500/30 flex-shrink-0 ml-2">
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
        </div>

        {/* Multi-Select Dropdown Filter Row */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          
          <div ref={filterDropdownRef} className="relative inline-block text-left">
            {/* Filter Dropdown Trigger Button */}
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="enterprise-filter-btn px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all duration-200"
              style={{
                backgroundColor: selectedCategories.length > 0 ? '#18254F' : '#0E1733',
                border: selectedCategories.length > 0 ? '1px solid #4EA3FF' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF'
              }}
            >
              <Filter className="w-3.5 h-3.5" style={{ color: '#4EA3FF' }} />
              <span>
                {selectedCategories.length === 0
                  ? 'All Learning Tracks'
                  : `Learning Tracks (${selectedCategories.length} selected)`}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
            </button>

            {/* Dropdown Menu */}
            {isFilterDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 space-y-3 animate-fadeIn">
                {/* Search Box Inside Dropdown */}
                <div className="relative">
                  <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={filterSearchQuery}
                    onChange={(e) => setFilterSearchQuery(e.target.value)}
                    placeholder="Search tracks..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Dropdown Actions: Select All / Clear All */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] font-semibold">
                  <button
                    onClick={handleSelectAll}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Checkboxes List */}
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredCategoryOptions.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.raw);
                    return (
                      <label
                        key={cat.raw}
                        onClick={() => handleToggleCategory(cat.raw)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer text-xs transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'border-slate-700 bg-slate-950 group-hover:border-slate-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={`font-medium ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {cat.display}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          {cat.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="font-bold text-white">{filteredSessions.length}</span> of <span className="font-bold text-white">{sessions.length}</span> tracks
          </div>
        </div>

        {/* Selected Filter Chips Row */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60">
            <span className="text-[11px] text-slate-400 font-mono font-medium">Selected Filters:</span>
            {selectedCategories.map((catRaw) => {
              const display = getDisplayCategory(catRaw);
              const isRemoving = removingChip === catRaw;

              return (
                <div
                  key={catRaw}
                  className={`bg-slate-900 border border-slate-800 px-3 py-1 rounded-full flex items-center gap-2 text-xs text-slate-300 font-medium shadow-sm transition-all duration-250 ease-in-out ${
                    isRemoving ? 'opacity-0 scale-90 -translate-x-2' : 'opacity-100 scale-100'
                  }`}
                >
                  <span>{display}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChip(catRaw)}
                    aria-label="Remove filter"
                    title="Remove filter"
                    className="p-0.5 rounded-full hover:bg-[#EF4444] transition-all duration-200 group focus:outline-none"
                  >
                    <X className="w-3.5 h-3.5 text-slate-400 opacity-70 group-hover:text-white transition-colors" />
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleClearAll}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 ml-1 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Semi-transparent dark overlay fading in behind the active popped card */}
      <div
        onClick={() => setActiveCardId(null)}
        className={`fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
          activeCardId !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Grid of Sessions Cards with Pop-to-Front Interaction */}
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
                group relative bg-white border rounded-3xl overflow-hidden flex flex-col justify-between h-full
                transition-all duration-300 ease-out transform cursor-pointer
                ${
                  isActive
                    ? 'z-50 scale-105 sm:scale-108 border-blue-500 shadow-[0_20px_60px_-10px_rgba(59,130,246,0.35)] ring-2 ring-blue-500/50'
                    : 'z-10 border-slate-200 hover:border-blue-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/10'
                }
              `}
              data-inspect-id="SessionCard"
            >
              <div>
                {/* Thumbnail & Bookmark / Close Button */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={thumbnail}
                    alt={session.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                  
                  {/* Category & Trainer Badges Overlay on Image */}
                  <div className="absolute top-3 left-3 right-14 flex flex-wrap items-center gap-1.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md text-blue-700 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                      {categoryDisplay}
                    </span>
                    {session.trainerName && (
                      <span className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-slate-700 shadow-sm flex items-center gap-1">
                        <span className="text-emerald-400 font-semibold">Trainer:</span> {session.trainerName}
                      </span>
                    )}
                  </div>

                  {/* Bookmark or Pop Dismiss Button */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                    {isActive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardId(null);
                        }}
                        className="w-8 h-8 rounded-full bg-slate-900/90 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center transition-colors shadow-md"
                        title="Close active view (Esc)"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(session.id);
                        }}
                        className={`w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm ${
                          session.isBookmarked
                            ? 'text-amber-500 fill-amber-500 border-amber-400'
                            : 'text-slate-700 border-slate-200 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                        title="Save Learning Track"
                      >
                        <Bookmark className={`w-4 h-4 ${session.isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Body - Name and Description */}
                <div className="p-5 space-y-3">
                  {/* Duration Header */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {session.durationHours} Hours Track
                    </span>
                  </div>

                  {/* Session Name & Description */}
                  <div className="space-y-1.5">
                    <h3 className={`text-base font-bold transition-colors leading-snug ${isActive ? 'text-blue-700 text-lg' : 'text-slate-900 group-hover:text-blue-700'}`}>
                      {session.name}
                    </h3>

                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  {/* Expanded Active Details */}
                  {isActive && session.topics && session.topics.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 space-y-2 animate-fadeIn">
                      <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                        Included Topics ({session.topics.length})
                      </span>
                      <div className="space-y-1">
                        {session.topics.slice(0, 3).map((t, idx) => (
                          <div key={t.id || idx} className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <span className="text-slate-800 font-medium truncate">{t.title}</span>
                            <span className="text-[10px] text-emerald-700 font-mono flex-shrink-0 font-bold ml-2">Unlocked</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Primary Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSession(session.id);
                  }}
                  data-inspect-id="PrimaryButton"
                  className="w-full font-bold text-xs py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-white" />
                  <span className="text-white font-bold">{isActive ? 'Launch Learning Track' : 'Open Learning Track'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSessions.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No learning sessions found</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Try resetting your search query or selected learning track filters to view available modules.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              handleClearAll();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors mt-2"
          >
            Reset Search & Filters
          </button>
        </div>
      )}

    </div>
  );
};
