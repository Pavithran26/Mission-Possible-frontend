import React, { useState } from 'react';
import { Session, CategoryType, RoadmapTopic, SubTopic, StudyMaterial, SessionAssignment, PersonalNote, Quiz, QuizQuestion } from '../../types';
import { SessionTracker } from './SessionTracker';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  FileText, 
  HelpCircle, 
  ArrowLeft,
  Save,
  Clock,
  Video,
  FileCode,
  Link as LinkIcon,
  BookOpen,
  ClipboardList,
  StickyNote,
  Presentation,
  FolderOpen,
  X,
  Table,
  Upload,
  ExternalLink
} from 'lucide-react';

interface SessionManagerProps {
  sessions: Session[];
  onSaveSession: (sessionData: Partial<Session>) => void;
  onDeleteSession: (sessionId: string) => void;
  onOpenRoadmapBuilder?: (session: Session) => void;
  onOpenMaterialUploader?: (session: Session) => void;
  onOpenQuizBuilder?: (session: Session) => void;
  onBackToDashboard: () => void;
}

export const SessionManager: React.FC<SessionManagerProps> = ({
  sessions,
  onSaveSession,
  onDeleteSession,
  onBackToDashboard
}) => {
  const [editingSession, setEditingSession] = useState<Partial<Session> | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'provided' | 'additional' | 'assignments' | 'notes' | 'quiz'>('overview');
  const [sessionManagerMode, setSessionManagerMode] = useState<'modules' | 'tracker'>('modules');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Published' | 'Draft' | 'Archived'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sessions
    .filter((s) => {
      const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
      const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesQuery;
    })
    .sort((a, b) => {
      const getCourseSortPriority = (s: Session): number => {
        const cat = (s.category || '').toLowerCase();
        const name = (s.name || '').toLowerCase();
        if (cat.includes('.net') || name.includes('.net') || cat.includes('c#') || name.includes('c#')) {
          return 1;
        }
        if (cat.includes('sql') || name.includes('sql')) {
          return 2;
        }
        return 3;
      };
      const pA = getCourseSortPriority(a);
      const pB = getCourseSortPriority(b);
      if (pA !== pB) return pA - pB;
      return 0;
    });

  const handleCreateNew = () => {
    setEditingSession({
      id: `session-${Date.now()}`,
      name: '',
      description: '',
      category: '.NET with C#',
      trainerName: '',
      durationHours: 10,
      difficulty: 'Intermediate',
      status: 'Draft',
      progressPercent: 0,
      rating: 4.8,
      ratingCount: 1,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      learningObjectives: ['Master fundamental syntax', 'Implement enterprise best practices'],
      topics: [
        {
          id: `topic-${Date.now()}-1`,
          title: 'Introduction & Environment Setup',
          description: 'Getting started with tools, runtime, and architecture.',
          order: 1,
          status: 'Unlocked',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          documentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          assignment: 'Set up development environment and build a basic Hello World console application.',
          subtopics: [
            {
              id: `sub-${Date.now()}-1`,
              title: 'Runtime Overview & Project Structure',
              durationMinutes: 45,
              status: 'Unlocked',
              description: 'Understanding compilation, dependencies, and configuration.',
              videoUrl: '',
              documentUrl: '',
              assignment: ''
            }
          ]
        }
      ],
      providedMaterials: [
        {
          id: `prov-1`,
          sessionId: `session-${Date.now()}`,
          title: 'Official Enterprise Curriculum Handbook & Guide',
          type: 'PDF',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          description: 'Standard organization-issued reference guide.',
          durationOrPages: '42 Pages',
          currentVersion: 1,
          versions: [],
          tags: ['Curriculum', 'Official']
        }
      ],
      additionalMaterials: [
        {
          id: `add-1`,
          sessionId: `session-${Date.now()}`,
          title: 'Microsoft Official Documentation & Best Practices',
          type: 'External',
          url: 'https://learn.microsoft.com',
          description: 'Recommended external reading guide.',
          currentVersion: 1,
          versions: [],
          tags: ['Reference', 'Docs']
        }
      ],
      assignments: [
        {
          id: `assign-1`,
          sessionId: `session-${Date.now()}`,
          title: 'Hands-on Implementation Task',
          description: 'Implement core functionality as covered in the roadmap topics.',
          dueDate: '2026-08-15',
          totalPoints: 100,
          instructions: 'Submit GitHub repository URL or zipped source code.',
          submissionFormat: 'URL / ZIP',
          status: 'Pending'
        }
      ],
      notes: [
        {
          id: `note-1`,
          topicId: 't1',
          sessionId: `session-${Date.now()}`,
          topicTitle: 'Quick Reference Cheat Sheet',
          content: 'Key syntax and architecture design patterns to remember during implementation.',
          createdAt: '2026-08-01',
          updatedAt: '2026-08-01'
        }
      ],
      quizzes: []
    });
    setActiveTab('overview');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession || !editingSession.name) return;
    onSaveSession(editingSession);
    setEditingSession(null);
  };

  // Helper Functions for Road Map Topics & Subtopics
  const handleAddTopicNode = () => {
    if (!editingSession) return;
    const currentTopics = editingSession.topics || [];
    const newTopic: RoadmapTopic = {
      id: `topic-${Date.now()}`,
      title: 'New Roadmap Topic Node',
      description: 'Overview of topic concepts and outcomes.',
      order: currentTopics.length + 1,
      status: 'Unlocked',
      videoUrl: '',
      documentUrl: '',
      materialsUrl: '',
      assignment: '',
      subtopics: []
    };
    setEditingSession({
      ...editingSession,
      topics: [...currentTopics, newTopic]
    });
  };

  const handleUpdateTopicNode = (index: number, updatedFields: Partial<RoadmapTopic>) => {
    if (!editingSession) return;
    const currentTopics = [...(editingSession.topics || [])];
    currentTopics[index] = { ...currentTopics[index], ...updatedFields };
    setEditingSession({ ...editingSession, topics: currentTopics });
  };

  const handleDeleteTopicNode = (index: number) => {
    if (!editingSession) return;
    const currentTopics = [...(editingSession.topics || [])];
    currentTopics.splice(index, 1);
    setEditingSession({ ...editingSession, topics: currentTopics });
  };

  const handleAddSubtopicNode = (topicIndex: number) => {
    if (!editingSession) return;
    const currentTopics = [...(editingSession.topics || [])];
    const targetTopic = currentTopics[topicIndex];
    const newSubtopic: SubTopic = {
      id: `subtopic-${Date.now()}`,
      title: 'New Subtopic Node',
      durationMinutes: 30,
      status: 'Unlocked',
      description: 'Subtopic details and key steps.',
      videoUrl: '',
      documentUrl: '',
      materialsUrl: '',
      assignment: ''
    };
    targetTopic.subtopics = [...(targetTopic.subtopics || []), newSubtopic];
    currentTopics[topicIndex] = targetTopic;
    setEditingSession({ ...editingSession, topics: currentTopics });
  };

  const handleUpdateSubtopicNode = (topicIndex: number, subIndex: number, updatedFields: Partial<SubTopic>) => {
    if (!editingSession) return;
    const currentTopics = [...(editingSession.topics || [])];
    const targetTopic = { ...currentTopics[topicIndex] };
    const subtopics = [...(targetTopic.subtopics || [])];
    subtopics[subIndex] = { ...subtopics[subIndex], ...updatedFields };
    targetTopic.subtopics = subtopics;
    currentTopics[topicIndex] = targetTopic;
    setEditingSession({ ...editingSession, topics: currentTopics });
  };

  const handleDeleteSubtopicNode = (topicIndex: number, subIndex: number) => {
    if (!editingSession) return;
    const currentTopics = [...(editingSession.topics || [])];
    const targetTopic = { ...currentTopics[topicIndex] };
    const subtopics = [...(targetTopic.subtopics || [])];
    subtopics.splice(subIndex, 1);
    targetTopic.subtopics = subtopics;
    currentTopics[topicIndex] = targetTopic;
    setEditingSession({ ...editingSession, topics: currentTopics });
  };

  // Helper Functions for Provided Materials
  const handleAddProvidedMaterial = () => {
    if (!editingSession) return;
    const list = editingSession.providedMaterials || [];
    const newMat: StudyMaterial = {
      id: `prov-${Date.now()}`,
      sessionId: editingSession.id || '',
      title: 'New Provided Material',
      type: 'PDF',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      description: 'Official session guide or slide deck.',
      durationOrPages: '10 Pages',
      currentVersion: 1,
      versions: [],
      tags: ['Provided', 'Official']
    };
    setEditingSession({ ...editingSession, providedMaterials: [...list, newMat] });
  };

  // Helper Functions for Additional Materials
  const handleAddAdditionalMaterial = () => {
    if (!editingSession) return;
    const list = editingSession.additionalMaterials || [];
    const newMat: StudyMaterial = {
      id: `add-${Date.now()}`,
      sessionId: editingSession.id || '',
      title: 'New Additional Material',
      type: 'External',
      url: 'https://example.com',
      description: 'Supplementary reading material or video link.',
      currentVersion: 1,
      versions: [],
      tags: ['Reference', 'Extra']
    };
    setEditingSession({ ...editingSession, additionalMaterials: [...list, newMat] });
  };

  // Helper Functions for Session Assignments
  const handleAddAssignment = () => {
    if (!editingSession) return;
    const list = editingSession.assignments || [];
    const newAssign: SessionAssignment = {
      id: `assign-${Date.now()}`,
      sessionId: editingSession.id || '',
      title: 'New Session Assignment',
      description: 'Complete hands-on task based on roadmap learnings.',
      dueDate: '2026-08-30',
      totalPoints: 100,
      instructions: 'Submit project URL or code zip.',
      submissionFormat: 'URL / File',
      status: 'Pending',
      attachmentName: undefined,
      attachmentUrl: undefined
    };
    setEditingSession({ ...editingSession, assignments: [...list, newAssign] });
  };

  // Helper Functions for Notes
  const handleAddNote = () => {
    if (!editingSession) return;
    const list = editingSession.notes || [];
    const newNote: PersonalNote = {
      id: `note-${Date.now()}`,
      topicId: 't1',
      sessionId: editingSession.id || '',
      topicTitle: 'Official Session Notes',
      content: 'Key formulas, commands, and takeaways for this module.',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setEditingSession({ ...editingSession, notes: [...list, newNote] });
  };

  if (editingSession) {
    const providedCount = (editingSession.providedMaterials || []).length;
    const additionalCount = (editingSession.additionalMaterials || []).length;
    const assignmentsCount = (editingSession.assignments || []).length;
    const notesCount = (editingSession.notes || []).length;
    const topicNodesCount = (editingSession.topics || []).length;

    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setEditingSession(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel & Return
          </button>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 text-slate-900">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingSession.id && sessions.some(s => s.id === editingSession.id) ? `Edit: ${editingSession.name || 'Learning Session'}` : 'Create New Learning Session'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Configure overview details, roadmap flow, materials, assignments, notes, and quiz assessments.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto shadow-sm">
              {editingSession.status || 'Draft'} Mode
            </span>
          </div>

          {/* Navigation Tabs inside Edit Page */}
          <div className="bg-slate-100/90 p-2 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-white/80'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'overview' ? 'text-white' : 'text-blue-600'}`} />
              <span>Session Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-white/80'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${activeTab === 'roadmap' ? 'text-white' : 'text-blue-600'}`} />
              <span>Road Map ({topicNodesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('provided')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'provided'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-white/80'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${activeTab === 'provided' ? 'text-white' : 'text-blue-600'}`} />
              <span>Provided Materials ({providedCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('additional')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'additional'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-white/80'
              }`}
            >
              <FolderOpen className={`w-3.5 h-3.5 ${activeTab === 'additional' ? 'text-white' : 'text-blue-600'}`} />
              <span>Additional Materials ({additionalCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'assignments'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-white/80'
              }`}
            >
              <ClipboardList className={`w-3.5 h-3.5 ${activeTab === 'assignments' ? 'text-white' : 'text-blue-600'}`} />
              <span>Assignments ({assignmentsCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-white/80'
              }`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${activeTab === 'quiz' ? 'text-white' : 'text-blue-600'}`} />
              <span>Quiz Builder</span>
            </button>
          </div>

          {/* TAB 1: SESSION OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs animate-fadeIn">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Session Title *</label>
                <input
                  type="text"
                  required
                  value={editingSession.name || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, name: e.target.value })}
                  placeholder="e.g. .NET Core Web API & Microservices Architecture"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-bold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingSession.description || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, description: e.target.value })}
                  placeholder="Detailed overview of what Graduate Trainees will learn in this session..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-4 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold block mb-1">Category Track *</label>
                <input
                  type="text"
                  required
                  value={editingSession.category ?? ''}
                  onChange={(e) => setEditingSession({ ...editingSession, category: e.target.value as CategoryType })}
                  placeholder="e.g. .NET with C#, Insurance, SQL, C2C..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold block mb-1">Trainer Name</label>
                <input
                  type="text"
                  value={editingSession.trainerName ?? ''}
                  onChange={(e) => setEditingSession({ ...editingSession, trainerName: e.target.value })}
                  placeholder="e.g. Santhosh, Harish, Janani..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Session Status *</label>
                <select
                  value={
                    editingSession.status === 'Published' || editingSession.status === 'Publish'
                      ? 'Publish'
                      : editingSession.status === 'Archived' || editingSession.status === 'Archive'
                      ? 'Archive'
                      : (editingSession.status || 'Draft')
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingSession({
                      ...editingSession,
                      status: val as any,
                      isPublished: val === 'Publish' || val === 'Published'
                    });
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-bold"
                >
                  <option value="Publish">Publish</option>
                  <option value="Draft">Draft</option>
                  <option value="Archive">Archive</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Overview Video</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all">
                    <Video className="w-4 h-4" />
                    <span>Upload Overview Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setEditingSession({ ...editingSession, videoUrl: URL.createObjectURL(file) });
                        }
                      }}
                    />
                  </label>
                  {editingSession.videoUrl && (
                    <span className="text-xs text-blue-700 font-bold truncate max-w-xs">
                      Video attached: {editingSession.videoUrl}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROAD MAP EDITOR */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 text-xs animate-fadeIn">
              <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80">
                <div>
                  <h3 className="font-extrabold text-blue-950 text-sm">Interactive Learning Roadmap Sequence</h3>
                  <p className="text-slate-600 font-medium">Add Topic Nodes, Subtopic Nodes, edit/add/replace video links, document files, and topic assignments.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddTopicNode}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add New Topic Node
                </button>
              </div>

              {/* Topic Nodes List */}
              <div className="space-y-6">
                {(editingSession.topics || []).map((topic, tIdx) => (
                  <div key={topic.id || tIdx} className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2 font-extrabold text-blue-900">
                        <Layers className="w-4 h-4 text-blue-600" />
                        <span>Topic Node #{tIdx + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteTopicNode(tIdx)}
                        className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Topic Node
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Topic Title</label>
                        <input
                          type="text"
                          value={topic.title}
                          onChange={(e) => handleUpdateTopicNode(tIdx, { title: e.target.value })}
                          placeholder="e.g. C# Fundamentals & Object Oriented Concepts"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Topic Description</label>
                        <textarea
                          rows={2}
                          value={topic.description}
                          onChange={(e) => handleUpdateTopicNode(tIdx, { description: e.target.value })}
                          placeholder="Overview of topic concepts and outcomes..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium resize-none"
                        />
                      </div>
                    </div>

                    {/* Subtopic Nodes inside Topic Node */}
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900">Subtopic Nodes ({topic.subtopics?.length || 0})</span>
                      </div>

                      {(topic.subtopics || []).map((sub, sIdx) => (
                        <div key={sub.id || sIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-700 text-xs">Subtopic #{sIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubtopicNode(tIdx, sIdx)}
                              className="text-rose-600 hover:text-rose-700 text-[11px] font-bold"
                            >
                              Delete Subtopic
                            </button>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={sub.title}
                              onChange={(e) => handleUpdateSubtopicNode(tIdx, sIdx, { title: e.target.value })}
                              placeholder="Subtopic Name"
                              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                            />
                          </div>
                        </div>
                      ))}

                      {/* Add Subtopic Node button positioned down below the subtopic cards */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleAddSubtopicNode(tIdx)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <Plus className="w-4 h-4" /> Add Subtopic Node
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROVIDED MATERIALS */}
          {activeTab === 'provided' && (
            <div className="space-y-6 text-xs animate-fadeIn">
              <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80">
                <div>
                  <h3 className="font-extrabold text-blue-950 text-sm">Provided Materials ({providedCount})</h3>
                  <p className="text-slate-600 font-medium">Official documents, guides, and external reference links provided for trainees.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddProvidedMaterial}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Provided Material
                </button>
              </div>

              <div className="space-y-4">
                {(editingSession.providedMaterials || []).map((mat, mIdx) => (
                  <div key={mat.id || mIdx} className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">Provided Material #{mIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingSession.providedMaterials || [])];
                          list.splice(mIdx, 1);
                          setEditingSession({ ...editingSession, providedMaterials: list });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Document Name</label>
                        <input
                          type="text"
                          value={mat.title}
                          onChange={(e) => {
                            const list = [...(editingSession.providedMaterials || [])];
                            list[mIdx] = { ...list[mIdx], title: e.target.value };
                            setEditingSession({ ...editingSession, providedMaterials: list });
                          }}
                          placeholder="Document Name"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Type of Document</label>
                        <select
                          value={mat.type}
                          onChange={(e) => {
                            const list = [...(editingSession.providedMaterials || [])];
                            list[mIdx] = { ...list[mIdx], type: e.target.value as any };
                            setEditingSession({ ...editingSession, providedMaterials: list });
                          }}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                        >
                          <option value="PDF">PDF Document</option>
                          <option value="PowerPoint">PowerPoint Presentation</option>
                          <option value="Word">Word Document</option>
                          <option value="Notes">Handbook / Cheat Sheet</option>
                          <option value="External">External Document</option>
                        </select>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-slate-700 font-bold block mb-1">Document Description</label>
                        <textarea
                          rows={2}
                          value={mat.description}
                          onChange={(e) => {
                            const list = [...(editingSession.providedMaterials || [])];
                            list[mIdx] = { ...list[mIdx], description: e.target.value };
                            setEditingSession({ ...editingSession, providedMaterials: list });
                          }}
                          placeholder="Brief summary of document contents..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium resize-none"
                        />
                      </div>

                      {/* Upload Document Button */}
                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Upload Document</label>
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-300 shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const list = [...(editingSession.providedMaterials || [])];
                                list[mIdx] = { ...list[mIdx], url: file.name };
                                setEditingSession({ ...editingSession, providedMaterials: list });
                              }
                            }}
                          />
                        </label>
                        {mat.url && !mat.url.startsWith('http') && (
                          <span className="text-[11px] text-blue-700 font-mono font-bold ml-2">File: {mat.url}</span>
                        )}
                      </div>

                      {/* Add URLs Section */}
                      <div className="space-y-2.5 md:col-span-2 pt-2 border-t border-slate-200">
                        <label className="text-slate-700 font-bold flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Add URLs (Video or Website Link)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={mat.url || ''}
                            onChange={(e) => {
                              const list = [...(editingSession.providedMaterials || [])];
                              list[mIdx] = { ...list[mIdx], url: e.target.value };
                              setEditingSession({ ...editingSession, providedMaterials: list });
                            }}
                            placeholder="https://..."
                            className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium"
                          />
                          <select
                            value={mat.urlType || (mat.type === 'Video' ? 'Video' : 'Website')}
                            onChange={(e) => {
                              const list = [...(editingSession.providedMaterials || [])];
                              list[mIdx] = { ...list[mIdx], urlType: e.target.value as any };
                              setEditingSession({ ...editingSession, providedMaterials: list });
                            }}
                            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-bold"
                          >
                            <option value="Video">Video URL</option>
                            <option value="Website">Website URL</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ADDITIONAL MATERIALS */}
          {activeTab === 'additional' && (
            <div className="space-y-6 text-xs animate-fadeIn">
              <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80">
                <div>
                  <h3 className="font-extrabold text-blue-950 text-sm">Additional Materials ({additionalCount})</h3>
                  <p className="text-slate-600 font-medium">Supplementary documents, external website references, and tutorial videos.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddAdditionalMaterial}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Additional Material
                </button>
              </div>

              <div className="space-y-4">
                {(editingSession.additionalMaterials || []).map((mat, mIdx) => (
                  <div key={mat.id || mIdx} className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">Additional Material #{mIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingSession.additionalMaterials || [])];
                          list.splice(mIdx, 1);
                          setEditingSession({ ...editingSession, additionalMaterials: list });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Document Name</label>
                        <input
                          type="text"
                          value={mat.title}
                          onChange={(e) => {
                            const list = [...(editingSession.additionalMaterials || [])];
                            list[mIdx] = { ...list[mIdx], title: e.target.value };
                            setEditingSession({ ...editingSession, additionalMaterials: list });
                          }}
                          placeholder="Document Name"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Type of Document</label>
                        <select
                          value={mat.type || 'PDF'}
                          onChange={(e) => {
                            const list = [...(editingSession.additionalMaterials || [])];
                            list[mIdx] = { ...list[mIdx], type: e.target.value as any };
                            setEditingSession({ ...editingSession, additionalMaterials: list });
                          }}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                        >
                          <option value="PDF">PDF Document</option>
                          <option value="PowerPoint">PowerPoint Presentation</option>
                          <option value="Word">Word Document</option>
                          <option value="Notes">Reference Sheet</option>
                          <option value="External">External Reference</option>
                        </select>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-slate-700 font-bold block mb-1">Document Description</label>
                        <textarea
                          rows={2}
                          value={mat.description}
                          onChange={(e) => {
                            const list = [...(editingSession.additionalMaterials || [])];
                            list[mIdx] = { ...list[mIdx], description: e.target.value };
                            setEditingSession({ ...editingSession, additionalMaterials: list });
                          }}
                          placeholder="Detailed description of additional material..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium resize-none"
                        />
                      </div>

                      {/* Upload Document Button */}
                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Upload Document</label>
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-300 shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const list = [...(editingSession.additionalMaterials || [])];
                                list[mIdx] = { ...list[mIdx], url: file.name };
                                setEditingSession({ ...editingSession, additionalMaterials: list });
                              }
                            }}
                          />
                        </label>
                        {mat.url && !mat.url.startsWith('http') && (
                          <span className="text-[11px] text-blue-700 font-mono font-bold ml-2">File: {mat.url}</span>
                        )}
                      </div>

                      {/* Add URLs Section */}
                      <div className="space-y-2.5 md:col-span-2 pt-2 border-t border-slate-200">
                        <label className="text-slate-700 font-bold flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Add URLs (Video or Website Link)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={mat.url || ''}
                            onChange={(e) => {
                              const list = [...(editingSession.additionalMaterials || [])];
                              list[mIdx] = { ...list[mIdx], url: e.target.value };
                              setEditingSession({ ...editingSession, additionalMaterials: list });
                            }}
                            placeholder="https://..."
                            className="sm:col-span-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium"
                          />
                          <select
                            value={mat.urlType || 'Website'}
                            onChange={(e) => {
                              const list = [...(editingSession.additionalMaterials || [])];
                              list[mIdx] = { ...list[mIdx], urlType: e.target.value as any };
                              setEditingSession({ ...editingSession, additionalMaterials: list });
                            }}
                            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-bold"
                          >
                            <option value="Video">Video URL</option>
                            <option value="Website">Website URL</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="space-y-6 text-xs animate-fadeIn">
              <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80">
                <div>
                  <h3 className="font-extrabold text-blue-950 text-sm">Session Assignments ({assignmentsCount})</h3>
                  <p className="text-slate-600 font-medium">Practical tasks and assignment submissions for trainees.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddAssignment}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add New Assignment
                </button>
              </div>

              <div className="space-y-4">
                {(editingSession.assignments || []).map((asgn, aIdx) => (
                  <div key={asgn.id || aIdx} className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">Assignment #{aIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingSession.assignments || [])];
                          list.splice(aIdx, 1);
                          setEditingSession({ ...editingSession, assignments: list });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Assignment Name</label>
                        <input
                          type="text"
                          value={asgn.title}
                          onChange={(e) => {
                            const list = [...(editingSession.assignments || [])];
                            list[aIdx] = { ...list[aIdx], title: e.target.value };
                            setEditingSession({ ...editingSession, assignments: list });
                          }}
                          placeholder="Assignment Name"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Due Date</label>
                        <input
                          type="date"
                          value={asgn.dueDate || ''}
                          onChange={(e) => {
                            const list = [...(editingSession.assignments || [])];
                            list[aIdx] = { ...list[aIdx], dueDate: e.target.value };
                            setEditingSession({ ...editingSession, assignments: list });
                          }}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 font-bold block mb-1">Upload Assignment Document</label>
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl border border-slate-300 shadow-sm transition-all">
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>Upload Document</span>
                          <input
                            type="file"
                            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const list = [...(editingSession.assignments || [])];
                                list[aIdx] = {
                                  ...list[aIdx],
                                  attachmentName: file.name,
                                  attachmentUrl: URL.createObjectURL(file)
                                };
                                setEditingSession({ ...editingSession, assignments: list });
                              }
                            }}
                          />
                        </label>
                        {asgn.attachmentName && (
                          <span className="text-[11px] text-blue-700 font-mono font-bold ml-2">Uploaded: {asgn.attachmentName}</span>
                        )}
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-slate-700 font-bold block mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={asgn.description}
                          onChange={(e) => {
                            const list = [...(editingSession.assignments || [])];
                            list[aIdx] = { ...list[aIdx], description: e.target.value };
                            setEditingSession({ ...editingSession, assignments: list });
                          }}
                          placeholder="Detailed description of the assignment..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: QUIZ BUILDER */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 text-xs animate-fadeIn">
              <div className="flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80">
                <div>
                  <h3 className="font-extrabold text-blue-950 text-sm">Session Quiz & Assessments</h3>
                  <p className="text-slate-600 font-medium">Configure questions, correct answers, time limit, and passing thresholds.</p>
                </div>
              </div>

              {/* Add button moved below the question form so admins can fill fields then click Add */}

              {((editingSession.quizzes?.[0]?.questions) || []).map((q, qIdx) => (
                <div key={q.id || qIdx} className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">Question #{qIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const currentQuizzes = [...(editingSession.quizzes || [])];
                        if (currentQuizzes[0]) {
                          currentQuizzes[0].questions.splice(qIdx, 1);
                          setEditingSession({ ...editingSession, quizzes: currentQuizzes });
                        }
                      }}
                      className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={q.prompt}
                      onChange={(e) => {
                        const currentQuizzes = [...(editingSession.quizzes || [])];
                        if (currentQuizzes[0]) {
                          currentQuizzes[0].questions[qIdx].prompt = e.target.value;
                          setEditingSession({ ...editingSession, quizzes: currentQuizzes });
                        }
                      }}
                      placeholder="Question prompt..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(q.options || ['Option A', 'Option B', 'Option C', 'Option D']).map((opt, oIdx) => (
                        <input
                          key={oIdx}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const currentQuizzes = [...(editingSession.quizzes || [])];
                            if (currentQuizzes[0]) {
                              const opts = [...(currentQuizzes[0].questions[qIdx].options || [])];
                              opts[oIdx] = e.target.value;
                              currentQuizzes[0].questions[qIdx].options = opts;
                              setEditingSession({ ...editingSession, quizzes: currentQuizzes });
                            }
                          }}
                          placeholder={`Option ${oIdx + 1}`}
                          className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-slate-700 font-bold">Correct Answer:</span>
                      <input
                        type="text"
                        value={Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                        onChange={(e) => {
                          const currentQuizzes = [...(editingSession.quizzes || [])];
                          if (currentQuizzes[0]) {
                            currentQuizzes[0].questions[qIdx].correctAnswer = e.target.value;
                            setEditingSession({ ...editingSession, quizzes: currentQuizzes });
                          }
                        }}
                        className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      const currentQuizzes = editingSession.quizzes || [];
                      const defaultQuiz = currentQuizzes[0] || {
                        id: `quiz-${Date.now()}`,
                        sessionId: editingSession.id || '',
                        title: `${editingSession.name || 'Session'} Assessment`,
                        passingScorePercent: 80,
                        timeLimitMinutes: 15,
                        questions: []
                      };
                      const newQ: QuizQuestion = {
                        id: `q-${Date.now()}`,
                        type: 'MCQ',
                        prompt: 'Enter new question prompt...',
                        options: ['Option A', 'Option B', 'Option C', 'Option D'],
                        correctAnswer: 'Option A',
                        explanation: 'Explanation for correct answer.',
                        points: 10
                      };
                      defaultQuiz.questions = [...(defaultQuiz.questions || []), newQ];
                      setEditingSession({ ...editingSession, quizzes: [defaultQuiz] });

                      // UX: after adding, scroll to and focus the newly created question prompt input
                      setTimeout(() => {
                        const el = document.getElementById(`${newQ.id}-prompt`);
                        if (el) {
                          try {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            (el as HTMLInputElement).focus();
                          } catch (err) {
                            // ignore in non-browser environments
                          }
                        }
                      }, 80);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Quiz Question
                  </button>
                </div>
            </div>
          )}

          {/* Form Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingSession(null)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveForm}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-white" /> Save All Session Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Admin Session Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FolderOpen className="w-6.5 h-6.5 text-blue-600" />
            <span>Session Content</span>
          </h2>
          <p className="text-slate-600 text-xs mt-0.5">Manage session roadmaps, study materials, assignments, and curriculum content</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-white" /> Create New Session
          </button>
        </div>
      </div>

      {sessionManagerMode === 'tracker' ? (
        <SessionTracker sessions={sessions} />
      ) : (
        <>
          {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="bg-slate-100 p-2 rounded-2xl border border-slate-200 flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar shadow-sm">
          {(['ALL', 'Published', 'Draft', 'Archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200/80'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-3 z-10" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search session title..."
            className="w-full rounded-xl pl-10 pr-4 py-2.5 text-xs bg-white text-slate-900 placeholder-slate-500 border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/12 shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* Sessions Cards List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 shadow-md hover:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all text-slate-900"
            data-inspect-id="SessionCard"
          >
            <div className="flex items-start gap-4">
              <img src={session.thumbnail} alt={session.name} className="w-20 h-20 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0" />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {session.category}
                  </span>
                  {session.trainerName && (
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Trainer: {session.trainerName}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      (session.status || (session.isPublished !== false ? 'Published' : 'Draft')) === 'Published'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : (session.status === 'Archived' || session.status === 'Archive')
                        ? 'bg-slate-100 text-slate-700 border-slate-300'
                        : session.status === 'Publish'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    {session.status || (session.isPublished !== false ? 'Published' : 'Draft')}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{session.name}</h3>
                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{session.description}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200 self-end lg:self-center min-w-[170px]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingSession(session);
                    setActiveTab('overview');
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 45%, #BFDBFE 100%)',
                    border: '1px solid #BFDBFE',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)',
                  }}
                  className="font-extrabold text-xs px-4 py-2.5 rounded-xl text-blue-800 hover:text-blue-900 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400 flex-1"
                  title="Edit Session Details & Content"
                >
                  <Edit3 className="w-4 h-4 text-blue-700 fill-blue-700" />
                  <span className="text-blue-800 font-extrabold">Edit Session</span>
                </button>
                
                <button
                  onClick={() => onDeleteSession(session.id)}
                  style={{
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 45%, #BFDBFE 100%)',
                    border: '1px solid #BFDBFE',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)',
                  }}
                  className="p-2.5 rounded-xl text-blue-800 hover:text-rose-700 hover:border-rose-300 flex items-center justify-center transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md"
                  title="Delete Session"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                </button>
              </div>

              {/* Publish button under the Edit Session button */}
              <button
                disabled={session.status !== 'Publish'}
                onClick={() => {
                  if (session.status === 'Publish') {
                    onSaveSession({ ...session, status: 'Published', isPublished: true });
                  }
                }}
                className={`w-full font-extrabold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
                  session.status === 'Publish'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer hover:-translate-y-0.5'
                    : 'bg-slate-200/80 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                }`}
                title={session.status === 'Publish' ? 'Click to Publish session' : 'Publish button enabled when status is "Publish"'}
              >
                <CheckCircle2 className={`w-4 h-4 ${session.status === 'Publish' ? 'text-white' : 'text-slate-400'}`} />
                <span>Publish</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};

