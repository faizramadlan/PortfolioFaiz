'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { CHEATSHEET_DATA } from './data';
import { QUIZ_DATA, QuizQuestion } from './quiz-data';

type ViewMode = 'cheatsheet' | 'quiz-setup' | 'quiz-active' | 'quiz-results';

export default function CheatsheetPage() {
    const [view, setView] = useState<ViewMode>('cheatsheet');

    // -- CHEATSHEET STATE --
    const [activeTab, setActiveTab] = useState('js');
    const [searchQuery, setSearchQuery] = useState('');
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

    // -- QUIZ STATE --
    const tabs = [
        { id: 'js', label: 'JAVASCRIPT' },
        { id: 'ts', label: 'TYPESCRIPT' },
        { id: 'react', label: 'REACT' },
        { id: 'express', label: 'EXPRESS' },
        { id: 'next', label: 'NEXT.JS' },
    ];

    const [quizTopics, setQuizTopics] = useState<Set<string>>(new Set(tabs.map(t => t.id)));
    const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
    const [quizElapsedTime, setQuizElapsedTime] = useState(0);

    // Secure Quiz State: Do not hold the correct answer index or original payload
    type ActiveQuizContent = {
        question: string;
        options: string[];
        title: string;
    };

    const [quizQuestions, setQuizQuestions] = useState<ActiveQuizContent[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [quizStartTime, setQuizStartTime] = useState<number>(0);
    const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareRatio, setShareRatio] = useState<'1:1' | '9:16' | '4:3'>('9:16');
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const scoreBoardRef = useRef<HTMLDivElement>(null);

    // Timer effect
    useEffect(() => {
        if (view === 'quiz-active') {
            const interval = setInterval(() => {
                setQuizElapsedTime(Math.floor((Date.now() - quizStartTime) / 1000));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [view, quizStartTime]);

    const toggleQuizTopic = (topic: string) => {
        setQuizTopics(prev => {
            const next = new Set(prev);
            if (next.has(topic)) next.delete(topic);
            else next.add(topic);
            return next;
        });
    };

    const startQuiz = () => {
        // 1. Gather pool from QUIZ_DATA based on chosen topics
        let pool: { question: string, options: string[], title: string }[] = [];

        quizTopics.forEach(topicId => {
            const tabQuestions = QUIZ_DATA[topicId] || [];
            const topicLabel = tabs.find(t => t.id === topicId)?.label || topicId;

            tabQuestions.forEach(q => {
                pool.push({
                    question: q.question,
                    options: [...q.options],
                    title: topicLabel
                });
            });
        });

        if (pool.length === 0) {
            alert("No questions found for the selected topics!");
            return;
        }

        // 2. Filter out already used questions
        let availablePool = pool.filter(q => !usedQuestions.has(q.question));

        if (availablePool.length === 0) {
            setUsedQuestions(new Set());
            availablePool = [...pool];
        }

        // 3. Shuffle cards
        for (let i = availablePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePool[i], availablePool[j]] = [availablePool[j], availablePool[i]];
        }

        // 4. Session constraint: 10 max questions per round
        const sessionPool = availablePool.slice(0, 10);

        const newUsed = new Set(usedQuestions);
        sessionPool.forEach(q => newUsed.add(q.question));
        setUsedQuestions(newUsed);

        // 5. Randomize answers positions securely
        const prepared = sessionPool.map(q => {
            const opts = [...q.options];
            for (let i = opts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [opts[i], opts[j]] = [opts[j], opts[i]];
            }
            return {
                question: q.question,
                options: opts,
                title: q.title
            };
        });

        setQuizQuestions(prepared);
        setCurrentQuestionIndex(0);
        setQuizScore(0);
        setQuizStartTime(Date.now());
        setQuizElapsedTime(0);
        setSelectedOpt(null);
        setShowExplanation(false);
        setView('quiz-active');
    };

    const handleQuizAnswer = (idx: number) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(idx);

        const activeQ = quizQuestions[currentQuestionIndex];
        const realTopicId = tabs.find(t => t.label === activeQ.title)?.id || 'js';
        const realTopicDB = QUIZ_DATA[realTopicId] || [];
        const absoluteOriginal = realTopicDB.find(q => q.question === activeQ.question);

        if (absoluteOriginal) {
            const selectedText = activeQ.options[idx];
            const correctText = absoluteOriginal.options[absoluteOriginal.correctIndex];
            if (selectedText === correctText) {
                setQuizScore(s => s + 1);
            }
        }
        setShowExplanation(true);
    };

    const nextQuizQuestion = () => {
        if (currentQuestionIndex + 1 >= quizQuestions.length) {
            setView('quiz-results');
        } else {
            setCurrentQuestionIndex(c => c + 1);
            setSelectedOpt(null);
            setShowExplanation(false);
        }
    };

    const getRoastCaption = () => {
        if (quizScore === quizQuestions.length) return "Flawless victory! You're a wizard! ⚡️";
        if (quizScore >= quizQuestions.length * 0.8) return "Almost perfect! Few bugs to squash. 🐛";
        if (quizScore >= quizQuestions.length * 0.5) return "Not bad, but room for improvement! 🚀";
        return "Time to hit the docs! 📚";
    };

    const getShareText = () => {
        const timeMm = Math.floor(quizElapsedTime / 60);
        const timeSs = (quizElapsedTime % 60).toString().padStart(2, '0');
        const roast = getRoastCaption();
        return `${roast}\nI just scored ${quizScore}/${quizQuestions.length} on the DEV.CARDS pop quiz in ${timeMm}:${timeSs}! ⚡️ Test your programming knowledge at DEV.CARDS. #WebDev #Javascript`;
    };

    const updatePreviewImage = async (ratio: '1:1' | '9:16' | '4:3') => {
        setIsGeneratingImage(true);
        try {
            await new Promise(r => setTimeout(r, 50));
            const canvas = document.createElement('canvas');

            let width = 1080;
            let height = 1080;
            if (ratio === '9:16') {
                width = 1080;
                height = 1920;
            } else if (ratio === '4:3') {
                width = 1080;
                height = 810;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('No 2D context available');

            const isDark = document.documentElement.classList.contains('dark');
            const bgCol = isDark ? '#111111' : '#f0f0f0';
            const cardBg = isDark ? '#1e1e2e' : '#ffffff';
            const borderCol = isDark ? '#ffffff' : '#000000';
            const textCol = isDark ? '#ffffff' : '#000000';
            const accentCol = '#eab308'; // Tailwind text-yellow-500

            ctx.fillStyle = bgCol;
            ctx.fillRect(0, 0, width, height);

            ctx.globalAlpha = 0.03;
            ctx.fillStyle = textCol;
            ctx.font = 'bold 30px "Courier New", monospace';
            for (let i = 0; i < 15; i++) {
                for (let j = 0; j < 25; j++) {
                    ctx.fillText('DEV.CARDS', i * 200 - 100, j * 100);
                }
            }
            ctx.globalAlpha = 1.0;

            const cardWidth = 800;
            const cardHeight = ratio === '4:3' ? 600 : 800;
            const offsetX = (width - cardWidth) / 2;
            const offsetY = (height - cardHeight) / 2;

            ctx.fillStyle = borderCol;
            ctx.fillRect(offsetX + 20, offsetY + 20, cardWidth, cardHeight);

            ctx.fillStyle = cardBg;
            ctx.fillRect(offsetX, offsetY, cardWidth, cardHeight);

            ctx.lineWidth = 16;
            ctx.strokeStyle = borderCol;
            ctx.strokeRect(offsetX, offsetY, cardWidth, cardHeight);

            ctx.fillStyle = accentCol;
            ctx.font = 'bold 60px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('POP QUIZ RESULTS', width / 2, offsetY + (ratio === '4:3' ? 120 : 160));

            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.setLineDash([20, 20]);
            ctx.moveTo(offsetX + 60, offsetY + (ratio === '4:3' ? 180 : 260));
            ctx.lineTo(offsetX + cardWidth - 60, offsetY + (ratio === '4:3' ? 180 : 260));
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = textCol;
            ctx.globalAlpha = 0.6;
            ctx.font = 'bold 36px "Courier New", monospace';
            ctx.fillText('FINAL SCORE', width / 2, offsetY + (ratio === '4:3' ? 260 : 360));

            ctx.globalAlpha = 1.0;
            const scoreRatio = quizScore / quizQuestions.length;
            ctx.fillStyle = scoreRatio === 1 ? accentCol : scoreRatio >= 0.5 ? '#22c55e' : '#ef4444';
            ctx.font = 'bold 160px "Courier New", monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`${quizScore}`, (width / 2) + 30, offsetY + (ratio === '4:3' ? 400 : 540));

            ctx.fillStyle = textCol;
            ctx.globalAlpha = 0.5;
            ctx.font = 'bold 80px "Courier New", monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`/${quizQuestions.length}`, (width / 2) + 30, offsetY + (ratio === '4:3' ? 400 : 540));

            ctx.fillStyle = textCol;
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.6;
            ctx.font = 'bold 36px "Courier New", monospace';
            const timeMm = Math.floor(quizElapsedTime / 60);
            const timeSs = (quizElapsedTime % 60).toString().padStart(2, '0');
            ctx.fillText(`TIME: ${timeMm}:${timeSs}`, width / 2, offsetY + (ratio === '4:3' ? 480 : 660));

            ctx.beginPath();
            ctx.setLineDash([20, 20]);
            ctx.moveTo(offsetX + 60, offsetY + (ratio === '4:3' ? 540 : 740));
            ctx.lineTo(offsetX + cardWidth - 60, offsetY + (ratio === '4:3' ? 540 : 740));
            ctx.stroke();
            ctx.setLineDash([]);

            const caption = getRoastCaption();
            ctx.globalAlpha = 1.0;
            ctx.font = 'bold 30px "Courier New", monospace';
            ctx.fillText(caption, width / 2, offsetY + (ratio === '4:3' ? 640 : 860));

            ctx.globalAlpha = 0.5;
            ctx.font = 'bold 24px "Courier New", monospace';
            ctx.fillText('DEV.CARDS', width / 2, height - (ratio === '9:16' ? 120 : 60));

            setPreviewImageUrl(canvas.toDataURL('image/png'));
        } catch (e) {
            console.error('Preview error', e);
        }
        setIsGeneratingImage(false);
    };

    useEffect(() => {
        if (showShareModal) {
            updatePreviewImage(shareRatio);
        }
    }, [showShareModal, shareRatio, quizScore, quizQuestions.length, quizElapsedTime]);

    const executeShare = async (platform: 'X' | 'WA' | 'IG' | 'DOWNLOAD') => {
        if (!previewImageUrl) return;

        try {
            const blob = await (await fetch(previewImageUrl)).blob();
            const file = new File([blob], 'devcards-score.png', { type: 'image/png' });

            const text = getShareText();
            const shareUrlText = encodeURIComponent(text + '\n\n' + window.location.href);

            if (platform === 'DOWNLOAD') {
                const a = document.createElement('a');
                a.href = previewImageUrl;
                a.download = 'devcards-score.png';
                a.click();
                navigator.clipboard.writeText(text + '\n\n' + window.location.href);
                alert('Image downloaded and details copied to clipboard!');
                return;
            }

            const shareData = {
                title: 'DEV.CARDS Quiz Result',
                text: text,
                files: [file]
            };

            // Try native share first (Mobile / OS level share sheet)
            if (navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                    return;
                } catch (err) {
                    console.log('Mobile share fallback...', err);
                }
            }

            // Desktop Fallbacks
            if (platform === 'IG') {
                // Instagram Story has no web intent. Copy image to clipboard won't directly help opening IG on desktop, usually just download.
                const a = document.createElement('a');
                a.href = previewImageUrl;
                a.download = 'devcards-score.png';
                a.click();
                alert(`Image saved! Open Instagram to share to your Story.`);
                return;
            }

            // For X and WhatsApp, we copy to clipboard and open intent
            try {
                // Modern Clipboard API for images
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]);
                alert(`Image copied to your clipboard! Just paste (Ctrl+V / Cmd+V) it into your ${platform} post.`);
            } catch (e) {
                console.log('Clipboard write failed, downloading as fallback', e);
                const a = document.createElement('a');
                a.href = previewImageUrl;
                a.download = 'devcards-score.png';
                a.click();
                alert(`Image downloaded! Attach it manually to your ${platform} post.`);
            }

            if (platform === 'X') window.open(`https://twitter.com/intent/tweet?text=${shareUrlText}`, '_blank');
            if (platform === 'WA') window.open(`https://api.whatsapp.com/send?text=${shareUrlText}`, '_blank');

        } catch (err) {
            console.error('Error generating image', err);
            alert('Could not share the image. Please try again!');
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(getShareText() + '\n\n' + window.location.href);
        alert('Result and link copied to clipboard!');
    };

    const renderQuestion = (text: string) => {
        const parts = text.split(/```(\w+)?\n([\s\S]*?)```/);
        if (parts.length === 1) return <span className="whitespace-pre-wrap">{text}</span>;

        const elements = [];
        for (let i = 0; i < parts.length; i += 3) {
            if (parts[i]) {
                elements.push(<span key={i} className="whitespace-pre-wrap">{parts[i]}</span>);
            }
            if (i + 2 < parts.length) {
                elements.push(
                    <pre key={`code-${i}`} className="bg-black text-white dark:bg-[#111] dark:text-gray-100 p-4 text-[10px] sm:text-[11px] overflow-x-auto brutal-border mt-3 mb-2 select-text pointer-events-auto border-2 border-gray-600 dark:border-gray-500 shadow-[4px_4px_0px_#555] dark:shadow-[4px_4px_0px_#888]">
                        <code>{parts[i + 2]}</code>
                    </pre>
                );
            }
        }
        return <div className="flex flex-col">{elements}</div>;
    };

    const toggleFlip = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setFlippedCards(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filteredCards = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return CHEATSHEET_DATA.filter(card => {
            if (card.tab !== activeTab) return false;
            if (!q) return true;

            const kw = card.keywords.toLowerCase();
            const txt = (card.title + ' ' + card.explanationsHtml).toLowerCase();
            return kw.includes(q) || txt.includes(q);
        });
    }, [activeTab, searchQuery]);

    return (
        <main className="min-h-screen overflow-x-hidden w-full bg-[var(--background)] flex flex-col font-mono text-[13px] leading-relaxed transition-colors duration-200">
            <style dangerouslySetInnerHTML={{
                __html: `
        .cs-pane { animation: fu 0.18s ease; }
        @keyframes fu { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        
        .cs-card-inner { transform-style: preserve-3d; transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1); }
        .cs-card-flipped .cs-card-inner { transform: rotateY(180deg); }
        .cs-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .cs-back { transform: rotateY(180deg); }
        
        pre { font-family: inherit; font-size: 0.68rem; line-height: 1.72; overflow-x: auto; white-space: pre; }
        
        .kw { color: #c792ea; } .str { color: #c3e88d; } .fn { color: #82aaff; } 
        .xm { color: #6a737d; } .nm { color: #f78c6c; } .tg { color: #f07178; } 
        .op { color: #89ddff; } .tp { color: #ffcb6b; }
        
        html.dark .xm { color: #8b92a5; } 
        
        html:not(.dark) .kw { color: #8937b4; } 
        html:not(.dark) .str { color: #3b7b0a; } 
        html:not(.dark) .fn { color: #0d5dd6; } 
        html:not(.dark) .xm { color: #5c6370; } 
        html:not(.dark) .nm { color: #c23812; } 
        html:not(.dark) .tg { color: #b71321; } 
        html:not(.dark) .op { color: #0078a8; } 
        html:not(.dark) .tp { color: #a47500; }
        
        .es { margin-bottom: 0.95rem; }
        .el { font-size: 0.54rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--foreground); margin-bottom: 0.32rem; display: flex; align-items: center; gap: 0.4rem; padding-bottom: 0.2rem; border-bottom: 1px solid var(--border-color); }
        .et { font-size: 0.7rem; line-height: 1.84; color: var(--foreground); opacity: 0.85; }
        .et strong, .et b { color: var(--foreground); opacity: 1; font-weight: 600; }
        .et code { background: var(--background); border: 1px solid var(--border-color); padding: 0.03em 0.3em; font-family: inherit; font-size: 0.64rem; font-weight: bold; }
        .gotcha { border-left: 2px solid #ff6b6b; background: rgba(255,107,107,.1); padding: 0.36rem 0.58rem; margin: 0.42rem 0; font-size: 0.67rem; color: var(--foreground); }
        html.dark .gotcha { color: #ff9090; }
        .gotcha strong { color: #ff6b6b; }
        
        .tip { border-left: 2px solid #e8d44d; background: rgba(232,212,77,.1); padding: 0.36rem 0.58rem; margin: 0.42rem 0; font-size: 0.67rem; color: var(--foreground); }
        html.dark .tip { color: #bfb460; }
        .tip strong { color: #b29f12; }
        html.dark .tip strong { color: #e8d44d; }
        
        .analogy { border-left: 2px solid #3b82f6; background: rgba(59,130,246,.1); padding: 0.36rem 0.58rem; margin: 0.42rem 0; font-size: 0.67rem; color: var(--foreground); }
        html.dark .analogy { color: #79b8c8; border-color: #61dafb; }
        .analogy strong { color: #2563eb; }
        html.dark .analogy strong { color: #61dafb; }
        
        .et ul { padding-left: 0.85rem; margin: 0.32rem 0; }
        .et li { margin-bottom: 0.16rem; }
        .et li::marker { content: '▸  '; font-weight: bold;}
        .et ol { padding-left: 0.9rem; margin: 0.32rem 0; }
      `}} />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[var(--background)] brutal-border border-x-0 border-t-0 p-3 md:px-8 md:py-3 flex flex-wrap items-center gap-3 md:gap-6 justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Link href="/tools" className="font-press-start text-[10px] sm:text-xs hover:text-[var(--background)] hover:bg-[var(--foreground)] px-2 py-1 transition-colors uppercase tracking-widest shrink-0 brutal-border hover:translate-x-[-2px] hover:-translate-y-[-2px]">
                        {'<'} BACK
                    </Link>
                    <div className="font-press-start text-xs sm:text-sm font-black tracking-widest uppercase shrink-0">
                        DEV.CARDS
                    </div>
                </div>

                {view === 'cheatsheet' && (
                    <div className="flex items-center gap-3 w-full md:w-auto flex-1 md:max-w-md relative order-last md:order-none mt-2 md:mt-0">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 font-bold opacity-80 pointer-events-none">▸</div>
                        <input
                            type="text"
                            placeholder="SEARCH CARDS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--card-bg)] brutal-border text-[var(--foreground)] font-mono text-[11px] p-2 pl-8 outline-none focus:bg-[var(--background)] transition-colors tracking-wider"
                            aria-label="Search cheatsheets"
                        />
                    </div>
                )}

                <div className="flex shrink-0 w-full md:w-auto justify-end gap-2 items-center">
                    <button
                        onClick={() => {
                            setView(view === 'cheatsheet' ? 'quiz-setup' : 'cheatsheet');
                        }}
                        className={`brutal-border px-3 py-1.5 font-mono text-[10px] tracking-widest font-bold uppercase transition-transform hover:-translate-y-0.5 h-9 ${view !== 'cheatsheet' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'hover:bg-[var(--card-bg)]'}`}
                    >
                        {view !== 'cheatsheet' ? 'Exit Quiz' : '🎮 QUIZ MODE'}
                    </button>
                    <ThemeToggle />
                </div>
            </header>

            {/* QUIZ WORKFLOW */}
            {view === 'quiz-setup' && (
                <div className="flex flex-col items-center justify-center flex-1 p-6 cs-pane">
                    <div className="max-w-lg w-full brutal-border bg-[var(--card-bg)] p-6 md:p-8 flex flex-col items-center gap-6">
                        <h2 className="font-press-start text-lg uppercase tracking-wider text-center">QUIZ CONFIG</h2>
                        <p className="opacity-80 text-center">Test your knowledge! Select the topics you want to be quizzed on. You will get 10 random questions.</p>

                        <div className="flex flex-wrap gap-3 justify-center">
                            {tabs.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => toggleQuizTopic(t.id)}
                                    className={`brutal-border px-4 py-2 text-xs font-bold uppercase transition-colors ${quizTopics.has(t.id) ? 'bg-blue-600 border-blue-600 text-white' : 'opacity-60 grayscale hover:opacity-100'}`}
                                >
                                    {quizTopics.has(t.id) ? '☑' : '☐'} {t.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setQuizTopics(new Set(tabs.map(t => t.id)))}
                            className="text-[10px] underline opacity-60 hover:opacity-100"
                        >
                            Select All
                        </button>

                        <button
                            onClick={startQuiz}
                            disabled={quizTopics.size === 0}
                            className="mt-4 brutal-border bg-[var(--foreground)] text-[var(--background)] px-8 py-4 font-press-start text-[12px] uppercase hover:bg-green-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            START QUIZ
                        </button>
                    </div>
                </div>
            )}

            {view === 'quiz-active' && (
                <div className="flex flex-col items-center flex-1 p-6 cs-pane">
                    <div className="w-full max-w-2xl flex justify-between items-end mb-4 font-press-start text-[10px] sm:text-xs">
                        <div>
                            QUESTION {currentQuestionIndex + 1}/{quizQuestions.length}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="opacity-60">TIME</span>
                            <span className="text-yellow-500 font-bold">
                                {Math.floor(quizElapsedTime / 60)}:{(quizElapsedTime % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-2xl w-full brutal-border bg-[var(--card-bg)] p-6 md:p-8 flex flex-col gap-6 rtl shadow-[8px_8px_0px_#000]">
                        <div className="border-b-4 border-[var(--border-color)] pb-4">
                            <div className="font-bold text-[10px] opacity-50 uppercase tracking-widest mb-2">TOPIC: {quizQuestions[currentQuestionIndex].title}</div>
                            <div className="text-lg md:text-xl font-bold leading-tight">{renderQuestion(quizQuestions[currentQuestionIndex].question)}</div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {quizQuestions[currentQuestionIndex].options.map((opt, i) => {
                                const isSelected = selectedOpt === i;

                                const activeQ = quizQuestions[currentQuestionIndex];
                                const realTopicId = tabs.find(t => t.label === activeQ.title)?.id || 'js';
                                const realTopicDB = QUIZ_DATA[realTopicId] || [];
                                const absoluteOriginal = realTopicDB.find(q => q.question === activeQ.question);
                                const correctText = absoluteOriginal?.options[absoluteOriginal.correctIndex];
                                const isCorrect = opt === correctText;

                                let btnClass = "brutal-border p-4 text-left transition-all relative hover:translate-x-1 hover:bg-[var(--background)]";

                                if (showExplanation) {
                                    if (isCorrect) {
                                        btnClass = "brutal-border p-4 text-left bg-green-500 text-white font-bold translate-x-1";
                                    } else if (isSelected && !isCorrect) {
                                        btnClass = "brutal-border p-4 text-left bg-red-500 text-white line-through opacity-70";
                                    } else {
                                        btnClass = "brutal-border p-4 text-left opacity-40";
                                    }
                                } else if (isSelected) {
                                    btnClass = "brutal-border p-4 text-left bg-[var(--foreground)] text-[var(--background)] font-bold";
                                }

                                return (
                                    <button
                                        key={i}
                                        disabled={showExplanation}
                                        onClick={() => handleQuizAnswer(i)}
                                        className={btnClass}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {showExplanation && (() => {
                            const activeQ = quizQuestions[currentQuestionIndex];
                            const realTopicId = tabs.find(t => t.label === activeQ.title)?.id || 'js';
                            const realTopicDB = QUIZ_DATA[realTopicId] || [];
                            const absoluteOriginal = realTopicDB.find(q => q.question === activeQ.question);
                            const correctText = absoluteOriginal?.options[absoluteOriginal.correctIndex];
                            const isAbsolutelyCorrect = selectedOpt !== null && activeQ.options[selectedOpt] === correctText;

                            return (
                                <div className="mt-4 flex justify-between items-center bg-[var(--background)] brutal-border p-4 cs-pane">
                                    <div className="font-bold uppercase tracking-widest">
                                        {isAbsolutelyCorrect ? '🎉 CORRECT!' : '❌ INCORRECT'}
                                    </div>
                                    <button
                                        onClick={nextQuizQuestion}
                                        className="bg-[var(--foreground)] text-[var(--background)] font-press-start text-[10px] px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors"
                                    >
                                        NEXT {'>>>'}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {view === 'quiz-results' && (
                <div className="flex flex-col items-center justify-center flex-1 p-6 cs-pane">
                    <div ref={scoreBoardRef} className="max-w-lg w-full brutal-border bg-[var(--card-bg)] p-8 flex flex-col items-center gap-6 shadow-[8px_8px_0px_#000]">
                        <h1 className="font-press-start text-2xl uppercase tracking-wider text-center text-yellow-500 gap-2">
                            QUIZ COMPLETE
                        </h1>

                        <div className="flex flex-col items-center gap-2 w-full border-y-[4px] border-dashed border-[var(--border-color)] py-6">
                            <div className="text-sm font-bold opacity-60 uppercase tracking-widest">FINAL SCORE</div>
                            <div className="font-press-start text-4xl">
                                {quizScore}<span className="text-xl opacity-50">/{quizQuestions.length}</span>
                            </div>
                            <div className="mt-2 text-sm font-bold opacity-60 uppercase tracking-widest">TIME: {Math.floor(quizElapsedTime / 60)}:{(quizElapsedTime % 60).toString().padStart(2, '0')}</div>
                        </div>

                        <p className="text-center font-bold">
                            {quizScore === quizQuestions.length ? "Flawless victory! You're a wizard! ⚡️" :
                                quizScore >= quizQuestions.length / 2 ? "Well done! Keep practicing! 🚀" :
                                    "Time to hit the docs! 📚"}
                        </p>

                        {!isGeneratingImage && (
                            <div className="flex flex-col gap-4 w-full mt-4">
                                <button
                                    onClick={() => setView('quiz-setup')}
                                    className="w-full brutal-border bg-[var(--foreground)] text-[var(--background)] py-4 font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                                >
                                    ↻ PLAY AGAIN
                                </button>

                                <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest text-center mt-2 mb-1">
                                    BRAG ABOUT IT
                                </div>

                                <button
                                    onClick={() => setShowShareModal(true)}
                                    className="w-full brutal-border bg-blue-600 text-white py-4 font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform"
                                >
                                    SHARE / SAVE RESULTS
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SHARE MODAL OVERLAY */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-[var(--card-bg)] brutal-border p-6 md:p-8 max-w-xl w-full flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar shadow-[12px_12px_0px_#000]">
                        <div className="flex justify-between items-center mb-6 border-b-4 border-[var(--border-color)] pb-4">
                            <h2 className="font-press-start text-xs sm:text-sm uppercase tracking-widest">Share Results</h2>
                            <button onClick={() => setShowShareModal(false)} className="opacity-50 hover:opacity-100 font-bold uppercase text-xs brutal-border px-2 py-1 bg-[var(--background)]">X CLOSE</button>
                        </div>

                        <div className="flex justify-center gap-2 mb-4">
                            {(['1:1', '4:3', '9:16'] as const).map(ratio => (
                                <button
                                    key={ratio}
                                    onClick={() => setShareRatio(ratio)}
                                    className={`brutal-border px-3 py-1.5 text-[10px] font-bold uppercase transition-colors ${shareRatio === ratio ? 'bg-[var(--foreground)] text-[var(--background)]' : 'opacity-60 grayscale hover:opacity-100'}`}
                                >
                                    {ratio === '9:16' ? '📱 IG STORY (9:16)' : ratio === '1:1' ? '🖼 SQUARE (1:1)' : '💻 LANDSCAPE (4:3)'}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full bg-[var(--background)] brutal-border p-4 mb-6 flex justify-center items-center min-h-[300px]">
                            {isGeneratingImage || !previewImageUrl ? (
                                <div className="text-xs font-press-start animate-pulse uppercase tracking-widest">Generating Graphics...</div>
                            ) : (
                                <img
                                    src={previewImageUrl}
                                    alt="Quiz Score"
                                    className="max-h-[40vh] w-auto object-contain brutal-border shadow-[4px_4px_0px_#000]"
                                />
                            )}
                        </div>

                        <div className="text-xs font-bold opacity-60 uppercase tracking-widest mb-3 text-center">Post to Socials</div>

                        <div className="brutal-grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                            <button
                                onClick={() => executeShare('IG')}
                                disabled={isGeneratingImage}
                                className="brutal-border bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white py-3 font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform text-[10px] sm:text-[11px] disabled:opacity-50"
                            >
                                IG Story
                            </button>
                            <button
                                onClick={() => executeShare('X')}
                                disabled={isGeneratingImage}
                                className="brutal-border bg-black text-white dark:bg-white dark:text-black py-3 font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform text-[10px] sm:text-[11px] disabled:opacity-50"
                            >
                                X (Twitter)
                            </button>
                            <button
                                onClick={() => executeShare('WA')}
                                disabled={isGeneratingImage}
                                className="brutal-border bg-[#25D366] text-white py-3 font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform text-[10px] sm:text-[11px] disabled:opacity-50"
                            >
                                WhatsApp
                            </button>
                            <button
                                onClick={copyLink}
                                disabled={isGeneratingImage}
                                className="brutal-border bg-[var(--background)] text-[var(--foreground)] py-3 font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform text-[10px] sm:text-[11px] disabled:opacity-50"
                            >
                                Get Link
                            </button>
                        </div>

                        <button
                            onClick={() => executeShare('DOWNLOAD')}
                            disabled={isGeneratingImage}
                            className="w-full brutal-border bg-[var(--card-bg)] text-[var(--foreground)] py-3 font-bold uppercase tracking-widest hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors text-[11px] disabled:opacity-50"
                        >
                            ⬇️ SAVE IMAGE TO DEVICE
                        </button>
                    </div>
                </div>
            )}

            {/* CHEATSHEET VIEW */}
            {view === 'cheatsheet' && (
                <>
                    <nav className="sticky top-[108px] md:top-[60px] w-full max-w-[100vw] z-30 bg-[var(--background)] brutal-border border-x-0 border-t-0 flex overflow-x-auto overflow-y-hidden scrollbar-hide py-1 px-2 md:px-6">
                        <div className="flex w-max px-2 md:px-2">
                            {tabs.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id)}
                                    className={`font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase px-4 py-2 cursor-pointer transition-colors whitespace-nowrap brutal-border ${activeTab === t.id ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-transparent text-[var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[var(--card-bg)]'} mr-[-4px]`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    <div className="flex-1 p-4 md:p-8 cs-pane" key={activeTab}>
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="font-press-start text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">■ {tabs.find(t => t.id === activeTab)?.label}</h2>
                            <div className="flex-1 border-b-4 border-dashed border-[var(--border-color)] opacity-30"></div>
                        </div>

                        {filteredCards.length === 0 ? (
                            <div className="p-10 text-center opacity-60 font-mono text-xs tracking-widest uppercase">
                                {`No results for "${searchQuery}"`}
                            </div>
                        ) : (
                            <div className="brutal-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                                {filteredCards.map(card => {
                                    const isFlipped = flippedCards.has(card.id);

                                    return (
                                        <div key={card.id} className={`brutal-border min-h-[450px] relative ${isFlipped ? 'cs-card-flipped' : ''}`} style={{ perspective: '1000px' }}>
                                            <div className="cs-card-inner absolute inset-0 w-full h-full">

                                                {/* Front Face (Code) */}
                                                <div className={`cs-face absolute inset-0 flex flex-col bg-[var(--card-bg)] ${isFlipped ? 'pointer-events-none' : ''}`} style={{ transform: 'translateZ(1px)' }}>
                                                    <div className="p-3 border-b-4 border-[var(--border-color)] flex items-start justify-between gap-2 shrink-0 bg-[var(--card-bg)]">
                                                        <div className="flex flex-col gap-1 flex-1">
                                                            <span className="text-[9px] opacity-60 tracking-widest font-press-start">{card.number}</span>
                                                            <span className="text-[11px] sm:text-xs font-bold tracking-[0.09em] uppercase">{card.title}</span>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {card.tags.map((tag, i) => (
                                                                    <span key={i} className="text-[9px] tracking-widest font-bold uppercase before:content-['■_'] opacity-70">{tag}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="p-3 flex-1 overflow-y-auto bg-[var(--background)] relative custom-scrollbar overscroll-contain"
                                                        style={{ transform: 'translateZ(0)' }}
                                                    >
                                                        <pre dangerouslySetInnerHTML={{ __html: card.codeHtml }} className="select-text" />
                                                    </div>

                                                    <button
                                                        onClick={(e) => toggleFlip(card.id, e)}
                                                        className="border-t-4 border-[var(--border-color)] bg-[var(--foreground)] text-[var(--background)] font-mono text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-3 flex items-center justify-between w-full hover:opacity-90 transition-opacity shrink-0"
                                                    >
                                                        ■ EXPLAIN THIS <span className="text-[12px]">↻</span>
                                                    </button>
                                                </div>

                                                {/* Back Face (Explanations) */}
                                                <div className={`cs-face cs-back absolute inset-0 flex flex-col bg-[var(--card-bg)] ${!isFlipped ? 'pointer-events-none' : ''}`} style={{ transform: 'rotateY(180deg) translateZ(1px)' }}>
                                                    <div className="p-3 border-b-4 border-[var(--border-color)] flex items-center justify-between shrink-0 sticky top-0 bg-[var(--card-bg)] z-10">
                                                        <span className="text-[10px] font-bold tracking-[0.16em] uppercase opacity-70 truncate max-w-[70%]">■ {card.title}</span>
                                                        <button
                                                            onClick={(e) => toggleFlip(card.id, e)}
                                                            className="bg-transparent brutal-border text-[var(--foreground)] font-mono text-[10px] px-2 py-1 tracking-[0.09em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors uppercase font-bold"
                                                        >
                                                            ↺ BACK
                                                        </button>
                                                    </div>

                                                    <div
                                                        className="p-4 flex-1 overflow-y-auto pb-6 relative custom-scrollbar z-0 overscroll-contain"
                                                        style={{ transform: 'translateZ(0)' }}
                                                        dangerouslySetInnerHTML={{ __html: card.explanationsHtml }}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )
            }

        </main >
    );
}
