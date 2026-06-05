/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Compass, Building2 } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

const STEPS = [
  { text: 'Accessing secure framework mainframe...', icon: Server, duration: 800 },
  { text: 'Compiling structural vector meshes...', icon: Cpu, duration: 1000 },
  { text: 'Stabilizing volumetric calculations...', icon: Compass, duration: 900 },
  { text: 'Assembling glassmorphic UI overlay...', icon: Building2, duration: 700 }
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 8 + 2;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(onComplete, 600); // Slight delay for elegant exit
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) {
      setActiveStep(0);
    } else if (progress < 55) {
      setActiveStep(1);
    } else if (progress < 80) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  }, [progress]);

  const CurrentIcon = STEPS[activeStep].icon;

  return (
    <div className="fixed inset-0 bg-[#06070a] z-50 flex flex-col justify-between p-8 overflow-hidden select-none">
      {/* Background Grid Canvas Effect */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60 pointer-events-none"
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(14,116,144,0.15),rgba(6,7,10,1))]"
      />

      {/* Header Telemetry Branding */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[10px] tracking-widest text-slate-400 font-bold">
            AETHER [STUDIO PORTAL v1.12_PRO]
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">
          SYS_STATUS: PRE_INITIALIZED
        </span>
      </div>

      {/* Center Cinematic Assembly Circle */}
      <div className="flex flex-col items-center justify-center z-10 transform -translate-y-4">
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          {/* Outer glowing progress wheel */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              className="stroke-slate-900 fill-none"
              strokeWidth="1.5"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              className="stroke-cyan-400 fill-none transition-all duration-300"
              strokeWidth="2.5"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Inner orbiting core */}
          <div className="absolute w-28 h-28 rounded-full border border-dashed border-amber-500/20 animate-spin-slow flex items-center justify-center" />
          
          {/* Futuristic glowing typography */}
          <div className="relative flex flex-col items-center">
            <span className="font-sans font-black text-4xl text-slate-100 tracking-tight">
              {progress}%
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-amber-400 mt-1">
              calibrating
            </span>
          </div>
        </div>

        {/* Dynamic status message stream with fade transitions */}
        <div className="h-12 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-900/80 backdrop-blur"
            >
              <CurrentIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-300 tracking-wide text-center">
                {STEPS[activeStep].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Architectural Blueprint Specs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 z-10 border-t border-slate-900/60 pt-4">
        <div className="flex gap-6 text-[10px] font-mono text-slate-500">
          <div>
            <span>LATITUDE:</span> <span className="text-slate-400">47.3769° N</span>
          </div>
          <div>
            <span>LONGITUDE:</span> <span className="text-slate-400">8.5417° E</span>
          </div>
          <div>
            <span>ALGORITHM:</span> <span className="text-slate-400 font-semibold">PARAMETRIC_FLOW</span>
          </div>
        </div>

        <span className="text-[10px] font-mono text-amber-500/80 tracking-widest uppercase">
          lux_estate_suite_loaded
        </span>
      </div>
    </div>
  );
}
