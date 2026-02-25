/**
 * This section shows some names of famous companies that use SkillSync.
 * It's just to show that the platform is trusted by big names.
 */
export default function HiringCompanies() {
    const companies = [
        { name: "TechCorp" },
        { name: "GlobalFin" },
        { name: "EduStream" },
        { name: "HealthLine" },
    ];

    return (
        <section className="py-8 bg-white dark:bg-[#101622] border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* A simple horizontal list of company names */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <span className="text-lg font-bold text-slate-400">TOP HIRING COMPANIES:</span>
                    {companies.map((company) => (
                        <div key={company.name} className="flex items-center gap-2">
                            {/* Rounded circle placeholder for the logo */}
                            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            <span className="font-bold text-slate-600">{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
