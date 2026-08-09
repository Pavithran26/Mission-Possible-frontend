import React, { useState, useEffect, useMemo } from 'react';

import {
  BookOpen,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  FileText,
  LayoutDashboard,
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
    subsections: {
      title: string;
      description: string;
    }[];
  };
}

export const GUIDE_SECTIONS: GuideSection[] = [
  // =========================================================
  // OVERVIEW & CONCEPT
  // =========================================================
  {
    id: 'overview-concept',
    title: '1. Overview & Concept',
    icon: <BookOpen className="w-4 h-4" />,
    emojiIcon: '📘',
    category: 'Overview & Concept',
    keywords: [
      'overview',
      'concept',
      'gt companion',
      'platform',
      'learning',
      'knowledge management',
    ],
    summary:
      'Overview of GT Companion as a centralized onboarding, learning, and knowledge management platform.',
    content: {
      heading: '1. Overview & Concept',
      description:
        'GT Companion is a centralized onboarding, learning, and knowledge management platform built to help graduate trainees build expertise in both the insurance domain and software application development.',
      subsections: [
        {
          title: 'Who Uses the Platform',
          description:
            'Graduate Trainees / Learners consume structured learning tracks, study materials, assignments, and quizzes. Administrators / Trainers author, publish, and maintain learning tracks, session content, assignments, quizzes, and organization-wide progress.',
        },
        {
          title: 'Core Learning Domains Covered',
          description:
            'The platform hosts structured tracks across .NET with C#, Insurance Domain Fundamentals, SQL & Relational Databases, Data Modeling Fundamentals, Data Fundamentals, Frontend Development, Advanced Data Engineering, Software Testing Fundamentals, and Campus-to-Corporate Readiness.',
        },
      ],
    },
  },

  // =========================================================
  // PLATFORM FEATURES & FUNCTIONALITY
  // =========================================================
  {
    id: 'platform-features',
    title: '2. Platform Features & Functionality',
    icon: <LayoutDashboard className="w-4 h-4" />,
    emojiIcon: '⚙️',
    category: 'Platform Features & Functionality',
    keywords: [
      'features',
      'functionality',
      'learner',
      'administrator',
      'dashboard',
      'roadmap',
      'materials',
      'assignments',
      'quizzes',
      'tracker',
    ],
    summary:
      'Core learner-facing, administrator, and reporting features available in GT Companion.',
    content: {
      heading: '2. Platform Features & Functionality',
      description:
        "The platform's capabilities are organized into the Graduate Trainee learning experience and the Learning & Development administration experience.",
      subsections: [
        {
          title: 'Learner-Facing Features',
          description:
            'Learner features provide access to the platform, learning sessions, roadmaps, study materials, assignments, quizzes, and personal notes.',
        },
        {
          title: 'Landing Page, Login & Signup',
          description:
            'The public entry point and gateway into the Graduate Trainee experience, including login, signup, forgot password, and separate administrator access.',
        },
        {
          title: 'GT Dashboard (Learning Sessions Catalog)',
          description:
            'The learner home base containing a searchable catalog of available learning tracks with domain, trainer, description, and Open Learning Track actions.',
        },
        {
          title: 'Learning Track / Session Overview',
          description:
            'The detailed view of a learning track containing an introductory walkthrough and access to Road Map, Provided Materials, Additional Materials, Assignments, Quizzes, and Notes.',
        },
        {
          title: 'Structured Learning Roadmap',
          description:
            'An interactive module-based learning path containing numbered modules, topics, subtopics, summaries, and recommended learning order.',
        },
        {
          title: 'Provided Study Materials',
          description:
            'The central repository for organization-approved documents, presentations, videos, and reference notes.',
        },
        {
          title: 'Additional Reference Materials',
          description:
            'Supplementary content such as articles, tutorials, external references, research materials, and knowledge-sharing resources.',
        },
        {
          title: 'Assignments',
          description:
            'Practical exercises that allow learners to apply concepts covered within the learning track through hands-on and project-based activities.',
        },
        {
          title: 'Quizzes',
          description:
            'Knowledge assessments used to validate learner comprehension of topics covered in the roadmap and study materials.',
        },
        {
          title: 'Notes',
          description:
            'A personal workspace where learners record key learnings, reminders, observations, and revision points.',
        },
        {
          title: 'Administrator / L&D Features',
          description:
            'Administration features provide tools for managing learning sessions, authoring content, creating assignments and quizzes, and monitoring training.',
        },
        {
          title: 'Admin Overview',
          description:
            'The administrator landing view providing access to Session Management and Session Tracker.',
        },
        {
          title: 'Session Management',
          description:
            'The control center where administrators create, edit, publish, and manage learning sessions.',
        },
        {
          title: 'Session Editor',
          description:
            'A tabbed authoring workspace for building the roadmap, materials, assignments, and quiz for a learning session.',
        },
        {
          title: 'Session Overview & Road Map',
          description:
            'Administrators configure session information, learning objectives, overview content, module hierarchy, topic sequencing, and subtopic structure.',
        },
        {
          title: 'Provided & Additional Materials',
          description:
            'Administrators maintain official learning resources separately from supplementary references and external resources.',
        },
        {
          title: 'Assignments',
          description:
            'Administrators create practical hands-on tasks containing an assignment name, due date, and description.',
        },
        {
          title: 'Quiz Builder',
          description:
            'Administrators create multiple-choice questions, answer options, correct answers, scoring criteria, time limits, and passing thresholds.',
        },
        {
          title: 'Session Tracker',
          description:
            'An organization-wide reporting view of scheduled sessions across tracks and trainers with filters, record management, and Excel export.',
        },
      ],
    },
  },

  // =========================================================
  // FORM FIELD & WINDOW-LEVEL REFERENCE
  // =========================================================
  {
    id: 'form-field-reference',
    title: '3. Form Field & Window-Level Reference',
    icon: <FileText className="w-4 h-4" />,
    emojiIcon: '📝',
    category: 'Form Field & Window-Level Reference',
    keywords: [
      'form',
      'field',
      'window',
      'reference',
      'input',
      'control',
      'button',
      'authentication',
      'session editor',
    ],
    summary:
      'Detailed reference for platform input fields, controls, buttons, and windows.',
    content: {
      heading: '3. Form Field & Window-Level Reference',
      description:
        'This section documents the input fields, controls, and buttons found throughout the platform, organized by authentication, learner-facing, administrator, and reporting windows.',
      subsections: [
        {
          title: 'Authentication Windows — Learner-Facing',
          description:
            'Documents the Graduate Trainee Corporate Login, Create Account, and related learner authentication controls.',
        },
        {
          title: 'Corporate Login — Graduate Trainee',
          description:
            'Includes the role toggle, credential option, employee email, password, remember me, forgot password, login, and signup controls.',
        },
        {
          title: 'Create Account (Sign Up) — Graduate Trainee',
          description:
            'Includes role selection, full name, employee email, new password, confirm password, account creation, and login controls.',
        },
        {
          title: 'Reset Password',
          description:
            'Includes employee email, new password, confirm password, Reset Password, and Back to Login controls.',
        },
        {
          title: 'Authentication Windows — Administrator-Facing',
          description:
            'Documents the L&D Admin Corporate Login and its role-specific authentication controls.',
        },
        {
          title: 'Corporate Login — L&D Admin',
          description:
            'Includes the L&D Admin role toggle, employee email, password, remember me, forgot password, login, and signup controls.',
        },
        {
          title: 'Learner-Facing Windows',
          description:
            'Documents the GT Dashboard, Learning Sessions catalog, Learning Track / Session Overview, Provided Materials, and Additional Materials controls.',
        },
        {
          title: 'GT Dashboard (Learning Sessions Catalog)',
          description:
            'Includes Learning Sessions / Knowledge Hub navigation, session search, learning track filtering, and Open Learning Track actions.',
        },
        {
          title: 'Learning Track / Session Overview',
          description:
            'Provides navigation to the learning content tabs available within a session.',
        },
        {
          title: 'Provided Study Materials',
          description:
            'Includes content-type filters, material search, and Open / Download actions.',
        },
        {
          title: 'Additional Reference Materials',
          description:
            'Includes supplementary content filters, additional material search, and Access Reference actions.',
        },
        {
          title: 'Administrator Windows',
          description:
            'Documents the Admin Overview, Session Management, and Session Editor windows.',
        },
        {
          title: 'Admin Overview',
          description:
            'Provides navigation between Admin Overview, Session Management, and Session Tracker, along with category filters and session search.',
        },
        {
          title: 'Session Management',
          description:
            'Includes status filters, session search, Create New Session, Edit Session, Publish, and Delete actions.',
        },
        {
          title: 'Session Editor — Shared Header',
          description:
            'Includes Cancel & Return, Session Editor tabs, Draft Mode, Cancel, and Save All Session Changes controls.',
        },
        {
          title: 'Session Editor — Session Overview',
          description:
            'Includes Session Title, Description, Category Track, Trainer Name, Session Status, and Overview Video controls.',
        },
        {
          title: 'Session Editor — Road Map',
          description:
            'Includes Add New Topic Node, Topic Title, Topic Description, Remove Topic Node, Subtopic fields, Delete Subtopic, and Add Subtopic Node.',
        },
        {
          title: 'Session Editor — Provided Materials',
          description:
            'Includes Add Provided Material, Document Name, Type of Document, Document Description, Upload Document, URL fields, and Remove controls.',
        },
        {
          title: 'Session Editor — Additional Materials',
          description:
            'Includes Add Additional Material, Document Name, Type of Document, Description, Upload Document, URL fields, and Remove controls.',
        },
        {
          title: 'Session Editor — Assignments',
          description:
            'Includes Add New Assignment, Assignment Name, Due Date, Description, and Remove controls.',
        },
        {
          title: 'Session Editor — Quiz Builder',
          description:
            'Includes Add Quiz Question, Question Prompt, Options A-D, Correct Answer, and Remove controls.',
        },
        {
          title: 'Reporting & Record-Entry Windows',
          description:
            'Documents Session Tracker filtering, record management, Excel export, and the Upload New Session Details / Add Record window.',
        },
        {
          title: 'Session Tracker',
          description:
            'Includes filters for Session Code, Session Name, Trainer Name, Schedule Date, Schedule Time, Category, and global keyword search, along with Add Record, Export Excel, Edit, and Delete actions.',
        },
        {
          title: 'Upload New Session Details / Add Record',
          description:
            'Includes Session Code / ID, Category / Learning Track, Session Name / Title, Trainer / Instructor, Schedule Date, Schedule Time, Hrs, Session Remarks / Additional Notes, Cancel, and Save Record Details.',
        },
      ],
    },
  },
];

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(
        'gt_user_guide_last_section'
      );

      if (
        saved &&
        GUIDE_SECTIONS.some((section) => section.id === saved)
      ) {
        return saved;
      }
    } catch (e) {}

    return GUIDE_SECTIONS[0]?.id || '';
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(
        'gt_user_guide_last_section',
        activeSectionId
      );
    } catch (e) {}
  }, [activeSectionId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return GUIDE_SECTIONS;
    }

    const query = searchQuery.toLowerCase().trim();

    return GUIDE_SECTIONS.filter((section) => {
      const searchableText = [
        section.title,
        section.category,
        section.summary,
        ...section.keywords,
        section.content.heading,
        section.content.description,
        ...section.content.subsections.flatMap((subsection) => [
          subsection.title,
          subsection.description,
        ]),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  const activeIndex = GUIDE_SECTIONS.findIndex(
    (section) => section.id === activeSectionId
  );

  const currentSection =
    GUIDE_SECTIONS[activeIndex] || GUIDE_SECTIONS[0];

  /*
   * Duplicate-topic protection
   *
   * Removes duplicate subsection titles only within the
   * currently displayed section.
   *
   * The comparison is case-insensitive and ignores:
   * - leading/trailing spaces
   * - multiple spaces between words
   *
   * This means:
   * "Session Tracker"
   * "session tracker"
   * " Session Tracker "
   *
   * are treated as the same topic.
   *
   * The original data in GUIDE_SECTIONS is not modified.
   */
  const uniqueSubsections = useMemo(() => {
    if (!currentSection?.content?.subsections) {
      return [];
    }

    const seen = new Set<string>();

    return currentSection.content.subsections.filter((subsection) => {
      const normalizedTitle = subsection.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');

      if (seen.has(normalizedTitle)) {
        return false;
      }

      seen.add(normalizedTitle);
      return true;
    });
  }, [currentSection]);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveSectionId(
        GUIDE_SECTIONS[activeIndex - 1].id
      );
    }
  };

  const handleNext = () => {
    if (activeIndex < GUIDE_SECTIONS.length - 1) {
      setActiveSectionId(
        GUIDE_SECTIONS[activeIndex + 1].id
      );
    }
  };

  if (!isOpen || !currentSection) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0,
            y: 15,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
            y: 15,
          }}
          transition={{
            duration: 0.25,
            ease: 'easeOut',
          }}
          className="relative w-[88vw] max-w-6xl h-[88vh] bg-white rounded-[20px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10 text-slate-900"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Header */}
          <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>📖 User Guide</span>

                  <span className="text-[11px] font-mono font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                    GT Companion
                  </span>
                </h2>

                <p className="text-xs text-slate-500 font-medium">
                  Platform Feature & Functionality Documentation
                </p>
              </div>

            </div>

            {/* Search + Close */}
            <div className="flex items-center gap-3 w-full md:w-auto">

              <div className="relative flex-1 md:w-72">

                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search sections..."
                  className="w-full bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-8 py-2.5 outline-none transition-all"
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

              <button
                onClick={onClose}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>

            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">

            {/* Sidebar */}
            <div className="w-[300px] flex-shrink-0 border-r border-slate-200 bg-slate-50/70 p-4 overflow-y-auto">

              <div className="px-2 mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Documentation Sections ({filteredSections.length})
                </span>
              </div>

              <div className="space-y-1">

                {filteredSections.map((section) => {
                  const isActive =
                    section.id === activeSectionId;

                  return (
                    <button
                      key={section.id}
                      onClick={() =>
                        setActiveSectionId(section.id)
                      }
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600 shadow-xs pl-2.5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                    >

                      <div className="flex items-center gap-2.5 min-w-0">

                        <span className="text-base select-none">
                          {section.emojiIcon}
                        </span>

                        <span className="truncate">
                          {section.title}
                        </span>

                      </div>

                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      )}

                    </button>
                  );
                })}

                {filteredSections.length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">
                      No sections found
                    </p>

                    <p className="text-[11px] mt-1">
                      Try searching for a documentation section.
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-y-auto p-6 sm:p-8 lg:p-10 bg-white">

              <div className="max-w-4xl mx-auto w-full">

                {/* Section Category */}
                <div className="mb-4">

                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold font-mono">
                    <BookOpen className="w-3.5 h-3.5" />
                    {currentSection.category}
                  </span>

                </div>

                {/* Section Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <span>{currentSection.emojiIcon}</span>
                  <span>{currentSection.content.heading}</span>
                </h1>

                {/* Section Description */}
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentSection.content.description}
                </p>

                {/* Subsections */}
                <div className="mt-8 space-y-4">

                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Sections
                  </h3>

                  <div className="grid grid-cols-1 gap-3">

                    {uniqueSubsections.map(
                      (subsection, index) => (
                        <div
                          key={`${currentSection.id}-subtopic-${index}`}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-4"
                        >

                          <div>

                            <h4 className="text-sm font-bold text-slate-900">
                              {subsection.title}
                            </h4>

                            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                              {subsection.description}
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto w-full">

                <button
                  onClick={handlePrevious}
                  disabled={activeIndex === 0}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
                  Section{' '}
                  <span className="text-blue-700 font-bold">
                    {activeIndex + 1}
                  </span>{' '}
                  of {GUIDE_SECTIONS.length}
                </div>

                <button
                  onClick={handleNext}
                  disabled={
                    activeIndex === GUIDE_SECTIONS.length - 1
                  }
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeIndex === GUIDE_SECTIONS.length - 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 cursor-pointer'
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
