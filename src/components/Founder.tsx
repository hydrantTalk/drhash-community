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

  const fullText = m.founder?.desc || '';
  const tags: string[] = m.founder?.tags || [];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Big W fade in
    const bigW = section.querySelector('.big-w');
    if (bigW) {
      gsap.fromTo(bigW, { x: -80, opacity: 0 }, {
        x: 0, opacity: 0.03, duration: 1,
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 30%', scrub: 1 },
      });
    }

    // Name + role slide in
    const nameEl = section.querySelector('.founder-name');
    const roleEl = section.querySelector('.founder-role');
    if (nameEl) {
      gsap.fromTo(nameEl, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7,
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      });
    }
    if (roleEl) {
      gsap.fromTo(roleEl, { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7, delay: 0.15,
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      });
    }

    // Tags fly in
    const tagEls = section.querySelectorAll('.tag');
    tagEls.forEach((tag, i) => {
      gsap.fromTo(tag, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, delay: 0.4 + i * 0.1,
        scrollTrigger: { trigger: section, start: 'top 55%', toggleActions: 'play none none none' },
      });
    });

    // Typewriter
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      onEnter: () => {
        if (hasTyped.current) return;
        hasTyped.current = true;
        setShowCursor(true);
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setTyped(fullText.slice(0, i));
          if (i >= fullText.length) clearInterval(interval);
        }, 35);
      },
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [fullText]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Decorative W */}
      <div className="big-w absolute left-[-3vw] top-1/2 -translate-y-1/2 text-[clamp(12rem,30vw,28rem)] font-black text-white opacity-0 leading-none select-none pointer-events-none">
        W
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Name */}
        <h2 className="founder-name text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter mb-2">
          {m.founder?.name || 'Wesley'}
        </h2>

        {/* Role badge */}
        <div className="founder-role inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
          <span className="text-xs tracking-widest uppercase text-purple-300/70">{m.founder?.role}</span>
        </div>

        {/* Typewriter description */}
        <p className={`text-sm md:text-base text-white/40 max-w-xl leading-relaxed mb-8 min-h-[3rem] ${showCursor ? 'typewriter-cursor' : ''}`}>
          {typed}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="tag px-4 py-2 rounded-full border border-white/8 text-xs md:text-sm text-white/50 bg-white/[0.02] backdrop-blur-sm opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Social */}
        <a
          href="https://x.com/CryptoApprentil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {m.founder?.social}
        </a>
      </div>
    </section>
  );
}
