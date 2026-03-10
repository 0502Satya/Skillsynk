"use client";

import React from "react";

interface RoleOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const roles: RoleOption[] = [
  { id: "Candidate", name: "Candidate", description: "I'm looking for a job or career development.", icon: "person" },
  { id: "Recruiter", name: "Recruiter", description: "I'm sourcing top talent for my clients.", icon: "groups" },
  { id: "Company", name: "Company", description: "I'm hiring for my own organization.", icon: "business" },
];

/**
 * Re-implemented RoleSelector for restoration.
 * Allows users to choose their role during the signup process.
 */
export default function RoleSelector({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(role.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
            selected === role.id 
              ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
          }`}
        >
          <div className={`p-2 rounded-lg ${selected === role.id ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
            <span className="material-symbols-outlined">{role.icon}</span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{role.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{role.description}</p>
          </div>
          {selected === role.id && (
            <span className="material-symbols-outlined ml-auto text-primary">check_circle</span>
          )}
        </button>
      ))}
    </div>
  );
}
