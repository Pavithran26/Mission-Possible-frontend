import React, { useState, useRef } from 'react';
import { SessionTrackerRecord, Session } from '../../types';
import { mockSessionTrackerRecords } from '../../data/mockData';
import { 
  Table, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Video, 
  FileText, 
  Calendar, 
  UserCheck, 
  BarChart3, 
  X, 
  Save, 
  Sparkles, 
  FileSpreadsheet,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface SessionTrackerProps {
  sessions?: Session[];
  records?: SessionTrackerRecord[];
  onSaveRecord?: (record: SessionTrackerRecord) => void;
  onDeleteRecord?: (id: string) => void;
}

export const SessionTracker: React.FC<SessionTrackerProps> = ({
  sessions = [],
  records: initialRecords,
  onSaveRecord,
  onDeleteRecord
}) => {
  // Initialize state with props or mock records merged with existing sessions
  const [trackerRecords, setTrackerRecords] = useState<SessionTrackerRecord[]>(() => {
    if (initialRecords && initialRecords.length > 0) return initialRecords;
    
    // Combine mock tracker records with any sessions not already present
    const base = [...mockSessionTrackerRecords];
    if (sessions && sessions.length > 0) {
      sessions.forEach(s => {
        if (!base.some(r => r.sessionName.toLowerCase() === s.name.toLowerCase())) {
          base.push({
            id: `track-${s.id}`,
            sessionCode: `SESS-${s.id.toUpperCase().slice(0, 6)}`,
            sessionName: s.name,
            category: s.category,
            trainerName: s.trainerName || 'Assigned Instructor',
            scheduleDate: '2026-08-15',
            scheduleTime: '10:00 AM - 01:00 PM',
            durationHours: s.durationHours || 10,
            status: s.progressPercent === 100 ? 'Completed' : s.progressPercent > 0 ? 'In Progress' : 'Scheduled',
            enrolledCount: 35,
            maxCapacity: 40,
            completionRatePercent: s.progressPercent || 0,
            notes: s.description || '',
            lastUpdated: '2026-08-03'
          });
        }
      });
    }
    return base;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [codeFilter, setCodeFilter] = useState<string>('ALL');
  const [nameFilter, setNameFilter] = useState<string>('ALL');
  const [trainerFilter, setTrainerFilter] = useState<string>('ALL');
  const [scheduleDateFilter, setScheduleDateFilter] = useState<string>('ALL');
  const [scheduleTimeFilter, setScheduleTimeFilter] = useState<string>('ALL');

  // Modal States
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Partial<SessionTrackerRecord> | null>(null);
  const [selectedRecordForNotes, setSelectedRecordForNotes] = useState<SessionTrackerRecord | null>(null);

  // Filter logic
  const filteredRecords = trackerRecords.filter(r => {
    const matchesCategory = categoryFilter === 'ALL' || r.category === categoryFilter;
    const matchesCode = codeFilter === 'ALL' || r.sessionCode === codeFilter;
    const matchesName = nameFilter === 'ALL' || r.sessionName === nameFilter;
    const matchesTrainer = trainerFilter === 'ALL' || r.trainerName === trainerFilter;
    const matchesDate = scheduleDateFilter === 'ALL' || r.scheduleDate === scheduleDateFilter;
    const matchesTime = scheduleTimeFilter === 'ALL' || r.scheduleTime === scheduleTimeFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !q ||
      r.sessionName.toLowerCase().includes(q) ||
      r.sessionCode.toLowerCase().includes(q) ||
      r.trainerName.toLowerCase().includes(q) ||
      (typeof r.category === 'string' && r.category.toLowerCase().includes(q)) ||
      (r.notes && r.notes.toLowerCase().includes(q));

    return matchesCategory && matchesCode && matchesName && matchesTrainer && matchesDate && matchesTime && matchesQuery;
  });

  // Unique lists for filter options
  const sessionCodes = Array.from(new Set(trackerRecords.map(r => r.sessionCode).filter(Boolean)));
  const sessionNames = Array.from(new Set(trackerRecords.map(r => r.sessionName).filter(Boolean)));
  const trainers = Array.from(new Set(trackerRecords.map(r => r.trainerName).filter(Boolean)));
  const scheduleDates = Array.from(new Set(trackerRecords.map(r => r.scheduleDate).filter(Boolean)));
  const scheduleTimes = Array.from(new Set(trackerRecords.map(r => r.scheduleTime).filter(Boolean)));
  const categories = Array.from(new Set(trackerRecords.map(r => r.category).filter(Boolean)));

  const handleResetFilters = () => {
    setCategoryFilter('ALL');
    setCodeFilter('ALL');
    setNameFilter('ALL');
    setTrainerFilter('ALL');
    setScheduleDateFilter('ALL');
    setScheduleTimeFilter('ALL');
    setSearchQuery('');
  };

  // Handlers
  const handleOpenAdd = () => {
    setEditingRecord({
      id: `track-${Date.now()}`,
      sessionCode: `SESS-GT-${Math.floor(100 + Math.random() * 900)}`,
      sessionName: '',
      category: '.NET with C#',
      trainerName: '',
      scheduleDate: new Date().toISOString().split('T')[0],
      scheduleTime: '09:00 AM - 12:00 PM',
      durationHours: 10,
      status: 'Scheduled',
      enrolledCount: 30,
      maxCapacity: 40,
      completionRatePercent: 0,
      materialsLink: '',
      recordingLink: '',
      notes: ''
    });
    setIsAddEditModalOpen(true);
  };

  const handleOpenEdit = (record: SessionTrackerRecord) => {
    setEditingRecord({ ...record });
    setIsAddEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this session tracking record?')) {
      setTrackerRecords(prev => prev.filter(r => r.id !== id));
      if (onDeleteRecord) onDeleteRecord(id);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord || !editingRecord.sessionName) return;

    const fullRecord: SessionTrackerRecord = {
      id: editingRecord.id || `track-${Date.now()}`,
      sessionCode: editingRecord.sessionCode || 'SESS-001',
      sessionName: editingRecord.sessionName,
      category: editingRecord.category || '.NET with C#',
      trainerName: editingRecord.trainerName || 'Unassigned',
      scheduleDate: editingRecord.scheduleDate || new Date().toISOString().split('T')[0],
      scheduleTime: editingRecord.scheduleTime || '09:00 AM - 12:00 PM',
      durationHours: Number(editingRecord.durationHours) || 0,
      status: (editingRecord.status as any) || 'Scheduled',
      enrolledCount: Number(editingRecord.enrolledCount) || 0,
      maxCapacity: Number(editingRecord.maxCapacity) || 40,
      completionRatePercent: Number(editingRecord.completionRatePercent) || 0,
      materialsLink: editingRecord.materialsLink || '',
      recordingLink: editingRecord.recordingLink || '',
      notes: editingRecord.notes || '',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setTrackerRecords(prev => {
      const exists = prev.some(r => r.id === fullRecord.id);
      if (exists) {
        return prev.map(r => r.id === fullRecord.id ? fullRecord : r);
      }
      return [fullRecord, ...prev];
    });

    if (onSaveRecord) onSaveRecord(fullRecord);
    setIsAddEditModalOpen(false);
    setEditingRecord(null);
  };

  // Excel Export (.xlsx / UTF-8 BOM)
  const handleExportExcel = () => {
    const headers = [
      'S.No.',
      'Session Code',
      'Session Name',
      'Category',
      'Trainer',
      'Schedule Date',
      'Schedule Time',
      'Duration (Hrs)',
      'Session Remarks'
    ];

    const rows = trackerRecords.map((r, index) => [
      index + 1,
      r.sessionCode,
      r.sessionName,
      r.category,
      r.trainerName,
      r.scheduleDate,
      r.scheduleTime,
      r.durationHours,
      r.notes || ''
    ]);

    const BOM = '\uFEFF';
    const csvContent = BOM + [headers.join('\t'), ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join('\t'))].join('\n');
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GT_Session_Tracker_${new Date().toISOString().split('T')[0]}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Top Bar with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Session Tracker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredRecords.length}</span> of {trackerRecords.length} total records
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Record</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all border border-emerald-600 flex items-center gap-2 shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Comprehensive Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Filter Session Tracker Records</span>
          </div>
          {(categoryFilter !== 'ALL' || codeFilter !== 'ALL' || nameFilter !== 'ALL' || trainerFilter !== 'ALL' || scheduleDateFilter !== 'ALL' || scheduleTimeFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Filters Grid - All Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Filter 1: Session Code */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Session Code</label>
            <select
              value={codeFilter}
              onChange={(e) => setCodeFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Session Codes</option>
              {sessionCodes.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          {/* Filter 2: Session Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Session Name</label>
            <select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Session Names</option>
              {sessionNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Trainer Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Trainer Name</label>
            <select
              value={trainerFilter}
              onChange={(e) => setTrainerFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Trainers</option>
              {trainers.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Filter 4: Schedule Date */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Schedule Date</label>
            <select
              value={scheduleDateFilter}
              onChange={(e) => setScheduleDateFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Schedule Dates</option>
              {scheduleDates.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Filter 5: Schedule Time */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Schedule Time</label>
            <select
              value={scheduleTimeFilter}
              onChange={(e) => setScheduleTimeFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Schedule Times</option>
              {scheduleTimes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Filter 6: Category */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="ALL">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filter 7: Global Search */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Global Keywords</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, links..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Table of Fields */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-4 px-4 font-bold text-center w-12">S.No.</th>
                <th className="py-4 px-4 font-bold">Session Code & Title</th>
                <th className="py-4 px-4 font-bold">Category</th>
                <th className="py-4 px-4 font-bold">Trainer / Instructor</th>
                <th className="py-4 px-4 font-bold">Schedule & Time</th>
                <th className="py-4 px-4 font-bold">Session Remarks</th>
                <th className="py-4 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-800 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Table className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="font-bold text-slate-800 dark:text-slate-200">No session tracking records found</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting filters or add a new session record above.</p>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record, index) => (
                  <tr 
                    key={record.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {/* S.No. Auto-Increment */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-500 dark:text-slate-400 text-[11px]">
                      {index + 1}
                    </td>

                    {/* Session Code & Title */}
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                          {record.sessionCode}
                        </span>
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {record.sessionName}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-[10px] font-bold">
                        {record.category}
                      </span>
                    </td>

                    {/* Trainer */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-900 dark:text-white">
                      {record.trainerName || 'Unassigned'}
                    </td>

                    {/* Schedule & Duration */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{record.scheduleDate}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {record.scheduleTime} ({record.durationHours} hrs)
                        </p>
                      </div>
                    </td>

                    {/* Session Remarks */}
                    <td className="py-3.5 px-4 min-w-[200px] max-w-[320px]">
                      <div className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                        {record.notes ? (
                          <span className="line-clamp-2">{record.notes}</span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">— No remarks —</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(record)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                          title="Edit Session Fields"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Record Modal Form */}
      {isAddEditModalOpen && editingRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 dark:text-white my-8 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold">
                  {editingRecord.id && trackerRecords.some(r => r.id === editingRecord.id) ? 'Edit Session Fields' : 'Upload New Session Details'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Session Code */}
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Session Code / ID *</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.sessionCode || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, sessionCode: e.target.value })}
                    placeholder="e.g. SESS-NET-01"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Category / Track */}
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Category / Learning Track *</label>
                  <select
                    value={editingRecord.category || '.NET with C#'}
                    onChange={(e) => setEditingRecord({ ...editingRecord, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value=".NET with C#">.NET with C#</option>
                    <option value="Insurance">Insurance</option>
                    <option value="SQL">SQL & Database Modelling</option>
                    <option value="Frontend">Frontend (React & Tailwind)</option>
                    <option value="Campus to Corporate">Campus to Corporate (C2C)</option>
                    <option value="Azure">Azure & Cloud</option>
                  </select>
                </div>

                {/* Session Name */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 font-bold mb-1">Session Name / Title *</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.sessionName || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, sessionName: e.target.value })}
                    placeholder="e.g. ASP.NET Core Web API & Clean Architecture"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                {/* Trainer Name */}
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Trainer / Instructor *</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.trainerName || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, trainerName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Schedule Date */}
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Schedule Date *</label>
                  <input
                    type="date"
                    required
                    value={editingRecord.scheduleDate || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, scheduleDate: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Schedule Time */}
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Schedule Time *</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.scheduleTime || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, scheduleTime: e.target.value })}
                    placeholder="e.g. 09:00 AM - 12:00 PM"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Duration Hours */}
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Hrs *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingRecord.durationHours || 10}
                    onChange={(e) => setEditingRecord({ ...editingRecord, durationHours: Number(e.target.value) })}
                    placeholder="e.g. 10"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Notes / Remarks */}
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 font-bold mb-1">Session Remarks / Additional Notes</label>
                  <textarea
                    rows={3}
                    value={editingRecord.notes || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, notes: e.target.value })}
                    placeholder="Enter any feedback, special prerequisites, or curriculum observations..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Record Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Remarks / Notes Detail Modal */}
      {selectedRecordForNotes && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-slate-900 dark:text-white animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm">Session Remarks & Notes</h3>
              </div>
              <button
                onClick={() => setSelectedRecordForNotes(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">{selectedRecordForNotes.sessionCode}</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{selectedRecordForNotes.sessionName}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {selectedRecordForNotes.notes}
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedRecordForNotes(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
