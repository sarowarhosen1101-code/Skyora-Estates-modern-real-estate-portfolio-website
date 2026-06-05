/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import { ShieldCheck, Sparkles, HelpCircle, Activity } from 'lucide-react';
import { STATISTICS } from '../data';

export default function About() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 bg-[#06070a] px-6 overflow-hidden border-t border-slate-950"
    >
      {/* Blueprint wireframe layout vectors on background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.012)_0.5px,transparent_0.5px),linear-gradient(90deg,rgba(14,116,144,0.012)_0.5px,transparent_0.5px)] bg-[size:50px_50px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Portion: Philosophy Description block */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="font-mono text-[10px] tracking-widest text-[#E4C87F] font-bold uppercase mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              01 // DESIGN PHILOSOPHY
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-none mb-6">
              REVOLUTIONIZING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-500">
                PHYTO-PARAMETRIC LANDFORMS
              </span>
            </h2>

            <p className="font-sans text-[#A2B3C9] text-base leading-relaxed mb-6 font-medium">
              We operate at the volatile intersection of algorithmic geometry, passive energetic structures,
              and botanical organic integration. Our portfolio rejects standard linear blocks in favor of self-shading voids,
              dynamic cantilevered wings, and automated smart-glass microclimates that adapt instantly to external wind and lighting vectors.
            </p>

            <p className="font-sans text-slate-400 text-sm leading-relaxed mb-10">
              For active VIP portfolios, we configure entire ecosystems utilizing carbon-sequestering highrise bio-terraces, 
              custom structural solar glass, and private VTOL drone skyports, ensuring luxurious offline solitude with high-speed quantum network mesh backing.
            </p>

            {/* Architecture Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full border-t border-slate-900 pt-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-slate-200">Computational Aerodynamics</h4>
                  <p className="font-sans text-xs text-slate-500 mt-1">
                    Custom wind tunnel aerodynamic simulations shape every cantilever to generate natural structural draft cooling.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-950/40 border border-amber-800/30 text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-slate-200">Quantum Thermal Glazing</h4>
                  <p className="font-sans text-xs text-slate-500 mt-1">
                    Each window utilizes modular molecular systems storing sunlight directly to sustain temperature balances.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right portion: High-contrast preview viewport (luxury hovering card layout) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            {/* Tech-glitch frame outline */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-500/10 rounded-3xl blur-md -z-10" />

            <div className="relative w-full aspect-[4/5] rounded-3xl border border-slate-800/80 bg-slate-950/60 overflow-hidden group p-4 backdrop-blur-md">
              {/* Spinning framing elements */}
              <div className="absolute top-2 right-2 flex gap-1 bg-slate-900/80 px-2 py-1 rounded text-[8px] font-mono text-cyan-400 border border-slate-800/60 z-10">
                <span>VIEWPORT // 01</span>
              </div>

              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/src/assets/images/hero_luxury_villa_1780669272122.png"
                  alt="Aether Parametric Structure Preview"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded glassmorphic HUD overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/60 flex justify-between items-center z-10">
                  <div>
                    <span className="font-mono text-[9px] text-[#E4C87F] block font-bold">ACTIVE LANDSCAPE RENDER</span>
                    <h5 className="font-sans font-bold text-sm text-slate-100">Solaria Canopy Zenith</h5>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[9px] text-slate-500 block">EST. ACCURACY</span>
                    <span className="font-mono text-xs text-cyan-400 font-bold">99.82%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic statistics section (counters) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-24 border-t border-slate-900 pt-16">
          {STATISTICS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative p-6 rounded-2xl border border-slate-900 bg-slate-950/30 backdrop-blur hover:bg-slate-950/60 transition-all duration-300 overflow-hidden"
            >
              {/* Top micro glowing progress block */}
              {hoveredIdx === idx && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-amber-400 animate-pulse" />
              )}
              
              <span className="font-mono text-[9px] text-slate-500 block tracking-widest uppercase mb-2">
                {stat.timeframe}
              </span>
              
              <div className="flex items-baseline gap-2">
                <span className="font-sans font-black text-3xl sm:text-4xl text-slate-100 tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">
                  {stat.change}
                </span>
              </div>

              <h4 className="font-sans text-xs font-semibold text-slate-300 mt-3">
                {stat.label}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
