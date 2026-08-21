import React, { useState } from 'react';
import { Search, Code2, Server, ShieldCheck, Database, Wrench, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: 'All Skills', icon: Sparkles },
    { id: 'Frontend', label: 'Frontend Mastery', icon: Code2 },
    { id: 'Backend', label: 'Backend & APIs', icon: Server },
    { id: 'Web3', label: 'Web3 & Security', icon: ShieldCheck },
    { id: 'Databases', label: 'Databases', icon: Database },
    { id: 'Tooling', label: 'Tooling & Vitals', icon: Wrench },
  ];

  const skillData = [
    // Frontend
    { name: 'React.js', category: 'Frontend', level: 98, experience: '6+ Years', highlight: 'Hooks, Custom Architecture, Micro-frontends', icon: '⚛️' },
    { name: 'Next.js', category: 'Frontend', level: 95, experience: '4+ Years', highlight: 'App Router, SSR, SSG, ISR, SEO Optimization', icon: '▲' },
    { name: 'TypeScript', category: 'Frontend', level: 95, experience: '5+ Years', highlight: 'Strict Typing, Generics, Codebase Migrations', icon: '📘' },
    { name: 'WebSockets & Socket.IO', category: 'Frontend', level: 96, experience: '5+ Years', highlight: 'Real-time Live Orderbooks, High Frequency Data', icon: '⚡' },
    { name: 'Redux Toolkit / Saga', category: 'Frontend', level: 92, experience: '5+ Years', highlight: 'State Modernization, RTK Query, Async Flows', icon: '🔄' },
    { name: 'Lightweight Charts / TradingView', category: 'Frontend', level: 94, experience: '3+ Years', highlight: 'Financial Candlestick Charts, Sub-second Updates', icon: '📈' },
    { name: 'Ag-Grid & FlexLayout', category: 'Frontend', level: 90, experience: '3+ Years', highlight: 'Institutional Trading Tables, Server-side Data', icon: '📊' },
    { name: 'Tailwind CSS & Styled Components', category: 'Frontend', level: 96, experience: '6+ Years', highlight: 'Design Systems, Glassmorphism, Responsive UI', icon: '🎨' },
    { name: 'JavaScript (ES6+)', category: 'Frontend', level: 98, experience: '6+ Years', highlight: 'Async Performance, Memory Profiling, Event Loop', icon: '💛' },

    // Backend
    { name: 'Node.js', category: 'Backend', level: 88, experience: '4+ Years', highlight: 'REST Services, Event-driven Pipelines', icon: '🟢' },
    { name: 'Express.js', category: 'Backend', level: 88, experience: '4+ Years', highlight: 'API Routing, Auth Middleware, Microservices', icon: '🚂' },
    { name: 'Fastify', category: 'Backend', level: 84, experience: '2+ Years', highlight: 'Low-overhead High Throughput Endpoints', icon: '🚀' },
    { name: 'REST APIs & GraphQL', category: 'Backend', level: 92, experience: '6+ Years', highlight: 'API Contract Design, Polling vs Streaming', icon: '🌐' },

    // Web3 & Security
    { name: 'Wallet Integrations', category: 'Web3', level: 90, experience: '3+ Years', highlight: 'Ethers.js, Wagmi, MetaMask, WalletConnect', icon: '🦊' },
    { name: 'NFT Marketplaces & DEX', category: 'Web3', level: 88, experience: '3+ Years', highlight: '150k+ Active Users Trading Engine', icon: '💎' },
    { name: 'Shufti KYC Verification', category: 'Web3', level: 92, experience: '2+ Years', highlight: 'Real-time Identity Pipelines, Compliance', icon: '🆔' },
    { name: 'Payment Gateways', category: 'Web3', level: 94, experience: '4+ Years', highlight: 'Stripe, Crypto Payments, POA Valuations', icon: '💳' },

    // Databases
    { name: 'MongoDB', category: 'Databases', level: 86, experience: '4+ Years', highlight: 'Aggregation Pipelines, Schema Design', icon: '🍃' },
    { name: 'PostgreSQL & SQL', category: 'Databases', level: 85, experience: '4+ Years', highlight: 'Indexing, Complex Queries, Salesforce Sync', icon: '🐘' },

    // Tooling
    { name: 'Core Web Vitals & SEO', category: 'Tooling', level: 96, experience: '6+ Years', highlight: 'Sub-second LCP, CLS 0, Performance Audits', icon: '⚡' },
    { name: 'Webpack & Vite', category: 'Tooling', level: 92, experience: '5+ Years', highlight: 'Tree Shaking, Code Splitting, Bundle Tuning', icon: '📦' },
    { name: 'Docker & Git Workflows', category: 'Tooling', level: 88, experience: '5+ Years', highlight: 'CI/CD Pipelines, Modular Codebase Architecture', icon: '🐳' },
  ];

  const filteredSkills = skillData.filter((skill) => {
    const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 pr-10 md:pr-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-mono mb-3">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>TECHNICAL MATRIX & ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-outfit font-extrabold text-slate-100 tracking-tight">
          Core Engineering <span className="aurora-text-gradient">Expertise</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Specialized skill set built over 6+ years of designing real-time, high-frequency, and production-grade web applications.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 w-full md:w-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-300 border border-emerald-500/40 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="glass-card p-5 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 group flex flex-col justify-between"
          >
            <div>
              {/* Skill Top Bar */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <div>
                    <h3 className="font-outfit font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400/90">{skill.experience}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                  {skill.category}
                </span>
              </div>

              {/* Highlight Note */}
              <p className="text-xs text-slate-400 mb-4 leading-relaxed flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{skill.highlight}</span>
              </p>
            </div>

            {/* Proficiency Meter */}
            <div>
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-1">
                <span>Proficiency Level</span>
                <span className="text-emerald-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-sky-400 to-purple-400 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
