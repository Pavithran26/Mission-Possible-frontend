import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Code2, 
  ShieldCheck, 
  Database, 
  Cloud, 
  Cpu, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Star,
  Zap,
  Layers,
  Clock,
  ExternalLink
} from 'lucide-react';

export interface CardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullContent?: string;
  badge?: string;
  badgeColor?: string; // e.g., 'blue', 'emerald', 'purple', 'amber'
  icon?: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  rating?: number;
  author?: string;
}

interface PopCardGridProps {
  items?: CardItem[];
  onSelectCard?: (item: CardItem) => void;
}

// Sample default card data tailored to GT Learning Portal domain
const DEFAULT_CARDS: CardItem[] = [
  {
    id: 'card-dotnet',
    title: '.NET 8 Enterprise Architecture',
    category: '.NET with C#',
    description: 'Master Clean Architecture, CQRS, MediatR, and Domain-Driven Design for enterprise application suites.',
    fullContent: 'Dive deep into dependency injection container lifetime scopes, modular monolith structures, EF Core 8 performance tuning, and building scalable Web API controllers with JWT authentication.',
    badge: 'Popular',
    badgeColor: 'blue',
    duration: '24 Hours',
    level: 'Advanced',
    tags: ['C#', 'Clean Arch', 'WebAPI', 'EF Core'],
    rating: 4.9,
    author: 'Principal Software Architect'
  },
  {
    id: 'card-insurance',
    title: 'Insurance Domain Fundamentals',
    category: 'Insurance',
    description: 'Comprehensive guide to Life, Property & Casualty (P&C), Underwriting workflows, Claims processing & Reinsurance.',
    fullContent: 'Understand statutory accounting principles, policy lifecycle management, loss ratio metrics, claims adjudication rules, and integration patterns with legacy policy systems.',
    badge: 'Core Business',
    badgeColor: 'emerald',
    duration: '18 Hours',
    level: 'Beginner',
    tags: ['P&C Insurance', 'Claims', 'Underwriting', 'Policy'],
    rating: 4.8,
    author: 'Insurance Domain Specialist'
  },
  {
    id: 'card-sql',
    title: 'Advanced SQL Query Optimization',
    category: 'SQL Database',
    description: 'Index design strategies, execution plan evaluation, CTEs, window functions, and SQL Server deadlock prevention.',
    fullContent: 'Learn how optimizer statistics impact index seek vs scan, construct efficient CTEs and windowing partitions, tune costly JOINs, and write deadlock-free T-SQL transactions.',
    badge: 'High Demand',
    badgeColor: 'amber',
    duration: '16 Hours',
    level: 'Intermediate',
    tags: ['T-SQL', 'Indexing', 'Performance', 'Execution Plans'],
    rating: 4.95,
    author: 'Lead Data Engineer'
  },
  {
    id: 'card-c2c',
    title: 'Campus to Corporate Readiness',
    category: 'C2C',
    description: 'Accountability, Teamwork, Business Etiette, Effective Communication, Time Management (Pomodoro & Eisenhower Matrix), and Vocal Variety (Power, Pitch, Pace & Pause) for Workplace Success.',
    fullContent: 'Master corporate communication, active listening in agile squads, delivery of high-impact technical demos, and navigating cross-functional team dynamics.',
    badge: 'Core Training',
    badgeColor: 'purple',
    duration: '20 Hours',
    level: 'Beginner',
    tags: ['C2C', 'Agile', 'Scrum', 'Corporate Etiquette'],
    rating: 4.9,
    author: 'Mayford Gomes'
  },
  {
    id: 'card-react',
    title: 'Modern Frontend with React & Tailwind',
    category: 'Frontend Development',
    description: 'Component composition patterns, custom React hooks, state management, and high-contrast responsive styling.',
    fullContent: 'Build interactive dashboards using Vite, React 18 concurrent features, TypeScript interface contracts, context providers, and clean utility-first CSS design.',
    badge: 'UI Design',
    badgeColor: 'cyan',
    duration: '14 Hours',
    level: 'Intermediate',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    rating: 4.9,
    author: 'Senior Frontend Developer'
  },
  {
    id: 'card-sec',
    title: 'Secure Coding & OWASP Standards',
    category: 'Security Engineering',
    description: 'Identifying XSS, SQL injection, CSRF vulnerabilities, and implementing OAuth2 / OpenID Connect flows.',
    fullContent: 'Essential security audit training covering API threat protection, secret management in CI/CD, input sanitization, dynamic scanning, and compliance frameworks.',
    badge: 'Compliance',
    badgeColor: 'rose',
    duration: '12 Hours',
    level: 'Advanced',
    tags: ['Security', 'OWASP', 'OAuth2', 'JWT'],
    rating: 4.92,
    author: 'AppSec Consultant'
  }
];

