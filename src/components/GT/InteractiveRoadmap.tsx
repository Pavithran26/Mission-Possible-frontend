import React from 'react';
import { RoadmapTopic, RoadmapNodeStatus } from '../../types';
import { CheckCircle2, Lock, Play, Circle, ArrowDown, ChevronRight, Layers } from 'lucide-react';

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
  const getStatusIcon = (status: RoadmapNodeStatus) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'In Progress':
        return <Play className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse" />;
      case 'Unlocked':
        return <Circle className="w-4 h-4 text-slate-300" />;
      case 'Locked':
        return <Lock className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusStyle = (status: RoadmapNodeStatus, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-500/20 shadow-xl scale-105';
    }
    switch (status) {
      case 'Completed':
        return 'bg-slate-900 text-emerald-300 border-emerald-500/50 hover:border-emerald-400';
      case 'In Progress':
        return 'bg-slate-900 text-blue-300 border-blue-500/50 hover:border-blue-400';
      case 'Unlocked':
        return 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500';
      case 'Locked':
        return 'bg-slate-950/60 text-slate-600 border-slate-800 opacity-60 cursor-not-allowed';
    }
  };

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

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <Play className="w-3 h-3 fill-blue-400" /> In Progress
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Lock className="w-3 h-3" /> Locked
          </span>
        </div>
      </div>

      {/* Vertical Connected Graph Nodes */}
      <div className="relative py-4 max-w-2xl mx-auto space-y-4">
        {(topics || []).map((topic, index) => {
          const isSelected = topic.id === selectedTopicId;
          const isLocked = topic.status === 'Locked';

          return (
            <React.Fragment key={topic.id}>
              {/* Connected Line Connector */}
              {index > 0 && (
                <div className="flex justify-center my-1">
                  <div className="w-0.5 h-6 bg-slate-800 flex items-center justify-center">
                    <ArrowDown className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>
              )}

              {/* Roadmap Node Card */}
              <div
                onClick={() => !isLocked && onSelectTopic(topic.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${getStatusStyle(
                  topic.status,
                  isSelected
                )}`}
                data-inspect-id="SessionCard"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs">
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{topic.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/50 border border-slate-800">
                        {(topic.subtopics || []).length} Subtopics
                      </span>
                    </div>
                    <p className="text-xs opacity-80 line-clamp-1 mt-0.5">{topic.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusIcon(topic.status)}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
