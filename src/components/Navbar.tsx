'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function Navbar() {
  const { m, toggle } = useLang();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 100 || y < lastY);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-1.5 group">
        <span className="text-base font-black tracking-tight text-white/80 group-hover:text-white transition-colors">
          DR.<span className="text-grad">HASH</span>
        </span>
      </a>

      {/* Lang toggle */}
      <button
        onClick={toggle}
        className="text-xs tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors py-1 px-3 rounded-full border border-white/5 hover:border-white/15"
      >
        {m.nav?.lang || 'EN'}
      </button>
    </nav>
  );
}
