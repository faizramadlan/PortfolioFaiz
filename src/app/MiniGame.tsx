"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 220;
const GROUND_Y = 170;
const JUMP_HEIGHT = 90;
const CROUCH_HEIGHT = 24;
const GRAVITY = 4;
const OBSTACLE_WIDTH = 28;
const OBSTACLE_HEIGHT = 40;
const CHAR_WIDTH = 36;
const CHAR_HEIGHT = 36;

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

// Realistic jobseeker obstacles
const OBSTACLE_EMOJIS = [
  "📄", // Rejection letter
  "⏰", // Time pressure
  "💸", // Low salary offer
  "🚫", // Application rejected
  "😰", // Interview anxiety
  "📧", // No response email
  "🎭", // Office politics
  "📊", // Tough competition
  "💼", // Overqualified
  "🔒", // Job requirements mismatch
  "⏳", // Long hiring process
  "📱", // Ghosting recruiter
  "🎯", // Unrealistic expectations
  "📋", // Endless paperwork
  "🤖", // AI screening
  "📞", // No callback
  "💻", // Technical interview fail
  "📚", // Skills gap
  "🏢", // Toxic workplace
  "💰", // Budget cuts
];

function getRandomObstacleEmoji() {
  return OBSTACLE_EMOJIS[Math.floor(Math.random() * OBSTACLE_EMOJIS.length)];
}

