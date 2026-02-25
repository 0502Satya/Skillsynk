/**
 * This section shows job recommendations specifically for the user.
 * It includes a 'match percentage' to show how well they fit the job.
 */
export default function RecommendedJobs() {
    const jobs = [
        {
            title: "Senior AI Engineer",
            company: "TechCorp",
            location: "San Francisco, CA",
            salary: "$140k - $180k",
            type: "Full-time",
            match: "98%",
            logo: "TC",
            color: "primary"
        },
        {
            title: "Product Designer",
            company: "GlobalFin",
            location: "Remote",
            salary: "$110k - $150k",
            type: "Full-time",
            match: "92%",
            logo: "GF",
            color: "accent"
        },
        {
            title: "Data Analyst",
            company: "EduStream",
            location: "New York, NY",
            salary: "$90k - $120k",
            type: "Hybrid",
            match: "85%",
            logo: "ES",
            color: "primary"
        }
    ];

    return (
        <section className="py-20 bg-background-light dark:bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title and 'View All' button */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Recommended for You</h2>
                        <p className="text-slate-600 dark:text-slate-400">Jobs that match your profile and search history.</p>
                    </div>
                    <button className="text-primary font-bold hover:underline">View All Jobs</button>
                </div>

                {/* Grid showing the list of jobs */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.title} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                {/* A circle with the company's short name (like TC) */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${job.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                                    }`}>
                                    {job.logo}
                                </div>
                                {/* A small green tag showing the match percentage */}
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                    {job.match} Match
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-slate-500 text-sm mb-4">{job.company} • {job.location}</p>

                            {/* Extra details like Salary and Job Type */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-6">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">payments</span> {job.salary}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span> {job.type}
                                </span>
                            </div>

                            <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
