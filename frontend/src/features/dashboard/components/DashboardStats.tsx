import React from "react";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Profile Views</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">128</h3>
          <p className="text-green-600 text-xs font-medium mt-2 flex items-center">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12% this week
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-primary">
          <span className="material-symbols-outlined">visibility</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Applications</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">14</h3>
          <p className="text-slate-400 text-xs font-medium mt-2">3 pending review</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-purple-600 dark:text-purple-400">
          <span className="material-symbols-outlined">send</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Interviews</p>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">2</h3>
          <p className="text-slate-400 text-xs font-medium mt-2">Next: Tomorrow, 2:00 PM</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-orange-600 dark:text-orange-400">
          <span className="material-symbols-outlined">calendar_month</span>
        </div>
      </div>
    </div>
  );
}
