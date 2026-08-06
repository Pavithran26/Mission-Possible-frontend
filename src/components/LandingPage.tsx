import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: (role?: 'GT' | 'Admin') => void;
  onOpenSignUp: () => void;
  onExplorePlatform?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenSignUp
}) => {
  return (
    <div className="min-h-screen text-slate-900 flex flex-col justify-between relative overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none"
      >
        <source src="/premium.mp4" type="video/mp4" />
      </video>

      {/* Soft overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-white/50 to-blue-50/60 z-0 pointer-events-none" />

      {/* Soft Ambient Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10 flex-1 flex items-center justify-center">
        
        {/* ========================================== */}
        {/* SECTION 1: HERO SECTION                    */}
        {/* ========================================== */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-8">
          
          {/* Centered Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-blue-700 text-xs font-semibold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>GRADUATE TRAINEE KNOWLEDGE BASE</span>
            </div>

            {/* Product Name & Hero Headline */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase block">
                GT Companion
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                Learn from{' '}
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Previous Batches.
                </span>{' '}
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                   Share with 
                </span>{' '}
                the Next.

              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
             A centralized knowledge hub where Graduate Trainees can discover, access, and share notes, guides, documents, and valuable resources throughout their journey.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenLogin('GT')}
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Login to Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSignUp}
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-md hover:border-slate-400 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Sign Up</span>
              </button>
            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};
