import React, { useState } from 'react';
import { 
  User, 
  KnowledgeHubTopic, 
  KnowledgeHubDiscussion, 
  KnowledgeHubDocument, 
  KnowledgeHubChatMessage, 
  ReputationProfile 
} from '../../types';
import { 
  initialTopics, 
  initialDiscussions, 
  initialDocuments, 
  initialChatMessages, 
  initialReputationProfile 
} from '../../data/knowledgeHubData';
import { TopicsView } from './TopicsView';
import { DiscussionForum } from './DiscussionForum';
import { DocumentRepository } from './DocumentRepository';
import { RealtimeTopicChat } from './RealtimeTopicChat';
import { AiLearningCopilotPanel } from './AiLearningCopilotPanel';
import { ReputationBadgesView } from './ReputationBadgesView';
import { ModeratorConsole } from './ModeratorConsole';
import { EnterpriseHeroSection } from './EnterpriseHeroSection';
import { 
  Globe, 
  MessageSquare, 
  FileText, 
  Radio, 
  Sparkles, 
  Bookmark, 
  Award, 
  ShieldAlert, 
  Plus, 
  Users, 
  CheckCircle2,
  Building2,
  ChevronDown,
  AlertTriangle,
  X
} from 'lucide-react';

interface KnowledgeHubViewProps {
  currentUser: User;
  onOpenGlobalSearch?: () => void;
}

