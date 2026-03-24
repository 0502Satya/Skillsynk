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
        <section className="py-20 bg-bg transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title and 'View All' button */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                    <div className="min-w-0">
                        <h2 className="text-2xl sm:text-3xl font-black text-text mb-2 truncate">Recommended for You</h2>
                        <p className="text-muted text-sm sm:text-base">Jobs that match your profile and search history.</p>
                    </div>
                    <button className="text-primary font-bold hover:underline shrink-0 min-h-[44px] text-sm text-left">View All Jobs</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.title} className="bg-surface p-5 sm:p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group min-w-0">
                            <div className="flex justify-between items-start mb-4 gap-4">
                                {/* A circle with the company's short name (like TC) */}
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${job.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                                    }`}>
                                    {job.logo}
                                </div>
                                {/* A small green tag showing the match percentage */}
                                <span className="bg-green-100 text-green-700 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full uppercase shrink-0">
                                    {job.match} Match
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-text mb-1 group-hover:text-primary transition-colors truncate">
                                {job.title}
                            </h3>
                            <p className="text-muted text-sm mb-4 truncate">{job.company} • {job.location}</p>

                            {/* Extra details like Salary and Job Type */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold text-muted mb-6">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm shrink-0">payments</span> {job.salary}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm shrink-0">schedule</span> {job.type}
                                </span>
                            </div>

                            <button className="w-full py-3.5 bg-bg text-text font-bold rounded-xl hover:bg-btn-primary hover:text-surface transition-all min-h-[44px]">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
