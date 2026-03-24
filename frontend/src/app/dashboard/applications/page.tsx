"use client";

import React, { useEffect, useState } from "react";
import { getApplicationsAction } from "@/features/auth/actions";
import { toast } from "react-hot-toast";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const appData = await getApplicationsAction();
      if (appData.error) toast.error("Failed to load applications");
      else setApplications(appData);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">My Applications</h1>
        <p className="text-slate-500 font-medium">Track the status of your active job applications.</p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Job Role</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {app.job_title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{app.company_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide
                      ${app.status === 'APPLIED'    ? 'bg-blue-50 text-blue-600' :
                        app.status === 'INTERVIEW'  ? 'bg-purple-50 text-purple-600' :
                        app.status === 'OFFER'      ? 'bg-green-50 text-green-600' :
                        'bg-slate-100 text-slate-500'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:underline text-sm font-bold">View Details</button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-5xl text-slate-200">fact_check</span>
                      <p className="text-slate-400 font-medium">You haven&apos;t applied to any jobs yet.</p>
                      <a href="/dashboard" className="text-primary font-bold hover:underline text-sm">Browse Jobs →</a>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
