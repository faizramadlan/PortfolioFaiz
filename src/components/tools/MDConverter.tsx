'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MDConverter() {
    const [markdown, setMarkdown] = useState(`Write or paste your markdown here...`);
    const [isGenerating, setIsGenerating] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!previewRef.current) return;
        setIsGenerating(true);

        try {
            // Import html2pdf dynamically to avoid SSR issues
            const html2pdf = (await import('html2pdf.js')).default;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const opt: any = {
                margin: [15, 15],
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(previewRef.current).save();
        } catch (error) {
            console.error("PDF generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] mx-auto min-h-[70vh]">
            {/* Editor Pane */}
            <div className="flex flex-col flex-1 brutal-border bg-[var(--card-bg)]">
                <div className="p-4 brutal-border border-x-0 border-t-0 bg-[var(--foreground)] text-[var(--background)] flex justify-between items-center">
                    <div className="font-press-start text-[10px] tracking-widest">MARKDOWN EDITOR</div>
                </div>
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    className="flex-1 w-full bg-transparent p-6 outline-none resize-none font-mono text-sm leading-relaxed"
                    placeholder="Paste your markdown here..."
                    spellCheck={false}
                />
            </div>

            {/* Preview Pane */}
            <div className="flex flex-col flex-1 brutal-border bg-[#ffffff] text-black">
                <div className="p-4 brutal-border border-x-0 border-t-0 flex justify-between items-center bg-[var(--background)]">
                    <div className="font-press-start text-[10px] tracking-widest">LIVE PREVIEW (A4)</div>
                    <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="brutal-shadow px-4 py-2 bg-[var(--foreground)] text-[var(--background)] hover:opacity-80 transition-opacity font-press-start text-[8px] tracking-wider disabled:opacity-50"
                    >
                        {isGenerating ? 'GENERATING...' : 'DOWNLOAD PDF'}
                    </button>
                </div>

                {/* Render container matching A4 proportions somewhat */}
                <div className="flex-1 p-8 overflow-y-auto bg-gray-100 flex justify-center">
                    <div
                        ref={previewRef}
                        className="bg-white w-full max-w-[210mm] min-h-[297mm] p-10 prose prose-sm md:prose-base prose-slate max-w-none shadow-lg"
                        style={{
                            fontFamily: "'Inter', sans-serif" // Clean font for PDF
                        }}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
