'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span className="text-lg font-bold">
              Dr.<span className="text-gradient">Hash</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted">{t('footer.tagline')}</p>

          {/* Copyright */}
          <p className="text-xs text-muted/60">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
