/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Landmark, Globe, Compass, Send, CheckCircle2, ChevronRight, Activity, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { PROPERTY_CATEGORIES } from '../types'; // fallback of tags

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: 'Solaria Canopy Villa',
    liquidAssets: '10M-30M',
    notes: ''
  });

  const [activePlotId, setActivePlotId] = useState<string>('plot-1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mapCanvasRef = useRef<HTMLCanvasElement>(null);

  // Elite Plot list detailing coordinates
  const PLOTS = [
    { id: 'plot-1', name: 'Solaria Canopy Villa', x: 220, y: 150, r: 24, fill: '#06b6d4', status: 'Available' },
    { id: 'plot-2', name: 'Phyto-Biophilic Terraces', x: 120, y: 280, r: 35, fill: '#d4af37', status: 'Reserved' },
    { id: 'plot-3', name: 'Parametric Void Complex', x: 340, y: 240, r: 42, fill: '#14b8a6', status: 'Available' }
  ];

  // Interactive Blueprint Vector Map Engine
  useEffect(() => {
    if (!mapCanvasRef.current) return;
    const canvas = mapCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let angle = 0;

    const drawMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw CAD Architectural Guideline Grids
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.12)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Center Scope Circular Grid (Holographic radar sweep)
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Sweeping radar beam line
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(140, 0);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 3. Render Parcel Plots
      PLOTS.forEach((plot) => {
        const isSelected = plot.id === activePlotId;

        // Draw outer locator ring
        ctx.strokeStyle = isSelected ? '#06b6d4' : 'rgba(71, 85, 105, 0.35)';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.beginPath();
        ctx.arc(plot.x, plot.y, plot.r + (isSelected ? Math.sin(angle * 2) * 4 : 0), 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs targeting selectors inside outer rings
        ctx.strokeStyle = isSelected ? 'rgba(6, 182, 212, 0.6)' : 'rgba(71, 85, 105, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(plot.x - plot.r - 8, plot.y);
        ctx.lineTo(plot.x + plot.r + 8, plot.y);
        ctx.moveTo(plot.x, plot.y - plot.r - 8);
        ctx.lineTo(plot.x, plot.y + plot.r + 8);
        ctx.stroke();

        // Core dot glowing
        ctx.beginPath();
        ctx.arc(plot.x, plot.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = plot.fill;
        ctx.shadowBlur = isSelected ? 15 : 0;
        ctx.shadowColor = plot.fill;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Overlay Plot ID HUD label tags
        ctx.fillStyle = isSelected ? '#ffffff' : '#64748b';
        ctx.font = 'bold 9px JetBrains Mono';
        ctx.fillText(plot.name.split(' ')[0].toUpperCase(), plot.x - 25, plot.y - plot.r - 8);
      });

      angle += 0.012;
      animFrameId = requestAnimationFrame(drawMap);
    };

    drawMap();

    // Coordinate tactile parcel selector binding
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check which map circle coordinate contains click target
      for (const plot of PLOTS) {
        const dist = Math.hypot(clickX - plot.x, clickY - plot.y);
        if (dist <= plot.r + 10) {
          setActivePlotId(plot.id);
          setFormData((prev) => ({ ...prev, sector: plot.name }));
          break;
        }
      }
    };

    canvas.addEventListener('mousedown', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener('mousedown', handleCanvasClick);
    };
  }, [activePlotId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto update map target plots highlight circle upon dropdown update
    if (name === 'sector') {
      const matched = PLOTS.find((p) => p.name === value);
      if (matched) setActivePlotId(matched.id);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Clean inputs
      setFormData({ name: '', email: '', phone: '', sector: 'Solaria Canopy Villa', liquidAssets: '10M-30M', notes: '' });
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 bg-[#050608] px-6 overflow-hidden border-t border-slate-900"
    >
      <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title details */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="font-mono text-[10px] tracking-widest text-[#E4C87F] font-bold uppercase mb-3 block">
            07 // SECURE ACQUISITIONS MODULE
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-none mb-6">
            INITIATE ACQUISITIONS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-500">
              COMMUNICATION MATRIX
            </span>
          </h2>
          <p className="font-sans text-[#A2B3C9] text-sm leading-relaxed max-w-2xl mx-auto font-medium">
            Contact our spatial engineers to configure private parcel acquisitions, carbon neutral calculations, or schedule discrete VTOL transport tours.
          </p>
        </div>

        {/* Double Column HUD Segment layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Block: Modern Contact Form */}
          <div className="lg:col-span-7 bg-[#0B0C12]/80 p-6 sm:p-8 rounded-3xl border border-slate-900 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-[#E4C87F] uppercase tracking-widest block mb-4 font-bold">
                [ TRANSMISSION PORTS ]
              </span>
              <h3 className="font-sans font-black text-xl text-slate-100 tracking-tight mb-8">
                Verify Secure Credentials
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                        Full Name / Spherics ID
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Dame Veronique"
                        className="w-full bg-[#050608]/90 border border-slate-900 rounded-xl px-4 py-3 text-slate-100 font-sans text-sm focus:border-cyan-500/60 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                        Secure Neural Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. veronique@trust.com"
                        className="w-full bg-[#050608]/90 border border-slate-900 rounded-xl px-4 py-3 text-slate-100 font-sans text-sm focus:border-cyan-500/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                        Target Acquisition Parcel
                      </label>
                      <select
                        name="sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        className="w-full bg-[#050608]/90 border border-slate-900 rounded-xl px-4 py-3 text-slate-100 font-sans text-sm focus:border-cyan-500/60 focus:outline-none transition-colors"
                      >
                        <option value="Solaria Canopy Villa">Solaria Canopy Villa</option>
                        <option value="Phyto-Biophilic Terraces">Phyto-Biophilic Terraces</option>
                        <option value="Parametric Void Complex">Parametric Void Complex</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                        Target Liquidity Reserve Scale
                      </label>
                      <select
                        name="liquidAssets"
                        value={formData.liquidAssets}
                        onChange={handleInputChange}
                        className="w-full bg-[#050608]/90 border border-slate-900 rounded-xl px-4 py-3 text-slate-100 font-sans text-sm focus:border-cyan-500/60 focus:outline-none transition-colors"
                      >
                        <option value="10M-30M">$10M - $30M USD</option>
                        <option value="30M-50M">$30M - $50M USD</option>
                        <option value="50M+">$50M+ USD Premium Net</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">
                      Design Directives / Specifications
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Add custom molecular blueprint requirements, security preferences..."
                      className="w-full bg-[#050608]/90 border border-slate-900 rounded-xl px-4 py-3 text-slate-100 font-sans text-sm focus:border-cyan-500/60 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-slate-950 font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl shadow-cyan-500/5 duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin" />
                        Transmitting Encrypted Blueprint...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Initiate Secure Transmission
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6">
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="font-sans font-bold text-xl text-slate-100 mb-2">Transmission Successful</h4>
                  <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed mb-6">
                    Your design directives have been packaged and cryptographically transmitted to our executive officers. Spherics coordinates secured.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-300 rounded-xl font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer"
                  >
                    Transmit Another Document
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Vector CAD Map */}
          <div className="lg:col-span-5 bg-[#0B0C12]/80 rounded-3xl border border-slate-900 shadow-2xl p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest block mb-4 font-bold">
                [ HUD HOLOGRAPHIC BLUEPRINT ]
              </span>
              <h3 className="font-sans font-black text-xl text-slate-100 tracking-tight leading-none mb-1.5">
                CAD Interactive Map
              </h3>
              <p className="font-sans text-xs text-slate-400 mb-6">
                Click glowing coordinate hubs directly to load target blueprint specs
              </p>
            </div>

            {/* Canvas Sector map */}
            <div className="relative w-full aspect-square bg-[#050608] rounded-2xl border border-slate-950 overflow-hidden mb-6 flex items-center justify-center">
              <canvas
                ref={mapCanvasRef}
                width={450}
                height={450}
                className="w-full h-full max-w-full aspect-square pointer-events-auto cursor-crosshair"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-900">
              <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">
                General Social Coordinates
              </span>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 hover:text-cyan-400 hover:border-cyan-800/30 transition-all text-xs font-mono"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                  <span>CAD_NET</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 hover:text-amber-400 hover:border-amber-800/30 transition-all text-xs font-mono"
                >
                  <Twitter className="w-4.5 h-4.5" />
                  <span>BLUEPRINT_STREAM</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
