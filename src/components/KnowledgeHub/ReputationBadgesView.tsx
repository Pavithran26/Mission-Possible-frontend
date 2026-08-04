import React from 'react';
import { ReputationProfile, User } from '../../types';
import { 
  Award, 
  Crown, 
  HelpCircle, 
  MessageSquare, 
  Upload, 
  ThumbsUp, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';

interface ReputationBadgesViewProps {
  reputationProfile: ReputationProfile;
  currentUser: User;
}

export const ReputationBadgesView: React.FC<ReputationBadgesViewProps> = ({
  reputationProfile,
  currentUser
}) => {
  const getLevelColor = (lvl: string) => {
    switch (lvl) {
      case 'Champion': return 'from-amber-500 to-yellow-600 text-amber-300';
      case 'Mentor': return 'from-purple-600 to-violet-600 text-purple-300';
      case 'Expert': return 'from-blue-600 to-cyan-600 text-blue-300';
      case 'Contributor': return 'from-emerald-600 to-teal-600 text-emerald-300';
      default: return 'from-slate-700 to-slate-800 text-slate-300';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Gold': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Silver': return 'bg-slate-400/10 text-slate-300 border-slate-400/30';
      case 'Bronze': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  const leaderboardUsers = [
    { rank: 1, name: 'David Miller', role: 'Principal Mentor', points: 890, level: 'Champion', solvedCount: 42, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { rank: 2, name: 'Elena Rostova', role: 'Lead Trainer', points: 720, level: 'Champion', solvedCount: 35, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
    { rank: 3, name: 'Alex Vance', role: 'GT (Mentor Level)', points: reputationProfile.points, level: reputationProfile.level, solvedCount: 14, avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { rank: 4, name: 'Priya Sharma', role: 'GT', points: 280, level: 'Expert', solvedCount: 11, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { rank: 5, name: 'Marcus Wright', role: 'GT', points: 195, level: 'Expert', solvedCount: 8, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner with User Rank & Level */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900 border border-slate-800 space-y-6 shadow-2xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
              alt="Avatar" 
              className="w-16 h-16 rounded-2xl border-2 border-blue-500 shadow-xl" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{currentUser.name}</h2>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold font-mono bg-gradient-to-r ${getLevelColor(reputationProfile.level)} border border-current/20`}>
                  {reputationProfile.level} Level
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">{currentUser.role} • Batch {currentUser.batch}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-[10px] text-slate-400 font-medium">Reputation Points</p>
              <p className="text-2xl font-black text-amber-400">{reputationProfile.points}</p>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <p className="text-[10px] text-slate-400 font-medium">Accepted Answers</p>
              <p className="text-2xl font-black text-emerald-400">{reputationProfile.acceptedAnswers}</p>
            </div>
            <div className="text-center px-3">
              <p className="text-[10px] text-slate-400 font-medium">Badges Earned</p>
              <p className="text-2xl font-black text-purple-400">
                {reputationProfile.badges.filter(b => b.isEarned).length}
              </p>
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-300">Level Progress: {reputationProfile.level} → Champion</span>
            <span className="text-amber-400 font-mono">{reputationProfile.points} / {reputationProfile.nextLevelPoints} Points</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800">
            <div 
              className="bg-gradient-to-r from-blue-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${Math.min(100, (reputationProfile.points / reputationProfile.nextLevelPoints) * 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* Points Breakdown Guide */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Knowledge Hub Reputation Points Calculator</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-[10px]">Create Question</p>
            <p className="text-base font-bold text-blue-400">+2 Pts</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-[10px]">Answer Question</p>
            <p className="text-base font-bold text-purple-400">+5 Pts</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-[10px]">Accepted Answer</p>
            <p className="text-base font-bold text-emerald-400">+15 Pts</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-[10px]">Upvote Received</p>
            <p className="text-base font-bold text-amber-400">+10 Pts</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-[10px]">Upload Document</p>
            <p className="text-base font-bold text-cyan-400">+5 Pts</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
            <p className="text-slate-400 text-[10px]">Helpful Comment</p>
            <p className="text-base font-bold text-rose-400">+3 Pts</p>
          </div>
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-400" />
          <span>Knowledge Hub Badges Matrix (Bronze, Silver, Gold)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {reputationProfile.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border space-y-3 transition-all ${
                badge.isEarned 
                  ? 'bg-slate-950 border-slate-800/80 shadow-md' 
                  : 'bg-slate-950/40 border-slate-800/40 opacity-50 grayscale'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border font-mono ${getTierBadgeColor(badge.tier)}`}>
                  {badge.tier}
                </span>
                {badge.isEarned && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">{badge.description}</p>
              </div>

              {badge.earnedDate && (
                <p className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                  Earned: {badge.earnedDate}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Community Batch Leaderboard</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] text-slate-500 font-mono uppercase bg-slate-950/60 border-b border-slate-800">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Level</th>
                <th className="p-3">Solutions</th>
                <th className="p-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leaderboardUsers.map((u) => (
                <tr key={u.rank} className="hover:bg-slate-950/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-white">#{u.rank}</td>
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <img src={u.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
                    <span>{u.name}</span>
                  </td>
                  <td className="p-3 text-slate-400">{u.role}</td>
                  <td className="p-3 font-bold text-purple-400">{u.level}</td>
                  <td className="p-3 text-emerald-400 font-bold">{u.solvedCount} Accepted</td>
                  <td className="p-3 text-right font-mono font-bold text-amber-400">{u.points} Pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
