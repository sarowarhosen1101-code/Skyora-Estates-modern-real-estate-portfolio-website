/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Compass, ShieldCheck, ArrowDown, Activity, Globe } from 'lucide-react';

interface HeroProps {
  onScrollToNext: (sectionId: string) => void;
}

export default function Hero({ onScrollToNext }: HeroProps) {
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!particlesCanvasRef.current) return;
    const canvas = particlesCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
    }> = [];

    // Initialize smart dust architectural vectors
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.55 ? '#06b6d4' : '#d4af37',
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render architectural guideline beams
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.02)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      // Render glowing nodes
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce back from boundaries
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        // Join nodes within vicinity to represent wireframe grids
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color === p2.color && p.color === '#06b6d4'
              ? 'rgba(6, 182, 212, 0.04)'
              : 'rgba(212, 175, 55, 0.03)';
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#050608] px-6 overflow-hidden pt-20"
    >
      {/* Dynamic guidelines background canvas drawing */}
      <canvas ref={particlesCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cybernetic glowing atmospheric spots */}
      <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] max-w-[600px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/5 right-1/4 w-[40vw] h-[40vw] max-w-[500px] bg-amber-950/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Aesthetic layout helper grids */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4.5vh] pointer-events-none" />

      {/* Floating HUD Specifications */}
      <div className="absolute left-6 bottom-32 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-slate-500 tracking-wider">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>SYS_LATENCY: 4.80MS</span>
        </div>
        <span>LOCATION: ZURICH BASIN, COLD ZONE // PRO-BUILD</span>
      </div>

      <div className="absolute right-6 bottom-32 hidden xl:flex flex-col gap-1 font-mono text-[9px] text-slate-500 tracking-wider text-right">
        <div className="flex items-center gap-1.5 justify-end">
          <span>ALBEDO ROTATION SPEC: SEC_5</span>
          <Globe className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <span>ENCRYPTED SECURE ACQUISITION LINK ENGAGED</span>
      </div>

      {/* Inner Central Title Segment */}
      <div className="max-w-4xl text-center z-10 flex flex-col items-center">
        {/* Futuristic glowing badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-cyan-500/30 backdrop-blur-md mb-8"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400 rotate-45 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FDFDFD] font-bold">
            Redefining High-End Spatial Spherics
          </span>
        </motion.div>

        {/* Cinematic displaying headlines */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FDFDFD] via-[#ECEFF4] to-slate-400 leading-none mb-6"
        >
          THE FUTURE OF <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#E4C87F] to-amber-500">
            ELITE ARCHITECTURE
          </span>
        </motion.h1>

        {/* Sophisticated subtitle sentence */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-[#A3B3C9] text-base sm:text-lg max-w-2xl leading-relaxed mb-10 text-center font-medium"
        >
          Curating high-end bespoke residences utilizing quantum eco-structural design,
          glassmorphic cantilevered volumes, and passive microclimate physics.
        </motion.p>

        {/* Double high-tech button triggers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => onScrollToNext('properties')}
            className="px-8 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-slate-950 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Masterpieces
          </button>

          <button
            onClick={() => onScrollToNext('3d-viewer')}
            className="px-8 py-4 rounded-xl font-sans font-bold text-xs tracking-widest uppercase border border-slate-700/60 hover:bg-slate-900/50 hover:border-slate-500 text-slate-100 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            Launch 3D Viewer
          </button>
        </motion.div>
      </div>

      {/* Floating guidelines status widgets on lower portion */}
      <div className="absolute bottom-12 flex flex-col items-center">
        <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase animate-pulse mb-3">
          SCROLL_TO_ENTER_BLUEPRINT
        </span>
        <button
          onClick={() => onScrollToNext('about')}
          className="w-10 h-10 rounded-full bg-slate-950/80 border border-slate-900 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all duration-300 cursor-pointer shadow-lg animate-bounce"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
