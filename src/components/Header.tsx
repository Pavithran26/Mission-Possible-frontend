import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck,
  ArrowLeft,
  LogOut,
  BookOpen,
  Key
} from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  currentUser: User;
  activePortal: 'Landing' | 'GT' | 'Admin';
  setActivePortal: (portal: 'Landing' | 'GT' | 'Admin') => void;
  inspectModeActive: boolean;
  setInspectModeActive: (active: boolean) => void;
  onOpenLogin: (role?: 'GT' | 'Admin') => void;
  onOpenChangePassword?: () => void;
  onLogout: () => void;
  onOpenPlayground: () => void;
  onOpenUserGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  currentUser,
  activePortal,
  setActivePortal,
  onOpenLogin,
  onOpenChangePassword,
  onLogout,
  onOpenUserGuide
}) => {
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfilePopover(false);
      }
    };

    if (showProfilePopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfilePopover]);

  const handleBackToLogin = () => {
    onLogout();
    onOpenLogin(activePortal === 'Admin' ? 'Admin' : 'GT');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 text-slate-900 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Title Box */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              if (isAuthenticated) {
                setActivePortal('GT');
              } else {
                setActivePortal('Landing');
              }
            }} 
            className="flex items-center gap-3 group focus:outline-none"
            data-inspect-id="PrimaryButton"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 bg-clip-text text-transparent">
                GT Companion
              </span>
              <span className="block text-[10px] font-mono tracking-wider uppercase font-bold text-blue-700">
                Built by GT's, for GT's
              </span>
            </div>
          </button>

          {/* Current Active Portal Title Badge (GT Portal or Admin Portal) */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 shadow-inner">
              {activePortal === 'Admin' ? (
                <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Portal</span>
                </span>
              ) : (
                <span className="text-xs font-bold flex items-center gap-1.5 text-blue-700">
                  <UserCheck className="w-4 h-4" />
                  <span>GT Portal</span>
                </span>
              )}
            </div>
          )}
          {/* Unauthenticated Landing Navigation Links */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
              {/* <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-blue-600 transition-colors">
                Home
              </button> */}
            </nav>
          )}
        </div>
          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* User Guide Secondary CTA Button */}
            <button
              onClick={onOpenUserGuide}
              className="h-[42px] px-5 rounded-xl text-xs font-bold bg-white text-[#2563EB] border border-[#D7E7FF] hover:bg-[#F3F8FF] hover:border-[#2563EB] active:bg-[#2563EB] active:text-white transition-all duration-200 shadow-sm flex items-center gap-2 -translate-y-0 hover:-translate-y-0.5 cursor-pointer group select-none"
              title="Open User Guide (Shortcut: Shift + ?)"
            >
              <BookOpen className="w-4 h-4 text-[#2563EB] group-active:text-white transition-colors" />
              <span>User Guide</span>
            </button>

            {!isAuthenticated && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenLogin('GT')}
                  className="h-[42px] px-5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center cursor-pointer"
                >
                  Login
                </button>
              </div>
            )}

            {isAuthenticated && (
            /* Authenticated Header Tools */
            <div className="flex items-center gap-3">
              
              {/* Back to Login Button */}
              {/* <button
                onClick={handleBackToLogin}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
                title="Back to Login Page"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
                <span>Back to Login</span>
              </button> */}

              {/* Profile Menu */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfilePopover(prev => !prev)}
                  aria-label="Open profile menu"
                  title="Open profile menu"
                  className="relative p-0.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-sm"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/40"
                  />
                </button>

                {showProfilePopover && (
                  <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-4 animate-fadeIn text-slate-900">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-500/50"
                      />
                      <div>
                        <span className="font-bold text-sm text-slate-900 block leading-snug">{currentUser.name}</span>
                        <span className="text-[11px] text-blue-600 font-medium block">
                          {activePortal === 'Admin' ? 'L&D Administrator' : 'Graduate Trainee'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">GT Batch 2026</span>
                      </div>
                    </div>

                    {/* <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                     <span className="block text-amber-600 font-bold text-xs">🔥 {currentUser.streakDays} Days</span> 
                     <span className="text-[10px] text-slate-500 font-mono">Active Learning Streak</span> 
                    </div> */}

                    <div className="border-t border-slate-100 pt-3 space-y-1">
                      {onOpenChangePassword && (
                        <button
                          onClick={() => {
                            setShowProfilePopover(false);
                            onOpenChangePassword();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-between font-semibold cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Key className="w-3.5 h-3.5 text-blue-600" />
                            <span>Change Password</span>
                          </span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setShowProfilePopover(false);
                          handleBackToLogin();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-between font-semibold cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Back to Login</span>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
};

