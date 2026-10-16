import React, { useState, useEffect } from 'react';
import { Radio, MapPin, Target, RefreshCw } from 'lucide-react';
import { Posto } from '../types';
import { Language, translations } from '../i18n';

interface PostosListProps {
  lang: Language;
}

export const PostosList: React.FC<PostosListProps> = ({ lang }) => {
  const [postos, setPostos] = useState<Posto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const t = translations[lang];

  const fetchPostos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/postos');
      const json = await res.json();
      setPostos(json);
    } catch (err) {
      console.error('Erro ao carregar postos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostos();
  }, []);

  const getCoverageLabel = (coverage: string) => {
    if (lang === 'pt') return coverage;
    if (coverage.toLowerCase().includes('alta')) return t.postos.coverageHigh;
    if (coverage.toLowerCase().includes('méd') || coverage.toLowerCase().includes('med')) return t.postos.coverageMedium;
    return t.postos.coverageLow;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-blue-400 font-medium text-sm">
          <Radio className="w-4 h-4" />
          <span>{t.postos.title}</span>
        </div>
        <button
          onClick={fetchPostos}
          disabled={loading}
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
          title={t.postos.refreshTooltip}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {postos.map((p) => (
          <div
            key={p.id}
            className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 p-4 rounded-xl space-y-2 transition group"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-white group-hover:text-emerald-400 transition">
                {p.nome}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                p.grupo_cobertura.includes('Alta')
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : p.grupo_cobertura.includes('média')
                  ? 'bg-blue-950 text-blue-300 border-blue-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {getCoverageLabel(p.grupo_cobertura)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {p.concelho}
              </span>
              <span className="flex items-center gap-1 font-mono text-emerald-400">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                {t.postos.targetLabel}: {p.meta_poupanca_percentual}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
