import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, AlertCircle } from 'lucide-react';
import { loginApi } from '../../services/api';

interface AdminAuthGateProps {
  onLoginSuccess: (userData?: { name: string; email: string }) => void;
  onCancel?: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginApi(email.trim(), password);
      setIsLoading(false);

      if (!res.success || !res.data) {
        setError(res.message || 'Invalid credentials. Please verify your email and password.');
        return;
      }

      // Strict RBAC Enforcement
      if (res.data.role !== 'Admin') {
        setError('Access Denied (RBAC): Your account has Associate/Student privileges and cannot access the L&D Admin Console. Please use the Companion portal.');
        return;
      }

      onLoginSuccess({
        name: `${res.data.firstName} ${res.data.lastName}`,
        email: res.data.email
      });
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Authentication error. Please try again.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fadeIn">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Restricted RBAC Access
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">Admin Portal Login</h2>
            <p className="text-slate-400 text-xs mt-1">
              Authentication required to access L&D management console and curriculum builder.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-2xl text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" /> Admin Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. Anukraha.Magdalene@valuemomentum.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-emerald-400" /> Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 mt-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authenticate & Access Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {onCancel && (
          <div className="text-center pt-2">
            <button
              onClick={onCancel}
              className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors cursor-pointer"
            >
              ← Return to Open GT Student Portal
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-[10px] text-slate-600 font-mono border-t border-slate-800/80">
          Role-Based Access Control (RBAC) Enforced
        </div>

      </div>
    </div>
  );
};
