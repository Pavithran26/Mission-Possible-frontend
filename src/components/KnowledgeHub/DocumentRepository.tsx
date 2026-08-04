import React, { useState } from 'react';
import { 
  KnowledgeHubDocument, 
  KnowledgeHubTopic, 
  DocumentVersionHistory, 
  User 
} from '../../types';
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Sparkles, 
  History, 
  FileSpreadsheet, 
  FileCode, 
  Share2, 
  X, 
  Tag, 
  Clock, 
  User as UserIcon, 
  Upload, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface DocumentRepositoryProps {
  documents: KnowledgeHubDocument[];
  topics: KnowledgeHubTopic[];
  currentUser: User;
  onUploadDocument: (docData: Partial<KnowledgeHubDocument>) => void;
  onReplaceDocumentVersion: (docId: string, newVersion: string, changelog: string) => void;
  selectedDocument: KnowledgeHubDocument | null;
  onSelectDocument: (doc: KnowledgeHubDocument | null) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  initialTopicId?: string;
}

export const DocumentRepository: React.FC<DocumentRepositoryProps> = ({
  documents,
  topics,
  currentUser,
  onUploadDocument,
  onReplaceDocumentVersion,
  selectedDocument,
  onSelectDocument,
  isUploadModalOpen,
  setIsUploadModalOpen,
  initialTopicId
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Upload Modal Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocDescription, setNewDocDescription] = useState('');
  const [newTopicId, setNewTopicId] = useState<string>(initialTopicId || topics[0]?.id || '');
  const [newFileType, setNewFileType] = useState<'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'TXT' | 'PNG' | 'JPG' | 'ZIP'>('PDF');
  const [newVersion, setNewVersion] = useState('v1.0');
  const [newTagsInput, setNewTagsInput] = useState('Guide, Architecture');

  // Replace Version State inside Preview Modal
  const [isReplacingVersion, setIsReplacingVersion] = useState(false);
  const [replaceVersionNumber, setReplaceVersionNumber] = useState('v2.2');
  const [replaceChangelog, setReplaceChangelog] = useState('');

  // AI Generation State
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isExtractingFaqs, setIsExtractingFaqs] = useState(false);
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim() || !newDocDescription.trim()) return;

    const selectedTopic = topics.find(t => t.id === newTopicId);
    const tagsArray = newTagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onUploadDocument({
      name: newDocName,
      description: newDocDescription,
      topicId: newTopicId,
      topicName: selectedTopic?.name || 'General',
      tags: tagsArray,
      version: newVersion,
      fileType: newFileType,
      fileSize: '3.4 MB',
      author: `${currentUser.name} (${currentUser.role})`,
      uploadedDate: new Date().toISOString().split('T')[0],
      downloadCount: 1,
      isApproved: true,
      versions: [
        {
          version: newVersion,
          uploadedBy: currentUser.name,
          uploadedAt: new Date().toISOString().split('T')[0],
          changelog: 'Initial version published to Knowledge Hub.',
          fileSize: '3.4 MB'
        }
      ]
    });

    setNewDocName('');
    setNewDocDescription('');
    setIsUploadModalOpen(false);
  };

  const handleReplaceVersionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocument || !replaceVersionNumber.trim() || !replaceChangelog.trim()) return;

    onReplaceDocumentVersion(selectedDocument.id, replaceVersionNumber, replaceChangelog);
    setIsReplacingVersion(false);
    setReplaceChangelog('');
  };

  const handleAiSummarize = () => {
    if (!selectedDocument) return;
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
    }, 700);
  };

  const handleAiExtractFaqs = () => {
    if (!selectedDocument) return;
    setIsExtractingFaqs(true);
    setTimeout(() => {
      setIsExtractingFaqs(false);
    }, 700);
  };

  const handleAiFlashcards = () => {
    if (!selectedDocument) return;
    setIsGeneratingFlashcards(true);
    setTimeout(() => {
      setIsGeneratingFlashcards(false);
    }, 700);
  };

  // Filter Logic
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedFileType === 'all' || doc.fileType === selectedFileType;
    const matchesTopic = selectedTopicFilter === 'all' || doc.topicId === selectedTopicFilter;
    return matchesSearch && matchesType && matchesTopic;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document repository by title, summary, topic, or tags..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document (+5 Pts)</span>
        </button>

      </div>

      {/* Topic Filter */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-bold px-2">Filter Documents:</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium text-[11px]">Topic:</span>
          <select
            value={selectedTopicFilter}
            onChange={(e) => setSelectedTopicFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="all">All Topics</option>
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocuments.length === 0 ? (
          <div className="col-span-full bg-slate-900/50 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-300">No documents found matching filters</h3>
            <p className="text-xs text-slate-500">Upload a new document or adjust your search filters.</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group bg-slate-900 rounded-3xl border border-slate-800 hover:border-slate-700 p-6 space-y-4 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/20">
                    {doc.fileType}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 font-mono text-[10px] font-bold">
                      {doc.version}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{doc.fileSize}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectDocument(doc)}
                  className="text-sm font-bold text-white group-hover:text-blue-400 cursor-pointer transition-colors line-clamp-2"
                >
                  {doc.name}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {doc.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Footer info & action */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate">By {doc.author}</span>
                  <span className="shrink-0">{doc.downloadCount} downloads</span>
                </div>

                <button
                  onClick={() => onSelectDocument(doc)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Preview & AI Summarize</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Document Preview & Version History Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 font-mono text-xs font-bold border border-blue-500/20">
                  {selectedDocument.fileType}
                </span>
                <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-md">
                  {selectedDocument.version}
                </span>
              </div>

              <button
                onClick={() => onSelectDocument(null)}
                className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Title & Author */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">{selectedDocument.name}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Topic: <strong className="text-white">{selectedDocument.topicName}</strong></span>
                <span>Uploader: <strong className="text-white">{selectedDocument.author}</strong></span>
                <span>Date: <strong className="text-white">{selectedDocument.uploadedDate}</strong></span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {selectedDocument.description}
            </div>

            {/* AI Learning Copilot Action Bar */}
            <div className="bg-gradient-to-r from-violet-900/20 to-purple-900/20 border border-violet-500/30 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">AI Document Intelligence Suite</h4>
                  <p className="text-[11px] text-slate-400">Extract instant AI summaries, FAQs, and study flash cards from this document.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAiSummarize}
                  className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  {isSummarizing ? 'Summarizing...' : '🤖 Generate AI Summary'}
                </button>

                <button
                  onClick={handleAiExtractFaqs}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                >
                  {isExtractingFaqs ? 'Extracting...' : '🤖 Extract FAQs'}
                </button>

                <button
                  onClick={handleAiFlashcards}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                >
                  {isGeneratingFlashcards ? 'Generating...' : '🤖 Create Flash Cards'}
                </button>
              </div>

              {/* AI Generated Content Results */}
              {selectedDocument.summaryAi && (
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs text-slate-200">
                  <p className="font-bold text-violet-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Executive Summary</span>
                  </p>
                  <p className="leading-relaxed">{selectedDocument.summaryAi}</p>
                </div>
              )}

              {selectedDocument.faqsAi && selectedDocument.faqsAi.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Extracted FAQs ({selectedDocument.faqsAi.length})</span>
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedDocument.faqsAi.map((faq, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="font-bold text-white">Q: {faq.question}</p>
                        <p className="text-slate-400">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Version History Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-400" />
                  <span>Version History ({selectedDocument.versions.length})</span>
                </h3>

                <button
                  onClick={() => setIsReplacingVersion(!isReplacingVersion)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replace Existing Version</span>
                </button>
              </div>

              {/* Replace Version Form */}
              {isReplacingVersion && (
                <form onSubmit={handleReplaceVersionSubmit} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-white">Publish New Version for {selectedDocument.name}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={replaceVersionNumber}
                      onChange={(e) => setReplaceVersionNumber(e.target.value)}
                      placeholder="e.g. v2.2"
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      required
                    />
                    <input
                      type="text"
                      value={replaceChangelog}
                      onChange={(e) => setReplaceChangelog(e.target.value)}
                      placeholder="Changelog: Updated code examples for .NET 8..."
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsReplacingVersion(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-blue-600 text-xs text-white font-bold"
                    >
                      Publish Version Update
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {selectedDocument.versions.map((ver, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-purple-400">{ver.version}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">By {ver.uploadedBy}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-500 font-mono">{ver.uploadedAt}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">{ver.changelog}</p>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px]">{ver.fileSize}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => alert(`Simulating download of ${selectedDocument.name}`)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 space-y-5 shadow-2xl animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-400" />
                <span>Upload New Resource to Repository</span>
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Document Name</label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="e.g. C# Memory Management Architecture.pdf"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Topic Library</label>
                  <select
                    value={newTopicId}
                    onChange={(e) => setNewTopicId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {topics.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">File Type</label>
                  <select
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">DOCX Word Document</option>
                    <option value="XLSX">XLSX Excel Spreadsheet</option>
                    <option value="PPTX">PPTX Presentation</option>
                    <option value="TXT">TXT Text File</option>
                    <option value="ZIP">ZIP Archive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Summary / Description</label>
                <textarea
                  rows={3}
                  value={newDocDescription}
                  onChange={(e) => setNewDocDescription(e.target.value)}
                  placeholder="Brief summary of document contents and key takeaways..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Version Number</label>
                  <input
                    type="text"
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Tags</label>
                  <input
                    type="text"
                    value={newTagsInput}
                    onChange={(e) => setNewTagsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Document (+5 Points)</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
