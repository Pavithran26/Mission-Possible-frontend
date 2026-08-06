import React, { useState, useEffect } from 'react';
import { User, Session, Quiz, RoadmapTopic, StudyMaterial, AppNotification, Announcement, Badge } from './types';
import { mockUser, mockSessions, mockAnnouncements, mockBadges } from './data/mockData';
import { fetchSessionsApi, logActivityApi } from './services/api';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { GTDashboard } from './components/GT/GTDashboard';
import { SessionsList } from './components/GT/SessionsList';
import { SessionDetailView } from './components/GT/SessionDetailView';
import { QuizView } from './components/GT/QuizView';
import { InteractivePlayground } from './components/GT/InteractivePlayground';
import { KnowledgeHubView } from './components/KnowledgeHub/KnowledgeHubView';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { SessionManager } from './components/Admin/SessionManager';
import { RoadmapBuilder } from './components/Admin/RoadmapBuilder';
import { MaterialUploader } from './components/Admin/MaterialUploader';
import { QuizBuilder } from './components/Admin/QuizBuilder';
import { SessionTracker } from './components/Admin/SessionTracker';
import { AdminAuthGate } from './components/Admin/AdminAuthGate';
import { AIAssistant } from './components/AIAssistant';
import { InspectModeOverlay } from './components/InspectModeOverlay';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Bookmark, X, LayoutDashboard, BookOpen, Terminal, GraduationCap, Sparkles, Table } from 'lucide-react';

