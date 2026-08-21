import React, { useState, useEffect } from 'react';
import AuroraCanvas from './components/AuroraCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import TradingDemoWidget from './components/TradingDemoWidget';
import ProjectsSection from './components/ProjectsSection';
import PhilosophySection from './components/PhilosophySection';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);

      // Compute total scroll percentage 0.0 -> 1.0
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);

      // Section Observer
      const sections = ['hero', 'skills', 'experience', 'trading-demo', 'projects', 'philosophy', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSkills = () => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-400 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* 2.5D Canvas Aurora Background + Traveler Silhouette */}
      <AuroraCanvas scrollProgress={scrollProgress} isScrolling={isScrolling} />

      {/* Glassmorphic Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={scrollToContact}
      />

      {/* Main Trail Sections */}
      <main className="relative z-10">
        <HeroSection onExploreClick={scrollToSkills} />
        <SkillsSection />
        <ExperienceSection />
        <TradingDemoWidget />
        <ProjectsSection />
        <PhilosophySection />
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Resume Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}

    </div>
  );
}