export default function MiniGame({
  onScore, playing, onGameOver, sectionMilestones, onMilestoneReached, highScore
}: {
  onScore: (score: number) => void;
  playing: boolean;
  onGameOver: () => void;
  sectionMilestones: Array<{ score: number, label: string }>;
  onMilestoneReached: (index: number) => void;
  highScore: number;
}) {
  const [charY, setCharY] = useState(GROUND_Y);
  const [jumping, setJumping] = useState(false);
  const [crouching, setCrouching] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<{x: number, y: number, high: boolean, id: string, emoji: string}[]>([]);
  const [particles, setParticles] = useState<{x: number, y: number, id: string}[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [distance, setDistance] = useState(0);
  const frame = useRef(0);
  const justDied = useRef(false);
  const hitThisFrame = useRef(false);
  const hasInitialized = useRef(false);
  const lastReportedScore = useRef(0);
  const nextObstacleGap = useRef(0);
  const lastObstacleX = useRef(GAME_WIDTH);
  const triggeredMilestones = useRef<Set<number>>(new Set());
  const [pendingMilestones, setPendingMilestones] = useState<number[]>([]);

  useEffect(() => {
    const hs = sessionStorage.getItem("minigame-highscore");
    if (hs) {
      const storedHighScore = Number(hs);
      if (storedHighScore > highScore) {
        onScore(storedHighScore);
      }
    }
  }, [highScore, onScore]);

  useEffect(() => {
    if (score !== lastReportedScore.current) {
      lastReportedScore.current = score;
      onScore(score);
    }
  }, [score, onScore]);

  const jump = useCallback(() => {
    if (!jumping && charY === GROUND_Y && !gameOver && playing && !crouching) {
      setJumping(true);
      setVelocity(-JUMP_HEIGHT);
    }
  }, [jumping, charY, gameOver, playing, crouching]);

  const crouch = useCallback((down: boolean) => {
    if (!gameOver && playing) {
      setCrouching(down);
    }
  }, [gameOver, playing]);

  useEffect(() => {
    if (!playing) return;
    const handleDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") jump();
      if (e.code === "ArrowDown" || e.code === "KeyS") crouch(true);
    };
    const handleUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") crouch(false);
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, [jump, crouch, playing]);

  // Add tap-to-jump support for mobile
  useEffect(() => {
    if (!playing) return;
    const handleTap = (e: TouchEvent) => {
      e.preventDefault();
      if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        jump();
      }
    };
    const gameArea = document.getElementById('minigame-area');
    if (gameArea) {
      gameArea.addEventListener('touchstart', handleTap);
    }
    return () => {
      if (gameArea) {
        gameArea.removeEventListener('touchstart', handleTap);
      }
    };
  }, [playing, jump]);

  useEffect(() => {
    if (!playing || gameOver) return;
    let anim: number;
    function loop() {
      frame.current++;
      hitThisFrame.current = false;
      if (jumping) {
        setCharY((y) => {
          const nextY = y + velocity / 8;
          if (nextY >= GROUND_Y) {
            setJumping(false);
            setVelocity(0);
            return GROUND_Y;
          }
          setVelocity((v) => v + GRAVITY);
          return nextY;
        });
      }
      setObstacles((obs) =>
        obs
          .map((o) => ({ ...o, x: o.x - 4 }))
          .filter((o) => o.x + OBSTACLE_WIDTH > 0)
      );
      setParticles((ps) =>
        ps
          .map((p) => ({ ...p, y: p.y - 2 }))
          .filter((p) => p.y > 0)
      );
      setDistance((d) => d + 4);
      lastObstacleX.current -= 4;
      if (lastObstacleX.current <= 0) lastObstacleX.current = 0;
      if (lastObstacleX.current === 0 || nextObstacleGap.current === 0) {
        let gap = 180 + Math.floor(Math.random() * 140);
        const upcomingMilestones = sectionMilestones
          .map(m => GAME_WIDTH + m.score * 0.8 - distance)
          .filter(x => x > GAME_WIDTH && x < GAME_WIDTH + 600);
        for (const mx of upcomingMilestones) {
          if (Math.abs(mx - (GAME_WIDTH + gap)) < 60) {
            gap += 80;
          }
        }
        nextObstacleGap.current = gap;
        lastObstacleX.current = GAME_WIDTH + gap;
        setObstacles((obs) => {
          if (obs.length === 0 || obs[obs.length - 1].x < GAME_WIDTH - 120) {
            return [
              ...obs,
              {
                x: GAME_WIDTH,
                y: GROUND_Y,
                high: false,
                id: randomId(),
                emoji: getRandomObstacleEmoji(),
              },
            ];
          }
          return obs;
        });
      } else {
        nextObstacleGap.current -= 4;
      }
      setObstacles((obs) => {
        let hit = false;
        return obs.filter((o) => {
          if (
            !hitThisFrame.current &&
            o.x < 40 + CHAR_WIDTH &&
            o.x + OBSTACLE_WIDTH > 40 &&
            charY + (crouching ? CROUCH_HEIGHT : CHAR_HEIGHT) > o.y - OBSTACLE_HEIGHT / 2 &&
            charY < o.y + OBSTACLE_HEIGHT / 2 &&
            !jumping && !crouching
          ) {
            if (!hit) {
              hitThisFrame.current = true;
              hit = true;
              setGameOver(true);
              return false;
            }
          }
          return true;
        });
      });
      if (frame.current % 2 === 0) {
        setScore((s) => s + 10);
      }
      anim = requestAnimationFrame(loop);
    }
    anim = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(anim);
  }, [jumping, charY, velocity, playing, gameOver, crouching, sectionMilestones, distance, score]);

  useEffect(() => {
    if (gameOver) {
      onGameOver();
    }
  }, [gameOver, onGameOver]);

  useEffect(() => {
    if (!playing) return;
    if (!hasInitialized.current || gameOver) {
      setCharY(GROUND_Y);
      setJumping(false);
      setCrouching(false);
      setVelocity(0);
      setObstacles([]);
      setScore(0);
      setGameOver(false);
      setParticles([]);
      justDied.current = false;
      hitThisFrame.current = false;
      frame.current = 0;
      hasInitialized.current = true;
      lastReportedScore.current = 0;
      setDistance(0);
    }
  }, [playing, gameOver]);

  useEffect(() => {
    if (pendingMilestones.length > 0) {
      pendingMilestones.forEach((idx) => onMilestoneReached(idx));
      setPendingMilestones([]);
    }
  }, [pendingMilestones, onMilestoneReached]);

  useEffect(() => {
    if (!playing || gameOver) {
      triggeredMilestones.current.clear();
    }
  }, [playing, gameOver]);

  return (
    <div
      id="minigame-area"
      className="relative flex justify-center items-center w-full max-w-xs sm:max-w-md md:max-w-lg"
      style={{ height: GAME_HEIGHT, margin: "0 auto" }}
    >
      <div
        className="absolute left-0 right-0"
        style={{ top: GROUND_Y + CHAR_HEIGHT, height: 10, background: "#43B047" }}
      />
      <div
        className="absolute rounded-full bg-black/30 blur-sm"
        style={{ left: 48, top: charY + (crouching ? CROUCH_HEIGHT : CHAR_HEIGHT) - 4, width: 36, height: 10, opacity: jumping ? 0.3 : 0.6, transition: 'top 0.1s, opacity 0.1s' }}
      />
      <div
        className="absolute text-5xl select-none transition-transform duration-100"
        style={{ left: 40, top: charY, transform: `scaleX(-1) ${jumping ? 'rotate(-20deg)' : ''}` }}
      >
        <span style={{ display: "inline-block", transition: "transform 0.1s", transform: crouching ? "scaleY(0.5) scaleX(-1)" : "scaleY(1) scaleX(-1)" }}>
          👨‍💼
        </span>
      </div>
      {obstacles.map((o) => (
        <div
          key={o.id}
          className={`absolute text-4xl select-none transition-transform duration-200`}
          style={{ left: o.x, top: o.y + 10 }}
        >
          {o.emoji}
        </div>
      ))}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-lg select-none animate-ping"
          style={{ left: p.x, top: p.y, color: '#FFC107' }}
        >
          ✨
        </div>
      ))}
      {!playing && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-pixel-yellow text-2xl font-bold z-10">
          PAUSED
        </div>
      )}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-pixel-yellow text-2xl font-bold z-20">
          GAME OVER
        </div>
      )}
    </div>
  );
} 