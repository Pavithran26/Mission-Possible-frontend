import React, { useState } from 'react';
import { KnowledgeHubDiscussion, KnowledgeHubDocument } from '../../types';
import { moderatorStats } from '../../data/knowledgeHubData';
import { 
  ShieldAlert, 
  Lock, 
  Trash2, 
  Merge, 
  CheckCircle2, 
  Tag, 
  UserX, 
  BarChart3, 
  TrendingUp, 
  Search, 
  Users, 
  FileText, 
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';

interface ModeratorConsoleProps {
  discussions: KnowledgeHubDiscussion[];
  documents: KnowledgeHubDocument[];
  onLockDiscussion: (discussionId: string) => void;
  onDeleteDiscussion: (discussionId: string) => void;
  onApproveDocument: (docId: string) => void;
}

export const ModeratorConsole: React.FC<ModeratorConsoleProps> = ({
  discussions,
  documents,
  onLockDiscussion,
  onDeleteDiscussion,
  onApproveDocument
}) => {
  const [activeTab, setActiveTab] = useState<'moderation' | 'analytics' | 'governance'>('moderation');
  const [selectedMergeFrom, setSelectedMergeFrom] = useState('');
  const [selectedMergeTo, setSelectedMergeTo] = useState('');

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto shadow-sm">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'moderation' 
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
              : 'text-slate-700 dark:text-slate-200 hover:text-rose-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${activeTab === 'moderation' ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`} />
          <span>Moderator Console</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'analytics' 
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
              : 'text-slate-700 dark:text-slate-200 hover:text-rose-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
          }`}
        >
          <BarChart3 className={`w-4 h-4 ${activeTab === 'analytics' ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`} />
          <span>Admin Knowledge Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('governance')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'governance' 
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' 
              : 'text-slate-700 dark:text-slate-200 hover:text-rose-700 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/70'
          }`}
        >
          <Tag className={`w-4 h-4 ${activeTab === 'governance' ? 'text-white' : 'text-rose-600 dark:text-rose-400'}`} />
          <span>Tag & Governance Manager</span>
        </button>
      </div>

      {activeTab === 'moderation' && (
        <div className="space-y-6">
          
          {/* Discussions Moderation Table */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Discussion Post Controls (Lock, Delete, Merge Duplicates)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[11px] text-slate-500 font-mono uppercase bg-slate-950/60 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Topic</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">State</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {discussions.map((disc) => (
                    <tr key={disc.id} className="hover:bg-slate-950/40">
                      <td className="p-3 font-bold text-white max-w-xs truncate">{disc.title}</td>
                      <td className="p-3 text-purple-400 font-mono">{disc.topicName}</td>
                      <td className="p-3 text-slate-400">{disc.authorName}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                          {disc.state} {disc.isLocked ? '(Locked 🔒)' : ''}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => onLockDiscussion(disc.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white text-[10px] font-bold border border-amber-500/30 transition-all"
                        >
                          {disc.isLocked ? 'Unlock' : 'Lock 🔒'}
                        </button>
                        <button
                          onClick={() => onDeleteDiscussion(disc.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white text-[10px] font-bold border border-rose-500/30 transition-all"
                        >
                          Delete 🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Merge Duplicates Tool */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Merge className="w-4 h-4 text-purple-400" />
              <span>Merge Duplicate Questions</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Duplicate Question ID</label>
                <select
                  value={selectedMergeFrom}
                  onChange={(e) => setSelectedMergeFrom(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                >
                  <option value="">Select Duplicate Post...</option>
                  {discussions.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Target Parent Question ID</label>
                <select
                  value={selectedMergeTo}
                  onChange={(e) => setSelectedMergeTo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                >
                  <option value="">Select Master Post...</option>
                  {discussions.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => alert('Duplicate discussion successfully merged!')}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
            >
              Confirm Merge Duplicates
            </button>
          </div>

        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] text-slate-400 font-medium">Daily Active Users</p>
              <p className="text-2xl font-black text-blue-400">{moderatorStats.activeUsersToday}</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] text-slate-400 font-medium">Daily Discussions</p>
              <p className="text-2xl font-black text-purple-400">{moderatorStats.dailyDiscussionsCount}</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] text-slate-400 font-medium">Answer Rate</p>
              <p className="text-2xl font-black text-emerald-400">{moderatorStats.answerRatePercent}%</p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <p className="text-[11px] text-slate-400 font-medium">Resolution Rate</p>
              <p className="text-2xl font-black text-amber-400">{moderatorStats.resolutionRatePercent}%</p>
            </div>
          </div>

          {/* Search Analytics */}
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Search Queries Analytics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <p className="font-bold text-emerald-400">🔥 Top Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {moderatorStats.searchMetrics.popularSearches.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      "{s}"
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <p className="font-bold text-rose-400">⚠️ Failed Searches (Zero Results)</p>
                <div className="flex flex-wrap gap-2">
                  {moderatorStats.searchMetrics.failedSearches.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                      "{s}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'governance' && (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <span>Community Tags & RBAC Moderation Settings</span>
          </h3>

          <p className="text-slate-400">Manage approved technology tags, rate limit rules, and content filters for Knowledge Hub.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['.NET', 'C#', 'Async', 'Azure', 'React', 'SQL', 'EFCore', 'Zustand', 'KeyVault', 'GitHubActions'].map(t => (
              <span key={t} className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
