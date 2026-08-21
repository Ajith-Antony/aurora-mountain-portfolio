import React from 'react';
import { ArrowDown, MapPin, Sparkles, Activity, ShieldCheck, Zap, Layers, ChevronDown } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  const metrics = [
    { icon: Zap, label: 'Experience', value: '6+ Years', detail: 'React, Next.js, TS' },
    { icon: Activity, label: 'High Traffic', value: '150K+ Users', detail: 'WebSockets & DEX' },
    { icon: Layers, label: 'Core Vitals', value: '100% Optimized', detail: 'Sub-second Load' },
    { icon: ShieldCheck, label: 'Domains', value: 'PropTech & Trading', detail: 'Web3 & Fintech' },
  ];

  return (
    <section id="hero" className="min-h-screen relative flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Top Banner Tag */}
      <div className="flex flex-col items-start space-y-5 max-w-3xl mt-4 sm:mt-12 pr-12 md:pr-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-mono tracking-wider shadow-lg shadow-emerald-500/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>AURORA EXPEDITION • SENIOR FRONTEND ENGINEER</span>
        </div>

        {/* Main Name Heading */}
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-outfit font-black tracking-tight text-slate-100 leading-[1.15]">
          AJITH PALLISSERY <br />
          <span className="aurora-text-gradient aurora-glow-lg">ANTONY</span>
        </h1>

        {/* Subtitle & Role */}
        <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed">
          Senior Frontend Developer specialized in <span className="text-emerald-400 font-semibold">React</span>, <span className="text-sky-400 font-semibold">Next.js</span>, and <span className="text-purple-400 font-semibold">Real-Time WebSockets</span>.
        </p>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Building and scaling high-performance, real-time web applications across proptech, crypto trading, Web3, and enterprise platforms in Dubai, UAE. Proven track record delivering production-grade interfaces handling high-frequency data streaming during peak traffic.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onExploreClick}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 text-sm font-bold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <span>Begin Mountain Trail</span>
            <ArrowDown className="w-4 h-4" />
          </button>
          
          <a
            href="https://linkedin.com/in/ajithpallisseryantony/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-all hover:border-slate-500 flex items-center gap-2"
          >
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Metrics Bar Overlay */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-8">
        {metrics.map((m, idx) => {
          const IconComponent = m.icon;
          return (
            <div
              key={idx}
              className="glass-card p-4 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{m.label}</span>
                <IconComponent className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-outfit font-extrabold text-slate-100 group-hover:text-emerald-300 transition-colors">
                  {m.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{m.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div className="flex flex-col items-center justify-center pt-4">
        <button
          onClick={onExploreClick}
          className="group flex flex-col items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <span className="font-mono tracking-widest uppercase text-[11px]">Scroll To Hike Mountain Trail</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-700 group-hover:border-emerald-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-3 bg-emerald-400 rounded-full animate-bounce mt-1" />
          </div>
        </button>
      </div>

    </section>
  );
}
