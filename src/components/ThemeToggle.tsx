import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 flex items-center cursor-pointer shadow-inner border ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-200 border-slate-300/80 hover:bg-slate-300/80'
      }`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label="Toggle theme mode"
    >
      {/* Background Track Icons */}
      <Sun className="w-3.5 h-3.5 text-amber-500 absolute left-1.5 pointer-events-none" />
      <Moon className="w-3.5 h-3.5 text-indigo-400 absolute right-1.5 pointer-events-none" />

      {/* Sliding Knob (Moves Left <-> Right) */}
      <div
        className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center z-10 ${
          isDark ? 'translate-x-7 bg-slate-900' : 'translate-x-0 bg-white'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-indigo-400 fill-indigo-400" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500 fill-amber-500" />
        )}
      </div>
    </button>
  );
};
