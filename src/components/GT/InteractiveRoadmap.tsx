import React from 'react';
import { RoadmapTopic } from '../../types';
import { Layers, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Interactive Learning Roadmap</span>
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
            Click any module header to expand or collapse subtopics
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800">
          {(topics || []).length} Modules Total
        </span>
      </div>

      {/* Vertical Interactive Tree Flow */}
      <div className="relative py-2 max-w-3xl mx-auto space-y-4">
        {(topics || []).map((topic, index) => {
          const isSelected = topic.id === selectedTopicId;
          const subtopics = topic.subtopics || [];

          return (
            <div key={topic.id} className="relative">
              {/* Module Header Node */}
              <div
                onClick={() => onSelectTopic(topic.id)}
                className={`p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer select-none ${
                  isSelected
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md translate-x-1'
                    : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30'
                }`}
                data-inspect-id="SessionCard"
              >
                <div className="flex items-center gap-4">
                  {/* Module Circle Badge Node */}
                  <div
                    className={`w-9 h-9 rounded-2xl font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white ring-4 ring-blue-600/20 shadow-blue-500/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isSelected ? '●' : '○'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                        Module {index + 1}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">
                    {subtopics.length} Subtopics
                  </span>
                  <motion.div
                    animate={{ rotate: isSelected ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  </motion.div>
                </div>
              </div>

              {/* Dynamic Inline Tree Subtopics Expansion */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-2 pl-6 sm:pl-10 relative space-y-2">
                      {/* Vertical Connector Line from Parent Module */}
                      <div className="absolute left-4 sm:left-7 top-0 bottom-6 w-0.5 bg-blue-300 dark:bg-blue-700/60 rounded-full" />

                      {subtopics.map((sub, subIdx) => {
                        const isLast = subIdx === subtopics.length - 1;

                        return (
                          <motion.div
                            key={sub.id || `sub-${subIdx}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: subIdx * 0.05 }}
                            className="relative flex items-start gap-3 group"
                          >
                            {/* Branch Connector Line (├─ or └─) */}
                            <div className="flex items-center h-9 -ml-6 sm:-ml-9 text-blue-400 dark:text-blue-500 font-mono text-xs select-none">
                              <span className="font-bold text-blue-500 dark:text-blue-400">
                                {isLast ? '└─' : '├─'}
                              </span>
                            </div>

                            {/* Subtopic Card Item */}
                            <div className="flex-1 bg-slate-50/90 dark:bg-slate-800/80 hover:bg-blue-50/60 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-500 rounded-xl p-3 shadow-xs transition-all flex items-center justify-between gap-3">
                              <div>
                                <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                  {sub.title}
                                </h5>
                                {sub.description && (
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};


