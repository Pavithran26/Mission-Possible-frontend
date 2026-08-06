import React, { useState } from 'react';
import { Session, StudyMaterial, Quiz, PersonalNote, DiscussionPost } from '../../types';
import { InteractiveRoadmap } from './InteractiveRoadmap';
import { summarizeMaterialAiApi } from '../../services/api';
import { SessionDiscussionHub } from '../KnowledgeHub/SessionDiscussionHub';
import { initialDiscussions, initialDocuments, initialChatMessages } from '../../data/knowledgeHubData';
import { mockUser } from '../../data/mockData';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Video, 
  HelpCircle, 
  MessageSquare, 
  Award, 
  Star, 
  Play, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  Send, 
  Bookmark, 
  CheckCircle2, 
  Clock,
  Layers,
  Edit3,
  X,
  Upload,
  Search,
  Filter,
  Presentation,
  FileSpreadsheet,
  Link as LinkIcon,
  FileCode,
  ShieldCheck,
  ClipboardList,
  FolderPlus
} from 'lucide-react';

interface CustomMaterialItem {
  id: string;
  title: string;
  type: 'Doc (PDF/Word)' | 'PowerPoint (PPT)' | 'Video Link' | 'Video File (MP4)' | 'Notes / Guide' | 'Spreadsheet';
  url: string;
  description: string;
  updatedAt: string;
  sourceOrAuthor?: string;
  tags: string[];
  fileSizeOrDuration?: string;
}

interface SessionDetailViewProps {
  session: Session & { studyMaterials: StudyMaterial[]; quizzes: Quiz[]; discussions: DiscussionPost[] };
  onBack: () => void;
  onStartQuiz: (quiz: Quiz) => void;
  onToggleBookmark: (sessionId: string) => void;
  initialTab?: string;
  initialTopicId?: string;
  onStateChange?: (tab: string, topicId?: string) => void;
}

