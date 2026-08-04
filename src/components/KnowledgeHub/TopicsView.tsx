import React, { useState } from 'react';
import { 
  KnowledgeHubTopic, 
  KnowledgeHubDiscussion, 
  KnowledgeHubDocument, 
  KnowledgeHubChatMessage 
} from '../../types';
import { 
  Code2, 
  Layers, 
  Cloud, 
  Atom, 
  Database, 
  BarChart3, 
  GitBranch, 
  GitMerge, 
  Sparkles, 
  Users, 
  MessageSquare, 
  FileText, 
  Bookmark, 
  Bell, 
  CheckCircle2, 
  Plus, 
  Search, 
  Share2, 
  TrendingUp, 
  Radio, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface TopicsViewProps {
  topics: KnowledgeHubTopic[];
  discussions: KnowledgeHubDiscussion[];
  documents: KnowledgeHubDocument[];
  chatMessages: KnowledgeHubChatMessage[];
  onToggleJoinTopic: (topicId: string) => void;
  onToggleFollowTopic: (topicId: string) => void;
  onToggleBookmarkTopic: (topicId: string) => void;
  onSelectTopic: (topicId: string) => void;
  selectedTopicId: string | null;
  onOpenNewDiscussion: (topicId?: string) => void;
  onOpenNewDocument: (topicId?: string) => void;
  onOpenDiscussionDetail: (discussion: KnowledgeHubDiscussion) => void;
  onOpenDocumentPreview: (doc: KnowledgeHubDocument) => void;
}

export const TopicsView: React.FC<TopicsViewProps> = ({
  topics,
  discussions,
  documents,
  chatMessages,
  onToggleJoinTopic,
  onToggleFollowTopic,
  onToggleBookmarkTopic,
  onSelectTopic,
  selectedTopicId,
  onOpenNewDiscussion,
  onOpenNewDocument,
  onOpenDiscussionDetail,
  onOpenDocumentPreview
}) => {
  const [topicActiveTab, setTopicActiveTab] = useState<'discussions' | 'documents' | 'chat' | 'members' | 'analytics'>('discussions');
  const [searchTerm, setSearchTerm] = useState('');

  const getTopicIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-white stroke-[2.2]", strokeWidth: 2.2 };
    switch (iconName) {
      case 'Code2': return <Code2 {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'Atom': return <Atom {...props} />;
      case 'Database': return <Database {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'GitMerge': return <GitMerge {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Users': return <Users {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  const activeTopic = topics.find(t => t.id === selectedTopicId);

  const filteredTopics = topics.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a topic is selected, render Topic Detail View with Header & 5 Tabs
  if (activeTopic) {
    const topicDiscussions = discussions.filter(d => d.topicId === activeTopic.id);
    const topicDocuments = documents.filter(doc => doc.topicId === activeTopic.id);
    const topicChatCount = chatMessages.filter(m => m.topicId === activeTopic.id).length;

    return (
      <div className="space-y-6 animate-fadeIn">
        
        {/* Back Button & Navigation Trail */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onSelectTopic('')}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            ← Back to All Technology Hubs
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmarkTopic(activeTopic.id)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTopic.isBookmarked 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${activeTopic.isBookmarked ? 'fill-amber-400' : ''}`} />
              <span>{activeTopic.isBookmarked ? 'Saved' : 'Save Hub'}</span>
            </button>
            <button
              onClick={() => onToggleFollowTopic(activeTopic.id)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTopic.isFollowed 
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{activeTopic.isFollowed ? 'Following' : 'Follow'}</span>
            </button>
            <button
              onClick={() => onToggleJoinTopic(activeTopic.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                activeTopic.isJoined 
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              {activeTopic.isJoined ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{activeTopic.isJoined ? 'Member Joined' : 'Join Topic Community'}</span>
            </button>
          </div>
        </div>

        {/* Topic Header Banner */}
        <div className={`p-6 rounded-3xl bg-gradient-to-r ${activeTopic.color} p-[1px] shadow-xl`}>
          <div className="bg-white/95 backdrop-blur-xl p-6 rounded-[23px] space-y-4 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-[52px] h-[52px] rounded-[16px] bg-gradient-to-br ${activeTopic.color} flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(0,0,0,0.15)]`}>
                  {getTopicIcon(activeTopic.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-slate-900">{activeTopic.name} Hub</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Official Community
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1 max-w-2xl">{activeTopic.description}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <button
                  onClick={() => onOpenNewDiscussion(activeTopic.id)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ask Question</span>
                </button>
                <button
                  onClick={() => onOpenNewDocument(activeTopic.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-all"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Members</p>
                  <p className="text-sm font-bold text-slate-900">{activeTopic.membersCount}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Discussions</p>
                  <p className="text-sm font-bold text-slate-900">{topicDiscussions.length}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Documents</p>
                  <p className="text-sm font-bold text-slate-900">{topicDocuments.length}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <Radio className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Chat Channels</p>
                  <p className="text-sm font-bold text-slate-900">{activeTopic.channels.length}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Topic Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto shadow-sm">
          <button
            onClick={() => setTopicActiveTab('discussions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              topicActiveTab === 'discussions' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discussions ({topicDiscussions.length})</span>
          </button>

          <button
            onClick={() => setTopicActiveTab('documents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              topicActiveTab === 'documents' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documents ({topicDocuments.length})</span>
          </button>

          <button
            onClick={() => setTopicActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              topicActiveTab === 'chat' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Teams Chat Channels ({activeTopic.channels.length})</span>
          </button>

          <button
            onClick={() => setTopicActiveTab('members')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              topicActiveTab === 'members' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Members & Mentors ({activeTopic.membersCount})</span>
          </button>

          <button
            onClick={() => setTopicActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              topicActiveTab === 'analytics' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Topic Analytics</span>
          </button>
        </div>

        {/* Tab Content Rendering */}
        {topicActiveTab === 'discussions' && (
          <div className="space-y-4">
            {topicDiscussions.length === 0 ? (
              <div className="bg-slate-900/50 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-300">No discussions posted in this topic yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">Be the first trainee or mentor to start a discussion or ask a technical question!</p>
                <button
                  onClick={() => onOpenNewDiscussion(activeTopic.id)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Start Discussion</span>
                </button>
              </div>
            ) : (
              topicDiscussions.map((disc) => (
                <div
                  key={disc.id}
                  onClick={() => onOpenDiscussionDetail(disc)}
                  className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 cursor-pointer space-y-3 transition-all hover:scale-[1.005]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        disc.state === 'Answered' || disc.state === 'Resolved' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : disc.state === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {disc.state}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        disc.priority === 'Critical' ? 'bg-rose-500/20 text-rose-400' :
                        disc.priority === 'High' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {disc.priority} Priority
                      </span>
                    </div>
                    <span className="text-slate-500 font-mono">{disc.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                    {disc.title}
                  </h3>

                  <p className="text-slate-400 text-xs line-clamp-2">{disc.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-300">By {disc.authorName} ({disc.authorRole})</span>
                      <span className="text-slate-600">•</span>
                      <span>{disc.upvotes} Upvotes</span>
                      <span className="text-slate-600">•</span>
                      <span>{disc.answers.length} Answers</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {disc.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {topicActiveTab === 'documents' && (
          <div className="space-y-4">
            {topicDocuments.length === 0 ? (
              <div className="bg-slate-900/50 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-300">No documents in this topic library</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">Upload manuals, cheat sheets, or architecture diagrams to share with learners.</p>
                <button
                  onClick={() => onOpenNewDocument(activeTopic.id)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topicDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => onOpenDocumentPreview(doc)}
                    className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 cursor-pointer space-y-3 transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/20">
                          {doc.fileType}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {doc.version}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{doc.fileSize}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1 hover:text-blue-400">
                      {doc.name}
                    </h4>

                    <p className="text-slate-400 text-xs line-clamp-2">{doc.description}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                      <span>Uploader: {doc.author}</span>
                      <span>{doc.downloadCount} downloads</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {topicActiveTab === 'chat' && (
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/80 space-y-4 shadow-md">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-500" />
              <span>Microsoft Teams Real-Time Channels for {activeTopic.name}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeTopic.channels.map((chan) => (
                <div key={chan.id} className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">#{chan.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                      Active Channel
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{chan.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {topicActiveTab === 'members' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Community Leaders & Active Members ({activeTopic.membersCount})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Avatar" className="w-10 h-10 rounded-full border border-slate-700" />
                <div>
                  <p className="text-xs font-bold text-white">David Miller</p>
                  <p className="text-[10px] text-purple-400 font-semibold">Principal Mentor</p>
                  <p className="text-[10px] text-slate-500">890 Reputation Pts</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Avatar" className="w-10 h-10 rounded-full border border-slate-700" />
                <div>
                  <p className="text-xs font-bold text-white">Alex Vance</p>
                  <p className="text-[10px] text-blue-400 font-semibold">GT (Mentor Level)</p>
                  <p className="text-[10px] text-slate-500">345 Reputation Pts</p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" alt="Avatar" className="w-10 h-10 rounded-full border border-slate-700" />
                <div>
                  <p className="text-xs font-bold text-white">Elena Rostova</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">Lead Trainer</p>
                  <p className="text-[10px] text-slate-500">720 Reputation Pts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {topicActiveTab === 'analytics' && (
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Topic Engagement Analytics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-medium">Answer Resolution Rate</p>
                <p className="text-xl font-bold text-emerald-400">92.4%</p>
                <p className="text-[10px] text-slate-500">Average time to resolution: 42 minutes</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-medium">Weekly Active Contributors</p>
                <p className="text-xl font-bold text-blue-400">48 Learners</p>
                <p className="text-[10px] text-slate-500">+14% increase from last week</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 font-medium">Document Download Volume</p>
                <p className="text-xl font-bold text-purple-400">320 Downloads</p>
                <p className="text-[10px] text-slate-500">Top document: Memory Profiling Guide</p>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // Otherwise, render Grid of all 9 Technology Specific Hubs
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search technology hubs (C#, Azure, React...)"
            className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 shadow-sm transition-colors"
          />
        </div>

        <div className="text-xs text-slate-600 font-medium">
          Showing <span className="text-slate-900 font-bold">{filteredTopics.length}</span> Technology Hubs
        </div>
      </div>

      {/* Grid of Technology Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="group bg-white rounded-3xl border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="space-y-4">
              
              {/* Card Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-[52px] h-[52px] rounded-[16px] bg-gradient-to-br ${topic.color} flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(0,0,0,0.15)]`}>
                    {getTopicIcon(topic.iconName)}
                  </div>
                  <div>
                    <h3 
                      onClick={() => onSelectTopic(topic.id)}
                      className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      {topic.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-slate-500">{topic.channels.length} Teams Channels</span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleBookmarkTopic(topic.id)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${topic.isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                {topic.description}
              </p>

            </div>

            {/* Bottom Info & Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-[10px] font-medium">Members</p>
                  <p className="font-bold text-slate-900">{topic.membersCount}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-[10px] font-medium">Discussions</p>
                  <p className="font-bold text-slate-900">{topic.discussionsCount}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-[10px] font-medium">Docs</p>
                  <p className="font-bold text-slate-900">{topic.documentsCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectTopic(topic.id)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <span>Explore Hub</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onToggleJoinTopic(topic.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    topic.isJoined
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  {topic.isJoined ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
                  <span>{topic.isJoined ? 'Joined' : 'Join'}</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
