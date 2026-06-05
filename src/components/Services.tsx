/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Leaf, Cpu, ShieldCheck, Hammer, Sparkles, Network } from 'lucide-react';
import { SERVICES } from '../data';

const iconMap: Record<string, any> = {
  Compass: Compass,
  Leaf: Leaf,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck
};

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative w-full py-24 sm:py-32 bg-[#06070a] px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Decorative layout grids background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] tracking-widest text-[#E4C87F] font-bold uppercase mb-3 block">
            04 // COMPREHENSIVE REPERTOIRE
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-none mb-6">
            ARCHITECTURAL ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              OPERATIONS SUITE
            </span>
          </h2>
          <p className="font-sans text-[#A2B3C9] text-sm sm:text-base leading-relaxed font-semibold">
            Deploying high-end automated systems and generative structural calculations to construct self-optimizing residential structures.
          </p>
        </div>

        {/* Bento Service Cards Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Compass;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative p-8 rounded-3xl border border-slate-900 bg-[#0B0C12]/80 overflow-hidden backdrop-blur-md hover:border-slate-800 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Custom glowing dynamic ambient highlight inside */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    opacity: hoveredIdx === index ? 1 : 0
                  }}
                />

                {/* Aesthetic index label */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center text-cyan-400">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 font-bold">
                    [ MODULE_0{index + 1} ]
                  </span>
                </div>

                {/* Descriptions details */}
                <div className="mb-8">
                  <h3 className="font-sans font-black text-xl text-slate-100 tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#A2B3C9] leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Sub technical stack markers */}
                <div className="border-t border-slate-900/80 pt-6">
                  <span className="font-mono text-[8px] text-slate-500 tracking-wider uppercase block mb-3">
                    Core Technical Stacks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-950/60 border border-slate-950 text-[10px] text-slate-400 rounded-lg hover:text-cyan-400 hover:border-cyan-800/30 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Network className="w-3 h-3 text-[#d4af37]/60 shrink-0" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
