import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Lock, Mail, ShieldCheck, UserCheck, ArrowRight, ArrowLeft, Key, CheckCircle2, AlertCircle, Check, RefreshCw, Timer } from 'lucide-react';
import { loginApi, forgotPasswordApi, verifyOtpApi, resetPasswordApi } from '../services/api';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  initialRole?: 'GT' | 'Admin';
  onClose: () => void;
  onAuthSuccess: (role: 'GT' | 'Admin', userData?: { name: string; email: string; isGuest?: boolean }) => void;
}

type ModalView = 'login' | 'forgot-email' | 'verify-otp' | 'new-password';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialRole = 'GT',
  onClose,
  onAuthSuccess,
}) => {
  const [view, setView] = useState<ModalView>('login');
  const [selectedRole, setSelectedRole] = useState<'GT' | 'Admin'>(initialRole);
  
  // Loading & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // OTP & Reset Password Fields
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // OTP Expiry & Resend Timers
  const [otpTimerSeconds, setOtpTimerSeconds] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { addToast } = useToast();

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setView('login');
      setSelectedRole(initialRole);
      setErrorMsg('');
      setSuccessMsg('');
      setIsLoading(false);
      setOtpDigits(['', '', '', '']);
      setResetToken('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [isOpen, initialRole]);

  // Handle OTP Timer Countdown
  useEffect(() => {
    if (view === 'verify-otp') {
      setOtpTimerSeconds(300);
      setCanResend(false);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setOtpTimerSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setCanResend(true);
            return 0;
          }
          if (prev === 240) { // after 60s allow resend
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view]);

  // Password Requirements Validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const isConfirmFilled = confirmPassword.length > 0;
  const isPasswordMatch = isConfirmFilled && newPassword === confirmPassword;
  const isPasswordMismatch = isConfirmFilled && newPassword !== confirmPassword;

  // 4-digit combined OTP string
  const fullOtp = otpDigits.join('');

  // Submit button disabled states
  const isLoginDisabled = isLoading || !email.trim() || !password.trim();
  const isSendOtpDisabled = isLoading || !recoveryEmail.trim() || !recoveryEmail.includes('@');
  const isVerifyOtpDisabled = isLoading || fullOtp.length !== 4;
  const isResetDisabled = isLoading || !isPasswordValid || !isPasswordMatch;

  if (!isOpen) return null;

  // Format MM:SS for countdown timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Handlers ---

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginApi(email.trim(), password);
      setIsLoading(false);

      if (!res.success || !res.data) {
        setErrorMsg(res.message || 'Invalid credentials. Please verify your email and password.');
        return;
      }

      // Strict RBAC Check
      if (selectedRole === 'Admin' && res.data.role !== 'Admin') {
        setErrorMsg('Access Denied (RBAC): Your account is registered as an Associate and cannot access the L&D Admin console.');
        return;
      }

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      const fullName = res.data.firstName ? `${res.data.firstName} ${res.data.lastName}` : (selectedRole === 'Admin' ? 'L&D Admin' : 'Graduate Trainee');

      onAuthSuccess(res.data.role, {
        name: fullName,
        email: res.data.email,
        isGuest: false
      });

      addToast('success', `Welcome back, ${res.data.firstName || 'User'}! Logged in successfully.`);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!recoveryEmail.trim() || !recoveryEmail.includes('@')) {
      setErrorMsg('Please enter a valid registered email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await forgotPasswordApi(recoveryEmail.trim());
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg(res.message || 'OTP has been sent to your registered email address.');
        addToast('success', 'Verification OTP sent to your email.');
        setView('verify-otp');
        setOtpDigits(['', '', '', '']);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        setErrorMsg(res.message || 'Failed to send OTP. Please verify your email.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Error occurred while sending OTP.');
    }
  };

  const handleResendOtp = async () => {
    if (isResending || !canResend) return;
    setErrorMsg('');
    setSuccessMsg('');
    setIsResending(true);

    try {
      const res = await forgotPasswordApi(recoveryEmail.trim());
      setIsResending(false);

      if (res.success) {
        setSuccessMsg('A new verification code has been sent to your email.');
        addToast('success', 'New verification OTP sent.');
        setOtpDigits(['', '', '', '']);
        setOtpTimerSeconds(300);
        setCanResend(false);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        setErrorMsg(res.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      setIsResending(false);
      setErrorMsg(err.message || 'Error occurred while resending OTP.');
    }
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = numericValue;
    setOtpDigits(newDigits);
    setErrorMsg('');

    if (numericValue && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pastedData) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 4; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setOtpDigits(newDigits);
    const focusIndex = Math.min(pastedData.length, 3);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (fullOtp.length !== 4) {
      setErrorMsg('Please enter all 4 digits of the OTP.');
      return;
    }

    if (otpTimerSeconds <= 0) {
      setErrorMsg('The verification code has expired. Please click Resend OTP.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOtpApi(recoveryEmail.trim(), fullOtp);
      setIsLoading(false);

      if (res.success && res.resetToken) {
        setResetToken(res.resetToken);
        setSuccessMsg('OTP verified successfully!');
        addToast('success', 'Verification successful.');
        setView('new-password');
      } else {
        setErrorMsg(res.message || 'Invalid verification code. Please check and try again.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Error verifying OTP.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!resetToken) {
      setErrorMsg('Authorization token missing. Please restart the verification flow.');
      return;
    }

    if (!isPasswordValid) {
      setErrorMsg('Please satisfy all password complexity requirements.');
      return;
    }

    if (!isPasswordMatch) {
      setErrorMsg('Passwords do not match. Please verify your confirm password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPasswordApi(recoveryEmail.trim(), resetToken, newPassword);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg(res.message || 'Password has been reset successfully!');
        addToast('success', 'Password reset successfully! Please login with your new password.');
        setTimeout(() => {
          setView('login');
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setRecoveryEmail('');
          setResetToken('');
        }, 1500);
      } else {
        setErrorMsg(res.message || 'Failed to reset password. Please restart the recovery flow.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Error occurred while resetting password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden text-slate-900 max-h-[92vh] overflow-y-auto">
        
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
          selectedRole === 'Admin' ? 'from-emerald-500 via-teal-400 to-emerald-600' : 'from-blue-600 via-cyan-400 to-indigo-600'
        }`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/90 rounded-full border border-slate-200/80 transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 mb-5">
          {view === 'login' && (
            <>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Welcome to GT Companion
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Enter your credentials to access your enterprise learning portal.
              </p>
            </>
          )}

          {view === 'forgot-email' && (
            <>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600 shadow-inner mb-2">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Forgot Password
              </h2>
              <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                Enter your registered email address to receive a verification OTP.
              </p>
            </>
          )}

          {view === 'verify-otp' && (
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto text-amber-600 shadow-inner mb-2">
                <Key className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Verify OTP
              </h2>
              <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                Enter the 4-digit OTP sent to <span className="font-semibold text-slate-900">{recoveryEmail}</span>
              </p>
            </>
          )}

          {view === 'new-password' && (
            <>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-inner mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Create New Password
              </h2>
              <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                Enter your new secure password to finalize password recovery.
              </p>
            </>
          )}
        </div>

        {/* Role Selector Tabs (Only in Login View) */}
        {view === 'login' && (
          <div className="grid grid-cols-2 gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 mb-5">
            <button
              type="button"
              onClick={() => { setSelectedRole('GT'); setErrorMsg(''); setEmail(''); setPassword(''); }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
              onClick={() => { setSelectedRole('Admin'); setErrorMsg(''); setEmail(''); setPassword(''); }}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedRole === 'Admin'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Learning & Development</span>
            </button>
          </div>
        )}

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs flex items-center gap-2 mb-3.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-2.5 rounded-xl text-xs flex items-center gap-2 mb-3.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 1: CLEAN LOGIN FORM (NO QUICK LOGIN, NO CHANGE PW) */}
        {/* ======================================================== */}
        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email / Username field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Employee Email / Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder={selectedRole === 'Admin' ? 'admin.email@valuemomentum.com' : 'employee.email@valuemomentum.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password Link */}
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 bg-white text-blue-600 focus:ring-0 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setRecoveryEmail(email || '');
                  setErrorMsg('');
                  setSuccessMsg('');
                  setView('forgot-email');
                }}
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoginDisabled}
              className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all mt-3 cursor-pointer ${
                isLoginDisabled
                  ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed border border-slate-200'
                  : selectedRole === 'Admin'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
              }`}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{selectedRole === 'Admin' ? 'Login as L&D Admin' : 'Login as Associate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: FORGOT PASSWORD — STEP 1: ENTER EMAIL           */}
        {/* ======================================================== */}
        {view === 'forgot-email' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g. employee.name@valuemomentum.com"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendOtpDisabled}
              className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer ${
                isSendOtpDisabled
                  ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed border border-slate-200'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
              }`}
            >
              {isLoading ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setView('login');
              }}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: FORGOT PASSWORD — STEP 2: VERIFY 4-DIGIT OTP     */}
        {/* ======================================================== */}
        {view === 'verify-otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            
            {/* 6-Digit OTP Inputs */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-2 text-center">
                Enter 4-Digit Verification Code
              </label>
              <div className="flex items-center justify-center gap-2" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpInputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-lg font-bold font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                  />
                ))}
              </div>
            </div>

            {/* OTP Expiry Countdown & Resend Option */}
            <div className="flex items-center justify-between text-xs px-1 pt-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-mono">
                <Timer className="w-3.5 h-3.5 text-amber-600" />
                <span>Expires in: <strong className={otpTimerSeconds < 60 ? 'text-rose-600 font-bold' : 'text-slate-800'}>{formatTimer(otpTimerSeconds)}</strong></span>
              </div>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend || isResending}
                className={`font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  canResend && !isResending
                    ? 'text-blue-600 hover:text-blue-800 hover:underline'
                    : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Resending...' : 'Resend OTP'}</span>
              </button>
            </div>

            {/* Verify & Next Button */}
            <button
              type="submit"
              disabled={isVerifyOtpDisabled}
              className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer ${
                isVerifyOtpDisabled
                  ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed border border-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
              }`}
            >
              {isLoading ? (
                <span>Verifying OTP...</span>
              ) : (
                <>
                  <span>Verify OTP & Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setView('forgot-email');
              }}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Email</span>
            </button>

          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: FORGOT PASSWORD — STEP 3: CREATE NEW PASSWORD     */}
        {/* ======================================================== */}
        {view === 'new-password' && (
          <form onSubmit={handleResetPassword} className="space-y-3.5">
            
            {/* New Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password Requirements Checklist */}
            <div className="p-3 bg-slate-50/90 border border-slate-200/90 rounded-2xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 font-mono uppercase tracking-wider">
                  Password Requirements
                </span>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                  isPasswordValid
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {[hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length}/5 Satisfied
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <div className={`flex items-center gap-1.5 transition-colors ${hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                    hasMinLength ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {hasMinLength ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                  </div>
                  <span>At least 8 characters</span>
                </div>

                <div className={`flex items-center gap-1.5 transition-colors ${hasUpperCase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                    hasUpperCase ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {hasUpperCase ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                  </div>
                  <span>One uppercase letter</span>
                </div>

                <div className={`flex items-center gap-1.5 transition-colors ${hasLowerCase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                    hasLowerCase ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {hasLowerCase ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                  </div>
                  <span>One lowercase letter</span>
                </div>

                <div className={`flex items-center gap-1.5 transition-colors ${hasNumber ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                    hasNumber ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {hasNumber ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                  </div>
                  <span>One number</span>
                </div>

                <div className={`flex items-center gap-1.5 transition-colors col-span-1 sm:col-span-2 ${hasSpecialChar ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all ${
                    hasSpecialChar ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {hasSpecialChar ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                  </div>
                  <span>One special character (@, #, $, %, &, *, !)</span>
                </div>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 bg-white/90 border rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 shadow-sm ${
                    isPasswordMismatch
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : isPasswordMatch
                      ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  required
                />
              </div>

              {/* Match Indicator */}
              {isConfirmFilled && (
                <div className={`text-[11px] font-medium flex items-center gap-1.5 mt-1.5 animate-fadeIn ${
                  isPasswordMatch ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {isPasswordMatch ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                      <span>Passwords match</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-rose-600" />
                      <span>Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Submit Reset Button */}
            <button
              type="submit"
              disabled={isResetDisabled}
              className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer ${
                isResetDisabled
                  ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed border border-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
              }`}
            >
              {isLoading ? (
                <span>Resetting Password...</span>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setView('login');
              }}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancel & Back to Login</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
