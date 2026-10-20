import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VoiceAssistantCard } from './components/VoiceAssistantCard';
import { TelecontagemForm } from './components/TelecontagemForm';
import { PostosList } from './components/PostosList';
import { AdminPortal } from './components/AdminPortal';
import { SecurityNoticeModal } from './components/SecurityNoticeModal';
import { Utilizador } from './types';
import { Language, translations } from './i18n';
import { Award, Euro, ShieldCheck } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<'client' | 'admin'>('client');
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('greenscore_lang');
    return saved === 'en' ? 'en' : 'pt';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('greenscore_lang', newLang);
  };

  const [user, setUser] = useState<Utilizador>({
    id: 1,
    nome: 'Exemplo',
    email: 'zmcrnc@gmail.com',
    cpe: 'PT0002000012345678AB',
    creditos_acumulados: 3662
  });
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);

  const t = translations[lang];

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/v1/utilizadores/1');
      if (res.ok) {
        const json = await res.json();
        setUser(json);
      }
    } catch (err) {
      console.error('Erro ao recarregar utilizador:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header Navbar with PT / EN Icon Switcher */}
      <Navbar
        mode={mode}
        setMode={setMode}
        userCredits={user.creditos_acumulados}
        userName={user.nome}
        userCpe={user.cpe}
        lang={lang}
        setLang={setLang}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* New Version Announcement & Live Language Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-blue-950/70 border border-emerald-500/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-3 text-slate-200">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                <span>{lang === 'pt' ? 'Nova Versão v1.1 Ativa' : 'New Version v1.1 Active'}</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  🇵🇹 PT & 🇬🇧 EN
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {lang === 'pt'
                  ? 'Aplicação totalmente bilingue. Use os botões PT / EN no cabeçalho ou clique abaixo para alternar.'
                  : 'Application fully bilingual. Use the PT / EN buttons in the header or click below to switch.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang('pt')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                lang === 'pt'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <span>🇵🇹</span>
              <span>Português</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                lang === 'en'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-900/40'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Banner header for Client Mode */}
        {mode === 'client' && (
          <div className="space-y-8">
            
            {/* Top Metric Highlight Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* User Profile & CPE */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  {t.overview.meterOwner}
                </div>
                <div className="text-base font-bold text-white truncate">{user.nome}</div>
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {t.overview.cpeLabel}: {user.cpe}
                </div>
              </div>

              {/* Total Green Credits */}
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-xl space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 font-mono flex items-center justify-between">
                  <span>{t.overview.accumulatedCredits}</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {user.creditos_acumulados.toLocaleString(lang === 'pt' ? 'pt-PT' : 'en-US')}{' '}
                  <span className="text-xs text-emerald-400 font-normal">{t.common.points}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {t.overview.creditsRatio}
                </div>
              </div>

              {/* Estimated Money Saved */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
                  <span>{t.overview.estimatedSavings}</span>
                  <Euro className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  8.30 €
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {t.overview.tariffNote}
                </div>
              </div>

              {/* Security Shield Indicator */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
                  <span>{t.overview.licenseProtection}</span>
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-sm font-bold text-slate-200">
                  {t.overview.clientModeProtected}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  {t.overview.isolationNote}
                </div>
              </div>

            </div>

            {/* Voice Assistant Section */}
            <VoiceAssistantCard userId={user.id} lang={lang} />

            {/* Telecontagem Form and Energy Stations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Telecontagem Form */}
              <div className="lg:col-span-7">
                <TelecontagemForm cpe={user.cpe} lang={lang} onSuccess={fetchUserData} />
              </div>

              {/* Postos list */}
              <div className="lg:col-span-5">
                <PostosList lang={lang} />
              </div>

            </div>

          </div>
        )}

        {/* Admin Portal View */}
        {mode === 'admin' && (
          <AdminPortal lang={lang} onUnlockSuccess={() => {}} />
        )}

      </main>

      {/* Security Notice Modal */}
      <SecurityNoticeModal
        isOpen={isSecurityModalOpen}
        lang={lang}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">GreenScore Core Engine</span>
            <span>•</span>
            <span>{t.footer.tagline}</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="hover:text-emerald-400 transition"
            >
              {t.footer.securityLink}
            </button>
            <span>•</span>
            <span className="font-mono text-slate-600">user: {user.email}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
