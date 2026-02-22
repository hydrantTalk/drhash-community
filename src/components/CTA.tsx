'use client';

import { useRef, useCallback } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function CTA() {
  const { m } = useLang();
  const btnRef = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />

      {/* Title */}
      <h2 className="text-[clamp(4rem,15vw,14rem)] font-black leading-[0.85] tracking-tighter text-white/[0.03] mb-12 select-none">
        {m.cta?.title || 'JOIN US'}
      </h2>

      {/* Magnetic button */}
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="relative p-16">
        <a
          ref={btnRef}
          href="https://x.com/DrhashClub"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn px-12 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg md:text-xl tracking-wide hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] transition-shadow duration-500"
        >
          {m.cta?.btn || 'Join Now'}
        </a>
      </div>

      {/* Footer */}
      <p className="absolute bottom-8 text-xs text-white/15 tracking-widest">
        {m.cta?.footer || '© 2024 Dr.Hash'}
      </p>
    </section>
  );
}
