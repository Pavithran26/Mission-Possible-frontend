import React, { useState, useEffect } from 'react';
import { User, Session, Quiz, RoadmapTopic, StudyMaterial } from './types';
import { mockUser, mockSessions } from './data/mockData';
import { fetchSessionsApi, logActivityApi } from './services/api';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { SessionsList } from './components/GT/SessionsList';
import { SessionDetailView } from './components/GT/SessionDetailView';
import { QuizView } from './components/GT/QuizView';
import { InteractivePlayground } from './components/GT/InteractivePlayground';
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
import { UserGuideModal } from './components/UserGuideModal';
import { X, LayoutDashboard, BookOpen, Terminal, GraduationCap, Sparkles, Table } from 'lucide-react';
import { useToast } from './context/ToastContext';

// Helpers for URL Hash Sync & Route Persistence
const getHashState = () => {
  const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#\/?/, '') : '';
  if (!hash || hash === 'landing') return { portal: 'Landing' as const };

  const [pathPart, queryPart] = hash.split('?');
  const params = new URLSearchParams(queryPart || '');
  const parts = pathPart.split('/').filter(Boolean);

  if (parts[0] === 'gt') {
    const view = parts[1] || 'sessions';
    if (view === 'playground') return { portal: 'GT' as const, gtViewMode: 'playground' as const };
    
    // sessions route
    const sessionId = parts[2] || null;
    const quizId = parts[3] === 'quiz' ? parts[4] : null;
    return {
      portal: 'GT' as const,
      gtViewMode: 'sessions' as const,
      selectedSessionId: sessionId,
      quizId,
      sessionTab: params.get('tab') || 'roadmap',
      sessionTopicId: params.get('topic') || ''
    };
  }

  if (parts[0] === 'admin') {
    const adminMode = (parts[1] || 'tracker') as any;
    return {
      portal: 'Admin' as const,
      adminViewMode: adminMode,
      adminSessionId: params.get('sessionId') || null
    };
  }

  return { portal: 'Landing' as const };
};

const buildHashFromState = (
  portal: 'Landing' | 'GT' | 'Admin',
  gtMode: 'sessions' | 'playground',
  adminMode: string,
  sessionId: string | null,
  quizId: string | null,
  sessionTab: string,
  sessionTopicId: string,
  adminSessionId: string | null
) => {
  if (portal === 'Landing') return '#landing';
  if (portal === 'GT') {
    if (gtMode === 'playground') return '#gt/playground';
    if (sessionId) {
      if (quizId) return `#gt/sessions/${sessionId}/quiz/${quizId}`;
      let q = `?tab=${encodeURIComponent(sessionTab)}`;
      if (sessionTopicId) q += `&topic=${encodeURIComponent(sessionTopicId)}`;
      return `#gt/sessions/${sessionId}${q}`;
    }
    return '#gt/sessions';
  }
  if (portal === 'Admin') {
    let base = `#admin/${adminMode}`;
    if (adminSessionId && ['roadmap-builder', 'material-uploader', 'quiz-builder'].includes(adminMode)) {
      base += `?sessionId=${encodeURIComponent(adminSessionId)}`;
    }
    return base;
  }
  return '#landing';
};