export const PopCardGrid: React.FC<PopCardGridProps> = ({
  items = DEFAULT_CARDS,
  onSelectCard
}) => {
  // =========================================================================
  // ACTIVE STATE TOGGLE LOGIC:
  // - `activeCardId` keeps track of which card is currently "popped" to the front.
  // - If `activeCardId === null`, all cards display in their default grid state.
  // - If a card is clicked:
  //     a) If it is already active -> toggle it OFF (set to null).
  //     b) If a different card is clicked -> set activeCardId to that card's ID
  //        (automatically closing the previously active card & activating the new one).
  // - Clicking the semi-transparent dark backdrop overlay also resets activeCardId to null.
  // =========================================================================
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Close active card on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCardId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Toggles active state for a specific card ID.
   * Clicking an active card closes it.
   * Clicking a inactive card makes it active while closing any previously open card.
   */
  const handleCardClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents overlay/background click handlers from firing
    setActiveCardId((prevActiveId) => (prevActiveId === id ? null : id));
  };

  /**
   * Closes active card when clicking backdrop overlay or explicit close button
   */
  const handleCloseActiveCard = () => {
    setActiveCardId(null);
  };

  // Helper for badge styling based on color theme
  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'purple':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'cyan':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'rose':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'blue':
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="relative w-full py-4 space-y-6 select-none">
      
      {/* Component Title & Instruction Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Interactive "Pop to Front" Card Grid
            </h2>
          </div>
          <p className="text-slate-600 text-xs">
            Click any card to smoothly pop it to the front, scale up, and dim the background page.
          </p>
        </div>

        {/* State status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${activeCardId ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
          <span className="text-slate-700 font-semibold">
            {activeCardId ? `Active Card: ${activeCardId}` : 'Click a card to pop'}
          </span>
        </div>
      </div>

      {/* 
        SEMI-TRANSPARENT DARK BACKDROP OVERLAY:
        Fades in smoothly behind the active popped card when activeCardId is non-null.
        Clicking the overlay triggers handleCloseActiveCard().
      */}
      <div
        onClick={handleCloseActiveCard}
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
          activeCardId !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* 
        RESPONSIVE CARD GRID CONTAINER:
        Reflows smoothly across mobile (1 col), tablet (2 cols), desktop (3 cols), and wide screens (3-4 cols).
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {items.map((card) => {
          const isActive = activeCardId === card.id;

          return (
            <div
              key={card.id}
              onClick={(e) => handleCardClick(card.id, e)}
              className={`
                group relative bg-white border rounded-2xl p-6 flex flex-col justify-between
                transition-all duration-300 ease-out transform cursor-pointer
                ${
                  isActive
                    ? 'z-50 scale-105 sm:scale-108 bg-white border-blue-500 shadow-[0_20px_60px_-10px_rgba(37,99,235,0.25)] ring-2 ring-blue-500/50'
                    : 'z-10 border-slate-200 hover:border-blue-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/10'
                }
              `}
              style={{
                borderRadius: '16px' // Enforcing 16px rounded corners per design spec
              }}
              data-inspect-id="SessionCard"
            >
              <div>
                {/* Header Row: Category Badge & Pop Indicator / Close Icon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(card.badgeColor)}`}>
                    {card.category || card.badge}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {card.rating && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {card.rating}
                      </span>
                    )}

                    {/* Pop State Active Badge / Dismiss Icon */}
                    {isActive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCloseActiveCard();
                        }}
                        className="p-1 rounded-full bg-slate-100 hover:bg-rose-600 text-slate-600 hover:text-white transition-colors"
                        title="Close active view (Esc)"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-600 transition-colors">
                        Click to pop
                      </span>
                    )}
                  </div>
                </div>

                {/* Trainer and Card Title directly below Category Tag */}
                <div className="space-y-1.5 mb-2">
                  {card.author && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 w-fit">
                      <span className="text-slate-500 text-[11px] font-semibold">Trainer:</span>
                      <span className="text-blue-700 font-bold">{card.author}</span>
                    </div>
                  )}

                  <h3 className={`text-base font-bold transition-colors leading-snug ${isActive ? 'text-blue-700 text-lg' : 'text-slate-900 group-hover:text-blue-700'}`}>
                    {card.title}
                  </h3>
                </div>

                {/* Card Short Description */}
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  {card.description}
                </p>

                {/* 
                  EXPANDABLE DETAIL (Rendered dynamically when card is active / popped):
                  Shows additional breakdown content, tags, author, and action buttons when active.
                */}
                {isActive && (
                  <div className="space-y-4 pt-3 border-t border-slate-200 animate-fadeIn">
                    {card.fullContent && (
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1.5 font-sans">
                        <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                          Module Overview & Syllabus
                        </span>
                        <p className="leading-relaxed">{card.fullContent}</p>
                      </div>
                    )}

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                      <span>Instructor: <strong className="text-slate-900">{card.author || 'GT Lead Specialist'}</strong></span>
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <Clock className="w-3 h-3" />
                        {card.duration || '15 Hours'}
                      </span>
                    </div>

                    {/* Tags List */}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-mono font-medium">
                  {card.level || 'Intermediate'} Track
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isActive && onSelectCard) {
                      onSelectCard(card);
                    } else {
                      handleCardClick(card.id, e);
                    }
                  }}
                  data-inspect-id="PrimaryButton"
                  className={`
                    px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all
                    ${
                      isActive
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                    }
                  `}
                >
                  <span>{isActive ? 'Launch Module' : 'Pop & Inspect'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
