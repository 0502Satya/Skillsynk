"use client";

import React from "react";

interface Certification {
  id: string;
  name: string;
  issuing_organization: string;
  issue_date: string;
  credential_url: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  onEdit: (cert?: Certification) => void;
  onAdd: () => void;
}

export default function CertificationsSection({ certifications, onEdit, onAdd }: CertificationsSectionProps) {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 mb-8 border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-stat-green/5 flex items-center justify-center text-stat-green">
            <span className="material-symbols-outlined text-2xl font-black">verified</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Certifications</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validate your expertise</p>
          </div>
        </div>
        <button 
          onClick={onAdd}
          className="px-6 py-2.5 bg-stat-green/10 text-stat-green text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-stat-green hover:text-white transition-all flex items-center gap-2 border border-stat-green/10"
        >
          <span className="material-symbols-outlined text-sm font-black">add</span>
          Add Certificate
        </button>
      </div>

      <div className="space-y-6">
        {certifications?.length > 0 ? (
          certifications.map((cert, i) => (
            <div key={i} className="group relative flex items-center justify-between bg-slate-50/50 rounded-[24px] p-6 border border-slate-100 hover:border-stat-green/20 hover:bg-white transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-stat-green/10">
                     <span className="material-symbols-outlined text-2xl text-slate-300 group-hover:text-stat-green transition-colors">workspace_premium</span>
                  </div>
                  <div>
                     <h4 className="text-lg font-black text-slate-900 group-hover:text-stat-green transition-colors">{cert.name}</h4>
                     <p className="text-sm font-bold text-slate-500">{cert.issuing_organization} • Issued {cert.issue_date}</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-3">
                  {cert.credential_url && (
                    <a 
                      href={cert.credential_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl hover:bg-stat-green hover:border-stat-green hover:text-white transition-all"
                    >
                      View
                    </a>
                  )}
                  <button 
                    onClick={() => onEdit(cert)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-primary transition-colors hover:border-primary shadow-slate-200"
                  >
                    <span className="material-symbols-outlined text-lg font-black">edit</span>
                  </button>
               </div>
            </div>
          ))
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center bg-slate-50/30 rounded-[32px] border border-dashed border-slate-200 group hover:bg-slate-50 transition-all">
             <div className="relative mb-6">
                <div className="w-24 h-24 bg-white rounded-[32px] shadow-2xl shadow-green-100 flex items-center justify-center text-stat-green relative z-10">
                   <span className="material-symbols-outlined text-5xl">reward</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-50"></div>
             </div>
             <h4 className="text-lg font-black text-slate-800 mb-2">Add Your First Certifications</h4>
             <button onClick={onAdd} className="text-xs font-black text-stat-green uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Add Your Now
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
