import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, Building2, ExternalLink, Zap, Layers } from 'lucide-react';

export default function ExperienceSection() {
  const [selectedExp, setSelectedExp] = useState(0);

  const experiences = [
    {
      company: 'boli.ae',
      role: 'Senior Frontend Engineer',
      period: 'Dec 2025 – Present',
      location: 'Dubai, UAE',
      tagline: 'Fast-growing PropTech Ecosystem Launch & Core Web Platform',
      color: 'from-emerald-500 to-teal-500',
      badge: 'Current Role',
      highlights: [
        'Spearheaded end-to-end frontend development and successful market launch of the core web platform for a fast-growing proptech ecosystem.',
        'Integrated Shufti KYC pipelines for automated real-time user identity verification, ensuring strict regulatory compliance and secure user onboarding.',
        'Implemented multiple secure payment gateways to facilitate high-value, frictionless digital transactions for Power of Attorney (POA) and automated property valuations.',
        'Diagnosed and resolved deeply embedded legacy SEO architecture and performance bottlenecks, substantially elevating organic search discoverability and boosting Core Web Vitals metrics.',
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'WebSockets', 'Shufti KYC', 'Payment Gateways', 'Core Web Vitals', 'Tailwind CSS'],
    },
    {
      company: 'Coinroutes',
      role: 'Senior Frontend Engineer',
      period: 'Sept 2024 – Dec 2025',
      location: 'Dubai, UAE',
      tagline: 'Institutional High-Frequency Real-Time Crypto Trading Platform',
      color: 'from-sky-500 to-blue-600',
      badge: 'Crypto Trading',
      highlights: [
        'Architected and delivered high-performance, real-time trading interfaces using React, TypeScript, and WebSockets for institutional users.',
        'Built and optimized live order books and market data views handling high-frequency updates with minimal UI latency.',
        'Migrated REST-based polling to WebSocket streaming, significantly improving responsiveness and reducing backend load during peak usage.',
        'Led frontend modernization by migrating Redux Saga to Redux Toolkit, reducing boilerplate, and converting entire JS codebase to TypeScript.',
        'Optimized trading charts by migrating from TradingView Advanced Charts to Lightweight Charts, improving load times while maintaining full feature parity.',
        'Designed synchronized candle + volume chart updates by coordinating API fetch cycles, eliminating inconsistent chart behavior.',
        'Implemented Ag-Grid server-side tables with dynamic layouts using flexlayout-react for advanced trading dashboards.',
      ],
      tech: ['React', 'TypeScript', 'WebSockets', 'Redux Toolkit', 'Lightweight Charts', 'Ag-Grid', 'FlexLayout', 'Real-time Streaming'],
    },
    {
      company: 'TNC IT Solutions',
      role: 'Senior Frontend Engineer',
      period: 'May 2023 – Sept 2024',
      location: 'Dubai, UAE',
      tagline: 'NFT Marketplace Serving 150,000+ Active Users & DEX Platform',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Web3 & DEX',
      highlights: [
        'Designed and launched a production NFT marketplace serving 150,000+ active users, including wallet integrations and secure transaction flows.',
        'Built real-time trading and marketplace features using React and Socket.IO.',
        'Built a decentralized exchange (DEX) frontend enabling real-time trading interactions.',
        'Developed scalable admin dashboards and analytics portals for blockchain platforms.',
        'Improved UI/UX and performance for multi-chain blockchain scanners, reducing transaction lookup times.',
      ],
      tech: ['React', 'Socket.IO', 'Wallet Integrations', 'Web3', 'DEX', 'NFT Marketplace', 'Blockchain Scanners'],
    },
    {
      company: 'CoolShop SRL',
      role: 'Senior Full Stack Developer',
      period: 'Aug 2022 – Apr 2023',
      location: 'Dubai, UAE',
      tagline: 'Marketing Microsites & Data Import Pipelines',
      color: 'from-amber-500 to-orange-600',
      badge: 'Full Stack',
      highlights: [
        'Built marketing microsites and dashboards using React and Salesforce CloudPages.',
        'Developed REST APIs and data import pipelines integrating Salesforce and SQL databases.',
        'Created reusable UI components to accelerate development across multiple projects.',
      ],
      tech: ['React', 'Salesforce CloudPages', 'REST APIs', 'SQL', 'Node.js', 'UI Component Library'],
    },
    {
      company: 'Freelance / Contract Roles',
      role: 'Full Stack Developer / Dev Manager',
      period: 'Dec 2021 – Aug 2022',
      location: 'Remote',
      tagline: 'Real Estate, FinTech & Travel Platforms',
      color: 'from-cyan-500 to-teal-600',
      badge: 'Contract',
      highlights: [
        'Built real estate, fintech, and travel booking platforms using React, TypeScript, and Node.js.',
        'Delivered property management dashboards, booking workflows, and admin portals.',
        'Integrated third-party services including payment gateways, email services, and AI-based document extraction.',
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'AI Doc Extraction', 'Stripe', 'Booking Portals'],
    },
    {
      company: 'Factweavers Technologies',
      role: 'Software Engineer',
      period: 'Sept 2020 – Nov 2021',
      location: 'India',
      tagline: 'Web Apps, Dashboards & Data Visualizations',
      color: 'from-pink-500 to-rose-600',
      badge: 'Enterprise',
      highlights: [
        'Developed production web applications, dashboards, and data visualization tools.',
        'Integrated payment gateways, built APIs, and modernized legacy frontend codebases.',
        'Mentored junior developers and contributed to architectural improvements.',
      ],
      tech: ['React', 'JavaScript', 'REST APIs', 'Data Visualization', 'Legacy Migration'],
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 pr-10 md:pr-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
          <span>CAREER EXPEDITIONS • 6+ YEARS IMPACT</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-outfit font-extrabold text-slate-100 tracking-tight">
          Professional <span className="aurora-text-gradient">Work History</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Proven track record of architecting low-latency, scalable web applications across UAE and global enterprise tech teams.
        </p>
      </div>

      {/* Experience Layout: Dual Pane View for Smooth Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Company Timeline Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col space-y-2">
          {experiences.map((exp, idx) => {
            const isSelected = selectedExp === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedExp(idx)}
                className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between group ${
                  isSelected
                    ? 'bg-slate-900/90 border-emerald-500/50 shadow-xl shadow-emerald-500/10'
                    : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-br ${exp.color} ${
                      isSelected ? 'ring-4 ring-emerald-500/20 animate-pulse' : 'opacity-60'
                    }`}
                  />
                  <div>
                    <h3 className={`font-outfit font-bold transition-colors ${isSelected ? 'text-emerald-300' : 'text-slate-200 group-hover:text-slate-100'}`}>
                      {exp.company}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{exp.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 block mb-1">
                    {exp.badge}
                  </span>
                  <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Experience Detail Card */}
        <div className="lg:col-span-8">
          {experiences[selectedExp] && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden animate-fade-in">
              
              {/* Background Accent Blur */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${experiences[selectedExp].color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono mb-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{experiences[selectedExp].company}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-100">
                    {experiences[selectedExp].role}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 font-medium">
                    {experiences[selectedExp].tagline}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1 text-xs font-mono text-slate-400 shrink-0">
                  <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{experiences[selectedExp].period}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 mt-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{experiences[selectedExp].location}</span>
                  </div>
                </div>
              </div>

              {/* Impact Bullet Points */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Key Frontend Deliverables & Engineering Accomplishments</span>
                </h4>
                {experiences[selectedExp].highlights.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>Tech Stack & Architecture</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experiences[selectedExp].tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/60 text-xs font-mono text-slate-200 hover:border-emerald-500/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </section>
  );
}
