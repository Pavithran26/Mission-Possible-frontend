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

  const filteredSessions = sessions.filter((s) => {
    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
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
      status: 'Pending'
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
          
          <button
            onClick={handleSaveForm}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save All Session Changes
          </button>
        </div>

        {/* Edit Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingSession.id && sessions.some(s => s.id === editingSession.id) ? `Edit: ${editingSession.name || 'Learning Session'}` : 'Create New Learning Session'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure overview details, roadmap flow, materials, assignments, notes, and quiz assessments.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20 self-start sm:self-auto">
              {editingSession.status || 'Draft'} Mode
            </span>
          </div>

          {/* Navigation Tabs inside Edit Page */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Session Overview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Road Map ({topicNodesCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('provided')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'provided'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Provided Materials ({providedCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('additional')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'additional'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" /> Additional Materials ({additionalCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('assignments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'assignments'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" /> Assignments ({assignmentsCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Quiz Builder
            </button>
          </div>

          {/* TAB 1: SESSION OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs animate-fadeIn">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Session Title *</label>
                <input
                  type="text"
                  required
                  value={editingSession.name || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, name: e.target.value })}
                  placeholder="e.g. .NET Core Web API & Microservices Architecture"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={editingSession.description || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, description: e.target.value })}
                  placeholder="Detailed overview of what Graduate Trainees will learn in this session..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Category Track *</label>
                <input
                  type="text"
                  required
                  value={editingSession.category ?? ''}
                  onChange={(e) => setEditingSession({ ...editingSession, category: e.target.value as CategoryType })}
                  placeholder="e.g. .NET with C#, Insurance, SQL, C2C..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Trainer Name</label>
                <input
                  type="text"
                  value={editingSession.trainerName ?? ''}
                  onChange={(e) => setEditingSession({ ...editingSession, trainerName: e.target.value })}
                  placeholder="e.g. Santhosh, Harish, Janani..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Session Status *</label>
                <select
                  value={editingSession.status || 'Draft'}
                  onChange={(e) => setEditingSession({ ...editingSession, status: e.target.value as any, isPublished: e.target.value === 'Published' })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold block">Overview Video</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2">
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
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-xs">
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
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Interactive Learning Roadmap Sequence</h3>
                  <p className="text-slate-500 dark:text-slate-400">Add Topic Nodes, Subtopic Nodes, edit/add/replace video links, document files, and topic assignments.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddTopicNode}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> Add New Topic Node
                </button>
              </div>

              {/* Topic Nodes List */}
              <div className="space-y-6">
                {(editingSession.topics || []).map((topic, tIdx) => (
                  <div key={topic.id || tIdx} className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400">
                        <Layers className="w-4 h-4" />
                        <span>Topic Node #{tIdx + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteTopicNode(tIdx)}
                        className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Topic Node
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Topic Title</label>
                        <input
                          type="text"
                          value={topic.title}
                          onChange={(e) => handleUpdateTopicNode(tIdx, { title: e.target.value })}
                          placeholder="e.g. C# Fundamentals & Object Oriented Concepts"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Topic Description</label>
                        <textarea
                          rows={2}
                          value={topic.description}
                          onChange={(e) => handleUpdateTopicNode(tIdx, { description: e.target.value })}
                          placeholder="Overview of topic concepts and outcomes..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white resize-none"
                        />
                      </div>
                    </div>

                    {/* Subtopic Nodes inside Topic Node */}
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Subtopic Nodes ({topic.subtopics?.length || 0})</span>
                      </div>

                      {(topic.subtopics || []).map((sub, sIdx) => (
                        <div key={sub.id || sIdx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">Subtopic #{sIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubtopicNode(tIdx, sIdx)}
                              className="text-rose-500 hover:text-rose-600 text-[11px] font-semibold"
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
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white text-xs"
                            />
                          </div>
                        </div>
                      ))}

                      {/* Add Subtopic Node button positioned down below the subtopic cards */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleAddSubtopicNode(tIdx)}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Provided Materials ({providedCount})</h3>
                  <p className="text-slate-500 dark:text-slate-400">Official documents, guides, and external reference links provided for trainees.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddProvidedMaterial}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> Add Provided Material
                </button>
              </div>

              <div className="space-y-4">
                {(editingSession.providedMaterials || []).map((mat, mIdx) => (
                  <div key={mat.id || mIdx} className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Provided Material #{mIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingSession.providedMaterials || [])];
                          list.splice(mIdx, 1);
                          setEditingSession({ ...editingSession, providedMaterials: list });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Document Name</label>
                        <input
                          type="text"
                          value={mat.title}
                          onChange={(e) => {
                            const list = [...(editingSession.providedMaterials || [])];
                            list[mIdx] = { ...list[mIdx], title: e.target.value };
                            setEditingSession({ ...editingSession, providedMaterials: list });
                          }}
                          placeholder="Document Name"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Type of Document</label>
                        <select
                          value={mat.type}
                          onChange={(e) => {
                            const list = [...(editingSession.providedMaterials || [])];
                            list[mIdx] = { ...list[mIdx], type: e.target.value as any };
                            setEditingSession({ ...editingSession, providedMaterials: list });
                          }}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        >
                          <option value="PDF">PDF Document</option>
                          <option value="PowerPoint">PowerPoint Presentation</option>
                          <option value="Word">Word Document</option>
                          <option value="Notes">Handbook / Cheat Sheet</option>
                          <option value="External">External Document</option>
                        </select>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Document Description</label>
                        <textarea
                          rows={2}
                          value={mat.description}
                          onChange={(e) => {
                            const list = [...(editingSession.providedMaterials || [])];
                            list[mIdx] = { ...list[mIdx], description: e.target.value };
                            setEditingSession({ ...editingSession, providedMaterials: list });
                          }}
                          placeholder="Brief summary of document contents..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white resize-none"
                        />
                      </div>

                      {/* Upload Document Button */}
                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold block">Upload Document</label>
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700">
                          <Upload className="w-3.5 h-3.5 text-blue-500" />
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
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono ml-2">File: {mat.url}</span>
                        )}
                      </div>

                      {/* Add URLs Section */}
                      <div className="space-y-2.5 md:col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500" /> Add URLs (Video or Website Link)
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
                            className="sm:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                          />
                          <select
                            value={mat.urlType || (mat.type === 'Video' ? 'Video' : 'Website')}
                            onChange={(e) => {
                              const list = [...(editingSession.providedMaterials || [])];
                              list[mIdx] = { ...list[mIdx], urlType: e.target.value as any };
                              setEditingSession({ ...editingSession, providedMaterials: list });
                            }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
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
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Additional Materials ({additionalCount})</h3>
                  <p className="text-slate-500 dark:text-slate-400">Supplementary documents, external website references, and tutorial videos.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddAdditionalMaterial}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> Add Additional Material
                </button>
              </div>

              <div className="space-y-4">
                {(editingSession.additionalMaterials || []).map((mat, mIdx) => (
                  <div key={mat.id || mIdx} className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Additional Material #{mIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingSession.additionalMaterials || [])];
                          list.splice(mIdx, 1);
                          setEditingSession({ ...editingSession, additionalMaterials: list });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Document Name</label>
                        <input
                          type="text"
                          value={mat.title}
                          onChange={(e) => {
                            const list = [...(editingSession.additionalMaterials || [])];
                            list[mIdx] = { ...list[mIdx], title: e.target.value };
                            setEditingSession({ ...editingSession, additionalMaterials: list });
                          }}
                          placeholder="Document Name"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Type of Document</label>
                        <select
                          value={mat.type || 'PDF'}
                          onChange={(e) => {
                            const list = [...(editingSession.additionalMaterials || [])];
                            list[mIdx] = { ...list[mIdx], type: e.target.value as any };
                            setEditingSession({ ...editingSession, additionalMaterials: list });
                          }}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        >
                          <option value="PDF">PDF Document</option>
                          <option value="PowerPoint">PowerPoint Presentation</option>
                          <option value="Word">Word Document</option>
                          <option value="Notes">Reference Sheet</option>
                          <option value="External">External Reference</option>
                        </select>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Document Description</label>
                        <textarea
                          rows={2}
                          value={mat.description}
                          onChange={(e) => {
                            const list = [...(editingSession.additionalMaterials || [])];
                            list[mIdx] = { ...list[mIdx], description: e.target.value };
                            setEditingSession({ ...editingSession, additionalMaterials: list });
                          }}
                          placeholder="Detailed description of additional material..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white resize-none"
                        />
                      </div>

                      {/* Upload Document Button */}
                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold block">Upload Document</label>
                        <label className="cursor-pointer inline-flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700">
                          <Upload className="w-3.5 h-3.5 text-blue-500" />
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
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono ml-2">File: {mat.url}</span>
                        )}
                      </div>

                      {/* Add URLs Section */}
                      <div className="space-y-2.5 md:col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500" /> Add URLs (Video or Website Link)
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
                            className="sm:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                          />
                          <select
                            value={mat.urlType || 'Website'}
                            onChange={(e) => {
                              const list = [...(editingSession.additionalMaterials || [])];
                              list[mIdx] = { ...list[mIdx], urlType: e.target.value as any };
                              setEditingSession({ ...editingSession, additionalMaterials: list });
                            }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium"
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
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Session Assignments ({assignmentsCount})</h3>
                  <p className="text-slate-500 dark:text-slate-400">Practical tasks and assignment submissions for trainees.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddAssignment}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> Add New Assignment
                </button>
              </div>

              <div className="space-y-4">
                {(editingSession.assignments || []).map((asgn, aIdx) => (
                  <div key={asgn.id || aIdx} className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Assignment #{aIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const list = [...(editingSession.assignments || [])];
                          list.splice(aIdx, 1);
                          setEditingSession({ ...editingSession, assignments: list });
                        }}
                        className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Assignment Name</label>
                        <input
                          type="text"
                          value={asgn.title}
                          onChange={(e) => {
                            const list = [...(editingSession.assignments || [])];
                            list[aIdx] = { ...list[aIdx], title: e.target.value };
                            setEditingSession({ ...editingSession, assignments: list });
                          }}
                          placeholder="Assignment Name"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Due Date</label>
                        <input
                          type="date"
                          value={asgn.dueDate || ''}
                          onChange={(e) => {
                            const list = [...(editingSession.assignments || [])];
                            list[aIdx] = { ...list[aIdx], dueDate: e.target.value };
                            setEditingSession({ ...editingSession, assignments: list });
                          }}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-slate-700 dark:text-slate-300 font-semibold">Description</label>
                        <textarea
                          rows={3}
                          value={asgn.description}
                          onChange={(e) => {
                            const list = [...(editingSession.assignments || [])];
                            list[aIdx] = { ...list[aIdx], description: e.target.value };
                            setEditingSession({ ...editingSession, assignments: list });
                          }}
                          placeholder="Detailed description of the assignment..."
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white resize-none"
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
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Session Quiz & Assessments</h3>
                  <p className="text-slate-500 dark:text-slate-400">Configure questions, correct answers, time limit, and passing thresholds.</p>
                </div>
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
                      explanation: 'Explanation for correct answer.'
                    };
                    defaultQuiz.questions = [...(defaultQuiz.questions || []), newQ];
                    setEditingSession({ ...editingSession, quizzes: [defaultQuiz] });
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <Plus className="w-4 h-4" /> Add Quiz Question
                </button>
              </div>

              {((editingSession.quizzes?.[0]?.questions) || []).map((q, qIdx) => (
                <div key={q.id || qIdx} className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Question #{qIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const currentQuizzes = [...(editingSession.quizzes || [])];
                        if (currentQuizzes[0]) {
                          currentQuizzes[0].questions.splice(qIdx, 1);
                          setEditingSession({ ...editingSession, quizzes: currentQuizzes });
                        }
                      }}
                      className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
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
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold"
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
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-white"
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Correct Answer:</span>
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
                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-900 dark:text-white font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingSession(null)}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save All Session Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Admin Session Control Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
          </button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Session Content & Tracker Management</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">Manage session roadmaps, study materials, or track session table fields in real-time</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSessionManagerMode('modules')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                sessionManagerMode === 'modules'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Session Modules</span>
            </button>

            <button
              type="button"
              onClick={() => setSessionManagerMode('tracker')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                sessionManagerMode === 'tracker'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Session Tracker</span>
            </button>
          </div>

          <button
            onClick={handleCreateNew}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Create New Session
          </button>
        </div>
      </div>

      {sessionManagerMode === 'tracker' ? (
        <SessionTracker sessions={sessions} />
      ) : (
        <>
          {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(['ALL', 'Published', 'Draft', 'Archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search session title..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
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
                        : (session.status === 'Archived')
                        ? 'bg-slate-100 text-slate-700 border-slate-300'
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

            {/* Quick Actions: Edit (Pen) & Delete */}
            <div className="flex items-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200 dark:border-slate-800 self-end lg:self-center">
              <button
                onClick={() => {
                  setEditingSession(session);
                  setActiveTab('overview');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-blue-700 dark:text-blue-400 font-bold text-xs rounded-xl border border-blue-200 dark:border-slate-800 shadow-sm transition-all"
                title="Edit Session Details & Content"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Session</span>
              </button>
              
              <button
                onClick={() => onDeleteSession(session.id)}
                className="p-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-slate-950 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-200 dark:border-slate-800 transition-all"
                title="Delete Session"
              >
                <Trash2 className="w-4 h-4" />
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

