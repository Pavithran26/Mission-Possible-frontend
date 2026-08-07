import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Rocket, 
  UserCheck, 
  LayoutDashboard, 
  Video, 
  BookMarked, 
  FolderOpen, 
  FileText, 
  Map, 
  HelpCircle, 
  BarChart3, 
  Bot, 
  User, 
  PhoneCall, 
  Sparkles,
  Info,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  emojiIcon: string;
  category: string;
  keywords: string[];
  summary: string;
  content: {
    heading: string;
    description: string;
    featurePreviewTitle: string;
    featurePreviewDesc: string;
    tipText: string;
    steps: { step: string; text: string }[];
  };
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    icon: <Home className="w-4 h-4" />,
    emojiIcon: '🏠',
    category: 'Getting Started',
    keywords: ['welcome', 'intro', 'overview', 'start', 'companion'],
    summary: 'Centralized learning platform designed for Graduate Trainees.',
    content: {
      heading: 'Welcome to GT Companion',
      description: 'GT Companion is a centralized learning platform designed for Graduate Trainees to access learning materials, explore structured learning paths, watch onboarding videos, complete assessments, track progress, and receive AI-powered learning assistance.',
      featurePreviewTitle: 'GT Companion Platform Ecosystem',
      featurePreviewDesc: 'Access course roadmaps, interactive code playgrounds, study notes, video archives, and mentor guidance in one unified portal.',
      tipText: 'Pro Tip: Use keyboard shortcut Shift + ? anywhere in the application to instantly trigger this User Guide!',
      steps: [
        { step: 'Step 1: Explore Learning Tracks', text: 'Navigate through structured .NET, SQL, Frontend, and Insurance Domain learning pathways.' },
        { step: 'Step 2: Access Knowledge Repository', text: 'Download official session notes, slide decks, and reference architecture diagrams.' },
        { step: 'Step 3: Track Milestone Progress', text: 'Complete topic quizzes and assignments to build your trainee reputation profile.' }
      ]
    }
  },
  {
    id: 'quickstart',
    title: 'Quick Start',
    icon: <Rocket className="w-4 h-4" />,
    emojiIcon: '🚀',
    category: 'Getting Started',
    keywords: ['quick start', 'getting started', 'begin', 'setup', 'first steps'],
    summary: 'Get up and running with GT Companion in under 3 minutes.',
    content: {
      heading: 'Quick Start Guide',
      description: 'Follow this rapid onboarding sequence to setup your profile, explore active learning sessions, and launch your first interactive coding sandbox.',
      featurePreviewTitle: '3-Minute Trainee Launchpad',
      featurePreviewDesc: 'Instant access to active learning roadmaps, daily attendance tracking, and peer collaboration channels.',
      tipText: 'Bookmark your primary learning sessions to receive automated desktop reminders before live trainer sessions begin.',
      steps: [
        { step: 'Step 1: Complete Profile Setup', text: 'Verify your name, GT Batch ID (e.g. Batch 2026), and technical interest tags.' },
        { step: 'Step 2: Join Active Sessions', text: 'Enroll in designated modules like .NET with C#, Database Modeling, and Domain Fundamentals.' },
        { step: 'Step 3: Try AI Learning Copilot', text: 'Ask technical questions to the integrated AI tutor for instant code explainers.' }
      ]
    }
  },
  {
    id: 'auth',
    title: 'Login & Registration',
    icon: <UserCheck className="w-4 h-4" />,
    emojiIcon: '👤',
    category: 'Account',
    keywords: ['login', 'register', 'sign up', 'auth', 'password', 'role', 'guest'],
    summary: 'Secure login, registration, and role-based access control.',
    content: {
      heading: 'Login & Registration Pathways',
      description: 'GT Companion supports secure single sign-on (SSO), Graduate Trainee account creation, and Guest preview access with automatic session state persistence.',
      featurePreviewTitle: 'Multi-Role Authentication Gate',
      featurePreviewDesc: 'Role-based authorization for Trainees, Mentors, and L&D Administrators with automatic session persistence across page reloads.',
      tipText: 'Guest users can explore all public learning modules and session roadmaps before completing full account registration.',
      steps: [
        { step: 'Step 1: Choose Your Role', text: 'Select Graduate Trainee (GT Portal) or Administrator (Admin Portal) on the login screen.' },
        { step: 'Step 2: Enter Credentials', text: 'Sign in using your enterprise email address and secure password.' },
        { step: 'Step 3: Session Persistence', text: 'Your navigation state and active tab remain preserved even when refreshing your browser (F5).' }
      ]
    }
  },
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    icon: <LayoutDashboard className="w-4 h-4" />,
    emojiIcon: '📚',
    category: 'Core Portal',
    keywords: ['dashboard', 'home', 'portal', 'sessions', 'learning tracks', 'cards'],
    summary: 'Main portal dashboard showcasing active courses, search, and filters.',
    content: {
      heading: 'Trainee Dashboard Overview',
      description: 'The main GT Portal dashboard provides a bird-eye view of active technical tracks, upcoming trainer-led sessions, repository updates, and search filters.',
      featurePreviewTitle: 'Enterprise Learning Sessions Grid',
      featurePreviewDesc: 'Filter sessions by category (.NET, SQL, Frontend, Insurance) or search by keyword, trainer, or topic tags.',
      tipText: 'Click any session card to open its comprehensive roadmap, study materials, and interactive quizzes.',
      steps: [
        { step: 'Step 1: Filter Learning Tracks', text: 'Use the category filter pills to narrow down sessions by domain or tech stack.' },
        { step: 'Step 2: Instant Keyword Search', text: 'Type keywords into the top search bar to locate specific topics or study files.' },
        { step: 'Step 3: Select Session Card', text: 'Click on a session to view structured learning roadmaps and material downloads.' }
      ]
    }
  },
  {
    id: 'modules',
    title: 'Learning Modules',
    icon: <BookMarked className="w-4 h-4" />,
    emojiIcon: '📖',
    category: 'Learning',
    keywords: ['modules', 'courses', 'topics', 'subtopics', 'sessions', 'curriculum'],
    summary: 'Structured learning modules covering key technical competencies.',
    content: {
      heading: 'Structured Learning Modules',
      description: 'Each session is organized into sequential learning modules covering essential concepts, practical code examples, and architecture patterns.',
      featurePreviewTitle: 'Comprehensive Session Syllabus',
      featurePreviewDesc: 'Modular breakdown of C# 12, Entity Framework Core, SQL Relational Design, React, and Domain Underwriting.',
      tipText: 'Click on any subtopic node inside a module to instantly view its detailed reference notes and code samples.',
      steps: [
        { step: 'Step 1: Select Session', text: 'Open any course session like .NET with C# or Insurance Fundamentals.' },
        { step: 'Step 2: Expand Module', text: 'Click module headers to expand inline subtopics and stem line trees.' },
        { step: 'Step 3: Review Syllabus', text: 'Follow structured prerequisites before attempting topic quizzes.' }
      ]
    }
  },
  {
    id: 'documents',
    title: 'Documents & Notes',
    icon: <FileText className="w-4 h-4" />,
    emojiIcon: '📄',
    category: 'Knowledge Base',
    keywords: ['documents', 'notes', 'personal notes', 'downloads', 'pdf', 'docx'],
    summary: 'Provided materials, additional resources, and personal note-taking.',
    content: {
      heading: 'Provided Materials & Personal Notes',
      description: 'Access official trainer-provided study materials, supplementary reading guides, and maintain private personal study notes per session.',
      featurePreviewTitle: 'Session Study Materials & Personal Notebook',
      featurePreviewDesc: 'Tabbed workspace featuring Provided Materials, Additional Materials, and Markdown-formatted Personal Notes.',
      tipText: 'Your personal notes are automatically saved to local storage so your study thoughts are ready whenever you return.',
      steps: [
        { step: 'Step 1: Switch Materials Tab', text: 'Click Provided Materials or Additional Materials inside any session detail view.' },
        { step: 'Step 2: Download Attachments', text: 'Click Download on slides, cheat sheets, or practice code repositories.' },
        { step: 'Step 3: Write Personal Notes', text: 'Use the Notes tab to capture key takeaways and personal reminders.' }
      ]
    }
  },
  {
    id: 'roadmaps',
    title: 'Learning Roadmaps',
    icon: <Map className="w-4 h-4" />,
    emojiIcon: '🎯',
    category: 'Roadmaps',
    keywords: ['roadmap', 'tree', 'inline tree', 'expansion', 'connectors', 'topics'],
    summary: 'Interactive inline tree learning roadmaps with module expansion.',
    content: {
      heading: 'Interactive Learning Roadmaps',
      description: 'Explore visually structured learning roadmaps with collapsible tree nodes, stem line connectors (├─, └─), and smooth expansion animations.',
      featurePreviewTitle: 'Inline Expandable Roadmap Tree',
      featurePreviewDesc: 'Clean, minimal roadmap tree where modules start collapsed by default and expand seamlessly on user click.',
      tipText: 'Clicking a subtopic node smoothly navigates directly to its associated study notes and practice code sandbox.',
      steps: [
        { step: 'Step 1: View Roadmap Tab', text: 'Ensure Road Map tab is selected inside your active session.' },
        { step: 'Step 2: Expand Module Stems', text: 'Click any module header to expand its subtopic tree branches.' },
        { step: 'Step 3: Track Completion', text: 'Progress sequentially through topics from introductory to advanced concepts.' }
      ]
    }
  },
  {
    id: 'assessments',
    title: 'Assessments & Quizzes',
    icon: <HelpCircle className="w-4 h-4" />,
    emojiIcon: '📝',
    category: 'Evaluation',
    keywords: ['assessments', 'quizzes', 'quiz', 'test', 'questions', 'score', 'evaluate'],
    summary: 'Topic assessments, timed quizzes, and instant score feedback.',
    content: {
      heading: 'Interactive Quizzes & Assessments',
      description: 'Validate your understanding with multiple-choice quizzes, instant explanation feedback, and performance scoring.',
      featurePreviewTitle: 'Trainee Quiz Evaluation Engine',
      featurePreviewDesc: 'Interactive quiz interface with timer, answer selection, explanation reveals, and score summary breakdown.',
      tipText: 'Review detailed answer explanations after submitting each quiz to reinforce core technical concepts.',
      steps: [
        { step: 'Step 1: Launch Quiz', text: 'Click the Quiz tab in any session or launch a standalone assessment.' },
        { step: 'Step 2: Select Answers', text: 'Answer questions within the allocated time limit.' },
        { step: 'Step 3: View Detailed Results', text: 'Get instant percentage score breakdown and correct answer explanations.' }
      ]
    }
  },
  {
    id: 'aitutor',
    title: 'AI Tutor',
    icon: <Bot className="w-4 h-4" />,
    emojiIcon: '🤖',
    category: 'AI Assistant',
    keywords: ['ai', 'tutor', 'copilot', 'assistant', 'chat', 'ask', 'explain code'],
    summary: 'AI-powered learning copilot for instant technical code explanations.',
    content: {
      heading: 'AI Learning Copilot & Code Tutor',
      description: 'Get instant 24/7 technical assistance, code debugging suggestions, and simplified explanations powered by AI.',
      featurePreviewTitle: 'AI Learning Copilot Assistant Panel',
      featurePreviewDesc: 'Floating AI copilot widget capable of explaining complex C# LINQ queries, SQL joins, and React state hooks.',
      tipText: 'Click the floating Sparkles button in the bottom right corner anytime to open the AI Learning Copilot chat panel.',
      steps: [
        { step: 'Step 1: Open AI Copilot', text: 'Click the floating AI assistant icon on any page.' },
        { step: 'Step 2: Type Your Question', text: 'Ask questions like "Explain Async/Await in C#" or "How does EF Core migration work?".' },
        { step: 'Step 3: Get Instant Answer', text: 'Receive clear explanations with formatted code snippets and references.' }
      ]
    }
  }
];

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  // Load initial section from localStorage or default to 'welcome'
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('gt_user_guide_last_section');
      if (saved && GUIDE_SECTIONS.some(s => s.id === saved)) {
        return saved;
      }
    } catch (e) {}
    return 'welcome';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist last opened section
  useEffect(() => {
    try {
      localStorage.setItem('gt_user_guide_last_section', activeSectionId);
    } catch (e) {}
  }, [activeSectionId]);

  // Global Keyboard Shortcuts: '?' to open, 'Escape' to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return GUIDE_SECTIONS;
    const q = searchQuery.toLowerCase().trim();
    return GUIDE_SECTIONS.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.keywords.some(k => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeIndex = GUIDE_SECTIONS.findIndex(s => s.id === activeSectionId);
  const currentSection = GUIDE_SECTIONS[activeIndex] || GUIDE_SECTIONS[0];

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveSectionId(GUIDE_SECTIONS[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < GUIDE_SECTIONS.length - 1) {
      setActiveSectionId(GUIDE_SECTIONS[activeIndex + 1].id);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* Backdrop (Black 40% opacity + 8px blur) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window (88vw max 6xl, 88vh height, 20px radius, white bg) */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-[88vw] max-w-6xl h-[88vh] bg-white rounded-[20px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* STICKY TOP HEADER */}
          <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            
            {/* Left Header Title & Subtitle */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>📖 User Guide</span>
                  <span className="text-[11px] font-mono font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                    GT Companion v4.0
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Learn how to use GT Companion from start to finish.
                </p>
              </div>
            </div>

            {/* Right Search Input & Close Button */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              
              {/* Search Bar */}
              <div className="relative flex-1 md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Guide (e.g. quiz, AI, roadmap)..."
                  className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-8 py-2.5 outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>

            </div>

          </div>

          {/* MAIN MODAL BODY (SIDEBAR 280px + CONTENT AREA) */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* LEFT SIDEBAR (280px) */}
            <div className="w-[280px] flex-shrink-0 border-r border-slate-200 bg-slate-50/70 p-4 space-y-4 overflow-y-auto custom-scrollbar">
              
              {/* Sidebar Header Title */}
              <div className="px-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Getting Started ({filteredSections.length})
                </span>
              </div>

              {/* Navigation Items List */}
              <div className="space-y-1">
                {filteredSections.map((sec) => {
                  const isActive = sec.id === activeSectionId;

                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                        isActive
                          ? 'bg-blue-50/90 text-blue-700 font-semibold border-l-4 border-blue-600 shadow-xs pl-2.5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base select-none">{sec.emojiIcon}</span>
                        <span className="truncate">{sec.title}</span>
                      </div>
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}

                {filteredSections.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-500 space-y-1">
                    <p className="font-semibold text-slate-700">No sections found</p>
                    <p className="text-[11px]">Try searching for "quiz", "AI", or "roadmap".</p>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT CONTENT AREA */}
            <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:p-10 bg-white">
              
              <div className="space-y-8 max-w-4xl mx-auto w-full animate-fadeIn">
                
                {/* Section Category Pill & Main Heading */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{currentSection.category}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <span>{currentSection.emojiIcon}</span>
                    <span>{currentSection.content.heading}</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {currentSection.content.description}
                  </p>
                </div>

                {/* Feature Screenshot / Card Placeholder */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-2xl p-6 border border-slate-800 text-white shadow-xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800">
                      Feature Preview
                    </span>
                    <span className="text-xs font-mono text-slate-400">GT Companion UI</span>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <span>{currentSection.content.featurePreviewTitle}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentSection.content.featurePreviewDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Verified GT Portal Component</span>
                  </div>
                </div>

                {/* Pro Tip / Notes Callout Box */}
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-amber-900 shadow-2xs">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs sm:text-sm">
                    <span className="font-bold block text-amber-950">Important Trainee Tip</span>
                    <p className="leading-relaxed font-medium text-amber-900/90">
                      {currentSection.content.tipText}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Step-by-Step Instructions
                  </h3>

                  <div className="grid grid-cols-1 gap-3.5">
                    {currentSection.content.steps.map((st, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3.5 shadow-2xs">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                          {idx + 1}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900">{st.step}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{st.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* NAVIGATION FOOTER (< Previous | Section X of 15 | Next >) */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto w-full">
                
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Reading Progress Indicator */}
                <div className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
                  Section <span className="text-blue-700 font-bold">{activeIndex + 1}</span> of {GUIDE_SECTIONS.length}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={activeIndex === GUIDE_SECTIONS.length - 1}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeIndex === GUIDE_SECTIONS.length - 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                  }`}
                >
                  <span>Next Section</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
