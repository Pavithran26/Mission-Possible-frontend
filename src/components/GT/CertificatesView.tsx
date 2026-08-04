import React from 'react';
import { mockCertificates } from '../../data/mockData';
import { Award, Download, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CertificatesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Track Certificates</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Earned Learning Certificates</h2>
          <p className="text-slate-400 text-xs mt-0.5">Verified certificates awarded upon completing track modules and passing quizzes</p>
        </div>
      </div>

      <div className="space-y-6">
        {mockCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Certificate Content */}
              <div className="space-y-4 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  Official Enterprise L&D Certificate
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  {cert.trackName}
                </h3>

                <p className="text-slate-300 text-sm">
                  This certifies that <strong className="text-white underline">{cert.studentName}</strong> has successfully completed the structured learning path, practical assignments, and assessment quizzes.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-400 pt-2">
                  <span>Issued Date: {cert.issuedDate}</span>
                  <span>•</span>
                  <span>Cert ID: {cert.certificateId}</span>
                </div>
              </div>

              {/* QR Code & Print Button */}
              <div className="flex flex-col items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <img src={cert.qrCodeUrl} alt="Certificate QR" className="w-24 h-24 rounded-lg bg-white p-1" />
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Download PDF
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