export function App() {
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  const [badges] = useState<Badge[]>(mockBadges);

  // Global Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authModalRole, setAuthModalRole] = useState<'GT' | 'Admin'>('GT');

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  
  // Navigation State
  const [activePortal, setActivePortal] = useState<'Landing' | 'GT' | 'Admin'>('Landing');
  const [gtViewMode, setGtViewMode] = useState<'sessions' | 'knowledge-hub' | 'playground'>('sessions');
  const [adminViewMode, setAdminViewMode] = useState<'dashboard' | 'sessions' | 'tracker' | 'roadmap-builder' | 'material-uploader' | 'quiz-builder'>('dashboard');

  // Detail Selection State
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [activeAdminSession, setActiveAdminSession] = useState<Session | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [restoredActiveQuiz, setRestoredActiveQuiz] = useState<boolean>(false);

  // Features State
  const [inspectModeActive, setInspectModeActive] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'New Material Version Added',
      message: 'Version 2.1 of .NET Memory Profiling guide has been published by Admin.',
      timestamp: '10 mins ago',
      type: 'material',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Batch Leaderboard Updated',
      message: 'You unlocked C# Champion badge (+100 XP)!',
      timestamp: '1 hour ago',
      type: 'announcement',
      read: false
    }
  ]);

  // Auth Handlers
  const handleOpenLogin = (role: 'GT' | 'Admin' = 'GT') => {
    setAuthModalMode('login');
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthModalMode('signup');
    setAuthModalRole('GT');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (role: 'GT' | 'Admin', userData?: { name: string; email: string }) => {
    setIsAuthenticated(true);
    if (userData) {
      setCurrentUser(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email
      }));
    }
    setActivePortal(role);
    if (role === 'Admin') {
      setIsAdminAuthenticated(true);
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    setActivePortal('Landing');
    setSelectedSessionId(null);
    setActiveQuiz(null);
  };

  // Reset Admin authentication whenever leaving the Admin portal
  useEffect(() => {
    if (activePortal !== 'Admin') {
      setIsAdminAuthenticated(false);
    }
  }, [activePortal]);

  useEffect(() => {
    fetchSessionsApi().then((data) => {
      if (data && data.length > 0) {
        setSessions(data);
      }
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (restoredActiveQuiz || !sessions.length) return;
    const savedQuizId = sessionStorage.getItem('activeQuizId');
    if (!savedQuizId) return;

    const sessionContainingQuiz = sessions.find(s => (s.quizzes || []).some(q => q.id === savedQuizId));
    const savedQuiz = sessionContainingQuiz?.quizzes?.find(q => q.id === savedQuizId) || null;
    if (savedQuiz) {
      setSelectedSessionId(sessionContainingQuiz?.id || null);
      setActiveQuiz(savedQuiz);
    }
    setRestoredActiveQuiz(true);
  }, [sessions, restoredActiveQuiz]);

  useEffect(() => {
    if (restoredActiveQuiz || !sessions.length) return;
    const savedQuizId = sessionStorage.getItem('activeQuizId');
    if (!savedQuizId) return;

    const sessionContainingQuiz = sessions.find(s => (s.quizzes || []).some(q => q.id === savedQuizId));
    const savedQuiz = sessionContainingQuiz?.quizzes?.find(q => q.id === savedQuizId) || null;
    if (savedQuiz) {
      setSelectedSessionId(sessionContainingQuiz?.id || null);
      setActiveQuiz(savedQuiz);
    }
    setRestoredActiveQuiz(true);
  }, [sessions, restoredActiveQuiz]);

  // Handlers
  const handleToggleBookmark = (sessionId: string) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        return { ...s, isBookmarked: !s.isBookmarked };
      }
      return s;
    }));
  };

  const handleSaveAdminSession = (sessionData: Partial<Session>) => {
    if (!sessionData.id) return;
    setSessions(prev => {
      const exists = prev.some(s => s.id === sessionData.id);
      if (exists) {
        return prev.map(s => s.id === sessionData.id ? { ...s, ...sessionData } as Session : s);
      } else {
        return [sessionData as Session, ...prev];
      }
    });
  };

  const handleDeleteAdminSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const rawSelectedSession = sessions.find(s => s.id === selectedSessionId);
  const selectedSession = rawSelectedSession ? {
    ...rawSelectedSession,
    studyMaterials: rawSelectedSession.studyMaterials || [],
    quizzes: rawSelectedSession.quizzes || [],
    discussions: []
  } : undefined;
  const bookmarkedSessions = sessions.filter(s => s.isBookmarked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* Top Fixed Header */}
      <Header
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        activePortal={activePortal}
        setActivePortal={(portal) => {
          if (!isAuthenticated && portal !== 'Landing') {
            handleOpenLogin(portal);
            return;
          }
          setActivePortal(portal);
          setSelectedSessionId(null);
          setActiveQuiz(null);
          if (portal !== 'GT') {
            setInspectModeActive(false);
          }
        }}
        inspectModeActive={inspectModeActive}
        setInspectModeActive={setInspectModeActive}
        onOpenLogin={handleOpenLogin}
        onOpenSignUp={handleOpenSignUp}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        onOpenBookmarks={() => setIsBookmarksOpen(!isBookmarksOpen)}
        onOpenPlayground={() => {
          if (!isAuthenticated) {
            handleOpenLogin('GT');
            return;
          }
          setActivePortal('GT');
          setGtViewMode('playground' as any);
          setSelectedSessionId(null);
          logActivityApi('OpenPlayground', 'User opened the interactive coding playground');
        }}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 w-full mx-auto">
        
        {/* Unauthenticated Landing Page View */}
        {(!isAuthenticated || activePortal === 'Landing') && (
          <LandingPage
            onOpenLogin={handleOpenLogin}
            onOpenSignUp={handleOpenSignUp}
          />
        )}

        {/* Authenticated GT View */}
        {isAuthenticated && activePortal === 'GT' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Sub-Navigation Bar for GT Portal */}
            {/* <div className="bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 overflow-x-auto no-scrollbar shadow-sm">
              <button
                onClick={() => { setGtViewMode('sessions'); setSelectedSessionId(null); setActiveQuiz(null); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  gtViewMode === 'sessions' && !selectedSessionId && !activeQuiz 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
                }`}
              >
                <BookOpen className={`w-4 h-4 ${gtViewMode === 'sessions' && !selectedSessionId && !activeQuiz ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <span>Learning Sessions ({sessions.length})</span>
              </button>

              <button
                onClick={() => { setGtViewMode('knowledge-hub'); setSelectedSessionId(null); setActiveQuiz(null); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  gtViewMode === 'knowledge-hub' && !selectedSessionId && !activeQuiz 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${gtViewMode === 'knowledge-hub' && !selectedSessionId && !activeQuiz ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                <span>Knowledge Hub</span>
              </button>
            </div> */}

            {/* View Render Logic */}
            {activeQuiz ? (
              <QuizView
                quiz={activeQuiz}
                onBack={() => {
                  setActiveQuiz(null);
                  sessionStorage.removeItem('activeQuizId');
                }}
                onQuizCompleted={(score) => {
                  setCurrentUser(prev => ({
                    ...prev,
                    xp: prev.xp + Math.round(score * 1.5)
                  }));
                }}
              />
            ) : selectedSession ? (
              <SessionDetailView
                session={selectedSession}
                onBack={() => setSelectedSessionId(null)}
                onStartQuiz={(quiz) => {
                  setActiveQuiz(quiz);
                  sessionStorage.setItem('activeQuizId', quiz.id);
                  logActivityApi('StartQuiz', `User started quiz for session: ${selectedSession.name}`);
                }}
                onToggleBookmark={handleToggleBookmark}
              />
            ) : gtViewMode === 'knowledge-hub' ? (
              <KnowledgeHubView currentUser={currentUser} />
            ) : (
              <SessionsList
                sessions={sessions}
                onSelectSession={(id) => {
                  setSelectedSessionId(id);
                  const sessionName = sessions.find(s => s.id === id)?.name || id;
                  logActivityApi('StartLearning', `User opened learning session: ${sessionName}`);
                }}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

          </div>
        )}

        {/* Authenticated Admin View */}
        {isAuthenticated && activePortal === 'Admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!isAdminAuthenticated ? (
              <AdminAuthGate
                onLoginSuccess={() => setIsAdminAuthenticated(true)}
                onCancel={() => setActivePortal('GT')}
              />
            ) : selectedSession ? (
              <SessionDetailView
                session={selectedSession}
                onBack={() => setSelectedSessionId(null)}
                onStartQuiz={(quiz) => {
                  setActiveQuiz(quiz);
                  sessionStorage.setItem('activeQuizId', quiz.id);
                }}
                onToggleBookmark={handleToggleBookmark}
              />
            ) : (
              <div className="space-y-6">
                
                {/* Sub-Navigation Bar for Admin Portal */}
                <div className="bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-sm">
                  <button
                    onClick={() => setAdminViewMode('dashboard')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      adminViewMode === 'dashboard'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    Admin Overview
                  </button>
                  <button
                    onClick={() => setAdminViewMode('sessions')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      adminViewMode === 'sessions'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    Session Management
                  </button>
                  <button
                    onClick={() => setAdminViewMode('tracker')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      adminViewMode === 'tracker'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    <Table className={`w-3.5 h-3.5 ${adminViewMode === 'tracker' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                    <span>Session Tracker</span>
                  </button>
                </div>

                {adminViewMode === 'dashboard' ? (
                  <AdminDashboard
                    sessions={sessions}
                    onAddNewSession={() => setAdminViewMode('sessions')}
                    onManageSessions={() => setAdminViewMode('sessions')}
                    onOpenSessionTracker={() => setAdminViewMode('tracker')}
                    onSaveSession={handleSaveAdminSession}
                    onDeleteSession={handleDeleteAdminSession}
                    onOpenRoadmapBuilder={(s) => {
                      setActiveAdminSession(s);
                      setAdminViewMode('roadmap-builder');
                    }}
                    onOpenMaterialUploader={(s) => {
                      setActiveAdminSession(s);
                      setAdminViewMode('material-uploader');
                    }}
                    onOpenQuizBuilder={(s) => {
                      setActiveAdminSession(s);
                      setAdminViewMode('quiz-builder');
                    }}
                    onSelectSession={(id) => {
                      setSelectedSessionId(id);
                    }}
                  />
                ) : adminViewMode === 'sessions' ? (
                  <SessionManager
                    sessions={sessions}
                    onSaveSession={handleSaveAdminSession}
                    onDeleteSession={handleDeleteAdminSession}
                    onOpenRoadmapBuilder={(s) => {
                      setActiveAdminSession(s);
                      setAdminViewMode('roadmap-builder');
                    }}
                    onOpenMaterialUploader={(s) => {
                      setActiveAdminSession(s);
                      setAdminViewMode('material-uploader');
                    }}
                    onOpenQuizBuilder={(s) => {
                      setActiveAdminSession(s);
                      setAdminViewMode('quiz-builder');
                    }}
                    onBackToDashboard={() => setAdminViewMode('dashboard')}
                  />
                ) : adminViewMode === 'tracker' ? (
                  <SessionTracker sessions={sessions} />
                ) : adminViewMode === 'roadmap-builder' && activeAdminSession ? (
                  <RoadmapBuilder
                    session={activeAdminSession}
                    onSave={(updatedTopics) => {
                      handleSaveAdminSession({ ...activeAdminSession, topics: updatedTopics });
                      setAdminViewMode('sessions');
                    }}
                    onBack={() => setAdminViewMode('sessions')}
                  />
                ) : adminViewMode === 'material-uploader' && activeAdminSession ? (
                  <MaterialUploader
                    session={activeAdminSession}
                    onSaveMaterials={(mats) => {
                      handleSaveAdminSession({ ...activeAdminSession, studyMaterials: mats });
                      setAdminViewMode('sessions');
                    }}
                    onBack={() => setAdminViewMode('sessions')}
                  />
                ) : adminViewMode === 'quiz-builder' && activeAdminSession ? (
                  <QuizBuilder
                    session={activeAdminSession}
                    onSaveQuiz={(quiz) => {
                      handleSaveAdminSession({ ...activeAdminSession, quizzes: [quiz] });
                      setAdminViewMode('sessions');
                    }}
                    onBack={() => setAdminViewMode('sessions')}
                  />
                ) : null}

              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating AI Learning Assistant - Available in authenticated GT Portal */}
      {isAuthenticated && activePortal === 'GT' && (
        <AIAssistant
          currentSessionName={selectedSession?.name}
        />
      )}

      {/* Flagship Feature: Learning Inspect Mode Drawer - Available in authenticated GT Portal */}
      {isAuthenticated && activePortal === 'GT' && (
        <InspectModeOverlay
          isActive={inspectModeActive}
          onToggle={() => setInspectModeActive(!inspectModeActive)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        initialRole={authModalRole}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Global Command-K Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        sessions={sessions}
        onSelectSession={(id) => {
          if (!isAuthenticated) {
            handleOpenLogin('GT');
            return;
          }
          setActivePortal('GT');
          setSelectedSessionId(id);
        }}
      />

      {/* Saved Bookmarks Drawer Slide-Over */}
      {isBookmarksOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between animate-fadeIn">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Bookmark className="w-4 h-4 fill-amber-400" />
                  <span>Saved Bookmarks ({bookmarkedSessions.length})</span>
                </div>
                <button
                  onClick={() => setIsBookmarksOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {bookmarkedSessions.length === 0 ? (
                  <p className="text-slate-500 text-xs text-center py-8">
                    No bookmarked sessions yet. Click the bookmark icon on any session card to save it here.
                  </p>
                ) : (
                  bookmarkedSessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        if (!isAuthenticated) {
                          handleOpenLogin('GT');
                          return;
                        }
                        setActivePortal('GT');
                        setSelectedSessionId(s.id);
                        setIsBookmarksOpen(false);
                      }}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 cursor-pointer space-y-2 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{s.name}</span>
                        <span className="text-emerald-400 font-mono">{s.progressPercent}%</span>
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-1">{s.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
              Quick Bookmarks • Student Portal L&D
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 bg-white/80 backdrop-blur-md text-center text-xs text-slate-500 font-mono">
        Enterprise L&D Student Portal System • Built for Graduate Trainee Programs
      </footer>

    </div>
  );
}

export default App;
