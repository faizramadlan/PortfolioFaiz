export default function Education() {
    const schools = [
        {
            id: "00000100",
            name: "CAKRAWALA UNIVERSITY",
            degree: "Informatics System and Technology",
            period: "MAR 2025 – PRESENT",
            location: "Jakarta, Indonesia",
            current: true,
        },
        {
            id: "00000101",
            name: "HACKTIV8 INDONESIA",
            degree: "Fullstack Javascript Bootcamp",
            period: "JAN 2023 – MAY 2023",
            location: "Jakarta, Indonesia",
            current: false,
        },
    ];

    return (
        <div>
            <div className="font-press-start text-[10px] opacity-60 tracking-widest mb-6">LEARNING</div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">EDUCATION</h3>
            <div className="brutal-grid grid-cols-1">
                {schools.map((school) => (
                    <div key={school.id} className="brutal-border p-6">
                        <div className="font-press-start text-[10px] opacity-40 tracking-widest mb-3">{school.id}</div>
                        <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-1">{school.name}</h4>
                        <div className="text-sm opacity-80 mb-1">{school.degree}</div>
                        <div className="font-press-start text-[10px] opacity-40 tracking-wider mb-3">{school.period}</div>
                        <div className="flex flex-wrap gap-2">
                            <span className="brutal-tag">■ {school.location.toUpperCase()}</span>
                            {school.current && <span className="brutal-tag bg-[var(--foreground)] text-[var(--background)]">● ONGOING</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
