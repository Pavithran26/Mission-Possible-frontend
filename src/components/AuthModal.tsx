import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, ShieldCheck, UserCheck, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { loginApi, registerApi } from '../services/api';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup' | 'forgot';
  initialRole?: 'GT' | 'Admin';
  onClose: () => void;
  onAuthSuccess: (role: 'GT' | 'Admin', userData?: { name: string; email: string; isGuest?: boolean }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  initialRole = 'GT',
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'GT' | 'Admin'>(initialRole);

  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(initialRole);
    }
  }, [isOpen, initialMode, initialRole]);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dontHaveCredentials, setDontHaveCredentials] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!email.trim()) {
        addToast('error', 'Please enter your employee email');
        return;
      }
      if (!password) {
        addToast('error', 'Please enter your new password');
        return;
      }
      if (password !== confirmPassword) {
        addToast('error', 'Passwords do not match');
        return;
      }
      addToast('success', 'Password has been reset successfully! Please log in with your new password.');
      setMode('login');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        addToast('error', 'Please enter your full name');
        return;
      }
      if (!email.trim()) {
        addToast('error', 'Please enter your employee email');
        return;
      }
      if (password !== confirmPassword) {
        addToast('error', 'Passwords do not match');
        return;
      }
      
      try {
        const parts = fullName.trim().split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ') || 'User';
        await registerApi(firstName, lastName, email, password);
        addToast('success', 'Account created successfully! Please log in.');
        setMode('login');
        setPassword('');
        setConfirmPassword('');
        return;
      } catch (err: any) {
        addToast('error', err.message || 'Registration failed');
        return;
      }
    }

    if (mode === 'login' && selectedRole === 'GT' && dontHaveCredentials) {
      onAuthSuccess('GT', {
        name: 'Guest Trainee',
        email: 'guest@valuemomentum.com',
        isGuest: true
      });
      return;
    }

    if (!email.trim()) {
      addToast('error', 'Please enter your employee email');
      return;
    }

    try {
      const result = await loginApi(email.trim(), password);
      // Assuming result.data contains token and user details
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
      }
      onAuthSuccess(selectedRole, {
        name: result.data?.firstName ? `${result.data.firstName} ${result.data.lastName}` : (fullName.trim() || (selectedRole === 'Admin' ? 'L&D Administrator' : 'Sarah Jenkins')),
        email: email.trim(),
        isGuest: false
      });
      addToast('success', `Welcome back! Logged in successfully.`);
    } catch (err: any) {
      addToast('error', err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white/85 backdrop-blur-2xl border border-white/60 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden text-slate-900">
        
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
          selectedRole === 'Admin' ? 'from-emerald-500 via-teal-400 to-emerald-600' : 'from-blue-600 via-cyan-400 to-indigo-600'
        }`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/90 rounded-full border border-slate-200/80 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 text-[11px] font-semibold text-blue-700 font-mono shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>GT Companion</span>
          </div> */}

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {mode === 'login' ? 'Welcome to GT Companion' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {mode === 'login'
              ? 'Your companion for knowledge, resources, and growth.'
              : mode === 'signup'
              ? 'Register your employee profile for GT Learning Hub'
              : 'Enter your employee email and set your new password'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 mb-6">
            <button
              type="button"
              onClick={() => { setSelectedRole('GT'); }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                selectedRole === 'GT'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Associates</span>
            </button>
            <button
              type="button"
              onClick={() => { setSelectedRole('Admin'); }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                selectedRole === 'Admin'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Learning and Development</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                />
              </div>
            </div>
          )}

          {/* GT Login: Don't Have Credential Checkbox above Email box */}
          {mode === 'login' && selectedRole === 'GT' && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/80">
              <input
                type="checkbox"
                id="dontHaveCredentialsCheck"
                checked={dontHaveCredentials}
                onChange={(e) => setDontHaveCredentials(e.target.checked)}
                className="rounded border-slate-300 bg-white text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="dontHaveCredentialsCheck" className="text-xs font-semibold text-slate-800 cursor-pointer select-none">
                Don't have credential
              </label>
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Employee Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                disabled={mode === 'login' && selectedRole === 'GT' && dontHaveCredentials}
                placeholder={selectedRole === 'Admin' ? 'admin@gt.com' : 'user@gt.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm ${
                  mode === 'login' && selectedRole === 'GT' && dontHaveCredentials ? 'opacity-50 cursor-not-allowed bg-slate-100/90' : ''
                }`}
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              {mode === 'signup' || mode === 'forgot' ? 'New Password' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                disabled={mode === 'login' && selectedRole === 'GT' && dontHaveCredentials}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm ${
                  mode === 'login' && selectedRole === 'GT' && dontHaveCredentials ? 'opacity-50 cursor-not-allowed bg-slate-100/90' : ''
                }`}
              />
            </div>
          </div>

          {/* Confirm Password input */}
          {(mode === 'signup' || mode === 'forgot') && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 bg-white text-blue-600 focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => { setMode('forgot'); }}
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit & Reset Buttons */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all mt-2 ${
              mode === 'forgot'
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : selectedRole === 'Admin'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
            }`}
          >
            <span>
              {mode === 'forgot'
                ? 'Reset Password'
                : mode === 'login'
                ? `Login as ${selectedRole === 'Admin' ? 'L&D Admin' : 'Graduate Trainee'}`
                : 'Create Account & Enter'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Back Button for Forgot Password */}
          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => { setMode('login'); }}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center"
            >
              Back to Login
            </button>
          )}

        </form>

        {/* Footer Toggle Mode */}
        {mode !== 'forgot' && (
          <div className="mt-6 pt-4 border-t border-slate-200/80 text-center text-xs text-slate-600 font-medium">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); }}
                  className="text-blue-600 font-bold hover:text-blue-800 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); }}
                  className="text-blue-600 font-bold hover:text-blue-800 hover:underline"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
