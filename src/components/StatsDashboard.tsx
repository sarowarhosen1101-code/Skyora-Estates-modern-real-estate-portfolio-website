/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { BarChart3, TrendingUp, Sparkles, Sliders, BatteryCharging, RefreshCw } from 'lucide-react';

const ASSET_GROWTH_DATA = [
  { year: '2021', Solaria: 8.5, Phyto: 11.2, Parametric: 22.0 },
  { year: '2022', Solaria: 10.2, Phyto: 13.8, Parametric: 26.5 },
  { year: '2023', Solaria: 12.8, Phyto: 16.1, Parametric: 30.1 },
  { year: '2024', Solaria: 15.0, Phyto: 19.5, Parametric: 35.8 },
  { year: '2025', Solaria: 16.9, Phyto: 22.1, Parametric: 39.2 },
  { year: '2026', Solaria: 18.4, Phyto: 24.5, Parametric: 42.0 }
];

const ECOLOGICAL_INDEX_DATA = [
  { name: 'Self-Shading Voids', value: 92 },
  { name: 'Hydro-Recycler Basin', value: 85 },
  { name: 'Quantum Solar Glaze', value: 96 },
  { name: 'Passive Wind Drafts', value: 89 },
  { name: 'Active Bio-Mass Net', value: 94 }
];

export default function StatsDashboard() {
  const [activePropertyKey, setActivePropertyKey] = useState<'Solaria' | 'Phyto' | 'Parametric'>('Solaria');

  const propertyDetails = {
    Solaria: { name: 'Solaria Canopy Villa', currentVal: '$18.4M', compoundYield: '+14.2%', footprintOffset: '94.8% Net-Zero' },
    Phyto: { name: 'Phyto-Biophilic Terraces', currentVal: '$24.5M', compoundYield: '+18.1%', footprintOffset: '98.5% Net-Zero' },
    Parametric: { name: 'Parametric Void Complex', currentVal: '$42.0M', compoundYield: '+21.5%', footprintOffset: '91.2% Net-Zero' }
  };

  return (
    <section
      id="analytics"
      className="relative w-full py-24 sm:py-32 bg-[#050608] px-6 overflow-hidden border-t border-slate-900"
    >
      <div className="absolute top-0 right-1/4 w-[35vw] h-[35vw] bg-cyan-950/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-[#E4C87F] font-bold uppercase mb-3 block">
              05 // REAL-TIME METRICS & TELEMETRY
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-slate-100 tracking-tight leading-none">
              SPATIAL VALUATIONS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#E4C87F] to-amber-500">
                & ANALYTICS MATRIX
              </span>
            </h2>
          </div>

          <div className="flex gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-900/80">
            {(['Solaria', 'Phyto', 'Parametric'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActivePropertyKey(key)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  activePropertyKey === key
                    ? 'bg-gradient-to-r from-cyan-500/10 to-amber-500/15 border-cyan-800/10 border text-[#FDFDFD] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main area growth chart block */}
          <div className="lg:col-span-8 p-6 rounded-3xl border border-slate-900 bg-[#0B0C12]/80 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-sans font-black text-lg text-slate-100 flex items-center gap-1.5 leading-none">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Asset Compounding Valuation Trend
                  </h3>
                  <p className="font-sans text-xs text-slate-400 mt-1">
                    Value growth projection trends since construction baseline (expressed in $ Millions)
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[9px] text-[#E4C87F] uppercase block font-bold">Annual Target Net</span>
                  <span className="font-mono text-xs text-cyan-400 font-bold">{propertyDetails[activePropertyKey].compoundYield}</span>
                </div>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ASSET_GROWTH_DATA}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPhyto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.25} vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="#475569"
                    fontSize={10}
                    fontFamily="JetBrains Mono"
                    tickLine={false}
                    axisLine={{ stroke: '#334155', strokeWidth: 0.5 }}
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={10}
                    fontFamily="JetBrains Mono"
                    tickLine={false}
                    axisLine={{ stroke: '#334155', strokeWidth: 0.5 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 6, 8, 0.9)',
                      border: '1px solid rgba(71, 85, 105, 0.5)',
                      borderRadius: '12px',
                    }}
                    labelStyle={{ fontFamily: 'JetBrains Mono', color: '#64748b', fontSize: '9px' }}
                    itemStyle={{ fontFamily: 'Inter', color: '#f8fafc', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Area
                    type="monotone"
                    dataKey={activePropertyKey}
                    stroke={activePropertyKey === 'Phyto' ? '#d4af37' : '#06b6d4'}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#${activePropertyKey === 'Phyto' ? 'colorPhyto' : 'colorValuation'})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between items-center border-t border-slate-900 pt-4 mt-6">
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">
                ACTIVE UNIT: {propertyDetails[activePropertyKey].name.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] text-[#06b6d4] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                LIVE QUANTUM DATAFRESH
              </span>
            </div>
          </div>

          {/* Radar carbon offsets index block */}
          <div className="lg:col-span-4 p-6 rounded-3xl border border-slate-900 bg-[#0B0C12]/80 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-black text-lg text-slate-100 flex items-center gap-1.5 leading-none mb-2">
                <BatteryCharging className="w-5 h-5 text-amber-500 animate-pulse" />
                Active Offsite Indices
              </h3>
              <p className="font-sans text-xs text-slate-400">
                Eco-autonomy parameters measured dynamically in real time
              </p>
            </div>

            {/* Simulated ecological circular index gauge */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Visual holographic circle tracker layout */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="88" cy="88" r="80" className="stroke-slate-950 fill-none" strokeWidth="6" />
                  <circle cx="88" cy="88" r="80" className="stroke-[#d4af37] fill-none transition-all duration-1000" strokeWidth="6" strokeDasharray="502" strokeDashoffset="60" />
                </svg>

                <div className="text-center">
                  <span className="font-mono text-[9px] text-slate-500 uppercase block">AUTONOMY IND</span>
                  <span className="font-sans font-black text-3xl text-slate-100 block">
                    {propertyDetails[activePropertyKey].footprintOffset.split(' ')[0]}
                  </span>
                  <span className="font-mono text-[9px] text-emerald-400 mt-1 block">RATED NET-ZERO</span>
                </div>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-slate-900 pt-6">
              <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">
                Autonomy Metrics
              </span>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Solar Energy Density</span>
                <span className="font-mono text-cyan-400 font-bold">96%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Bio-purifier Efficiency</span>
                <span className="font-mono text-[#d4af37] font-bold">94%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Geothermal Index</span>
                <span className="font-mono text-emerald-400 font-bold">92%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
