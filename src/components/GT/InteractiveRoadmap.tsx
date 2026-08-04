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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Structured Learning Roadmap Flow</span>
          </h3>
          <p className="text-slate-600 text-xs mt-0.5">Sequential topic sequence followed by previous GT batches</p>
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
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
              }`}
              data-inspect-id="SessionCard"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                  {index + 1}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900">{topic.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{topic.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
