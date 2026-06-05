/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ArrowLeft, ArrowRight, Landmark, Activity, User } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [ direction, setDirection ] = useState(0); // For sliding transitions

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const handlePrevSlide = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[activeIdx];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 sm:py-32 bg-[#06070a] px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Decorative layout outline guideline vectors */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.01)_1px,transparent_1px)] bg-[size:35px_35px] opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto z-10 relative flex flex-col items-center">
        
        {/* Title Badge segment */}
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] tracking-widest text-[#E4C87F] font-bold uppercase mb-3 block">
            06 // INTEGRATED AFFILIATES DISCLOSURE
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-none">
            RESONATING VERDICTS FROM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
              ELITE PORTFOLIO INVESTORS
            </span>
          </h2>
        </div>

        {/* Carousel slide card */}
        <div className="relative w-full min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="relative w-full p-8 md:p-12 rounded-3xl border border-slate-900/60 bg-[#0B0C12]/80 backdrop-blur shadow-2xl flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Spinning visual compass accent card */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center text-cyan-400">
                <Quote className="w-5 h-5" />
              </div>

              {/* Client portrait segment */}
              <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden border border-slate-800 p-1 bg-slate-950/80">
                {currentTestimonial.avatarUrl ? (
                  <img
                    src={currentTestimonial.avatarUrl}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-slate-500">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Descriptive Content */}
              <div className="flex-1 text-center md:text-left">
                <blockquote className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed font-medium italic mb-6">
                  "{currentTestimonial.quote}"
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-t border-slate-900/60 pt-6">
                  <div>
                    <h4 className="font-sans font-bold text-slate-100">
                      {currentTestimonial.name}
                    </h4>
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mt-0.5">
                      {currentTestimonial.role} // {currentTestimonial.company}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-900 self-center sm:self-auto shrink-0">
                    <Landmark className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-mono text-[10px] text-cyan-400 font-semibold uppercase">
                      {currentTestimonial.projectAcquired}
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls row */}
        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={handlePrevSlide}
            className="w-11 h-11 rounded-xl bg-slate-950/80 border border-slate-900 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Indicators dots and tracker labels */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > activeIdx ? 1 : -1);
                  setActiveIdx(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === i ? 'bg-cyan-400 w-6' : 'bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="w-11 h-11 rounded-xl bg-slate-950/80 border border-slate-900 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
