import React from 'react';
import { Zap, ShieldCheck, HeartHandshake, Code2, Compass } from 'lucide-react';

export default function PhilosophySection() {
  const principles = [
    {
      title: 'Performance-First Mindset',
      icon: Zap,
      color: 'text-amber-400',
      gradient: 'from-amber-500/20 to-yellow-500/10',
      borderColor: 'group-hover:border-amber-500/40',
      description:
        'Architecting for sub-second page loads, minimal UI latency, and smooth 60fps rendering in high-frequency trading and high-traffic proptech platforms.',
    },
    {
      title: 'Pragmatic Code Over Over-Engineering',
      icon: Code2,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'group-hover:border-emerald-500/40',
      description:
        'Prioritizing clean, readable TypeScript, predictable state management (RTK), modular architecture, and pragmatic testing that provides real production value.',
    },
    {
      title: 'Uncompromising UX & Production Stability',
      icon: ShieldCheck,
      color: 'text-sky-400',
      gradient: 'from-sky-500/20 to-blue-500/10',
      borderColor: 'group-hover:border-sky-500/40',
      description:
        'Building mobile-first, responsive interfaces with accessible design patterns, strict error boundaries, and zero-downtime production stability.',
    },
    {
      title: 'Ownership-Driven Collaboration',
      icon: HeartHandshake,
      color: 'text-purple-400',
      gradient: 'from-purple-500/20 to-indigo-500/10',
      borderColor: 'group-hover:border-purple-500/40',
      description:
        'Taking end-to-end product ownership, collaborating closely with backend engineers on API contracts, WebSocket payloads, and payment gateway security.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>ENGINEERING CODE & VALUES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-100 tracking-tight">
          Core Engineering <span className="aurora-text-gradient">Philosophy</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Guiding principles for delivering resilient, high-performance web applications that scale seamlessly.
        </p>
      </div>

      {/* Grid of Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 transition-all ${p.borderColor} group relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${p.gradient} rounded-full blur-2xl pointer-events-none`} />

              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl bg-slate-900 border border-slate-800 ${p.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                  {p.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
