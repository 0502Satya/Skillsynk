"use client";

import React, { useEffect, useState } from "react";
import { getSavedJobsAction, unsaveJobAction, applyToJobAction } from "@/features/auth/actions";
import { toast } from "react-hot-toast";

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<string | null>(null);

  const loadData = async () => {
    const savedData = await getSavedJobsAction();
    if (savedData.error) toast.error("Failed to load saved jobs");
    else setJobs(savedData);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleUnsave = async (jobId: string) => {
    const res = await unsaveJobAction(jobId);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Removed from saved");
      setJobs(jobs.filter(j => j.id !== jobId));
    }
  };

  const handleApply = async (jobId: string) => {
    setApplying(jobId);
    const res = await applyToJobAction(jobId);
    if (res.error) toast.error(res.error);
    else toast.success("Application submitted successfully!");
    setApplying(null);
  };

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
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Saved Jobs</h1>
        <p className="text-slate-500 font-medium">Jobs you&apos;ve saved for later. Take your time to apply.</p>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group p-6 flex flex-col gap-4"
          >
            {/* Card Top */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex gap-3 items-center min-w-0">
                <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="material-symbols-outlined text-2xl text-primary">work</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors truncate">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium truncate">
                    {job.company_name} • {job.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleUnsave(job.id)}
                className="shrink-0 p-1.5 text-primary hover:bg-primary/8 rounded-lg transition-colors"
                title="Remove from saved"
              >
                <span className="material-symbols-outlined text-xl">bookmark</span>
              </button>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {new Date(job.posted_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">payments</span>
                {job.currency}{job.salary_min}–{job.salary_max}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
              <button className="flex-1 text-slate-600 text-xs font-bold px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors">
                View Details
              </button>
              <button
                onClick={() => handleApply(job.id)}
                disabled={applying === job.id}
                className="flex-1 bg-slate-900 text-white text-xs font-black px-3 py-2.5 rounded-xl hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {applying === job.id ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 py-24 text-center bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-5xl text-slate-200">bookmark_border</span>
              <p className="text-slate-400 font-medium">You haven&apos;t saved any jobs yet.</p>
              <a href="/dashboard" className="text-primary font-bold hover:underline text-sm">Discover Jobs →</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
