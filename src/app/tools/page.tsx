import Link from "next/link";

export default function ToolsLanding() {
    return (
        <main className="min-h-screen p-4 md:p-6 flex flex-col items-center justify-center">
            <div className="brutal-border max-w-3xl w-full flex flex-col">
                <div className="p-6 bg-[var(--foreground)] text-[var(--background)] font-press-start text-xs tracking-widest">
                    UTILITY TOOLS
                </div>
                <div className="p-8 flex flex-col gap-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">SELECT A TOOL</h1>

                    <div className="brutal-grid grid-cols-1 md:grid-cols-2 mt-4">
                        <Link href="/tools/md-to-pdf" className="brutal-border p-6 hover:bg-[var(--foreground)] hover:text-[var(--background)] group transition-colors block">
                            <div className="font-press-start text-[10px] opacity-40 mb-3 group-hover:opacity-70">TOOL.01</div>
                            <h2 className="text-xl font-black uppercase tracking-tighter mb-2">MD to PDF Converter</h2>
                            <p className="text-sm opacity-80 group-hover:opacity-100">Instantly convert Markdown text into a clean, downloadable A4 PDF document.</p>
                        </Link>

                        <div className="brutal-border p-6 opacity-50 cursor-not-allowed flex flex-col">
                            <div className="font-press-start text-[10px] opacity-40 mb-3">TOOL.02</div>
                            <h2 className="text-xl font-black uppercase tracking-tighter mb-2">COMING SOON</h2>
                            <p className="text-sm">More utilities in development.</p>
                        </div>
                    </div>

                    <Link href="/" className="self-start mt-4 font-press-start text-[10px] hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors tracking-widest uppercase">
                        {'<'} RETURN HOME
                    </Link>
                </div>
            </div>
        </main>
    );
}
