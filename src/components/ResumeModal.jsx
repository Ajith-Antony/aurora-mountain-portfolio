import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Code2, Award, CheckCircle2 } from 'lucide-react';

const Linkedin = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 1.47 1.47c0-.81-.66-1.47-1.47-1.47Z" />
  </svg>
);

export default function ResumeModal({ onClose }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Actions */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="font-outfit font-bold text-slate-100 text-sm">Ajith Pallissery Antony — Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-slate-200 print:text-black print:bg-white print:p-0">
          
          {/* Header Identity */}
          <div className="border-b border-slate-800 pb-6 print:border-gray-300">
            <h1 className="text-3xl sm:text-4xl font-outfit font-black text-slate-100 print:text-black">
              AJITH PALLISSERY ANTONY
            </h1>
            <h2 className="text-lg font-mono text-emerald-400 font-bold mt-1 print:text-emerald-700">
              SENIOR FRONTEND DEVELOPER
            </h2>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3 print:text-gray-700">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                ajithpallisseryantony@gmail.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                +971 589817188
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Dubai, UAE
              </span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                linkedin.com/in/ajithpallisseryantony/
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed print:text-gray-800">
              Senior Frontend Engineer with 6+ years of experience building and scaling high-performance, real-time web applications across proptech, trading, fintech, Web3, and enterprise platforms. Specialized in React and Next.js, with deep expertise in real-time data systems, WebSockets, performance optimization, and mobile-first UI architecture. Proven track record delivering low-latency, production-grade interfaces used during high-traffic and peak-event scenarios.
            </p>
          </div>

          {/* Core Technical Skills */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              CORE TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 print:border-gray-200">
                <strong className="text-emerald-400 block mb-1">Frontend:</strong>
                React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, WebSockets, REST APIs, SSR, CSR, Redux Toolkit, Redux Saga, Context API, Styled Components, Tailwind CSS, Material UI, Ant Design, Ag-Grid, TradingView Charts, Lightweight Charts.
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 print:border-gray-200">
                <strong className="text-sky-400 block mb-1">Backend & Web3:</strong>
                Node.js, Express, Fastify, MongoDB, PostgreSQL, SQL, Wallet Integrations, NFT Marketplaces, DEX, Shufti KYC Identity Verification.
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              PROFESSIONAL EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {/* boli.ae */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-outfit font-bold text-slate-100 text-base">boli.ae — Senior Frontend Engineer</h4>
                  <span className="text-xs font-mono text-slate-400">Dec 2025 – Present | Dubai, UAE</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  <li>Spearheaded end-to-end frontend development and successful market launch of core proptech platform.</li>
                  <li>Integrated Shufti KYC pipelines for automated real-time identity verification and regulatory compliance.</li>
                  <li>Implemented payment gateways for Power of Attorney (POA) and automated property valuations.</li>
                  <li>Diagnosed and resolved legacy SEO bottlenecks, boosting discoverability and Core Web Vitals.</li>
                </ul>
              </div>

              {/* Coinroutes */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-outfit font-bold text-slate-100 text-base">Coinroutes — Senior Frontend Engineer</h4>
                  <span className="text-xs font-mono text-slate-400">Sept 2024 – Dec 2025 | Dubai, UAE</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  <li>Architected real-time trading interfaces using React, TypeScript, and WebSockets for institutional users.</li>
                  <li>Built live order books & market data views handling high-frequency updates with minimal UI latency.</li>
                  <li>Migrated REST-based polling to WebSocket streaming; migrated Redux Saga to Redux Toolkit & JS to TypeScript.</li>
                  <li>Optimized trading charts to Lightweight Charts, improving load times while preserving feature parity.</li>
                </ul>
              </div>

              {/* TNC IT Solutions */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-outfit font-bold text-slate-100 text-base">TNC IT Solutions — Senior Frontend Engineer</h4>
                  <span className="text-xs font-mono text-slate-400">May 2023 – Sept 2024 | Dubai, UAE</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  <li>Launched production NFT marketplace serving 150,000+ active users with Web3 wallet integrations.</li>
                  <li>Built real-time trading features using Socket.IO and built DEX frontend enabling live trading.</li>
                  <li>Improved UI/UX and performance for multi-chain blockchain scanners.</li>
                </ul>
              </div>

              {/* CoolShop SRL */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-outfit font-bold text-slate-100 text-base">CoolShop SRL — Senior Full Stack Developer</h4>
                  <span className="text-xs font-mono text-slate-400">Aug 2022 – Apr 2023 | Dubai, UAE</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  <li>Built marketing microsites and dashboards using React and Salesforce CloudPages.</li>
                  <li>Developed REST APIs and data import pipelines connecting Salesforce and SQL databases.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              EDUCATION
            </h3>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-100">B.Tech in Computer Science & Engineering</strong> — APJ Abdul Kalam Technological University, Kerala, India (2016 – 2020)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
