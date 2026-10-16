// GreenScore Core Engine — backend para a Vercel (Serverless Function)
// Substitui o server.ts (Express), que só corre no AI Studio / Cloud Run e não na Vercel.
// Dados em memória (demonstração): reiniciam quando a função "adormece".

const STORED_API_KEY = process.env.GREENSCORE_API_KEY || "valor_de_teste";
const ADMIN_PIN = process.env.GREEN_ADMIN_PIN || "3662";

type Alerta = "Crítico" | "OK";

const dbUtilizadores = [
  { id: 1, nome: "Zélia Reis", email: "demo@greenscore.app", cpe: "PT0002000012345678AB", creditos_acumulados: 3662 },
];

const dbPostos = [
  { id: 1, nome: "Posto A", concelho: "Geral", grupo_cobertura: "Cobertura baixa", meta_poupanca_percentual: 10.0 },
  { id: 2, nome: "Posto B", concelho: "Geral", grupo_cobertura: "Cobertura baixa", meta_poupanca_percentual: 10.0 },
  { id: 3, nome: "Posto 3", concelho: "Geral", grupo_cobertura: "Alta cobertura", meta_poupanca_percentual: 20.0 },
  { id: 4, nome: "Posto C", concelho: "Geral", grupo_cobertura: "Cobertura média", meta_poupanca_percentual: 15.0 },
];

const agora = () => new Date().toISOString().replace("T", " ").substring(0, 19);

const dbMedicoes: Array<{
  id: number; id_posto: number; timestamp: string; kwh_atual: number;
  kwh_historico_homologo: number; poupanca_kwh: number; status_alerta: Alerta;
}> = [
  {
    id: 1, id_posto: 1,
    timestamp: new Date(Date.now() - 86400000).toISOString().replace("T", " ").substring(0, 19),
    kwh_atual: 180.5, kwh_historico_homologo: 220.0, poupanca_kwh: 39.5, status_alerta: "OK",
  },
];

function lerCorpo(req: any): any {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body;
}

