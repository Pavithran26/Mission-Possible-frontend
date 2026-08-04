import React, { useState } from 'react';
import { Session, StudyMaterial, MaterialVersion } from '../../types';
import { ArrowLeft, Plus, FileText, Upload, Save, Trash2, History, ExternalLink, Sparkles } from 'lucide-react';

interface MaterialUploaderProps {
  session: Session;
  onSaveMaterials: (updatedMaterials: StudyMaterial[]) => void;
  onBack: () => void;
}

export const MaterialUploader: React.FC<MaterialUploaderProps> = ({ session, onSaveMaterials, onBack }) => {
  const [materials, setMaterials] = useState<StudyMaterial[]>(session.studyMaterials || []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<any>('PDF Document');
  const [url, setUrl] = useState('');
  const [versionNote, setVersionNote] = useState('Initial upload');

  const handleAddMaterial = () => {
    if (!title.trim()) return;
    const initialVer: MaterialVersion = {
      version: 1.0,
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy: 'L&D Admin',
      changeLog: versionNote || 'Initial upload for GT batch',
      contentUrl: url || 'https://example.com/material'
    };

    const newMat: StudyMaterial = {
      id: `mat-${Date.now()}`,
      sessionId: session.id,
      title,
      description,
      type: type as any,
      url: url || 'https://example.com/material',
      durationOrPages: type === 'PDF' ? '24 Pages' : '45 mins',
      currentVersion: 1.0,
      versions: [initialVer],
      tags: ['L&D']
    };

    setMaterials([...materials, newMat]);
    setTitle('');
    setDescription('');
    setUrl('');
    setVersionNote('Initial upload');
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
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
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            MATERIAL STORAGE & VERSION CONTROL
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">{session.name}</h2>
          <p className="text-slate-400 text-xs mt-1">Upload study documents, PPTs, YouTube videos, Udemy links with version tracking</p>
        </div>

        <button
          onClick={() => onSaveMaterials(materials)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Material Repository
        </button>
      </div>

      {/* Upload Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          <span>Upload New Study Material / Link</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Material Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. C# Memory Management & Garbage Collector Deep-Dive.pdf"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Material Type *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="PDF Document">PDF Document</option>
              <option value="PowerPoint Presentation">PowerPoint Presentation (PPT)</option>
              <option value="Word Document">Word Document</option>
              <option value="Notes">Notes / Article</option>
              <option value="YouTube Video">YouTube Video</option>
              <option value="Udemy Course Link">Udemy Course Link</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-slate-300 font-semibold">Description / Abstract</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short explanation of document contents..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Resource URL / Storage Link</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-semibold">Version Note / Changelog</label>
            <input
              type="text"
              value={versionNote}
              onChange={(e) => setVersionNote(e.target.value)}
              placeholder="e.g. Added section on .NET 8 GC enhancements"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleAddMaterial}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
        >
          Add Material to Session
        </button>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {materials.map((mat) => (
          <div key={mat.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {mat.type} • v{mat.currentVersion}
                </span>
                <h4 className="font-bold text-white text-base mt-1">{mat.title}</h4>
                <p className="text-slate-400 text-xs mt-0.5">{mat.description}</p>
              </div>

              <button
                onClick={() => handleDelete(mat.id)}
                className="p-2 text-rose-400 hover:bg-rose-900/40 rounded-xl border border-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Version History Drawer */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-emerald-400" /> Version Control History:
              </span>
              {mat.versions.map((ver, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300 text-[11px]">
                  <span>v{ver.version} — {ver.changeLog}</span>
                  <span className="font-mono text-slate-500">{ver.updatedAt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
