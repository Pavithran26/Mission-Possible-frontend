import React, { useState, useMemo } from 'react';
import { X, Lock, Key, CheckCircle2, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { changePasswordApi } from '../services/api';
import { useToast } from '../context/ToastContext';

interface ChangePasswordModalProps {
  isOpen: boolean;
  userEmail: string;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  userEmail,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { addToast } = useToast();

  // Real-time password requirement validators
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword);

  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  const isConfirmFilled = confirmPassword.length > 0;
  const isPasswordMatch = isConfirmFilled && newPassword === confirmPassword;
  const isPasswordMismatch = isConfirmFilled && newPassword !== confirmPassword;

  const isSubmitDisabled = useMemo(() => {
    return (
      isLoading ||
      !currentPassword.trim() ||
      !isPasswordValid ||
      !isPasswordMatch
    );
  }, [isLoading, currentPassword, isPasswordValid, isPasswordMatch]);

  if (!isOpen) return null;

  const handleResetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleClose = () => {
    handleResetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPassword.trim()) {
      setErrorMsg('Please enter your current password.');
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
      const res = await changePasswordApi(userEmail, currentPassword, newPassword);
      setIsLoading(false);

      if (res.success) {
        setSuccessMsg(res.message || 'Password changed successfully!');
        addToast('success', 'Your password has been updated successfully.');
        setTimeout(() => {
          handleClose();
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Failed to update password. Please check your current password.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'An error occurred while updating your password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden text-slate-900 max-h-[92vh] overflow-y-auto">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/90 rounded-full border border-slate-200/80 transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-blue-600 shadow-inner mb-2">
            <Key className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Change Password
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Update your account password for <span className="font-semibold text-slate-800">{userEmail}</span>
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs flex items-center gap-2 mb-3 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-2.5 rounded-xl text-xs flex items-center gap-2 mb-3 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Current Password */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                required
              />
            </div>
          </div>

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

            {/* Match / Mismatch Message Indicator */}
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

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`flex-1 py-3 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSubmitDisabled
                  ? 'bg-slate-300 text-slate-500 shadow-none cursor-not-allowed border border-slate-200'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
              }`}
            >
              {isLoading ? (
                <span>Updating...</span>
              ) : (
                <>
                  <span>Change Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
