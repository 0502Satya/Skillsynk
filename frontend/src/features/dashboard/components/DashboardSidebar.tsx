import React from "react";
import Link from "next/link";

interface DashboardSidebarProps {
  fullName?: string;
  role?: string;
  completeness?: number;
}

export default function DashboardSidebar({ 
  fullName = "Alex Morgan", 
  role = "Senior Software Engineer", 
  completeness = 75 
}: DashboardSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 pt-6 pb-6 px-4 gap-6 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
      {/* User Summary */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-800">
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 mb-3 border-4 border-slate-50 dark:border-slate-800 shadow-sm" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs17bU3rIouTgNjBdP1LAEfCfrJ0ef0Qqf2OTGBidiwrqva-MkyupB0L8WHDUi1_bZYQVIFUjeVAFsramQ1IKOo5-nZjq6MYBmXckvow52QcfIMTkvghXeOj1w6ddyX3ta7TsE7nsUwmqPQg5MmBOE6WXghZbTk6MfZrNPQBMzf3BiOk3JnwVIQOrgSSwEVjQD5i29Ytazs6pZZTqn86pwzzepqLpyT16MAlf6E6BKQEaEnmnjsSChfKoNBGy7RIzP-I_Nl-czFaY")' }}
        ></div>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{fullName}</h1>
        <p className="text-slate-500 dark:text-slate-300 text-sm font-normal">{role}</p>
        <div className="mt-4 w-full">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Profile Completeness</span>
            <span className="text-primary font-bold">{completeness}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${completeness}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-300 mt-2 text-left">Complete your profile to get 3x more views.</p>
        </div>
        
        {/* Actionable Prompt */}
        <div className="mt-4 w-full bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30 text-left">
          <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400 mb-1">
            <span className="material-symbols-outlined text-sm">lightbulb</span>
            <span className="text-xs font-bold uppercase tracking-wider">Quick Advice</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            🚀 Add <span className="font-bold">AWS</span> to increase matches by <span className="text-primary dark:text-blue-400">23%</span>
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary"
        >
          <span className="material-symbols-outlined filled">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined">work</span>
          <span className="text-sm font-medium">My Applications</span>
          <span className="ml-auto bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined">bookmark</span>
          <span className="text-sm font-medium">Saved Jobs</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined">school</span>
          <span className="text-sm font-medium">My Learning</span>
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined">description</span>
          <span className="text-sm font-medium">Resume Services</span>
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
