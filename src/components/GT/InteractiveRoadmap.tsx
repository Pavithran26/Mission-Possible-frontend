import React from 'react';
import { RoadmapTopic } from '../../types';
import { Layers } from 'lucide-react';

interface InteractiveRoadmapProps {
  topics: RoadmapTopic[];
  selectedTopicId?: string;
  onSelectTopic: (topicId: string) => void;
}

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({
  topics,
  selectedTopicId,
  onSelectTopic
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <span>Structured Learning Roadmap Flow</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">Sequential topic sequence followed by previous GT batches</p>
        </div>
      </div>

      {/* Vertical Connected Graph Nodes */}
      <div className="relative py-4 max-w-2xl mx-auto space-y-3">
        {(topics || []).map((topic, index) => {
          const isSelected = topic.id === selectedTopicId;

          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-500/20 shadow-xl'
                  : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
              }`}
              data-inspect-id="SessionCard"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0">
                  {index + 1}
                </div>

                <div>
                  <h4 className="font-bold text-sm">{topic.title}</h4>
                  <p className="text-xs opacity-80 line-clamp-1 mt-0.5">{topic.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
