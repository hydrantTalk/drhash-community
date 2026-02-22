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
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const sub = subRef.current;
    if (!section || !title || !sub) return;

    // Entry animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(title, { opacity: 0, scale: 0.8, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 });
    tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');

    // Scroll-driven: shrink + fade out
    gsap.to(title, {
      scale: 0.5,
      opacity: 0,
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
    gsap.to(sub, {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '20% top',
        end: '60% top',
        scrub: 1,
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[120vh] flex items-center justify-center overflow-hidden scanlines">
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/8 blur-[130px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div ref={titleRef}>
          <h1
            className="glitch text-[clamp(4rem,15vw,14rem)] font-black leading-[0.9] tracking-tighter"
            data-text="DR.HASH"
          >
            DR.HASH
          </h1>
        </div>
        <div ref={subRef} className="mt-6 md:mt-8">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-white/40 font-light">
            {m.hero.sub}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-purple-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