export function App() {
  const initialHashState = getHashState();

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('gt_auth_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentUser) return parsed.currentUser;
      }
    } catch (e) {}
    return mockUser;
  });

  const [sessions, setSessions] = useState<Session[]>(mockSessions);

  // Global Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gt_auth_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isAuthenticated);
      }
    } catch (e) {}
    return false;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalRole, setAuthModalRole] = useState<'GT' | 'Admin'>('GT');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gt_auth_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isAdminAuthenticated);
      }
    } catch (e) {}
    return false;
  });
  
  // Navigation State
  const [activePortal, setActivePortal] = useState<'Landing' | 'GT' | 'Admin'>(initialHashState.portal);
  const [gtViewMode, setGtViewMode] = useState<'sessions' | 'playground'>(
    initialHashState.portal === 'GT' && 'gtViewMode' in initialHashState ? initialHashState.gtViewMode : 'sessions'
  );
  const [adminViewMode, setAdminViewMode] = useState<'dashboard' | 'sessions' | 'tracker' | 'roadmap-builder' | 'material-uploader' | 'quiz-builder'>(
    initialHashState.portal === 'Admin' && 'adminViewMode' in initialHashState ? initialHashState.adminViewMode : 'tracker'
  );

  // Detail Selection State
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    initialHashState.portal === 'GT' && 'selectedSessionId' in initialHashState
      ? (initialHashState.selectedSessionId ?? null)
      : null
  );
  const [sessionDetailTab, setSessionDetailTab] = useState<string>(
    initialHashState.portal === 'GT' && 'sessionTab' in initialHashState
      ? (initialHashState.sessionTab ?? 'roadmap')
      : 'roadmap'
  );
  const [sessionDetailTopicId, setSessionDetailTopicId] = useState<string>(
    initialHashState.portal === 'GT' && 'sessionTopicId' in initialHashState
      ? (initialHashState.sessionTopicId ?? '')
      : ''
  );
  const [activeAdminSession, setActiveAdminSession] = useState<Session | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [restoredActiveQuiz, setRestoredActiveQuiz] = useState<boolean>(false);

  // Features State
  const [inspectModeActive, setInspectModeActive] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState<boolean>(false);

  // Keyboard shortcut listener for '?' to open User Guide
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '?' || (e.shiftKey && e.key === '/')) && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsUserGuideOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);



  // Auth Handlers
  const handleOpenLogin = (role: 'GT' | 'Admin' = 'GT') => {
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleAuthSuccess = (role: 'GT' | 'Admin', userData?: { name: string; email: string; isGuest?: boolean }) => {
    setIsAuthenticated(true);
    if (userData) {
      setCurrentUser(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email,
        role: role,
        isGuest: userData.isGuest ?? prev.isGuest
      }));
    }
    setActivePortal(role);
    if (role === 'Admin') {
      setIsAdminAuthenticated(true);
      setAdminViewMode('tracker');
    } else {
      setIsAdminAuthenticated(false);
    }
    setIsAuthModalOpen(false);
  };

  const { addToast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('gt_auth_session');
    setIsAuthenticated(false);
    setIsAdminAuthenticated(false);
    setActivePortal('Landing');
    setSelectedSessionId(null);
    setActiveQuiz(null);
    window.location.hash = '#landing';
    addToast('info', 'You have been logged out.');
  };

  // Sync Auth State to localStorage
  useEffect(() => {
    localStorage.setItem('gt_auth_session', JSON.stringify({
      isAuthenticated,
      currentUser,
      isAdminAuthenticated
    }));
  }, [isAuthenticated, currentUser, isAdminAuthenticated]);

  // Sync URL Hash whenever navigation state changes (Pushing browser history entries)
  useEffect(() => {
    const newHash = buildHashFromState(
      activePortal,
      gtViewMode,
      adminViewMode,
      selectedSessionId,
      activeQuiz?.id || null,
      sessionDetailTab,
      sessionDetailTopicId,
      activeAdminSession?.id || null
    );

    if (window.location.hash !== newHash) {
      window.history.pushState(null, '', newHash);
    }
  }, [
    activePortal,
    gtViewMode,
    adminViewMode,
    selectedSessionId,
    activeQuiz,
    sessionDetailTab,
    sessionDetailTopicId,
    activeAdminSession
  ]);

  // Listen to Hash Changes (Browser Back / Forward / Direct URL Entry)
  useEffect(() => {
    const handleHashChange = () => {
      const state = getHashState();
      setActivePortal(state.portal);
      if (state.portal === 'GT') {
        if ('gtViewMode' in state) setGtViewMode(state.gtViewMode);
        setSelectedSessionId('selectedSessionId' in state ? (state.selectedSessionId ?? null) : null);
        if ('sessionTab' in state && state.sessionTab) setSessionDetailTab(state.sessionTab);
        if ('sessionTopicId' in state && state.sessionTopicId !== undefined) setSessionDetailTopicId(state.sessionTopicId);
        
        if ('quizId' in state && state.quizId) {
          const foundSession = sessions.find(s => s.id === state.selectedSessionId);
          const foundQuiz = foundSession?.quizzes?.find(q => q.id === state.quizId);
          if (foundQuiz) setActiveQuiz(foundQuiz);
        } else {
          setActiveQuiz(null);
        }
      } else if (state.portal === 'Admin') {
        if ('adminViewMode' in state) setAdminViewMode(state.adminViewMode);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [sessions]);

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
    const state = getHashState();
    const savedQuizId = (state.portal === 'GT' && 'quizId' in state && state.quizId) || sessionStorage.getItem('activeQuizId');
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
    if (activePortal === 'Admin' && sessions.length > 0 && !activeAdminSession) {
      const state = getHashState();
      if (state.portal === 'Admin' && 'adminSessionId' in state && state.adminSessionId) {
        const match = sessions.find(s => s.id === state.adminSessionId);
        if (match) setActiveAdminSession(match);
      }
    }
  }, [sessions, activePortal, activeAdminSession]);

  const handleSaveAdminSession = (sessionData: Partial<Session>) => {
    if (!sessionData.id) return;
    setSessions(prev => {
      const exists = prev.some(s => s.id === sessionData.id);
      if (exists) {
        addToast('success', 'Session updated successfully');
        return prev.map(s => s.id === sessionData.id ? { ...s, ...sessionData } as Session : s);
      } else {
        addToast('success', 'New session created successfully');
        return [sessionData as Session, ...prev];
      }
    });
  };

  const handleDeleteAdminSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    addToast('info', 'Session deleted');
  };

  const rawSelectedSession = sessions.find(s => s.id === selectedSessionId);
  const selectedSession = rawSelectedSession ? {
    ...rawSelectedSession,
    studyMaterials: rawSelectedSession.studyMaterials || [],
    quizzes: rawSelectedSession.quizzes || [],
    discussions: []
  } : undefined;

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
          if (portal === 'Admin' && currentUser.role !== 'Admin') {
            addToast('error', 'Access Denied (RBAC): Admin console is restricted to L&D Administrators.');
            return;
          }
          setActivePortal(portal);
          setSelectedSessionId(null);
          setActiveQuiz(null);
          if (portal === 'Admin') {
            setAdminViewMode('tracker');
          }
          if (portal !== 'GT') {
            setInspectModeActive(false);
          }
        }}
        inspectModeActive={inspectModeActive}
        setInspectModeActive={setInspectModeActive}
        onOpenLogin={handleOpenLogin}
        onOpenChangePassword={handleOpenChangePassword}
        onLogout={handleLogout}
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
        onOpenUserGuide={() => setIsUserGuideOpen(true)}
      />

      {/* Main Body View Switching */}
      <main className="flex-1 w-full mx-auto">
        
        {/* Unauthenticated Landing Page View */}
        {(!isAuthenticated || activePortal === 'Landing') && (
          <LandingPage
            onOpenLogin={handleOpenLogin}
            onOpenUserGuide={() => setIsUserGuideOpen(true)}
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
                  addToast('success', `Quiz completed! You earned ${Math.round(score * 1.5)} XP.`);
                }}
              />
            ) : selectedSession ? (
              <SessionDetailView
                session={selectedSession}
                onBack={() => {
                  setSelectedSessionId(null);
                  setActiveQuiz(null);
                }}
                onStartQuiz={(quiz) => {
                  setActiveQuiz(quiz);
                  sessionStorage.setItem('activeQuizId', quiz.id);
                  logActivityApi('StartQuiz', `User started quiz for session: ${selectedSession.name}`);
                }}
                initialTab={sessionDetailTab}
                initialTopicId={sessionDetailTopicId}
                onStateChange={(tab, topicId) => {
                  setSessionDetailTab(tab);
                  if (topicId !== undefined) setSessionDetailTopicId(topicId);
                }}
              />
            ) : (
              <SessionsList
                sessions={sessions}
                onSelectSession={(id) => {
                  setSelectedSessionId(id);
                  const sessionName = sessions.find(s => s.id === id)?.name || id;
                  logActivityApi('StartLearning', `User opened learning session: ${sessionName}`);
                }}
              />
            )}

          </div>
        )}

        {/* Authenticated Admin View */}
        {isAuthenticated && activePortal === 'Admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!isAdminAuthenticated ? (
              <AdminAuthGate
                onLoginSuccess={(userData) => {
                  handleAuthSuccess('Admin', userData);
                }}
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
              />
            ) : (
              <div className="space-y-6">
                
                {/* Sub-Navigation Bar for Admin Portal */}
                <div className="bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-sm">
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
                    onClick={() => setAdminViewMode('dashboard')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                      adminViewMode === 'dashboard'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    Admin Overview
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

      {/* Auth Modal (Clean Login & Multi-Step Forgot Password) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialRole={authModalRole}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Change Password Modal (For Authenticated Users from Profile) */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        userEmail={currentUser.email}
        onClose={() => setIsChangePasswordOpen(false)}
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



      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 bg-white/80 backdrop-blur-md text-center text-xs text-slate-500 font-mono">
        Enterprise L&D Student Portal System • Built for Graduate Trainee Programs
      </footer>

      {/* User Guide Full-Screen Modal */}
      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
      />

    </div>
  );
}

export default App;

// viewed
