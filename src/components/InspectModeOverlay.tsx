import React, { useState, useEffect } from 'react';
import { mockInspectMetadataMap } from '../data/mockData';
import { InspectMetadata } from '../types';
import { Terminal, Code, Database, FileText, CheckCircle, HelpCircle, X, Layers, Cpu, Server, Shield } from 'lucide-react';

interface InspectModeOverlayProps {
  inspectModeActive: boolean;
  onCloseInspectMode: () => void;
}

export const InspectModeOverlay: React.FC<InspectModeOverlayProps> = ({
  inspectModeActive,
  onCloseInspectMode
}) => {
  const [hoveredInfo, setHoveredInfo] = useState<{ rect: DOMRect; inspectId: string } | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<InspectMetadata | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'learning'>('overview');

  useEffect(() => {
    if (!inspectModeActive) {
      setHoveredInfo(null);
      setSelectedMetadata(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-inspect-id]');
      if (target) {
        const inspectId = target.getAttribute('data-inspect-id');
        if (inspectId) {
          const rect = target.getBoundingClientRect();
          setHoveredInfo({ rect, inspectId });
        }
      } else {
        setHoveredInfo(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-inspect-id]');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        const inspectId = target.getAttribute('data-inspect-id') || '';
        const meta = mockInspectMetadataMap[inspectId] || {
          id: inspectId,
          componentName: inspectId,
          technology: 'React Component + Tailwind CSS',
          backendApi: 'GET /api/session/data',
          validation: 'JWT Auth token required',
          businessPurpose: 'Displays structured enterprise learning data',
          filesUsed: ['/src/App.tsx'],
          databaseTable: 'StudentProgress',
          authentication: 'Bearer Token',
          relatedLearningTopics: ['React State', 'RESTful API Integration'],
          interviewQuestions: ['How does this component maintain responsive state?'],
          bestPractices: ['Ensure key prop uniqueness', 'Use strict TypeScript types']
        };
        setSelectedMetadata(meta);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick, true);
    };
  }, [inspectModeActive]);

  if (!inspectModeActive) return null;

  return (
    <>
      {/* DevTools Active Banner Bar at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-cyan-500/50 text-cyan-400 px-4 py-2 flex items-center justify-between shadow-lg text-sm font-mono animate-pulse">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white tracking-wide">LEARNING INSPECT MODE ACTIVE</span>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs px-2 py-0.5 rounded-full">
            Hover & Click any element to inspect architecture
          </span>
        </div>
        <button
          onClick={onCloseInspectMode}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1 rounded text-xs flex items-center gap-1.5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Exit Inspect Mode
        </button>
      </div>

      {/* Hover Overlay Box */}
      {hoveredInfo && !selectedMetadata && (
        <div
          className="fixed z-40 border-2 border-cyan-400 bg-cyan-500/10 pointer-events-none rounded transition-all duration-75 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          style={{
            top: hoveredInfo.rect.top,
            left: hoveredInfo.rect.left,
            width: hoveredInfo.rect.width,
            height: hoveredInfo.rect.height
          }}
        >
          <div className="absolute -top-6 left-0 bg-cyan-600 text-slate-950 font-mono font-bold text-xs px-2 py-0.5 rounded shadow whitespace-nowrap">
            &lt;{hoveredInfo.inspectId} /&gt;
          </div>
        </div>
      )}

      {/* DevTools Inspector Bottom Drawer */}
      {selectedMetadata && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t-2 border-cyan-500 text-slate-100 shadow-2xl max-h-[60vh] flex flex-col font-sans transition-all">
          {/* DevTools Header Bar */}
          <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-cyan-400 font-semibold text-base">
                Component Inspection: &lt;{selectedMetadata.componentName} /&gt;
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-slate-800 p-1 rounded-lg flex gap-1 border border-slate-700">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Overview & Purpose
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === 'architecture'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  API & DB Schema
                </button>
                <button
                  onClick={() => setActiveTab('learning')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeTab === 'learning'
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Interview & Best Practices
                </button>
              </div>

              <button
                onClick={() => setSelectedMetadata(null)}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Close Inspection Panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* DevTools Body Content */}
          <div className="p-6 overflow-y-auto font-mono text-sm space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Cpu className="w-4 h-4" />
                    <span>Technology Stack</span>
                  </div>
                  <p className="text-slate-300 font-sans">{selectedMetadata.technology}</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Layers className="w-4 h-4" />
                    <span>Business Purpose</span>
                  </div>
                  <p className="text-slate-300 font-sans">{selectedMetadata.businessPurpose}</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Shield className="w-4 h-4" />
                    <span>Validation & Security</span>
                  </div>
                  <p className="text-slate-300 font-sans">{selectedMetadata.validation}</p>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Server className="w-4 h-4" />
                    <span>Backend API Endpoint</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded font-mono text-emerald-300 border border-slate-800 text-xs">
                    {selectedMetadata.backendApi}
                  </div>

                  <div className="flex items-center gap-2 text-purple-400 font-semibold pt-2">
                    <Database className="w-4 h-4" />
                    <span>Database Tables & Auth</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    <strong className="text-slate-400">Tables:</strong> {selectedMetadata.databaseTable}
                  </p>
                  <p className="text-slate-300 text-xs">
                    <strong className="text-slate-400">Auth Method:</strong> {selectedMetadata.authentication}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Code className="w-4 h-4" />
                    <span>Source Files Used</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedMetadata.filesUsed.map((file, idx) => (
                      <div key={idx} className="bg-slate-950 px-3 py-1.5 rounded text-xs text-slate-300 border border-slate-800 flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold">
                    <HelpCircle className="w-4 h-4" />
                    <span>Interview Preparation Questions</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedMetadata.interviewQuestions.map((q, i) => (
                      <li key={i} className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 flex gap-2">
                        <span className="text-amber-400 font-bold font-mono">Q{i + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Architecture Best Practices</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedMetadata.bestPractices.map((bp, i) => (
                      <li key={i} className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 flex gap-2">
                        <span className="text-emerald-400 font-bold font-mono">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
