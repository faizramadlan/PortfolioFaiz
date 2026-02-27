'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import MiniGame from "./MiniGame";

import Summary from "../components/sections/Summary";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

export default function Home() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [newHighScore, setNewHighScore] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const prevHighScore = useRef(highScore);

  // Theme initialization
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  useEffect(() => {
    const savedHighScore = sessionStorage.getItem("minigame-highscore");
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));
  }, []);

  useEffect(() => {
    if (score > prevHighScore.current && score === highScore && score !== 0) {
      setNewHighScore(true);
    }
    prevHighScore.current = highScore;
    if (highScore > 0) {
      sessionStorage.setItem("minigame-highscore", highScore.toString());
    }
  }, [highScore, score]);

  const handleGameOver = () => {
    setGameOver(true);
    setPlaying(false);
  };

  const handleRestart = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setGameOver(false);
    setPlaying(true);
    setScore(0);
    setNewHighScore(false);
  };

  const handleScore = useCallback((newScore: number) => {
    setScore(newScore);
    setHighScore((prev) => (newScore > prev ? newScore : prev));
  }, []);

  const openGame = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setShowGameModal(true);
    setPlaying(false);
    setGameOver(false);
    setScore(0);
    setNewHighScore(false);
  };

  const closeGame = () => {
    setShowGameModal(false);
    setPlaying(false);
    setScore(0);
  };

  return (
    <main className="min-h-screen">
      {/* Top Nav Bar */}
      <nav className="sticky top-0 z-40 bg-[var(--background)] brutal-border border-t-0 border-x-0 p-3 md:p-6 flex justify-between items-center gap-2">
        <div className="font-black text-lg md:text-3xl tracking-tighter uppercase shrink-0">
          FAIZ <span className="bg-[var(--foreground)] text-[var(--background)] px-1 md:px-2 py-0.5 inline-block">RAMADLAN</span>
        </div>
        <div className="flex items-center gap-2 md:gap-6 font-press-start text-[8px] md:text-xs uppercase tracking-wider flex-wrap justify-end">
          <a href="#skills" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors">Skills</a>
          <a href="#work" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors">Work</a>
          <a href="#contact" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors">Contact</a>
          <a href="/tools" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors">Tools</a>
          <button
            onClick={toggleTheme}
            className="brutal-border px-2 py-1.5 md:px-3 md:py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors text-[8px] md:text-[10px]"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? "☀" : "☾"}
          </button>
          <div className="relative">
            <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] md:translate-x-[4px] md:translate-y-[4px] bg-[var(--foreground)] opacity-40" />
            <button
              onClick={openGame}
              className="relative brutal-border px-3 py-1.5 md:px-4 md:py-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] transition-colors text-[8px] md:text-[10px]"
            >
              PLAY
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section — Bento Grid */}
      <div className="p-4 md:p-6">
        <div className="brutal-grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">

          {/* Hero Card — full width on mobile, 2 cols on lg */}
          <div className="brutal-border p-6 md:p-12 col-span-2 lg:col-span-2 flex flex-col justify-end min-h-[220px] md:min-h-[400px]">
            <div className="font-press-start text-[10px] md:text-xs opacity-60 mb-4 tracking-widest">00000001</div>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4 md:mb-6">
              TECHNICAL<br />CONSULTANT &<br />DEVELOPER
            </h1>
            <div className="font-press-start text-[10px] md:text-xs opacity-60 tracking-wider">2022 – PRESENT</div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
              <span className="brutal-tag">■ FULL-STACK</span>
              <span className="brutal-tag">■ CONSULTING</span>
              <span className="brutal-tag">■ LEADERSHIP</span>
            </div>
          </div>

          {/* Summary Card — full width on mobile */}
          <div className="brutal-border p-6 md:p-8 col-span-2 md:col-span-1 flex flex-col justify-between min-h-[200px] md:min-h-[400px]">
            <Summary />
          </div>

          {/* Skills Card — full width */}
          <div id="skills" className="brutal-border p-6 md:p-8 col-span-2 lg:col-span-2">
            <Skills />
          </div>

          {/* Education Card — 1 col on mobile (half width) */}
          <div className="brutal-border p-6 md:p-8 col-span-2 md:col-span-1">
            <Education />
          </div>

          {/* Experience — full width */}
          <div className="brutal-border p-6 md:p-8 col-span-2 lg:col-span-3">
            <Experience />
          </div>

          {/* Projects — full width */}
          <div id="work" className="brutal-border p-6 md:p-8 col-span-2 lg:col-span-3">
            <Projects />
          </div>

          {/* Contact — takes left side */}
          <div id="contact" className="brutal-border p-6 md:p-8 col-span-2 md:col-span-1 lg:col-span-2">
            <Contact />
          </div>

          {/* Game CTA Card — takes right side on mobile */}
          <div className="brutal-border p-6 md:p-8 col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-4 md:gap-6 bg-[var(--foreground)] text-[var(--background)]">
            <div className="font-press-start text-[8px] md:text-xs tracking-widest opacity-60">EASTER EGG</div>
            <svg width="48" height="36" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 md:w-16 md:h-12">
              <rect x="4" y="8" width="56" height="32" rx="0" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="4" />
              <rect x="16" y="20" width="8" height="8" fill="currentColor" />
              <rect x="32" y="16" width="8" height="4" fill="currentColor" />
              <rect x="32" y="24" width="8" height="4" fill="currentColor" />
              <rect x="28" y="20" width="4" height="8" fill="currentColor" />
              <rect x="40" y="20" width="4" height="8" fill="currentColor" />
              <rect x="48" y="16" width="4" height="4" fill="currentColor" />
              <rect x="44" y="20" width="4" height="4" fill="currentColor" />
              <rect x="52" y="20" width="4" height="4" fill="currentColor" />
              <rect x="48" y="24" width="4" height="4" fill="currentColor" />
            </svg>
            <div className="font-black text-xl md:text-3xl uppercase tracking-tighter text-center">
              BORED?<br />PLAY MY<br />RESUME
            </div>
            <button
              onClick={openGame}
              className="brutal-tag bg-[var(--background)] text-[var(--foreground)] px-4 py-2 md:px-6 md:py-3 hover:opacity-80 transition-opacity cursor-pointer text-[8px] md:text-[10px]"
            >
              {'>'} START GAME
            </button>
            {highScore > 0 && (
              <div className="font-press-start text-[8px] md:text-[10px] opacity-60">
                HI-SCORE: {highScore.toString().padStart(6, '0')}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="brutal-border border-b-0 border-x-0 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <div className="font-press-start text-[8px] md:text-[10px] tracking-widest opacity-60 uppercase text-center md:text-left">
          © {new Date().getFullYear()} Faiz Ramadlan
        </div>
        <div className="flex gap-4 md:gap-6 font-press-start text-[8px] md:text-[10px] uppercase tracking-wider">
          <a href="mailto:ramadlan.faiz@gmail.com" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors">Email</a>
          <a href="https://www.linkedin.com/in/faiz-ramadlan/" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/faizramadlan" className="hover:bg-[var(--foreground)] hover:text-[var(--background)] px-1 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>

      {/* Game Modal Overlay */}
      {showGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-1 md:p-4 lg:p-6 font-press-start selection:bg-transparent">
          <div className="bg-[var(--card-bg)] brutal-border w-full max-w-6xl h-[95dvh] overflow-hidden relative flex flex-col items-center pt-10 md:pt-12 pb-4 md:pb-6">

            <button
              onClick={closeGame}
              className="absolute top-2 right-4 text-[var(--foreground)] hover:opacity-60 transition-opacity p-2 text-2xl font-black font-press-start"
            >
              X
            </button>

            <div className="w-full flex justify-between px-6 md:px-12 mb-6 text-[10px] md:text-sm">
              <span className="tracking-widest">SCORE: <span className="font-black">{score.toString().padStart(5, '0')}</span></span>
              <span className="tracking-widest">HI: <span className="font-black">{highScore.toString().padStart(5, '0')}</span></span>
            </div>

            {/* Game area — consistent height for both playing and dead states */}
            <div className="w-full flex-grow flex flex-col min-h-0">
              {!playing && !gameOver && (
                <div
                  className="w-full flex-grow flex flex-col items-center justify-center brutal-border border-x-0 bg-[#87CEEB] text-black p-4 text-center relative overflow-hidden cursor-pointer"
                  onClick={() => { setPlaying(true); setGameOver(false); }}
                >
                  <div className="absolute inset-0 opacity-50 pointer-events-none">
                    <div className="absolute top-10 left-[10%] w-20 h-8 bg-white rounded-full blur-md opacity-80" />
                    <div className="absolute top-20 left-[60%] w-32 h-12 bg-white rounded-full blur-md opacity-70" />
                  </div>
                  <div className="font-black text-2xl md:text-4xl uppercase tracking-tighter mb-4 text-white z-10" style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}>TAP TO PLAY</div>
                  <div className="font-press-start text-[10px] opacity-60 z-10 text-white" style={{ textShadow: "1px 1px 0 #000" }}>[SPACE] or TAP</div>
                </div>
              )}

              {playing && !gameOver && (
                <div className="w-full flex-grow font-sans flex flex-col">
                  <MiniGame
                    onScore={handleScore}
                    playing={playing}
                    onGameOver={handleGameOver}
                    sectionMilestones={[]}
                    onMilestoneReached={() => { }}
                    highScore={highScore}
                  />
                </div>
              )}

              {gameOver && (
                <div className="w-full flex-grow flex flex-col items-center justify-center brutal-border border-x-0 bg-[#87CEEB] text-black p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50 pointer-events-none">
                    <div className="absolute top-10 left-[10%] w-20 h-8 bg-white rounded-full blur-md opacity-80" />
                    <div className="absolute top-20 left-[60%] w-32 h-12 bg-white rounded-full blur-md opacity-70" />
                  </div>
                  <div className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tighter drop-shadow-md z-10 text-white" style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}>CAUGHT BY HR!</div>
                  {newHighScore && (
                    <div className="text-xs mb-6 font-black text-yellow-300 drop-shadow-md z-10" style={{ textShadow: "1px 1px 0 #000" }}>** NEW HIGH SCORE! **</div>
                  )}
                  <button
                    onClick={handleRestart}
                    className="brutal-border brutal-shadow px-8 py-4 bg-white text-black font-black uppercase tracking-wider hover:bg-gray-100 transition-colors z-10"
                  >
                    TRY AGAIN
                  </button>
                </div>
              )}
            </div>

            <div className="text-[10px] text-center max-w-md flex flex-col gap-3 px-4 mt-2 opacity-60">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors uppercase tracking-widest px-2 py-1"
              >
                How to Play
              </button>
              {showInstructions && (
                <div className="brutal-border p-4 text-left leading-relaxed bg-[var(--background)] text-[var(--foreground)]">
                  <span className="font-black">[SPACE]</span> to flap.<br /><br />
                  Fly between the pipes and survive!
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
