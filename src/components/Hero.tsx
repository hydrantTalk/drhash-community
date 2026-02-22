'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/* Ace of Spades SVG decoration */
function AceOfSpades({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="118" height="168" rx="8" stroke="rgba(142,124,195,0.15)" strokeWidth="1" fill="rgba(142,124,195,0.03)" />
      <text x="12" y="28" fontSize="16" fontWeight="bold" fill="rgba(142,124,195,0.25)" fontFamily="Georgia,serif">A</text>
      <text x="12" y="44" fontSize="14" fill="rgba(255,255,255,0.15)" fontFamily="Georgia,serif">♠</text>
      <text x="60" y="100" fontSize="48" textAnchor="middle" fill="rgba(255,255,255,0.08)" fontFamily="Georgia,serif">♠</text>
      <text x="108" y="158" fontSize="16" fontWeight="bold" fill="rgba(142,124,195,0.25)" textAnchor="end" fontFamily="Georgia,serif" transform="rotate(180 108 150)">A</text>
    </svg>
  );
}

/* Floating symbol icons row */
const heroIcons = ['♠', '₿', '♦', '$', '♣', '📈', '♥', '#'];

export default function Hero() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge
      tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      // Title line 1
      tl.fromTo('.hero-line1', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.2');
      // Title line 2
      tl.fromTo('.hero-line2', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.5');
      // Icon strip
      tl.fromTo('.hero-icons span', { opacity: 0, y: 15, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05 }, '-=0.3');
      // Tagline
      tl.fromTo('.hero-tagline', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
      // Cards decoration
      tl.fromTo('.ace-left', { opacity: 0, x: -40, rotation: -20 }, { opacity: 1, x: 0, rotation: -12, duration: 0.8 }, '-=0.6');
      tl.fromTo('.ace-right', { opacity: 0, x: 40, rotation: 20 }, { opacity: 1, x: 0, rotation: 12, duration: 0.8 }, '-=0.7');

      // Parallax on scroll
      gsap.to(content, {
        y: -80,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: '80% top', scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* Video background - landscape (desktop/tablet) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        <source src={`/wesley-avatar.mp4`} type="video/mp4" />
      </video>

      {/* Video background - portrait (mobile) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none block sm:hidden"
        aria-hidden="true"
      >
        <source src={`/wesley-avatar-portrait.mp4`} type="video/mp4" />
      </video>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/70 via-transparent to-[#050508]/90 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/50 via-transparent to-[#050508]/50 pointer-events-none z-[1]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] max-w-[500px] aspect-square rounded-full bg-purple-600/8 blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] max-w-[400px] aspect-square rounded-full bg-pink-500/6 blur-[100px] pointer-events-none z-[1]" />

      {/* Ace cards decoration */}
      <div className="ace-left absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 opacity-0 hidden sm:block">
        <AceOfSpades className="w-[80px] md:w-[100px] lg:w-[120px] h-auto" />
      </div>
      <div className="ace-right absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 opacity-0 hidden sm:block">
        <AceOfSpades className="w-[80px] md:w-[100px] lg:w-[120px] h-auto" />
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 backdrop-blur-sm mb-8 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-purple-300/90">{m.hero.badge}</span>
        </div>

        {/* Title - Split into two lines with different styles */}
        <div className="mb-6">
          <h1 className="hero-line1 text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-tighter opacity-0">
            <span className="text-white/90 font-light tracking-wide" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>DR.</span>
          </h1>
          <h1
            className="hero-line2 glitch text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.85] tracking-tighter opacity-0"
            data-text="HASH"
          >
            <span className="text-purple-hero">HASH</span>
          </h1>
        </div>

        {/* Floating icon strip */}
        <div className="hero-icons flex items-center justify-center gap-3 sm:gap-5 mb-6">
          {heroIcons.map((icon, i) => (
            <span
              key={i}
              className="text-base sm:text-lg md:text-xl opacity-0"
              style={{
                color: icon === '₿' ? '#F7931A' : icon === '♥' || icon === '♦' ? '#EF4444' : icon === '$' ? '#22C55E' : 'rgba(142,124,195,0.5)',
                animation: `float 4s ease-in-out ${i * 0.3}s infinite`,
              }}
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="hero-tagline text-sm sm:text-base md:text-lg tracking-[0.2em] uppercase text-white/40 font-light opacity-0">
          {m.hero.tagline}
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-purple-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
