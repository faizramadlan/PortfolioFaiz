'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import MiniGame from "./MiniGame";

// Section data
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
          Technical Consultant and Developer with expertise in enterprise software solutions and full-stack development. Proven track record of leading requirement analysis, supervising development teams, and delivering scalable applications. Strong foundation in modern web technologies, mobile development, and cloud infrastructure. Passionate about creating efficient, user-friendly applications that solve real-world problems.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-pixel-green text-pixel-yellow px-3 py-1 rounded text-xs font-bold">Technical Consulting</span>
          <span className="bg-pixel-red text-pixel-yellow px-3 py-1 rounded text-xs font-bold">Full-Stack Development</span>
          <span className="bg-pixel-orange text-pixel-foreground px-3 py-1 rounded text-xs font-bold">Team Leadership</span>
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
            <h4 className="text-pixel-red font-bold text-sm">Languages</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>⭐</span>JavaScript, TypeScript</li>
              <li className="flex items-center gap-2"><span>⭐</span>SQL, Python</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">Frontend Technologies</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>🍄</span>React.js, Next.js, Vue.js</li>
              <li className="flex items-center gap-2"><span>🍄</span>React Native, Expo</li>
              <li className="flex items-center gap-2"><span>🍄</span>Redux, Pinia, TailwindCSS</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">Backend & Database</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>🌸</span>Node.js, Express.js</li>
              <li className="flex items-center gap-2"><span>🌸</span>MySQL, PostgreSQL, MongoDB</li>
              <li className="flex items-center gap-2"><span>🌸</span>Redis, GraphQL, RESTful APIs</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-pixel-red font-bold text-sm">DevOps & Tools</h4>
            <ul className="text-xs space-y-1">
              <li className="flex items-center gap-2"><span>⭐</span>Docker, Kubernetes, Nginx</li>
              <li className="flex items-center gap-2"><span>🍄</span>GitHub, Postman, Figma</li>
              <li className="flex items-center gap-2"><span>🌸</span>Linux, AWS, Midtrans API</li>
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
        <h3 className="text-pixel-green text-xl mb-4 flex items-center gap-3">
          <span className="text-2xl">💼</span>
          Experience
        </h3>
        <div className="flex flex-col gap-6">
          <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-sm">Indonesia Global Solusindo</div>
              <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Current</span>
            </div>
            <div className="text-xs text-pixel-foreground mb-3">Technical Consultant/Developer | Jul 2023 – Present</div>
            <p className="text-xs text-pixel-foreground mb-3 italic">IT consultancy company providing custom software solutions to clients</p>
            <ul className="list-disc ml-4 text-xs space-y-1">
              <li>Led requirement analysis and technical planning for 3+ enterprise-grade projects to accelerate project readiness.</li>
              <li>Developed solutions to automate manual workflows and streamline operations.</li>
              <li>Supervised 2–4 developers per project, ensuring on-time delivery through agile coordination and code reviews.</li>
              <li>Resolved critical production issues through hands-on debugging and root cause analysis.</li>
            </ul>
          </div>
          <div className="pixel-border bg-gradient-to-r from-pixel-yellow to-pixel-green p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="font-bold text-sm">Freelance Developer</div>
            <div className="text-xs text-pixel-foreground mb-3">Sep 2022 – Jan 2023</div>
            <ul className="list-disc ml-4 text-xs space-y-1">
              <li>Built responsive websites using HTML, CSS, and JavaScript based on client specifications.</li>
              <li>Refactored front-end codebases to enhance usability and ensure compatibility across browsers.</li>
              <li>Turned client requirements into intuitive UI/UX designs and implemented them efficiently.</li>
              <li>Handled urgent website issues and restored functionality under time pressure.</li>
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
            <div className="text-xs text-pixel-foreground">Informatics System and Technology</div>
            <div className="text-xs text-pixel-foreground">Jakarta, Indonesia | Mar 2025 – Present</div>
          </div>
          <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-orange p-4 transform hover:scale-105 transition-transform duration-200">
            <div className="font-bold text-sm">Hacktiv8 Indonesia</div>
            <div className="text-xs text-pixel-foreground">Fullstack Javascript</div>
            <div className="text-xs text-pixel-foreground">Jakarta, Indonesia | Jan 2023 – May 2023</div>
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
        <div className="mb-8">
          <div className="text-pixel-green font-bold text-lg mb-2">Professional Projects</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="pixel-border bg-gradient-to-br from-pixel-yellow to-pixel-green p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-green text-sm">IAMA Dashboard</span>
                <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Jan 2025</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Built real-time monitoring dashboard for 50+ automation bots with NextJs and Prisma.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">Next.js</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Prisma</span>
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">TypeScript</span>
              </div>
              <a href="#" className="text-pixel-orange underline text-xs hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="pixel-border bg-gradient-to-br from-pixel-orange to-pixel-red p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-yellow text-sm">Railtax</span>
                <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">Jul 2024</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Created a tax document management system serving 500+ users monthly.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">React</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Node.js</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">PostgreSQL</span>
              </div>
              <a href="#" className="text-pixel-yellow underline text-xs hover:text-pixel-orange transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="pixel-border bg-gradient-to-br from-pixel-red to-pixel-orange p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-yellow text-sm">Railway Asset Management (RAM)</span>
                <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">Jan 2024</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Developed a centralized platform managing 2000+ asset records, improving data accuracy and retrieval speed.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">React</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Node.js</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">PostgreSQL</span>
              </div>
              <a href="#" className="text-pixel-yellow underline text-xs hover:text-pixel-orange transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="pixel-border bg-gradient-to-br from-pixel-green to-pixel-yellow p-4 transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-pixel-orange text-sm">Space by KAI</span>
                <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Oct 2023</span>
              </div>
              <p className="text-pixel-foreground text-xs mb-3">Built a proposal submission portal and asset showcase website for 50+ partner organizations.</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">React</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Node.js</span>
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">PostgreSQL</span>
              </div>
              <a href="#" className="text-pixel-orange underline text-xs hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
          </div>
        </div>
        <div>
          <div className="text-pixel-blue font-bold text-lg mb-2">Personal Projects</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="pixel-border bg-gradient-to-r from-pixel-yellow to-pixel-green p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-sm">Share-a-Ride</div>
                <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Apr 2023</span>
              </div>
              <div className="text-xs text-pixel-foreground mb-2">Final bootcamp project: built mobile app and CMS for long-distance ride-sharing.</div>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">React Native</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Expo</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">Apollo</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Midtrans</span>
              </div>
            </div>
            <div className="pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-sm">Watership Mobile</div>
                <span className="text-xs bg-pixel-red text-pixel-yellow px-2 py-1 rounded">Apr 2023</span>
              </div>
              <div className="text-xs text-pixel-foreground mb-2">Developed brand showcase mobile app inspired by Fireship.io.</div>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">React Native</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">GraphQL</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">MongoDB</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">AWS</span>
              </div>
            </div>
            <div className="pixel-border bg-gradient-to-r from-pixel-red to-pixel-orange p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-sm">Watership Web</div>
                <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">Apr 2023</span>
              </div>
              <div className="text-xs text-pixel-foreground mb-2">Created responsive web showcase app.</div>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">ReactJS</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Redux</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">Express</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">TailwindCSS</span>
              </div>
            </div>
            <div className="pixel-border bg-gradient-to-r from-pixel-orange to-pixel-red p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-sm">Oslo Dota 2 Companion</div>
                <span className="text-xs bg-pixel-green text-pixel-yellow px-2 py-1 rounded">Mar 2023</span>
              </div>
              <div className="text-xs text-pixel-foreground mb-2">Developed a learning companion app for new Dota 2 players.</div>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="bg-pixel-green text-pixel-yellow px-2 py-0.5 rounded text-[10px]">Vite</span>
                <span className="bg-pixel-orange text-pixel-foreground px-2 py-0.5 rounded text-[10px]">Vue</span>
                <span className="bg-pixel-yellow text-pixel-green px-2 py-0.5 rounded text-[10px]">Pinia</span>
                <span className="bg-pixel-red text-pixel-yellow px-2 py-0.5 rounded text-[10px]">RESTful API</span>
              </div>
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
                <a href="mailto:ramadlan.faiz@gmail.com" className="text-xs underline text-pixel-green font-bold hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">ramadlan.faiz@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-yellow to-pixel-green transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📱</span>
              <div>
                <div className="text-xs font-bold">Phone</div>
                <a href="tel:+62895380764728" className="text-xs underline text-pixel-green font-bold hover:text-pixel-red transition-colors">+62895380764728</a>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-red to-pixel-orange transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">💼</span>
              <div>
                <div className="text-xs font-bold">LinkedIn</div>
                <a href="https://www.linkedin.com/in/faiz-ramadlan/" className="text-xs underline text-pixel-green font-bold hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">faiz-ramadlan</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pixel-orange to-pixel-red transform hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">🐙</span>
              <div>
                <div className="text-xs font-bold">GitHub</div>
                <a href="https://github.com/faizramadlan" className="text-xs underline text-pixel-green font-bold hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">faizramadlan</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
  },
];