export const KnowledgeHubView: React.FC<KnowledgeHubViewProps> = ({
  currentUser,
  onOpenGlobalSearch
}) => {
  // State for all Knowledge Hub data
  const [topics, setTopics] = useState<KnowledgeHubTopic[]>(initialTopics);
  const [discussions, setDiscussions] = useState<KnowledgeHubDiscussion[]>(initialDiscussions);
  const [documents, setDocuments] = useState<KnowledgeHubDocument[]>(initialDocuments);
  const [chatMessages, setChatMessages] = useState<KnowledgeHubChatMessage[]>(initialChatMessages);
  const [reputationProfile, setReputationProfile] = useState<ReputationProfile>(initialReputationProfile);

  // Active Main Tab in Knowledge Hub
  const [activeTab, setActiveTab] = useState<
    'topics' | 'documents' | 'forum' | 'chat' | 'moderator'
  >('topics');

  // Selected Detail Item States
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedDiscussion, setSelectedDiscussion] = useState<KnowledgeHubDiscussion | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<KnowledgeHubDocument | null>(null);

  // Modal Open States
  const [isCreateDiscussionOpen, setIsCreateDiscussionOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [showGuestWarningModal, setShowGuestWarningModal] = useState(false);

  // Multi-Tenant Batch State
  const [selectedBatch, setSelectedBatch] = useState<string>('Batch 2026');

  // Handlers for Topic Actions
  const handleToggleJoinTopic = (topicId: string) => {
    setTopics(prev => prev.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          isJoined: !t.isJoined,
          membersCount: t.isJoined ? t.membersCount - 1 : t.membersCount + 1
        };
      }
      return t;
    }));
  };

  const handleToggleFollowTopic = (topicId: string) => {
    setTopics(prev => prev.map(t => {
      if (t.id === topicId) {
        return { ...t, isFollowed: !t.isFollowed };
      }
      return t;
    }));
  };

  const handleToggleBookmarkTopic = (topicId: string) => {
    setTopics(prev => prev.map(t => {
      if (t.id === topicId) {
        return { ...t, isBookmarked: !t.isBookmarked };
      }
      return t;
    }));
  };

  // Handlers for Discussions
  const handleVoteDiscussion = (discussionId: string, direction: 'up' | 'down') => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        const currentVote = d.userVote;
        let newVote: 'up' | 'down' | null = direction;
        let upDiff = 0;
        let downDiff = 0;

        if (currentVote === direction) {
          newVote = null;
          if (direction === 'up') upDiff = -1;
          else downDiff = -1;
        } else {
          if (currentVote === 'up') upDiff = -1;
          if (currentVote === 'down') downDiff = -1;
          if (direction === 'up') upDiff += 1;
          if (direction === 'down') downDiff += 1;
        }

        return {
          ...d,
          userVote: newVote,
          upvotes: d.upvotes + upDiff,
          downvotes: d.downvotes + downDiff
        };
      }
      return d;
    }));
  };

  const handleVoteAnswer = (discussionId: string, answerId: string, direction: 'up' | 'down') => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        const updatedAnswers = d.answers.map(ans => {
          if (ans.id === answerId) {
            const isUp = direction === 'up';
            return {
              ...ans,
              upvotes: isUp ? ans.upvotes + 1 : ans.upvotes,
              downvotes: !isUp ? ans.downvotes + 1 : ans.downvotes
            };
          }
          return ans;
        });
        return { ...d, answers: updatedAnswers };
      }
      return d;
    }));
  };

  const handleAcceptAnswer = (discussionId: string, answerId: string) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        const updatedAnswers = d.answers.map(a => ({
          ...a,
          isAccepted: a.id === answerId
        }));
        return {
          ...d,
          state: 'Answered',
          acceptedAnswerId: answerId,
          answers: updatedAnswers
        };
      }
      return d;
    }));

    // Award +15 XP for accepted answer
    setReputationProfile(prev => ({
      ...prev,
      points: prev.points + 15,
      acceptedAnswers: prev.acceptedAnswers + 1
    }));
  };

  const handleCreateDiscussion = (newDiscData: Partial<KnowledgeHubDiscussion>) => {
    const newPost: KnowledgeHubDiscussion = {
      id: `disc-${Date.now()}`,
      title: newDiscData.title || 'Untitled Question',
      description: newDiscData.description || '',
      topicId: newDiscData.topicId || 'topic-csharp',
      topicName: newDiscData.topicName || 'C#',
      tags: newDiscData.tags || ['General'],
      priority: newDiscData.priority || 'Medium',
      state: 'Open',
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      batch: selectedBatch,
      createdAt: 'Just now',
      upvotes: 1,
      downvotes: 0,
      userVote: 'up',
      answers: [],
      comments: [],
      attachments: newDiscData.attachments || []
    };

    setDiscussions([newPost, ...discussions]);

    // Award +2 XP for creating question
    setReputationProfile(prev => ({
      ...prev,
      points: prev.points + 2,
      questionsAsked: prev.questionsAsked + 1
    }));
  };

  const handlePostAnswer = (discussionId: string, answerBody: string, codeSnippet?: string) => {
    const newAnswer = {
      id: `ans-${Date.now()}`,
      discussionId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      body: answerBody,
      codeSnippet,
      createdAt: 'Just now',
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
      comments: []
    };

    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        return {
          ...d,
          state: d.state === 'Open' ? 'In Progress' : d.state,
          answers: [...d.answers, newAnswer]
        };
      }
      return d;
    }));

    if (selectedDiscussion && selectedDiscussion.id === discussionId) {
      setSelectedDiscussion(prev => prev ? {
        ...prev,
        state: prev.state === 'Open' ? 'In Progress' : prev.state,
        answers: [...prev.answers, newAnswer]
      } : null);
    }

    // Award +5 XP for posting answer
    setReputationProfile(prev => ({
      ...prev,
      points: prev.points + 5,
      answersGiven: prev.answersGiven + 1
    }));
  };

  const handleAddComment = (discussionId: string, parentId: string, commentBody: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      parentId,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      body: commentBody,
      createdAt: 'Just now'
    };

    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        if (parentId === discussionId) {
          return { ...d, comments: [...d.comments, newComment] };
        } else {
          const updatedAnswers = d.answers.map(ans => {
            if (ans.id === parentId) {
              return { ...ans, comments: [...ans.comments, newComment] };
            }
            return ans;
          });
          return { ...d, answers: updatedAnswers };
        }
      }
      return d;
    }));

    if (selectedDiscussion && selectedDiscussion.id === discussionId) {
      if (parentId === discussionId) {
        setSelectedDiscussion(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
      } else {
        setSelectedDiscussion(prev => prev ? {
          ...prev,
          answers: prev.answers.map(a => a.id === parentId ? { ...a, comments: [...a.comments, newComment] } : a)
        } : null);
      }
    }
  };

  const handleToggleBookmarkDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discussionId) {
        return { ...d, isBookmarked: !d.isBookmarked };
      }
      return d;
    }));
  };

  // Handlers for Document Repository
  const handleUploadDocument = (docData: Partial<KnowledgeHubDocument>) => {
    const newDoc: KnowledgeHubDocument = {
      id: `doc-${Date.now()}`,
      name: docData.name || 'Untitled Document',
      description: docData.description || '',
      topicId: docData.topicId || 'topic-csharp',
      topicName: docData.topicName || 'General',
      tags: docData.tags || ['General'],
      version: docData.version || 'v1.0',
      author: `${currentUser.name} (${currentUser.role})`,
      uploadedDate: new Date().toISOString().split('T')[0],
      fileType: docData.fileType || 'PDF',
      fileSize: '3.4 MB',
      downloadCount: 1,
      isApproved: true,
      versions: [
        {
          version: docData.version || 'v1.0',
          uploadedBy: currentUser.name,
          uploadedAt: new Date().toISOString().split('T')[0],
          changelog: 'Initial upload',
          fileSize: '3.4 MB'
        }
      ]
    };

    setDocuments([newDoc, ...documents]);

    // Award +5 XP for document upload
    setReputationProfile(prev => ({
      ...prev,
      points: prev.points + 5,
      documentsUploaded: prev.documentsUploaded + 1
    }));
  };

  const handleReplaceDocumentVersion = (docId: string, newVersionStr: string, changelog: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        const newVerHistory = {
          version: newVersionStr,
          uploadedBy: currentUser.name,
          uploadedAt: new Date().toISOString().split('T')[0],
          changelog,
          fileSize: doc.fileSize
        };
        return {
          ...doc,
          version: newVersionStr,
          versions: [newVerHistory, ...doc.versions]
        };
      }
      return doc;
    }));

    if (selectedDocument && selectedDocument.id === docId) {
      setSelectedDocument(prev => prev ? {
        ...prev,
        version: newVersionStr,
        versions: [{
          version: newVersionStr,
          uploadedBy: currentUser.name,
          uploadedAt: new Date().toISOString().split('T')[0],
          changelog,
          fileSize: prev.fileSize
        }, ...prev.versions]
      } : null);
    }
  };

  // Handlers for Chat
  const handleSendMessage = (channelId: string, topicId: string, content: string, codeSnippet?: string) => {
    const newMsg: KnowledgeHubChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      topicId,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
      codeSnippet
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const handleToggleReaction = (messageId: string, emoji: string) => {
    setChatMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find(r => r.emoji === emoji);
        let updatedReactions;

        if (existingReaction) {
          if (existingReaction.users.includes(currentUser.id)) {
            updatedReactions = msg.reactions.map(r => r.emoji === emoji ? {
              ...r,
              count: r.count - 1,
              users: r.users.filter(u => u !== currentUser.id)
            } : r).filter(r => r.count > 0);
          } else {
            updatedReactions = msg.reactions.map(r => r.emoji === emoji ? {
              ...r,
              count: r.count + 1,
              users: [...r.users, currentUser.id]
            } : r);
          }
        } else {
          updatedReactions = [...msg.reactions, { emoji, count: 1, users: [currentUser.id] }];
        }

        return { ...msg, reactions: updatedReactions };
      }
      return msg;
    }));
  };

  // Moderation Handlers
  const handleLockDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.map(d => d.id === discussionId ? { ...d, isLocked: !d.isLocked } : d));
  };

  const handleDeleteDiscussion = (discussionId: string) => {
    setDiscussions(prev => prev.filter(d => d.id !== discussionId));
  };

  const handleApproveDocument = (docId: string) => {
    setDocuments(prev => prev.map(doc => doc.id === docId ? { ...doc, isApproved: true } : doc));
  };

  const savedDiscussions = discussions.filter(d => d.isBookmarked);
  const savedDocs = documents.filter(doc => doc.tags.includes('Saved'));
  const myQuestions = discussions.filter(d => d.authorId === currentUser.id);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Premium Enterprise Hero Section */}
      <EnterpriseHeroSection />

      {/* Primary Sub-Navigation Bar inside Knowledge Hub */}
      <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-sm">
        
        <button
          onClick={() => { setActiveTab('topics'); setSelectedTopicId(''); }}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'topics' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <Globe className={`w-4 h-4 ${activeTab === 'topics' ? 'text-white' : 'text-blue-600'}`} />
          <span>Topics & Communities ({topics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'documents' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeTab === 'documents' ? 'text-white' : 'text-blue-600'}`} />
          <span>Document & Knowledge Repository ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('forum')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'forum' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <MessageSquare className={`w-4 h-4 ${activeTab === 'forum' ? 'text-white' : 'text-blue-600'}`} />
          <span>Discussion Forum ({discussions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'chat' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <Radio className={`w-4 h-4 ${activeTab === 'chat' ? 'text-white' : 'text-amber-600'}`} />
          <span>Teams Real-Time Chat</span>
        </button>

        {currentUser.role === 'Admin' && (
          <button
            onClick={() => setActiveTab('moderator')}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'moderator' 
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' 
                : 'text-slate-700 hover:text-rose-700 hover:bg-slate-200/80'
            }`}
          >
            <ShieldAlert className={`w-4 h-4 ${activeTab === 'moderator' ? 'text-white' : 'text-rose-600'}`} />
            <span>Moderator & Analytics</span>
          </button>
        )}

      </div>

      {/* Main Tab Content View Switch */}
      {activeTab === 'topics' && (
        <TopicsView
          topics={topics}
          discussions={discussions}
          documents={documents}
          chatMessages={chatMessages}
          onToggleJoinTopic={handleToggleJoinTopic}
          onToggleFollowTopic={handleToggleFollowTopic}
          onToggleBookmarkTopic={handleToggleBookmarkTopic}
          onSelectTopic={(id) => setSelectedTopicId(id)}
          selectedTopicId={selectedTopicId}
          onOpenNewDiscussion={(topId) => {
            if (currentUser?.isGuest) {
              setShowGuestWarningModal(true);
              return;
            }
            setActiveTab('forum');
            setIsCreateDiscussionOpen(true);
          }}
          onOpenNewDocument={() => {}}
          onOpenDiscussionDetail={(disc) => {
            setActiveTab('forum');
            setSelectedDiscussion(disc);
          }}
          onOpenDocumentPreview={() => {}}
        />
      )}

      {activeTab === 'documents' && (
        <DocumentRepository
          documents={documents}
          topics={topics}
          currentUser={currentUser}
          onUploadDocument={handleUploadDocument}
          onReplaceDocumentVersion={handleReplaceDocumentVersion}
          selectedDocument={selectedDocument}
          onSelectDocument={(doc) => setSelectedDocument(doc)}
          isUploadModalOpen={isUploadDocOpen}
          setIsUploadModalOpen={setIsUploadDocOpen}
          initialTopicId={selectedTopicId}
        />
      )}

      {activeTab === 'forum' && (
        <DiscussionForum
          discussions={discussions}
          topics={topics}
          currentUser={currentUser}
          onVoteDiscussion={handleVoteDiscussion}
          onVoteAnswer={handleVoteAnswer}
          onAcceptAnswer={handleAcceptAnswer}
          onCreateDiscussion={handleCreateDiscussion}
          onPostAnswer={handlePostAnswer}
          onAddComment={handleAddComment}
          onToggleBookmarkDiscussion={handleToggleBookmarkDiscussion}
          selectedDiscussion={selectedDiscussion}
          onSelectDiscussion={(d) => setSelectedDiscussion(d)}
          isCreateModalOpen={isCreateDiscussionOpen}
          setIsCreateModalOpen={setIsCreateDiscussionOpen}
          initialTopicId={selectedTopicId}
        />
      )}

      {activeTab === 'chat' && (
        <RealtimeTopicChat
          topics={topics}
          chatMessages={chatMessages}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          onToggleReaction={handleToggleReaction}
        />
      )}

      {activeTab === 'moderator' && currentUser.role === 'Admin' && (
        <ModeratorConsole
          discussions={discussions}
          documents={documents}
          onLockDiscussion={handleLockDiscussion}
          onDeleteDiscussion={handleDeleteDiscussion}
          onApproveDocument={handleApproveDocument}
        />
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
