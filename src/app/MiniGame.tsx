"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 300;
const GRAVITY = 0.5;
const FLAP_STRENGTH = -8;
const PIPE_WIDTH = 50;
const PIPE_SPEED = 3.5;
const HOLE_HEIGHT = 120;
const CHAR_WIDTH = 36;
const CHAR_HEIGHT = 36;
const CHAR_X = 100;
const SPAWN_INTERVAL_X = 250;

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const [charY, setCharY] = useState(GAME_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState<{ x: number, gapTop: number, passed: boolean, id: string }[]>([]);

  const charYRef = useRef(GAME_HEIGHT / 2);
  const velRef = useRef(0);
  const pipesRef = useRef<{ x: number, gapTop: number, passed: boolean, id: string }[]>([]);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const reqRef = useRef<number>(undefined);
  const distanceRef = useRef(0);

  // Track milestones
  const triggeredMilestones = useRef<Set<number>>(new Set());

  // Init highscore
  useEffect(() => {
    const hs = sessionStorage.getItem("minigame-highscore");
    if (hs && Number(hs) > highScore) {
      onScore(Number(hs));
    }
  }, [highScore, onScore]);

  // Scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        setScale(Math.min(1, Math.max(0.3, (parentWidth - 32) / GAME_WIDTH)));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Controls
  const flap = useCallback(() => {
    if (gameOverRef.current || !playing) return;
    velRef.current = FLAP_STRENGTH;
    setVelocity(FLAP_STRENGTH);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const handleDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        if (e.target === document.body || (e.target as HTMLElement).tagName === "BUTTON") {
          e.preventDefault();
        }
        flap();
      }
    };
    window.addEventListener("keydown", handleDown, { passive: false });
    return () => window.removeEventListener("keydown", handleDown);
  }, [flap, playing]);

  useEffect(() => {
    if (!playing) return;
    const handleTap = (e: TouchEvent) => {
      e.preventDefault();
      flap();
    };
    const area = document.getElementById('minigame-area');
    if (area) {
      area.addEventListener('touchstart', handleTap, { passive: false });
      return () => area.removeEventListener('touchstart', handleTap);
    }
  }, [flap, playing]);

  // Game Reset on Start
  useEffect(() => {
    if (playing) {
      charYRef.current = GAME_HEIGHT / 2;
      velRef.current = 0;
      pipesRef.current = [];
      scoreRef.current = 0;
      distanceRef.current = 0;
      gameOverRef.current = false;
      triggeredMilestones.current.clear();

      setCharY(GAME_HEIGHT / 2);
      setVelocity(0);
      setPipes([]);
    }
  }, [playing]);

  // Game Loop
  useEffect(() => {
    if (!playing || gameOverRef.current) return;

    let lastTime = performance.now();

    const update = (time: number) => {
      if (gameOverRef.current) return;
      const dt = time - lastTime;
      lastTime = time;

      const dtMult = Math.min(dt / 16.666, 2.5);

      velRef.current += GRAVITY * dtMult;
      charYRef.current += velRef.current * dtMult;

      distanceRef.current += PIPE_SPEED * dtMult;
      if (distanceRef.current > SPAWN_INTERVAL_X) {
        distanceRef.current = 0;
        const gapTop = Math.random() * (GAME_HEIGHT - HOLE_HEIGHT - 60) + 30;
        pipesRef.current.push({
          x: GAME_WIDTH,
          gapTop,
          passed: false,
          id: Math.random().toString(36).substring(2, 9)
        });
      }

      pipesRef.current = pipesRef.current.map(p => {
        p.x -= PIPE_SPEED * dtMult;
        return p;
      }).filter(p => p.x + PIPE_WIDTH > 0);

      const cy = charYRef.current;
      const r_char = { x: CHAR_X, y: cy, w: CHAR_WIDTH - 6, h: CHAR_HEIGHT - 6 }; // hitbox 

      if (cy < 0 || cy + CHAR_HEIGHT > GAME_HEIGHT) {
        gameOverRef.current = true;
      }

      pipesRef.current.forEach(p => {
        // top pipe
        if (r_char.x < p.x + PIPE_WIDTH && r_char.x + r_char.w > p.x && r_char.y < p.gapTop) {
          gameOverRef.current = true;
        }
        // bottom pipe
        if (r_char.x < p.x + PIPE_WIDTH && r_char.x + r_char.w > p.x && r_char.y + r_char.h > p.gapTop + HOLE_HEIGHT) {
          gameOverRef.current = true;
        }

        // Score 
        if (!p.passed && p.x + PIPE_WIDTH < r_char.x) {
          p.passed = true;
          // Increment score
          scoreRef.current += 10;
          onScore(scoreRef.current);

          // Check milestones
          sectionMilestones.forEach((m, idx) => {
            if (scoreRef.current >= m.score && !triggeredMilestones.current.has(idx)) {
              triggeredMilestones.current.add(idx);
              onMilestoneReached(idx);
            }
          });
        }
      });

      setCharY(charYRef.current);
      setPipes([...pipesRef.current]);
      setVelocity(velRef.current);

      if (gameOverRef.current) {
        onGameOver();
      } else {
        reqRef.current = requestAnimationFrame(update);
      }
    };

    reqRef.current = requestAnimationFrame(update);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [playing, onGameOver, onScore, sectionMilestones, onMilestoneReached]);

  return (
    <div
      className="w-full flex justify-center items-center overflow-hidden brutal-border border-x-0 bg-[#87CEEB] relative"
      ref={containerRef}
      style={{ height: GAME_HEIGHT * scale }}
    >
      {/* Clouds / Background spans entire width */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute top-10 left-[10%] w-20 h-8 bg-white rounded-full blur-md opacity-80" />
        <div className="absolute top-20 left-[60%] w-32 h-12 bg-white rounded-full blur-md opacity-70" />
        <div className="absolute top-8 left-[80%] w-16 h-6 bg-white rounded-full blur-md opacity-90" />
      </div>

      <div
        id="minigame-area"
        className="relative overflow-hidden"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          touchAction: "none"
        }}
      >

        {/* Character */}
        <div
          className="absolute select-none transition-transform"
          style={{
            left: CHAR_X,
            top: charY,
            transform: `rotate(${Math.min(Math.max(velocity * 4, -25), 90)}deg)`
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="0" width="20" height="20" fill="#FBD000" shapeRendering="crispEdges" />
            <rect x="0" y="20" width="36" height="16" fill="#049CD8" shapeRendering="crispEdges" />
            <rect x="12" y="4" width="4" height="4" fill="#000" shapeRendering="crispEdges" />
            <rect x="24" y="4" width="4" height="4" fill="#000" shapeRendering="crispEdges" />
            <rect x="16" y="12" width="12" height="4" fill="#000" shapeRendering="crispEdges" />
          </svg>
        </div>

        {/* Pipes */}
        {pipes.map(p => (
          <div key={p.id}>
            {/* Top Pipe */}
            <div
              className="absolute bg-[#73bf2e] border-4 border-black"
              style={{
                left: p.x,
                top: -4,
                width: PIPE_WIDTH,
                height: p.gapTop + 4
              }}
            >
              <div className="absolute bottom-0 left-[-4px] right-[-4px] h-6 bg-[#73bf2e] border-4 border-black border-b-0" />
            </div>

            {/* Bottom Pipe */}
            <div
              className="absolute bg-[#73bf2e] border-4 border-black"
              style={{
                left: p.x,
                top: p.gapTop + HOLE_HEIGHT,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT - (p.gapTop + HOLE_HEIGHT) + 4
              }}
            >
              <div className="absolute top-0 left-[-4px] right-[-4px] h-6 bg-[#73bf2e] border-4 border-black border-t-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}