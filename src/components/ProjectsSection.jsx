import React from 'react';
import { ExternalLink, Layers, ShieldCheck, Zap, Globe, Sparkles, Building2, TrendingUp } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'boli.ae — Core PropTech Ecosystem',
      category: 'PropTech & Real Estate',
      icon: Building2,
      color: 'from-emerald-500 to-teal-500',
      description:
        'Spearheaded the end-to-end frontend development and successful market launch of the core web platform. Integrated Shufti KYC pipelines for real-time identity verification, payment gateways for Power of Attorney (POA), and legacy SEO architecture optimization.',
      highlights: [
        'Shufti KYC Real-Time Pipeline Integration',
        'Secure Payment Gateways for POA & Property Valuations',
        'Core Web Vitals & Legacy SEO Overhaul',
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'WebSockets', 'Shufti KYC', 'Tailwind CSS'],
      metrics: 'Core Web Vitals Boosted • High Traffic',
    },
    {
      title: 'Coinroutes — Institutional Trading Terminal',
      category: 'Crypto & Trading UI',
      icon: TrendingUp,
      color: 'from-sky-500 to-blue-600',
      description:
        'Architected high-frequency, real-time trading interfaces using React, TypeScript, and WebSockets. Built live order books, migrated REST polling to WebSocket streaming, converted codebase to TypeScript, and optimized charts to Lightweight Charts.',
      highlights: [
        'Live Orderbooks & WebSocket Streaming',
        'Lightweight Charts & Ag-Grid Server Tables',
        'Redux Saga -> Redux Toolkit Migration',
      ],
      tech: ['React', 'TypeScript', 'WebSockets', 'Redux Toolkit', 'Lightweight Charts', 'Ag-Grid'],
      metrics: 'Sub-12ms Latency • Parity Maintained',
    },
    {
      title: 'TNC IT — 150k+ Active User NFT Marketplace & DEX',
      category: 'Web3 & Blockchain',
      icon: ShieldCheck,
      color: 'from-purple-500 to-indigo-600',
      description:
        'Launched a production NFT marketplace serving 150,000+ active users. Developed real-time trading features using Socket.IO, multi-chain blockchain scanner interfaces, and a decentralized exchange (DEX) frontend.',
      highlights: [
        '150,000+ Active Wallet Users',
        'Real-time Socket.IO Trading Engine',
        'Multi-chain Scanner UI Performance Tuning',
      ],
      tech: ['React', 'Socket.IO', 'Web3 Wallets', 'DEX', 'NFT Marketplace', 'Smart Contracts'],
      metrics: '150K+ Users • Multi-Chain Scanner',
    },
    {
      title: 'CoolShop SRL — Salesforce CloudPages Enterprise Hub',
      category: 'Enterprise & Full Stack',
      icon: Layers,
      color: 'from-amber-500 to-orange-500',
      description:
        'Built marketing microsites and analytics dashboards using React and Salesforce CloudPages. Developed REST APIs and data import pipelines connecting Salesforce and SQL databases.',
      highlights: [
        'Salesforce CloudPages Integration',
        'SQL Data Import Pipelines',
        'Reusable Component Library',
      ],
      tech: ['React', 'Salesforce CloudPages', 'REST APIs', 'SQL', 'Node.js'],
      metrics: 'Enterprise Data Pipelines',
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 pr-10 md:pr-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-mono mb-3">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>PRODUCTION PLATFORMS & PORTFOLIO</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-outfit font-extrabold text-slate-100 tracking-tight">
          Featured <span className="aurora-text-gradient">Projects & Architecture</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          A selection of production-grade platforms built and architected for high scale, real-time performance, and seamless user experiences.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => {
          const Icon = project.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-slate-800">
                    {project.metrics}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-outfit font-extrabold text-slate-100 group-hover:text-emerald-300 transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="border-t border-slate-800/80 pt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
