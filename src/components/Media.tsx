'use client';

import { useLang } from '@/context/LanguageContext';

const icons: Record<string, string> = {
  Discord: '⬡',
  Telegram: '◈',
  Bilibili: '▣',
  YouTube: '▶',
  X: '✕',
};

export default function Media() {
  const { m } = useLang();
  const platforms: string[] = m.media || [];

  // Double the array for seamless loop
  const row = [...platforms, ...platforms];

  return (
    <section className="py-24 md:py-32 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - left */}
      <div className="marquee-track marquee-left mb-8">
        {row.map((p, i) => (
          <div key={`l-${i}`} className="flex items-center gap-4 px-4 flex-shrink-0">
            <span className="text-4xl md:text-6xl text-white/10">{icons[p] || '●'}</span>
            <span className="text-3xl md:text-5xl font-black text-white/8 tracking-tight whitespace-nowrap">{p}</span>
          </div>
        ))}
      </div>

      {/* Row 2 - right */}
      <div className="marquee-track marquee-right">
        {row.map((p, i) => (
          <div key={`r-${i}`} className="flex items-center gap-4 px-4 flex-shrink-0">
            <span className="text-4xl md:text-6xl text-white/10">{icons[p] || '●'}</span>
            <span className="text-3xl md:text-5xl font-black text-white/8 tracking-tight whitespace-nowrap">{p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
