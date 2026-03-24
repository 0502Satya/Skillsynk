"use client";

import React from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  project_url: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  onEdit: (project?: Project) => void;
  onAdd: () => void;
}

export default function ProjectsSection({ projects, onEdit, onAdd }: ProjectsSectionProps) {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 mb-8 border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <span className="material-symbols-outlined text-2xl font-black">rocket_launch</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Projects</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showcase your work</p>
          </div>
        </div>
        <button 
          onClick={onAdd}
          className="px-6 py-2.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 border border-indigo-100"
        >
          <span className="material-symbols-outlined text-sm font-black">add</span>
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects?.length > 0 ? (
          projects.map((project, i) => (
            <div key={i} className="group relative bg-slate-50/50 rounded-[24px] p-6 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all">
               <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">{project.title}</h4>
                  <button 
                    onClick={() => onEdit(project)}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 shadow-slate-200 border border-slate-100"
                  >
                    <span className="material-symbols-outlined text-lg font-black">edit</span>
                  </button>
               </div>
               <p className="text-sm font-bold text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
               </p>
               <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                     {project.tech_stack?.slice(0, 3).map((tech, ti) => (
                       <span key={ti} className="px-2 py-1 bg-white border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider rounded-lg">
                         {tech}
                       </span>
                     ))}
                  </div>
                  {project.project_url && (
                    <a 
                      href={project.project_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white shadow-slate-200"
                    >
                      <span className="material-symbols-outlined text-lg font-black">link</span>
                    </a>
                  )}
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50/30 rounded-[32px] border border-dashed border-slate-200 group hover:bg-slate-50 transition-all">
             <div className="relative mb-6">
                <div className="w-24 h-24 bg-white rounded-[32px] shadow-2xl shadow-indigo-100 flex items-center justify-center text-indigo-400 relative z-10">
                   <span className="material-symbols-outlined text-5xl">work_outline</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50"></div>
             </div>
             <h4 className="text-lg font-black text-slate-800 mb-2">Add Your First Projects</h4>
             <button onClick={onAdd} className="text-xs font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                Add Your Now
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
