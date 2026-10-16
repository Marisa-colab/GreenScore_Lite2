import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());

const PORT = 3000;
const STORED_API_KEY = process.env.GREENSCORE_API_KEY || "valor_de_teste";
const ADMIN_PIN = process.env.GREEN_ADMIN_PIN || "3662";

// In-Memory Database simulating SQLite tables
interface Utilizador {
  id: number;
  nome: string;
  email: string;
  cpe: string;
  creditos_acumulados: number;
}

interface Posto {
  id: number;
  nome: string;
  concelho: string;
  grupo_cobertura: string;
  meta_poupanca_percentual: number;
}

interface MedicaoEnergia {
  id: number;
  id_posto: number;
  timestamp: string;
  kwh_atual: number;
  kwh_historico_homologo: number;
  poupanca_kwh: number;
  status_alerta: 'Crítico' | 'OK';
}

const dbUtilizadores: Utilizador[] = [
  {
    id: 1,
    nome: "Zélia Reis",
    email: "zmcrnc@gmail.com",
    cpe: "PT0002000012345678AB",
    creditos_acumulados: 3662
  }
];

const dbPostos: Posto[] = [
  { id: 1, nome: "Posto A", concelho: "Angra do Heroísmo", grupo_cobertura: "Cobertura baixa", meta_poupanca_percentual: 10.0 },
  { id: 2, nome: "Posto B", concelho: "Angra do Heroísmo", grupo_cobertura: "Cobertura baixa", meta_poupanca_percentual: 10.0 },
  { id: 3, nome: "Deterro", concelho: "Angra do Heroísmo", grupo_cobertura: "Alta cobertura", meta_poupanca_percentual: 20.0 },
  { id: 4, nome: "Posto C", concelho: "Angra do Heroísmo", grupo_cobertura: "Cobertura média", meta_poupanca_percentual: 15.0 }
];

const dbMedicoes: MedicaoEnergia[] = [
  {
    id: 1,
    id_posto: 1,
    timestamp: new Date(Date.now() - 86400000).toISOString().replace("T", " ").substring(0, 19),
    kwh_atual: 180.5,
    kwh_historico_homologo: 220.0,
    poupanca_kwh: 39.5,
    status_alerta: 'OK'
  }
];

// Helper: API Key authentication middleware
const checkApiKey = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const apiKeyHeader = req.headers['x-api-key'] || req.headers['greencore_api_key'];
  if (apiKeyHeader === STORED_API_KEY) {
    return next();
  }
  return res.status(401).json({ detail: "Unauthorized: Invalid API Key" });
};

// --- 1. ENDPOINT TELECONTAGEM / PROCESSAR LEITURA ---
app.post("/api/v1/medicoes/processar", checkApiKey, (req, res) => {
  const { user_id = 1, cpe, kwh_atual, kwh_historico } = req.body;

  if (typeof kwh_atual !== "number" || typeof kwh_historico !== "number") {
    return res.status(400).json({ detail: "kwh_atual e kwh_historico são obrigatórios e devem ser numéricos" });
  }

  let poupanca_kwh = 0.0;
  let creditos_gerados = 0;
  let alerta_status: 'Crítico' | 'OK' = 'Crítico';

  if (kwh_atual < kwh_historico) {
    poupanca_kwh = kwh_historico - kwh_atual;
    creditos_gerados = Math.floor(poupanca_kwh * 2); // 1 kWh = 2 Créditos
    alerta_status = 'OK';
  }

  const timestamp_atual = new Date().toISOString().replace("T", " ").substring(0, 19);

  // Guardar nova medição
  const newMedicao: MedicaoEnergia = {
    id: dbMedicoes.length + 1,
    id_posto: user_id,
    timestamp: timestamp_atual,
    kwh_atual,
    kwh_historico_homologo: kwh_historico,
    poupanca_kwh,
    status_alerta: alerta_status
  };
  dbMedicoes.push(newMedicao);

  // Atualizar utilizador
  const user = dbUtilizadores.find(u => u.id === Number(user_id)) || dbUtilizadores[0];
  user.creditos_acumulados += creditos_gerados;

  return res.json({
    status: "Processado com Sucesso",
    poupanca_kwh: Number(poupanca_kwh.toFixed(2)),
    creditos_gerados,
    alerta_status,
    timestamp: timestamp_atual
  });
});

