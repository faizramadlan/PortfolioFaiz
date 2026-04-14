import MDConverter from "@/components/tools/MDConverter";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
    title: "Markdown to PDF Converter | Faiz Ramadlan",
    description: "Free in-browser tool to convert Markdown to a clean, downloadable PDF."
};

export default function MDToPDFPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] flex flex-col transition-colors duration-200">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[var(--background)] brutal-border border-x-0 border-t-0 p-3 md:px-8 md:py-3 flex flex-wrap items-center gap-3 md:gap-6 justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <a href="/tools" className="font-press-start text-[10px] sm:text-xs hover:text-[var(--background)] hover:bg-[var(--foreground)] px-2 py-1 transition-colors uppercase tracking-widest shrink-0 brutal-border hover:translate-x-[-2px] hover:-translate-y-[-2px]">
                        {'<'} BACK
                    </a>
                    <div className="font-press-start text-xs sm:text-sm font-black tracking-widest uppercase shrink-0">
                        MD TO PDF
                    </div>
                </div>

                <div className="flex shrink-0 w-full md:w-auto justify-end gap-2 items-center">
                    <ThemeToggle />
                </div>
            </header>

            <div className="p-4 md:p-8 flex-1 flex flex-col">
                <MDConverter />
            </div>
        </main>
    );
}
