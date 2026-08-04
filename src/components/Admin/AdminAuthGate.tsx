import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface AdminAuthGateProps {
  onLoginSuccess: () => void;
  onCancel?: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);

    // Simple validation rule: accept admin credentials or demo credentials
    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail.includes('admin') || cleanEmail.includes('@')) && 
        password.length >= 4
      ) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Hint: use admin@enterprise.com / admin123');
      }
    }, 600);
  };

  const handleFastFillDemo = () => {
    setEmail('admin@enterprise.com');
    setPassword('admin123');
    setError('');
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
              Restricted Access
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2">Admin Portal Login</h2>
            <p className="text-slate-400 text-xs mt-1">
              Authentication required to access L&D management console and curriculum builder.
            </p>
          </div>
        </div>

        {/* Demo Fast-Fill Button */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-slate-300 block">Default Admin Credentials</span>
            <span className="text-[10px] text-slate-500 font-mono">admin@enterprise.com • admin123</span>
          </div>
          <button
            type="button"
            onClick={handleFastFillDemo}
            className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold text-[11px] px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" /> Fast Fill
          </button>
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
              placeholder="e.g. admin@enterprise.com"
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
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 mt-2"
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
              className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors"
            >
              ← Return to Open GT Student Portal
            </button>
          </div>
        )}

        <div className="pt-2 text-center text-[10px] text-slate-600 font-mono border-t border-slate-800/80">
          Enterprise Security Enforcement • GT Portal Unrestricted
        </div>

      </div>
    </div>
  );
};
