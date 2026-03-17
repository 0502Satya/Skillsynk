import React from "react";

export default function SidebarWidgets() {
  return (
    <div className="flex flex-col gap-8">
      {/* Learning Progress */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Learning Progress</h3>
        </div>
        <div className="flex flex-col gap-4">
          {/* Course 1 */}
          <div className="flex gap-3 items-start">
            <div className="h-10 w-10 rounded bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">code</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Advanced React Patterns</h4>
              <p className="text-xs text-slate-500 mb-2">Module 4 of 12</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
          </div>
          {/* Course 2 */}
          <div className="flex gap-3 items-start pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="h-10 w-10 rounded bg-purple-100 dark:bg-purple-900/30 flex-shrink-0 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">System Design Interview</h4>
              <p className="text-xs text-slate-500 mb-2">Module 8 of 10</p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          View All Courses
        </button>
      </div>

      {/* Upcoming Interview Promo */}
      <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 shadow-md text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
            <span className="material-symbols-outlined">video_call</span>
          </div>
          <h3 className="text-lg font-bold mb-1">Interview Prep</h3>
          <p className="text-blue-100 text-sm mb-4">Practice with our AI interviewer to boost your confidence.</p>
          <button className="w-full py-2 bg-white text-primary text-sm font-bold rounded-lg hover:bg-blue-50 transition-colors">
            Start Session
          </button>
        </div>
      </div>

      {/* Quick Links/Resume Services */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Resume Services</h3>
        <ul className="space-y-3">
          <li>
            <button className="flex items-center gap-3 group w-full text-left">
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">edit_document</span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">AI Resume Review</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 group w-full text-left">
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">palette</span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Cover Letter Generator</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 group w-full text-left">
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Share Profile</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
