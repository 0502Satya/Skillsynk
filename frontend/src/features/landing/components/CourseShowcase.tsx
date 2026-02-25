import { Button } from "@/shared/ui";

/**
 * This section shows some recommended courses.
 * It helps people learn the skills they need for high-paying jobs.
 */
export default function CourseShowcase() {
    const courses = [
        {
            title: "Full Stack AI Engineering",
            description: "Take these courses to qualify for the high-paying jobs listed above.",
            category: "Development",
            price: "$89.99",
            rating: "4.9",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn1IppxK8scBLpLpnfwSMPKJ6XLvaPr80cfcRe4qxR6hhhqurTRpIxnPR7G3E6xOgCPuH3BnmOeBLb3H7GvQJBd6sW8ofWZ4iA2SbxLTkbcr9A3eNxU6lI55QhrJNHrybbhhxjx-daD1xv6Xyy4ANIL9Lf-dHFyf6peO1YlLD13YdOBeAPN2hEsETCNOVjteHLmyTOadkZvZDFqlLCWw5-DsauC2RdT6BHR1oISdkl-QYTcU0sQRn-Z_pya4EhEqGM7bkOZQvzvFk",
            tag: "Bestseller"
        },
        {
            title: "Advanced Data Visualization",
            description: "Take these courses to qualify for the high-paying jobs listed above.",
            category: "Data Science",
            price: "$124.99",
            rating: "4.8",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhqtzheV8WS0o38J9gZDlGfXvolBLHaOPtmBS0O1ZcArK7wSxjbcN359XBFrNNHLK3ly4fOnLcarynKLP_0oeFRmWISJtGAw9qCHEMBZEfrL6vlzu8ZkIcrdFH5-tF8PF5yaT1wwvzWUdbHc4btq0x7EkhHmvSlQqCE11lKW6zZcb79lGXB5AljA96N8k9kTKoTTGu53sCcsh-v9ByzLkG1m3r472T8MXanxl9TNfYTjV9W8VHpcEaQ0lz4c8WO6wj9LvF8zE_wKU"
        },
        {
            title: "Agile Project Leadership",
            description: "Take these courses to qualify for the high-paying jobs listed above.",
            category: "Business",
            price: "$59.99",
            rating: "5.0",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmZ0w5FFnZdfLH25bvCOQKAdPQtdZJxEEQ4I0EHE6D35NfbkhrfGRkCMunlJIrj4k6ZH0TWPSDL-KAai9p-BK47fWrkS1BLGW8bb8r2MIhwnWDnzuoXzNOlIzVjKTW0j4gCKxdythaEWJJNQz2ejdIf1KL-fDQUcZrRkx4t04W-f_nxE4Y7ZwFyMlG_Pi-lW-v0BFV7Sni_Wa7NFjPU-fIlSPNOTbg20aa6LO8tfFTk_kxUx0hvzpQxFnVd7Zhzun0osUmVAj_VCg"
        }
    ];

    return (
        <section className="py-24 bg-background-light dark:bg-slate-900/40 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title and a link to see all courses */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Bridge Your Skill Gap</h2>
                        <p className="text-slate-600 dark:text-slate-400">Learn new skills to get better jobs.</p>
                    </div>
                    <a className="text-primary font-bold flex items-center gap-1 hover:underline" href="#">
                        Explore all courses
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                </div>

                {/* Grid showing the list of courses */}
                <div className="grid md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.title} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group">
                            {/* Image with a 'Bestseller' tag if needed */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    alt={course.title}
                                    src={course.image}
                                />
                                {course.tag && (
                                    <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                                        {course.tag}
                                    </div>
                                )}
                            </div>
                            {/* Details like Category, Rating, Title, and Price */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">{course.category}</span>
                                    <div className="flex items-center text-yellow-500">
                                        <span className="material-symbols-outlined text-sm">star</span>
                                        <span className="text-xs font-bold ml-1">{course.rating}</span>
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{course.title}</h4>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{course.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">{course.price}</span>
                                    <button className="text-primary font-bold text-sm hover:underline">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
