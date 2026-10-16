export type Language = 'pt' | 'en';

export interface Translations {
  common: {
    portuguese: string;
    english: string;
    refresh: string;
    close: string;
    understood: string;
    points: string;
    loading: string;
    error: string;
    active: string;
    critical: string;
    ok: string;
  };
  navbar: {
    brandSubtitle: string;
    greenCredits: string;
    modeClient: string;
    modeAdmin: string;
    securityTooltip: string;
  };
  overview: {
    meterOwner: string;
    cpeLabel: string;
    accumulatedCredits: string;
    creditsRatio: string;
    estimatedSavings: string;
    tariffNote: string;
    licenseProtection: string;
    clientModeProtected: string;
    isolationNote: string;
  };
  voiceAssistant: {
    title: string;
    subtitle: string;
    savingsActive: string;
    consumptionAlert: string;
    listenReport: string;
    stopAudio: string;
    speechNotSupported: string;
    loadingBulletin: string;
    kwhSaved: string;
    estimatedSavings: string;
    currentStatus: string;
    statusEfficient: string;
    statusCritical: string;
    standbyMissionRecommendation: string;
    activateMissionNow: string;
    missionActive: string;
    refreshTooltip: string;
  };
  telecontagem: {
    title: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    currentConsumption: string;
    historicConsumption: string;
    estimateTitle: string;
    estimateResult: string;
    submitButton: string;
    processingButton: string;
    successStatus: string;
    savingsLabel: string;
    creditsLabel: string;
    alertLabel: string;
  };
  postos: {
    title: string;
    refreshTooltip: string;
    targetLabel: string;
    coverageLow: string;
    coverageMedium: string;
    coverageHigh: string;
  };
  admin: {
    restrictedTitle: string;
    restrictedDesc: string;
    pinLabel: string;
    pinPlaceholder: string;
    unlockButton: string;
    securityNoticeTitle: string;
    securityNoticeText: string;
    masterPanelTitle: string;
    activeSession: string;
    masterPanelDesc: string;
    lockSession: string;
    shieldPythonTitle: string;
    shieldPythonDesc: string;
    shieldKeyTitle: string;
    shieldKeyDesc: string;
    shieldDbTitle: string;
    shieldDbDesc: string;
    generatorTitle: string;
    buyerNameLabel: string;
    apiKeyLabel: string;
    rateLimitLabel: string;
    readyForSale: string;
    issueTokenButton: string;
    telemetryTitle: string;
    colId: string;
    colStation: string;
    colTime: string;
    colCurrentKwh: string;
    colHistoricKwh: string;
    colSavings: string;
    colAlert: string;
  };
  securityModal: {
    title: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
  };
  footer: {
    tagline: string;
    securityLink: string;
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    common: {
      portuguese: 'Português',
      english: 'Inglês',
      refresh: 'Atualizar',
      close: 'Fechar',
      understood: 'Compreendi',
      points: 'pts',
      loading: 'A carregar...',
      error: 'Erro',
      active: 'Ativo',
      critical: 'Crítico',
      ok: 'OK (Eficiente)',
    },
    navbar: {
      brandSubtitle: 'Gestão de Eficiência Energética, Créditos Verdes e Assistente',
      greenCredits: 'Créditos Verdes',
      modeClient: 'Cliente',
      modeAdmin: 'Gestor / Admin',
      securityTooltip: 'Informação de Segurança para Venda / Licenciamento',
    },
    overview: {
      meterOwner: 'Titular do Contador',
      cpeLabel: 'CPE',
      accumulatedCredits: 'Créditos Acumulados',
      creditsRatio: '1 kWh poupado = 2 Créditos Verdes',
      estimatedSavings: 'Poupança Estimada na Fatura',
      tariffNote: 'Baseado na tarifa de 0.21€/kWh',
      licenseProtection: 'Proteção de Licença',
      clientModeProtected: 'Modo Cliente Protegido',
      isolationNote: 'Código Python e DB isolados no servidor.',
    },
    voiceAssistant: {
      title: 'Assistente de Voz GreenScore',
      subtitle: 'Resumo diário e recomendações inteligentes personalizadas',
      savingsActive: 'Poupança Ativa',
      consumptionAlert: 'Alerta de Consumo',
      listenReport: 'Ouvir Relatório de Voz',
      stopAudio: 'Parar Áudio',
      speechNotSupported: 'Síntese de voz não suportada neste navegador.',
      loadingBulletin: 'A carregar o boletim de voz do GreenScore...',
      kwhSaved: 'Poupança kWh',
      estimatedSavings: 'Poupança Estimada',
      currentStatus: 'Estado Atual',
      statusEfficient: 'OK (Eficiente)',
      statusCritical: 'Crítico (Elevado)',
      standbyMissionRecommendation: 'Recomendação: Operação Standby Zero',
      activateMissionNow: 'Ativar Missão Agora',
      missionActive: 'Missão Ativada ✓',
      refreshTooltip: 'Atualizar Briefing de Voz',
    },
    telecontagem: {
      title: 'Telecontagem / Processador de Medições',
      apiKeyLabel: 'Chave de API (`GREENSCORE_API_KEY`)',
      apiKeyPlaceholder: 'Insira a GREENSCORE_API_KEY',
      currentConsumption: 'Consumo Atual (kWh)',
      historicConsumption: 'Histórico Homólogo (kWh)',
      estimateTitle: 'Estimativa de Geração de Créditos:',
      estimateResult: 'Créditos',
      submitButton: 'Enviar Leitura para Engine API',
      processingButton: 'A autenticar e processar...',
      successStatus: 'Processado com Sucesso',
      savingsLabel: 'Poupança',
      creditsLabel: 'Créditos',
      alertLabel: 'Alerta',
    },
    postos: {
      title: 'Postos de Rede & Cobertura Energética',
      refreshTooltip: 'Recarregar Postos',
      targetLabel: 'Meta',
      coverageLow: 'Cobertura baixa',
      coverageMedium: 'Cobertura média',
      coverageHigh: 'Alta cobertura',
    },
    admin: {
      restrictedTitle: 'Acesso Reservado ao Proprietário / Gestor',
      restrictedDesc: 'Modo de Proteção e Venda: Insira o PIN de Administrador Mestre para gerir chaves de API e isolamento da base de dados.',
      pinLabel: 'PIN de Administrador (Padrão: 3662)',
      pinPlaceholder: 'Digite o PIN Mestre',
      unlockButton: 'Desbloquear Painel de Gestão Mestre',
      securityNoticeTitle: 'Nota de Segurança para Venda:',
      securityNoticeText: 'O comprador final terá apenas acesso à interface de cliente e às APIs autorizadas via x-api-key, mantendo o código-fonte Python e o ficheiro greenscore.db protegidos.',
      masterPanelTitle: 'Painel de Licenciamento & Venda Mestre',
      activeSession: 'Sessão Ativa',
      masterPanelDesc: 'Controlo total sobre chaves de API, utilizadores, registos de telecontagem e proteção de propriedade intelectual.',
      lockSession: 'Bloquear Sessão Mestre',
      shieldPythonTitle: 'Isolamento do Código Python',
      shieldPythonDesc: 'O comprador faz pedidos HTTP à API REST. O ficheiro main.py e a estrutura SQLite não ficam expostos no cliente.',
      shieldKeyTitle: 'Chaves com Permissões Restritas',
      shieldKeyDesc: 'Cada comprador recebe um token x-api-key único. Pode limitar o número de requisições por mês.',
      shieldDbTitle: 'Proteção do Ficheiro SQLite',
      shieldDbDesc: 'A base de dados greenscore.db reside no servidor. Consultas diretas SQL estão bloqueadas aos utilizadores comuns.',
      generatorTitle: 'Gerador de Chaves de API para Compradores',
      buyerNameLabel: 'Nome da Entidade / Comprador',
      apiKeyLabel: 'Chave de API Atribuída (`x-api-key`)',
      rateLimitLabel: 'Limite Mensal de Leituras (Rate Limit)',
      readyForSale: 'Licença Pronta para Atribuição Comercial',
      issueTokenButton: 'Emitir Token do Comprador',
      telemetryTitle: 'Registo de Telecontagem em Tempo Real (`medicoes_energia`)',
      colId: 'ID',
      colStation: 'Posto / User ID',
      colTime: 'Timestamp',
      colCurrentKwh: 'kWh Atual',
      colHistoricKwh: 'kWh Histórico',
      colSavings: 'Poupança',
      colAlert: 'Alerta',
    },
    securityModal: {
      title: 'Arquitetura de Segurança para Venda Comercial',
      subtitle: 'Como o GreenScore protege o código-fonte e os dados do proprietário',
      point1Title: '1. Execução Segura no Servidor (Server-Side Execution)',
      point1Desc: 'Toda a lógica de cálculo de créditos verdes (1 kWh = 2 créditos), gravação SQLite (greenscore.db) e validação de chaves reside estritamente no backend Express/Node ou FastAPI. O comprador nunca tem acesso direto aos ficheiros de código ou credenciais da base de dados.',
      point2Title: '2. Autenticação via Cabeçalho `x-api-key` (`GREENSCORE_API_KEY`)',
      point2Desc: 'O comprador utiliza apenas tokens restritos de API para comunicar com os endpoints /api/v1/medicoes/processar e /api/v1/assistente-voz. Caso deseje revogar ou expirar a licença de um cliente, basta desativar a chave no Painel Mestre.',
      point3Title: '3. Separação de Papéis (Modo Cliente vs. Modo Gestor)',
      point3Desc: 'A interface do comprador exibe apenas métricas de consumo, assistente de voz e telecontagem sem expor tabelas internas ou o PIN de gestão mestre (padrão: 3662).',
    },
    footer: {
      tagline: 'GreenScore Core Engine • Gestão Energética Inteligente',
      securityLink: 'Arquitetura de Segurança',
    },
  },
  en: {
    common: {
      portuguese: 'Portuguese',
      english: 'English',
      refresh: 'Refresh',
      close: 'Close',
      understood: 'Got it',
      points: 'pts',
      loading: 'Loading...',
      error: 'Error',
      active: 'Active',
      critical: 'Critical',
      ok: 'OK (Efficient)',
    },
    navbar: {
      brandSubtitle: 'Energy Efficiency Management, Green Credits & Voice Assistant',
      greenCredits: 'Green Credits',
      modeClient: 'Client',
      modeAdmin: 'Manager / Admin',
      securityTooltip: 'Security & Licensing Information for Commercial Sale',
    },
    overview: {
      meterOwner: 'Meter Account Holder',
      cpeLabel: 'Meter CPE',
      accumulatedCredits: 'Accumulated Credits',
      creditsRatio: '1 kWh saved = 2 Green Credits',
      estimatedSavings: 'Estimated Bill Savings',
      tariffNote: 'Based on standard 0.21€/kWh rate',
      licenseProtection: 'License Protection',
      clientModeProtected: 'Protected Client Mode',
      isolationNote: 'Python source & DB isolated on server.',
    },
    voiceAssistant: {
      title: 'GreenScore Voice Assistant',
      subtitle: 'Daily summary and personalized smart recommendations',
      savingsActive: 'Savings Active',
      consumptionAlert: 'Consumption Alert',
      listenReport: 'Listen to Voice Report',
      stopAudio: 'Stop Audio',
      speechNotSupported: 'Speech synthesis is not supported on this browser.',
      loadingBulletin: 'Loading GreenScore voice bulletin...',
      kwhSaved: 'kWh Saved',
      estimatedSavings: 'Estimated Savings',
      currentStatus: 'Current Status',
      statusEfficient: 'OK (Efficient)',
      statusCritical: 'Critical (High)',
      standbyMissionRecommendation: 'Recommendation: Operation Standby Zero',
      activateMissionNow: 'Activate Mission Now',
      missionActive: 'Mission Activated ✓',
      refreshTooltip: 'Refresh Voice Briefing',
    },
    telecontagem: {
      title: 'Telemetry Metering / Reading Processor',
      apiKeyLabel: 'API Key (`GREENSCORE_API_KEY`)',
      apiKeyPlaceholder: 'Enter GREENSCORE_API_KEY',
      currentConsumption: 'Current Consumption (kWh)',
      historicConsumption: 'Historical Benchmark (kWh)',
      estimateTitle: 'Estimated Credit Generation:',
      estimateResult: 'Credits',
      submitButton: 'Send Reading to Engine API',
      processingButton: 'Authenticating & processing...',
      successStatus: 'Processed Successfully',
      savingsLabel: 'Savings',
      creditsLabel: 'Credits',
      alertLabel: 'Alert',
    },
    postos: {
      title: 'Grid Stations & Energy Coverage',
      refreshTooltip: 'Reload Stations',
      targetLabel: 'Target',
      coverageLow: 'Low coverage',
      coverageMedium: 'Medium coverage',
      coverageHigh: 'High coverage',
    },
    admin: {
      restrictedTitle: 'Owner / Manager Restricted Access',
      restrictedDesc: 'Commercial Protection Mode: Enter Master Admin PIN to manage API keys and database isolation.',
      pinLabel: 'Admin PIN (Default: 3662)',
      pinPlaceholder: 'Enter Master PIN',
      unlockButton: 'Unlock Master Management Dashboard',
      securityNoticeTitle: 'Commercial Sale Security Note:',
      securityNoticeText: 'The buyer only gains access to the client interface and authenticated APIs via x-api-key, keeping the Python engine and greenscore.db database protected.',
      masterPanelTitle: 'Master Licensing & Commercial Sale Portal',
      activeSession: 'Active Session',
      masterPanelDesc: 'Full control over buyer API keys, user accounts, telemetry logs, and IP protection.',
      lockSession: 'Lock Master Session',
      shieldPythonTitle: 'Python Code Isolation',
      shieldPythonDesc: 'The buyer interacts strictly through REST HTTP endpoints. The main.py source code and SQLite structures remain inaccessible to clients.',
      shieldKeyTitle: 'Restricted Key Permissions',
      shieldKeyDesc: 'Each commercial buyer gets a unique x-api-key token with optional monthly query rate limits.',
      shieldDbTitle: 'SQLite Database Protection',
      shieldDbDesc: 'The greenscore.db database stays securely hosted on the server. Direct SQL queries are forbidden for end clients.',
      generatorTitle: 'API Key Generator for Commercial Buyers',
      buyerNameLabel: 'Client Entity / Buyer Name',
      apiKeyLabel: 'Assigned API Key (`x-api-key`)',
      rateLimitLabel: 'Monthly Metering Quota (Rate Limit)',
      readyForSale: 'License Ready for Commercial Provisioning',
      issueTokenButton: 'Issue Buyer Token',
      telemetryTitle: 'Real-Time Telemetry Logs (`medicoes_energia`)',
      colId: 'ID',
      colStation: 'Station / User ID',
      colTime: 'Timestamp',
      colCurrentKwh: 'Current kWh',
      colHistoricKwh: 'Historic kWh',
      colSavings: 'Savings',
      colAlert: 'Alert',
    },
    securityModal: {
      title: 'Commercial Sale Security Architecture',
      subtitle: 'How GreenScore protects intellectual property and proprietor data',
      point1Title: '1. Server-Side Execution & Code Shield',
      point1Desc: 'All green credit reward calculations (1 kWh = 2 credits), SQLite storage (greenscore.db), and API authentication reside solely on the Express/Node or FastAPI backend. The buyer never accesses backend code files or database credentials.',
      point2Title: '2. Header Authentication via `x-api-key` (`GREENSCORE_API_KEY`)',
      point2Desc: 'The buyer uses scoped API tokens to interact with /api/v1/medicoes/processar and /api/v1/assistente-voz endpoints. You can revoke or expire buyer licenses at any time from the Master Dashboard.',
      point3Title: '3. Role Separation (Client Portal vs. Master Admin)',
      point3Desc: 'The client interface shows only clean consumption metrics, voice synthesis, and telecontagem without exposing internal database schemas or master admin PIN (default: 3662).',
    },
    footer: {
      tagline: 'GreenScore Core Engine • Smart Energy Efficiency',
      securityLink: 'Security Architecture',
    },
  },
};
