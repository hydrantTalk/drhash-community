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
      {/* Logo + X icon */}
      <a href="https://x.com/CryptoApprenti1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
        <span className="text-base font-black tracking-tight text-white/80 group-hover:text-white transition-colors">
          DR.<span className="text-grad">HASH</span>
        </span>
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
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
