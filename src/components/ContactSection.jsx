import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, FileText, X, Award, GraduationCap } from 'lucide-react';

const Linkedin = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 1.47 1.47c0-.81-.66-1.47-1.47-1.47Z" />
  </svg>
);

export default function ContactSection({ onOpenResume }) {
  const [copiedField, setCopiedField] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const contactDetails = [
    { label: 'Email', value: 'ajithpallisseryantony@gmail.com', type: 'email', link: 'mailto:ajithpallisseryantony@gmail.com', icon: Mail },
    { label: 'Phone', value: '+971 589817188', type: 'phone', link: 'tel:+971589817188', icon: Phone },
    { label: 'Location', value: 'Dubai, UAE', type: 'location', link: null, icon: MapPin },
    { label: 'LinkedIn', value: 'linkedin.com/in/ajithpallisseryantony/', type: 'linkedin', link: 'https://linkedin.com/in/ajithpallisseryantony/', icon: Linkedin },
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
          <Send className="w-3.5 h-3.5 text-emerald-400" />
          <span>SUMMIT BASECAMP • GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-100 tracking-tight">
          Let’s Build Something <span className="aurora-text-gradient">Extraordinary</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Available for Senior Frontend Engineering leadership roles, consulting, and high-frequency real-time web application builds in Dubai & globally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Contact Info & Education (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            const isCopied = copiedField === item.label;
            return (
              <div
                key={idx}
                className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono text-slate-400">{item.label}</div>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.type === 'linkedin' ? '_blank' : '_self'}
                        rel="noreferrer"
                        className="text-sm font-semibold text-slate-200 hover:text-emerald-300 transition-colors truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-slate-200 truncate">{item.value}</div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(item.value, item.label)}
                  title={`Copy ${item.label}`}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all shrink-0 ml-2"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            );
          })}

          {/* Education & Degree Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/90 mt-6">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>EDUCATION</span>
            </div>
            <h4 className="font-outfit font-extrabold text-slate-100 text-base">
              B.Tech in Computer Science & Engineering
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              APJ Abdul Kalam Technological University, Kerala, India (2016 – 2020)
            </p>
          </div>

          {/* Download Resume Banner Card */}
          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900 flex items-center justify-between">
            <div>
              <h4 className="font-outfit font-bold text-slate-100 text-sm">Full Technical Resume</h4>
              <p className="text-xs text-slate-400 mt-0.5">View formatted PDF summary & credentials</p>
            </div>
            <button
              onClick={onOpenResume}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
            </button>
          </div>

        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h3 className="text-2xl font-outfit font-bold text-slate-100 mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Have a project requirement or leadership role? Send a message directly to Ajith.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center animate-fade-in space-y-3">
                <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-outfit font-bold text-slate-100 text-lg">Message Delivered!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. Ajith will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Senior Frontend Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Ajith, I saw your portfolio website..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <footer className="mt-20 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} Ajith Pallissery Antony. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#hero" className="hover:text-emerald-400 transition-colors">Summit Top ↑</a>
          <span>•</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>

    </section>
  );
}