// Section unlock scores
const SECTION_SCORES = [1200, 2800, 4200, 6800, 9300, 12000];

// Prologue lines
const prologueLines = [
  "Help this jobseeker to...",
  "🏃‍♂️ Run through the corporate jungle!",
  "📄 Dodge rejection letters & obstacles!",
  "💼 Jump over office politics!",
  "⏰ Beat the clock & competition!",
  "🚀 Land that dream job!",
  "Ready? Let's go! 🎯"
];

export default function Home() {
  // State hooks
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
  const [isFirstGame, setIsFirstGame] = useState(true);
  const [shownSections, setShownSections] = useState<number[]>([]);
  const [showPrologue, setShowPrologue] = useState(false);
  const [prologueStep, setPrologueStep] = useState(0);

  // Reset on mount
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
    setIsFirstGame(true);
    setShownSections([]);
  }, []);

  // Section auto-popup
  useEffect(() => {
    if (!playing) return;
    for (let idx = 0; idx < SECTION_SCORES.length; idx++) {
      if (
        score >= SECTION_SCORES[idx] &&
        !shownSections.includes(idx) &&
        modalSection === null
      ) {
        setModalSection(idx);
        setPaused(true);
        setShowFireworks(true);
        setShowCloseButton(false);
        setTimeout(() => setShowFireworks(false), 2000);
        setTimeout(() => setShowCloseButton(true), 3000);
        setShownSections(prev => [...prev, idx]);
        break;
      }
    }
  }, [score, playing, modalSection, shownSections]);

  // Prologue sequence
  useEffect(() => {
    if (showPrologue && prologueStep < prologueLines.length) {
      const timer = setTimeout(() => {
        setPrologueStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (showPrologue && prologueStep >= prologueLines.length) {
      setTimeout(() => {
        setShowPrologue(false);
        setPlaying(true);
        setIsFirstGame(false);
      }, 1000);
    }
  }, [showPrologue, prologueStep]);

  // High score effect
  useEffect(() => {
    if (score > prevHighScore.current && score === highScore && score !== 0) {
      setNewHighScore(true);
    }
    prevHighScore.current = highScore;
  }, [highScore, score]);

  // Countdown effect
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

  // Game over handler
  const handleGameOver = () => {
    setGameOver(true);
    setPlaying(false);
  };

  // Restart handler
  const handleRestart = () => {
    setGameOver(false);
    setPlaying(true);
    setPaused(false);
    setModalSection(null);
    setNewHighScore(false);
    setIsFirstGame(false);
  };

  // Section modal handler
  const handleSectionClick = (idx: number) => {
    setPaused(true);
    setModalSection(idx);
    setShowCloseButton(false);
    setTimeout(() => setShowCloseButton(true), 3000);
  };

  // Modal close handler
  const handleCloseModal = () => {
    setModalSection(null);
    setShowCloseButton(false);
    if (playing && !gameOver) {
      setCountdown(3);
    }
  };

  // Score update handler
  const handleScore = useCallback((newScore: number) => {
    setScore(newScore);
    setHighScore((prev) => (newScore > prev ? newScore : prev));
  }, []);

  // Progress reset
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      sessionStorage.removeItem("minigame-score");
      sessionStorage.removeItem("minigame-highscore");
      sessionStorage.removeItem("minigame-unlocked");
      window.location.reload();
    }
  };

  // Start game handler
  const handleStartGame = () => {
    if (isFirstGame) {
      setShowPrologue(true);
      setPrologueStep(0);
    } else {
      setPlaying(true);
    }
  };

  // Next section HUD
  const nextSectionIdx = SECTION_SCORES.findIndex((threshold) => score < threshold && highScore < threshold);
  let pointsToNext = null;
  let nextSectionLabel = null;
  if (nextSectionIdx !== -1) {
    pointsToNext = SECTION_SCORES[nextSectionIdx] - score;
    nextSectionLabel = sections[nextSectionIdx].label;
  }

  return (
    <>
      {/* Main layout */}
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
        {/* Prologue Overlay */}
        {showPrologue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="text-center text-pixel-yellow px-4">
              <div className="text-2xl font-bold mb-4 animate-pulse" style={{wordBreak: 'break-word'}}>
                {prologueLines[prologueStep]}
              </div>
              <div className="text-sm text-pixel-green">
                {prologueStep < prologueLines.length - 1 ? "..." : "Starting in 1 second..."}
              </div>
            </div>
          </div>
        )}
        {/* Game HUD */}
        <div className="w-full flex flex-col items-center gap-2 mb-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-4 text-pixel-green text-base font-bold items-center">
            <div className="flex gap-6">
              <span>Score: <span className="text-pixel-yellow bg-black px-1 rounded font-bold">{score.toString().padStart(6, "0")}</span></span>
              <span>High Score: <span className="text-pixel-orange bg-black px-1 rounded font-bold">{highScore.toString().padStart(6, "0")}</span></span>
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
          {showInstructions && (
            <div className="pixel-border bg-pixel-yellow text-pixel-green p-3 text-xs max-w-md text-center animate-fade-in-out">
              <div className="font-bold mb-2">How to Play:</div>
              <div>Press <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">Space</kbd> or <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">↑</kbd> to jump</div>
              <div>Tap the game area to jump (on mobile)</div>
              <div>Press <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">↓</kbd> or <kbd className="bg-pixel-green text-pixel-yellow px-1 rounded">S</kbd> to crouch</div>
              <div>Dodge job obstacles to earn points and unlock sections!</div>
            </div>
          )}
          {playing && pointsToNext !== null ? (
            <div className="text-lg font-bold text-pixel-yellow bg-black bg-opacity-80 px-4 py-2 rounded mb-2">
              {pointsToNext} more to unlock <span className="text-pixel-orange">{nextSectionLabel}</span>
            </div>
          ) : playing && (
            <div className="text-lg font-bold text-pixel-green bg-black bg-opacity-80 px-4 py-2 rounded mb-2">
              🎉 All sections unlocked! 🎉
            </div>
          )}
          {playing && (
            <button
              onClick={() => setPlaying(false)}
              className="px-3 py-1 text-xs bg-pixel-red text-pixel-yellow pixel-border hover:bg-pixel-orange transition-colors font-bold mt-2"
              title="Close game and return to start screen"
            >
              Close Game
            </button>
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
              Dodge job obstacles to earn points!
            </div>
          </div>
        )}
        {playing && (
          <MiniGame
            onScore={handleScore}
            playing={playing && !paused}
            onGameOver={handleGameOver}
            sectionMilestones={sections.map((s, i) => ({ score: SECTION_SCORES[i], label: `${SECTION_SCORES[i]} pts: ${s.label}` }))}
            onMilestoneReached={(index) => {
              const sectionIndex = index;
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
            <div className="text-2xl text-pixel-red font-bold mb-4 animate-bounce">You have been caught by HR!</div>
            {newHighScore && (
              <div className="text-xl text-pixel-yellow font-bold mb-4 animate-pulse">
                🏆 New High Score! 🏆
              </div>
            )}
            <div className="text-sm text-pixel-foreground mb-4">
              Final Score: <span className="text-pixel-yellow font-bold">{score.toString().padStart(6, "0")}</span>
            </div>
            <div className="text-xs text-pixel-green mb-4">
              Tired of playing? You can also click the section buttons below to view the portfolio.
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
        <div className="flex flex-row flex-wrap gap-2 mt-4 mb-2 justify-center max-w-4xl w-full px-2">
          {sections.map((section, idx) => {
            return (
              <button
                key={section.id}
                className="pixel-border px-2 py-1 text-xs md:text-base md:px-4 md:py-2 font-bold min-w-[100px] md:min-w-[120px] transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-pixel-green to-pixel-yellow text-pixel-yellow hover:from-pixel-orange hover:to-pixel-yellow"
                onClick={() => handleSectionClick(idx)}
                title={`View ${section.label}`}
              >
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <span className="text-sm md:text-base">{section.icon}</span>
                  <span className="truncate">{section.label}</span>
                  <span className="text-xs md:text-base">✅</span>
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
      <footer className="w-full flex justify-center items-center pixel-border bg-gradient-to-r from-pixel-green to-pixel-yellow py-3 mt-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-pixel-yellow items-center">
          <div className="flex gap-4">
            <span>Score: <span className="text-pixel-orange font-bold">{score.toString().padStart(6, "0")}</span></span>
            <span>High Score: <span className="text-pixel-orange font-bold">{highScore.toString().padStart(6, "0")}</span></span>
          </div>
          <div className="flex gap-4">
            <a href="mailto:ramadlan.faiz@gmail.com" className="underline text-pixel-orange hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">Email</a>
            <a href="https://www.linkedin.com/in/faiz-ramadlan/" className="underline text-pixel-orange hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/faizramadlan" className="underline text-pixel-orange hover:text-pixel-red transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}
