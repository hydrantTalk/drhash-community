'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import zhMessages from '@/i18n/zh.json';
import enMessages from '@/i18n/en.json';

type Locale = 'zh' | 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

interface LanguageContextType {
  locale: Locale;
  messages: Messages;
  toggleLocale: () => void;
  t: (path: string) => string;
}

const messagesMap: Record<Locale, Messages> = {
  zh: zhMessages,
  en: enMessages,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh');
  const messages = messagesMap[locale];

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'zh' ? 'en' : 'zh'));
  }, []);

  const t = useCallback(
    (path: string): string => {
      const keys = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let result: any = messages;
      for (const key of keys) {
        result = result?.[key];
      }
      return typeof result === 'string' ? result : path;
    },
    [messages]
  );

  return (
    <LanguageContext.Provider value={{ locale, messages, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
