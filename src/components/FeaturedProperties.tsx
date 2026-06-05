/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Building, Layers, Eye, X, Ruler, Calendar, CheckSquare, Sparkle } from 'lucide-react';
import { PROPERTIES } from '../data';
import { Property } from '../types';

export default function FeaturedProperties() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProperties = PROPERTIES.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <section
      id="properties"
      className="relative w-full py-24 sm:py-32 bg-[#050608] px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Decorative cosmic neon ambient spots */}
      <div className="absolute top-1/2 right-0 w-[45vw] h-[45vw] bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[35vw] h-[35vw] bg-amber-950/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Dynamic header zone */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 font-bold uppercase mb-3 block">
              02 // LANDMARK MASTERPIECES
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-none">
              ACTIVE VIP PORTFOLIO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                DEVELOPMENT LANDS
              </span>
            </h2>
          </div>

          {/* Filtering buttons row */}
          <div className="flex gap-2 bg-slate-900/40 p-1 rounded-xl border border-slate-900 backdrop-blur-sm shadow-xl self-stretch md:self-auto justify-center">
            {(['all', 'residential', 'commercial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-gradient-to-r from-cyan-500/20 to-amber-500/25 border border-cyan-500/50 text-[#FDFDFD]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modular Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onMouseEnter={() => setHoveredProduct(prop.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="relative rounded-3xl border border-slate-900 bg-[#0B0C12]/80 overflow-hidden group hover:border-slate-800 transition-all duration-500 flex flex-col justify-between p-4 backdrop-blur shadow-2xl shadow-black/45"
              >
                {/* Embedded dynamic layout drafting lines on hover */}
                {hoveredProduct === prop.id && (
                  <div className="absolute inset-x-4 top-0 h-[0.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                )}

                {/* Imagery container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 border border-slate-800/80 text-cyan-400 font-mono text-[8px] tracking-widest rounded-full uppercase font-bold z-10 select-none">
                    {prop.style}
                  </span>
                  
                  <img
                    src={prop.imageUrl}
                    alt={prop.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* High-tech glass hover drape */}
                  <div className="absolute inset-0 bg-[#06070a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-xs">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="px-5 py-2.5 bg-[#d4af37] text-slate-950 rounded-xl font-sans font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5 hover:bg-amber-400 transition-colors shadow-xl shadow-amber-500/10 cursor-pointer"
                    >
                      <Eye className="w-4.5 h-4.5" />
                      View Blueprint Spec
                    </button>
                  </div>
                </div>

                {/* Labeling meta */}
                <div className="px-2 flex-grow">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-mono text-[10px] text-slate-500 tracking-wide">
                      {prop.location}
                    </span>
                    <span className="font-mono text-[9px] text-[#E4C87F] font-bold">
                      {prop.energyRating}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-lg text-slate-100 leading-none mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {prop.name}
                  </h3>

                  {/* Standard sizing attributes layout */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-900 text-slate-400 mb-6">
                    <div className="flex flex-col items-center border-r border-slate-900/60 pb-1">
                      <span className="font-mono text-[9px] text-slate-500 uppercase">SPACE</span>
                      <span className="font-sans text-xs text-slate-200 mt-1 font-semibold">{prop.size}</span>
                    </div>
                    <div className="flex flex-col items-center border-r border-slate-900/60 pb-1">
                      <span className="font-mono text-[9px] text-slate-500 uppercase">SUITES</span>
                      <span className="font-sans text-xs text-slate-200 mt-1 font-semibold">{prop.bedrooms > 0 ? `${prop.bedrooms} Bed` : 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center pb-1">
                      <span className="font-mono text-[9px] text-slate-500 uppercase">COORD</span>
                      <span className="font-mono text-[9px] text-cyan-400 mt-1 font-bold">{prop.coordinates.x}° N</span>
                    </div>
                  </div>
                </div>

                {/* Footer segment: price + spec trigger */}
                <div className="flex justify-between items-center px-2 pt-2 gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 block uppercase font-bold">Inquire Investment</span>
                    <span className="font-sans font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#ECEFF4] to-slate-400">
                      {prop.price}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedProperty(prop)}
                    className="px-4 py-2 bg-slate-950 border border-slate-900 hover:border-cyan-500 text-slate-300 hover:text-[#FDFDFD] rounded-xl font-mono text-[9px] tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Luxury blueprint spec-sheet modal viewport trigger */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#000000]/92 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#090A0C] border border-slate-800/80 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
                
                {/* Left col: Image and spec sheets */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-800/60">
                    <img
                      src={selectedProperty.imageUrl}
                      alt={selectedProperty.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-slate-950/80 border border-[#d4af37]/40 text-amber-400 rounded-lg text-[9px] font-mono uppercase tracking-widest font-semibold">
                      VERIFIED SPECIFICATION SHEET
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-900">
                      <span className="font-mono text-[8px] text-slate-500 uppercase block">BUILD YEAR</span>
                      <span className="font-sans font-bold text-sm text-slate-200 block mt-1">{selectedProperty.yearBuilt}</span>
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-900">
                      <span className="font-mono text-[8px] text-slate-500 uppercase block">DIMENSIONAL METRIC</span>
                      <span className="font-sans font-bold text-sm text-slate-200 block mt-1">{selectedProperty.size}</span>
                    </div>

                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-900">
                      <span className="font-mono text-[8px] text-slate-500 uppercase block">POWER INDEX</span>
                      <span className="font-sans font-bold text-sm text-[#06b6d4] block mt-1">{selectedProperty.energyRating}</span>
                    </div>
                  </div>
                </div>

                {/* Right col: specs specs lists */}
                <div className="lg:col-span-5 flex flex-col h-full justify-between">
                  <div>
                    <span className="font-mono text-[9px] font-bold tracking-widest text-[#d4af37] uppercase">
                      COORDINATES {selectedProperty.coordinates.x}° N // {selectedProperty.coordinates.y}° E
                    </span>
                    <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-100 tracking-tight leading-tight mt-1 mb-2">
                      {selectedProperty.name}
                    </h2>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                      Luxury suite crafted based on advanced architectural simulations, providing optimal spatial integrity and deep acoustic insulation.
                    </p>

                    <h4 className="font-sans text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                      Architectural Innovations
                    </h4>
                    <div className="space-y-2 mb-6">
                      {selectedProperty.features.map((feature, i) => (
                        <div key={i} className="flex gap-2.5 items-start">
                          <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="font-sans text-xs text-slate-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {selectedProperty.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-950/60 border border-slate-900 text-slate-400 text-[9px] font-mono tracking-wide rounded-md">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-900 pt-6 mt-8 flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase block">Target Pricing</span>
                        <span className="text-2xl font-black font-sans text-slate-100">{selectedProperty.price}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                        SECURE LIQUIDITY PREPARED
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProperty(null);
                        const contactSec = document.getElementById('contact');
                        contactSec?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-4.5 rounded-xl bg-[#d4af37] text-slate-950 hover:bg-amber-400 font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-lg cursor-pointer"
                    >
                      Inquire Acquisition Portal
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
