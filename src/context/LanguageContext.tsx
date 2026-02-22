'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import zh from '@/i18n/zh.json';
import en from '@/i18n/en.json';

type Locale = 'zh' | 'en';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

interface LangCtx {
  locale: Locale;
  m: Messages;
  toggle: () => void;
}

const map: Record<Locale, Messages> = { zh, en };
const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh');
  const toggle = useCallback(() => setLocale(p => (p === 'zh' ? 'en' : 'zh')), []);
  return (
    <Ctx.Provider value={{ locale, m: map[locale], toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}
