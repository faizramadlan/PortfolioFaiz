'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import MiniGame from "./MiniGame";

// Portfolio sections data
const sections = [
  {
    id: "summary",
    label: "Professional Summary",
    icon: "👨‍💻",
    content: (
      <div className="pixel-border p-6 bg-gradient-to-br from-pixel-orange to-pixel-yellow text-pixel-foreground w-full max-w-3xl">
        <h3 className="text-pixel-green text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">👨‍💻</span>
          Professional Summary
        </h3>
        <p className="text-sm leading-relaxed">
          Dynamic and service-oriented IT professional with 3+ years of combined experience in technical consulting, web development, and client-facing roles. Proven ability to bridge business needs with technical solutions, lead cross-functional teams, and deliver scalable systems. Strong foundation in Agile/Scrum, system analysis, and project management. Passionate about creating impactful applications while continuously learning and adapting.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-pixel-green text-pixel-yellow px-3 py-1 rounded text-xs font-bold">Agile/Scrum</span>
          <span className="bg-pixel-red text-pixel-yellow px-3 py-1 rounded text-xs font-bold">System Analysis</span>
          <span className="bg-pixel-orange text-pixel-foreground px-3 py-1 rounded text-xs font-bold">Project Management</span>
        </div>
      </div>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: "⭐",
    content: (
      <section id="skills" className="pixel-border p-6 bg-gradient-to-br from-pixel-yellow to-pixel-green text-pixel-foreground w-full max-w-3xl">
        <h3 className="text-pixel-green text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          Skills
          <span className="inline-block animate-pulse">🍄🌸</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">Frontend Development</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>⭐</span>JavaScript, TypeScript</li>
              <li className="flex items-center gap-2"><span>⭐</span>React, Vue.js, Next.js</li>
              <li className="flex items-center gap-2"><span>⭐</span>Tailwind CSS, SCSS</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">Backend Development</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>🍄</span>Node.js, Express.js</li>
              <li className="flex items-center gap-2"><span>🍄</span>REST APIs, GraphQL</li>
              <li className="flex items-center gap-2"><span>🍄</span>Technical Documentation</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">Database & DevOps</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>🌸</span>PostgreSQL, MySQL, MongoDB</li>
              <li className="flex items-center gap-2"><span>🌸</span>Prisma, Sequelize</li>
              <li className="flex items-center gap-2"><span>🌸</span>Docker, Kubernetes, AWS</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">Languages & Tools</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>⭐</span>Mendix, Midtrans API</li>
              <li className="flex items-center gap-2"><span>🍄</span>Multer, Technical Writing</li>
              <li className="flex items-center gap-2"><span>🌸</span>Bahasa Indonesia, English</li>
            </ul>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
    content: (
      <section id="experience" className="pixel-border p-6 bg-gradient-to-br from-pixel-red to-pixel-orange text-pixel-foreground w-full max-w-3xl">
        <h3 className="text-pixel-yellow text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">💼</span>
          Experience
        </h3>
        <div className="flex flex-col gap-6">
          <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-sm">PT Indonesia Global Solusindo</div>
              <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Current</span>
            </div>
            <div className="text-xs text-pixel-foreground mb-3">Technical Consultant | Jul 2023 – Present</div>
            <ul className="list-disc ml-4 text-xs space-y-1">
              <li>Led requirement analysis and technical planning for 3+ enterprise projects.</li>
              <li>Designed low-code solutions using Mendix, reducing manual processes by 40%.</li>
              <li>Supervised teams of 3+ developers, resolved production issues, delivered comprehensive documentation.</li>
              <li>Implemented Agile methodologies, improving project delivery time by 25%.</li>
            </ul>
          </div>
          <div className="pixel-border bg-gradient-to-r from-pixel-yellow to-pixel-green p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="font-bold text-sm">Freelance Web Developer</div>
            <div className="text-xs text-pixel-foreground mb-3">Sep 2022 – Dec 2022</div>
            <ul className="list-disc ml-4 text-xs space-y-1">
              <li>Built responsive websites for 8+ clients, achieving 95% client satisfaction.</li>
              <li>Refactored legacy code, improving performance by 60%.</li>
              <li>Enhanced UI/UX designs, increasing user engagement by 45%.</li>
              <li>Resolved urgent outages within 2 hours, maintaining 99.9% uptime.</li>
            </ul>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    content: (
      <section id="education" className="pixel-border p-6 bg-gradient-to-br from-pixel-yellow to-pixel-green text-pixel-foreground w-full max-w-3xl">
        <h3 className="text-pixel-green text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          Education
        </h3>
        <div className="space-y-4">
          <div className="pixel-border bg-gradient-to-r from-pixel-orange to-pixel-yellow p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-sm">Cakrawala University</span>
              <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">Ongoing</span>
            </div>
            <div className="text-xs text-pixel-foreground">Bachelor&apos;s in Information Systems and Technology</div>
            <div className="text-xs text-pixel-foreground">Jakarta, Indonesia | Mar 2024 – Present</div>
          </div>
          <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-orange p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="font-bold text-sm">Hacktiv8 Coding Bootcamp</div>
            <div className="text-xs text-pixel-foreground">Full Stack JavaScript Immersive Program</div>
            <div className="text-xs text-pixel-foreground">Jakarta, Indonesia | Jan 2023 – May 2023</div>
          </div>
          <div className="pixel-border bg-gradient-to-r from-pixel-red to-pixel-yellow p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-sm">Gadjah Mada University</span>
              <span className="text-xs bg-pixel-orange text-pixel-foreground px-2 py-1 rounded">Unfinished</span>
            </div>
            <div className="text-xs text-pixel-foreground">Bachelor of Law</div>
            <div className="text-xs text-pixel-foreground">Yogyakarta, Indonesia | Jul 2016 – May 2019</div>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: "🏆",
    content: (
      <section id="certifications" className="pixel-border p-6 bg-gradient-to-br from-pixel-orange to-pixel-red text-pixel-foreground w-full max-w-3xl">
        <h3 className="text-pixel-yellow text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow p-4 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-sm">Hacktiv8 Fullstack Javascript Immersive</div>
            <div className="text-xs text-pixel-foreground mt-1">2023</div>
          </div>
          <div className="pixel-border bg-gradient-to-r from-pixel-yellow to-pixel-green p-4 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-bold text-sm">Mendix Rapid Developer</div>
            <div className="text-xs text-pixel-foreground mt-1">2023</div>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: "🚀",
    content: (
      <section id="projects" className="pixel-border p-6 bg-gradient-to-br from-pixel-green to-pixel-yellow text-pixel-foreground w-full max-w-4xl">
        <h3 className="text-pixel-yellow text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">🚀</span>
          Projects
          <span className="animate-bounce text-2xl">🪙</span>
        </h3>
        {/* Professional Projects */}
        <div className="mb-8">
          <div className="text-pixel-green font-bold text-lg mb-2">Professional Projects</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="pixel-border bg-gradient-to-br from-pixel-yellow to-pixel-green p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-green text-sm">Space by KAI</span>
                <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Enterprise</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Built a proposal submission portal for 50+ partner organizations with automated workflow management.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Mendix</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Java</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">JavaScript</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">SCSS</span>
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">PostgreSQL</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Kubernetes</span>
              </div>
              <a href="#" className="text-pixel-orange underline text-xs hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="pixel-border bg-gradient-to-br from-pixel-orange to-pixel-red p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-yellow text-sm">Railway Asset Management (RAM)</span>
                <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">Platform</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Centralized platform to manage 2000+ railway asset records with real-time monitoring capabilities.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Mendix</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Java</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">JavaScript</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">SCSS</span>
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">PostgreSQL</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Kubernetes</span>
              </div>
              <a href="#" className="text-pixel-yellow underline text-xs hover:text-pixel-orange transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="pixel-border bg-gradient-to-br from-pixel-red to-pixel-orange p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-yellow text-sm">Railtax</span>
                <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">SaaS</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Tax document management system serving 500+ users monthly with automated compliance checks.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Mendix</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Java</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">JavaScript</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">SCSS</span>
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">PostgreSQL</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Kubernetes</span>
              </div>
              <a href="#" className="text-pixel-yellow underline text-xs hover:text-pixel-orange transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="pixel-border bg-gradient-to-br from-pixel-green to-pixel-yellow p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-orange text-sm">IAMA Dashboard</span>
                <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Dashboard</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Dashboard for real-time monitoring and control of 50+ automation bots with analytics and reporting.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">Next.js</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">React</span>
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Prisma</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Zustand</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
        {/* Personal Projects */}
        <div>
          <div className="text-pixel-blue font-bold text-lg mb-2">Personal Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="pixel-border bg-gradient-to-r from-pixel-yellow to-pixel-green p-4">
              <div className="font-bold text-sm">Project Alpha</div>
              <div className="text-xs text-pixel-foreground mb-2">A cool side project using React and Node.js.</div>
              <ul className="list-disc ml-4 text-xs space-y-1">
                <li>Built a task tracker with real-time sync.</li>
                <li>Integrated with third-party APIs for notifications.</li>
              </ul>
            </div>
            <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow p-4">
              <div className="font-bold text-sm">Project Beta</div>
              <div className="text-xs text-pixel-foreground mb-2">A mobile app for habit tracking.</div>
              <ul className="list-disc ml-4 text-xs space-y-1">
                <li>Cross-platform with React Native.</li>
                <li>Offline support and local notifications.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: "📧",
    content: (
      <section id="contact" className="pixel-border p-6 bg-gradient-to-br from-pixel-orange to-pixel-red text-pixel-foreground w-full max-w-3xl mb-8">
        <h3 className="text-pixel-red text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">📧</span>
          Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-green to-pixel-yellow transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📧</span>
              <div>
                <div className="text-xs font-bold">Email</div>
                <a href="mailto:ramadlan.faiz@gmail.com" className="text-xs underline text-pixel-yellow hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">ramadlan.faiz@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-yellow to-pixel-green transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">💼</span>
              <div>
                <div className="text-xs font-bold">LinkedIn</div>
                <a href="https://linkedin.com" className="text-xs underline text-pixel-yellow hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">linkedin.com</a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-red to-pixel-orange transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">🌍</span>
              <div>
                <div className="text-xs font-bold">Location</div>
                <div className="text-xs">Jakarta, Indonesia</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-orange to-pixel-red transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="text-xs font-bold">Availability</div>
                <div className="text-xs">Open to opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
  },
];

// Score thresholds for section unlocks
const SECTION_SCORES = [0, 300, 600, 1200, 2000, 3000, 4000];

export default function Home() {
  // Game state
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [modalSection, setModalSection] = useState<number|null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const prevHighScore = useRef(highScore);
  const [showInstructions, setShowInstructions] = useState(false);
  const [countdown, setCountdown] = useState<number|null>(null);
  const [newHighScore, setNewHighScore] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  // Reset state on page load
  useEffect(() => {
    sessionStorage.removeItem("minigame-score");
    sessionStorage.removeItem("minigame-highscore");
    sessionStorage.removeItem("minigame-unlocked");
    
    setScore(0);
    setHighScore(0);
    setPlaying(false);
    setGameOver(false);
    setPaused(false);
    setModalSection(null);
    setHasPlayedOnce(false);
  }, []);

  // Auto-popup sections based on score milestones
  useEffect(() => {
    if (!hasPlayedOnce || !playing) return;
    
    const currentUnlockedCount = SECTION_SCORES.filter(threshold => score >= threshold).length;
    const previousUnlockedCount = SECTION_SCORES.filter(threshold => score - 10 >= threshold).length;
    
    if (currentUnlockedCount > previousUnlockedCount && currentUnlockedCount > 1) {
      const sectionIndex = currentUnlockedCount - 1;
      if (sectionIndex < sections.length) {
        setModalSection(sectionIndex);
        setPaused(true);
        setShowFireworks(true);
        setShowCloseButton(false);
        setTimeout(() => setShowFireworks(false), 2000);
        setTimeout(() => setShowCloseButton(true), 3000);
      }
    }
  }, [score, hasPlayedOnce, playing]);

  // High score celebration
  useEffect(() => {
    if (score > prevHighScore.current && score === highScore && score !== 0) {
      setNewHighScore(true);
    }
    prevHighScore.current = highScore;
  }, [highScore, score]);

  // Countdown timer
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setPaused(false);
    }
  }, [countdown]);

  // Game event handlers
  const handleGameOver = () => {
    setGameOver(true);
    setPlaying(false);
  };

  const handleRestart = () => {
    setGameOver(false);
    setPlaying(true);
    setPaused(false);
    setModalSection(null);
    setNewHighScore(false);
    setHasPlayedOnce(true);
  };

  const handleSectionClick = (idx: number) => {
    setPaused(true);
    setModalSection(idx);
    setShowCloseButton(false);
    setTimeout(() => setShowCloseButton(true), 3000);
  };

  const handleCloseModal = () => {
    setModalSection(null);
    setShowCloseButton(false);
    
    if (playing && !gameOver) {
      setCountdown(3);
    }
  };

  // Score handler for MiniGame
  const handleScore = useCallback((newScore: number) => {
    setScore(newScore);
    setHighScore((prev) => (newScore > prev ? newScore : prev));
  }, []);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      sessionStorage.removeItem("minigame-score");
      sessionStorage.removeItem("minigame-highscore");
      sessionStorage.removeItem("minigame-unlocked");
      window.location.reload();
    }
  };

  const handleStartGame = () => {
    setPlaying(true);
    setHasPlayedOnce(true);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen w-full h-screen bg-pixel gap-4 p-0 m-0 overflow-hidden">


        {/* Fireworks Animation */}
        {showFireworks && (
          <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
            <div className="text-6xl animate-bounce">
              <span className="animate-ping">🎆</span>
              <span className="animate-pulse">🎇</span>
              <span className="animate-bounce">✨</span>
            </div>
          </div>
        )}

        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="text-8xl text-pixel-yellow font-bold animate-pulse">
              {countdown}
            </div>
          </div>
        )}

        {/* Game HUD */}
        <div className="w-full flex flex-col items-center gap-2 mb-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-4 text-pixel-green text-base font-bold items-center">
            <div className="flex gap-6">
              <span>Score: <span className="text-pixel-yellow">{score.toString().padStart(6, "0")}</span></span>
              <span>High Score: <span className="text-pixel-orange">{highScore.toString().padStart(6, "0")}</span></span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleReset} 
                className="px-3 py-1 text-xs bg-pixel-red text-pixel-yellow pixel-border hover:bg-pixel-orange transition-colors"
                title="Reset all progress"
              >
                Reset Progress
              </button>
              <button 
                onClick={() => setShowInstructions(!showInstructions)} 
                className="px-3 py-1 text-xs bg-pixel-green text-pixel-yellow pixel-border hover:bg-pixel-orange transition-colors"
                title="Show instructions"
              >
                {showInstructions ? 'Hide' : 'Help'}
              </button>
            </div>
          </div>
          
          {/* Instructions */}
          {showInstructions && (
            <div className="pixel-border bg-pixel-yellow text-pixel-green p-3 text-xs max-w-md text-center animate-fade-in-out">
              <div className="font-bold mb-2">How to Play:</div>
              <div>Press <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">Space</kbd> or <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">↑</kbd> to jump</div>
              <div>Press <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">↓</kbd> or <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">S</kbd> to crouch</div>
              <div>Avoid the cacti to earn points and unlock sections!</div>
            </div>
          )}
        </div>

        {/* Play button or Mini-game */}
        {!playing && !gameOver && (
          <div className="flex flex-col items-center gap-4">
            <button
              className="pixel-border bg-gradient-to-r from-pixel-yellow to-pixel-green text-pixel-green text-lg px-8 py-4 hover:from-pixel-orange hover:to-pixel-yellow transition-all duration-300 transform hover:scale-105"
              onClick={handleStartGame}
            >
              ▶ Play
            </button>
            <div className="text-xs text-pixel-foreground text-center">
              Press Space or ↑ to jump<br/>
              Avoid the cacti to earn points!
            </div>
          </div>
        )}

        {playing && (
          <MiniGame
            onScore={handleScore}
            playing={playing && !paused}
            onGameOver={handleGameOver}
            sectionMilestones={sections.slice(1).map((s, i) => ({ score: SECTION_SCORES[i+1], label: `${SECTION_SCORES[i+1]} pts: ${s.label}` }))}
            onMilestoneReached={(index) => {
              const sectionIndex = index + 1;
              if (sectionIndex < sections.length) {
                setModalSection(sectionIndex);
                setPaused(true);
                setShowFireworks(true);
                setShowCloseButton(false);
                setTimeout(() => setShowFireworks(false), 2000);
                setTimeout(() => setShowCloseButton(true), 3000);
              }
            }}
            highScore={highScore}
          />
        )}

        {gameOver && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-2xl text-pixel-red font-bold mb-4 animate-bounce">Game Over</div>
            
            {/* High Score Celebration */}
            {newHighScore && (
              <div className="text-xl text-pixel-yellow font-bold mb-4 animate-pulse">
                🏆 New High Score! 🏆
              </div>
            )}
            
            <div className="text-sm text-pixel-foreground mb-4">
              Final Score: <span className="text-pixel-yellow font-bold">{score.toString().padStart(6, "0")}</span>
            </div>
            
            <button
              className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow text-pixel-yellow text-lg px-8 py-4 hover:from-pixel-orange hover:to-pixel-yellow transition-all duration-300 transform hover:scale-105"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        )}

        {/* Section Navigation */}
        <div className="flex flex-row gap-2 mt-4 mb-2 flex-wrap justify-center max-w-4xl">
          {sections.map((section, idx) => {
            return (
              <button
                key={section.id}
                className="pixel-border px-4 py-2 text-xs font-bold min-w-[120px] transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-pixel-green to-pixel-yellow text-pixel-yellow hover:from-pixel-orange hover:to-pixel-yellow"
                onClick={() => handleSectionClick(idx)}
                title={`View ${section.label}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm">{section.icon}</span>
                  <span>{section.label}</span>
                  <span className="text-xs">✅</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Section Modal */}
        {modalSection !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="pixel-border bg-pixel-yellow text-pixel-foreground p-6 max-w-4xl max-h-[80vh] overflow-y-auto relative mx-auto">
              {sections[modalSection].content}
              
              {/* Close button */}
              {showCloseButton && (
                <div className="flex justify-center mt-6">
                  <button
                    className="text-pixel-red text-lg font-bold hover:text-pixel-orange transition-colors pixel-border bg-pixel-green text-pixel-yellow px-6 py-2"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-center items-center pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow py-3 mt-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-pixel-yellow items-center">
          <div className="flex gap-4">
            <span>Score: <span className="text-pixel-orange font-bold">{score.toString().padStart(6, "0")}</span></span>
            <span>High Score: <span className="text-pixel-orange font-bold">{highScore.toString().padStart(6, "0")}</span></span>
          </div>
          <div className="flex gap-4">
            <a href="mailto:ramadlan.faiz@gmail.com" className="underline text-pixel-orange hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">Email</a>
            <a href="https://linkedin.com" className="underline text-pixel-orange hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
