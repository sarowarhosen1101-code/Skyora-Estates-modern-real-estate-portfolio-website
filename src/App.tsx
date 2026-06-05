/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ShieldCheck, Cpu, Compass, HelpCircle, Layers, MapPin, Activity } from 'lucide-react';

// Subcomponents imports
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProperties from './components/FeaturedProperties';
import ThreeDShowcase from './components/ThreeDShowcase';
import Services from './components/Services';
import StatsDashboard from './components/StatsDashboard';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleSmoothNavigation = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white overflow-hidden">
      {/* 1. Interactive Loader portal */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* 2. Custom Glowing Pointer Tracker */}
          <Cursor />

          {/* 3. Floating Sticky Header */}
          <Navbar onNavigate={handleSmoothNavigation} />

          {/* 4. Fullscreen Video-Like Atmospheric Hero */}
          <Hero onScrollToNext={handleSmoothNavigation} />

          {/* 5. Company Philosophy Section */}
          <About />

          {/* 6. Active Luxury Portfolio Collection Filter Grid */}
          <FeaturedProperties />

          {/* 7. Dedicated Interactive 3D Showcase Section Sandbox */}
          <section
            id="3d-viewer"
            className="relative w-full py-24 sm:py-32 bg-[#06070a] px-6 overflow-hidden border-t border-slate-900"
          >
            {/* Background vector grids */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-950/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto z-10 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Left Side: 3D interactive viewport */}
                <div className="lg:col-span-7 h-[500px] sm:h-[600px] w-full min-h-[450px]">
                  <ThreeDShowcase />
                </div>

                {/* Right Side: Informational spatial specifications panel */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-slate-900 bg-[#0B0C12]/80 backdrop-blur shadow-2xl">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-[#E4C87F] font-bold uppercase mb-3 block">
                      03 // REAL-TIME 3D SANDBOX
                    </span>
                    <h2 className="font-sans font-black text-2xl sm:text-4xl text-slate-100 tracking-tight leading-none mb-6">
                      ALGORITHMIC <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
                        DESIGN SANDBOX
                      </span>
                    </h2>

                    <p className="font-sans text-[#A2B3C9] text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                      Simulate actual engineering conditions on our flagship volumetric structure. Toggle render previews directly inside the visualizer viewport to inspect framing parameters, thermal dissipation channels, and structural wind stresses.
                    </p>

                    {/* Integrated structural details bullet lists */}
                    <div className="space-y-4 font-sans text-xs">
                      <div className="flex gap-3 pb-3 border-b border-slate-900/60">
                        <Cpu className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-200">Active Blueprint Matrix</h4>
                          <p className="text-slate-500 mt-0.5">Toggle wireframe guides illustrating support columns tolerances.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 pb-3 border-b border-[#1e293b]/40">
                        <Activity className="w-4.5 h-4.5 text-[#d4af37] shrink-0 animate-pulse" />
                        <div>
                          <h4 className="font-bold text-slate-200">Thermal Sweep Sensor</h4>
                          <p className="text-slate-500 mt-0.5">Execute active heat signatures to inspect kinetic canopy vent efficiencies.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Compass className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-200">Orbital Orientation Sweep</h4>
                          <p className="text-slate-500 mt-0.5">Tactile mouse drag control rotates the camera coordinate projection.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-900/60 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 text-center sm:text-left">
                    <div>
                      <span>GEO_COORD:</span> <span className="text-slate-400 font-semibold">47.37° N // 8.54° E</span>
                    </div>

                    <button
                      onClick={() => handleSmoothNavigation('contact')}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 hover:border-amber-400 text-amber-400 rounded-xl tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      Acquire This Design
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 8. Modern engineering service details panels */}
          <Services />

          {/* 9. Compounding yields analytics charts */}
          <StatsDashboard />

          {/* 10. Sliding reviews carousel */}
          <Testimonials />

          {/* 11. Custom Contact Sector Map & Secured Form */}
          <Contact />

          {/* 12. Corporate footer block with subscription portals */}
          <Footer />
        </>
      )}
    </div>
  );
}
