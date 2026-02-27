import MDConverter from "@/components/tools/MDConverter";

export const metadata = {
    title: "Markdown to PDF Converter | Faiz Ramadlan",
    description: "Free in-browser tool to convert Markdown to a clean, downloadable PDF."
};

export default function MDToPDFPage() {
    return (
        <main className="min-h-screen p-4 md:p-6 flex flex-col">
            <nav className="mb-6 flex justify-between items-center brutal-border p-4">
                <a href="/tools" className="font-press-start text-[10px] tracking-widest hover:line-through uppercase">
                    {'<'} BACK TO TOOLS
                </a>
                <div className="font-black text-xl uppercase tracking-tighter">
                    MD TO PDF CONVERTER
                </div>
            </nav>

            <MDConverter />
        </main>
    );
}
