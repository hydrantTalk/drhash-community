'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';
import ParticleBackground from './ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const els = content.children;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(els[0], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    tl.fromTo(els[1], { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '-=0.3');
    tl.fromTo(els[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
    tl.fromTo(els[3], { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');

    // Parallax on scroll
    gsap.to(content, {
      y: -80,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: '80% top', scrub: 1 },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden scanlines">
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] max-w-[500px] aspect-square rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] max-w-[400px] aspect-square rounded-full bg-pink-500/8 blur-[100px] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-purple-300/80">{m.hero.badge}</span>
        </div>

        {/* Title */}
        <h1
          className="glitch text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter mb-5"
          data-text="DR.HASH"
        >
          DR.HASH
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-white/30 font-light mb-6">
          {m.hero.sub}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-white/40 max-w-lg mx-auto leading-relaxed">
          {m.hero.desc}
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-purple-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