export default function handler(req: any, res: any) {
  // Caminho pedido (vem do rewrite em vercel.json: /api/(.*) -> /api?path=$1)
  const raw = (req.query && req.query.path) || "";
  const caminho = "/" + (Array.isArray(raw) ? raw.join("/") : String(raw)).replace(/^\/+|\/+$/g, "");
  const partes = caminho.split("/").filter(Boolean); // ex.: ["v1","assistente-voz","1"]
  const metodo = (req.method || "GET").toUpperCase();
  const lang = String((req.query && req.query.lang) || "pt").toLowerCase().startsWith("en") ? "en" : "pt";

  // --- 1. TELECONTAGEM / PROCESSAR LEITURA ---
  if (metodo === "POST" && caminho === "/v1/medicoes/processar") {
    const chave = req.headers["x-api-key"] || req.headers["greencore_api_key"];
    if (chave !== STORED_API_KEY) {
      return res.status(401).json({ detail: "Unauthorized: Invalid API Key" });
    }
    const { user_id = 1, kwh_atual, kwh_historico } = lerCorpo(req);
    if (typeof kwh_atual !== "number" || typeof kwh_historico !== "number") {
      return res.status(400).json({ detail: "kwh_atual e kwh_historico são obrigatórios e devem ser numéricos" });
    }
    let poupanca_kwh = 0;
    let creditos_gerados = 0;
    let alerta_status: Alerta = "Crítico";
    if (kwh_atual < kwh_historico) {
      poupanca_kwh = kwh_historico - kwh_atual;
      creditos_gerados = Math.floor(poupanca_kwh * 2); // 1 kWh = 2 Créditos
      alerta_status = "OK";
    }
    const timestamp = agora();
    dbMedicoes.push({
      id: dbMedicoes.length + 1, id_posto: Number(user_id), timestamp, kwh_atual,
      kwh_historico_homologo: kwh_historico, poupanca_kwh, status_alerta: alerta_status,
    });
    const user = dbUtilizadores.find(u => u.id === Number(user_id)) || dbUtilizadores[0];
    user.creditos_acumulados += creditos_gerados;
    return res.status(200).json({
      status: "Processado com Sucesso",
      poupanca_kwh: Number(poupanca_kwh.toFixed(2)),
      creditos_gerados, alerta_status, timestamp,
    });
  }

  // --- 2. ASSISTENTE DE VOZ ---
  if (metodo === "GET" && partes[0] === "v1" && partes[1] === "assistente-voz") {
    const userId = Number(partes[2]) || 1;
    const user = dbUtilizadores.find(u => u.id === userId) || dbUtilizadores[0];
    const medicoes = dbMedicoes.filter(m => m.id_posto === userId);
    const ultima = medicoes[medicoes.length - 1];

    if (!ultima) {
      return res.status(200).json({
        mensagem: lang === "en"
          ? "Good evening! Still waiting for the first smart meter reading."
          : "Boa noite! Ainda estou a aguardar a primeira leitura do teu contador inteligente.",
        status: "Aguardando", poupanca_kwh: 0, valor_poupado_eur: 0,
      });
    }

    const kwh = ultima.poupanca_kwh;
    const eur = kwh * 0.21;
    let mensagem: string;
    if (ultima.status_alerta === "OK") {
      mensagem = lang === "en"
        ? `Good evening! Congratulations, your household achieved an extraordinary saving of ${kwh.toFixed(1)} kWh compared to last year. That represents a direct saving of ${eur.toFixed(2)} euros on your electricity bill. With this performance, you accumulated ${Math.floor(kwh * 2)} more Green Credits. Keep up the excellent work!`
        : `Boa noite! Parabéns, a tua casa conseguiu uma poupança extraordinária de ${kwh.toFixed(1)} kWh em relação ao ano passado. Isso representa uma poupança direta de ${eur.toFixed(2)} euros na tua fatura da luz. Com este comportamento, acumulaste mais ${Math.floor(kwh * 2)} Créditos Verdes. Continuem com o excelente trabalho!`;
    } else {
      mensagem = lang === "en"
        ? "Good evening! This month your consumption is higher than your historical benchmark. How about activating the 'Operation Standby Zero' mission today to reverse the trend?"
        : "Boa noite! Este mês o vosso consumo está acima do histórico. Que tal ativar a missão 'Operação Standby Zero' hoje para invertermos a tendência?";
    }
    return res.status(200).json({
      mensagem, status: ultima.status_alerta,
      poupanca_kwh: Number(kwh.toFixed(2)),
      valor_poupado_eur: Number(eur.toFixed(2)),
      creditos_acumulados: user.creditos_acumulados,
    });
  }

  // --- 3. DADOS E MONITORIZAÇÃO ---
  if (metodo === "GET" && partes[0] === "v1" && partes[1] === "utilizadores") {
    const userId = Number(partes[2]) || 1;
    return res.status(200).json(dbUtilizadores.find(u => u.id === userId) || dbUtilizadores[0]);
  }
  if (metodo === "GET" && caminho === "/v1/postos") {
    return res.status(200).json(dbPostos);
  }
  if (metodo === "GET" && caminho === "/v1/medicoes/historico") {
    return res.status(200).json(dbMedicoes);
  }

  // --- 4. ADMIN ---
  if (metodo === "POST" && caminho === "/v1/admin/auth") {
    const { pin } = lerCorpo(req);
    if (pin === ADMIN_PIN) {
      return res.status(200).json({
        authenticated: true, role: "admin", apiKeyConfigured: true,
        apiKeyObfuscated: STORED_API_KEY.substring(0, 3) + "***" + STORED_API_KEY.substring(STORED_API_KEY.length - 2),
      });
    }
    return res.status(401).json({ authenticated: false, detail: "PIN de Administrador incorreto" });
  }

  // --- 5. SEGURANÇA ---
  if (metodo === "GET" && caminho === "/system/security") {
    return res.status(200).json({
      architecture: {
        provider: "Vercel", region: "cdg1",
        sourceCodeExposure: "0% (Protegido)",
        backendEngine: "Serverless Function",
        containerStatus: "Operacional",
      },
    });
  }

  return res.status(404).json({ detail: "Endpoint não encontrado", path: caminho });
}
