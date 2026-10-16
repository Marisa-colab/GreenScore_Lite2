import React from 'react';
import { Language } from '../i18n';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-700/80 shadow-md ring-1 ring-slate-800"
    >
      {/* Portuguese Button with Flag Icon */}
      <button
        type="button"
        onClick={() => onLanguageChange('pt')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          currentLang === 'pt'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60 ring-1 ring-emerald-400'
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
        }`}
        title="Português (PT)"
      >
        <span className="text-base leading-none" aria-hidden="true">🇵🇹</span>
        <span className="tracking-wide">PT</span>
      </button>

      {/* English Button with Flag Icon */}
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          currentLang === 'en'
            ? 'bg-blue-600 text-white shadow-md shadow-blue-950/60 ring-1 ring-blue-400'
            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
        }`}
        title="English (EN)"
      >
        <span className="text-base leading-none" aria-hidden="true">🇬🇧</span>
        <span className="tracking-wide">EN</span>
      </button>
    </div>
  );
};
