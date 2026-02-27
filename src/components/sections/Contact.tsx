export default function Contact() {
    const links = [
        { label: "EMAIL", value: "ramadlan.faiz@gmail.com", href: "mailto:ramadlan.faiz@gmail.com" },
        { label: "PHONE", value: "+62895380764728", href: "tel:+62895380764728" },
        { label: "LINKEDIN", value: "faiz-ramadlan", href: "https://www.linkedin.com/in/faiz-ramadlan/" },
        { label: "GITHUB", value: "faizramadlan", href: "https://github.com/faizramadlan" },
    ];

    return (
        <div>
            <div className="font-press-start text-[10px] opacity-60 tracking-widest mb-6">REACH OUT</div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8">CONTACT</h3>
            <div className="brutal-grid grid-cols-2">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-border p-3 sm:p-6 group flex flex-col hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                    >
                        <div className="font-press-start text-[10px] tracking-widest mb-3 opacity-40 group-hover:opacity-70">{link.label}</div>
                        <div className="text-[10px] sm:text-sm md:text-xl font-black uppercase tracking-tighter break-words">
                            {link.label === "EMAIL" ? (
                                <>RAMADLAN.FAIZ<wbr />@GMAIL.COM</>
                            ) : (
                                link.value
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
