import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function ToolsLanding() {
    return (
        <main className="min-h-screen bg-[var(--background)] flex flex-col transition-colors duration-200">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[var(--background)] brutal-border border-x-0 border-t-0 p-3 md:px-8 md:py-3 flex flex-wrap items-center gap-3 md:gap-6 justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Link href="/" className="font-press-start text-[10px] sm:text-xs hover:text-[var(--background)] hover:bg-[var(--foreground)] px-2 py-1 transition-colors uppercase tracking-widest shrink-0 brutal-border hover:translate-x-[-2px] hover:-translate-y-[-2px]">
                        {'<'} HOME
                    </Link>
                    <div className="font-press-start text-xs sm:text-sm font-black tracking-widest uppercase shrink-0 text-[var(--foreground)]">
                        WEB TOOLS
                    </div>
                </div>

                <div className="flex shrink-0 w-full md:w-auto justify-end gap-2 items-center">
                    <ThemeToggle />
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="brutal-border max-w-3xl w-full flex flex-col bg-[var(--card-bg)] shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff]">
                    <div className="p-6 bg-[var(--foreground)] text-[var(--background)] font-press-start text-xs tracking-widest border-b-4 border-[var(--border-color)]">
                        UTILITY TOOLS
                    </div>
                    <div className="p-8 flex flex-col gap-6 text-[var(--foreground)]">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">SELECT A TOOL</h1>

                        <div className="brutal-grid grid-cols-1 md:grid-cols-2 mt-4">
                            <Link href="/tools/md-to-pdf" className="brutal-border p-6 hover:bg-[var(--foreground)] hover:text-[var(--background)] group transition-colors block bg-[var(--background)]">
                                <div className="font-press-start text-[10px] opacity-40 mb-3 group-hover:opacity-70">TOOL.01</div>
                                <h2 className="text-xl font-black uppercase tracking-tighter mb-2">MD to PDF Converter</h2>
                                <p className="text-sm opacity-80 group-hover:opacity-100">Instantly convert Markdown text into a clean, downloadable A4 PDF document.</p>
                            </Link>

                            <Link href="/tools/cheatsheet" className="brutal-border p-6 hover:bg-[var(--foreground)] hover:text-[var(--background)] group transition-colors block bg-[var(--background)]">
                                <div className="font-press-start text-[10px] opacity-40 mb-3 group-hover:opacity-70">TOOL.02</div>
                                <h2 className="text-xl font-black uppercase tracking-tighter mb-2">DEV.CARDS</h2>
                                <p className="text-sm opacity-80 group-hover:opacity-100">Interactive cheatsheet for JS, TS, React, Express, and Next.js.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
