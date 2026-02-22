'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const { m } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const hasTyped = useRef(false);

  const fullText = m.founder?.role || 'Founder & CIO';
  const tags: string[] = m.founder?.tags || [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Big W animation
    const bigW = section.querySelector('.big-w');
    if (bigW) {
      gsap.fromTo(bigW, { x: -200, opacity: 0 }, {
        x: 0, opacity: 0.04, duration: 1.5, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 30%', scrub: 1 },
      });
    }

    // Tags fly in
    const tagEls = section.querySelectorAll('.tag');
    tagEls.forEach((tag, i) => {
      gsap.fromTo(tag, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, delay: 0.3 + i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 50%', toggleActions: 'play none none none' },
      });
    });

    // Typewriter trigger
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        if (hasTyped.current) return;
        hasTyped.current = true;
        setShowCursor(true);
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setTyped(fullText.slice(0, i));
          if (i >= fullText.length) clearInterval(interval);
        }, 60);
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [fullText]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden py-32 px-4 sm:px-8">
      {/* Giant decorative W */}
      <div className="big-w absolute left-[-5vw] top-1/2 -translate-y-1/2 text-[clamp(20rem,50vw,50rem)] font-black text-white opacity-0 leading-none select-none pointer-events-none">
        W
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <h2 className="text-[clamp(4rem,10vw,9rem)] font-black leading-[0.9] tracking-tighter mb-4">
          {m.founder?.name || 'Wesley'}
        </h2>

        <p className={`text-lg md:text-2xl text-white/50 font-light mb-8 ${showCursor ? 'typewriter-cursor' : ''}`}>
          {typed}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="tag px-5 py-2.5 rounded-full border border-white/10 text-sm md:text-base text-white/60 bg-white/[0.02] backdrop-blur-sm opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Social link */}
        <a
          href="https://x.com/CryptoApprentil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-10 text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          @CryptoApprentil
        </a>
      </div>
    </section>
  );
}
