export default function Experience() {
    const jobs = [
        {
            id: "00000010",
            company: "INDONESIA GLOBAL SOLUSINDO",
            role: "Technical Consultant / Developer",
            period: "JUL 2023 – PRESENT",
            tags: ["CONSULTING", "FULL-STACK"],
            description: "IT consultancy providing custom software solutions.",
            bullets: [
                "Led requirement analysis and technical planning for 3+ enterprise-grade projects.",
                "Developed solutions to automate manual workflows and streamline operations.",
                "Supervised 2–4 developers per project, ensuring on-time delivery through agile coordination.",
                "Resolved critical production issues through hands-on debugging and root cause analysis.",
            ],
            current: true,
        },
        {
            id: "00000011",
            company: "FREELANCE DEVELOPER",
            role: "Web Developer",
            period: "SEP 2022 – JAN 2023",
            tags: ["FRONTEND", "FREELANCE"],
            description: "",
            bullets: [
                "Built responsive websites using HTML, CSS, and JavaScript based on client specifications.",
                "Refactored front-end codebases to enhance usability and ensure cross-browser compatibility.",
                "Turned client requirements into intuitive UI/UX designs and implemented them efficiently.",
                "Handled urgent website issues and restored functionality under time pressure.",
            ],
            current: false,
        },
    ];

    return (
        <div>
            <div className="font-press-start text-[10px] opacity-60 tracking-widest mb-6">CAREER</div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">EXPERIENCE</h3>
            <div className="brutal-grid grid-cols-1 md:grid-cols-2">
                {jobs.map((job) => (
                    <div key={job.id} className="brutal-border p-6 md:p-8 flex flex-col">
                        <div className="font-press-start text-[10px] opacity-40 tracking-widest mb-4">{job.id}</div>
                        <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">{job.company}</h4>
                        <div className="font-press-start text-[10px] opacity-60 tracking-wider mb-1">{job.role}</div>
                        <div className="font-press-start text-[10px] opacity-40 tracking-wider mb-4">{job.period}</div>
                        {job.description && <p className="text-sm opacity-60 italic mb-4">{job.description}</p>}
                        <ul className="text-sm space-y-2 mb-6 flex-grow">
                            {job.bullets.map((bullet, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="opacity-40 shrink-0">▹</span>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {job.tags.map((tag) => (
                                <span key={tag} className="brutal-tag">■ {tag}</span>
                            ))}
                            {job.current && <span className="brutal-tag bg-[var(--foreground)] text-[var(--background)]">● CURRENT</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
