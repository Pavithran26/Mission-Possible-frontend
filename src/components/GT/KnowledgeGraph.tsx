import React, { useState } from 'react';
import { mockKnowledgeGraphNodes } from '../../data/mockData';
import { KnowledgeGraphNode } from '../../types';
import { LayoutDashboard, Layers, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const KnowledgeGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode>(mockKnowledgeGraphNodes[0]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Dependency Network</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Technology Knowledge Graph</h2>
          <p className="text-slate-400 text-xs mt-0.5">Explore prerequisite dependencies between architecture concepts & modules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph Visual Canvas (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
            Enterprise Track Dependency Map
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockKnowledgeGraphNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 space-y-2 ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-xl shadow-purple-500/10 scale-105'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                  data-inspect-id="SessionCard"
                >
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
                    {node.category}
                  </span>
                  <h4 className="font-bold text-sm text-white">{node.label}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{node.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Drawer (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">
              Node Details
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{selectedNode.label}</h3>
            <span className="inline-block text-[10px] bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 text-slate-400 font-mono mt-1">
              Category: {selectedNode.category}
            </span>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">{selectedNode.description}</p>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-white block">Prerequisite Knowledge:</span>
            {selectedNode.prerequisites.length === 0 ? (
              <span className="text-xs text-emerald-400 font-mono">✓ Foundation Topic (No Prerequisites)</span>
            ) : (
              <div className="space-y-1">
                {selectedNode.prerequisites.map((pId) => {
                  const reqNode = mockKnowledgeGraphNodes.find((n) => n.id === pId);
                  return (
                    <div key={pId} className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                      <span>{reqNode?.label || pId}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
