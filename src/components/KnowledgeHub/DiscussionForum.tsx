import React, { useState } from 'react';
import { 
  KnowledgeHubDiscussion, 
  KnowledgeHubTopic, 
  DiscussionPriority, 
  DiscussionState,
  KnowledgeHubAnswer,
  KnowledgeHubComment,
  User 
} from '../../types';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Bookmark, 
  Paperclip, 
  Send, 
  Sparkles, 
  Lock, 
  Share2, 
  Code, 
  X, 
  AlertTriangle, 
  Tag, 
  FileText, 
  CornerDownRight, 
  Trash2, 
  Edit3,
  Bot
} from 'lucide-react';

interface DiscussionForumProps {
  discussions: KnowledgeHubDiscussion[];
  topics: KnowledgeHubTopic[];
  currentUser: User;
  onVoteDiscussion: (discussionId: string, direction: 'up' | 'down') => void;
  onVoteAnswer: (discussionId: string, answerId: string, direction: 'up' | 'down') => void;
  onAcceptAnswer: (discussionId: string, answerId: string) => void;
  onCreateDiscussion: (discussionData: Partial<KnowledgeHubDiscussion>) => void;
  onPostAnswer: (discussionId: string, answerBody: string, codeSnippet?: string) => void;
  onAddComment: (discussionId: string, parentId: string, commentBody: string) => void;
  onToggleBookmarkDiscussion: (discussionId: string) => void;
  selectedDiscussion: KnowledgeHubDiscussion | null;
  onSelectDiscussion: (discussion: KnowledgeHubDiscussion | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  initialTopicId?: string;
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({
  discussions,
  topics,
  currentUser,
  onVoteDiscussion,
  onVoteAnswer,
  onAcceptAnswer,
  onCreateDiscussion,
  onPostAnswer,
  onAddComment,
  onToggleBookmarkDiscussion,
  selectedDiscussion,
  onSelectDiscussion,
  isCreateModalOpen,
  setIsCreateModalOpen,
  initialTopicId
}) => {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'votes' | 'unanswered'>('recent');

  // Form State for New Discussion
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTopicId, setNewTopicId] = useState<string>(initialTopicId || topics[0]?.id || '');
  const [newTagsInput, setNewTagsInput] = useState('.NET, C#, Async');
  const [newPriority, setNewPriority] = useState<DiscussionPriority>('Medium');
  const [newAttachments, setNewAttachments] = useState<{ name: string; size: string; type: any }[]>([]);

  // Post Answer State inside Detail Modal
  const [answerBody, setAnswerBody] = useState('');
  const [answerCodeSnippet, setAnswerCodeSnippet] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [aiSuggesting, setAiSuggesting] = useState(false);

  // Comment Input State (keyed by parentId)
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // AI Features State for Detail
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  // Guest Warning Modal State
  const [showGuestWarningModal, setShowGuestWarningModal] = useState(false);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser?.isGuest) {
      setIsCreateModalOpen(false);
      setShowGuestWarningModal(true);
      return;
    }
    if (!newTitle.trim() || !newDescription.trim()) return;

