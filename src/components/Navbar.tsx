/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Menu, X, Layers, Landmark, BarChart3, Mail, Quote, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link visual indicator tracking
      const sections = ['hero', 'about', 'properties', '3d-viewer', 'services', 'testimonials', 'analytics', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Overview', id: 'hero', icon: Layers },
    { label: 'Philosophy', id: 'about', icon: HelpCircle },
    { label: 'Properties', id: 'properties', icon: Landmark },
    { label: '3D Sandbox', id: '3d-viewer', icon: Compass },
    { label: 'Engineering', id: 'services', icon: Layers },
    { label: 'Telemetry Stat', id: 'analytics', icon: BarChart3 },
    { label: 'Affiliates Unit', id: 'testimonials', icon: Quote },
    { label: 'Acquisitions Unit', id: 'contact', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#090a0f]/80 backdrop-blur-md border-b border-slate-900/60'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Elite Branding */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="relative w-9 h-9 flex items-center justify-center border border-cyan-500/30 rounded-lg bg-slate-950/60 overflow-hidden">
              {/* Spinning compass outline */}
              <div className="absolute inset-0 border border-t-amber-500 border-r-cyan-400 rounded-lg animate-spin-slow opacity-65" />
              <Compass className="w-4.5 h-4.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <span className="font-sans font-black text-sm tracking-widest text-[#FDFDFD] block">
                AETHER
              </span>
              <span className="font-mono text-[8px] tracking-widest text-cyan-400 block uppercase">
                SPACE & ARCH
              </span>
            </div>
          </button>

          {/* Desktop Nav Bar Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/40 p-1.5 rounded-full border border-slate-900/80 backdrop-blur-sm shadow-xl shadow-black/20">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`relative px-4 py-2 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-slate-100 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-950/50 via-slate-900/60 to-amber-950/30 border border-cyan-800/20 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Acquisitions Trigger CTA CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleLinkClick('contact')}
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-transparent hover:from-amber-500/20 hover:via-amber-500/25 border border-amber-500/40 hover:border-amber-500 text-amber-400 text-[10px] font-mono tracking-widest uppercase transition-all duration-500 shadow-lg shadow-amber-500/5 cursor-pointer"
            >
              Acquire Space
            </button>
          </div>

          {/* Interactive Mobile Hambuger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-950/70 border border-slate-900 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Matrix */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-0 bg-[#06070a]/98 z-30 lg:hidden flex flex-col pt-28 pb-12 px-6 justify-between overflow-hidden"
          >
            {/* Architectural decorative meshes */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:25px_25px] opacity-40 pointer-events-none" />

            <div className="flex flex-col gap-5 z-10">
              <span className="font-mono text-[9px] tracking-widest text-[#FDFDFD] opacity-40 uppercase">
                System Grid Coordinates
              </span>
              <nav className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleLinkClick(item.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left font-sans text-base font-semibold tracking-tight transition-all cursor-pointer ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-cyan-950/30 to-amber-950/20 border-cyan-500/30 text-cyan-400'
                          : 'bg-slate-950/40 border-slate-900/60 text-slate-300 hover:text-slate-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeSection === item.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Panel Metadata */}
            <div className="z-10 flex flex-col gap-4 border-t border-slate-900 pt-6">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-sans font-bold text-sm tracking-wide text-center transition-all cursor-pointer"
              >
                Inquire Acquisition
              </button>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                <span>VER: AETHER_SUITE_v1.0</span>
                <span>SEC_ID: {activeSection.toUpperCase()}_CELL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
