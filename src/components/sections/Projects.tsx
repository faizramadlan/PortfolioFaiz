export default function Projects() {
    const professional = [
        {
            id: "00000101",
            name: "SEMUABISA",
            description: "Subscription-based CMS platform for Indonesian SMEs offering curated templates and self-service dashboards.",
            period: "2026",
            tags: ["NEXT.JS", "SUPABASE", "TAILWINDCSS"],
            link: "https://semuabisajadi.online"
        },
        {
            id: "00000110",
            name: "IAMA DASHBOARD",
            description: "Built real-time monitoring dashboard for 50+ automation bots.",
            period: "2025",
            tags: ["NEXT.JS", "PRISMA", "TYPESCRIPT"],
        },
        {
            id: "00000111",
            name: "TAX MANAGEMENT SYSTEM",
            description: "Created a tax document management system serving 500+ users monthly.",
            period: "2024",
            tags: ["REACT", "NODE.JS", "POSTGRESQL"],
        },
        {
            id: "00001000",
            name: "ASSET MANAGEMENT PORTAL",
            description: "Developed a centralized platform managing 2000+ asset records.",
            period: "2024",
            tags: ["REACT", "NODE.JS", "POSTGRESQL"],
        },
        {
            id: "00001001",
            name: "PARTNER PORTAL",
            description: "Built a proposal submission portal and asset showcase website for 50+ partners.",
            period: "2023",
            tags: ["REACT", "NODE.JS", "POSTGRESQL"],
        },
    ];

    const personal = [
        {
            id: "00001010",
            name: "SHARE-A-RIDE",
            description: "Final bootcamp project: mobile app and CMS for long-distance ride-sharing.",
            period: "2023",
            tags: ["REACT NATIVE", "EXPO", "APOLLO", "MIDTRANS"],
        },
        {
            id: "00001011",
            name: "WATERSHIP MOBILE",
            description: "Developed brand showcase mobile app inspired by Fireship.io.",
            period: "2023",
            tags: ["REACT NATIVE", "GRAPHQL", "MONGODB", "AWS"],
        },
        {
            id: "00001100",
            name: "WATERSHIP WEB",
            description: "Created responsive web showcase app.",
            period: "2023",
            tags: ["REACTJS", "REDUX", "EXPRESS", "TAILWINDCSS"],
        },
        {
            id: "00001101",
            name: "OSLO DOTA 2 COMPANION",
            description: "Developed a learning companion app for new Dota 2 players.",
            period: "2023",
            tags: ["VITE", "VUE", "PINIA", "RESTFUL API"],
        },
    ];

    return (
        <div>
            <div className="font-press-start text-[10px] opacity-60 tracking-widest mb-6">PORTFOLIO</div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">PROJECTS</h3>

            {/* Professional */}
            <div className="font-press-start text-[10px] tracking-widest mb-4 opacity-60">PROFESSIONAL</div>
            <div className="brutal-grid grid-cols-1 md:grid-cols-2 mb-8">
                {professional.map((project) => (
                    <div key={project.id} className="brutal-border p-6 flex flex-col group cursor-default">
                        <div className="flex justify-between items-start mb-3">
                            <div className="font-press-start text-[10px] opacity-40 tracking-widest">{project.id}</div>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="text-[10px] font-press-start hover:line-through transition-all opacity-60 hover:opacity-100 flex items-center gap-1">
                                    VISIT <span className="text-[8px]">↗</span>
                                </a>
                            )}
                        </div>
                        <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-2 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] group-hover:px-2 transition-all self-start">{project.name}</h4>
                        <div className="font-press-start text-[10px] opacity-40 tracking-wider mb-3">{project.period}</div>
                        <p className="text-sm opacity-70 mb-4 flex-grow">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag) => (
                                <span key={tag} className="brutal-tag">■ {tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Personal */}
            <div className="font-press-start text-[10px] tracking-widest mb-4 opacity-60">PERSONAL</div>
            <div className="brutal-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {personal.map((project) => (
                    <div key={project.id} className="brutal-border p-6 flex flex-col group cursor-default">
                        <div className="flex justify-between items-start mb-3">
                            <div className="font-press-start text-[10px] opacity-40 tracking-widest">{project.id}</div>
                            {/* Personal projects can also have links if added to data later */}
                            {('link' in project) && (
                                <a href={(project as { link?: string }).link} target="_blank" rel="noreferrer" className="text-[10px] font-press-start hover:line-through transition-all opacity-60 hover:opacity-100 flex items-center gap-1">
                                    VISIT <span className="text-[8px]">↗</span>
                                </a>
                            )}
                        </div>
                        <h4 className="text-base md:text-lg font-black uppercase tracking-tighter mb-2 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] group-hover:px-2 transition-all self-start">{project.name}</h4>
                        <div className="font-press-start text-[10px] opacity-40 tracking-wider mb-3">{project.period}</div>
                        <p className="text-sm opacity-70 mb-4 flex-grow">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag) => (
                                <span key={tag} className="brutal-tag">■ {tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
