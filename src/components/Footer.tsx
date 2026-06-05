/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Compass, Mail, Send, Activity, ShieldAlert, Globe } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative w-full bg-[#050608] px-6 py-12 md:py-16 border-t border-slate-900 overflow-hidden">
      {/* Background guidelines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.01)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pb-12 border-b border-slate-900/60">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 flex items-center justify-center border border-cyan-500/30 rounded-lg bg-slate-950/60 overflow-hidden">
                <div className="absolute inset-0 border border-t-amber-500 border-r-cyan-400 rounded-lg animate-spin-slow opacity-65" />
                <Compass className="w-4.5 h-4.5 text-cyan-400" />
              </div>
              <div>
                <span className="font-sans font-black text-sm tracking-widest text-[#FDFDFD] block uppercase">
                  AETHER
                </span>
                <span className="font-mono text-[8px] tracking-widest text-cyan-400 block uppercase">
                  SPACE & ARCH
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-500 max-w-sm leading-relaxed mt-2">
              Curating elite sustainable spatial living assets using parametric mathematical frameworks and quantum active thermal glazing. Handcrafted under rigorous architectural tolerances.
            </p>
          </div>

          {/* Col 2: Legal parameters links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-[9px] text-[#E4C87F] font-bold uppercase tracking-widest block">
              SYSTEM CHANNELS
            </span>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">PHILOSOPHY_01</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-cyan-400 transition-colors">PARCELS_METRIC</a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-cyan-400 transition-colors">TELEMETRY_DASH</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">ACQUISITION_FORMS</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter subscribe */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest block">
              DISCRETE BROADCAST LIST
            </span>
            <p className="font-sans text-xs text-slate-500 leading-relaxed mb-1">
              Subscribe to receive encrypted notifications of new ecological developmental releases. No trash logs.
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter discrete email..."
                className="w-full bg-slate-950/80 border border-slate-900 rounded-xl px-4 py-3 text-slate-100 font-sans text-xs focus:border-cyan-500/40 focus:outline-none pr-12 transition-colors"
              />

              <button
                type="submit"
                className="absolute right-2.5 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-950/80 text-cyan-400 hover:text-white transition-all cursor-pointer"
              >
                {subscribed ? (
                  <Activity className="w-4.5 h-4.5 animate-spin" />
                ) : (
                  <Send className="w-4.5 h-4.5" />
                )}
              </button>
            </form>

            {subscribed && (
              <span className="font-mono text-[10px] text-emerald-400 animate-pulse">
                BROADCAST TARGET ATTACHED SUCCESSFULLY.
              </span>
            )}
          </div>

        </div>

        {/* Bottom copyright coordinates disclosures */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5 grayscale opacity-75">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>DISCLAIMER: DESIGN ESTIMATIONS SUBJECT TO QUANTUM FLUID DYNAMIC TESTING // VER 2_1</span>
          </div>

          <span>© {new Date().getFullYear()} AETHER SPACE & DESIGN LABS, SG. ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