export const SessionDetailView: React.FC<SessionDetailViewProps> = ({
  session,
  onBack,
  onStartQuiz,
  onToggleBookmark,
  initialTab,
  initialTopicId,
  onStateChange
}) => {
  // 3 Primary Fields / Tabs: 'roadmap' (Road Map), 'provided-materials' (Provided Materials), 'additional-materials' (Additional Materials)
  const [activeTab, setActiveTab] = useState<'roadmap' | 'provided-materials' | 'additional-materials' | 'assignments' | 'quiz' | 'notes'>(
    (initialTab as any) || 'roadmap'
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || '');
  
  const handleTabSelect = (tab: typeof activeTab) => {
    setActiveTab(tab);
    onStateChange?.(tab, selectedTopicId);
  };
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  
  // Overview Video State
  // Use local project asset for the hero overview video (assets/Final overview.mp4)
  const defaultOverviewUrl = (() => {
    // Try project folders in priority: assets (correct), Assests (user-supplied path), then external fallback
    const candidates = [
      '../../../assets/Final overview.mp4',
      '../../../Assests/Final overview.mp4'
    ];
    for (const rel of candidates) {
      try {
        const resolved = new URL(rel, import.meta.url).href;
        return resolved;
      } catch (err) {
        // try next
      }
    }
    return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  })();

  const [overviewVideoUrl, setOverviewVideoUrl] = useState<string>(defaultOverviewUrl);
  const [overviewVideoTitle, setOverviewVideoTitle] = useState<string>('Final overview');
  const [overviewVideoDesc, setOverviewVideoDesc] = useState<string>(
    `Comprehensive attendee video walkthrough covering key architectural concepts, trainer expectations, and session prerequisites for ${session.name}.`
  );
  const [isUploadingVideoModalOpen, setIsUploadingVideoModalOpen] = useState<boolean>(false);
  const [videoInputTitle, setVideoInputTitle] = useState<string>('');
  const [videoInputDesc, setVideoInputDesc] = useState<string>('');
  const [videoInputUrl, setVideoInputUrl] = useState<string>('');
  const [selectedVideoFileName, setSelectedVideoFileName] = useState<string>('');

  // Search & Filter State for Provided Materials
  const [providedSearch, setProvidedSearch] = useState('');
  const [providedFilterType, setProvidedFilterType] = useState<string>('All');

  // Search & Filter State for Additional Materials
  const [additionalSearch, setAdditionalSearch] = useState('');
  const [additionalFilterType, setAdditionalFilterType] = useState<string>('All');

  // Provided Materials List
  const [providedMaterialsList, setProvidedMaterialsList] = useState<CustomMaterialItem[]>([
    {
      id: 'prov-1',
      title: 'Official Enterprise Curriculum Handbook & Architecture Guide',
      type: 'Doc (PDF/Word)',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      description: 'Standard organization-issued reference guide covering design patterns and code standards.',
      updatedAt: 'Today',
      tags: ['Curriculum', 'Official'],
      fileSizeOrDuration: '2.4 MB (42 Pages)'
    },
    {
      id: 'prov-2',
      title: 'Technical Deep Dive Slide Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Official trainer presentation deck used during the live interactive lecture.',
      updatedAt: 'Yesterday',
      tags: ['Presentation', 'Trainer Deck'],
      fileSizeOrDuration: '14.8 MB (28 Slides)'
    },
    {
      id: 'prov-3',
      title: 'Live Workshop & Hands-on Demo Recording',
      type: 'Video File (MP4)',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Full recording of the live trainer demonstration and step-by-step lab walkthrough.',
      updatedAt: '3 days ago',
      tags: ['Recording', 'Video'],
      fileSizeOrDuration: '45 mins'
    },
    {
      id: 'prov-notes-1',
      title: `${session.name} - Quick Trainer Reference Sheet`,
      type: 'Notes / Guide' as CustomMaterialItem['type'],
      url: '#',
      description: 'Concise reference notes and cheat sheet provided directly by the trainer for quick review.',
      updatedAt: '4 days ago',
      tags: ['Notes', 'CheatSheet'],
      fileSizeOrDuration: 'Markdown Notes'
    },
    ...(session.studyMaterials || []).map((sm, idx) => ({
      id: `prov-sm-${idx}`,
      title: sm.title,
      type: (sm.type === 'PowerPoint' ? 'PowerPoint (PPT)' : sm.type === 'Video' ? 'Video File (MP4)' : sm.type === 'PDF' || sm.type === 'Word' ? 'Doc (PDF/Word)' : 'Notes / Guide') as CustomMaterialItem['type'],
      url: sm.url || '#',
      description: sm.description,
      updatedAt: 'Official L&D',
      tags: sm.tags || ['Official'],
      fileSizeOrDuration: sm.durationOrPages || 'Standard'
    })),
    // Include any materials specifically set on the session by admins
    ...(session.providedMaterials || []).map((pm, idx) => ({
      id: `prov-pm-${idx}`,
      title: pm.title,
      type: (pm.type === 'PowerPoint' ? 'PowerPoint (PPT)' : pm.type === 'Video' ? 'Video File (MP4)' : pm.type === 'PDF' || pm.type === 'Word' ? 'Doc (PDF/Word)' : 'Notes / Guide') as CustomMaterialItem['type'],
      url: pm.url || '#',
      description: pm.description,
      updatedAt: 'Provided',
      tags: pm.tags || ['Provided'],
      fileSizeOrDuration: pm.durationOrPages || 'Standard'
    })),
    // Include any assignment attachments so uploaded docs are discoverable in materials
    ...(session.assignments || []).filter(a => a.attachmentUrl).map((a, idx) => ({
      id: `prov-assign-${idx}`,
      title: `${a.title} (Assignment Attachment)`,
      type: 'Doc (PDF/Word)' as CustomMaterialItem['type'],
      url: a.attachmentUrl || '#',
      description: a.instructions || 'Assignment attachment file',
      updatedAt: a.dueDate || 'Assignment',
      tags: ['Assignment'],
      fileSizeOrDuration: 'Attached File'
    }))
  ]);

  // Additional Materials List
  const [additionalMaterialsList, setAdditionalMaterialsList] = useState<CustomMaterialItem[]>([
    {
      id: 'add-1',
      title: 'Community Architecture Benchmark Study & Article',
      type: 'Doc (PDF/Word)',
      url: '#',
      description: 'Referenced case study analyzing real-world production performance benchmarks.',
      sourceOrAuthor: 'GT Trainee Research Group',
      updatedAt: '2 days ago',
      tags: ['Reference', 'Case Study'],
      fileSizeOrDuration: '1.2 MB'
    },
    {
      id: 'add-2',
      title: 'Industry Framework Comparisons & Best Practices Deck',
      type: 'PowerPoint (PPT)',
      url: '#',
      description: 'Supplementary slide deck created by senior GT mentors comparing alternative frameworks.',
      sourceOrAuthor: 'Senior Mentor Team',
      updatedAt: '3 days ago',
      tags: ['Slides', 'Mentors'],
      fileSizeOrDuration: '8.5 MB'
    },
    {
      id: 'add-3',
      title: 'External Tech Talk: Deep Dive into Microservice Communication',
      type: 'Video Link',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Recommended external YouTube tech conference talk referenced during discussions.',
      sourceOrAuthor: 'External YouTube Resource',
      updatedAt: '5 days ago',
      tags: ['Video Link', 'External'],
      fileSizeOrDuration: '32 mins'
    },
    {
      id: 'add-4',
      title: 'GT Batch Peer Discussion & Collaborative Revision Notes',
      type: 'Notes / Guide',
      url: '#',
      description: 'Shared notes compile during peer study sessions containing code snippets and Q&A.',
      sourceOrAuthor: 'Alex Vance & Peer Cohort',
      updatedAt: 'Yesterday',
      tags: ['Notes', 'Collaborative'],
      fileSizeOrDuration: 'Text Document'
    }
    ,
    ...(session.additionalMaterials || []).map((am, idx) => ({
      id: `add-am-${idx}`,
      title: am.title,
      type: (am.type === 'PowerPoint' ? 'PowerPoint (PPT)' : am.type === 'Video' ? 'Video File (MP4)' : am.type === 'PDF' || am.type === 'Word' ? 'Doc (PDF/Word)' : 'Notes / Guide') as CustomMaterialItem['type'],
      url: am.url || '#',
      description: am.description,
      updatedAt: 'Additional',
      tags: am.tags || ['Additional'],
      fileSizeOrDuration: am.durationOrPages || 'Standard'
    }))
  ]);

  // Modals for Uploading Materials
  const [isUploadProvidedModalOpen, setIsUploadProvidedModalOpen] = useState(false);
  const [isUploadAdditionalModalOpen, setIsUploadAdditionalModalOpen] = useState(false);

  // New Material Form Fields
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<CustomMaterialItem['type']>('Doc (PDF/Word)');
  const [matUrl, setMatUrl] = useState('');
  const [matFileName, setMatFileName] = useState('');
  const [matSource, setMatSource] = useState('');
  const [matDesc, setMatDesc] = useState('');
  const [matTags, setMatTags] = useState('');

  // Notes state
  const [personalNotesList, setPersonalNotesList] = useState<PersonalNote[]>([]);
  const [newNoteText, setNewNoteText] = useState('');

  // Q&A Discussion state
  const [discussionsList, setDiscussionsList] = useState<DiscussionPost[]>(session.discussions || []);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const selectedTopic = (session?.topics || []).find(t => t.id === selectedTopicId) || (session?.topics || [])[0];
  const activeQuiz = (session?.quizzes || [])[0];
  const assignmentsCount = (session?.assignments || []).length;
  const quizzesCount = (session?.quizzes || []).length;

  const handleSummarize = async (matId: string, title: string, desc: string) => {
    setSummarizingId(matId);
    try {
      const res = await summarizeMaterialAiApi(title, desc);
      setSummaries(prev => ({ ...prev, [matId]: res.summary }));
    } catch (err) {
      console.error(err);
    } finally {
      setSummarizingId(null);
    }
  };

  const handleSaveOverviewVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputTitle.trim()) return;
    setOverviewVideoTitle(videoInputTitle);
    if (videoInputDesc.trim()) setOverviewVideoDesc(videoInputDesc);
    if (videoInputUrl.trim()) setOverviewVideoUrl(videoInputUrl);
    setIsUploadingVideoModalOpen(false);
    setVideoInputTitle('');
    setVideoInputDesc('');
    setVideoInputUrl('');
    setSelectedVideoFileName('');
  };

  const handleAddProvidedMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;
    const newItem: CustomMaterialItem = {
      id: `prov-new-${Date.now()}`,
      title: matTitle,
      type: matType,
      url: matUrl.trim() || '#',
      description: matDesc || 'Uploaded organization study material.',
      updatedAt: 'Just now',
      tags: matTags ? matTags.split(',').map(t => t.trim()) : ['Provided', 'Official'],
      fileSizeOrDuration: matFileName ? `Uploaded: ${matFileName}` : 'Link / File'
    };
    setProvidedMaterialsList([newItem, ...providedMaterialsList]);
    setIsUploadProvidedModalOpen(false);
    resetMatForm();
  };

  const handleAddAdditionalMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;
    const newItem: CustomMaterialItem = {
      id: `add-new-${Date.now()}`,
      title: matTitle,
      type: matType,
      url: matUrl.trim() || '#',
      description: matDesc || 'User uploaded additional reference material.',
      sourceOrAuthor: matSource || 'GT Trainee',
      updatedAt: 'Just now',
      tags: matTags ? matTags.split(',').map(t => t.trim()) : ['Additional', 'Reference'],
      fileSizeOrDuration: matFileName ? `Uploaded: ${matFileName}` : 'Link / File'
    };
    setAdditionalMaterialsList([newItem, ...additionalMaterialsList]);
    setIsUploadAdditionalModalOpen(false);
    resetMatForm();
  };

  const resetMatForm = () => {
    setMatTitle('');
    setMatType('Doc (PDF/Word)');
    setMatUrl('');
    setMatFileName('');
    setMatSource('');
    setMatDesc('');
    setMatTags('');
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const note: PersonalNote = {
      id: `note-${Date.now()}`,
      sessionId: session.id,
      topicId: selectedTopicId,
      topicTitle: 'Reference Notes',
      content: newNoteText,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPersonalNotesList([note, ...personalNotesList]);
    setNewNoteText('');
  };

  const handlePostQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionBody.trim()) return;
    const post: DiscussionPost = {
      id: `disc-${Date.now()}`,
      sessionId: session.id,
      authorName: 'Alex Vance',
      authorRole: 'GT',
      title: newQuestionTitle,
      body: newQuestionBody,
      createdAt: 'Just now',
      upvotes: 0,
      replies: []
    };
    setDiscussionsList([post, ...discussionsList]);
    setNewQuestionTitle('');
    setNewQuestionBody('');
  };

  const handlePostReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;
    setDiscussionsList(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [
            ...post.replies,
            {
              id: `rep-${Date.now()}`,
              authorName: 'Alex Vance',
              authorRole: 'GT',
              body: text,
              createdAt: 'Just now'
            }
          ]
        };
      }
      return post;
    }));
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Helper function for material type icon
  const renderTypeIcon = (type: CustomMaterialItem['type']) => {
    switch (type) {
      case 'Doc (PDF/Word)':
        return <FileText className="w-4 h-4 text-rose-500" />;
      case 'PowerPoint (PPT)':
        return <Presentation className="w-4 h-4 text-amber-500" />;
      case 'Video File (MP4)':
        return <Video className="w-4 h-4 text-purple-500" />;
      case 'Video Link':
        return <LinkIcon className="w-4 h-4 text-blue-500" />;
      case 'Notes / Guide':
        return <Edit3 className="w-4 h-4 text-emerald-500" />;
      default:
        return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const filteredProvided = providedMaterialsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(providedSearch.toLowerCase()) || item.description.toLowerCase().includes(providedSearch.toLowerCase());
    const matchesType = providedFilterType === 'All' || item.type.includes(providedFilterType);
    return matchesSearch && matchesType;
  });

  const filteredAdditional = additionalMaterialsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(additionalSearch.toLowerCase()) || item.description.toLowerCase().includes(additionalSearch.toLowerCase());
    const matchesType = additionalFilterType === 'All' || item.type.includes(additionalFilterType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900 dark:text-slate-100">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl border border-slate-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Learning Sessions</span>
        </button>

        <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-lg border border-blue-200 shadow-sm">
          Learning Track • {session.category}
        </span>
      </div>

      {/* ======================================================== */}
      {/* SESSION OVERVIEW VIDEO SECTION                           */}
      {/* ======================================================== */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-lg space-y-4 relative overflow-hidden">
        <div className="space-y-1.5 pb-3 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-mono font-bold">
            <Video className="w-3.5 h-3.5 text-blue-600" />
            <span>Session Overview</span>
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900">{session.name}</h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">{overviewVideoDesc}</p>
        </div>

        {/* Video Player Box - Fills available area in 16:9 aspect ratio */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md flex items-center justify-center">
          <video
            controls
            src={overviewVideoUrl}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80"
          >
            Your browser does not support HTML5 video streaming.
          </video>
        </div>
      </div>

      {/* ======================================================== */}
      {/* THREE CORE FIELDS (Road Map, Provided Materials, Additional Materials) */}
      {/* ======================================================== */}
      <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
        
        {/* Field 1: Road Map */}
        <button
          onClick={() => handleTabSelect('roadmap')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'roadmap'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <Layers className={`w-4 h-4 ${activeTab === 'roadmap' ? 'text-white' : 'text-blue-600'}`} />
          <span>Road Map</span>
        </button>

        {/* Field 2: Provided Materials */}
        <button
          onClick={() => handleTabSelect('provided-materials')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'provided-materials'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeTab === 'provided-materials' ? 'text-white' : 'text-blue-600'}`} />
          <span>Provided Materials ({providedMaterialsList.length})</span>
        </button>

        {/* Field 3: Additional Materials */}
        <button
          onClick={() => handleTabSelect('additional-materials')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'additional-materials'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <FolderPlus className={`w-4 h-4 ${activeTab === 'additional-materials' ? 'text-white' : 'text-blue-600'}`} />
          <span>Additional Materials ({additionalMaterialsList.length})</span>
        </button>

        <button
          onClick={() => handleTabSelect('assignments')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'assignments'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <ClipboardList className={`w-4 h-4 ${activeTab === 'assignments' ? 'text-white' : 'text-blue-600'}`} />
          <span>Assignments ({assignmentsCount})</span>
        </button>

        <button
          onClick={() => handleTabSelect('quiz')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${activeTab === 'quiz' ? 'text-white' : 'text-blue-600'}`} />
          <span>Quiz ({quizzesCount})</span>
        </button>

        <div className="h-6 w-px bg-slate-300 my-auto mx-1" />

        <button
          onClick={() => handleTabSelect('notes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
          }`}
        >
          <Edit3 className={`w-3.5 h-3.5 ${activeTab === 'notes' ? 'text-white' : 'text-blue-600'}`} />
          <span>Notes ({personalNotesList.length})</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* FIELD A: ROAD MAP VIEW (Interactive GT Roadmap)           */}
      {/* ======================================================== */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fadeIn">
          {/* <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between text-xs"> */}
            {/* <div className="flex items-center gap-2 text-blue-900 font-medium">
              <Layers className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Interactive Session Roadmap — GTs can view this pathway for structured reference & topic progression.</span>
            </div> */}
            {/* <span className="font-mono text-[11px] font-bold text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">
              {(session?.topics || []).length} Topics Total
            </span> */}
          {/* </div> */}

          <InteractiveRoadmap
            topics={session?.topics || []}
            selectedTopicId={selectedTopicId}
            onSelectTopic={(id) => {
              const nextId = selectedTopicId === id ? '' : id;
              setSelectedTopicId(nextId);
              onStateChange?.(activeTab, nextId);
            }}
          />
        </div>
      )}

      {/* ======================================================== */}
      {/* FIELD B: PROVIDED MATERIALS VIEW                         */}
      {/* ======================================================== */}
      {activeTab === 'provided-materials' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Action Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Official Organization Provided Materials</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">Provided Study Materials</h3>
                <p className="text-xs text-slate-600">
                  Access all official docs, PPTs, video links, notes, and video files provided by the organization for this session.
                </p>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
                {['All', 'Doc', 'PPT', 'Video', 'Notes'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setProvidedFilterType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      providedFilterType === t
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search provided materials..."
                  value={providedSearch}
                  onChange={(e) => setProvidedSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Provided Materials List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProvided.map((mat) => (
              <div key={mat.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-blue-700 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200">
                      {renderTypeIcon(mat.type)}
                      <span>{mat.type}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{mat.fileSizeOrDuration}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{mat.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Provided by L&D • {mat.updatedAt}</span>
                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-xl border border-blue-200 flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Open / Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIELD C: ADDITIONAL MATERIALS VIEW                       */}
      {/* ======================================================== */}
      {activeTab === 'additional-materials' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Action Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold font-mono">
                  <FolderPlus className="w-3.5 h-3.5 text-purple-600" />
                  <span>Referenced & Additional Study Materials</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">Additional Reference Materials</h3>
                <p className="text-xs text-slate-600">
                  Explore additional docs, PPTs, video links, notes, and supplementary videos referenced by GT trainees and mentors.
                </p>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
                {['All', 'Doc', 'PPT', 'Video', 'Notes'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setAdditionalFilterType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      additionalFilterType === t
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search additional materials..."
                  value={additionalSearch}
                  onChange={(e) => setAdditionalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Additional Materials List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAdditional.map((mat) => (
              <div key={mat.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-purple-700 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200">
                      {renderTypeIcon(mat.type)}
                      <span>{mat.type}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{mat.fileSizeOrDuration}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{mat.description}</p>

                  {mat.sourceOrAuthor && (
                    <div className="text-[11px] text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
                      Source/Contributor: <span className="text-slate-900 font-bold">{mat.sourceOrAuthor}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Added: {mat.updatedAt}</span>
                  <a
                    href={mat.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold px-4 py-2 rounded-xl border border-purple-200 flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-600" /> Access Reference
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">Session Assignments ({assignmentsCount})</h3>
            <p className="text-slate-600 text-sm">Review required tasks, attached resources, due dates, and submission guidance for this session.</p>
          </div>

          {session.assignments && session.assignments.length > 0 ? (
            <div className="space-y-4">
              {session.assignments.map((assignment, idx) => (
                <div key={assignment.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        <ClipboardList className="w-4 h-4 text-blue-600" />
                        <span>Assignment {idx + 1}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{assignment.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{assignment.description}</p>
                    </div>

                    <div className="space-y-2 text-right text-[12px] text-slate-500">
                      <div>{assignment.dueDate ? `Due ${assignment.dueDate}` : 'No due date set'}</div>
                      <div>{assignment.totalPoints ? `${assignment.totalPoints} points` : 'Point value not set'}</div>
                      <div>{assignment.submissionFormat || 'Submission: URL / File'}</div>
                    </div>
                  </div>

                  {assignment.instructions && (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <strong className="font-semibold">Instructions:</strong> {assignment.instructions}
                    </div>
                  )}

                  {(assignment.attachmentName || assignment.attachmentUrl) && (
                    <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700 flex flex-col gap-2">
                      <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-700 font-bold">
                        <FileText className="w-4 h-4" /> Attached Resource
                      </div>
                      <div className="text-sm text-slate-800">
                        {assignment.attachmentName ? assignment.attachmentName : assignment.attachmentUrl}
                      </div>
                      {assignment.attachmentUrl && assignment.attachmentUrl.startsWith('http') && (
                        <a href={assignment.attachmentUrl} target="_blank" rel="noreferrer" className="text-blue-700 font-bold text-sm">
                          Open Resource
                        </a>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-semibold text-slate-700">{assignment.status || 'Pending'}</span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-semibold text-blue-700">{assignment.submissionFormat || 'URL / File'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-slate-600 text-sm">
              No assignment posted yet.
            </div>
          )}
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-base font-extrabold text-slate-900">Session Quiz ({quizzesCount})</h3>
            <p className="text-slate-600 text-sm">Review the current quiz assessment and start when ready.</p>
          </div>

          {activeQuiz ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm max-w-full">
              <div className="space-y-5">
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{activeQuiz.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {activeQuiz.description || 'Complete the assessment to check your understanding.'}
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-base font-medium text-slate-900 dark:text-white">Questions: {activeQuiz.questions.length}</p>
                  <button
                    type="button"
                    onClick={() => onStartQuiz(activeQuiz)}
                    className="w-full sm:w-[160px] h-12 rounded-[14px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-slate-600 text-sm">
              No quiz has been configured for this session yet. Ask your facilitator to add an assessment to the session.
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Your Reference Notes</h3>
            <textarea
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Record your insights, key syntax, or reminders for revision..."
              className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none"
            />
            <button
              onClick={handleAddNote}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-3.5 h-3.5" /> Save Personal Note
            </button>
          </div>

          <div className="space-y-3">
            {personalNotesList.map((note) => (
              <div key={note.id} className="bg-white border border-slate-200 rounded-2xl p-4 text-xs space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                  <span>{note.topicTitle}</span>
                  <span>{note.createdAt}</span>
                </div>
                <p className="text-slate-800 font-sans leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: UPLOAD OVERVIEW VIDEO MODAL                     */}
      {/* ======================================================== */}
      {isUploadingVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Upload Session Overview Video</h3>
              </div>
              <button
                onClick={() => setIsUploadingVideoModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOverviewVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Video Title</label>
                <input
                  type="text"
                  required
                  value={videoInputTitle}
                  onChange={(e) => setVideoInputTitle(e.target.value)}
                  placeholder="e.g. Full Session Overview & Objectives Walkthrough"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Overview Description</label>
                <textarea
                  rows={2}
                  value={videoInputDesc}
                  onChange={(e) => setVideoInputDesc(e.target.value)}
                  placeholder="Brief explanation of what attendees will watch in this video..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Upload Video File (MP4/WebM) or Enter URL</label>
                <div className="space-y-2">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-blue-500 cursor-pointer bg-slate-50 transition-colors">
                    <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs font-semibold block text-slate-700">
                      {selectedVideoFileName ? `Selected: ${selectedVideoFileName}` : 'Drag & drop MP4 overview video file or click to select'}
                    </span>
                    <span className="text-[10px] text-slate-400">Max file size: 500 MB</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedVideoFileName(e.target.files[0].name);
                          setVideoInputUrl(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="text-center text-[10px] text-slate-400 font-mono">— OR PASTE VIDEO URL —</div>

                  <input
                    type="url"
                    value={videoInputUrl}
                    onChange={(e) => setVideoInputUrl(e.target.value)}
                    placeholder="https://commondatastorage.googleapis.com/... or YouTube/Vimeo URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadingVideoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                >
                  Save Video Overview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: UPLOAD PROVIDED MATERIAL MODAL                  */}
      {/* ======================================================== */}
      {isUploadProvidedModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Upload Official Provided Material</h3>
              </div>
              <button onClick={() => setIsUploadProvidedModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProvidedMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Title</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="e.g. Official C# Memory Profiling Guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as CustomMaterialItem['type'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Doc (PDF/Word)">Doc (PDF / Word)</option>
                  <option value="PowerPoint (PPT)">PowerPoint (PPT)</option>
                  <option value="Video Link">Video Link (YouTube / Vimeo / External)</option>
                  <option value="Video File (MP4)">Video File (MP4 / WebM)</option>
                  <option value="Notes / Guide">Notes / Guide</option>
                  <option value="Spreadsheet">Spreadsheet (Excel / Sheets)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Upload File OR Paste Material Link</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMatFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <input
                    type="text"
                    value={matUrl}
                    onChange={(e) => setMatUrl(e.target.value)}
                    placeholder="https://... or internal document link"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  placeholder="Summary of this material..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadProvidedModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                >
                  Upload Provided Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: UPLOAD ADDITIONAL MATERIAL MODAL                */}
      {/* ======================================================== */}
      {isUploadAdditionalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-extrabold text-slate-900">Upload Additional Reference Material</h3>
              </div>
              <button onClick={() => setIsUploadAdditionalModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAdditionalMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Title</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="e.g. Advanced Microservices Benchmark Whitepaper"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Source / Contributor Name</label>
                <input
                  type="text"
                  value={matSource}
                  onChange={(e) => setMatSource(e.target.value)}
                  placeholder="e.g. Alex Vance or External Tech Blog"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Material Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as CustomMaterialItem['type'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
                >
                  <option value="Doc (PDF/Word)">Doc (PDF / Word)</option>
                  <option value="PowerPoint (PPT)">PowerPoint (PPT)</option>
                  <option value="Video Link">Video Link (YouTube / Vimeo / External)</option>
                  <option value="Video File (MP4)">Video File (MP4 / WebM)</option>
                  <option value="Notes / Guide">Notes / Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Upload File OR Paste Reference URL</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setMatFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                  <input
                    type="text"
                    value={matUrl}
                    onChange={(e) => setMatUrl(e.target.value)}
                    placeholder="https://... or external reference URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  placeholder="Summary of why this reference is helpful..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadAdditionalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20"
                >
                  Upload Additional Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
