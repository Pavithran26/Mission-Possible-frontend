import React from 'react';
import { User, Session, Announcement, Badge } from '../../types';
import { 
  Play, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  AlertCircle,
  BarChart3,
  Brain,
  Target,
  Zap,
  Lock,
  ArrowRight
} from 'lucide-react';

interface GTDashboardProps {
  currentUser: User;
  sessions: Session[];
  announcements: Announcement[];
  badges: Badge[];
  onSelectSession: (sessionId: string) => void;
  onOpenPlayground: () => void;
}

export const GTDashboard: React.FC<GTDashboardProps> = ({
  currentUser,
  sessions,
  announcements,
  badges,
  onSelectSession,
  onOpenPlayground
}) => {
  // Continue Learning Session
  const continueSession = sessions.find(s => s.isBookmarked) || sessions[0];
  const totalProgressSum = sessions.reduce((acc, s) => acc + s.progressPercent, 0);
  const overallProgressPercent = Math.round(totalProgressSum / sessions.length);

  // Skill Mastery dataset
  const skillsList = [
    { name: 'C# Programming', level: 92, status: 'Mastered' },
    { name: 'OOP & SOLID', level: 88, status: 'Strong' },
    { name: 'LINQ & Transformation', level: 84, status: 'Proficient' },
    { name: 'SQL & Database Design', level: 71, status: 'Good' },
    { name: 'Async / Await', level: 48, status: 'Skill Gap', gap: true },
  ];

  // Learning Path Steps
  const learningPathSteps = [
    { title: 'C# Fundamentals', status: 'completed' },
    { title: 'OOP & SOLID', status: 'completed' },
    { title: 'LINQ & Queries', status: 'completed' },
    { title: 'Async / Await', status: 'current' },
    { title: 'ASP.NET Core', status: 'locked' },
    { title: 'Web API Architecture', status: 'locked' },
    { title: 'Entity Framework Core', status: 'locked' },
    { title: 'Final Assessment', status: 'locked' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-white pb-12">
      
      {/* 1. DASHBOARD HERO */}
      <div className="hero-banner relative bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-xl overflow-hidden text-slate-900">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Graduate Trainee Batch 2026</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-2xl">
            You're <strong className="text-slate-900 font-bold">80%</strong> through your <strong className="text-slate-900 font-bold">.NET with C#</strong> learning path. Complete today's recommended challenge to maintain your streak and bridge identified skill gaps.
          </p>
        </div>
      </div>

      {/* 2. CONTINUE WHERE YOU LEFT OFF & SKILL JOURNEY SNIPPET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Continue Learning Card (8 cols) */}
        {continueSession && (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4 text-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase tracking-wider block">
                  CONTINUE WHERE YOU LEFT OFF
                </span>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{continueSession.name}</h3>
                <p className="text-slate-500 text-xs">80% Complete • Last activity: Today, 10:42 AM</p>
              </div>

              <button
                onClick={() => onSelectSession(continueSession.id)}
                className="self-start sm:self-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume Learning</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">CURRENT TOPIC</span>
                <span className="font-semibold text-slate-900">LINQ & Transformation</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">NEXT MILESTONE</span>
                <span className="font-semibold text-blue-700">Async / Await Challenge</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] font-mono block">ESTIMATED TIME</span>
                <span className="font-semibold text-emerald-700 font-mono">25 Minutes</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Access Playground Card (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800/90 rounded-3xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <BarChart3 className="w-4 h-4" />
                HANDS-ON LABS
              </span>
              <span className="text-[10px] font-mono text-slate-400">Interactive</span>
            </div>

            <div className="pt-3 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-200">1. C# LINQ Playground</span>
                <span className="text-emerald-400 font-bold">✅ Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-200">2. Async Task Runner</span>
                <span className="text-amber-400 font-bold">🟡 In Progress</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-200">3. SQL Query Simulator</span>
                <span className="text-cyan-400 font-bold">⚡ Ready</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenPlayground}
            className="w-full text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 py-2.5 rounded-xl bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-500/20 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Launch Code Playground</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 3. YOUR LEARNING HEALTH (3 STAT CARDS) */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
          YOUR LEARNING HEALTH
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-2px_-2px_8px_rgba(255,255,255,0.02)] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Experience</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">{currentUser.xp}</span>
              <span className="text-xs font-bold text-emerald-500 font-mono">XP</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-2px_-2px_8px_rgba(255,255,255,0.02)] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Learning Streak</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-amber-400 font-mono">{currentUser.streakDays}</span>
              <span className="text-xs font-bold text-amber-500 font-mono">Days</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-2px_-2px_8px_rgba(255,255,255,0.02)] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Track Completion</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-blue-400 font-mono">78%</span>
              <span className="text-xs font-bold text-blue-500 font-mono">Overall</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. SKILL MASTERY & AI SKILL GAP DETECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Skill Mastery (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800/90 rounded-3xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              SKILL MASTERY
            </h3>
            <span className="text-[10px] font-mono text-slate-400">5 Evaluated Competencies</span>
          </div>

          <div className="space-y-3 pt-1">
            {skillsList.map((skill, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    {skill.name}
                    {skill.gap && <span className="text-[10px] bg-rose-500/20 text-rose-400 px-1.5 py-0.2 rounded border border-rose-500/30">⚠️ Skill Gap</span>}
                  </span>
                  <span className={`font-mono ${skill.gap ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800/80 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6)]">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      skill.gap ? 'bg-rose-500' : skill.level >= 80 ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Skill Gap Detection (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800/90 rounded-3xl p-6 shadow-[5px_5px_15px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(255,255,255,0.02)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-400" />
                AI LEARNING INSIGHT
              </h3>
              <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                Action Required
              </span>
            </div>

            <div className="pt-3 space-y-3 text-xs">
              <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-2xl text-amber-200 leading-relaxed">
                <span className="font-bold block text-white mb-1">AI detected a skill gap in Async / Await (48% mastery).</span>
                Completing the recommended Async / Await remediation sequence will optimize your performance before ASP.NET Core Web API deployment.
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">Recommended Remediation Sequence:</span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">1. Review Task & Await Concepts</span>
                    <span className="text-slate-400">8 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">2. Complete Challenge #3 Exercises</span>
                    <span className="text-slate-400">10 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">3. Take Mini Knowledge Check</span>
                    <span className="text-slate-400">5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 6. AVAILABLE SESSIONS & ANNOUNCEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sessions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white tracking-tight">Available Learning Tracks</h3>
            <span className="text-xs text-slate-400 font-mono">{sessions.length} Sessions Enrolled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl p-4 cursor-pointer transition-all duration-200 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-28 rounded-xl overflow-hidden">
                    <img src={session.thumbnail} alt={session.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 bg-white/95 text-blue-700 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 font-bold shadow-sm">
                      {session.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {session.trainerName && (
                      <div className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-fit">
                        <span className="text-slate-500 text-[10px]">Trainer:</span>{' '}
                        <span className="text-blue-700 font-bold">{session.trainerName}</span>
                      </div>
                    )}

                    <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors line-clamp-1">
                      {session.name}
                    </h4>
                    <p className="text-slate-600 text-[11px] line-clamp-2 mt-1">{session.description}</p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{session.durationHours} hrs</span>
                  <span className="font-bold text-emerald-700 font-mono">{session.progressPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* L&D Announcements */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>L&D Announcements</span>
          </h3>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 font-mono text-[11px]">{ann.author}</span>
                  <span className="text-[10px] text-slate-500">{ann.date}</span>
                </div>
                <h4 className="font-bold text-white text-xs">{ann.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. MINIMAL ENTERPRISE FOOTER (SECTION R) */}
      <footer className="mt-12 border-t border-slate-800/80 pt-8 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <span className="font-bold text-slate-300">Student Portal</span> • Enterprise L&D System
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <button onClick={onOpenPlayground} className="hover:text-slate-300">Playground</button>
          <span className="text-slate-700">|</span>
          <span className="hover:text-slate-300 cursor-pointer">Help & Terms</span>
        </div>
        <div>
          © 2026 Enterprise L&D. All rights reserved.
        </div>
      </footer>

    </div>
  );
};
