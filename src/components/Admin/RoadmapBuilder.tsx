import React, { useState } from 'react';
import { Session, RoadmapTopic, Subtopic } from '../../types';
import { ArrowLeft, Plus, Save, Trash2, GripVertical, Layers, ChevronDown, CheckCircle2 } from 'lucide-react';

interface RoadmapBuilderProps {
  session: Session;
  onSave: (updatedTopics: RoadmapTopic[]) => void;
  onBack: () => void;
}

export const RoadmapBuilder: React.FC<RoadmapBuilderProps> = ({ session, onSave, onBack }) => {
  const [topics, setTopics] = useState<RoadmapTopic[]>(session.topics || []);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDesc, setNewTopicDesc] = useState('');

  const handleAddTopic = () => {
    if (!newTopicTitle.trim()) return;
    const newTopic: RoadmapTopic = {
      id: `topic-${Date.now()}`,
      order: topics.length + 1,
      orderIndex: topics.length + 1,
      title: newTopicTitle,
      description: newTopicDesc,
      status: 'Unlocked',
      subtopics: [
        { id: `sub-1`, title: `${newTopicTitle} Essentials`, durationMinutes: 30, status: 'Completed' }
      ]
    };
    setTopics([...topics, newTopic]);
    setNewTopicTitle('');
    setNewTopicDesc('');
  };

  const handleDeleteTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const handleAddSubtopic = (topicId: string, subTitle: string) => {
    if (!subTitle.trim()) return;
    setTopics(topics.map(t => {
      if (t.id === topicId) {
        return {
          ...t,
          subtopics: [
            ...t.subtopics,
            { id: `sub-${Date.now()}`, title: subTitle, durationMinutes: 20, status: 'Unlocked' }
          ]
        };
      }
      return t;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Session Manager
      </button>

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
            DRAG & DROP ROADMAP BUILDER
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">{session.name}</h2>
          <p className="text-slate-400 text-xs mt-1">Configure sequential learning path topics and subtopics for GTs</p>
        </div>

        <button
          onClick={() => onSave(topics)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Roadmap
        </button>
      </div>

      {/* Create Topic Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add New Topic Node</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <input
            type="text"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            placeholder="Topic Title (e.g. LINQ Queries & Expression Trees)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={newTopicDesc}
            onChange={(e) => setNewTopicDesc(e.target.value)}
            placeholder="Short description of concepts covered..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleAddTopic}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md"
        >
          Add Topic Node
        </button>
      </div>

      {/* Current Roadmap Topics Sequence List */}
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div key={topic.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-blue-400">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{topic.title}</h4>
                  <p className="text-slate-400 text-xs">{topic.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleDeleteTopic(topic.id)}
                className="p-2 text-rose-400 hover:bg-rose-900/40 rounded-xl border border-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Subtopics List */}
            <div className="space-y-2 pl-4">
              <span className="text-[11px] font-mono text-slate-500 font-bold uppercase block">
                Subtopics ({topic.subtopics.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topic.subtopics.map((sub) => (
                  <div key={sub.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-300">{sub.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{sub.durationMinutes}m</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
