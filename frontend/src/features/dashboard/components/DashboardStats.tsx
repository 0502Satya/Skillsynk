"use client";

import React, { useEffect, useState } from "react";
import { getDashboardStatsAction } from "@/features/auth/actions";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    applications: 0,
    profile_views: 0,
    interviews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await getDashboardStatsAction();
      if (!data.error) {
        setStats(data);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-surface rounded-xl animate-pulse border border-border"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Profile Views */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-start justify-between group hover:shadow-md transition-shadow">
        <div>
          <p className="text-muted text-sm font-medium mb-1 uppercase tracking-tight">Profile Views</p>
          <h3 className="text-3xl font-bold text-text">{stats.profile_views.toLocaleString()}</h3>
          <p className="text-green-600 text-xs font-semibold mt-2 flex items-center">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12% this week
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-primary">
          <span className="material-symbols-outlined">visibility</span>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-start justify-between group hover:shadow-md transition-shadow">
        <div>
          <p className="text-muted text-sm font-medium mb-1 uppercase tracking-tight">Applications</p>
          <h3 className="text-3xl font-bold text-text">{stats.applications}</h3>
          <p className="text-muted text-xs font-medium mt-2">3 pending review</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-purple-600 dark:text-purple-400">
          <span className="material-symbols-outlined">send</span>
        </div>
      </div>

      {/* Interviews */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex items-start justify-between group hover:shadow-md transition-shadow">
        <div>
          <p className="text-muted text-sm font-medium mb-1 uppercase tracking-tight">Interviews</p>
          <h3 className="text-3xl font-bold text-text">{stats.interviews}</h3>
          <p className="text-muted text-xs font-medium mt-2">Next: Tomorrow, 2:00 PM</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-orange-600 dark:text-orange-400">
          <span className="material-symbols-outlined">calendar_month</span>
        </div>
      </div>
    </div>
  );
}
