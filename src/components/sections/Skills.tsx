export default function Skills() {
    const categories = [
        { label: "LANGUAGES", items: ["JavaScript", "TypeScript", "SQL", "Python"] },
        { label: "FRONTEND", items: ["React.js", "Next.js", "Vue.js", "React Native", "Expo", "Redux", "Pinia", "TailwindCSS"] },
        { label: "BACKEND & DB", items: ["Node.js", "Express.js", "MySQL", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "RESTful APIs"] },
        { label: "DEVOPS & TOOLS", items: ["Docker", "Kubernetes", "Nginx", "GitHub", "Postman", "Figma", "Linux", "AWS", "Midtrans API"] },
    ];

    return (
        <div>
            <div className="font-press-start text-[10px] opacity-60 tracking-widest mb-6">TECH STACK</div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">SKILLS</h3>
            <div className="brutal-grid grid-cols-2">
                {categories.map((cat) => (
                    <div key={cat.label} className="brutal-border p-6">
                        <div className="font-press-start text-[10px] tracking-widest mb-4 opacity-60">{cat.label}</div>
                        <div className="flex flex-wrap gap-2">
                            {cat.items.map((item) => (
                                <span key={item} className="brutal-tag">■ {item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
