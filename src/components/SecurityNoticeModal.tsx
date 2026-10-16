import React from 'react';
import { ShieldCheck, X, Lock, Key, Server } from 'lucide-react';
import { Language, translations } from '../i18n';

interface SecurityNoticeModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const SecurityNoticeModal: React.FC<SecurityNoticeModalProps> = ({ isOpen, lang, onClose }) => {
  if (!isOpen) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
          title={t.common.close}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{t.securityModal.title}</h3>
            <p className="text-xs text-slate-400">{t.securityModal.subtitle}</p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-4 text-xs text-slate-300">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="font-semibold text-emerald-400 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {t.securityModal.point1Title}
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t.securityModal.point1Desc}
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="font-semibold text-amber-400 flex items-center gap-2">
              <Key className="w-4 h-4" />
              {t.securityModal.point2Title}
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t.securityModal.point2Desc}
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="font-semibold text-blue-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              {t.securityModal.point3Title}
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t.securityModal.point3Desc}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-emerald-600/20"
          >
            {t.common.understood}
          </button>
        </div>
      </div>
    </div>
  );
};
