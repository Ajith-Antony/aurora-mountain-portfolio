import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download, MapPin, Compass, Sparkles, FileText, Send } from 'lucide-react';
import { ambientAudio } from '../utils/audioSynth';

export default function Navbar({ activeSection, scrollProgress, onOpenResume, onOpenContact }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = ambientAudio.toggle();
    setIsAudioPlaying(newState);
  };

  const navLinks = [
    { id: 'hero', label: 'Overview', icon: Compass },
    { id: 'skills', label: 'Expertise', icon: Sparkles },
    { id: 'experience', label: 'Expeditions', icon: Compass },
    { id: 'trading-demo', label: 'Real-Time UI', icon: Sparkles },
    { id: 'philosophy', label: 'Philosophy', icon: Compass },
    { id: 'contact', label: 'Summit Base', icon: Send },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Top Trail Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-800/50 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Profile Branding Badge */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-outfit font-bold text-lg group-hover:scale-105 transition-transform">
              AA
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full animate-pulse" />
          </div>
          <div>
            <div className="font-outfit font-bold text-slate-100 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
              Ajith P. Antony
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 rounded-md">
                Senior FE
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400 inline" />
              Dubai, UAE • 6+ Yrs Exp
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls: Audio Synth Toggle & Resume Modal */}
        <div className="flex items-center gap-2.5">
          {/* Audio Ambient Synth Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioPlaying ? 'Mute Arctic Wind Sound' : 'Play Ambient Arctic Wind Sound'}
            className={`p-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
              isAudioPlaying
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline font-mono text-[11px]">Audio ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline font-mono text-[11px]">Audio</span>
              </>
            )}
          </button>

          {/* Download/View Resume */}
          <button
            onClick={onOpenResume}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all flex items-center gap-1.5 group"
          >
            <FileText className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="hidden xs:inline">Resume</span>
          </button>

          {/* Direct Contact Button */}
          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-95 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>
        </div>

      </div>
    </header>
  );
}
