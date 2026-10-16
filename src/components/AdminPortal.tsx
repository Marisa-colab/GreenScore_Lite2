import React, { useState } from 'react';
import { Shield, Lock, Key, Database, CheckCircle, HardDrive, RefreshCw } from 'lucide-react';
import { MedicaoEnergia, Utilizador } from '../types';
import { Language, translations } from '../i18n';

interface AdminPortalProps {
  lang: Language;
  onUnlockSuccess: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ lang }) => {
  const [pin, setPin] = useState<string>('3662');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const t = translations[lang];

  // System stats
  const [history, setHistory] = useState<MedicaoEnergia[]>([]);
  const [users, setUsers] = useState<Utilizador[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  // White label config states
  const [clientName, setClientName] = useState<string>(lang === 'pt' ? 'Comprador Exemplo Lda' : 'Acme Green Corp');
  const [assignedApiKey, setAssignedApiKey] = useState<string>('gs_live_99a8b1c2d3e4f5');
  const [rateLimit, setRateLimit] = useState<number>(1000);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch('/api/v1/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      const json = await res.json();
      if (res.ok && json.authenticated) {
        setIsAuthenticated(true);
        loadAdminData();
      } else {
        setAuthError(json.detail || (lang === 'pt' ? 'PIN Incorreto' : 'Incorrect PIN'));
      }
    } catch (err) {
      setAuthError(lang === 'pt' ? 'Erro na ligação com o servidor' : 'Server connection error');
    }
  };

  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [resHist, resUser] = await Promise.all([
        fetch('/api/v1/medicoes/historico'),
        fetch('/api/v1/utilizadores/1')
      ]);
      const histData = await resHist.json();
      const userData = await resUser.json();
      setHistory(histData);
      setUsers([userData]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-slate-900 border border-amber-500/30 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">{t.admin.restrictedTitle}</h3>
          <p className="text-xs text-slate-400">
            {t.admin.restrictedDesc}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              {t.admin.pinLabel}
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder={t.admin.pinPlaceholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-center tracking-widest text-white focus:outline-none focus:border-amber-500 font-mono"
              required
            />
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 text-xs rounded-xl text-center font-mono">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-amber-600/20"
          >
            {t.admin.unlockButton}
          </button>
        </form>

        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed font-mono">
          💡 <strong>{t.admin.securityNoticeTitle}</strong> {t.admin.securityNoticeText}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {t.admin.masterPanelTitle}
                <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full font-mono">
                  {t.admin.activeSession}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t.admin.masterPanelDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 transition"
          >
            {t.admin.lockSession}
          </button>
        </div>

        {/* Security Shield Architecture Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              {t.admin.shieldPythonTitle}
            </div>
            <p className="text-slate-400">
              {t.admin.shieldPythonDesc}
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Key className="w-4 h-4" />
              {t.admin.shieldKeyTitle}
            </div>
            <p className="text-slate-400">
              {t.admin.shieldKeyDesc}
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="font-semibold text-blue-400 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" />
              {t.admin.shieldDbTitle}
            </div>
            <p className="text-slate-400">
              {t.admin.shieldDbDesc}
            </p>
          </div>
        </div>
      </div>

      {/* White-Label License Generator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-400" />
          {t.admin.generatorTitle}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              {t.admin.buyerNameLabel}
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              {t.admin.apiKeyLabel}
            </label>
            <input
              type="text"
              value={assignedApiKey}
              onChange={(e) => setAssignedApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-amber-300 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              {t.admin.rateLimitLabel}
            </label>
            <input
              type="number"
              value={rateLimit}
              onChange={(e) => setRateLimit(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
            <CheckCircle className="w-4 h-4" />
            {t.admin.readyForSale}
          </span>
          <button
            onClick={() => alert(lang === 'pt' ? `Chave ${assignedApiKey} ativada com sucesso para ${clientName}!` : `Key ${assignedApiKey} successfully provisioned for ${clientName}!`)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-amber-600/20"
          >
            {t.admin.issueTokenButton}
          </button>
        </div>
      </div>

      {/* Raw SQLite Database Log Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-blue-400 font-medium text-sm">
            <Database className="w-4 h-4" />
            <span>{t.admin.telemetryTitle}</span>
          </div>
          <button
            onClick={loadAdminData}
            disabled={loadingData}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">{t.admin.colId}</th>
                <th className="py-3 px-4">{t.admin.colStation}</th>
                <th className="py-3 px-4">{t.admin.colTime}</th>
                <th className="py-3 px-4">{t.admin.colCurrentKwh}</th>
                <th className="py-3 px-4">{t.admin.colHistoricKwh}</th>
                <th className="py-3 px-4">{t.admin.colSavings}</th>
                <th className="py-3 px-4">{t.admin.colAlert}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-950/50">
                  <td className="py-3 px-4 text-slate-500">#{item.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    {lang === 'pt' ? `Posto ${item.id_posto}` : `Station ${item.id_posto}`}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{item.timestamp}</td>
                  <td className="py-3 px-4 text-white">{item.kwh_atual} kWh</td>
                  <td className="py-3 px-4 text-slate-400">{item.kwh_historico_homologo} kWh</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">+{item.poupanca_kwh} kWh</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      item.status_alerta === 'OK'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {item.status_alerta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