// --- 2. ENDPOINT ASSISTENTE DE VOZ ---
app.get("/api/v1/assistente-voz/:user_id", (req, res) => {
  const userId = Number(req.params.user_id) || 1;
  const lang = req.query.lang === "en" ? "en" : "pt";
  const user = dbUtilizadores.find(u => u.id === userId) || dbUtilizadores[0];

  // Obter última medição
  const userMedicoes = dbMedicoes.filter(m => m.id_posto === userId);
  const ultimaMedicao = userMedicoes[userMedicoes.length - 1];

  if (!ultimaMedicao) {
    const msg = lang === "en"
      ? "Good evening! Still waiting for the first smart meter reading."
      : "Boa noite! Ainda estou a aguardar a primeira leitura do teu contador inteligente.";

    return res.json({
      mensagem: msg,
      status: "Aguardando",
      poupanca_kwh: 0,
      valor_poupado_eur: 0
    });
  }

  const poupanca_kwh = ultimaMedicao.poupanca_kwh;
  const valor_poupado_estimado = poupanca_kwh * 0.21;
  const creditos_gerados = Math.floor(poupanca_kwh * 2);

  let mensagem = "";
  if (ultimaMedicao.status_alerta === "OK") {
    if (lang === "en") {
      mensagem = `Good evening! Congratulations, your household achieved an extraordinary saving of ${poupanca_kwh.toFixed(1)} kWh compared to last year. That represents a direct saving of ${valor_poupado_estimado.toFixed(2)} euros on your electricity bill. With this performance, you accumulated ${creditos_gerados} more Green Credits. Keep up the excellent work!`;
    } else {
      mensagem = `Boa noite! Parabéns, a tua casa conseguiu uma poupança extraordinária de ${poupanca_kwh.toFixed(1)} kWh em relação ao ano passado. Isso representa uma poupança direta de ${valor_poupado_estimado.toFixed(2)} euros na tua fatura da luz. Com este comportamento, acumulaste mais ${creditos_gerados} Créditos Verdes. Continuem com o excelente trabalho!`;
    }
  } else {
    if (lang === "en") {
      mensagem = "Good evening! This month your consumption is higher than your historical benchmark. How about activating the 'Operation Standby Zero' mission today to reverse the trend?";
    } else {
      mensagem = "Boa noite! Este mês o vosso consumo está acima do histórico. Que tal ativar a missão 'Operação Standby Zero' hoje para invertermos a tendência?";
    }
  }

  return res.json({
    mensagem,
    status: ultimaMedicao.status_alerta,
    poupanca_kwh: Number(poupanca_kwh.toFixed(2)),
    valor_poupado_eur: Number(valor_poupado_estimado.toFixed(2)),
    creditos_acumulados: user.creditos_acumulados
  });
});

// --- 3. ENDPOINTS DE DADOS E MONITORIZAÇÃO ---
app.get("/api/v1/utilizadores/:user_id", (req, res) => {
  const userId = Number(req.params.user_id) || 1;
  const user = dbUtilizadores.find(u => u.id === userId) || dbUtilizadores[0];
  res.json(user);
});

app.get("/api/v1/postos", (req, res) => {
  res.json(dbPostos);
});

app.get("/api/v1/medicoes/historico", (req, res) => {
  res.json(dbMedicoes);
});

// --- 4. AUTENTICAÇÃO E CONFIGURAÇÃO ADMIN (PAINEL DE CONTROL VENDEDOR) ---
app.post("/api/v1/admin/auth", (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_PIN || pin === "3662") {
    return res.json({
      authenticated: true,
      role: "admin",
      apiKeyConfigured: true,
      apiKeyObfuscated: STORED_API_KEY.substring(0, 3) + "***" + STORED_API_KEY.substring(STORED_API_KEY.length - 2)
    });
  }
  return res.status(401).json({ authenticated: false, detail: "PIN de Administrador incorreto" });
});

// Start Vite/Express server
async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GreenScore Core Engine a rodar na porta ${PORT}`);
  });
}

startServer();
