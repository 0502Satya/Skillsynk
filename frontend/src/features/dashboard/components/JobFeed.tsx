import React from "react";

export default function JobFeed() {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechFlow Systems",
      location: "San Francisco, CA (Remote)",
      logo: "token",
      logoColor: "text-indigo-600",
      tags: ["React", "TypeScript"],
      salary: "$140k - $180k",
      posted: "2 days ago",
      match: "98% Match"
    },
    {
      id: 2,
      title: "Product Designer",
      company: "GreenLeaf Inc",
      location: "Austin, TX",
      logo: "deployed_code",
      logoColor: "text-emerald-600",
      tags: ["Figma", "UI/UX"],
      salary: "$110k - $150k",
      posted: "5 hours ago",
      match: "92% Match"
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "Volt Energy",
      location: "Seattle, WA (Hybrid)",
      logo: "bolt",
      logoColor: "text-orange-600",
      tags: ["Node.js", "AWS"],
      salary: "$130k - $160k",
      posted: "1 day ago",
      match: "88% Match"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_awesome</span> 
          Smart Job Feed
        </h3>
        <button className="text-primary text-sm font-bold hover:underline">View all</button>
      </div>

      {jobs.map((job) => (
        <div key={job.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-700">
                <span className={`material-symbols-outlined text-3xl ${job.logoColor}`}>{job.logo}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{job.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{job.company} • {job.location}</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">bookmark_add</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">{tag}</span>
            ))}
            <span className="px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">{job.salary}</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <span className="material-symbols-outlined text-sm">schedule</span> Posted {job.posted}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">{job.match}</span>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Apply Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
