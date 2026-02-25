/**
 * This section lists the main benefits of using SkillSync.
 * Each benefit is shown inside a nice rounded card.
 */
export default function ValueProps() {
    const props = [
        {
            title: "AI-Powered Matching",
            description: "Smart systems connect you to jobs based on your skills and goals.",
            icon: "auto_awesome",
            color: "primary",
        },
        {
            title: "LMS Marketplace",
            description: "Find the best courses or teach your own training programs.",
            icon: "menu_book",
            color: "accent",
        },
        {
            title: "Recruiter Insights",
            description: "See clear charts and data about teams and planning.",
            icon: "monitoring",
            color: "primary",
        },
        {
            title: "Career Services",
            description: "Help with your resume and practice interviews with AI.",
            icon: "badge",
            color: "accent",
        },
    ];

    return (
        <section className="py-24 bg-white dark:bg-[#101622] transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* The main title of this section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">The SkillSync Advantage</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">Everything you need to grow your career in one place.</p>
                </div>

                {/* We loop through the list of benefits above to create cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {props.map((prop) => (
                        <div key={prop.title} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors group">
                            {/* The icon in the corner of the card */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${prop.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white'
                                }`}>
                                <span className="material-symbols-outlined">{prop.icon}</span>
                            </div>
                            {/* Title and details inside the card */}
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{prop.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{prop.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