    const selectedTopic = topics.find(t => t.id === newTopicId);
    const tagsArray = newTagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onCreateDiscussion({
      title: newTitle,
      description: newDescription,
      topicId: newTopicId,
      topicName: selectedTopic?.name || 'C#',
      tags: tagsArray,
      priority: newPriority,
      state: 'Open',
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      batch: currentUser.batch,
      attachments: newAttachments.map((a, i) => ({
        id: `att-${Date.now()}-${i}`,
        name: a.name,
        size: a.size,
        type: a.type,
        url: '#'
      }))
    });

    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewAttachments([]);
    setIsCreateModalOpen(false);
  };

  const handleInsertSampleCode = () => {
    setAnswerCodeSnippet(`var result = users.Where(x => x.IsActive);\nConsole.WriteLine($"Active count: {result.Count()}");`);
    setShowCodeInput(true);
  };

  const handleAiSuggestAnswer = () => {
    if (!selectedDiscussion) return;
    setAiSuggesting(true);
    setTimeout(() => {
      setAnswerBody(`🤖 **AI Copilot Suggested Answer**:\nBased on ${selectedDiscussion.topicName} documentation and best practices, when dealing with this pattern, ensure proper resource cleanup using 'await using' or IAsyncDisposable. This prevents handle leaks in long-running threads.`);
      setAnswerCodeSnippet(`// AI Generated Optimized Pattern\nawait using var connection = new SqlConnection(connString);\nawait connection.OpenAsync();`);
      setShowCodeInput(true);
      setAiSuggesting(false);
    }, 800);
  };

  const handlePostAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDiscussion || !answerBody.trim()) return;
    onPostAnswer(selectedDiscussion.id, answerBody, answerCodeSnippet || undefined);
    setAnswerBody('');
    setAnswerCodeSnippet('');
    setShowCodeInput(false);
  };

  const handleAddCommentSubmit = (parentId: string) => {
    const text = commentInputs[parentId];
    if (!selectedDiscussion || !text || !text.trim()) return;
    onAddComment(selectedDiscussion.id, parentId, text);
    setCommentInputs(prev => ({ ...prev, [parentId]: '' }));
  };

  // Filter Logic
  const filteredDiscussions = discussions.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTopic = selectedTopicFilter === 'all' || d.topicId === selectedTopicFilter;
    const matchesPriority = selectedPriorityFilter === 'all' || d.priority === selectedPriorityFilter;
    const matchesState = selectedStateFilter === 'all' || d.state === selectedStateFilter;
    return matchesSearch && matchesTopic && matchesPriority && matchesState;
  }).sort((a, b) => {
    if (sortBy === 'votes') return b.upvotes - a.upvotes;
    if (sortBy === 'unanswered') return a.answers.length - b.answers.length;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions by keyword, code, tag, or author..."
            className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-xs rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 shadow-sm transition-colors"
          />
        </div>

        {/* Create Discussion Button */}
        <button
          onClick={() => {
            if (currentUser?.isGuest) {
              setShowGuestWarningModal(true);
              return;
            }
            setIsCreateModalOpen(true);
          }}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Question / Discussion</span>
        </button>

      </div>

      {/* Filter Chips Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3 text-xs">
        
        <div className="flex items-center gap-1.5 text-slate-600 font-bold px-2">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>Filters:</span>
        </div>

        {/* Topic Filter */}
        <select
          value={selectedTopicFilter}
          onChange={(e) => setSelectedTopicFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
        >
          <option value="all">All Topics</option>
          {topics.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          value={selectedPriorityFilter}
          onChange={(e) => setSelectedPriorityFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
        >
          <option value="all">All Priorities</option>
          <option value="Critical">Critical Priority</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* State Filter */}
        <select
          value={selectedStateFilter}
          onChange={(e) => setSelectedStateFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
        >
          <option value="all">All States</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Answered">Answered</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Sort By */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-slate-500 font-mono text-[11px]">Sort:</span>
          <button
            onClick={() => setSortBy('recent')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              sortBy === 'recent' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSortBy('votes')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              sortBy === 'votes' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Most Votes
          </button>
        </div>

      </div>

      {/* Discussions Feed List */}
      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No matching discussions found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Try adjusting your filters or ask a new technical question in Knowledge Hub.</p>
          </div>
        ) : (
          filteredDiscussions.map((disc) => (
            <div
              key={disc.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 space-y-4 transition-all hover:shadow-xl text-slate-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                
                {/* State & Priority Badges */}
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    disc.state === 'Answered' || disc.state === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : disc.state === 'In Progress'
                      ? 'bg-blue-50 text-blue-800 border border-blue-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {disc.state}
                  </span>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    disc.priority === 'Critical' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                    disc.priority === 'High' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {disc.priority} Priority
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-mono font-bold">
                    Topic: {disc.topicName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>{disc.createdAt}</span>
                  <button
                    onClick={() => onToggleBookmarkDiscussion(disc.id)}
                    className="p-1 hover:text-amber-500 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${disc.isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>

              </div>

              {/* Title & Body */}
              <div>
                <h3
                  onClick={() => onSelectDiscussion(disc)}
                  className="text-base font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  {disc.title}
                </h3>
                <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {disc.description}
                </p>
              </div>

              {/* Tags & Voting Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                
                <div className="flex items-center gap-3">
                  {/* Upvote & Downvote buttons */}
                  <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                    <button
                      onClick={() => onVoteDiscussion(disc.id, 'up')}
                      className={`p-1 rounded-lg hover:bg-slate-200 transition-colors ${
                        disc.userVote === 'up' ? 'text-emerald-600 font-bold' : 'text-slate-500'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-slate-900">{disc.upvotes - disc.downvotes}</span>
                    <button
                      onClick={() => onVoteDiscussion(disc.id, 'down')}
                      className={`p-1 rounded-lg hover:bg-slate-200 transition-colors ${
                        disc.userVote === 'down' ? 'text-rose-600 font-bold' : 'text-slate-500'
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-slate-700 font-medium">By {disc.authorName} ({disc.authorRole})</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-slate-600 text-xs">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-bold text-slate-900">{disc.answers.length}</span> Answers
                  </div>

                  <button
                    onClick={() => onSelectDiscussion(disc)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-sm"
                  >
                    View & Answer →
                  </button>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

      {/* Discussion Detail Modal (Stack Overflow Q&A View) */}
      {selectedDiscussion && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl shadow-slate-900/10 animate-scaleUp text-slate-900">
            
            {/* Modal Top Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedDiscussion.state === 'Answered' || selectedDiscussion.state === 'Resolved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {selectedDiscussion.state}
                </span>
                <span className="text-xs text-slate-500 font-mono">Topic: {selectedDiscussion.topicName}</span>
              </div>

              <button
                onClick={() => onSelectDiscussion(null)}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">{selectedDiscussion.title}</h2>

              <div className="flex items-center gap-3 text-xs text-slate-600 border-b border-slate-200/80 pb-4">
                <img src={selectedDiscussion.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200" />
                <div>
                  <span className="font-bold text-slate-900">{selectedDiscussion.authorName}</span>
                  <span className="text-slate-500 ml-2">({selectedDiscussion.authorRole} • {selectedDiscussion.batch})</span>
                </div>
                <span className="ml-auto font-mono text-slate-500">{selectedDiscussion.createdAt}</span>
              </div>

              {/* Question Body */}
              <div className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80 text-xs text-slate-800 leading-relaxed space-y-3 whitespace-pre-line shadow-inner">
                {selectedDiscussion.description}
              </div>

              {/* Attachments if any */}
              {selectedDiscussion.attachments && selectedDiscussion.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Attachments ({selectedDiscussion.attachments.length})</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedDiscussion.attachments.map(att => (
                      <a
                        key={att.id}
                        href="#"
                        className="px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-mono text-blue-600 hover:underline flex items-center gap-2 shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{att.name}</span>
                        <span className="text-[10px] text-slate-500">({att.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Copilot Suggestion Box */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200/80 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-violet-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">AI Learning Copilot Assistance</p>
                    <p className="text-[11px] text-slate-600">Get an instant AI-suggested code solution or discussion summary.</p>
                  </div>
                </div>
                <button
                  onClick={handleAiSuggestAnswer}
                  disabled={aiSuggesting}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 transition-all shadow-md shadow-violet-600/20 cursor-pointer"
                >
                  {aiSuggesting ? 'AI Generating...' : 'Ask AI to Suggest Answer'}
                </button>
              </div>

            </div>

            {/* Answers Section (Stack Overflow style) */}
            <div className="space-y-4 pt-4 border-t border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>{selectedDiscussion.answers.length} Answers</span>
              </h3>

              {/* Answers List */}
              <div className="space-y-4">
                {selectedDiscussion.answers.map((ans) => (
                  <div
                    key={ans.id}
                    className={`p-5 rounded-2xl border space-y-3 transition-all ${
                      ans.isAccepted
                        ? 'bg-emerald-50/90 border-emerald-300 shadow-md shadow-emerald-500/5'
                        : 'bg-slate-50/90 border-slate-200/80 shadow-sm'
                    }`}
                  >
                    {/* Accepted Answer Banner */}
                    {ans.isAccepted && (
                      <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold pb-2 border-b border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        <span>✅ ACCEPTED SOLUTION BY DISCUSSION OWNER</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img src={ans.authorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"} alt="Avatar" className="w-6 h-6 rounded-full border border-slate-200" />
                        <span className="font-bold text-slate-900">{ans.authorName}</span>
                        <span className="text-slate-500">({ans.authorRole})</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Discussion Owner Accept Button */}
                        {currentUser.id === selectedDiscussion.authorId && !ans.isAccepted && (
                          <button
                            onClick={() => onAcceptAnswer(selectedDiscussion.id, ans.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 text-[10px] font-bold transition-all cursor-pointer"
                          >
                            Mark as Accepted Solution ✅
                          </button>
                        )}

                        <span className="font-mono text-slate-500 text-[11px]">{ans.createdAt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                      {ans.body}
                    </p>

                    {/* Code snippet if present */}
                    {ans.codeSnippet && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                        <pre>{ans.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Voting */}
                    <div className="flex items-center gap-4 pt-2 text-xs">
                      <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
                        <button
                          onClick={() => onVoteAnswer(selectedDiscussion.id, ans.id, 'up')}
                          className="p-1 hover:text-emerald-600 text-slate-500"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-mono font-bold text-slate-900">{ans.upvotes}</span>
                        <button
                          onClick={() => onVoteAnswer(selectedDiscussion.id, ans.id, 'down')}
                          className="p-1 hover:text-rose-600 text-slate-500"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Threaded Comments on Answer */}
                    <div className="pl-4 border-l-2 border-slate-200 space-y-2 pt-2">
                      {ans.comments && ans.comments.map(c => (
                        <div key={c.id} className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl text-xs text-slate-800 shadow-sm">
                          <span className="font-bold text-blue-700">{c.authorName}: </span>
                          <span>{c.body}</span>
                          <span className="text-[10px] text-slate-500 ml-2 font-mono">{c.createdAt}</span>
                        </div>
                      ))}

                      {/* Reply Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInputs[ans.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [ans.id]: e.target.value })}
                          placeholder="Add a comment reply..."
                          className="flex-1 bg-white border border-slate-200 text-xs rounded-xl px-3 py-1.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
                        />
                        <button
                          onClick={() => handleAddCommentSubmit(ans.id)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Post Your Answer Form */}
              <form onSubmit={handlePostAnswerSubmit} className="bg-slate-50/90 p-5 rounded-2xl border border-slate-200/80 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Your Solution / Answer</h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleInsertSampleCode}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    >
                      <Code className="w-3 h-3 text-emerald-600" />
                      <span>Insert Code Snippet</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={answerBody}
                  onChange={(e) => setAnswerBody(e.target.value)}
                  placeholder="Type your technical answer here... (Markdown & code blocks supported)"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                />

                {showCodeInput && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-600">Code Snippet (C#, SQL, JavaScript...):</span>
                    <textarea
                      rows={3}
                      value={answerCodeSnippet}
                      onChange={(e) => setAnswerCodeSnippet(e.target.value)}
                      placeholder="var result = users.Where(x => x.IsActive);"
                      className="w-full bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 rounded-xl p-3 focus:outline-none shadow-sm"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Answer (+5 Points)</span>
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* Create Discussion Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl w-full max-w-2xl p-6 space-y-6 shadow-2xl shadow-slate-900/10 animate-scaleUp text-slate-900">
            
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Create New Knowledge Hub Discussion</span>
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Discussion Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How to handle memory leaks with IAsyncEnumerable in C#?"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Technology Topic</label>
                  <select
                    value={newTopicId}
                    onChange={(e) => setNewTopicId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  >
                    {topics.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Priority Level</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as DiscussionPriority)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Description & Context</label>
                <textarea
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your technical question, expected behavior, error stack trace..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTagsInput}
                  onChange={(e) => setNewTagsInput(e.target.value)}
                  placeholder="C#, Async, MemoryManagement, EF Core"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Question (+2 Points)</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Guest Warning Modal */}
      {showGuestWarningModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-amber-300 rounded-3xl w-full max-w-md p-6 text-center space-y-4 shadow-2xl animate-scaleUp text-slate-900">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
                <span>Access Restricted</span>
              </h3>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                You don't have organization credentials.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Only users with valid organization credentials can ask questions in the Knowledge Hub.
              </p>
            </div>

            <button
              onClick={() => setShowGuestWarningModal(false)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
