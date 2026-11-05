const EXAM = new Date(2026, 10, 22);
const TODAY = new Date(2026, 10, 2);

const DAYS = [
  {
    id: "2026-11-02",
    date: "Seg 02/11",
    kind: "free",
    tag: "Feriado Finados · 5h30",
    title: "Virada: fechar o que o feriadão deixou aberto",
    phase: "Fase 1 · Fechar o alto rendimento",
    hours: "5h30",
    blocks: [
      { when: "07:30–09:30 · Específicas", text: "Atos administrativos: elementos, atributos (autoexecutoriedade, presunção de legitimidade, imperatividade) e classificação. Poder de Polícia ligado à apreensão e interdição. 25 questões depois da leitura." },
      { when: "10:00–12:00 · Legislação", text: "Lei 946/2014: direitos, vantagens, regime disciplinar (deveres, proibições, penalidades, sindicância e PAD). Monte a tabela de prazos no caderno se ainda não tiver." },
      { when: "14:00–16:00 · Constitucional + Informática", text: "Arts. 5º e 37–41 da CF (1h) + hardware, Windows e atalhos do Office (1h). Sem PPA, TCU ou processo legislativo federal." }
    ],
    tip: "Se o feriadão ficou incompleto, este dia recupera o núcleo da prova. Não tente 'passar o edital inteiro'."
  },
  {
    id: "2026-11-03",
    date: "Ter 03/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Municípios na CF + prazos da 946",
    phase: "Fase 1",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "CF Arts. 18–31 com foco em Municípios (29–31): autonomia, lei orgânica, competências. 12 questões." },
      { when: "20:00–20:50 · Legislação", text: "Revisão ativa da tabela de prazos: posse, exercício, estágio, recondução a pedido. 8 questões do banco (filtro Posse, Exercício, Estágio, Recondução)." },
      { when: "20:50–21:10 · Erros", text: "Passe a limpo o que errou hoje. Só isso." }
    ]
  },
  {
    id: "2026-11-04",
    date: "Qua 04/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Português que cai + Informática peso 4",
    phase: "Fase 1",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Português", text: "Interpretação (compreensão vs. inferência, sem extrapolação) + 15 questões de texto." },
      { when: "20:00–20:50 · Informática", text: "Segurança da informação (malware, phishing, backup) e navegadores. 20 questões." },
      { when: "20:50–21:10 · Erros", text: "8 prazos da Lei 946 de memória, sem olhar." }
    ]
  },
  {
    id: "2026-11-05",
    date: "Qui 05/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Improbidade, bens públicos e LOM",
    phase: "Fase 1",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "Improbidade (Lei 8.429 com 14.230/21: dolo, atos, penas) e bens públicos (comum, especial, dominical + 3 'in'). 15 questões." },
      { when: "20:00–20:50 · Legislação", text: "Lei Orgânica: competências do Município, bens municipais, organização político-administrativa." },
      { when: "20:50–21:10 · Erros", text: "Caderno de erros + atribuições do Anexo I em voz alta." }
    ]
  },
  {
    id: "2026-11-06",
    date: "Sex 06/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Art. 5º / 37 e gramática de prova",
    phase: "Fase 1",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "20 questões de Art. 5º (remédios constitucionais) e Art. 37 (LIMPE, concurso, acumulação)." },
      { when: "20:00–20:50 · Português", text: "Concordância nominal/verbal + pontuação. 20 questões. Sem morfologia profunda." },
      { when: "20:50–21:10 · Erros", text: "Releia só as questões que errou esta semana." }
    ]
  },
  {
    id: "2026-11-07",
    date: "Sáb 07/11",
    kind: "free",
    tag: "Folga · 5h30",
    title: "Fechar teoria útil e treinar Admin",
    phase: "Fase 1",
    hours: "5h30",
    blocks: [
      { when: "07:30–09:30 · Português", text: "Crase, regência e pontuação (os três que mais caem). 40 questões. Para quando errar 2 do mesmo tipo." },
      { when: "10:00–12:00 · Específicas", text: "Revisão ativa de Direito Administrativo: atos, agentes, poder de polícia, improbidade, bens. 40 questões." },
      { when: "14:00–16:00 · Legislação", text: "Leitura seca grifada da Lei 946 (capítulos menos lidos) + 15 flashcards de prazos." }
    ]
  },
  {
    id: "2026-11-08",
    date: "Dom 08/11",
    kind: "simulado",
    tag: "Simulado 1 · 5h30",
    title: "Primeiro simulado no formato da prova",
    phase: "Fase 1",
    hours: "5h30",
    blocks: [
      { when: "07:30–09:30 · Constitucional + LOM", text: "30 questões de CF (1º–5º, 29–31, 37–41) e tabela de competências/quóruns da Lei Orgânica." },
      { when: "10:00–12:00 · Simulado", text: "30 questões cronometradas: 10 PT, 10 Legislação, 10 Específicas. Máximo 3 horas, treine em 1h30." },
      { when: "14:00–16:00 · Correção", text: "Corrija uma a uma. Todo erro vira ficha no caderno com: tema, por que errou, artigo certo." }
    ]
  },
  {
    id: "2026-11-09",
    date: "Seg 09/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Atos + crase/pontuação",
    phase: "Fase 2 · Questões em massa",
    hours: "2h",
    note: "Após 17h: conferir inscrição homologada no site da banca.",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "30 questões de atos administrativos (elementos, atributos, classificação, extinção)." },
      { when: "20:00–20:50 · Português", text: "25 questões de reescrita, pontuação e crase." },
      { when: "20:50–21:10 · Erros", text: "Homologação + 8 prazos." }
    ]
  },
  {
    id: "2026-11-10",
    date: "Ter 10/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Lei 946 vs. CF servidores",
    phase: "Fase 2",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Legislação", text: "Lei 946: provimento, vacância, direitos e vantagens. Lei seca + 12 questões." },
      { when: "20:00–20:50 · Específicas", text: "25 questões de agentes/servidores na CF comparando com o Estatuto de Tanguá (pegadinha clássica)." },
      { when: "20:50–21:10 · Erros", text: "Anote divergências CF × Lei 946 (estabilidade, prazos, acumulação) para não misturar os dois textos." }
    ]
  },
  {
    id: "2026-11-11",
    date: "Qua 11/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Admin restante + Informática",
    phase: "Fase 2",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "25 questões: improbidade, princípios, direta/indireta, bens públicos." },
      { when: "20:00–20:50 · Informática", text: "25 questões: Windows, Word, Excel, hardware e segurança." },
      { when: "20:50–21:10 · Erros", text: "Atalhos que errou viram lista na parede." }
    ]
  },
  {
    id: "2026-11-12",
    date: "Qui 12/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Lei Orgânica + sintaxe",
    phase: "Fase 2",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Legislação", text: "LOM: competências, processo legislativo municipal, Administração Municipal." },
      { when: "20:00–20:50 · Português", text: "25 questões de orações e concordância." },
      { when: "20:50–21:10 · Erros", text: "Caderno de erros." }
    ]
  },
  {
    id: "2026-11-13",
    date: "Sex 13/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Constitucional + ética e atribuições",
    phase: "Fase 2",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "30 questões: princípios fundamentais, Art. 5º, Art. 37. Sem TCU/orçamento federal." },
      { when: "20:00–20:50 · Específicas", text: "Ética no serviço público + leitura integral das atribuições do Anexo I. Marque o que NÃO é Posturas (Tributos e Meio Ambiente)." },
      { when: "20:50–21:10 · Erros", text: "Armadilhas entre os três fiscais." }
    ]
  },
  {
    id: "2026-11-14",
    date: "Sáb 14/11",
    kind: "free",
    tag: "Folga · 5h30",
    title: "Maratona peso 4 + lei grifada",
    phase: "Fase 2",
    hours: "5h30",
    blocks: [
      { when: "07:30–09:30 · Específicas", text: "60 questões: Admin 25, Constitucional 20, Informática 10, Ética 5. Teoria só da questão errada." },
      { when: "10:00–12:00 · Legislação", text: "Leitura integral dos grifos da Lei 946 e da LOM." },
      { when: "14:00–16:00 · Flashcards", text: "30 perguntas rápidas dos artigos mais cobrados (competências, vedações, prazos, quóruns)." }
    ]
  },
  {
    id: "2026-11-15",
    date: "Dom 15/11",
    kind: "simulado",
    tag: "Simulado 2 · 5h30",
    title: "Simulado completo + correção profunda",
    phase: "Fase 2",
    hours: "5h30",
    blocks: [
      { when: "07:30–09:30 · Português", text: "45 questões: interpretação, crase, pontuação, concordância, regência." },
      { when: "10:00–12:00 · Simulado 2", text: "30 questões cronometradas no formato da prova." },
      { when: "14:00–16:00 · Correção", text: "Caderno de erros. Lista dos 5 temas que mais derrubam você. Esses temas mandam na semana 3." }
    ]
  },
  {
    id: "2026-11-16",
    date: "Seg 16/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Revisão Admin + regime disciplinar",
    phase: "Fase 3 · Precisão",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "Quadro-resumo de atos, provimento/vacância e bens públicos. Sem material novo." },
      { when: "20:00–20:50 · Legislação", text: "Regime disciplinar e prazos da Lei 946." },
      { when: "20:50–21:10 · Erros", text: "Só fichas vermelhas do caderno." }
    ]
  },
  {
    id: "2026-11-17",
    date: "Ter 17/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "CF seca + local de prova",
    phase: "Fase 3",
    hours: "2h",
    note: "Após 17h: local de prova e relação candidato x vaga em ibdoprojetos.org.br.",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "Leitura seca dos Arts. 1º–5º, 29–31 e 37–41." },
      { when: "20:00–20:50 · Português", text: "Somente os tópicos que você mais errou nos simulados." },
      { when: "20:50–21:10", text: "Anote local, horário e rota. Documento físico original." }
    ]
  },
  {
    id: "2026-11-18",
    date: "Qua 18/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Lei Orgânica + Informática",
    phase: "Fase 3",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Legislação", text: "LOM: competências do Município, Prefeito e Câmara." },
      { when: "20:00–20:50 · Informática", text: "Atalhos Windows/Office/Chrome + hardware e segurança." },
      { when: "20:50–21:10 · Erros", text: "Caderno." }
    ]
  },
  {
    id: "2026-11-19",
    date: "Qui 19/11",
    kind: "work",
    tag: "Dia útil · 2h",
    title: "Improbidade, ética e atribuições",
    phase: "Fase 3",
    hours: "2h",
    blocks: [
      { when: "19:00–19:50 · Específicas", text: "Improbidade, ética e Anexo I (atribuições). Compare Posturas × Tributos × Meio Ambiente." },
      { when: "20:00–20:50 · Português", text: "20 questões: crase, concordância, regência, conjunções." },
      { when: "20:50–21:10 · Erros", text: "Última passagem nos prazos." }
    ]
  },
  {
    id: "2026-11-20",
    date: "Sex 20/11",
    kind: "free",
    tag: "Consciência Negra · 5h30 se folga",
    title: "Caderno de erros + 30 específicas",
    phase: "Fase 3",
    hours: "5h30 ou 2h",
    note: "Se trabalhar, use só 19:00–21:10. Se folgar, faça 5h30.",
    blocks: [
      { when: "Folga: 07:30–12:00", text: "Caderno de erros inteiro + tabelas de prazos da 946 e da LOM." },
      { when: "Folga: 14:00–16:00", text: "30 questões de conhecimentos específicos." },
      { when: "Se trabalhar: 19:00–21:10", text: "Caderno de erros + 20 específicas. Sem matéria nova." }
    ]
  },
  {
    id: "2026-11-21",
    date: "Sáb 21/11",
    kind: "free",
    tag: "Véspera",
    title: "Revisão leve pela manhã, descanso absoluto à tarde",
    phase: "Fase 3",
    hours: "3h",
    blocks: [
      { when: "08:00–11:00 · Leve", text: "Só resumos: atos, bens públicos, prazos da 946, atribuições, crase/conjunções. Sem questão nova." },
      { when: "Tarde e noite", text: "Descanso. Separe RG/CNH físico, CCI, caneta transparente azul ou preta. Dormir 21:30." }
    ]
  },
  {
    id: "2026-11-22",
    date: "Dom 22/11",
    kind: "simulado",
    tag: "PROVA",
    title: "Dia da prova",
    phase: "Prova",
    hours: "—",
    blocks: [
      { when: "Manhã", text: "Chegue 1 hora antes do fechamento dos portões. Documento original físico com foto. Sem documento no celular." },
      { when: "Estratégia", text: "Faça primeiro as 10 específicas (peso 4). Depois legislação. Português por último, começando pelos textos. Não deixe em branco: chute consciente nos últimos 10 min." }
    ]
  }
];

const doneKey = "tango-fiscal-done";
const themeKey = "tango-fiscal-theme";
function storageKey(k) {
  if (k === themeKey) return k;
  try {
    const u = window.TF && window.TF.user;
    if (u && u.id) return "tfu-" + u.id + ":" + k;
  } catch (_) {}
  return k;
}
function lsGet(k) {
  try { return window.localStorage.getItem(storageKey(k)); } catch { return null; }
}
function lsSet(k, v) {
  try { window.localStorage.setItem(storageKey(k), v); } catch {}
  if (k === themeKey) return;
  if (window.TF && window.TF.applying) return;
  if (window.TF && window.TF.user && typeof window.tfScheduleSync === "function") {
    if (typeof window.tfMarkDirty === "function") window.tfMarkDirty(k);
    window.tfScheduleSync();
  }
}
function osThemePref() {
  try {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch (_) {}
  return "light";
}
function loadTheme() {
  const v = lsGet(themeKey);
  if (v === "dark" || v === "light") return v;
  return osThemePref();
}
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function syncThemeButton(t) {
  const btn = document.getElementById("btn-theme");
  if (!btn) return;
  const dark = t === "dark";
  btn.setAttribute("aria-pressed", dark ? "true" : "false");
  btn.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  const lab = btn.querySelector(".theme-label");
  if (lab) lab.textContent = dark ? "Modo claro" : "Modo escuro";
}
function applyTheme(theme, persist) {
  const t = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", t);
  if (persist) lsSet(themeKey, t);
  syncThemeButton(t);
}
function initTheme() {
  const saved = lsGet(themeKey);
  applyTheme(saved === "dark" || saved === "light" ? saved : osThemePref(), false);
  const btn = document.getElementById("btn-theme");
  if (btn) {
    btn.addEventListener("click", () => {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  }
}
initTheme();
function loadDone() {
  try { return JSON.parse(lsGet(doneKey) || "{}"); } catch { return {}; }
}
function saveDone(map) { lsSet(doneKey, JSON.stringify(map)); }

function pad(n) { return String(n).padStart(2, "0"); }
function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

function todayIso() {
  const n = new Date();
  if (n.getFullYear() === 2026 && n.getMonth() === 10) return iso(n);
  return "2026-11-03";
}

function daysUntilExam() {
  const n = new Date();
  const start = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  const exam = new Date(EXAM.getFullYear(), EXAM.getMonth(), EXAM.getDate());
  const diff = Math.round((exam - start) / 86400000);
  return diff;
}

try {
  const dl = document.getElementById("daysLeft");
  if (dl) dl.textContent = Math.max(daysUntilExam(), 0);
} catch (_) {}

let uiGroup = "hoje";
let uiPraticar = "questoes";
let uiDesempenho = "pesos";
let uiConteudos = "edital";
let qDetailOpen = false;
let wantDrill = false;
let qEdital = null;
let pendingDrill = null;
let covFilterDisc = "all";
let covFilterPri = "all";
let covFilterSit = "all";
let covOpenId = null;

function panelGroup(name) {
  if (name === "dia") return "calendario";
  if (name === "hoje" || name === "calendario" || name === "simulados" || name === "metodo") return name;
  if (name === "questoes" || name === "flashcards") return "praticar";
  if (name === "caderno" || name === "pesos") return "desempenho";
  if (name === "edital" || name === "cobertura" || name === "materiais" || name === "prazos") return "conteudos";
  if (name === "perfil" || name === "ranking") return name;
  return name;
}

function syncNav(name) {
  uiGroup = panelGroup(name);
  if (name === "questoes") uiPraticar = wantDrill ? "treino" : "questoes";
  if (name === "flashcards") uiPraticar = "flashcards";
  if (name === "caderno") uiDesempenho = uiDesempenho === "revisoes" ? "revisoes" : "caderno";
  if (name === "pesos") uiDesempenho = "pesos";
  if (name === "edital" || name === "cobertura" || name === "materiais" || name === "prazos") uiConteudos = name;
  document.querySelectorAll(".nav-btn[data-nav]").forEach((b) => {
    b.classList.toggle("active", b.dataset.nav === uiGroup || (uiGroup === "metodo" && b.dataset.nav === "mais"));
  });
  const subP = document.getElementById("sub-praticar");
  const subD = document.getElementById("sub-desempenho");
  const subC = document.getElementById("sub-conteudos");
  if (subP) subP.hidden = uiGroup !== "praticar";
  if (subD) subD.hidden = uiGroup !== "desempenho";
  if (subC) subC.hidden = uiGroup !== "conteudos";
  document.querySelectorAll("#sub-praticar .subtab").forEach((b) => b.classList.toggle("active", b.dataset.sub === uiPraticar));
  document.querySelectorAll("#sub-desempenho .subtab").forEach((b) => b.classList.toggle("active", b.dataset.sub === uiDesempenho));
  document.querySelectorAll("#sub-conteudos .subtab").forEach((b) => b.classList.toggle("active", b.dataset.sub === uiConteudos));
  const mais = document.getElementById("mais-menu");
  const btnMais = document.getElementById("btn-mais");
  if (mais && uiGroup !== "metodo") { mais.hidden = true; if (btnMais) btnMais.setAttribute("aria-expanded", "false"); }
}

function goPanel(name) {
  const tab = document.querySelector('.tab[data-panel="' + name + '"]');
  if (tab) tab.click();
  else {
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.panel === name));
    document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === name));
  }
  syncNav(name);
}

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(btn.dataset.panel);
    if (panel) panel.classList.add("active");
    syncNav(btn.dataset.panel);
    try {
      if (btn.dataset.panel === "hoje" && typeof renderToday === "function") renderToday();
      if (btn.dataset.panel === "calendario" && typeof renderCal === "function") {
        renderCal(typeof currentCalFilter === "function" ? currentCalFilter() : "all");
      }
      if (btn.dataset.panel === "dia") {
        const m = (location.hash || "").match(/^#dia-(\d{4}-\d{2}-\d{2})$/);
        if (m && typeof renderDiaPage === "function") renderDiaPage(m[1]);
      }
      if (btn.dataset.panel === "questoes" && typeof renderQuestoes === "function") renderQuestoes();
      if (btn.dataset.panel === "flashcards" && typeof renderFlashcards === "function") renderFlashcards();
      if (btn.dataset.panel === "simulados" && typeof renderSimHome === "function") renderSimHome();
      if (btn.dataset.panel === "caderno" && typeof renderCaderno === "function") renderCaderno();
      if (btn.dataset.panel === "edital" && typeof renderEdital === "function") renderEdital();
      if (btn.dataset.panel === "cobertura" && typeof renderCobertura === "function") renderCobertura();
      if (btn.dataset.panel === "pesos" && typeof renderStatsLive === "function") renderStatsLive();
      if (btn.dataset.panel === "perfil" && window.TFPlatform && typeof window.TFPlatform.renderPerfil === "function") window.TFPlatform.renderPerfil();
      if (btn.dataset.panel === "ranking" && window.TFPlatform && typeof window.TFPlatform.renderRanking === "function") window.TFPlatform.renderRanking();
    } catch (err) {
      const panel = document.getElementById(btn.dataset.panel);
      if (panel) {
        const box = panel.querySelector("#q-box, #sim-home, #caderno-box, #edital-tree") || panel;
        box.innerHTML = `<article class="card warn"><h3>Falha ao abrir esta aba</h3><p>${String(err && err.message ? err.message : err)}</p></article>`;
      }
    }
  });
});

document.querySelectorAll(".nav-btn[data-nav]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const n = btn.dataset.nav;
    if (n === "mais") {
      const menu = document.getElementById("mais-menu");
      if (!menu) return;
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", menu.hidden ? "false" : "true");
      return;
    }
    wantDrill = false;
    qPick = null;
    if (n === "praticar") {
      uiPraticar = "questoes";
      if (window.TFPlatform) window.TFPlatform.tfSetOrigin("banco");
      goPanel("questoes");
      return;
    }
    if (n === "desempenho") { uiDesempenho = "pesos"; goPanel("pesos"); return; }
    if (n === "conteudos") { uiConteudos = "edital"; goPanel("edital"); return; }
    goPanel(n);
  });
});
document.querySelectorAll("#sub-praticar .subtab").forEach((btn) => {
  btn.addEventListener("click", () => {
    uiPraticar = btn.dataset.sub;
    qPick = null;
    if (uiPraticar === "treino") { wantDrill = true; goPanel("questoes"); }
    else if (uiPraticar === "flashcards") { wantDrill = false; goPanel("flashcards"); }
    else { wantDrill = false; goPanel("questoes"); }
  });
});
document.querySelectorAll("#sub-desempenho .subtab").forEach((btn) => {
  btn.addEventListener("click", () => {
    uiDesempenho = btn.dataset.sub;
    if (uiDesempenho === "pesos") goPanel("pesos");
    else {
      if (typeof cadFilter !== "undefined") cadFilter = uiDesempenho === "revisoes" ? "due" : "all";
      goPanel("caderno");
    }
  });
});
document.querySelectorAll("#sub-conteudos .subtab").forEach((btn) => {
  btn.addEventListener("click", () => goPanel(btn.dataset.sub));
});
const maisMenu = document.getElementById("mais-menu");
if (maisMenu) {
  maisMenu.querySelectorAll("[data-go-panel]").forEach((b) => {
    b.addEventListener("click", () => { maisMenu.hidden = true; goPanel(b.dataset.goPanel); });
  });
}
document.addEventListener("click", (ev) => {
  const wrap = document.querySelector(".nav-more");
  const menu = document.getElementById("mais-menu");
  if (!wrap || !menu || menu.hidden) return;
  if (!wrap.contains(ev.target)) {
    menu.hidden = true;
    const bm = document.getElementById("btn-mais");
    if (bm) bm.setAttribute("aria-expanded", "false");
  }
});

function dashStats() {
  let blocksOn = 0, blocksAll = 0;
  DAYS.forEach((d) => d.blocks.forEach((_, i) => {
    blocksAll += 1;
    if (lsGet("b-" + d.id + "-" + i) === "1") blocksOn += 1;
  }));
  let ans = {};
  try { ans = loadAnswers(); } catch { ans = {}; }
  const answered = Object.keys(ans).filter((k) => ans[k]);
  const okN = answered.filter((k) => ans[k].ok).length;
  const pct = answered.length ? Math.round(okN * 100 / answered.length) : 0;
  const weak = {};
  let bankLen = 0;
  try {
    bankLen = BANK.length;
    BANK.forEach((q) => {
      if (!ans[q.id]) return;
      weak[q.disc] = weak[q.disc] || { ok: 0, n: 0 };
      weak[q.disc].n += 1;
      if (ans[q.id].ok) weak[q.disc].ok += 1;
    });
  } catch (_) {}
  const weakName = Object.keys(weak).sort((a, b) => (weak[a].ok / weak[a].n) - (weak[b].ok / weak[b].n))[0] || "—";
  let cad = [];
  try { cad = loadCaderno(); } catch { cad = []; }
  const due = cad.filter((c) => c.due <= Date.now()).length;
  let sims = [];
  try { sims = loadSims(); } catch { sims = []; }
  const hours = Math.round(blocksOn * 50 / 60 * 10) / 10;
  return { blocksOn, blocksAll, answered: answered.length, okN, pct, weakName, due, sims, hours, bank: bankLen };
}

function nowStudyHtml(cov, dsh, remaining) {
  const recs = [];
  const rows = (cov && cov.rows) || [];
  const notStarted = rows.filter((r) => r.sit === "nao" || r.sit === "material");
  const highGap = rows.filter((r) => r.e.pri === "alta" && r.sit !== "dominado");
  const weak = rows.filter((r) => r.pct != null && r.answered >= 2 && r.pct < 70).sort((a, b) => a.pct - b.pct);
  const practice = rows.filter((r) => r.sit === "praticar" || r.sit === "questoes");
  if (notStarted[0]) recs.push({ t: "Ainda não estudado", d: notStarted[0].e.topic, why: "Assunto do Anexo II sem prática. Faltam ~" + remaining + " dias.", go: "cobertura", id: notStarted[0].e.id });
  if (highGap[0] && (!notStarted[0] || highGap[0].e.id !== notStarted[0].e.id)) recs.push({ t: "Maior peso / prioridade alta", d: highGap[0].e.topic, why: "Específicas valem 40/80. Prioridade altera o tempo, não a presença.", go: "cobertura", id: highGap[0].e.id });
  if (weak[0]) recs.push({ t: "Baixo aproveitamento", d: weak[0].e.topic + " · " + weak[0].pct + "%", why: "Reforce com questões, não com releitura.", go: "cobertura", id: weak[0].e.id });
  if (dsh.due) recs.push({ t: "Revisões vencidas", d: dsh.due + " ficha(s) no caderno", why: "D+1 / D+3 / D+7. Erro recente volta mais cedo.", go: "caderno" });
  if (practice[0] && recs.length < 5) recs.push({ t: "Precisa praticar", d: practice[0].e.topic, why: "Há material, mas ainda falta volume de questões.", go: "cobertura", id: practice[0].e.id });
  if (!recs.length) recs.push({ t: "Manter ritmo", d: "Simulado ou intercalação", why: "Sem lacuna crítica detectada. Preserve específica, PT e legislação.", go: "simulados" });
  return `
    <article class="card rec-now">
      <h3>O que devo estudar agora?</h3>
      <p class="tree-meta">Ordem: lacuna do edital → peso da prova → baixo acerto → revisão vencida → prioridade alta. Tempo restante até 22/11 entra no recorte, não no corte de matéria.</p>
      <ol class="rec-list">
        ${recs.slice(0, 5).map((r) => `<li><b>${r.t}:</b> ${r.d}<br><span class="tree-meta">${r.why}</span>${r.id ? ` <button type="button" class="btn" data-recid="${r.id}">Abrir</button>` : ` <button type="button" class="btn" data-home="${r.go}">Abrir</button>`}</li>`).join("")}
      </ol>
    </article>
  `;
}

function coverageSummary() {
  const official = EDITAL.filter((e) => (e.cat || "oficial") === "oficial" || e.cat === "anexo1");
  const rows = official.map((e) => Object.assign({ e: e }, topicCoverage(e)));
  const withMat = rows.filter((r) => r.hasNote).length;
  const withQ = rows.filter((r) => r.qs.length > 0).length;
  const concluded = rows.filter((r) => r.sit === "dominado").length;
  const highOpen = rows.filter((r) => r.e.pri === "alta" && r.sit !== "dominado")[0];
  const weak = rows.filter((r) => r.pct != null && r.answered >= 2).sort((a, b) => a.pct - b.pct)[0];
  const discs = {};
  rows.forEach((r) => {
    discs[r.e.disc] = discs[r.e.disc] || { n: 0, mat: 0, q: 0, done: 0 };
    discs[r.e.disc].n += 1;
    if (r.hasNote) discs[r.e.disc].mat += 1;
    if (r.qs.length) discs[r.e.disc].q += 1;
    if (r.sit === "dominado") discs[r.e.disc].done += 1;
  });
  return { rows, withMat, withQ, concluded, total: rows.length, highOpen, weak, discs, pct: Math.round(concluded * 100 / rows.length) };
}

function renderToday() {
  const id = todayIso();
  const day = DAYS.find((d) => d.id === id) || DAYS[0];
  const done = loadDone();
  const remaining = DAYS.filter((d) => d.id >= id && d.id < "2026-11-22").length;
  const doneCount = DAYS.filter((d) => done[d.id]).length;
  const dsh = dashStats();
  const el = document.getElementById("hoje");
  const tasks = (day.blocks || []).map((b) => (b.when.split("·")[1] || b.when).trim());
  let cov = { total: 0, withMat: 0, withQ: 0, concluded: 0, pct: 0, discs: {}, highOpen: null, weak: null };
  try { cov = coverageSummary(); } catch (_) {}
  el.innerHTML = `
    <article class="card next-step">
      <p class="phase">Seu próximo passo</p>
      <h2>${day.date} · ${day.title}</h2>
      <p>${day.tag}${day.note ? " · " + day.note : ""}</p>
      <p>${tasks.length ? "<b>Disciplinas:</b> " + tasks.join(" · ") : ""}</p>
      <div class="prog"><i style="width:${Math.round(doneCount * 100 / DAYS.length)}%"></i></div>
      <p class="tree-meta">${day.hours} previstos · ${remaining} dias de estudo pela frente</p>
      <div class="q-nav">
        <button type="button" class="btn primary" id="home-start">Começar a estudar</button>
      </div>
    </article>
    <div class="dash dash-3">
      <div class="stat"><b>${doneCount}/${DAYS.length}</b><span>progresso do cronograma</span></div>
      <div class="stat"><b>${dsh.answered}</b><span>questões respondidas · ${dsh.pct}% de acerto</span></div>
      <div class="stat"><b>${dsh.due}</b><span>revisões pendentes hoje</span></div>
    </div>
    <article class="card">
      <h3>Cobertura real do edital</h3>
      <p>${cov.concluded}/${cov.total} tópicos dominados (${cov.pct}%). Material: ${cov.withMat}/${cov.total}. Questões: ${cov.withQ}/${cov.total}. Dominado exige prática recente com aproveitamento, não só a marca de estudo.</p>
      <ul>
        ${Object.keys(cov.discs).map((d) => `<li><b>${d}:</b> ${cov.discs[d].done}/${cov.discs[d].n} concluídos · ${cov.discs[d].q} com questões</li>`).join("")}
      </ul>
      <p><b>Prioridade alta em aberto:</b> ${cov.highOpen ? cov.highOpen.e.topic : "nenhuma (ou ainda sem matriz)."}</p>
      <p><b>Menor aproveitamento:</b> ${cov.weak ? cov.weak.e.topic + " · " + cov.weak.pct + "%" : "ainda sem amostra de 2 respostas em um tópico da matriz."}</p>
      <p class="tree-meta">Revisões pendentes: ${dsh.due}. Próximo passo do cronograma: ${day.title}.</p>
      <div class="q-nav">
        <button type="button" class="btn primary" data-home="cobertura">Abrir cobertura</button>
        ${cov.highOpen ? `<button type="button" class="btn gold" id="home-high">Estudar prioridade alta</button>` : ""}
      </div>
    </article>
    ${nowStudyHtml(cov, dsh, remaining)}
    <p class="phase" style="margin:4px 0 8px">Acesso rápido</p>
    <div class="quick-actions">
      <button type="button" class="btn" data-home="calendario">Continuar cronograma</button>
      <button type="button" class="btn" data-home="questoes">Resolver questões</button>
      <button type="button" class="btn" data-home="treino">Fazer treino rápido</button>
      <button type="button" class="btn" data-home="flashcards">Flashcards</button>
      <button type="button" class="btn" data-home="simulados">Iniciar simulado</button>
      <button type="button" class="btn" data-home="caderno">Caderno de erros</button>
    </div>
  `;
  const start = document.getElementById("home-start");
  if (start) start.addEventListener("click", () => {
    if (typeof openDia === "function") openDia(day.id);
    else goPanel("calendario");
  });
  el.querySelectorAll("[data-home]").forEach((b) => {
    b.addEventListener("click", () => {
      const t = b.dataset.home;
      if (t === "treino") { qPick = null; wantDrill = true; goPanel("questoes"); }
      else if (t === "flashcards") { wantDrill = false; goPanel("flashcards"); }
      else if (t === "caderno") { uiDesempenho = "caderno"; goPanel("caderno"); }
      else goPanel(t);
    });
  });
  const highBtn = document.getElementById("home-high");
  if (highBtn && cov.highOpen) highBtn.addEventListener("click", () => {
    covOpenId = cov.highOpen.e.id;
    goPanel("cobertura");
  });
  el.querySelectorAll("[data-recid]").forEach((b) => b.addEventListener("click", () => {
    covOpenId = b.dataset.recid;
    goPanel("cobertura");
  }));
}

function renderCal(filter) {
  const done = loadDone();
  const today = todayIso();
  const list = document.getElementById("cal-list");
  const items = DAYS.filter((d) => filter === "all" || d.kind === filter);
  list.innerHTML = items.map((d) => `
    <article class="day ${d.id === today ? "today" : ""} ${done[d.id] ? "done" : ""}" data-kind="${d.kind}">
      <div>
        <span class="date">${d.date}</span>
        <span class="kind">${d.tag}</span>
      </div>
      <div>
        <h3>${d.title}</h3>
        <p>${d.blocks.map((b) => b.when.split("·")[0].trim() + ": " + b.text).join(" | ")}</p>
      </div>
      <button data-id="${d.id}">${done[d.id] ? "Concluído" : "Marcar"}</button>
    </article>
  `).join("");
  list.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const map = loadDone();
      map[btn.dataset.id] = !map[btn.dataset.id];
      saveDone(map);
      const on = document.querySelector("#calendario .chip.active");
      renderCal(on ? on.dataset.filter : "all");
      renderToday();
    });
  });
}

document.querySelectorAll("#calendario .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll("#calendario .chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderCal(chip.dataset.filter);
  });
});

try { renderToday(); } catch (_) {}
try { renderCal("all"); } catch (_) {}

const editalKey = "tango-fiscal-edital";
function loadEdital() {
  try { return JSON.parse(lsGet(editalKey) || "{}"); } catch { return {}; }
}
function saveEdital(map) { lsSet(editalKey, JSON.stringify(map)); }

const EDITAL = [
  { id: "pt-interp", disc: "Língua Portuguesa", pri: "alta", evid: "proxima", recQ: 8, bankTopics: ["Interpretação"], topic: "Leitura e interpretação de texto (ideia principal, explícito, implícito, sem extrapolação)" },
  { id: "pt-var", disc: "Língua Portuguesa", pri: "cobertura", evid: "insuficiente", recQ: 3, bankTopics: ["Variações linguísticas"], topic: "Variações linguísticas" },
  { id: "pt-func", disc: "Língua Portuguesa", pri: "média", evid: "insuficiente", recQ: 5, bankTopics: ["Funções da linguagem"], topic: "Funções da linguagem" },
  { id: "pt-gen", disc: "Língua Portuguesa", pri: "média", evid: "insuficiente", recQ: 5, bankTopics: ["Tipos e gêneros"], topic: "Tipos e gêneros de texto" },
  { id: "pt-coes", disc: "Língua Portuguesa", pri: "média", evid: "insuficiente", recQ: 5, bankTopics: ["Coesão", "Coerência"], topic: "Coesão e coerência textuais" },
  { id: "pt-orto", disc: "Língua Portuguesa", pri: "alta", evid: "proxima", recQ: 8, bankTopics: ["Ortografia", "Pontuação"], topic: "Ortografia do Acordo: letras, maiúsculas, acentuação, pontuação" },
  { id: "pt-fono", disc: "Língua Portuguesa", pri: "cobertura", evid: "insuficiente", recQ: 5, bankTopics: ["Fonologia"], topic: "Fonologia/fonética: letra/fonema, encontros vocálicos e consonantais, dígrafos (Anexo II)" },
  { id: "pt-morf", disc: "Língua Portuguesa", pri: "média", evid: "proxima", recQ: 5, bankTopics: ["Formação", "Morfologia"], topic: "Morfologia: elementos mórficos, formação e classes de palavras" },
  { id: "pt-sint", disc: "Língua Portuguesa", pri: "alta", evid: "proxima", recQ: 10, bankTopics: ["Concordância", "Regência", "Crase", "Sintaxe", "Termos da oração", "Orações"], topic: "Sintaxe: termos, coordenadas/subordinadas, concordância, regência, crase" },
  { id: "pt-sem", disc: "Língua Portuguesa", pri: "média", evid: "insuficiente", recQ: 5, bankTopics: ["Semântica"], topic: "Semântica: denotação, conotação, sinonímia, antonímia, homonímia, paronímia, polissemia e ambiguidade" },
  { id: "pt-fig", disc: "Língua Portuguesa", pri: "cobertura", evid: "insuficiente", recQ: 4, bankTopics: ["Figuras"], topic: "Figuras de linguagem (Anexo II, ensino médio)" },
  { id: "leg-946-inv", disc: "Legislação", pri: "alta", evid: "hipotese", recQ: 8, bankTopics: ["Posse", "Exercício", "Concurso", "Investidura"], topic: "Lei 946: investidura, concurso, posse e exercício (Arts. 13–38)" },
  { id: "leg-946-prov", disc: "Legislação", pri: "alta", evid: "hipotese", recQ: 8, bankTopics: ["Provimento", "Vacância", "Recondução", "Reversão", "Nomeação", "Readaptação"], topic: "Lei 946: 7 formas de provimento e vacância (Arts. 20–32 e 49–53)" },
  { id: "leg-946-est", disc: "Legislação", pri: "alta", evid: "hipotese", recQ: 5, bankTopics: ["Estágio", "Estabilidade"], topic: "Lei 946: estágio probatório e estabilidade (Arts. 39–48)" },
  { id: "leg-946-dir", disc: "Legislação", pri: "média", evid: "insuficiente", recQ: 5, bankTopics: ["Direitos", "Licenças"], topic: "Lei 946: direitos, vantagens, licenças e concessões" },
  { id: "leg-946-disc", disc: "Legislação", pri: "alta", evid: "hipotese", recQ: 10, bankTopics: ["PAD", "Penalidades", "Abandono", "Prescrição", "Acumulação", "Proibições"], topic: "Lei 946: deveres, proibições, penalidades, sindicância e PAD (Arts. 204–271)" },
  { id: "leg-946-pet", disc: "Legislação", pri: "média", evid: "insuficiente", recQ: 4, bankTopics: ["Recurso", "Petição"], topic: "Lei 946: direito de petição e recurso (15 dias, Arts. 198–199)" },
  { id: "leg-lom", disc: "Legislação", pri: "alta", evid: "proxima", recQ: 6, bankTopics: ["Lei Orgânica"], topic: "Lei Orgânica: competências do Município (Art. 20)" },
  { id: "leg-lom-cam", disc: "Legislação", pri: "alta", evid: "proxima", recQ: 4, bankTopics: ["Lei Orgânica"], subs: ["Câmara", "Emenda à LOM"], topic: "Lei Orgânica: Câmara de Vereadores (Art. 43) e emenda (Art. 69)" },
  { id: "leg-lom-pref", disc: "Legislação", pri: "alta", evid: "hipotese", recQ: 4, bankTopics: ["Lei Orgânica"], subs: ["Prefeito"], topic: "Lei Orgânica: atribuições do Prefeito (Art. 94)" },
  { id: "esp-cf-pf", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 5, bankTopics: ["CF 1º", "CF poderes"], topic: "CF Arts. 1º–4º: princípios fundamentais" },
  { id: "esp-cf-5", disc: "Específicas", pri: "alta", evid: "hipotese", recQ: 5, bankTopics: ["CF 5º"], topic: "CF Art. 5º: direitos e garantias; remédios constitucionais" },
  { id: "esp-cf-mun", disc: "Específicas", pri: "alta", evid: "hipotese", recQ: 5, bankTopics: ["Municípios", "Organização do Estado"], topic: "CF Arts. 18–31: organização do Estado, Municípios (29–31)" },
  { id: "esp-cf-adm", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 8, bankTopics: ["CF 37", "Servidores CF"], topic: "CF Arts. 37–41: Administração Pública e servidores" },
  { id: "esp-cf-leg", disc: "Específicas", pri: "cobertura", evid: "proxima", recQ: 4, bankTopics: ["Fiscalização contábil"], topic: "CF: Poder Legislativo e fiscalização contábil, financeira e orçamentária (noções; Arts. 44–75)" },
  { id: "esp-cf-fin", disc: "Específicas", pri: "cobertura", evid: "insuficiente", recQ: 4, bankTopics: ["Orçamento"], topic: "CF: tributação, orçamento e finanças públicas (noções; Arts. 145–169). Não é o programa de Agente de Controle Interno" },
  { id: "esp-adm-prin", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 6, bankTopics: ["Administração"], topic: "Princípios administrativos (LIMPE) e administração direta/indireta" },
  { id: "esp-adm-atos", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 8, bankTopics: ["Atos"], topic: "Atos: elementos, atributos, validade/eficácia, anulação/revogação" },
  { id: "esp-adm-atos-class", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 8, bankTopics: ["Atos"], subs: ["Simples, complexo e composto", "Gerais e individuais", "Unilaterais", "Poder de polícia"], topic: "Classificação dos atos: simples/complexos/compostos; uni/bi/multilaterais; gerais/individuais; vinculados/discricionários" },
  { id: "esp-adm-proc", disc: "Específicas", pri: "cobertura", evid: "insuficiente", recQ: 3, bankTopics: ["Procedimento"], topic: "Procedimento administrativo na formação do ato (Anexo II)" },
  { id: "esp-adm-ag", disc: "Específicas", pri: "média", evid: "insuficiente", recQ: 5, bankTopics: ["Agentes públicos"], topic: "Agentes públicos; servidor e funcionário; direitos, deveres e responsabilidades" },
  { id: "esp-adm-imp", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 5, bankTopics: ["Improbidade"], topic: "Improbidade administrativa (Lei 8.429 com 14.230/21)" },
  { id: "esp-adm-bens", disc: "Específicas", pri: "média", evid: "insuficiente", recQ: 4, bankTopics: ["Bens públicos"], topic: "Bens públicos: comum, especial, dominical" },
  { id: "esp-adm-prov-vac", disc: "Específicas", pri: "alta", evid: "hipotese", recQ: 5, bankTopics: ["Provimento CF"], topic: "Formas de provimento e vacância dos cargos públicos (Anexo II de específicas; cruzar com Lei 946 Arts. 20 e 49)" },
  { id: "esp-etica", disc: "Específicas", pri: "média", evid: "insuficiente", recQ: 4, bankTopics: ["Ética"], topic: "Ética profissional no serviço público" },
  { id: "esp-info-hw", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 6, bankTopics: ["Informática"], subs: ["Hardware", "Impressoras"], topic: "Informática: hardware, impressoras, scanners, multifuncionais" },
  { id: "esp-info-so", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 8, bankTopics: ["Informática"], subs: ["Windows", "Office", "Internet Explorer", "Google Chrome"], topic: "Informática: Windows, Office, Internet Explorer e Chrome" },
  { id: "esp-info-seg", disc: "Específicas", pri: "alta", evid: "proxima", recQ: 5, bankTopics: ["Informática"], subs: ["Ransomware"], topic: "Informática: segurança da informação (malware, phishing, backup)" },
  { id: "esp-anexo1", disc: "Específicas", pri: "alta", evid: "direta", recQ: 8, bankTopics: ["Anexo I"], topic: "Anexo I: atribuições do Fiscal de Posturas (não confundir com Tributos/Meio Ambiente)", cat: "anexo1" },
  { id: "comp-657", disc: "Complementar", pri: "baixa", evid: "fora", recQ: 0, bankTopics: [], topic: "Lei 657/2007 — Código de Posturas (NÃO está no Anexo II; só para entender a função)", cat: "complementar" }
];

function editalDone(rec) {
  return rec === true || (rec && rec.done);
}

function editalAt(rec) {
  if (rec && rec.at) return new Date(rec.at).toLocaleDateString("pt-BR");
  return "";
}

function qForTopic(e) {
  if (typeof BANK === "undefined") return [];
  return BANK.filter((q) => {
    if (e.cat === "complementar") return false;
    if (e.disc === "Língua Portuguesa" && q.disc !== "Português") return false;
    if (e.disc === "Legislação" && q.disc !== "Legislação") return false;
    if (e.disc === "Específicas" && q.disc !== "Específicas") return false;
    if (Array.isArray(q.edital) && q.edital.length) return q.edital.indexOf(e.id) >= 0;
    if (Array.isArray(e.bankTopics) && e.bankTopics.length) {
      const topicOk = e.bankTopics.indexOf(q.topic) >= 0;
      if (!topicOk) return false;
      if (Array.isArray(e.subs) && e.subs.length) {
        const sub = String(q.sub || "").toLowerCase();
        if (sub) return e.subs.some((s) => sub.indexOf(String(s).toLowerCase()) >= 0);
      } else {
        return true;
      }
    }
    const blob = (q.topic + " " + (q.art || "") + " " + (q.sub || "")).toLowerCase();
    const hints = {
      "pt-interp": ["interpretação", "texto"],
      "pt-var": ["varia"],
      "pt-func": ["função"],
      "pt-gen": ["gênero", "tipos"],
      "pt-coes": ["coesão", "coerência"],
      "pt-orto": ["ortografia", "acentu", "pontuação"],
      "pt-fono": ["fonolog", "dígrafo", "fonema"],
      "pt-morf": ["formação", "morfolog"],
      "pt-sint": ["concordância", "regência", "crase", "sintaxe"],
      "pt-sem": ["semântica", "conotativ", "denotativ"],
      "pt-fig": ["figura"],
      "leg-946-inv": ["posse", "exercício", "concurso", "investidura"],
      "leg-946-prov": ["provimento", "vacância", "recondução", "reversão", "nomeação", "readaptação"],
      "leg-946-est": ["estágio", "estabilidade"],
      "leg-946-dir": ["casamento", "falecimento", "licença"],
      "leg-946-disc": ["pad", "sindicância", "abandono", "prescrição", "penalidad", "proibi"],
      "leg-946-pet": ["recurso", "petição"],
      "leg-lom": ["orgânica", "art. 20"],
      "leg-lom-cam": ["câmara", "emenda"],
      "leg-lom-pref": ["prefeito"],
      "esp-cf-pf": ["art. 1", "fundamento", "art. 2"],
      "esp-cf-5": ["art. 5"],
      "esp-cf-mun": ["município", "art. 29", "art. 18"],
      "esp-cf-adm": ["art. 37", "estável", "servidor"],
      "esp-cf-leg": ["legislativ", "fiscalização"],
      "esp-cf-fin": ["orçamento", "finança", "tribut"],
      "esp-adm-prin": ["limpe", "princípio", "direta"],
      "esp-adm-atos": ["ato", "atributo", "anulação", "revogação", "autoexecut"],
      "esp-adm-atos-class": ["vinculado", "discricionár", "simples", "complexo", "unilateral"],
      "esp-adm-proc": ["procedimento"],
      "esp-adm-ag": ["agente"],
      "esp-adm-imp": ["improbidade"],
      "esp-adm-bens": ["bens públicos"],
      "esp-etica": ["ética"],
      "esp-info-hw": ["ram", "hardware", "scanner", "impressora"],
      "esp-info-so": ["windows", "office", "explorer", "chrome"],
      "esp-info-seg": ["phishing", "backup", "segurança", "ransomware"],
      "esp-anexo1": ["anexo i", "circo", "ambulante", "iss"],
      "esp-adm-prov-vac": ["provimento", "vacância"]
    }[e.id] || [];
    return hints.some((h) => blob.indexOf(h) >= 0);
  });
}

function renderEdital() {
  const box = document.getElementById("edital-tree");
  if (!box) return;
  const map = loadEdital();
  const ans = typeof loadAnswers === "function" ? loadAnswers() : {};
  const cats = [
    { id: "oficial", title: "1. Conteúdo do Anexo II (oficial)" },
    { id: "anexo1", title: "2. Atribuições do cargo (Anexo I)" },
    { id: "complementar", title: "3. Complementar (não está no Anexo II)" }
  ];
  const official = EDITAL.filter((e) => (e.cat || "oficial") === "oficial");
  const doneN = official.filter((e) => editalDone(map[e.id])).length;
  box.innerHTML = `
    <p class="section-head" style="margin-bottom:12px">Anexo II: <b>${doneN}/${official.length}</b> tópicos oficiais marcados. Chave ${editalKey}; não mexe nos checkboxes dos dias.</p>
    ${cats.map((cat) => {
      const items = EDITAL.filter((e) => (e.cat || "oficial") === cat.id);
      if (!items.length) return "";
      const discs = [...new Set(items.map((e) => e.disc))];
      return discs.map((g) => `
        <article class="card">
          <h3>${cat.title}${g !== "Complementar" ? " · " + g : ""}</h3>
          ${items.filter((e) => e.disc === g).map((e) => {
            const rec = map[e.id];
            const done = editalDone(rec);
            const at = editalAt(rec);
            const qs = qForTopic(e);
            const answered = qs.filter((q) => ans[q.id]);
            const ok = answered.filter((q) => ans[q.id] && ans[q.id].ok).length;
            const pct = answered.length ? Math.round(ok * 100 / answered.length) : null;
            return `<div class="tree-item">
              <input type="checkbox" data-edital="${e.id}" ${done ? "checked" : ""}/>
              <span>
                <span class="pri">${e.pri}${at ? " · estudado em " + at : " · falta marcar"}</span><br>${e.topic}
                <span class="tree-meta">${qs.length ? qs.length + " questão(ões) ligadas" : "sem questão ligada ainda"}${pct != null ? " · " + pct + "% de acerto (" + ok + "/" + answered.length + ")" : ""}</span>
                 <span class="links">
                   ${qs.length ? `<button type="button" data-goq="${e.id}">Resolver</button>` : ""}
                   <button type="button" data-gocov="${e.id}">Cobertura</button>
                   <button type="button" data-gom="materiais">Materiais</button>
                 </span>
              </span>
            </div>`;
          }).join("")}
        </article>
      `).join("");
    }).join("")}
  `;
  box.querySelectorAll("input[data-edital]").forEach((input) => {
    input.addEventListener("change", () => {
      const next = loadEdital();
      next[input.dataset.edital] = input.checked ? { done: true, at: Date.now() } : { done: false };
      saveEdital(next);
      renderEdital();
    });
  });
  box.querySelectorAll("button[data-goq]").forEach((btn) => {
    btn.addEventListener("click", () => openTopicQuestions(btn.dataset.goq));
  });
  box.querySelectorAll("button[data-gocov]").forEach((btn) => {
    btn.addEventListener("click", () => {
      covOpenId = btn.dataset.gocov;
      goPanel("cobertura");
    });
  });
  box.querySelectorAll("button[data-gom]").forEach((btn) => {
    btn.addEventListener("click", () => {
      goPanel("materiais");
    });
  });
}

function openTopicQuestions(id) {
  const item = EDITAL.find((e) => e.id === id);
  if (!item) return;
  qEdital = id;
  qFilter = item.disc === "Língua Portuguesa" ? "Português" : item.disc === "Legislação" ? "Legislação" : item.disc === "Específicas" ? "Específicas" : "all";
  qTopic = "all";
  qIndex = 0;
  qPick = null;
  wantDrill = false;
  uiPraticar = "questoes";
  goPanel("questoes");
}

function openTopicDrill(id) {
  const item = EDITAL.find((e) => e.id === id);
  if (!item) return;
  pendingDrill = { src: "edital:" + id, n: 10 };
  qEdital = id;
  wantDrill = true;
  uiPraticar = "treino";
  goPanel("questoes");
}

function topicCoverage(e) {
  const map = loadEdital();
  const ans = loadAnswers();
  const qs = qForTopic(e);
  const answered = qs.filter((q) => ans[q.id]);
  const ok = answered.filter((q) => ans[q.id] && ans[q.id].ok).length;
  const pct = answered.length ? Math.round(ok * 100 / answered.length) : null;
  const hasNote = !!NOTES[e.id];
  const rec = e.recQ || 0;
  const doneMark = editalDone(map[e.id]);
  const lastAt = answered.reduce((mx, q) => Math.max(mx, Number((ans[q.id] && ans[q.id].at) || 0)), 0);
  const lastRev = lastAt ? new Date(lastAt).toLocaleDateString("pt-BR") : "";
  const nextRev = lastAt ? new Date(lastAt + 3 * 86400000).toLocaleDateString("pt-BR") : "";
  let sit = "nao";
  if (e.cat === "complementar") sit = "comp";
  else if (hasNote && qs.length >= Math.max(3, Math.min(rec || 3, 3)) && answered.length >= 3 && pct != null && pct >= 80 && lastAt && (Date.now() - lastAt) <= 7 * 86400000) sit = "dominado";
  else if (hasNote && qs.length && answered.length >= 2 && pct != null && pct >= 70 && lastAt && (Date.now() - lastAt) > 3 * 86400000) sit = "revisao";
  else if (hasNote && qs.length && answered.length >= 2 && pct != null && pct < 70) sit = "praticar";
  else if (hasNote && qs.length && answered.length) sit = "estudo";
  else if (hasNote && qs.length) sit = "questoes";
  else if (hasNote) sit = "material";
  return { qs, answered: answered.length, ok, pct, hasNote, rec, doneMark, sit, lastRev, nextRev, lastAt };
}

function sitLabel(sit) {
  return ({
    nao: "Não iniciado",
    material: "Material disponível",
    questoes: "Precisa praticar",
    estudo: "Estudando",
    praticar: "Precisa praticar",
    revisao: "Em revisão",
    dominado: "Dominado",
    comp: "Complementar"
  })[sit] || sit;
}

function evidLabel(ev) {
  return ({
    direta: "Evidência direta (Fiscal de Posturas IBDO)",
    proxima: "Evidência próxima / briefing da amostra",
    hipotese: "Hipótese de relevância (edital + cargo)",
    insuficiente: "Sem evidência suficiente na amostra",
    fora: "Fora do Anexo II"
  })[ev] || "Sem evidência suficiente na amostra";
}

function renderCobertura() {
  const box = document.getElementById("cobertura-box");
  if (!box) return;
  const official = EDITAL.filter((e) => (e.cat || "oficial") === "oficial" || e.cat === "anexo1");
  const rows = official.map((e) => Object.assign({ e: e }, topicCoverage(e)));
  const withMat = rows.filter((r) => r.hasNote).length;
  const withQ = rows.filter((r) => r.qs.length > 0).length;
  const withWhy = rows.filter((r) => r.qs.length && r.qs.every((q) => q.why)).length;
  const concluded = rows.filter((r) => r.sit === "dominado").length;
  const list = rows.filter((r) => {
    if (covFilterDisc !== "all" && r.e.disc !== covFilterDisc) return false;
    if (covFilterPri !== "all" && r.e.pri !== covFilterPri) return false;
    if (covFilterSit === "semq" && r.qs.length) return false;
    if (covFilterSit === "nao" && r.sit !== "nao" && r.sit !== "material") return false;
    if (covFilterSit === "praticar" && r.sit !== "praticar" && r.sit !== "questoes") return false;
    if (covFilterSit === "revisao" && r.sit !== "revisao") return false;
    if (covFilterSit === "baixo" && !(r.pct != null && r.pct < 70 && r.answered >= 2)) return false;
    if (covFilterSit === "ok" && r.sit !== "dominado") return false;
    return true;
  });
  const open = covOpenId ? EDITAL.find((e) => e.id === covOpenId) : null;
  const openCov = open ? topicCoverage(open) : null;
  box.innerHTML = `
    <div class="dash dash-3">
      <div class="stat"><b>${withMat}/${rows.length}</b><span>tópicos com material</span></div>
      <div class="stat"><b>${withQ}/${rows.length}</b><span>tópicos com questões</span></div>
      <div class="stat"><b>${concluded}/${rows.length}</b><span>dominados (prática recente ≥80%, não só marca de estudo)</span></div>
    </div>
    <p class="tree-meta">Cobertura real não é só checkbox. Dominado exige material, questões, ≥3 respostas, ≥80% e prática nos últimos 7 dias. ${withWhy} tópico(s) com explicação em todas as questões ligadas. Percentual dominado: ${Math.round(concluded * 100 / rows.length)}%.</p>
    <article class="card">
      <h3>Amostra IBDO (sem invenção)</h3>
      <p>${IBDO_SAMPLE.note}</p>
      <p>Provas encontradas: ${IBDO_SAMPLE.examsFound}. Lidas na íntegra (OCR): ${IBDO_SAMPLE.examsReadInFull}. Atualizado em ${IBDO_SAMPLE.updated}.</p>
      <p>${IBDO_SAMPLE.observed}</p>
      <p class="tree-meta">${IBDO_SAMPLE.confidence}</p>
      <ul>${IBDO_SAMPLE.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a> · ${s.kind}</li>`).join("")}</ul>
    </article>
    <div class="filters" id="cov-filters">
      <button type="button" class="chip ${covFilterDisc === "all" ? "active" : ""}" data-cd="all">Todas as disciplinas</button>
      <button type="button" class="chip ${covFilterDisc === "Língua Portuguesa" ? "active" : ""}" data-cd="Língua Portuguesa">Português</button>
      <button type="button" class="chip ${covFilterDisc === "Legislação" ? "active" : ""}" data-cd="Legislação">Legislação</button>
      <button type="button" class="chip ${covFilterDisc === "Específicas" ? "active" : ""}" data-cd="Específicas">Específicas</button>
    </div>
    <div class="filters" id="cov-pri">
      <button type="button" class="chip ${covFilterPri === "all" ? "active" : ""}" data-cp="all">Toda prioridade</button>
      <button type="button" class="chip ${covFilterPri === "alta" ? "active" : ""}" data-cp="alta">Alta</button>
      <button type="button" class="chip ${covFilterPri === "média" ? "active" : ""}" data-cp="média">Média</button>
      <button type="button" class="chip ${covFilterPri === "cobertura" ? "active" : ""}" data-cp="cobertura">Cobertura</button>
    </div>
    <div class="filters" id="cov-sit">
      <button type="button" class="chip ${covFilterSit === "all" ? "active" : ""}" data-cs="all">Todas as situações</button>
      <button type="button" class="chip ${covFilterSit === "nao" ? "active" : ""}" data-cs="nao">Não iniciados</button>
      <button type="button" class="chip ${covFilterSit === "praticar" ? "active" : ""}" data-cs="praticar">Precisa praticar</button>
      <button type="button" class="chip ${covFilterSit === "revisao" ? "active" : ""}" data-cs="revisao">Em revisão</button>
      <button type="button" class="chip ${covFilterSit === "semq" ? "active" : ""}" data-cs="semq">Sem questões</button>
      <button type="button" class="chip ${covFilterSit === "baixo" ? "active" : ""}" data-cs="baixo">Baixo aproveitamento</button>
      <button type="button" class="chip ${covFilterSit === "ok" ? "active" : ""}" data-cs="ok">Dominados</button>
    </div>
    ${open && openCov ? `
      <article class="card good" id="cov-open">
        <p class="pri">${open.pri} · ${sitLabel(openCov.sit)}</p>
        <h3>${open.topic}</h3>
        <p class="tree-meta">${evidLabel(open.evid)} · meta inicial ${open.recQ || 0} questão(ões) · ${openCov.qs.length} no banco${openCov.pct != null ? " · " + openCov.pct + "% (" + openCov.ok + "/" + openCov.answered + ")" : " · sem prática ainda"}${openCov.lastRev ? " · última " + openCov.lastRev : ""}${openCov.nextRev ? " · próxima " + openCov.nextRev : ""}</p>
        ${noteHtml(open.id)}
        <div class="q-nav">
          ${openCov.qs.length ? `<button type="button" class="btn primary" data-goq="${open.id}">Questões deste assunto</button>` : ""}
          ${openCov.qs.length ? `<button type="button" class="btn gold" data-godrill="${open.id}">Treino deste assunto</button>` : ""}
          <button type="button" class="btn" data-gom="materiais">Materiais / PDFs</button>
          <button type="button" class="btn" id="cov-close">Fechar detalhe</button>
        </div>
      </article>
    ` : ""}
    ${list.map((r) => `
      <div class="tree-item">
        <span>
          <span class="pri">${r.e.pri} · ${sitLabel(r.sit)}</span><br>${r.e.topic}
          <span class="tree-meta">${r.hasNote ? "material" : "sem nota"} · ${r.qs.length} questão(ões)${r.pct != null ? " · " + r.pct + "%" : ""}${r.e.recQ ? " · meta " + r.e.recQ : ""}${r.lastRev ? " · última " + r.lastRev : ""}${r.nextRev ? " · próxima " + r.nextRev : ""} · ${evidLabel(r.e.evid)}</span>
          <span class="links">
            <button type="button" data-covopen="${r.e.id}">Abrir</button>
            ${r.qs.length ? `<button type="button" data-goq="${r.e.id}">Resolver</button>` : ""}
            ${r.qs.length ? `<button type="button" data-godrill="${r.e.id}">Treino</button>` : ""}
          </span>
        </span>
      </div>
    `).join("") || `<article class="card"><h3>Nenhum tópico neste filtro</h3></article>`}
  `;
  box.querySelectorAll("[data-cd]").forEach((b) => b.addEventListener("click", () => { covFilterDisc = b.dataset.cd; renderCobertura(); }));
  box.querySelectorAll("[data-cp]").forEach((b) => b.addEventListener("click", () => { covFilterPri = b.dataset.cp; renderCobertura(); }));
  box.querySelectorAll("[data-cs]").forEach((b) => b.addEventListener("click", () => { covFilterSit = b.dataset.cs; renderCobertura(); }));
  box.querySelectorAll("[data-covopen]").forEach((b) => b.addEventListener("click", () => { covOpenId = b.dataset.covopen; renderCobertura(); }));
  box.querySelectorAll("[data-goq]").forEach((b) => b.addEventListener("click", () => openTopicQuestions(b.dataset.goq)));
  box.querySelectorAll("[data-godrill]").forEach((b) => b.addEventListener("click", () => openTopicDrill(b.dataset.godrill)));
  box.querySelectorAll("[data-gom]").forEach((b) => b.addEventListener("click", () => goPanel("materiais")));
  const cl = document.getElementById("cov-close");
  if (cl) cl.addEventListener("click", () => { covOpenId = null; renderCobertura(); });
}

const VIDEOS = [
  { id: "rAKtdgx70O0", title: "COMO INTERPRETAR TEXTOS EM CONCURSOS (2025)", author: "Professora Larissa Ataíde", subject: "Português · interpretação", kind: "principal", url: "https://www.youtube.com/watch?v=rAKtdgx70O0" },
  { id: "wIkiGQpAzeI", title: "Direito Administrativo | Atos Administrativos", author: "Focus Concursos", subject: "Admin · atos", kind: "principal", url: "https://www.youtube.com/watch?v=wIkiGQpAzeI" },
  { id: "iiFjeUc-Ygg", title: "Atos Administrativos: Atributos", author: "Prof. Diego Pureza", subject: "Admin · atributos", kind: "principal", url: "https://www.youtube.com/watch?v=iiFjeUc-Ygg" },
  { id: "maSCAGbHL-U", title: "Você precisa saber: Bens Públicos", author: "Gran Jurídico", subject: "Admin · bens públicos", kind: "principal", url: "https://www.youtube.com/watch?v=maSCAGbHL-U" },
  { id: "u_0dPgvHxR0", title: "Aula do Poder de Polícia (Direito Administrativo) - Parte 1", author: "TecConcursos", subject: "Poder de polícia", kind: "complementar", url: "https://www.youtube.com/watch?v=u_0dPgvHxR0" },
  { id: "pFNCvfqimbE", title: "Noções de sistema operacional (ambiente Windows)", author: "ROMILTON JÚNIOR", subject: "Informática · Windows", kind: "principal", url: "https://www.youtube.com/watch?v=pFNCvfqimbE" }
];

const LEI946_ROTEIRO = [
  { arts: "Arts. 13–19", tema: "Investidura e concurso. Validade de até 2 anos, prorrogável 1 vez (Art. 14, parágrafo único). Investidura ocorre com a posse e se completa com o exercício (Art. 13, §2º)." },
  { arts: "Arts. 20–32", tema: "7 formas de provimento (Art. 20). Nomeação é a originária. Recondução a pedido em 120 dias (Art. 26, III). Reversão voluntária nos 5 anos anteriores (Art. 28, II). Readaptação provisória até 2 anos (Art. 30)." },
  { arts: "Arts. 33–38", tema: "Posse em 30+30 dias (Art. 35). Só há posse na nomeação (Art. 35, §3º). Exercício em 15+15 dias (Art. 36). Sem exercício: exoneração de ofício (Art. 50, II)." },
  { arts: "Arts. 39–48", tema: "Estágio de 3 anos a contar do exercício (Art. 39). Avaliação semestral. Insuficiência: exoneração (Art. 45). Estabilidade (Art. 47). Perda do cargo estável (Art. 48)." },
  { arts: "Arts. 49–57", tema: "Vacância: exoneração, demissão, readaptação, aposentadoria, falecimento, posse em cargo inacumulável (Art. 49). Exoneração não é penalidade." },
  { arts: "Arts. 204–227", tema: "Deveres (Art. 204), proibições (Art. 205), responsabilidades (Arts. 206–216), penalidades (Art. 217: advertência, multa, suspensão, demissão, cassação, destituição)." },
  { arts: "Arts. 228–271", tema: "Sindicância 30+30 (Art. 231). PAD 60+60, comissão de 3 (Arts. 239 e 242). Afastamento preventivo 30+30 (Art. 237). Abandono >30 dias; inassiduidade 60/12 meses (Art. 232). Prescrição 5 anos / 2 anos / 180 dias (Art. 271)." }
];

function renderMateriais() {
  const box = document.getElementById("video-lib");
  if (!box) return;
  box.innerHTML = `
    <article class="card">
      <h3>Roteiro de leitura · Lei 946/2014</h3>
      <p>Artigos conferidos no PDF da Prefeitura. Não inventei número. Lei Orgânica: leia competências do Município, Prefeito e Câmara; não misture com outro município.</p>
      <ul>
        ${LEI946_ROTEIRO.map((r) => `<li><b>${r.arts}</b> ${r.tema}</li>`).join("")}
      </ul>
    </article>
    <article class="card">
      <h3>Roteiro de leitura · Lei Orgânica de Tanguá</h3>
      <p>Dispositivos conferidos no PDF oficial. Não use LOM de outro município. Código de Posturas (Lei 657/2007) continua complementar.</p>
      <ul>
        ${LOM_ROTEIRO.map((r) => `<li><b>${r.arts}</b> ${r.tema}</li>`).join("")}
      </ul>
    </article>
    <div class="grid-3">
      ${VIDEOS.map((v) => `
        <article class="card">
          <p class="phase">${v.kind === "complementar" ? "Complementar" : "Principal"}</p>
          <h3>${v.title}</h3>
          <p>${v.author} · ${v.subject}</p>
          <p><a href="${v.url}" target="_blank" rel="noopener">Abrir aula no YouTube</a></p>
        </article>
      `).join("")}
    </div>
  `;
}

const LOM_ROTEIRO = [
  { arts: "Art. 20, I–II", tema: "Competência privativa: legislar sobre interesse local e suplementar a legislação federal e estadual, no que couber." },
  { arts: "Art. 43", tema: "O Poder Legislativo é exercido pela Câmara de Vereadores. Parágrafo único: legislatura de quatro anos; cada ano, uma sessão legislativa." },
  { arts: "Art. 69, I–III e §1º", tema: "Emenda à LOM: proposta de 2/3 da Câmara, do Prefeito ou popular (5% do eleitorado). Dois turnos, interstício mínimo de 10 dias, 2/3 em cada turno." },
  { arts: "Art. 94, I–V", tema: "Prefeito: iniciar o processo legislativo; representar o Município; sancionar, promulgar e publicar leis e expedir regulamentos; vetar no todo ou em parte; nomear e exonerar Secretários." }
];

const NOTES = {
  "pt-interp": { conceito: "Compreender o que o texto diz e o que se pode concluir sem extrapolar.", pontos: ["Explícito = está escrito.", "Implícito = o texto autoriza concluir.", "Não use conhecimento de mundo para completar o que o texto não diz.", "Cuidado com EXCETO/NÃO no enunciado."], fonte: "Anexo II · Português. Sem prova IBDO transcrita nesta amostra." },
  "pt-var": { conceito: "A língua varia conforme região, grupo social, situação e tempo.", pontos: ["Norma culta é a da prova, não a única forma existente.", "Variação não é erro; desvio da norma culta pode ser cobrado como inadequação ao registro formal.", "Não inventar estatística de banca: evidência IBDO insuficiente neste tópico."], fonte: "Anexo II · variações linguísticas." },
  "pt-func": { conceito: "Funções da linguagem: o que o texto privilegia (referente, emissor, receptor, canal, código, mensagem).", pontos: ["Referencial: informar (edital, notícia).", "Emotiva: emissor.", "Apelativa/conativa: receptor (ordem, propaganda).", "Fática: canal. Metalinguística: código. Poética: forma da mensagem."], fonte: "Anexo II · funções da linguagem." },
  "pt-gen": { conceito: "Tipo = estrutura (narração, descrição, dissertação, injunção). Gênero = uso social (notícia, edital, ofício).", pontos: ["Dissertativo-argumentativo: tese + argumentos.", "Injuntivo: instruir (receita, edital de 'faça X').", "Não trate gênero e tipo como sinônimos."], fonte: "Anexo II · tipos e gêneros." },
  "pt-coes": { conceito: "Coesão liga partes do texto; coerência é o sentido global.", pontos: ["Conectivos: oposição (contudo), conclusão (portanto), causa (porque).", "Coerência falha quando o texto se contradiz ou não progride.", "Pontuação também coesiona (aposto, enumeração)."], fonte: "Anexo II · coesão e coerência." },
  "pt-orto": { conceito: "Grafia, maiúsculas, acentuação e pontuação pelo Acordo vigente.", pontos: ["Oxítonas: a(s), e(s), o(s), em, ens.", "Por que / porque / porquê / por quê.", "Não separe sujeito e verbo com vírgula.", "Maiúscula em nomes próprios e início de período."], fonte: "Anexo II · ortografia do Acordo." },
  "pt-fono": { conceito: "Letra ≠ fonema. Encontros e dígrafos.", pontos: ["Dígrafo: duas letras, um fonema (ch, nh, lh, rr, ss, qu, gu).", "Encontro consonantal: dois fonemas (pr, cl, gr).", "Hiato: vogais em sílabas distintas (sa-í-da).", "X em táxi vale /ks/ (mais fonemas que letras)."], fonte: "Anexo II · fonologia/fonética. Prioridade de cobertura: evidência IBDO insuficiente." },
  "pt-morf": { conceito: "Estrutura e classes da palavra.", pontos: ["Radical, prefixo, sufixo, desinência, vogal temática.", "Derivação × composição.", "Classes: substantivo, adjetivo, verbo, advérbio, preposição, conjunção, pronome, numeral, artigo, interjeição."], fonte: "Anexo II · morfologia." },
  "pt-sint": { conceito: "Relações na oração e entre orações.", pontos: ["Concordância: haver (=existir) e fazer (tempo) são impessoais.", "Regência: aspirar a, visar a, assistir a (ver), obedecer a.", "Crase: a + a diante de feminino determinado; sem crase em 'a pé'.", "Orações coordenadas (independentes) × subordinadas (dependem)."], fonte: "Anexo II · sintaxe. Briefing da prova de Paraibuna 2019 cita regência." },
  "pt-sem": { conceito: "Significado das palavras no contexto.", pontos: ["Denotação (literal) × conotação (figurado).", "Sinônimos / antônimos.", "Parônimos: comprimento / cumprimento.", "Homonímia: mesma forma, sentidos distintos.", "Polissemia e ambiguidade (anexo mal colocado)."], fonte: "Anexo II · semântica." },
  "pt-fig": { conceito: "Desvio expressivo em relação ao sentido literal.", pontos: ["Metáfora: comparação implícita.", "Metonímia: parte/todo, instituição/pessoas ('a Câmara aprovou').", "Hipérbole: exagero.", "Eufemismo: suavização. Não aprofundar catálogo acadêmico."], fonte: "Anexo II · figuras. Prioridade de cobertura." },
  "leg-946-inv": { conceito: "Investidura ocorre com a posse e se completa com o exercício.", pontos: ["Concurso: até 2 anos da homologação, prorrogável 1 vez (Art. 14, parágrafo único).", "Posse: 30+30 dias da publicação da nomeação (Art. 35).", "Exercício: 15+15 da posse (Art. 36). Sem exercício: exoneração de ofício (Art. 50, II).", "Só há posse na nomeação (Art. 35, §3º)."], fonte: "Lei 946/2014, PDF Prefeitura de Tanguá, conferido 02/11/2026." },
  "leg-946-prov": { conceito: "Provimento preenche o cargo; vacância esvazia.", pontos: ["Art. 20: nomeação, recondução, reintegração, reversão, aproveitamento, promoção, readaptação.", "Exoneração é vacância (Art. 49), não provimento e não é penalidade.", "Recondução a pedido: 120 dias (Art. 26, III).", "Readaptação provisória: até 2 anos (Art. 30)."], fonte: "Lei 946/2014 Arts. 20–32 e 49." },
  "leg-946-est": { conceito: "Estágio de 3 anos a contar do exercício; estabilidade se a avaliação for satisfatória.", pontos: ["Art. 39: 3 anos do exercício, avaliação semestral.", "Insuficiência: exoneração (Art. 45), não demissão.", "Perda do cargo estável: sentença transitada, PAD ou avaliação periódica, com defesa (Art. 48).", "No estágio, só algumas licenças (Art. 127, §5º)."], fonte: "Lei 946/2014 Arts. 39–48 e 127, §5º." },
  "leg-946-dir": { conceito: "Direitos, vantagens, licenças e ausências abonadas do estatuto local.", pontos: ["Art. 127: 11 modalidades de licença (capacitação até prêmio).", "Estágio: só gestante, paternidade e tratamento de saúde (§5º).", "Casamento e falecimento de cônjuge/familiares: 8 dias, comprovação em 48h (Art. 176, V e VI).", "Não copiar prazos de outro município."], fonte: "Lei 946/2014 Arts. 127 e 176." },
  "leg-946-disc": { conceito: "Deveres, proibições, penas e ritos (sindicância e PAD).", pontos: ["Deveres Art. 204 (zelo, sigilo, urbanidade, levar irregularidade à autoridade).", "Proibido receber presente em razão do cargo (Art. 205, XII).", "Penas Art. 217: advertência, multa, suspensão, demissão, cassação, destituição. Exoneração não é pena.", "Sindicância 30+30 (Art. 231); PAD 60+60, comissão de 3 efetivos (Arts. 239 e 242).", "Abandono >30 dias; inassiduidade 60/12 meses (Art. 232). Prescrição 5 anos / 2 anos / 180 dias (Art. 271)."], fonte: "Lei 946/2014 Arts. 204–271." },
  "leg-946-pet": { conceito: "Direito de petição e recurso no estatuto.", pontos: ["Recurso: 15 dias da ciência (Art. 198); se provido, efeitos retroagem.", "Prescrição do direito de requerer: 5 anos (demissão/cassação/créditos) ou 2 anos (demais) — Art. 199.", "Não confundir com prescrição da ação disciplinar (Art. 271)."], fonte: "Lei 946/2014 Arts. 198–199." },
  "leg-lom": { conceito: "Competência municipal na LOM de Tanguá, não de outro município.", pontos: ["Art. 20, I: legislar sobre interesse local.", "Art. 20, II: suplementar legislação federal e estadual, no que couber.", "Não legisla direito penal, não emite moeda, não declara guerra."], fonte: "LOM Tanguá, Art. 20, PDF oficial." },
  "leg-lom-cam": { conceito: "Câmara exerce o Legislativo local; LOM tem rito rígido de emenda.", pontos: ["Art. 43: Poder Legislativo = Câmara. Legislatura de 4 anos.", "Art. 69: proposta de 2/3 dos vereadores, do Prefeito ou popular (5%).", "§1º: dois turnos, 10 dias de interstício, 2/3 em cada turno."], fonte: "LOM Tanguá Arts. 43 e 69." },
  "leg-lom-pref": { conceito: "O Prefeito chefia o Executivo e pratica os atos de governo e de administração previstos na LOM.", pontos: ["Art. 94, I: iniciar o processo legislativo nos casos da LOM.", "III: sancionar, promulgar, publicar e regulamentar.", "IV: vetar no todo ou em parte.", "V: nomear e exonerar Secretários.", "Não confunda com competência da Câmara (Art. 43)."], fonte: "LOM Tanguá Art. 94." },
  "esp-cf-pf": { conceito: "Fundamentos, poderes e objetivos da República.", pontos: ["Art. 1º: soberania, cidadania, DPH, valores sociais do trabalho e da livre iniciativa, pluralismo político. Separação dos Poderes é Art. 2º.", "Art. 2º: Legislativo, Executivo e Judiciário.", "Art. 3º: objetivos (construir sociedade livre, justa e solidária etc.). Não misturar fundamentos com objetivos."], fonte: "CF Arts. 1º–4º." },
  "esp-cf-5": { conceito: "Direitos e garantias; remédios constitucionais em noções de nível médio.", pontos: ["HC: liberdade de locomoção (LXVIII).", "Habeas data: dados em registro público (LXXII).", "MS: direito líquido e certo residual (LXIX).", "Não transformar em prova de Procurador."], fonte: "CF Art. 5º." },
  "esp-cf-mun": { conceito: "Município é ente federativo autônomo, com lei orgânica própria.", pontos: ["Art. 18: União, Estados, DF e Municípios.", "Art. 29: LOM em dois turnos, interstício de 10 dias, 2/3 da Câmara.", "Competências municipais: Art. 30 (interesse local). Pararelo com LOM Art. 20."], fonte: "CF Arts. 18–31." },
  "esp-cf-adm": { conceito: "Art. 37 LIMPE + regras de servidores (concurso, acumulação, estabilidade).", pontos: ["LIMPE: legalidade, impessoalidade, moralidade, publicidade, eficiência.", "§1º: publicidade educativa, sem promoção pessoal.", "Art. 37, II: concurso para efetivo.", "Art. 41: estabilidade após 3 anos de exercício, nomeados por concurso."], fonte: "CF Arts. 37–41." },
  "esp-cf-leg": { conceito: "Noções: Congresso fiscaliza com auxílio do TCU. Não é prova de TCE.", pontos: ["Art. 70–71: fiscalização pelo Congresso, auxílio do TCU.", "No Município, paralelo: Câmara + tribunal de contas competente.", "PPA/LDO/LOA detalhados e LRF são programa do Agente de Controle Interno neste edital, não do Fiscal."], fonte: "CF Arts. 44–75, noções. Prioridade de cobertura." },
  "esp-cf-fin": { conceito: "Noções de tributação, orçamento e finanças. Sem profundidade de LRF.", pontos: ["Art. 165: PPA, LDO e LOA, iniciativa do Executivo.", "Não estude Lei 4.320 nem LRF como se fosse Agente de Controle Interno.", "Ausência de questões IBDO transcritas ≠ 'não cai'."], fonte: "CF Arts. 145–169, noções." },
  "esp-adm-prin": { conceito: "Princípios (LIMPE) e estrutura da Administração.", pontos: ["Direta: órgãos da pessoa política (Prefeitura, secretarias).", "Indireta: autarquia, fundação pública, empresa pública, sociedade de economia mista.", "Câmara é órgão, não entidade da indireta."], fonte: "Anexo II · princípios e administração direta/indireta." },
  "esp-adm-atos": { conceito: "Ato administrativo: elementos, atributos, validade e extinção.", pontos: ["Elementos (COFIFOMO): competência, finalidade, forma, motivo, objeto.", "Atributos: presunção de legitimidade, imperatividade, autoexecutoriedade, tipicidade.", "Anulação: ilegalidade, ex tunc. Revogação: conveniência, ex nunc (só a Administração revoga)."], fonte: "Anexo II · atos. Briefing Paraibuna 2019 cita atos." },
  "esp-adm-atos-class": { conceito: "Cada classificação é eixo próprio; uma questão de vinculado não cobre as demais.", pontos: ["Simples: um órgão. Complexo: vontades de órgãos diversos num só ato. Composto: principal + acessório.", "Unilateral: uma vontade (a regra do ato administrativo). Bilateral/multilateral: acordo.", "Geral: destinatários indeterminados. Individual: pessoa certa.", "Vinculado: lei não deixa escolha. Discricionário: mérito (conveniência/oportunidade) nos limites da lei."], fonte: "Anexo II lista expressamente essas classificações." },
  "esp-adm-proc": { conceito: "O ato se forma por um procedimento: sequência de atos preparatórios até a decisão.", pontos: ["Procedimento ≠ processo judicial.", "Fases típicas em noções: instauração, instrução, decisão.", "Auto de infração de posturas é ato, precedido de verificação e, quando a lei exigir, de defesa.", "Evidência IBDO insuficiente; prepare o básico."], fonte: "Anexo II · procedimento administrativo. Prioridade de cobertura." },
  "esp-adm-ag": { conceito: "Quem exerce função pública. Servidor efetivo ≠ cargo em comissão ≠ empregado celetista.", pontos: ["Agente público é gênero.", "Servidor estatutário (Lei 946) × empregado público (CLT em empresa pública/economia mista).", "Funcionário, no uso clássico, liga-se ao regime estatutário. A prova de nível médio cobra a distinção, não monografia."], fonte: "Anexo II · agentes públicos." },
  "esp-adm-imp": { conceito: "Lei 8.429 com 14.230/2021: dolo, atos, penas. Sem jurisprudência de STF em profundidade.", pontos: ["Improbidade exige dolo na redação atual (14.230/21).", "Não confundir com crime nem com pena disciplinar da Lei 946.", "Sanções típicas: perda da função, suspensão de direitos políticos, multa, proibição de contratar."], fonte: "Lei 8.429/92, com Lei 14.230/21. Briefing Paraibuna cita improbidade." },
  "esp-adm-bens": { conceito: "Uso: comum, especial, dominical. Atributos clássicos: inalienabilidade, imprescritibilidade, impenhorabilidade (os 'in').", pontos: ["Comum: rua, praça.", "Especial: repartição em uso.", "Dominical: patrimônio disponível (terreno vago).", "Apreensão de mercadoria em logradouro não transfere o bem ao fiscal."], fonte: "CC Arts. 98–103 / doutrina de nível médio." },
  "esp-adm-prov-vac": { conceito: "No Anexo II de específicas, cruzar doutrina/CF com Lei 946 Arts. 20 e 49.", pontos: ["Provimento originário típico: nomeação.", "Vacância: exoneração, demissão, aposentadoria, falecimento, posse em cargo inacumulável, readaptação.", "Não use estatuto de outro município."], fonte: "Anexo II + Lei 946 Arts. 20 e 49." },
  "esp-etica": { conceito: "Primazia do interesse público, sigilo, urbanidade, recusa de vantagem.", pontos: ["Alinha-se aos deveres do Art. 204 e às proibições do Art. 205 da Lei 946.", "Presente de fiscalizado para facilitar banca ofende ética e o Art. 205, XII.", "Não aprofunde código de ética federal que o edital não cita."], fonte: "Anexo II · ética profissional." },
  "esp-info-hw": { conceito: "Hardware: parte física. Entrada, saída, processamento, armazenamento.", pontos: ["RAM: volátil. HD/SSD: permanente.", "Scanner: entrada. Impressora: saída. Multifuncional: os dois.", "CPU/processador: processamento. Placa-mãe: integração.", "Edital não fixa marca nem geração de processador."], fonte: "Anexo II · hardware, impressoras, scanners, multifuncionais." },
  "esp-info-so": { conceito: "Sistemas Microsoft, Office e navegadores citados no edital (IE e Chrome).", pontos: ["Windows: pastas, lixeira, painel de controle/configurações, atalhos (Ctrl+C/V, Alt+Tab).", "Office: Word (texto), Excel (planilha/célula), PowerPoint (slides). Sem VBA nem Power Query.", "Internet Explorer: navegador legado da Microsoft; Edge o sucedeu, mas o edital cita IE — saiba o nome e a função (acessar a web).", "Chrome: navegador Google; abas, favoritos, endereço. Não substitua IE por Edge no estudo sem registrar a diferença."], fonte: "Anexo II · Windows, Office, Internet Explorer, Chrome." },
  "esp-info-seg": { conceito: "Proteger dados: confidencialidade, integridade, disponibilidade.", pontos: ["Phishing: engenharia social (página/e-mail falso).", "Ransomware: criptografa e pede resgate.", "Backup: cópia de segurança (não é antivírus).", "Senha forte e não reutilizar. Sem redes avançadas nem pentest."], fonte: "Anexo II · segurança da informação." },
  "esp-anexo1": { conceito: "Atribuição do cargo no Anexo I. Não é conteúdo de Tributos nem de Meio Ambiente.", pontos: ["Licença comercial, ambulante, banca, feira, publicidade, horário/farmácia, inflamáveis, apreensão, evento/circo, denúncia/relatório.", "ISS = Tributos. Dano ambiental típico = Meio Ambiente.", "Circo: documento de engenheiro habilitado.", "Apreensão: depósito público, não a casa do fiscal."], fonte: "Edital 01/2026, Anexo I. Evidência direta de cargo equivalente (Paraibuna 2019), sem transcrição OCR completa." },
  "comp-657": { conceito: "Código de Posturas de Tanguá. Complementar: não está no Anexo II.", pontos: ["Use só depois de Lei 946, LOM, atos, CF 1º–5º/29–31/37–41 e informática.", "Não entre no cronograma obrigatório."], fonte: "Lei 657/2007. Fora do Anexo II." }
};

const IBDO_SAMPLE = {
  updated: "03/11/2026",
  examsFound: 1,
  examsReadInFull: 0,
  note: "Uma prova de Fiscal de Posturas da IBDO foi localizada (Paraibuna/SP 2019). O PDF é escaneado; não há extração OCR completa nesta entrega. ibdo.org.br não respondeu (erro de transporte). Não há percentual inventado.",
  sources: [
    { title: "Certame Tanguá 01/2026 (oficial)", url: "https://concursos.ibdoprojetos.org.br/informacoes/107", kind: "edital vigente" },
    { title: "Edital 01/2026 PDF", url: "https://anexos-r2.selecao.net.br/uploads/331/concursos/107/anexos/d6deaf2c-6d35-4b0b-a164-1c695804e199.pdf", kind: "edital vigente" },
    { title: "Prova Fiscal de Posturas · Paraibuna/SP 2019", url: "https://www.eticaconcursos.com.br/provas/arquivos/prova/instituto-ibdo-projetos-2019-prefeitura-de-paraibuna-sp-fiscal-de-posturas-prova.pdf", kind: "evidência direta (escaneada)" },
    { title: "Gabarito Paraibuna/SP 2019", url: "https://www.eticaconcursos.com.br/provas/arquivos/gabarito/instituto-ibdo-projetos-2019-prefeitura-de-paraibuna-sp-fiscal-de-posturas-gabarito.pdf", kind: "gabarito daquela prova, não de Tanguá" }
  ],
  observed: "Briefing já existente no site (não OCR): interpretação, regência, ortografia, formação de palavras, legislação municipal, princípios, atos, improbidade, Poder Legislativo, informática. Formatos CORRETO/INCORRETO/EXCETO/NÃO e I–IV. Aquela prova tinha 5 alternativas; Tanguá tem 4 (A–D).",
  confidence: "Baixa para distribuição percentual. Média para o estilo de enunciado (EXCETO/NÃO) descrito no briefing. Legislação de Paraibuna não substitui Lei 946 nem a LOM de Tanguá."
};

function noteHtml(id) {
  const n = NOTES[id];
  if (!n) return "<p class='tree-meta'>Sem nota objetiva ainda. Use os PDFs oficiais em Materiais.</p>";
  return `<p><b>Conceito.</b> ${n.conceito}</p><ul>${(n.pontos || []).map((p) => `<li>${p}</li>`).join("")}</ul><p class="tree-meta">Fonte: ${n.fonte}</p>`;
}

try { renderMateriais(); } catch (_) {}

const BANK = [
  { id: "q01", disc: "Legislação", topic: "Posse", sub: "Prazo", level: "média", art: "Lei 946, Art. 35", stem: "Segundo a Lei Municipal 946/2014, a posse, atendidas as exigências legais, ocorrerá no prazo de:", choices: ["Quinze dias da nomeação, improrrogável.", "Trinta dias da publicação do ato de nomeação, prorrogável por igual período, a critério da autoridade competente.", "Sessenta dias da homologação do concurso, sem prorrogação.", "Noventa dias da nomeação, somente se o candidato estiver de férias."], answer: 1, why: "Art. 35, caput: até trinta dias da publicação do ato de nomeação, prorrogável por igual período. Sem posse no prazo, a nomeação é tornada sem efeito (Art. 35, §4º)." },
  { id: "q02", disc: "Legislação", topic: "Exercício", sub: "Prazo", level: "média", art: "Lei 946, Art. 36", stem: "O prazo para o servidor empossado entrar em exercício, na Lei 946/2014, é de:", choices: ["Trinta dias da posse, improrrogável.", "Dez dias da nomeação.", "Quinze dias da data de posse, prorrogável por igual período, a critério da administração.", "Sessenta dias da homologação."], answer: 2, why: "Art. 36, §1º: quinze dias, prorrogável por igual período, contados da posse. Não entrar em exercício gera exoneração de ofício (Art. 50, II)." },
  { id: "q03", disc: "Legislação", topic: "Provimento", sub: "Formas", level: "média", art: "Lei 946, Art. 20", stem: "São formas de provimento de cargo público efetivo na Lei 946/2014, EXCETO:", choices: ["Nomeação.", "Recondução.", "Exoneração.", "Readaptação."], answer: 2, why: "Art. 20 lista nomeação, recondução, reintegração, reversão, aproveitamento, promoção e readaptação. Exoneração é forma de vacância (Art. 49), não de provimento." },
  { id: "q04", disc: "Legislação", topic: "Estágio", sub: "Duração", level: "fácil", art: "Lei 946, Art. 39", stem: "O estágio probatório, na Lei 946/2014, tem duração de:", choices: ["Dois anos a contar da posse.", "Três anos a contar da data em que o servidor entrar em exercício.", "Três anos a contar da nomeação.", "Um ano, renovável."], answer: 1, why: "Art. 39: três anos a contar da data em que entrar em exercício. Estabilidade no Art. 47, se a avaliação final for satisfatória." },
  { id: "q05", disc: "Legislação", topic: "Recondução", sub: "Prazo a pedido", level: "média", art: "Lei 946, Art. 26, III", stem: "A recondução a pedido, no quadro de Tanguá, deverá ocorrer no prazo de:", choices: ["30 dias da posse.", "60 dias da exoneração.", "90 dias do exercício.", "120 dias contados do ato de nomeação em outro cargo do quadro de pessoal do Município."], answer: 3, why: "Art. 26, III, e Art. 49, parágrafo único: 120 dias da nomeação no novo cargo." },
  { id: "q06", disc: "Legislação", topic: "PAD", sub: "Sindicância", level: "média", art: "Lei 946, Art. 231", stem: "O prazo para conclusão da sindicância, na Lei 946/2014, não excederá:", choices: ["15 dias, improrrogável.", "30 dias, podendo ser prorrogado por igual período.", "60 dias, sem prorrogação.", "90 dias, só com autorização judicial."], answer: 1, why: "Art. 231, §1º: 30 dias, prorrogável por igual período. Pode arquivar, aplicar advertência ou suspensão de até 30 dias, ou instaurar PAD." },
  { id: "q07", disc: "Específicas", topic: "Atos", sub: "Atributos e elementos", level: "difícil", edital: ["esp-adm-atos"], art: "Doutrina · Anexo II", stem: "São atributos clássicos do ato administrativo:", choices: ["Competência, finalidade, forma, motivo e objeto.", "Presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade.", "Anulação, revogação, convalidação e caducidade.", "Vinculação, discricionariedade, mérito e oportunidade."], answer: 1, why: "Atributos: presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade. Competência, finalidade, forma, motivo e objeto são elementos (COFIFOMO)." },
  { id: "q08", disc: "Específicas", topic: "Atos", sub: "Autoexecutoriedade", level: "média", edital: ["esp-adm-atos"], art: "Doutrina · Anexo II", stem: "A autoexecutoriedade do ato administrativo significa, em regra, que:", choices: ["O ato só vale depois de homologação judicial.", "A Administração pode executar o ato por seus próprios meios, sem prévia autorização do Judiciário, nos casos previstos.", "O particular pode descumprir o ato até haver sentença.", "Todo ato vinculado depende de lei complementar."], answer: 1, why: "Autoexecutoriedade: a Administração executa o ato pelos próprios meios, sem precisar de título judicial, quando a lei autoriza (ex.: apreensão, interdição)." },
  { id: "q09", disc: "Específicas", topic: "CF 37", sub: "LIMPE", level: "fácil", art: "CF Art. 37, caput", stem: "Os princípios expressos no caput do Art. 37 da Constituição Federal são:", choices: ["Legalidade, impessoalidade, moralidade, publicidade e eficiência.", "Legalidade, isonomia, moralidade, proporcionalidade e eficiência.", "Publicidade, razoabilidade, eficiência, economicidade e legalidade.", "Legalidade, finalidade, motivação, razoabilidade e proporcionalidade."], answer: 0, why: "LIMPE: legalidade, impessoalidade, moralidade, publicidade e eficiência. Os demais (finalidade, motivação, razoabilidade) são implícitos ou da Lei 9.784." },
  { id: "q10", disc: "Específicas", topic: "Bens públicos", sub: "Classificação", level: "fácil", art: "CC Arts. 98–103 / doutrina", stem: "Quanto à destinação, os bens públicos classificam-se em:", choices: ["Móveis, imóveis e semoventes.", "Federais, estaduais e municipais.", "De uso comum do povo, de uso especial e dominicais.", "Disponíveis, indisponíveis e alienáveis."], answer: 2, why: "Classificação tradicional do Anexo II: uso comum (ruas, praças), uso especial (repartições) e dominicais (patrimônio disponível). Os três 'in': inalienáveis, imprescritíveis, impenhoráveis, com nuances nos dominicais." },
  { id: "q11", disc: "Específicas", topic: "Improbidade", sub: "Dolo", level: "média", art: "Lei 8.429/92, com 14.230/21", stem: "Após a Lei 14.230/2021, a caracterização do ato de improbidade administrativa exige, em regra:", choices: ["Culpa grave, ainda que sem dolo.", "Dolo.", "Mero erro de gestão.", "Somente prejuízo ao erário, independentemente de dolo."], answer: 1, why: "A Lei 14.230/2021 passou a exigir dolo. Culpa isolada não basta. Não confundir erro grosseiro de gestão com ato ímprobo." },
  { id: "q12", disc: "Específicas", topic: "Informática", sub: "Phishing", level: "fácil", edital: ["esp-info-seg"], art: "Anexo II", stem: "No contexto de segurança da informação, phishing é:", choices: ["Programa que criptografa arquivos e pede resgate.", "Técnica de engenharia social para obter dados por mensagem ou site falso.", "Cópia de segurança armazenada em outro disco.", "Atualização automática do sistema operacional."], answer: 1, why: "Phishing: golpe de engenharia social (e-mail, SMS, página falsa) para capturar senha ou dados. Ransomware é o sequestro por criptografia. Backup é a cópia de segurança." },
  { id: "q13", disc: "Português", topic: "Crase", sub: "Emprego do acento grave", level: "difícil", art: "Gramática", stem: "Assinale a frase em que o acento grave (crase) está empregado de acordo com a norma culta:", choices: ["Fui à pé até a prefeitura.", "O relatório foi enviado à ela ontem.", "A fiscalização referiu-se à irregularidade encontrada.", "O servidor chegou à uma hora atrasado, no sentido de aproximadamente."], answer: 2, why: "Crase: a (preposição) + a (artigo) diante de palavra feminina determinada. 'À pé' é erro (pé é masculino). 'À ela' é erro (pronome reto não admite artigo). 'À uma' no sentido aproximado não leva crase." },
  { id: "q14", disc: "Português", topic: "Interpretação", sub: "Compreensão e inferência", level: "média", art: "Anexo II", stem: "Em prova de concurso, interpretação de texto autoriza o candidato a:", choices: ["Usar conhecimento de mundo para completar o que o texto não diz.", "Marcar inferência somente quando o texto permitir concluir aquilo.", "Ignorar o enunciado se o tema for conhecido.", "Escolher a alternativa mais longa, por ser mais completa."], answer: 1, why: "Em prova objetiva, interpretação autoriza compreensão (o que o texto diz) e inferência (o que se conclui sem extrapolar). Conhecimento externo e achismo eliminam. Não há evidência transcrita de prova IBDO neste enunciado; o critério segue o Anexo II." },
  { id: "q15", disc: "Específicas", topic: "Anexo I", sub: "Posturas x Tributos", level: "média", art: "Edital Anexo I", stem: "NÃO se inclui entre as atribuições típicas do Fiscal de Posturas no Anexo I do Edital 01/2026:", choices: ["Verificar licença de ambulantes.", "Inspecionar feiras livres quanto a localização, horário e organização.", "Lançar e constituir crédito tributário de ISS.", "Apreender mercadorias expostas em logradouro público, por infração."], answer: 2, why: "ISS e crédito tributário são de Fiscal de Tributos. Posturas: licenciamento de atividades, ambulantes, bancas, feiras, publicidade, horários, inflamáveis, apreensão, eventos, relatórios." }
];

const ansKey = "tango-fiscal-answers";
function loadAnswers() {
  try { return JSON.parse(lsGet(ansKey) || "{}"); } catch { return {}; }
}
function saveAnswers(map) { lsSet(ansKey, JSON.stringify(map)); }

const reviewKey = "tango-fiscal-review";
function loadReview() {
  try { return JSON.parse(lsGet(reviewKey) || "{}"); } catch { return {}; }
}
function saveReview(map) { lsSet(reviewKey, JSON.stringify(map)); }

let qFilter = "all";
let qIndex = 0;
let qMode = "all";
let qLevel = "all";
let qTopic = "all";
let qSub = "all";
let qOrigin = "all";
let qHasWhy = false;
let qHasArt = false;
let qPick = null;
let qSearch = "";
let drill = null;
const qFilterSaveKey = "tango-fiscal-qfilters";

function setQStatus(msg) {
  const el = document.getElementById("q-status");
  if (el) el.textContent = msg || "";
}

function bankList() {
  const ans = loadAnswers();
  const rev = loadReview();
  const q = (qSearch || "").trim().toLowerCase();
  return BANK.filter((item) => {
    if (qEdital) {
      const e = EDITAL.find((x) => x.id === qEdital);
      if (!e) return false;
      if (qForTopic(e).indexOf(item) < 0) return false;
    }
    if (qFilter !== "all" && item.disc !== qFilter) return false;
    if (qMode === "open" && ans[item.id]) return false;
    if (qMode === "ok" && !(ans[item.id] && ans[item.id].ok === true)) return false;
    if (qMode === "wrong" && !(ans[item.id] && ans[item.id].ok === false)) return false;
    if (qMode === "review" && !rev[item.id]) return false;
    if (qLevel !== "all" && (item.level || "média") !== qLevel) return false;
    if (qTopic !== "all" && item.topic !== qTopic) return false;
    if (qSub !== "all" && (item.sub || "") !== qSub) return false;
    if (qOrigin !== "all") {
      const orig = item.origin === "oficial" ? "oficial" : "autoral";
      if (orig !== qOrigin) return false;
    }
    if (qHasWhy && !item.why) return false;
    if (qHasArt && !item.art) return false;
    if (q) {
      const blob = [item.stem, item.topic, item.sub, item.art, item.disc, item.why].join(" ").toLowerCase();
      if (blob.indexOf(q) < 0) return false;
    }
    return true;
  });
}

function answerStats(pool) {
  const ans = loadAnswers();
  const list = pool || BANK;
  const done = list.filter((x) => ans[x.id]);
  const ok = done.filter((x) => ans[x.id].ok);
  const bad = done.filter((x) => ans[x.id].ok === false);
  const pct = done.length ? Math.round(ok.length * 100 / done.length) : 0;
  return { total: list.length, done: done.length, ok: ok.length, bad: bad.length, open: list.length - done.length, pct };
}

function discStats() {
  return ["Português", "Legislação", "Específicas"].map((d) => {
    const s = answerStats(BANK.filter((q) => q.disc === d));
    s.disc = d;
    return s;
  });
}

function topicStats(minN) {
  const ans = loadAnswers();
  const map = {};
  BANK.forEach((q) => {
    const rec = ans[q.id];
    if (!rec) return;
    const k = q.disc + " · " + q.topic;
    map[k] = map[k] || { key: k, disc: q.disc, topic: q.topic, n: 0, ok: 0 };
    map[k].n += 1;
    if (rec.ok) map[k].ok += 1;
  });
  return Object.keys(map).map((k) => {
    const x = map[k];
    x.pct = Math.round(x.ok * 100 / x.n);
    x.bad = x.n - x.ok;
    return x;
  }).filter((x) => x.n >= (minN || 1)).sort((a, b) => a.pct - b.pct || b.n - a.n);
}

function unansweredTopics() {
  const ans = loadAnswers();
  const seen = {};
  BANK.forEach((q) => {
    seen[q.topic] = seen[q.topic] || { topic: q.topic, disc: q.disc, n: 0, done: 0 };
    seen[q.topic].n += 1;
    if (ans[q.id]) seen[q.topic].done += 1;
  });
  return Object.keys(seen).map((k) => seen[k]).filter((t) => t.done === 0);
}

function resetQuestionMarks() {
  saveAnswers({});
  qIndex = 0;
  qPick = null;
  if (window.TF) window.TF.currentOrder = {};
  if (window.TFPlatform && window.TFPlatform.TF && window.TFPlatform.TF.user) {
    window.TFPlatform.tfApi("/api/attempts/reset-current", { method: "POST" }).catch(() => {});
  }
}

function confirmWipeAnswers() {
  const n = Object.keys(loadAnswers()).length;
  const modal = document.getElementById("q-modal");
  const body = document.getElementById("q-modal-body");
  const title = document.getElementById("q-modal-title");
  if (!modal || !body) return;
  title.textContent = "Redefinir marcações";
  body.textContent = "Há " + n + " questão(ões) respondida(s) no banco. Você está prestes a redefinir as marcações do banco de questões. Essa ação apagará as respostas registradas e reiniciará as estatísticas de desempenho das questões. O caderno de erros, os simulados realizados, as marcações para revisão e o restante do seu progresso serão preservados. Deseja continuar?";
  modal.hidden = false;
  const cancelOld = document.getElementById("q-modal-cancel");
  const okOld = document.getElementById("q-modal-ok");
  cancelOld.replaceWith(cancelOld.cloneNode(true));
  okOld.replaceWith(okOld.cloneNode(true));
  const cancel = document.getElementById("q-modal-cancel");
  const ok = document.getElementById("q-modal-ok");
  function close() { modal.hidden = true; }
  function onCancel() { close(); setQStatus("Redefinição cancelada. Nada foi apagado."); }
  function onOk() {
    resetQuestionMarks();
    close();
    renderQuestoes();
    if (typeof renderToday === "function") renderToday();
    if (typeof renderStatsLive === "function") renderStatsLive();
    setQStatus("Marcações do banco redefinidas. Caderno, simulados e revisão foram preservados.");
  }
  cancel.addEventListener("click", onCancel);
  ok.addEventListener("click", onOk);
}

function paintQOverview() {
  const el = document.getElementById("q-overview");
  if (!el) return;
  if (wantDrill) { el.innerHTML = ""; return; }
  const g = answerStats();
  const discs = discStats();
  const topics = topicStats(2);
  el.innerHTML = `
    <div class="dash dash-3">
      <div class="stat"><b>${g.done}</b><span>respondidas</span></div>
      <div class="stat"><b>${g.ok}</b><span>acertos</span></div>
      <div class="stat"><b>${g.pct}%</b><span>aproveitamento</span></div>
    </div>
    <details class="adv-filters" ${qDetailOpen ? "open" : ""} id="q-detail">
      <summary>Ver desempenho detalhado</summary>
      <div class="dash q-dash">
        <div class="stat"><b>${g.total}</b><span>no banco</span></div>
        <div class="stat"><b>${g.bad}</b><span>erros</span></div>
        <div class="stat"><b>${g.open}</b><span>ainda abertas</span></div>
      </div>
      <div class="disc-bars">
        ${discs.map((d) => `<div class="bar-row"><div class="bar-meta"><span>${d.disc}</span><b>${d.done ? d.pct + "%" : "—"} · ${d.ok}/${d.done || 0}</b></div><div class="bar"><i style="width:${d.done ? d.pct : 0}%"></i></div></div>`).join("")}
      </div>
      ${topics.length ? `<div class="topic-bars">${topics.slice(0, 6).map((t) => `<div class="bar-row"><div class="bar-meta"><span>${t.key}</span><b>${t.pct}% · ${t.ok}/${t.n}</b></div><div class="bar"><i style="width:${t.pct}%"></i></div></div>`).join("")}</div>` : ""}
    </details>
    <div class="q-toolbar">
      <button type="button" class="btn wipe" id="btn-reset-answers">Redefinir marcações</button>
    </div>
  `;
  const det = document.getElementById("q-detail");
  if (det) det.addEventListener("toggle", () => { qDetailOpen = det.open; });
  const rst = document.getElementById("btn-reset-answers");
  if (rst) rst.addEventListener("click", confirmWipeAnswers);
}

function openDrillSetup() {
  const box = document.getElementById("q-box");
  if (!box) return;
  if (pendingDrill) {
    const job = pendingDrill;
    pendingDrill = null;
    startDrill(job.n || 10, job.src);
    return;
  }
  drill = null;
  qPick = null;
  wantDrill = true;
  uiPraticar = "treino";
  syncNav("questoes");
  const official = EDITAL.filter((e) => (e.cat || "oficial") !== "complementar");
  box.innerHTML = `
    <article class="card">
      <h3>Treino rápido</h3>
      <p>Sessão curta, uma questão por vez. Prioriza abertas e erradas. Sem repetir item na mesma sessão. Gabarito só depois de confirmar. Respostas desta sessão não gravam o banco.</p>
      <p class="tree-meta">Quantas questões</p>
      <div class="filters" id="drill-n">
        ${[10, 15, 20].map((n, i) => `<button type="button" class="chip ${i === 0 ? "active" : ""}" data-dn="${n}">${n}</button>`).join("")}
      </div>
      <p class="tree-meta">Recorte</p>
      <div class="filters" id="drill-src">
        <button type="button" class="chip active" data-ds="all">Todas as disciplinas</button>
        <button type="button" class="chip" data-ds="Português">Apenas Português</button>
        <button type="button" class="chip" data-ds="Legislação">Apenas Legislação</button>
        <button type="button" class="chip" data-ds="Específicas">Apenas Específicas</button>
        <button type="button" class="chip" data-ds="alta">Prioridade alta</button>
        <button type="button" class="chip" data-ds="weak">Assunto com menor acerto</button>
        <button type="button" class="chip" data-ds="wrong">Questões erradas</button>
        <button type="button" class="chip" data-ds="open">Ainda não respondidas</button>
        <button type="button" class="chip" data-ds="review">Marcadas para revisão</button>
      </div>
      <p class="tree-meta">Assunto da matriz do edital</p>
      <label class="search-field"><select id="drill-edital">
        <option value="">Nenhum (usar o recorte acima)</option>
        ${official.map((e) => `<option value="edital:${e.id}">${e.disc} · ${e.topic}</option>`).join("")}
      </select></label>
      <div class="q-nav">
        <button type="button" class="btn primary" id="drill-go">Começar treino</button>
        <button type="button" class="btn" id="drill-cancel">Voltar ao banco</button>
      </div>
    </article>
  `;
  let n = 10, src = "all";
  box.querySelectorAll("[data-dn]").forEach((b) => b.addEventListener("click", () => {
    box.querySelectorAll("[data-dn]").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    n = Number(b.dataset.dn);
  }));
  box.querySelectorAll("[data-ds]").forEach((b) => b.addEventListener("click", () => {
    box.querySelectorAll("[data-ds]").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    src = b.dataset.ds;
    const sel = document.getElementById("drill-edital");
    if (sel) sel.value = "";
  }));
  const edSel = document.getElementById("drill-edital");
  if (edSel) edSel.addEventListener("change", () => {
    if (edSel.value) src = edSel.value;
  });
  document.getElementById("drill-cancel").addEventListener("click", () => { drill = null; qPick = null; wantDrill = false; uiPraticar = "questoes"; qEdital = null; renderQuestoes(); syncNav("questoes"); });
  document.getElementById("drill-go").addEventListener("click", () => startDrill(n, src));
}

function startDrill(n, src) {
  const ans = loadAnswers();
  const rev = loadReview();
  let pool = BANK.slice();
  if (src && String(src).indexOf("edital:") === 0) {
    const eid = String(src).slice(7);
    const item = EDITAL.find((e) => e.id === eid);
    pool = item ? qForTopic(item).slice() : [];
  }
  if (src === "Português" || src === "Legislação" || src === "Específicas") pool = pool.filter((q) => q.disc === src);
  if (src === "wrong") pool = pool.filter((q) => ans[q.id] && ans[q.id].ok === false);
  if (src === "open") pool = pool.filter((q) => !ans[q.id]);
  if (src === "review") pool = pool.filter((q) => rev[q.id]);
  if (src === "alta") {
    const high = EDITAL.filter((e) => e.pri === "alta" && (e.cat || "oficial") !== "complementar");
    const ids = {};
    high.forEach((e) => qForTopic(e).forEach((q) => { ids[q.id] = true; }));
    pool = pool.filter((q) => ids[q.id]);
  }
  if (src === "weak") {
    const weak = topicStats(2);
    const top = weak[0] && weak[0].topic;
    if (top) pool = pool.filter((q) => q.topic === top);
  }
  const open = [], wrong = [], rest = [];
  pool.forEach((q) => {
    if (!ans[q.id]) open.push(q);
    else if (ans[q.id].ok === false) wrong.push(q);
    else rest.push(q);
  });
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  const ordered = shuffle(open).concat(shuffle(wrong), shuffle(rest));
  const ids = [];
  const seen = {};
  ordered.forEach((q) => {
    if (ids.length >= n) return;
    if (seen[q.id]) return;
    seen[q.id] = true;
    ids.push(q.id);
  });
  if (!ids.length) {
    setQStatus("Não há questões nesse recorte para montar o treino.");
    wantDrill = true;
    drill = null;
    openDrillSetup();
    return;
  }
  wantDrill = true;
  uiPraticar = "treino";
  drill = { ids, i: 0, picks: {}, src: src, n: n };
  qIndex = 0;
  qPick = null;
  if (window.TFPlatform) window.TFPlatform.tfSetOrigin("treino_rapido");
  renderQuestoes();
}

function drillRec(q) {
  if (!drill || !q) return null;
  const rec = drill.picks[q.id];
  return rec && typeof rec.choice === "number" ? rec : null;
}

function finishDrill() {
  if (!drill || !drill.ids) return;
  const picks = drill.picks || {};
  const qs = drill.ids.map((id) => BANK.find((x) => x.id === id)).filter(Boolean);
  const done = qs.filter((q) => picks[q.id] && typeof picks[q.id].choice === "number");
  const ok = done.filter((q) => picks[q.id].ok);
  const bad = done.filter((q) => picks[q.id].ok === false);
  const blank = qs.length - done.length;
  const pct = done.length ? Math.round(ok.length * 100 / done.length) : 0;
  const by = {};
  done.forEach((q) => {
    by[q.disc] = by[q.disc] || { n: 0, ok: 0 };
    by[q.disc].n += 1;
    if (picks[q.id].ok) by[q.disc].ok += 1;
  });
  const weakMap = {};
  bad.forEach((q) => {
    weakMap[q.topic] = (weakMap[q.topic] || 0) + 1;
  });
  const weakTopics = Object.keys(weakMap).sort((a, b) => weakMap[b] - weakMap[a]);
  const sug = weakTopics[0]
    ? "Revise " + weakTopics[0] + " na próxima sessão, com recuperação ativa (questões, não só releitura)."
    : (done.length ? "Nenhum erro nesta sessão. Intercale outra disciplina amanhã." : "Nenhuma questão confirmada nesta sessão.");
  const box = document.getElementById("q-box");
  box.innerHTML = `
    <article class="card good">
      <h3>Relatório do treino rápido</h3>
      <p>Resolvidas: ${done.length} · Acertos: ${ok.length} · Erros: ${bad.length} · Em branco: ${blank} · Aproveitamento: ${pct}%</p>
      ${blank ? `<p>Não respondidas: ${qs.filter((q) => !(picks[q.id] && typeof picks[q.id].choice === "number")).map((q) => q.id).join(", ")}.</p>` : ""}
      <ul>${Object.keys(by).map((d) => `<li><b>${d}:</b> ${by[d].ok}/${by[d].n} (${Math.round(by[d].ok * 100 / by[d].n)}%)</li>`).join("") || "<li>Sem respostas confirmadas.</li>"}</ul>
      <p><b>Reforço:</b> ${weakTopics.length ? weakTopics.join(", ") : "nenhum assunto com erro nesta sessão"}.</p>
      <p>${sug}</p>
      <div class="q-nav">
        <button type="button" class="btn gold" id="drill-again">Novo treino</button>
        <button type="button" class="btn" id="drill-back">Voltar ao banco</button>
      </div>
    </article>
  `;
  drill = null;
  document.getElementById("drill-again").addEventListener("click", openDrillSetup);
  document.getElementById("drill-back").addEventListener("click", () => { wantDrill = false; uiPraticar = "questoes"; qPick = null; renderQuestoes(); syncNav("questoes"); });
}

function renderQuestoes() {
  const box = document.getElementById("q-box");
  const stats = document.getElementById("q-stats");
  const filters = document.getElementById("q-filters");
  if (!box || !stats || !filters) return;
  if (wantDrill && !drill) { paintQOverview(); filters.innerHTML = ""; stats.innerHTML = ""; openDrillSetup(); return; }
  if (wantDrill && drill) {
    paintQOverview();
    filters.innerHTML = "";
    stats.innerHTML = "";
    const rev = loadReview();
    if (drill.i >= drill.ids.length) { finishDrill(); return; }
    const q = BANK.find((x) => x.id === drill.ids[drill.i]);
    if (!q) { finishDrill(); return; }
    const rec = drillRec(q);
    const pick = rec ? rec.choice : qPick;
    box.innerHTML = `
      <article class="q-card ${rev[q.id] ? "flagged" : ""}" id="q-atual">
        <p class="tag">Treino ${drill.i + 1}/${drill.ids.length} · ${q.id} · ${q.disc} · ${q.topic}${q.sub ? " · " + q.sub : ""} · ${q.level || "média"} · ${q.art}${rev[q.id] ? " · para revisão" : ""}</p>
        <h3>${q.stem}</h3>
        ${choiceButtonsHtml(q, rec, pick)}
        ${!rec ? `<div class="q-nav q-actions-main"><button type="button" class="btn primary" id="q-confirm" ${pick == null ? "disabled" : ""}>Confirmar resposta</button></div>` : ""}
        ${rec ? feedbackHtml(q, rec) : ""}
        <div class="q-nav q-actions-sec">
          <button type="button" class="btn" id="drill-prev" ${drill.i === 0 ? "disabled" : ""}>Anterior</button>
          ${rec ? `<button type="button" class="btn primary" id="drill-next">${drill.i + 1 >= drill.ids.length ? "Ver relatório" : "Próxima"}</button>` : ""}
          <button type="button" class="btn" id="q-flag">${rev[q.id] ? "Remover da revisão" : "Marcar para revisão"}</button>
          <button type="button" class="btn" id="drill-restart">Reiniciar treino</button>
          <button type="button" class="btn" id="drill-abort">Encerrar treino</button>
        </div>
      </article>
    `;
    bindQuestionCard(box, q, rec);
    const prev = document.getElementById("drill-prev");
    if (prev) prev.addEventListener("click", () => { if (drill.i > 0) { drill.i -= 1; qPick = null; renderQuestoes(); } });
    const nxt = document.getElementById("drill-next");
    if (nxt) nxt.addEventListener("click", () => { drill.i += 1; qPick = null; renderQuestoes(); });
    const restart = document.getElementById("drill-restart");
    if (restart) restart.addEventListener("click", () => {
      drill.picks = {};
      drill.i = 0;
      qPick = null;
      renderQuestoes();
    });
    const abort = document.getElementById("drill-abort");
    if (abort) abort.addEventListener("click", finishDrill);
    return;
  }
  paintQOverview();
  const ans = loadAnswers();
  const rev = loadReview();
  const discs = ["all", "Português", "Legislação", "Específicas"];
  const levels = ["all", "fácil", "média", "difícil"];
  const topics = ["all"].concat(Array.from(new Set(BANK.filter((q) => qFilter === "all" || q.disc === qFilter).map((q) => q.topic))).sort());
  if (qTopic !== "all" && topics.indexOf(qTopic) < 0) qTopic = "all";
  const subs = ["all"].concat(Array.from(new Set(BANK.filter((q) => (qFilter === "all" || q.disc === qFilter) && (qTopic === "all" || q.topic === qTopic) && q.sub).map((q) => q.sub))).sort());
  if (qSub !== "all" && subs.indexOf(qSub) < 0) qSub = "all";
  const esc = (s) => String(s || "").replace(/"/g, "&quot;");
  const advOpen = !!(qTopic !== "all" || qSub !== "all" || qLevel !== "all" || qOrigin !== "all" || qHasWhy || qHasArt || qMode === "review");
  const edItem = qEdital ? EDITAL.find((e) => e.id === qEdital) : null;
  filters.innerHTML = `
    <label class="search-field">Pesquisar<input type="search" id="q-search" value="${esc(qSearch)}" placeholder="enunciado, assunto ou artigo" /></label>
    ${edItem ? `<div class="filter-group"><span class="filter-label">Matriz do edital</span><button type="button" class="chip active" id="q-edital-clear">${edItem.topic} · limpar</button></div>` : ""}
    <div class="filter-primary">
      <div class="filter-group"><span class="filter-label">Disciplina</span>${discs.map((d) => `<button type="button" class="chip ${qFilter === d ? "active" : ""}" data-qd="${d}">${d === "all" ? "Todas" : d}</button>`).join("")}</div>
      <div class="filter-group"><span class="filter-label">Situação</span>
        <button type="button" class="chip ${qMode === "all" ? "active" : ""}" data-qm="all">Todas</button>
        <button type="button" class="chip ${qMode === "open" ? "active" : ""}" data-qm="open">Não respondidas</button>
        <button type="button" class="chip ${qMode === "ok" ? "active" : ""}" data-qm="ok">Corretas</button>
        <button type="button" class="chip ${qMode === "wrong" ? "active" : ""}" data-qm="wrong">Erradas</button>
      </div>
    </div>
    <details class="adv-filters" ${advOpen ? "open" : ""}>
      <summary>Filtros avançados</summary>
      <div class="filter-group" style="margin-top:10px"><span class="filter-label">Dificuldade</span>${levels.map((lv) => `<button type="button" class="chip ${qLevel === lv ? "active" : ""}" data-ql="${lv}">${lv === "all" ? "Qualquer nível" : lv}</button>`).join("")}</div>
      <div class="filter-group" style="margin-top:10px"><span class="filter-label">Origem</span>
        <button type="button" class="chip ${qOrigin === "all" ? "active" : ""}" data-qo="all">Todas</button>
        <button type="button" class="chip ${qOrigin === "autoral" ? "active" : ""}" data-qo="autoral">Autoral (treino)</button>
        <button type="button" class="chip ${qOrigin === "oficial" ? "active" : ""}" data-qo="oficial">Oficial IBDO</button>
      </div>
      <div class="filter-group" style="margin-top:10px"><span class="filter-label">Revisão</span><button type="button" class="chip ${qMode === "review" ? "active" : ""}" data-qm="review">Marcadas para revisão</button></div>
      <div class="filter-group" style="margin-top:10px"><span class="filter-label">Conteúdo</span>
        <button type="button" class="chip ${qHasWhy ? "active" : ""}" id="q-has-why">Com explicação</button>
        <button type="button" class="chip ${qHasArt ? "active" : ""}" id="q-has-art">Com referência legal</button>
      </div>
      <label class="search-field" style="margin-top:10px">Assunto <select id="q-topic">${topics.map((t) => `<option value="${t}" ${qTopic === t ? "selected" : ""}>${t === "all" ? "Todos os assuntos" : t}</option>`).join("")}</select></label>
      <label class="search-field" style="margin-top:10px">Subassunto <select id="q-sub">${subs.map((t) => `<option value="${t}" ${qSub === t ? "selected" : ""}>${t === "all" ? "Todos os subassuntos" : t}</option>`).join("")}</select></label>
      <div class="q-nav" style="margin-top:10px">
        <button type="button" class="btn" id="q-save-filter">Salvar este filtro</button>
        <button type="button" class="btn" id="q-load-filter">Usar filtro salvo</button>
      </div>
    </details>
  `;
  const edClear = document.getElementById("q-edital-clear");
  if (edClear) edClear.addEventListener("click", () => { qEdital = null; qIndex = 0; qPick = null; renderQuestoes(); });
  filters.querySelectorAll("button[data-qd]").forEach((btn) => {
    btn.addEventListener("click", () => { qFilter = btn.dataset.qd; qIndex = 0; qPick = null; qTopic = "all"; renderQuestoes(); });
  });
  filters.querySelectorAll("button[data-qm]").forEach((btn) => {
    btn.addEventListener("click", () => { qMode = btn.dataset.qm; qIndex = 0; qPick = null; renderQuestoes(); });
  });
  filters.querySelectorAll("button[data-ql]").forEach((btn) => {
    btn.addEventListener("click", () => { qLevel = btn.dataset.ql; qIndex = 0; qPick = null; renderQuestoes(); });
  });
  filters.querySelectorAll("button[data-qo]").forEach((btn) => {
    btn.addEventListener("click", () => { qOrigin = btn.dataset.qo; qIndex = 0; qPick = null; renderQuestoes(); });
  });
  const whyBtn = document.getElementById("q-has-why");
  if (whyBtn) whyBtn.addEventListener("click", () => { qHasWhy = !qHasWhy; qIndex = 0; qPick = null; renderQuestoes(); });
  const artBtn = document.getElementById("q-has-art");
  if (artBtn) artBtn.addEventListener("click", () => { qHasArt = !qHasArt; qIndex = 0; qPick = null; renderQuestoes(); });
  const topicSel = document.getElementById("q-topic");
  if (topicSel) topicSel.addEventListener("change", () => { qTopic = topicSel.value; qSub = "all"; qIndex = 0; qPick = null; renderQuestoes(); });
  const subSel = document.getElementById("q-sub");
  if (subSel) subSel.addEventListener("change", () => { qSub = subSel.value; qIndex = 0; qPick = null; renderQuestoes(); });
  const saveF = document.getElementById("q-save-filter");
  if (saveF) saveF.addEventListener("click", () => {
    lsSet(qFilterSaveKey, JSON.stringify({ qFilter, qMode, qLevel, qTopic, qSub, qOrigin, qHasWhy, qHasArt, qSearch }));
    setQStatus("Filtro salvo neste navegador.");
  });
  const loadF = document.getElementById("q-load-filter");
  if (loadF) loadF.addEventListener("click", () => {
    try {
      const s = JSON.parse(lsGet(qFilterSaveKey) || "null");
      if (!s) { setQStatus("Nenhum filtro salvo."); return; }
      qFilter = s.qFilter || "all";
      qMode = s.qMode || "all";
      qLevel = s.qLevel || "all";
      qTopic = s.qTopic || "all";
      qSub = s.qSub || "all";
      qOrigin = s.qOrigin || "all";
      qHasWhy = !!s.qHasWhy;
      qHasArt = !!s.qHasArt;
      qSearch = s.qSearch || "";
      qIndex = 0;
      qPick = null;
      renderQuestoes();
      setQStatus("Filtro salvo aplicado.");
    } catch (_) { setQStatus("Não foi possível ler o filtro salvo."); }
  });
  const search = document.getElementById("q-search");
  if (search) {
    search.addEventListener("input", () => {
      qSearch = search.value;
      if (window._qSearchTimer) clearTimeout(window._qSearchTimer);
      window._qSearchTimer = setTimeout(() => {
        qIndex = 0;
        qPick = null;
        renderQuestoes();
        const el = document.getElementById("q-search");
        if (el) { el.focus(); const v = el.value; el.setSelectionRange(v.length, v.length); }
      }, 220);
    });
  }
  const list = bankList();
  stats.innerHTML = `<span class="pill">${list.length} neste filtro</span><span class="pill">Treino · não oficiais</span>`;
  if (!list.length) {
    box.innerHTML = `<article class="card"><h3>Nenhuma questão neste filtro</h3><p>Troque o filtro acima. Banco total: ${BANK.length}.</p></article>`;
    return;
  }
  if (qIndex >= list.length) qIndex = 0;
  const q = list[qIndex];
  const rec = ans[q.id];
  const pick = rec ? rec.choice : qPick;
  box.innerHTML = `
    <div class="q-grid">
      ${list.map((item, i) => {
        const a = ans[item.id];
        return `<button type="button" class="${i === qIndex ? "on" : ""} ${a ? (a.ok ? "marked" : "bad") : ""} ${rev[item.id] ? "flag" : ""}" data-jump="${i}">${item.id.replace("q", "")}</button>`;
      }).join("")}
    </div>
    <article class="q-card ${rev[q.id] ? "flagged" : ""}" id="q-atual">
      <p class="tag">${q.id} · ${q.disc} · ${q.topic}${q.sub ? " · " + q.sub : ""} · ${q.level || "média"} · ${q.art}${rev[q.id] ? " · para revisão" : ""}</p>
      <h3>${qIndex + 1}/${list.length}. ${q.stem}</h3>
      ${choiceButtonsHtml(q, rec, pick, true)}
      ${!rec ? `<div class="q-nav q-actions-main"><button type="button" class="btn primary" id="q-confirm" ${pick == null ? "disabled" : ""}>Confirmar resposta</button></div>` : ""}
      ${rec ? feedbackHtml(q, rec) : ""}
      <div class="q-nav q-actions-sec">
        <button type="button" class="btn" id="q-prev">Anterior</button>
        <button type="button" class="btn" id="q-next">Próxima</button>
        <button type="button" class="btn" id="q-flag">${rev[q.id] ? "Remover da revisão" : "Marcar para revisão"}</button>
      </div>
    </article>
     <details class="adv-filters">
      <summary>Lista deste filtro (${list.length})</summary>
      <ul class="q-list">
        ${list.map((item, i) => {
          const a = ans[item.id];
          const st = a ? (a.ok ? "certo" : "errado") : "aberta";
          return `<li><button type="button" class="btn" data-jump="${i}">${item.id}</button> ${item.disc} · ${item.topic} · ${st}${rev[item.id] ? " · revisão" : ""}</li>`;
        }).join("")}
      </ul>
    </details>
  `;
  box.querySelectorAll("button[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => { qIndex = Number(btn.dataset.jump); qPick = null; renderQuestoes(); });
  });
  bindQuestionCard(box, q, rec);
  const prev = document.getElementById("q-prev");
  const nxt = document.getElementById("q-next");
  if (prev) prev.addEventListener("click", () => { qIndex = (qIndex - 1 + list.length) % list.length; qPick = null; renderQuestoes(); });
  if (nxt) nxt.addEventListener("click", () => { qIndex = (qIndex + 1) % list.length; qPick = null; renderQuestoes(); });
}

function presentedChoices(q, rec) {
  if (rec && Array.isArray(rec.order) && rec.order.length) {
    return rec.order.map((cid, i) => {
      const idx = Number(String(cid).replace(/^c/, ""));
      return { letter: "ABCD"[i], choiceId: cid, originalIndex: idx, text: q.choices[idx] };
    });
  }
  if (window.TFPlatform && typeof window.TFPlatform.tfPresent === "function") {
    return window.TFPlatform.tfPresent(q);
  }
  return (q.choices || []).map((text, i) => ({ letter: "ABCD"[i], choiceId: "c" + i, originalIndex: i, text }));
}

function choiceButtonsHtml(q, rec, pick, withLetterSpan) {
  const presented = presentedChoices(q, rec);
  const recOrig = rec && typeof rec.choice === "number" ? rec.choice : null;
  const pickOrig = recOrig != null ? recOrig : (pick == null ? null : Number(pick));
  return presented.map((p) => {
    let cls = "q-opt";
    if (rec) {
      if (p.originalIndex === q.answer) cls += " ok";
      else if (p.originalIndex === recOrig) cls += " bad";
    } else if (pickOrig === p.originalIndex) cls += " sel";
    const letter = withLetterSpan ? `<span class="q-letter">${p.letter}</span> ` : p.letter + ") ";
    const markOk = rec && p.originalIndex === q.answer ? " <span class='q-mark'>correta</span>" : "";
    const markBad = rec && p.originalIndex === recOrig && !rec.ok ? " <span class='q-mark bad'>sua resposta</span>" : "";
    return `<button type="button" class="${cls}" data-choice="${p.originalIndex}" data-presented="${presented.indexOf(p)}" ${rec ? "disabled" : ""}>${letter}${p.text}${markOk}${markBad}</button>`;
  }).join("");
}

function currentAttemptOrigin() {
  if (wantDrill) return "treino_rapido";
  if (window.TF && window.TF.origin) return window.TF.origin;
  return "banco";
}

function feedbackHtml(q, rec) {
  const head = rec.ok ? "Certo." : "Errado.";
  const presented = rec && rec.order ? rec.order.map((cid, i) => {
    const idx = Number(String(cid).replace(/^c/, ""));
    return { letter: "ABCD"[i], originalIndex: idx };
  }) : presentedChoices(q);
  const gabLetter = (presented.find((p) => p.originalIndex === q.answer) || {}).letter || "ABCD"[q.answer];
  const alts = q.alts ? `<details class="adv-filters" style="margin-top:10px"><summary>Ver explicação das alternativas</summary><p class="explain">${presentedChoices(q, rec).map((p) => "<b>" + p.letter + "</b>: " + (q.alts[p.originalIndex] || "")).join("<br>")}</p></details>` : "";
  const whyWrong = rec.ok ? "" : `<p class="tree-meta">Qual foi o motivo do seu erro?</p><div class="filters" id="err-why">${[["conteudo","Não conhecia o conteúdo"],["conceitos","Confundi conceitos"],["desatencao","Errei por desatenção"],["exceto","Não percebi o NÃO ou EXCETO"],["enunciado","Interpretei errado o enunciado"],["chute","Chutei"],["prazo","Esqueci um prazo ou artigo"]].map((x) => `<button type="button" class="chip ${rec.whyErr === x[0] ? "active" : ""}" data-err="${x[0]}">${x[1]}</button>`).join("")}</div>`;
  return `<div class="q-feedback"><p class="explain"><b>${head}</b> Gabarito nesta apresentação: ${gabLetter}. ${q.why}</p><details class="adv-filters"><summary>Ver fundamento</summary><p class="explain"><b>Fundamento:</b> ${q.art}.</p></details>${alts}${whyWrong}</div>`;
}

function bindQuestionCard(box, q, rec) {
  box.querySelectorAll("button[data-choice]").forEach((btn) => {
    btn.addEventListener("click", () => { qPick = Number(btn.dataset.choice); renderQuestoes(); });
  });
  const conf = document.getElementById("q-confirm");
  if (conf) {
    conf.addEventListener("click", () => {
      if (qPick == null) return;
      const presented = presentedChoices(q, rec);
      const presentedIndex = presented.findIndex((p) => p.originalIndex === qPick);
      const origin = currentAttemptOrigin();
      let resultRec = { choice: qPick, ok: qPick === q.answer, at: Date.now(), origin };
      if (window.TFPlatform && typeof window.TFPlatform.tfRecordAttempt === "function") {
        resultRec = Object.assign(resultRec, window.TFPlatform.tfRecordAttempt(q, presentedIndex < 0 ? 0 : presentedIndex, origin));
      }
      if (wantDrill && drill) {
        drill.picks[q.id] = resultRec;
        qPick = null;
        renderQuestoes();
        return;
      }
      const next = loadAnswers();
      next[q.id] = resultRec;
      saveAnswers(next);
      if (!resultRec.ok && typeof addToCaderno === "function") addToCaderno(q, resultRec.choice);
      qPick = null;
      renderQuestoes();
      if (typeof renderCaderno === "function") renderCaderno();
      if (typeof renderEdital === "function") renderEdital();
      if (typeof renderToday === "function") renderToday();
      if (typeof renderStatsLive === "function") renderStatsLive();
    });
  }
  const flag = document.getElementById("q-flag");
  if (flag) {
    flag.addEventListener("click", () => {
      const map = loadReview();
      if (map[q.id]) delete map[q.id];
      else map[q.id] = { at: Date.now() };
      saveReview(map);
      renderQuestoes();
    });
  }
  box.querySelectorAll("[data-err]").forEach((b) => {
    b.addEventListener("click", () => {
      if (wantDrill && drill && drill.picks[q.id]) {
        drill.picks[q.id].whyErr = b.dataset.err;
        renderQuestoes();
        return;
      }
      const next = loadAnswers();
      if (next[q.id]) {
        next[q.id].whyErr = b.dataset.err;
        saveAnswers(next);
      }
      renderQuestoes();
    });
  });
}

try { renderQuestoes(); } catch (_) {}
try { renderEdital(); } catch (_) {}

const MORE_BANK = [
  { id: "q16", disc: "Legislação", topic: "Concurso", sub: "Validade", level: "média", art: "Lei 946, Art. 14", stem: "O concurso público, na Lei 946/2014, terá validade de:", choices: ["Um ano, improrrogável.", "Até dois anos da homologação, podendo ser prorrogado uma vez por igual período.", "Quatro anos, como na Constituição.", "Seis meses, renovável a critério do Prefeito."], answer: 1, why: "Art. 14, parágrafo único: validade de até dois anos, contados da homologação, prorrogável uma vez por igual período." },
  { id: "q17", disc: "Legislação", topic: "Investidura", sub: "Posse e exercício", level: "média", art: "Lei 946, Art. 13, §2º", stem: "A investidura em cargo público, na Lei 946/2014:", choices: ["Ocorre com a nomeação e se completa com a posse.", "Ocorre com a posse e se completa com o exercício.", "Ocorre com a aprovação no concurso.", "Dispensa posse quando o cargo é em comissão."], answer: 1, why: "Art. 13, §2º. Art. 35, §3º: só há posse nos casos de provimento por nomeação." },
  { id: "q18", disc: "Legislação", topic: "Vacância", sub: "Hipóteses", level: "média", art: "Lei 946, Art. 49", stem: "A vacância do cargo público, na Lei 946/2014, NÃO decorrerá de:", choices: ["Readaptação.", "Posse em outro cargo inacumulável.", "Nomeação.", "Falecimento."], answer: 2, why: "Art. 49: exoneração, demissão, readaptação, aposentadoria, falecimento e posse em outro cargo inacumulável. Nomeação é forma de provimento (Art. 20)." },
  { id: "q19", disc: "Legislação", topic: "Penalidades", sub: "Exoneração não é pena", level: "média", art: "Lei 946, Art. 217", stem: "São penalidades disciplinares da Lei 946/2014, EXCETO:", choices: ["Advertência.", "Suspensão.", "Exoneração.", "Demissão."], answer: 2, why: "Art. 217: advertência, multa, suspensão, demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão e de função comissionada. Exoneração não é penalidade." },
  { id: "q20", disc: "Legislação", topic: "Abandono", sub: "Mais de 30 dias", level: "média", art: "Lei 946, Art. 232", stem: "Configura abandono de cargo, para o rito sumário da Lei 946/2014:", choices: ["Falta injustificada por 15 dias consecutivos.", "Ausência intencional ao serviço por mais de 30 dias consecutivos.", "60 faltas interpoladas em 12 meses.", "Atraso reiterado de 60 minutos."], answer: 1, why: "Art. 232, I: abandono = ausência intencional por mais de 30 dias consecutivos. Inassiduidade habitual é 60 dias interpolados em 12 meses (inciso II)." },
  { id: "q21", disc: "Legislação", topic: "Prescrição", sub: "Advertência", level: "média", art: "Lei 946, Art. 271", stem: "A ação disciplinar prescreve, quanto à advertência, em:", choices: ["30 dias.", "90 dias.", "180 dias.", "2 anos."], answer: 2, why: "Art. 271: 5 anos (demissão/cassação/destituição), 2 anos (suspensão) e 180 dias (advertência). O prazo corre da ciência do fato." },
  { id: "q22", disc: "Legislação", topic: "Reversão", sub: "Requisitos", level: "difícil", art: "Lei 946, Art. 28", stem: "A reversão no interesse da Administração exige, entre outros requisitos, que a aposentadoria:", choices: ["Tenha sido compulsória.", "Tenha sido por invalidez.", "Tenha sido voluntária e ocorrido nos cinco anos anteriores à solicitação.", "Tenha mais de dez anos."], answer: 2, why: "Art. 28, II: pedido do servidor, aposentadoria voluntária, estabilidade na atividade, ocorrência nos cinco anos anteriores e cargo vago. Vedada se o aposentado já completou 70 anos (§6º)." },
  { id: "q23", disc: "Legislação", topic: "PAD", sub: "Prazo ordinário", level: "média", art: "Lei 946, Art. 242", stem: "O prazo para conclusão do processo disciplinar ordinário, na Lei 946/2014, não excederá:", choices: ["30 dias, improrrogável.", "45 dias.", "60 dias da publicação do ato que constituir a comissão, admitida prorrogação por igual prazo.", "120 dias corridos, sem prorrogação."], answer: 2, why: "Art. 242: 60 dias, prorrogável por igual prazo. Comissão de três servidores efetivos (Art. 239)." },
  { id: "q24", disc: "Específicas", topic: "CF 1º", sub: "Fundamentos", level: "fácil", art: "CF Art. 1º", stem: "São fundamentos da República Federativa do Brasil, previstos no Art. 1º da CF, EXCETO:", choices: ["Soberania.", "Dignidade da pessoa humana.", "Pluralismo político.", "Separação dos Poderes."], answer: 3, why: "Art. 1º: soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, pluralismo político. Separação dos Poderes está no Art. 2º." },
  { id: "q25", disc: "Específicas", topic: "Municípios", sub: "Lei orgânica", level: "média", art: "CF Art. 29", stem: "O Município reger-se-á por lei orgânica, votada em dois turnos, com interstício mínimo de dez dias, e aprovada por:", choices: ["Maioria simples da Câmara.", "Dois terços dos membros da Câmara Municipal.", "Maioria absoluta dos eleitores.", "Decreto do Prefeito, referendado pela Câmara."], answer: 1, why: "CF Art. 29, caput: lei orgânica aprovada por dois terços dos membros da Câmara, em dois turnos, com interstício mínimo de dez dias." },
  { id: "q26", disc: "Específicas", topic: "Servidores CF", sub: "Estabilidade", level: "fácil", art: "CF Art. 41", stem: "São estáveis após três anos de efetivo exercício os servidores nomeados para cargo de provimento efetivo em virtude de:", choices: ["Contrato temporário.", "Cargo em comissão.", "Concurso público.", "Designação para função de confiança."], answer: 2, why: "CF Art. 41: estabilidade após 3 anos de efetivo exercício, para nomeados em virtude de concurso público. Alinha-se ao Art. 47 da Lei 946." },
  { id: "q27", disc: "Específicas", topic: "Atos", sub: "Vinculado e discricionário", level: "média", edital: ["esp-adm-atos-class"], art: "Doutrina · Anexo II", stem: "O ato vinculado diferencia-se do discricionário porque, no vinculado:", choices: ["Há liberdade de escolha quanto ao motivo e ao objeto.", "A lei prevê um único comportamento possível, sem margem de escolha.", "Só o Judiciário pode praticá-lo.", "Ele jamais pode ser anulado."], answer: 1, why: "Ato vinculado: a lei define todos os elementos. Discricionário: margem de escolha no mérito (conveniência e oportunidade), nos limites da lei." },
  { id: "q28", disc: "Específicas", topic: "Atos", sub: "Anulação e revogação", level: "difícil", edital: ["esp-adm-atos"], art: "Doutrina · Anexo II", stem: "A anulação do ato administrativo, em oposição à revogação:", choices: ["Retira ato conveniente, com efeitos ex nunc.", "Retira ato ilegal, em regra com efeitos ex tunc.", "Só pode ser feita pelo Judiciário.", "Depende sempre de processo judicial."], answer: 1, why: "Anulação: ilegalidade, efeitos ex tunc. Revogação: conveniência/oportunidade, efeitos ex nunc. Administração e Judiciário podem anular; só a Administração revoga." },
  { id: "q29", disc: "Específicas", topic: "Informática", sub: "RAM e HD", level: "fácil", edital: ["esp-info-hw"], art: "Anexo II", stem: "Memória RAM e disco rígido distinguem-se, em regra, porque a RAM:", choices: ["É memória de armazenamento permanente, como o HD.", "É memória volátil de acesso rápido, esvaziada ao desligar o computador.", "Substitui a placa-mãe.", "É um dispositivo apenas de entrada."], answer: 1, why: "RAM: volátil, trabalho rápido. HD/SSD: armazenamento permanente. Confundir os dois é pegadinha clássica de informática em nível médio." },
  { id: "q30", disc: "Específicas", topic: "Anexo I", sub: "Circo", level: "média", art: "Edital Anexo I", stem: "Para instalação de circo e espetáculos públicos de particulares, o Fiscal de Posturas, segundo o Anexo I, deve exigir:", choices: ["Alvará da Receita Federal.", "Documento de responsabilidade de engenheiro devidamente habilitado.", "Licença ambiental estadual, sempre.", "Contrato com a Vigilância Sanitária federal."], answer: 1, why: "Anexo I: verificar o licenciamento para circos e espetáculos públicos de particulares, inclusive exigindo documento de responsabilidade de engenheiro habilitado." },
  { id: "q31", disc: "Português", topic: "Concordância", sub: "Haver e fazer", level: "difícil", art: "Gramática", stem: "Assinale a frase com concordância verbal de acordo com a norma culta:", choices: ["Haviam muitas irregularidades no logradouro.", "Fazem dois anos que a lei foi publicada.", "Existem prazos distintos para posse e exercício.", "Bateu três horas no relógio da Câmara."], answer: 2, why: "Haver no sentido de existir é impessoal: havia. Fazer indicando tempo é impessoal: faz. Bater horas: bateram três horas. 'Existem prazos' concorda com o sujeito." },
  { id: "q32", disc: "Português", topic: "Regência", sub: "Verbos com preposição", level: "difícil", art: "Gramática", stem: "A regência está correta em:", choices: ["O edital visa o cargo de Fiscal.", "O servidor assistiu o treinamento ontem, no sentido de ver.", "A chefia obedeceu o regulamento interno.", "O candidato aspira ao cargo público."], answer: 3, why: "Visar (= ter por objetivo) e aspirar (= pretender) pedem a. Assistir (= ver) pede a. Obedecer pede a. 'Aspira ao cargo' está certo." },
  { id: "q33", disc: "Português", topic: "Ortografia", sub: "Grafia", level: "média", art: "Acordo Ortográfico", stem: "Está grafada de acordo com a norma culta:", choices: ["A interdição foi impecilida pelo recurso.", "A sindicância apurou a excessão prevista em lei.", "A cassação da aposentadoria é penalidade.", "O servidor foi exhonerado a pedido."], answer: 2, why: "Certo: cassação. Errado: impedida (não impecilida), exceção, exonerado (sem h, um x)." },
  { id: "q34", disc: "Português", topic: "Pontuação", sub: "Vírgula", level: "média", art: "Gramática", stem: "A vírgula está corretamente empregada em:", choices: ["O fiscal, lavrou o auto de infração.", "Tanguá, 22 de novembro de 2026.", "A posse ocorreu, no prazo legal sem atraso.", "Quem, estudar o Art. 37 passa na prova."], answer: 1, why: "Vírgula em vocativo/local e data é clássica. Não se separa sujeito de verbo ('O fiscal, lavrou')." },
  { id: "q35", disc: "Português", topic: "Formação", sub: "Derivação", level: "média", art: "Morfologia", stem: "Em 'improbidade', o processo de formação é, principalmente:", choices: ["Composição por justaposição.", "Derivação prefixal e sufixal a partir de 'probo'.", "Hibridismo.", "Onomatopeia."], answer: 1, why: "Im- (prefixo de negação) + probo + -idade (sufixo). Derivação prefixal e sufixal, não composição por justaposição." },
  { id: "q36", disc: "Português", topic: "Semântica", sub: "Conotação", level: "fácil", art: "Gramática", stem: "Em 'O servidor agiu com mãos limpas', há, em relação a 'mãos limpas':", choices: ["Sentido denotativo, literal.", "Sentido conotativo, figurado.", "Neologismo técnico.", "Vício de linguagem por cacofonia."], answer: 1, why: "Conotação: sentido figurado (probidade). Denotação seria o sentido literal das mãos." },
  { id: "q37", disc: "Português", topic: "Coesão", sub: "Conectivos", level: "fácil", edital: ["pt-coes"], art: "Gramática", stem: "O conectivo que expressa oposição é:", choices: ["Portanto.", "Porque.", "Contudo.", "Conforme."], answer: 2, why: "Contudo/porém/entretanto = oposição. Portanto = conclusão. Porque = causa. Conforme = conformidade." },
  { id: "q38", disc: "Português", topic: "Crase", sub: "À pé", level: "média", art: "Gramática", stem: "NÃO se usa crase em:", choices: ["Referiu-se à Lei 946/2014.", "Foi à Câmara Municipal.", "Chegou à Prefeitura cedo.", "Caminhou à pé até o local de prova."], answer: 3, why: "À pé é erro: pé é masculino. 'A pé' sem crase." },
  { id: "q39", disc: "Específicas", topic: "Ética", sub: "Deveres", level: "média", art: "Anexo II", stem: "No serviço público, a ética profissional exige, em especial:", choices: ["Priorizar interesse particular desde que não haja crime.", "Sigilo funcional, urbanidade e primazia do interesse público.", "Aceitar presente de fiscalizado, se de pequeno valor.", "Omitir irregularidade para preservar a chefia."], answer: 1, why: "Alinha-se aos deveres do Art. 204 da Lei 946 (zelo, sigilo, urbanidade, levar irregularidades ao conhecimento da autoridade) e ao Anexo II (ética profissional)." },
  { id: "q40", disc: "Específicas", topic: "Informática", sub: "Backup", level: "fácil", edital: ["esp-info-seg"], art: "Anexo II", stem: "Backup, em segurança da informação, é:", choices: ["Apagar arquivos temporários.", "Cópia de segurança dos dados para recuperação em caso de perda.", "Formatação do disco.", "Antivírus em tempo real."], answer: 1, why: "Backup = cópia de segurança. Não confundir com formatação nem com antivírus." }
];
MORE_BANK.forEach((q) => BANK.push(q));

const MORE_BANK2 = [
  { id: "q41", disc: "Português", topic: "Fonologia", sub: "Letra e fonema", level: "média", art: "Anexo II · Fonologia/fonética", stem: "Em 'táxi', o número de letras e de fonemas é, respectivamente:", choices: ["4 letras e 4 fonemas.", "4 letras e 5 fonemas.", "5 letras e 4 fonemas.", "5 letras e 5 fonemas."], answer: 1, why: "T-Á-X-I: 4 letras. O X vale /ks/, logo 5 fonemas: /t/ /a/ /k/ /s/ /i/. Anexo II cobra letra/fonema.", alts: ["Conta o X como um só fonema e ignora o valor /ks/.", "Certo: 4 letras, 5 fonemas (/ks/).", "Inverte letras e fonemas.", "Trata letra e fonema como sempre iguais."] },
  { id: "q42", disc: "Português", topic: "Fonologia", sub: "Encontros vocálicos", level: "média", art: "Anexo II · encontros vocálicos", stem: "Na palavra 'saída', o encontro vocálico em 'aí' é:", choices: ["Ditongo crescente.", "Ditongo decrescente.", "Hiato.", "Tritongo."], answer: 2, why: "Hiato: vogais em sílabas distintas (sa-í-da). Ditongo fica na mesma sílaba; tritongo é vogal entre duas semivogais na mesma sílaba.", alts: ["Ditongo crescente: semivogal + vogal na mesma sílaba (ex.: 'série').", "Ditongo decrescente: vogal + semivogal na mesma sílaba (ex.: 'pai').", "Certo: hiato.", "Tritongo: três sons na mesma sílaba (ex.: 'Uruguai')."] },
  { id: "q43", disc: "Português", topic: "Fonologia", sub: "Dígrafos", level: "fácil", art: "Anexo II · dígrafos", stem: "Há dígrafo em:", choices: ["prato.", "claro.", "chave.", "grito."], answer: 2, why: "Dígrafo: duas letras, um fonema. CH em 'chave' = /ʃ/. PR, CL e GR são encontros consonantais (dois fonemas).", alts: ["PR: encontro consonantal.", "CL: encontro consonantal.", "Certo: CH é dígrafo.", "GR: encontro consonantal."] },
  { id: "q44", disc: "Português", topic: "Figuras", sub: "Metáfora e metonímia", level: "média", art: "Anexo II · figuras de linguagem", stem: "Em 'A Câmara aprovou a lei orgânica', a figura predominante é:", choices: ["Metáfora.", "Metonímia (continente pelo conteúdo / instituição pelas pessoas).", "Hipérbole.", "Eufemismo."], answer: 1, why: "Metonímia: a instituição (Câmara) está pelos vereadores. Metáfora é comparação implícita. Hipérbole é exagero. Eufemismo suaviza.", alts: ["Metáfora exigiria comparação implícita sem o termo real.", "Certo: metonímia.", "Hipérbole seria exagero ('milhões de leis').", "Eufemismo suavizaria fato desagradável."] },
  { id: "q45", disc: "Português", topic: "Figuras", sub: "Hipérbole", level: "fácil", art: "Anexo II · figuras de linguagem", stem: "Há hipérbole em:", choices: ["O relatório está sobre a mesa.", "Esperei uma eternidade na fila da Prefeitura.", "O fiscal lavrou o auto.", "A lei foi publicada ontem."], answer: 1, why: "Hipérbole = exagero proposital ('eternidade'). As outras são denotativas.", alts: ["Denotativo.", "Certo: exagero.", "Denotativo.", "Denotativo."] },
  { id: "q46", disc: "Português", topic: "Ortografia", sub: "Por que / porque / porquê / por quê", level: "média", art: "Ortografia", stem: "A grafia está correta em:", choices: ["Não compareceu por que estava doente.", "Porque você faltou à posse?", "O porquê da desistência consta no processo.", "E agora, porque?"], answer: 2, why: "'O porquê' (substantivo, com artigo) leva acento. Explicação: porque. Pergunta no início: por que. Pergunta no fim: por quê.", alts: ["Explicação pede 'porque'.", "Pergunta no início: 'Por que'.", "Certo: substantivo 'o porquê'.", "Pergunta no fim: 'por quê?'."] },
  { id: "q47", disc: "Português", topic: "Ortografia", sub: "Acentuação", level: "média", art: "Acordo Ortográfico", stem: "Assinale a oxítona acentuada de acordo com a regra:", choices: ["júri.", "táxi.", "parabéns.", "líder."], answer: 2, why: "Oxítonas acentuam-se em a(s), e(s), o(s), em, ens. 'Parabéns' é oxítona em -ens. 'Júri', 'táxi' e 'líder' são paroxítonas.", alts: ["Paroxítona terminada em i.", "Paroxítona terminada em i.", "Certo: oxítona em -ens.", "Paroxítona terminada em r."] },
  { id: "q48", disc: "Português", topic: "Concordância", sub: "Concordância nominal", level: "difícil", art: "Gramática", stem: "A concordância nominal está correta em:", choices: ["Segue anexo as certidões.", "É proibido permanência de ambulante sem licença.", "É necessário a apresentação do documento.", "Muito obrigado, disse a servidora."], answer: 1, why: "'É proibido' fica invariável sem artigo. Com artigo, varia: 'é necessária a apresentação'. 'Anexo' concorda: 'seguem anexas'. 'Obrigado' concorda com o falante.", alts: ["Certo seria 'seguem anexas as certidões'.", "Certo: sem artigo, 'proibido' não varia.", "Com artigo: 'é necessária a apresentação'.", "A servidora diria 'obrigada'."] },
  { id: "q49", disc: "Português", topic: "Sintaxe", sub: "Colocação pronominal", level: "difícil", art: "Gramática", stem: "A colocação pronominal está de acordo com a norma culta em:", choices: ["Me informe o local de prova.", "Não o convidei para a sindicância.", "Devolver-lhe-ei o auto amanhã, na fala cotidiana obrigatória da prova objetiva.", "Vou se pronunciar no recurso."], answer: 1, why: "Pronome átono não inicia oração (próclise após 'não'). 'Me informe' no início é coloquial. Mesóclise é rara e formal. 'Vou se' é erro.", alts: ["Átono não inicia período na norma culta.", "Certo: próclise após palavra negativa.", "Mesóclise não é o que a prova de nível médio costuma exigir como 'obrigatória'.", "'Vou se' é desvio."] },
  { id: "q50", disc: "Português", topic: "Funções da linguagem", sub: "Função referencial", level: "média", edital: ["pt-func"], art: "Anexo II · funções da linguagem", stem: "O edital que informa data, horário e local da prova exemplifica, predominantemente, a função:", choices: ["Poética.", "Referencial (denotativa).", "Emotiva.", "Fática."], answer: 1, why: "Função referencial: informar sobre o contexto, linguagem denotativa. Poética foca a mensagem estética; emotiva, o emissor; fática, o canal.", alts: ["Poética: estética do texto.", "Certo: informar fatos.", "Emotiva: sentimento do emissor.", "Fática: testar o canal ('alô?')."] },
  { id: "q51", disc: "Português", topic: "Tipos e gêneros", sub: "Texto dissertativo", level: "média", edital: ["pt-gen"], art: "Anexo II · tipos e gêneros", stem: "Um texto que defende uma tese com argumentos é, quanto ao tipo, principalmente:", choices: ["Narrativo.", "Dissertativo-argumentativo.", "Injuntivo.", "Descritivo."], answer: 1, why: "Dissertação argumentativa: tese + argumentos. Narração relata fatos; injunção instrui; descrição caracteriza.", alts: ["Narração: enredo, personagens, tempo.", "Certo.", "Injunção: receita, edital de 'faça X'.", "Descrição: características."] },
  { id: "q52", disc: "Português", topic: "Semântica", sub: "Ambiguidade", level: "média", art: "Anexo II · ambiguidade", stem: "Há ambiguidade em:", choices: ["O fiscal lavrou o auto ontem.", "O servidor viu o chefe no gabinete com o relógio quebrado.", "A posse ocorreu no prazo legal.", "Tanguá fica no Estado do Rio de Janeiro."], answer: 1, why: "Não fica claro se o relógio quebrado é do chefe, do servidor ou do gabinete. As outras são unívocas.", alts: ["Unívoco.", "Certo: anexo mal colocado.", "Unívoco.", "Unívoco."] },
  { id: "q53", disc: "Português", topic: "Semântica", sub: "Paronímia", level: "média", art: "Anexo II · paronímia", stem: "São parônimos:", choices: ["casa / lar.", "comprimento / cumprimento.", "lei / edital.", "posse / exercício."], answer: 1, why: "Parônimos: grafia e som parecidos, sentido diferente (comprimento ≠ cumprimento). Casa/lar são sinônimos aproximados.", alts: ["Sinônimos aproximados.", "Certo.", "Não são parônimos.", "Conceitos jurídicos distintos, sem paronímia."] },
  { id: "q54", disc: "Português", topic: "Pontuação", sub: "Aposto", level: "média", art: "Gramática", stem: "A pontuação do aposto está correta em:", choices: ["Tanguá cidade do Rio de Janeiro aplica a prova.", "Tanguá, município do Estado do Rio de Janeiro, sedia a prova.", "Tanguá município, do Estado sedia a prova.", "Tanguá município do Estado, do Rio de Janeiro sedia a prova."], answer: 1, why: "Aposto explicativo isolado por vírgulas. Sem as duas vírgulas, o aposto não se marca.", alts: ["Falta isolar o aposto.", "Certo.", "Vírgula solta, sem par.", "Quebra o sintagma."] },
  { id: "q55", disc: "Português", topic: "Interpretação", sub: "Explícito e implícito", level: "média", art: "Anexo II · leitura e interpretação", stem: "Se o texto afirma só que 'a prova terá 30 questões', é lícito concluir, sem extrapolar, que:", choices: ["Haverá redação.", "Haverá 30 questões.", "A prova será fácil.", "O candidato deve chutar todas."], answer: 1, why: "Compreensão: o que está escrito. Inferência só com base no texto. Redação, facilidade e estratégia de chute não estão no enunciado dado.", alts: ["Não dito.", "Certo: explícito.", "Juízo de valor externo.", "Estratégia externa."] },
  { id: "q56", disc: "Legislação", topic: "Investidura", sub: "Requisitos", level: "média", art: "Lei 946, Art. 13, §1º", stem: "São requisitos básicos para investidura em cargo público na Lei 946/2014, EXCETO:", choices: ["Idade mínima de dezoito anos.", "Estar quite com as obrigações militares e eleitorais.", "Aprovação em concurso de doutorado.", "Possuir o nível de escolaridade exigido para o cargo."], answer: 2, why: "Art. 13, §1º: nacionalidade, 18 anos, direitos políticos, obrigações militares e eleitorais, escolaridade, aptidão em exame médico-pericial, habilitação profissional quando for o caso. Doutorado não é requisito genérico.", alts: ["Inciso II do §1º.", "Inciso IV do §1º.", "Certo: não consta.", "Inciso V do §1º."] },
  { id: "q57", disc: "Legislação", topic: "Nomeação", sub: "Efetivo e comissão", level: "média", art: "Lei 946, Art. 22", stem: "A nomeação, na Lei 946/2014, dar-se-á:", choices: ["Somente para cargo em comissão.", "Para cargo efetivo (isolado ou de carreira) e para cargo em comissão declarado em lei de livre nomeação e exoneração.", "Apenas após o estágio probatório.", "Somente por decreto legislativo."], answer: 1, why: "Art. 22, I e II. Art. 23: efetivo depende de concurso, ordem de classificação e prazo de validade.", alts: ["Também há nomeação para efetivo.", "Certo.", "Estágio é posterior ao exercício (Art. 39).", "O ato de provimento é da autoridade do Executivo (Art. 21)."] },
  { id: "q58", disc: "Legislação", topic: "Nomeação", sub: "Concurso", level: "fácil", art: "Lei 946, Art. 23", stem: "A nomeação para cargo de provimento efetivo, na Lei 946/2014, depende de:", choices: ["Livre escolha do Prefeito, sem concurso.", "Prévia habilitação em concurso público, obedecida a ordem de classificação e o prazo de validade.", "Sorteio entre inscritos.", "Indicação da Câmara."], answer: 1, why: "Art. 23. Cargo em comissão é que é de livre nomeação (Art. 22, II), sem gerar direito de permanência (Art. 24, parágrafo único).", alts: ["Isso é cargo em comissão, não efetivo.", "Certo.", "Não previsto.", "Não previsto."] },
  { id: "q59", disc: "Legislação", topic: "Readaptação", sub: "Provisória", level: "difícil", art: "Lei 946, Art. 30", stem: "A readaptação provisória, na Lei 946/2014, é o afastamento temporário para tarefas mais compatíveis com a capacidade física e mental, por período máximo de:", choices: ["Seis meses.", "Um ano.", "Dois anos, consecutivos ou não.", "Cinco anos."], answer: 2, why: "Art. 30, §1º: máximo de dois anos, consecutivos ou não, com base em laudo da Perícia Médica. Readaptação também é forma de provimento (Art. 20, VII) e de vacância (Art. 49, III).", alts: ["Não é o prazo do §1º.", "Não é o prazo do §1º.", "Certo.", "Confunde com reversão (5 anos da aposentadoria, Art. 28, II, d)."] },
  { id: "q60", disc: "Legislação", topic: "Posse", sub: "Nomeação sem efeito", level: "média", art: "Lei 946, Art. 35, §4º", stem: "Se a posse não ocorrer no prazo do Art. 35 da Lei 946/2014, ou em caso de desistência do aprovado:", choices: ["O candidato entra automaticamente em exercício.", "O ato de nomeação será tornado sem efeito e cessam as obrigações da Administração para com o concursado.", "Abre-se PAD contra o candidato.", "Prorroga-se a posse por um ano, de ofício."], answer: 1, why: "Art. 35, §4º. O caput dá 30 dias da publicação da nomeação, prorrogáveis por igual período.", alts: ["Sem posse não há exercício (Art. 13, §2º).", "Certo.", "PAD é para servidor, não para quem não tomou posse.", "A prorrogação do caput é por igual período, a critério da autoridade, não de um ano de ofício."] },
  { id: "q61", disc: "Legislação", topic: "Estabilidade", sub: "Perda do cargo", level: "difícil", art: "Lei 946, Art. 48", stem: "O servidor estável perderá o cargo, na Lei 946/2014, EXCETO:", choices: ["Em virtude de sentença judicial transitada em julgado.", "Mediante processo administrativo, com ampla defesa e contraditório.", "Por avaliação periódica de desempenho, com ampla defesa e contraditório.", "Por simples decisão unilateral da chefia imediata, sem processo."], answer: 3, why: "Art. 48, I a III. Não há perda de cargo estável por ato isolado da chefia, sem as garantias do artigo.", alts: ["Inciso I.", "Inciso II.", "Inciso III.", "Certo: não previsto."] },
  { id: "q62", disc: "Legislação", topic: "Direitos", sub: "Ausências abonadas", level: "média", edital: ["leg-946-dir"], art: "Lei 946, Art. 176", stem: "Na Lei 946/2014, a ausência abonada por casamento e por falecimento de cônjuge, companheiro, ascendentes, madrasta ou padrasto, descendentes, enteados e irmãos é de:", choices: ["Dois dias cada, comprovação em 24 horas.", "Cinco dias, sem comprovação.", "Oito dias cada, com comprovação em até 48 horas da ocorrência.", "Quinze dias, só para casamento."], answer: 2, why: "Art. 176, V e VI: oito dias. Parágrafo único: comprovar por documento próprio até 48 horas da ocorrência. Doação de sangue: 1 dia, com intervalo mínimo de 180 dias (inciso IV).", alts: ["Prazos e prazo de prova errados.", "Prazo e comprovação errados.", "Certo.", "Não é o inciso V."] },
  { id: "q63", disc: "Legislação", topic: "Recurso", sub: "Prazo", level: "fácil", art: "Lei 946, Art. 198", stem: "O prazo para apresentação de recurso, na Lei 946/2014, é de:", choices: ["Cinco dias da publicação.", "Dez dias da posse.", "Quinze dias, contados da ciência da decisão.", "Trinta dias da nomeação."], answer: 2, why: "Art. 198. Parágrafo único: se provido, os efeitos retroagem à data da decisão impugnada.", alts: ["Não é o Art. 198.", "Não é o Art. 198.", "Certo.", "Confunde com posse."] },
  { id: "q64", disc: "Legislação", topic: "Petição", sub: "Prescrição do direito de requerer", level: "difícil", art: "Lei 946, Art. 199", stem: "O direito de requerer, na Lei 946/2014, prescreve em cinco anos quanto a:", choices: ["Qualquer advertência.", "Atos de demissão, cassação de aposentadoria ou disponibilidade, ou que afetem interesse patrimonial e créditos das relações de emprego.", "Faltas pontuais de dez minutos.", "Pedido de férias."], answer: 1, why: "Art. 199: 5 anos nesses atos (contados da exoneração ou demissão) e 2 anos nos demais casos. Não confundir com a prescrição da ação disciplinar (Art. 271).", alts: ["Advertência, na ação disciplinar, prescreve em 180 dias (Art. 271, III).", "Certo.", "Não é hipótese do Art. 199.", "Não é a hipótese de 5 anos."] },
  { id: "q65", disc: "Legislação", topic: "Acumulação", sub: "Opção no rito sumário", level: "média", art: "Lei 946, Art. 233", stem: "Detectada acumulação ilegal de cargos, a autoridade notificará o servidor para apresentar opção no prazo improrrogável de:", choices: ["Cinco dias.", "Dez dias, contados da ciência.", "Trinta dias.", "Sessenta dias."], answer: 1, why: "Art. 233: dez dias, improrrogáveis, contados da ciência. Na omissão, rito sumário. O rito sumário também apura abandono e inassiduidade (Art. 232).", alts: ["Não é o prazo do Art. 233.", "Certo.", "Confunde com sindicância (30+30).", "Confunde com PAD (60+60)."] },
  { id: "q66", disc: "Legislação", topic: "PAD", sub: "Comissão", level: "fácil", art: "Lei 946, Art. 239", stem: "O processo disciplinar ordinário, na Lei 946/2014, será conduzido por comissão composta de:", choices: ["Um procurador isolado.", "Dois estagiários.", "Três servidores detentores de cargo efetivo de nível igual ou superior ao do indiciado.", "Cinco vereadores."], answer: 2, why: "Art. 239. No rito sumário de acumulação, a comissão é de dois servidores estáveis (Art. 233, I) — não misturar os ritos.", alts: ["Não previsto para o rito ordinário.", "Não previsto.", "Certo.", "Não previsto."] },
  { id: "q67", disc: "Específicas", topic: "CF poderes", sub: "Art. 2º", level: "fácil", art: "CF Art. 2º", stem: "São Poderes da União, independentes e harmônicos, segundo o Art. 2º da CF:", choices: ["Somente o Executivo e o Judiciário.", "O Legislativo, o Executivo e o Judiciário.", "O Ministério Público e o Tribunal de Contas.", "A União, os Estados e os Municípios."], answer: 1, why: "Art. 2º: Legislativo, Executivo e Judiciário. União, Estados, DF e Municípios são entes (Art. 18). TCU auxilia o Legislativo na fiscalização (Art. 71).", alts: ["Falta o Legislativo.", "Certo.", "MP e TCU não são Poderes do Art. 2º.", "São entes federativos, Art. 18."] },
  { id: "q68", disc: "Específicas", topic: "CF 37", sub: "Publicidade", level: "média", art: "CF Art. 37, §1º", stem: "A publicidade dos atos, programas, obras, serviços e campanhas dos órgãos públicos deverá, nos termos do Art. 37, §1º, da CF:", choices: ["Ter nomes, símbolos ou imagens que caracterizem promoção pessoal de autoridade.", "Ter caráter educativo, informativo ou de orientação social, sem promoção pessoal de autoridades ou servidores.", "Dispensar identificação do órgão.", "Ser feita só em redes sociais particulares do Prefeito."], answer: 1, why: "CF Art. 37, §1º. A promoção pessoal é vedada. O caput já traz publicidade como princípio (LIMPE).", alts: ["Isso é exatamente o que o §1º veda.", "Certo.", "O §1º exige caráter educativo/informativo/orientação.", "Não está no §1º."] },
  { id: "q69", disc: "Específicas", topic: "Fiscalização contábil", sub: "Noções Arts. 70–71", level: "média", art: "CF Arts. 70 e 71", stem: "A fiscalização contábil, financeira e orçamentária da União, no texto constitucional, é exercida pelo Congresso Nacional, com o auxílio:", choices: ["Do Supremo Tribunal Federal.", "Do Tribunal de Contas da União.", "Da Câmara Municipal de Tanguá.", "Do Ministério da Economia, com exclusividade."], answer: 1, why: "CF Art. 71: TCU é o órgão que auxilia o Congresso. Para o Município, o paralelo é a Câmara com auxílio do Tribunal de Contas competente — noções, sem transformar o estudo em prova de TCE. O Anexo II do Fiscal pede essa noções; PPA/LDO/LOA detalhados e LRF são programa do Agente de Controle Interno no mesmo edital.", alts: ["STF não é o órgão de contas do Art. 71.", "Certo.", "A Câmara de Tanguá não auxilia o Congresso Nacional.", "O Executivo é fiscalizado, não o fiscalizador exclusivo."] },
  { id: "q70", disc: "Específicas", topic: "Orçamento", sub: "Noções Art. 165", level: "média", art: "CF Art. 165", stem: "São leis orçamentárias previstas no Art. 165 da CF:", choices: ["Somente a lei de responsabilidade fiscal.", "O plano plurianual, as diretrizes orçamentárias e os orçamentos anuais.", "Apenas o Código Tributário Nacional.", "Somente o edital do concurso."], answer: 1, why: "Art. 165: PPA, LDO e LOA, de iniciativa do Poder Executivo. O Anexo II do Fiscal pede tributação, orçamento e finanças como noções. PPA/LDO/LOA, LRF e Lei 4.320 em profundidade estão no programa de Agente de Controle Interno, não no de Fiscal.", alts: ["LRF é lei complementar (LC 101), não as três leis do Art. 165.", "Certo.", "CTN não é lei orçamentária do Art. 165.", "Edital não é lei orçamentária."] },
  { id: "q71", disc: "Específicas", topic: "Atos", sub: "Simples, complexo e composto", level: "média", edital: ["esp-adm-atos-class"], art: "Doutrina · Anexo II", stem: "O ato complexo diferencia-se do simples, em doutrina clássica cobrada no Anexo II, porque o complexo:", choices: ["Existe com a vontade de um só órgão.", "Depende da conjugação de vontades de órgãos diversos para formar um único ato.", "É sempre ilegal.", "Só o particular pratica."], answer: 1, why: "Simples: um órgão. Complexo: vontades de órgãos diversos fundidas num ato. Composto: um ato principal + ato acessório. O Anexo II lista expressamente simples, complexos e compostos.", alts: ["Isso é ato simples.", "Certo.", "Classificação não define legalidade.", "É ato administrativo."] },
  { id: "q72", disc: "Específicas", topic: "Atos", sub: "Gerais e individuais", level: "fácil", edital: ["esp-adm-atos-class"], art: "Doutrina · Anexo II", stem: "Um decreto que disciplina, em tese, o horário de funcionamento do comércio é, quanto aos destinatários, ato:", choices: ["Individual.", "Geral (ou normativo).", "Judicial.", "Privado."], answer: 1, why: "Ato geral: destinatários indeterminados. Individual: pessoa determinada (ex.: nomeação de Fulano). O Anexo II pede atos gerais e individuais.", alts: ["Individual apontaria pessoa certa.", "Certo.", "Não é ato judicial.", "É ato administrativo."] },
  { id: "q73", disc: "Específicas", topic: "Administração", sub: "Direta e indireta", level: "fácil", edital: ["esp-adm-prin"], art: "Doutrina · Anexo II", stem: "Na administração indireta incluem-se, em regra:", choices: ["Somente os Ministérios.", "Autarquias, fundações públicas, empresas públicas e sociedades de economia mista.", "Apenas a Câmara Municipal.", "Somente pessoas físicas."], answer: 1, why: "Administração direta: órgãos da pessoa política (União, Estado, DF, Município). Indireta: entidades com personalidade jurídica própria (autarquia, fundação pública, empresa pública, sociedade de economia mista). Anexo II: 'administração direta e indireta e modalidades de entidades administrativas'.", alts: ["Ministérios são órgãos da direta (União).", "Certo.", "Câmara é órgão, não entidade da indireta.", "Entidades da indireta são pessoas jurídicas."] },
  { id: "q74", disc: "Específicas", topic: "Informática", sub: "Hardware", level: "fácil", edital: ["esp-info-hw"], art: "Anexo II · hardware", stem: "Scanner, no hardware cobrado no Anexo II, é dispositivo principalmente de:", choices: ["Saída, como o monitor.", "Entrada, que digitaliza documentos.", "Armazenamento permanente, como o SSD.", "Rede, como o roteador."], answer: 1, why: "Scanner: entrada (digitaliza). Impressora: saída. Multifuncional combina os dois. Monitor e impressora são saída; SSD armazena; roteador é rede.", alts: ["Monitor/impressora = saída.", "Certo.", "SSD/HD = armazenamento.", "Roteador = rede."] },
  { id: "q75", disc: "Específicas", topic: "CF 5º", sub: "Remédios constitucionais", level: "difícil", art: "CF Art. 5º", stem: "O habeas data, no Art. 5º da CF, destina-se, em síntese, a:", choices: ["Fazer cessar violência ou coação à liberdade de locomoção.", "Assegurar conhecimento ou retificação de dados relativos à pessoa, em registros de entidade governamental ou de caráter público.", "Proteger direito líquido e certo não amparado por habeas corpus ou habeas data.", "Questionar lei em tese no STF, como ação direta de inconstitucionalidade."], answer: 1, why: "Art. 5º, LXXII: habeas data. HC (LXVIII) protege locomoção. Mandado de segurança (LXIX) protege direito líquido e certo residual. ADI não é remédio do Art. 5º para o particular nesse enunciado.", alts: ["Isso é habeas corpus.", "Certo.", "Isso é mandado de segurança.", "ADI é controle concentrado, não o habeas data."] }
];
MORE_BANK2.forEach((q) => BANK.push(q));

const MORE_BANK3 = [
  { id: "q76", disc: "Específicas", topic: "Anexo I", sub: "Licença comercial", level: "média", art: "Edital Anexo I", stem: "O Fiscal de Posturas encontra um comércio aberto, sem licença de funcionamento. À luz das atribuições do Anexo I, a conduta adequada é:", choices: ["Lançar ISS e constituir o crédito tributário.", "Verificar a regularidade do licenciamento da atividade, lavrar o que a chefia determinar e relatar a irregularidade, sem exercer fiscalização tributária.", "Embargar a obra por dano ambiental, como Fiscal de Meio Ambiente.", "Aplicar pena de demissão ao comerciante, no mesmo ato."], answer: 1, why: "Anexo I: verificar regularidade do licenciamento da atividade, lavrar e relatar. ISS é Fiscal de Tributos. Dano ambiental é Meio Ambiente. Demissão é penalidade estatutária de servidor, não de particular fiscalizado.", alts: ["Função de Tributos, não de Posturas.", "Certo: licenciamento, auto e relatório.", "Função de Meio Ambiente.", "Demissão não se aplica a particular nesse contexto."] },
  { id: "q77", disc: "Específicas", topic: "Anexo I", sub: "Ambulante", level: "fácil", art: "Edital Anexo I", stem: "Diante de comércio ambulante sem a documentação exigida, o Fiscal de Posturas deve, segundo o Anexo I:", choices: ["Impedir o comércio de quem não tenha a documentação exigida.", "Cobrar taxa de ISS no local.", "Liberar a atividade se o produto for alimentício.", "Apenas orientar, sem qualquer registro, ainda que a chefia determine o auto."], answer: 0, why: "Anexo I: impedir o comércio de quem não tenha a documentação exigida. Tributos não se confundem com posturas.", alts: ["Certo.", "ISS não é atribuição de Posturas.", "Alimento não dispensa documentação de posturas.", "O Anexo I prevê lavrar o que a chefia determinar."] },
  { id: "q78", disc: "Específicas", topic: "Anexo I", sub: "Publicidade", level: "média", art: "Edital Anexo I", stem: "A fiscalização de anúncios, alto-falantes e propaganda em muros, tapumes e vitrines, no Anexo I, compete ao Fiscal de Posturas como controle de:", choices: ["Crédito tributário de ISS sobre propaganda.", "Posturas de publicidade em logradouro e fachadas, sem lançar tributo.", "Licenciamento ambiental de ruído, exclusivo da União.", "Direito autoral da obra anunciada."], answer: 1, why: "Anexo I lista publicidade (anúncios, alto-falantes, propaganda em muros, tapumes e vitrines) como atribuição de Posturas. Não é lançamento de ISS nem direito autoral.", alts: ["Tributos.", "Certo.", "Fora do Anexo I do cargo.", "Fora do Anexo I do cargo."] },
  { id: "q79", disc: "Específicas", topic: "Anexo I", sub: "Apreensão", level: "média", art: "Edital Anexo I", stem: "Na apreensão de mercadorias, veículos, animais ou objetos em ruas, o Anexo I indica que o Fiscal de Posturas deve:", choices: ["Ficar com o bem em casa, como garantia pessoal.", "Guardar em depósito público e devolver após as formalidades e o pagamento da multa, quando couber.", "Doar imediatamente a terceiros.", "Remeter o bem à Receita Federal, sempre."], answer: 1, why: "Anexo I: apreensão, guarda em depósito público e devolução após formalidades e multa. Não é apropriação pessoal nem competência tributária federal automática.", alts: ["Vedado.", "Certo.", "Não previsto.", "Não é a regra do Anexo I."] },
  { id: "q80", disc: "Específicas", topic: "Atos", sub: "Poder de polícia", level: "difícil", edital: ["esp-adm-atos"], art: "Doutrina · Anexo II", stem: "A apreensão de mercadoria irregular em logradouro e a interdição de estabelecimento, no recorte do cargo, ligam-se sobretudo ao:", choices: ["Poder hierárquico, exclusivo da Câmara.", "Poder de polícia administrativa, com autoexecutoriedade quando a lei autoriza a medida imediata.", "Poder regulamentar do particular.", "Controle concentrado de constitucionalidade."], answer: 1, why: "Poder de polícia: condicionar e restringir direitos em nome do interesse público. Autoexecutoriedade autoriza a Administração a executar a medida (apreensão, interdição) sem prévia ordem judicial, nos limites da lei. Não confundir com hierarquia interna nem com ADI.", alts: ["Hierarquia é relação interna da Administração.", "Certo.", "Particular não exerce poder regulamentar estatal.", "ADI não é ato de polícia de rua."] },
  { id: "q81", disc: "Português", topic: "Morfologia", sub: "Classes de palavras", level: "média", art: "Anexo II · classes de palavras", stem: "Em 'A fiscalização ocorreu ontem, conforme o edital', a palavra 'conforme' classifica-se, no contexto, como:", choices: ["Substantivo.", "Adjetivo.", "Preposição (ou locução prepositiva de conformidade).", "Interjeição."], answer: 2, why: "Conforme, aqui, introduz circunstância de conformidade (preposição). Não nomeia (substantivo), não caracteriza um substantivo (adjetivo) e não expressa emoção (interjeição).", alts: ["Não é nome.", "Não caracteriza substantivo neste uso.", "Certo.", "Interjeição seria 'nossa!', 'olha!'. "] },
  { id: "q82", disc: "Específicas", topic: "Informática", sub: "Ransomware", level: "fácil", edital: ["esp-info-seg"], art: "Anexo II · segurança da informação", stem: "Ransomware, em oposição ao phishing, é principalmente:", choices: ["Página falsa para capturar senha.", "Malware que criptografa arquivos e exige resgate para devolvê-los.", "Cópia de segurança em nuvem.", "Atualização legítima do Windows."], answer: 1, why: "Ransomware: sequestro por criptografia. Phishing: engenharia social para obter dados. Backup é defesa, não o ataque.", alts: ["Isso é phishing.", "Certo.", "Backup é proteção.", "Atualização não é ransomware."] },
  { id: "q83", disc: "Específicas", topic: "Ética", sub: "Presentes", level: "média", art: "Anexo II · ética / Lei 946 Art. 204", stem: "Aceitar presente de estabelecimento fiscalizado, para facilitar a liberação de banca em logradouro, ofende sobretudo:", choices: ["O dever de zelo, sigilo e primazia do interesse público, além da ética profissional do Anexo II.", "Apenas a Lei de Diretrizes Orçamentárias, em profundidade de TCU.", "O direito autoral da logomarca da banca.", "Nenhuma norma, se o valor for simbólico e não houver recibo."], answer: 0, why: "Ética profissional (Anexo II) e deveres do Art. 204 da Lei 946 (zelo, levar irregularidade à autoridade, urbanidade, sigilo). Interesse particular do fiscalizado não se sobrepõe ao público. LDO/TCU não são o fundamento imediato desta conduta de rua.", alts: ["Certo.", "Fora do recorte de profundidade do Fiscal.", "Não é o núcleo da ética funcional.", "Valor simbólico não legitima a vantagem."] }
];
MORE_BANK3.forEach((q) => BANK.push(q));

const MORE_BANK4 = [
  { id: "q84", disc: "Legislação", topic: "Lei Orgânica", sub: "Competência do Município", level: "fácil", edital: ["leg-lom"], art: "LOM Tanguá, Art. 20, I", stem: "Na Lei Orgânica do Município de Tanguá, compete ao Município, entre outras atribuições:", choices: ["Legislar sobre direito penal.", "Legislar sobre assuntos de interesse local.", "Emitir moeda.", "Declarar guerra."], answer: 1, why: "Questão autoral. LOM Art. 20, I: compete ao Município legislar sobre assuntos de interesse local. Direito penal, moeda e declaração de guerra não são competência municipal.", alts: ["Competência da União.", "Certo: Art. 20, I.", "Competência da União.", "Competência da União."] },
  { id: "q85", disc: "Legislação", topic: "Lei Orgânica", sub: "Emenda à LOM", level: "difícil", edital: ["leg-lom-cam"], art: "LOM Tanguá, Art. 69, I e §1º", stem: "A Lei Orgânica de Tanguá poderá ser emendada, entre outras hipóteses, mediante proposta:", choices: ["De um terço dos vereadores, aprovada em turno único por maioria simples.", "De dois terços, no mínimo, dos membros da Câmara, votada em dois turnos com interstício mínimo de dez dias e aprovada por dois terços em cada turno.", "Apenas do Governador do Estado.", "De qualquer eleitor isoladamente, sem percentual mínimo."], answer: 1, why: "Questão autoral. LOM Art. 69, I: proposta de dois terços, no mínimo, dos vereadores. §1º: dois turnos, interstício mínimo de dez dias, aprovação por dois terços em cada turno. Também cabem proposta do Prefeito e proposta popular de 5% do eleitorado (incisos II e III).", alts: ["Quórum e rito incorretos.", "Certo: Art. 69, I e §1º.", "O Governador não figura no Art. 69.", "Iniciativa popular exige 5% do eleitorado (Art. 69, III)."] }
];
MORE_BANK4.forEach((q) => BANK.push(q));

const MORE_BANK5 = [
  { id: "q86", disc: "Português", topic: "Variações linguísticas", sub: "Norma culta e variação", level: "média", edital: ["pt-var"], art: "Anexo II · variações linguísticas", origin: "autoral", stem: "Em prova objetiva de concurso, a variação linguística deve ser entendida, em regra, como:", choices: ["Erro que a banca sempre pune, qualquer que seja o registro.", "Fenômeno natural da língua; a prova cobra adequação à norma culta no registro formal, sem negar que outras variedades existam.", "Prova de que só existe uma forma correta em qualquer situação.", "Autorização para grafar fora do Acordo Ortográfico na redação oficial."], answer: 1, why: "Questão autoral. Variação (regional, social, situacional, histórica) existe. O edital pede a norma culta no registro formal da prova. Não há evidência IBDO transcrita neste tópico; o material segue o Anexo II.", alts: ["Confunde variação com erro absoluto.", "Certo.", "Nega a variação.", "O Acordo continua valendo na prova."] },
  { id: "q87", disc: "Português", topic: "Coesão", sub: "Coerência", level: "difícil", edital: ["pt-coes"], art: "Anexo II · coesão e coerência", origin: "autoral", stem: "Há quebra de coerência, e não só de coesão, quando o texto:", choices: ["Usa o conectivo 'portanto' após uma premissa que autoriza a conclusão.", "Afirma no primeiro parágrafo que a prova é em Tanguá e, sem retificar, trata a prova como se fosse em outro município.", "Substitui 'Fiscal de Posturas' por 'o candidato' na frase seguinte.", "Emprega vírgula no aposto explicativo."], answer: 1, why: "Questão autoral. Coerência é o sentido global; contradizer o local da prova quebra a coerência. Trocar por 'o candidato' é coesão (retomada). 'Portanto' bem usado e vírgula de aposto são coesão/pontuação adequados.", alts: ["Conectivo adequado: coesão ok.", "Certo: contradição factual.", "Retomada = coesão.", "Pontuação de aposto."] },
  { id: "q88", disc: "Português", topic: "Sintaxe", sub: "Orações coordenadas e subordinadas", level: "média", edital: ["pt-sint"], art: "Anexo II · orações", origin: "autoral", stem: "Em 'O fiscal lavrou o auto, mas o estabelecimento recorreu', a oração introduzida por 'mas' é:", choices: ["Subordinada adverbial causal.", "Coordenada sindética adversativa.", "Subordinada adjetiva restritiva.", "Coordenada sindética explicativa."], answer: 1, why: "Questão autoral. Coordenadas são independentes sintaticamente; 'mas' marca oposição (adversativa). Causal seria 'porque'; adjetiva viria com pronome relativo; explicativa típica usa 'pois/que'.", alts: ["Causal pediria 'porque/pois' de causa.", "Certo.", "Não há relativo.", "Explicativa não é o valor de 'mas'."] },
  { id: "q89", disc: "Português", topic: "Sintaxe", sub: "Termos da oração", level: "fácil", edital: ["pt-sint"], art: "Anexo II · termos das orações", origin: "autoral", stem: "Em 'O Prefeito sancionou a lei', o termo 'a lei' funciona como:", choices: ["Sujeito.", "Objeto direto.", "Adjunto adverbial de lugar.", "Vocativo."], answer: 1, why: "Questão autoral. Sujeito: O Prefeito. Verbo transitivo direto: sancionou. Objeto direto: a lei. Não há vocativo nem adjunto de lugar.", alts: ["Sujeito é 'O Prefeito'.", "Certo.", "Não indica lugar.", "Não há chamado."] },
  { id: "q90", disc: "Legislação", topic: "Lei Orgânica", sub: "Prefeito", level: "média", edital: ["leg-lom-pref"], art: "LOM Tanguá, Art. 94, III e IV", origin: "autoral", stem: "Segundo a Lei Orgânica de Tanguá, compete ao Prefeito, entre outras atribuições:", choices: ["Exercer, sozinho, o Poder Legislativo municipal, dispensando a Câmara.", "Sancionar, promulgar e fazer publicar as leis aprovadas pela Câmara, expedir regulamentos para sua execução e vetar, no todo ou em parte, os projetos aprovados.", "Emendar a Lei Orgânica em turno único, por decreto.", "Nomear vereadores para a legislatura."], answer: 1, why: "Questão autoral. LOM Art. 94, III e IV. O Legislativo é da Câmara (Art. 43). Emenda à LOM segue o Art. 69, não decreto do Prefeito em turno único. Vereadores são eleitos.", alts: ["Art. 43: Legislativo = Câmara.", "Certo: Art. 94, III e IV.", "Art. 69 rege emenda à LOM.", "Vereadores não são nomeados pelo Prefeito."] },
  { id: "q91", disc: "Legislação", topic: "Lei Orgânica", sub: "Câmara", level: "média", edital: ["leg-lom-cam"], art: "LOM Tanguá, Art. 43", origin: "autoral", stem: "Na Lei Orgânica de Tanguá, o Poder Legislativo é exercido:", choices: ["Pelo Prefeito, em decreto.", "Pela Câmara de Vereadores, com legislatura de quatro anos.", "Pelo Tribunal de Contas da União, com exclusividade.", "Pelo Governador do Estado."], answer: 1, why: "Questão autoral. LOM Art. 43, caput e parágrafo único: Câmara; legislatura de quatro anos, cada ano uma sessão legislativa.", alts: ["Prefeito é Executivo (Art. 94).", "Certo.", "TCU não exerce o Legislativo municipal.", "Governador não é órgão legislativo de Tanguá."] },
  { id: "q92", disc: "Legislação", topic: "Licenças", sub: "Modalidades e estágio", level: "difícil", edital: ["leg-946-dir"], art: "Lei 946, Art. 127, §5º", origin: "autoral", stem: "O servidor em estágio probatório, na Lei 946/2014, só terá direito, dentre as licenças do Art. 127, a:", choices: ["Todas as onze modalidades do caput, inclusive interesses particulares.", "Licença gestante, paternidade e para tratamento de saúde.", "Somente licença-prêmio.", "Licença para tratar de interesses particulares, de ofício."], answer: 1, why: "Questão autoral. Art. 127, §5º: no período probatório, só gestante, paternidade e tratamento de saúde. O caput lista onze modalidades; o §5º restringe o estágio.", alts: ["O §5º restringe.", "Certo.", "Licença-prêmio não está no §5º.", "Interesses particulares não cabem no estágio, pelo §5º."] },
  { id: "q93", disc: "Legislação", topic: "Proibições", sub: "Presente", level: "fácil", edital: ["leg-946-disc"], art: "Lei 946, Art. 205, XII", origin: "autoral", stem: "À luz do Art. 205 da Lei 946/2014, ao servidor é proibido:", choices: ["Tratar o público com urbanidade.", "Receber propina, comissão, presente ou vantagem de qualquer espécie, em razão de suas atribuições.", "Levar irregularidade ao conhecimento da autoridade.", "Guardar sigilo sobre assunto da repartição."], answer: 1, why: "Questão autoral. Art. 205, XII: proibido receber presente em razão das atribuições. Urbanidade, levar irregularidade e sigilo são deveres do Art. 204.", alts: ["Dever, Art. 204, XI.", "Certo: Art. 205, XII.", "Dever, Art. 204, VI.", "Dever, Art. 204, VIII."] },
  { id: "q94", disc: "Específicas", topic: "Atos", sub: "Unilaterais", level: "difícil", edital: ["esp-adm-atos-class"], art: "Doutrina · Anexo II", origin: "autoral", stem: "O auto de interdição de estabelecimento, praticado pela Administração no exercício do poder de polícia, é, quanto ao número de vontades, ato:", choices: ["Bilateral, porque o particular precisa concordar.", "Unilateral: forma-se com a vontade da Administração, independentemente de acordo com o fiscalizado.", "Multilateral, porque envolve União, Estado e Município em todo caso.", "Judicial, porque só o juiz interdita."], answer: 1, why: "Questão autoral. Ato administrativo típico é unilateral. Bilateral seria contrato. Multilateral exigiria várias partes em acordo. Interdição de polícia administrativa não depende de sentença, quando a lei autoriza (autoexecutoriedade).", alts: ["Polícia administrativa não exige concordância do particular.", "Certo.", "Não é o critério desta classificação.", "Pode haver controle judicial posterior; o ato em si é administrativo."] },
  { id: "q95", disc: "Específicas", topic: "Procedimento", sub: "Formação do ato", level: "média", edital: ["esp-adm-proc"], art: "Doutrina · Anexo II", origin: "autoral", stem: "O procedimento administrativo, no recorte do Anexo II (formação do ato), corresponde sobretudo a:", choices: ["O processo penal de competência da Justiça Federal.", "A sequência de atos preparatórios que antecedem a decisão administrativa, distinta do processo judicial.", "O recurso extraordinário no STF.", "A emenda à Constituição Federal."], answer: 1, why: "Questão autoral. Anexo II pede procedimento na formação do ato. Não é processo penal, RE nem PEC. Evidência IBDO insuficiente neste subassunto; a questão cobre o conceito básico exigido pelo edital.", alts: ["Fora do recorte.", "Certo.", "Fora do recorte.", "Fora do recorte."] },
  { id: "q96", disc: "Específicas", topic: "Agentes públicos", sub: "Servidor e funcionário", level: "média", edital: ["esp-adm-ag"], art: "Doutrina · Anexo II", origin: "autoral", stem: "No vocabulário cobrado em noções de Direito Administrativo, é correto afirmar que:", choices: ["Agente público é só o servidor efetivo estável.", "Agente público é gênero; servidor estatutário (como o da Lei 946) é espécie, distinto do empregado público celetista de empresa pública ou sociedade de economia mista.", "Cargo em comissão e cargo efetivo são a mesma investidura.", "Todo particular colaborador é servidor estável."], answer: 1, why: "Questão autoral. Anexo II distingue agente, servidor e funcionário e a natureza da relação. Efetivo (concurso + estatuto) ≠ comissão (livre nomeação) ≠ emprego público (CLT na indireta). Estabilidade não se estende a todo particular.", alts: ["O gênero é mais amplo.", "Certo.", "Art. 22 da Lei 946 distingue efetivo e comissão.", "Particular não se torna estável por colaborar."] },
  { id: "q97", disc: "Específicas", topic: "Organização do Estado", sub: "Entes federativos", level: "média", edital: ["esp-cf-mun"], art: "CF Art. 18", origin: "autoral", stem: "A organização político-administrativa da República Federativa do Brasil compreende, nos termos do Art. 18 da CF:", choices: ["Somente a União e os Estados.", "A União, os Estados, o Distrito Federal e os Municípios, todos autônomos nos termos da Constituição.", "Apenas os Municípios, submetidos ao Governador.", "A União e as autarquias, com exclusão dos Municípios."], answer: 1, why: "Questão autoral. CF Art. 18, caput. Autarquias são da administração indireta, não substituem os entes do Art. 18. Município não se submete ao Governador como órgão interno.", alts: ["Faltam DF e Municípios.", "Certo.", "Município é ente autônomo.", "Autarquia não é ente do Art. 18."] },
  { id: "q98", disc: "Específicas", topic: "Informática", sub: "Windows", level: "fácil", edital: ["esp-info-so"], art: "Anexo II · sistemas operacionais Microsoft", origin: "autoral", stem: "No ambiente Windows cobrado em noções, a combinação Alt+Tab serve, em regra, para:", choices: ["Desligar o computador imediatamente.", "Alternar entre aplicativos abertos.", "Formatar o disco rígido.", "Enviar e-mail no Outlook sem confirmação."], answer: 1, why: "Questão autoral. Alt+Tab: troca de janelas/aplicativos. O edital não fixa versão do Windows; o atalho é conceito geral de ambiente Microsoft. Formatar disco e desligar não são função desse atalho.", alts: ["Não é o atalho de desligar.", "Certo.", "Formatação não é Alt+Tab.", "Não dispara e-mail."] },
  { id: "q99", disc: "Específicas", topic: "Informática", sub: "Office", level: "fácil", edital: ["esp-info-so"], art: "Anexo II · Pacote Microsoft Office", origin: "autoral", stem: "No Pacote Microsoft Office, em noções de nível médio, Excel destina-se principalmente a:", choices: ["Edição de texto corrido, como o Word.", "Planilhas, células, fórmulas simples e gráficos.", "Somente apresentação de slides.", "Administração de servidor de banco de dados."], answer: 1, why: "Questão autoral. Excel = planilha. Word = texto. PowerPoint = slides. Banco de dados/servidor está fora do edital. O edital não indica versão; não se cobre VBA nem Power Query.", alts: ["Isso é Word.", "Certo.", "Isso é PowerPoint.", "Fora do edital."] },
  { id: "q100", disc: "Específicas", topic: "Informática", sub: "Internet Explorer", level: "fácil", edital: ["esp-info-so"], art: "Anexo II · Internet Explorer", origin: "autoral", stem: "O Internet Explorer, citado no Anexo II, é:", choices: ["Um sistema operacional da Apple.", "Navegador da Microsoft para acesso à web, hoje em desuso em favor do Edge, sem deixar de ser o programa nomeado no edital.", "Um antivírus da Google.", "Um aplicativo de planilha, equivalente ao Excel."], answer: 1, why: "Questão autoral. O edital menciona Internet Explorer; não se substitui o tópico por Edge sem registrar a diferença. IE é navegador Microsoft. Edge o sucedeu. Não é SO da Apple, nem antivírus, nem planilha.", alts: ["IE não é macOS.", "Certo.", "Não é antivírus.", "Planilha é Excel."] },
  { id: "q101", disc: "Específicas", topic: "Informática", sub: "Google Chrome", level: "fácil", edital: ["esp-info-so"], art: "Anexo II · Google Chrome", origin: "autoral", stem: "No Google Chrome, a barra de endereço (omnibox) serve principalmente para:", choices: ["Formatar o HD.", "Digitar endereço de sítio ou termo de busca para navegar na web.", "Instalar o Windows.", "Substituir a memória RAM."], answer: 1, why: "Questão autoral. Chrome: navegador. Omnibox = URL ou busca. Hardware e instalação do SO não se fazem por essa barra.", alts: ["Não formata disco.", "Certo.", "Não instala SO.", "Não substitui RAM."] },
  { id: "q102", disc: "Específicas", topic: "Informática", sub: "Impressoras", level: "fácil", edital: ["esp-info-hw"], art: "Anexo II · impressoras e multifuncionais", origin: "autoral", stem: "Impressora e scanner distinguem-se, no hardware do Anexo II, porque:", choices: ["A impressora é dispositivo de entrada; o scanner é só armazenamento.", "A impressora é, em regra, dispositivo de saída (papel); o scanner é de entrada (digitaliza). Multifuncional reúne as duas funções.", "Ambos são apenas memória volátil, como a RAM.", "Nenhum dos dois se conecta ao computador."], answer: 1, why: "Questão autoral. Saída = impressora. Entrada = scanner. Multifuncional combina. RAM é memória, não periférico de impressão/digitalização.", alts: ["Inverte entrada/saída.", "Certo.", "RAM não é impressora/scanner.", "Periféricos conectam-se sim."] },
  { id: "q103", disc: "Específicas", topic: "Provimento CF", sub: "Nomeação e vacância", level: "difícil", edital: ["esp-adm-prov-vac"], art: "Anexo II · provimento e vacância / Lei 946 Arts. 20 e 49", origin: "autoral", stem: "Cruzando o Anexo II de específicas com a Lei 946/2014, é correto afirmar que:", choices: ["Exoneração é forma de provimento, ao lado da nomeação.", "Nomeação é forma de provimento (Art. 20); exoneração é forma de vacância (Art. 49) e não figura no elenco de penalidades do Art. 217.", "Demissão e exoneração são sempre sinônimos no estatuto.", "Vacância só ocorre por falecimento."], answer: 1, why: "Questão autoral. O Anexo II de específicas pede formas de provimento e vacância; a fonte local é a Lei 946 Arts. 20 e 49. Exoneração esvazia o cargo; demissão é penalidade (Art. 217). Vacância tem várias hipóteses (Art. 49).", alts: ["Exoneração não está no Art. 20.", "Certo.", "Demissão é pena; exoneração não.", "Art. 49 lista várias causas."] }
];
MORE_BANK5.forEach((q) => BANK.push(q));

const MORE_BANK6 = [
  { id: "q104", disc: "Português", topic: "Fonologia", sub: "Tritongo", level: "média", edital: ["pt-fono"], art: "Anexo II · encontros vocálicos", origin: "autoral", stem: "Há tritongo em:", choices: ["saída.", "pai.", "Uruguai.", "poesia."], answer: 2, why: "Questão autoral. Tritongo: vogal entre duas semivogais na mesma sílaba (U-ru-guai). 'Saída' e 'poesia' têm hiato; 'pai' é ditongo decrescente.", alts: ["Hiato (sa-í-da).", "Ditongo decrescente.", "Certo: tritongo.", "Hiato (po-e-si-a)."] },
  { id: "q105", disc: "Português", topic: "Figuras", sub: "Eufemismo", level: "fácil", edital: ["pt-fig"], art: "Anexo II · figuras de linguagem", origin: "autoral", stem: "Há eufemismo em:", choices: ["O relatório está na mesa.", "O servidor faltou à verdade no depoimento.", "A lei foi publicada ontem.", "O relógio marcou três horas."], answer: 1, why: "Questão autoral. Eufemismo suaviza o desagradável ('faltou à verdade' por 'mentiu'). As outras são denotativas.", alts: ["Denotativo.", "Certo.", "Denotativo.", "Denotativo."] },
  { id: "q106", disc: "Português", topic: "Funções da linguagem", sub: "Função apelativa", level: "fácil", edital: ["pt-func"], art: "Anexo II · funções da linguagem", origin: "autoral", stem: "O cartaz 'Compareça à posse no prazo legal' privilegia, sobretudo, a função:", choices: ["Emotiva.", "Apelativa (ou conativa).", "Poética.", "Metalinguística."], answer: 1, why: "Questão autoral. Apelativa/conativa dirige-se ao receptor (ordem, convite). Emotiva foca o emissor; poética, a forma; metalinguística, o código.", alts: ["Emotiva: sentimento do emissor.", "Certo.", "Poética: estética.", "Metalinguística: falar da língua."] },
  { id: "q107", disc: "Português", topic: "Tipos e gêneros", sub: "Texto injuntivo", level: "fácil", edital: ["pt-gen"], art: "Anexo II · tipos e gêneros", origin: "autoral", stem: "Um edital que determina 'leve documento original e caneta transparente' é, quanto ao tipo, principalmente:", choices: ["Narrativo.", "Descritivo.", "Injuntivo (instrucional).", "Poético."], answer: 2, why: "Questão autoral. Injunção instrui o destinatário a fazer algo. Narração relata; descrição caracteriza; poético privilegia a forma estética.", alts: ["Narração: fatos encadeados.", "Descrição: características.", "Certo.", "Não é o tipo dominante."] },
  { id: "q108", disc: "Legislação", topic: "Exercício", sub: "Exoneração de ofício", level: "média", edital: ["leg-946-inv"], art: "Lei 946, Art. 50, II", origin: "autoral", stem: "Não entrar em exercício no prazo do Art. 36 da Lei 946/2014 implica, em regra:", choices: ["Demissão após PAD.", "Exoneração de ofício.", "Cassação de aposentadoria.", "Aproveitamento automático em outro cargo."], answer: 1, why: "Questão autoral. Art. 50, II: exoneração de ofício quando o empossado não entra em exercício no prazo. Demissão é penalidade (Art. 217); cassação também. Aproveitamento é forma de provimento (Art. 20).", alts: ["Demissão exige processo e pena.", "Certo: Art. 50, II.", "Cassação é penalidade do Art. 217.", "Aproveitamento não é a consequência do Art. 50, II."] },
  { id: "q109", disc: "Legislação", topic: "Lei Orgânica", sub: "Competência suplementar", level: "média", edital: ["leg-lom"], art: "LOM Tanguá, Art. 20, II", origin: "autoral", stem: "Além de legislar sobre interesse local, compete ao Município de Tanguá, na LOM:", choices: ["Declarar guerra.", "Suplementar a legislação federal e a estadual, no que couber.", "Emitir moeda.", "Legislar privativamente sobre direito penal."], answer: 1, why: "Questão autoral. LOM Art. 20, II: suplementar legislação federal e estadual, no que couber. Guerra, moeda e direito penal não são competência municipal.", alts: ["União.", "Certo: Art. 20, II.", "União.", "União."] },
  { id: "q110", disc: "Específicas", topic: "CF 37", sub: "Concurso", level: "média", edital: ["esp-cf-adm"], art: "CF Art. 37, II", origin: "autoral", stem: "A investidura em cargo ou emprego público, no Art. 37, II, da CF, depende, em regra, de:", choices: ["Livre escolha, em qualquer cargo efetivo.", "Prévia aprovação em concurso público de provas ou de provas e títulos, de acordo com a natureza e a complexidade do cargo ou emprego, na forma prevista em lei, ressalvadas as nomeações para cargo em comissão.", "Sorteio entre inscritos.", "Indicação parlamentar obrigatória para todo efetivo."], answer: 1, why: "Questão autoral. CF Art. 37, II. Cargo em comissão é a ressalva de livre nomeação. Efetivo exige concurso.", alts: ["Contradiz o inciso II.", "Certo.", "Não previsto.", "Não é a regra do inciso II."] },
  { id: "q111", disc: "Específicas", topic: "Atos", sub: "Composto", level: "difícil", edital: ["esp-adm-atos-class"], art: "Doutrina · Anexo II", origin: "autoral", stem: "O ato composto, na classificação do Anexo II, caracteriza-se por:", choices: ["Formar-se com a vontade de um só órgão, sem acessório.", "Reunir vontades de órgãos diversos em um único ato, como o complexo.", "Haver um ato principal e outro acessório que o aperfeiçoa ou dá eficácia.", "Ser sempre contrato com o particular."], answer: 2, why: "Questão autoral. Composto: principal + acessório. Simples: um órgão. Complexo: vontades de órgãos diversos fundidas num só ato. Contrato é outra classificação (bilateral).", alts: ["Isso é ato simples.", "Isso é ato complexo.", "Certo.", "Bilateral/contrato não define composto."] },
  { id: "q112", disc: "Específicas", topic: "Bens públicos", sub: "Dominicais", level: "média", edital: ["esp-adm-bens"], art: "CC Arts. 98–103 / doutrina", origin: "autoral", stem: "Terreno municipal vago, sem destinação a uso comum nem a serviço público, classifica-se, em regra, como bem:", choices: ["De uso comum do povo.", "De uso especial.", "Dominical.", "Privado do fiscal que o encontrou."], answer: 2, why: "Questão autoral. Dominicais: patrimônio disponível, sem destinação a uso comum ou especial. Rua/praça = comum. Repartição em uso = especial. Bem público não se apropria o fiscal.", alts: ["Comum exige uso da coletividade (rua, praça).", "Especial: afetado a serviço (repartição).", "Certo.", "Vedado."] },
  { id: "q113", disc: "Específicas", topic: "Ética", sub: "Sigilo", level: "média", edital: ["esp-etica"], art: "Anexo II · ética / Lei 946 Art. 204, VIII", origin: "autoral", stem: "Guardar sigilo sobre assunto da repartição, no recorte de ética profissional e da Lei 946/2014, é:", choices: ["Faculdade do servidor, quando lhe convier.", "Dever funcional (Art. 204, VIII), alinhado à ética do Anexo II.", "Proibição de tratar o público com urbanidade.", "Autorização para omitir irregularidade da chefia."], answer: 1, why: "Questão autoral. Art. 204, VIII: dever de sigilo. Urbanidade também é dever (XI). Levar irregularidade à autoridade é dever (VI), não omissão.", alts: ["Não é facultativo.", "Certo.", "Urbanidade é dever, não proibição.", "Omissão ofende o Art. 204, VI."] },
  { id: "q114", disc: "Específicas", topic: "Informática", sub: "Windows", level: "fácil", edital: ["esp-info-so"], art: "Anexo II · sistemas operacionais Microsoft", origin: "autoral", stem: "No Windows, em noções de nível médio, a Lixeira serve principalmente para:", choices: ["Formatar o disco de forma irreversível.", "Guardar, de modo recuperável em regra, arquivos excluídos pelo usuário, até esvaziá-la.", "Substituir a memória RAM.", "Instalar o Internet Explorer."], answer: 1, why: "Questão autoral. Lixeira: exclusão reversível até o esvaziamento. Não formata disco, não é RAM, não instala navegador.", alts: ["Formatação não é função da Lixeira.", "Certo.", "RAM é memória volátil.", "IE não se instala pela Lixeira."] },
  { id: "q115", disc: "Específicas", topic: "Informática", sub: "Office", level: "média", edital: ["esp-info-so"], art: "Anexo II · Pacote Microsoft Office", origin: "autoral", stem: "No Excel, a fórmula =SOMA(A1:A3) destina-se, em noções, a:", choices: ["Concatenar texto, como o Word.", "Somar o intervalo de células de A1 até A3.", "Apagar o arquivo.", "Criar macro VBA, exigida pelo edital."], answer: 1, why: "Questão autoral. SOMA é função básica de planilha. O edital não pede VBA. Concatenar texto e apagar arquivo não são essa fórmula.", alts: ["Word/texto não é SOMA.", "Certo.", "Não apaga arquivo.", "VBA está fora do edital."] },
  { id: "q116", disc: "Específicas", topic: "Procedimento", sub: "Fases", level: "média", edital: ["esp-adm-proc"], art: "Doutrina · Anexo II", origin: "autoral", stem: "Em noções de procedimento administrativo na formação do ato, a sequência típica é:", choices: ["Recurso extraordinário, ADI e súmula vinculante.", "Instauração, instrução e decisão, distintas do processo judicial.", "Somente sentença penal condenatória.", "Emenda à Lei Orgânica em turno único, por decreto do particular."], answer: 1, why: "Questão autoral. Anexo II pede procedimento na formação do ato: fases preparatórias até a decisão. Não é controle concentrado, processo penal nem emenda à LOM.", alts: ["Fora do recorte de noções do Fiscal.", "Certo.", "Fora do recorte.", "Emenda à LOM é Art. 69, não procedimento do ato."] },
  { id: "q117", disc: "Específicas", topic: "CF 5º", sub: "Habeas corpus", level: "fácil", edital: ["esp-cf-5"], art: "CF Art. 5º, LXVIII", origin: "autoral", stem: "O habeas corpus, no Art. 5º da CF, destina-se a:", choices: ["Conhecer dados pessoais em registro público.", "Fazer cessar violência ou coação à liberdade de locomoção, por ilegalidade ou abuso de poder.", "Anular lei em tese no STF.", "Substituir o concurso público."], answer: 1, why: "Questão autoral. CF Art. 5º, LXVIII: HC protege locomoção. Dados = habeas data (LXXII). ADI não é remédio do particular neste enunciado. Concurso é Art. 37, II.", alts: ["Isso é habeas data.", "Certo.", "ADI é controle concentrado.", "Fora do Art. 5º, LXVIII."] },
  { id: "q118", disc: "Específicas", topic: "Fiscalização contábil", sub: "Controle externo municipal", level: "difícil", edital: ["esp-cf-leg"], art: "CF Arts. 31 e 70–71 (noções)", origin: "autoral", stem: "No recorte de noções do Anexo II, a fiscalização do Município, quanto ao controle externo, dá-se:", choices: ["Exclusivamente pelo Prefeito, sem a Câmara.", "Pela Câmara Municipal, com o auxílio do Tribunal de Contas competente, em paralelo ao modelo federal (Congresso + TCU).", "Somente pelo STF, em toda conta de almoxarifado.", "Pelo particular fiscalizado, com poder de polícia sobre a Câmara."], answer: 1, why: "Questão autoral. CF Art. 31: controle externo da Câmara com auxílio do tribunal de contas. Arts. 70–71 descrevem o paralelo federal. Não aprofunde LRF/Lei 4.320 (programa de outro cargo).", alts: ["O Executivo é fiscalizado.", "Certo, em noções.", "STF não é o órgão de contas municipal.", "Inverte fiscalizado e fiscalizador."] },
  { id: "q119", disc: "Português", topic: "Variações linguísticas", sub: "Registro formal", level: "média", edital: ["pt-var"], art: "Anexo II · variações linguísticas", origin: "autoral", stem: "Em um ofício da Prefeitura, o registro esperado pela norma culta da prova é, em regra, o:", choices: ["Informal de conversa entre amigos, com gírias da região.", "Formal, adequado à situação de comunicação oficial, sem negar que existam outras variedades da língua.", "Exclusivamente oral, sem pontuação.", "Qualquer grafia, porque variação autoriza ignorar o Acordo Ortográfico."], answer: 1, why: "Questão autoral. A prova cobra adequação ao registro formal. Variação existe (regional, social, situacional), mas o ofício pede norma culta. O Acordo continua valendo.", alts: ["Inadequado ao gênero ofício.", "Certo.", "Ofício é escrito.", "Variação não anula o Acordo na prova."] },
  { id: "q120", disc: "Específicas", topic: "Informática", sub: "Chrome", level: "fácil", edital: ["esp-info-so"], art: "Anexo II · Google Chrome", origin: "autoral", stem: "No Google Chrome, a navegação privada (anônima) serve, em noções, para:", choices: ["Apagar o Windows do disco.", "Não registrar, naquele perfil, o histórico local da sessão, sem garantir anonimato absoluto na rede.", "Formatar a RAM de forma permanente.", "Substituir o backup."], answer: 1, why: "Questão autoral. Modo anônimo: não guarda histórico local da sessão. Não formata SO nem RAM e não substitui backup. Não afirma anonimato total na internet.", alts: ["Não desinstala o SO.", "Certo.", "RAM não se formata assim.", "Backup é cópia de segurança."] }
];
MORE_BANK6.forEach((q) => BANK.push(q));

function regradeStoredAnswers() {
  const ans = loadAnswers();
  let changed = false;
  Object.keys(ans).forEach((id) => {
    const rec = ans[id];
    const q = BANK.find((x) => x.id === id);
    if (!q || !rec || typeof rec.choice !== "number") return;
    const ok = rec.choice === q.answer;
    if (rec.ok !== ok) {
      rec.ok = ok;
      rec.regradedAt = Date.now();
      changed = true;
    }
  });
  if (changed) saveAnswers(ans);
  if (typeof loadCaderno !== "function") return;
  const cad = loadCaderno();
  const next = cad.map((item) => {
    const q = BANK.find((x) => x.id === item.id);
    if (!q) return item;
    if (item.answer === q.answer) return item;
    return Object.assign({}, item, { answer: q.answer });
  }).filter((item) => {
    const q = BANK.find((x) => x.id === item.id);
    if (!q || typeof item.choice !== "number") return true;
    return item.choice !== q.answer;
  });
  if (next.length !== cad.length || next.some((item, i) => item !== cad[i])) saveCaderno(next);
}

try { renderQuestoes(); } catch (_) {}
try { renderEdital(); } catch (_) {}

const simKey = "tango-fiscal-simulados";
function loadSims() {
  try { return JSON.parse(lsGet(simKey) || "[]"); } catch { return []; }
}
function saveSims(arr) { lsSet(simKey, JSON.stringify(arr)); }

function byDisc(disc) { return BANK.filter((q) => q.disc === disc); }

function splitSims() {
  const pt = byDisc("Português");
  const leg = byDisc("Legislação");
  const esp = byDisc("Específicas");
  const a = pt.slice(0, 10).concat(leg.slice(0, 10), esp.slice(0, 10));
  const b = pt.slice(10, 20).concat(leg.slice(10, 20), esp.slice(10, 20));
  return { a, b };
}
const _sims = splitSims();
const SIM_A = _sims.a;
const SIM_B = _sims.b;

let simState = null;
let simTimer = null;

function weightOf(disc) {
  return disc === "Específicas" ? 4 : 2;
}

function renderSimHome() {
  const home = document.getElementById("sim-home");
  const run = document.getElementById("sim-run");
  if (!home || !run) return;
  run.hidden = true;
  home.hidden = false;
  const hist = loadSims();
  function statusOf(n) {
    if (simState && simState.n === n) return "em andamento";
    const done = hist.filter((h) => h.n === n);
    if (done.length) return "concluído · último " + done[0].score + "/80";
    return "não iniciado";
  }
  home.innerHTML = `
    <div class="sim-grid">
      <article class="card sim-card">
        <p class="phase">Simulado A</p>
        <h3>30 questões · 3 horas</h3>
        <p>10 Português (peso 2) · 10 Legislação (peso 2) · 10 Específicas (peso 4)</p>
        <p class="tree-meta">${statusOf(1)} · máx. 80 pontos · mínimo 40</p>
        <button type="button" class="btn primary" data-sim="1">Iniciar simulado</button>
      </article>
      <article class="card sim-card">
        <p class="phase">Simulado B</p>
        <h3>30 questões · 3 horas</h3>
        <p>10 Português (peso 2) · 10 Legislação (peso 2) · 10 Específicas (peso 4)</p>
        <p class="tree-meta">${statusOf(2)} · máx. 80 pontos · mínimo 40</p>
        <button type="button" class="btn primary" data-sim="2">Iniciar simulado</button>
      </article>
    </div>
    <details class="adv-filters">
      <summary>Como funciona a prova</summary>
      <p>30 questões · 10 PT (peso 2) · 10 Legislação (peso 2) · 10 Específicas (peso 4) · 80 pontos · mínimo 40. Cronômetro de 3 horas. Questões de treino, não oficiais. Desempate do edital: preferência legal (≥60 anos); depois específicas, português, legislação e maior idade.</p>
    </details>
    <article class="card">
      <h3>Histórico</h3>
      ${hist.length ? "<ul>" + hist.map((h) => {
        const custom = !!h.custom;
        const max = custom ? (h.total || h.score) : 80;
        return `<li>${h.when} · ${custom ? h.n : "Simulado " + h.n} · ${h.score}/${max}${custom ? " (treino direcionado)" : (h.score >= 40 ? " (atingiu o mínimo)" : " (abaixo do mínimo)")} · PT ${h.pt} · Leg ${h.leg} · Esp ${h.esp}</li>`;
      }).join("") + "</ul>" : "<p>Nenhum simulado concluído ainda.</p>"}
      ${hist.length >= 2 ? `<p>Último: ${hist[0].score}/80. Anterior: ${hist[1].score}/80. Diferença: ${hist[0].score - hist[1].score} ponto(s). Após ≥60 anos, o 1º critério por nota é específicas: ${hist[0].esp} vs ${hist[1].esp}.</p>` : ""}
    </article>
  `;
  home.querySelectorAll("button[data-sim]").forEach((btn) => {
    btn.addEventListener("click", () => startSim(Number(btn.dataset.sim)));
  });
  const customBox = document.createElement("article");
  customBox.className = "card";
  customBox.innerHTML = `
    <h3>Treino direcionado (não é a prova)</h3>
    <p>Não reproduz 10/10/10. Use para reforço. Gabarito só ao encerrar.</p>
    <div class="filters" id="sim-custom">
      <button type="button" class="chip" data-sc="Português">Só Português</button>
      <button type="button" class="chip" data-sc="Legislação">Só Legislação</button>
      <button type="button" class="chip" data-sc="Específicas">Só Específicas</button>
      <button type="button" class="chip" data-sc="wrong">Erradas</button>
      <button type="button" class="chip" data-sc="open">Não respondidas</button>
      <button type="button" class="chip" data-sc="weak">Menor aproveitamento</button>
      <button type="button" class="chip" data-sc="mix">Misto intercalado</button>
    </div>
    <label class="search-field" style="margin-top:10px">Assunto <select id="sim-topic"><option value="">Todos</option>${Array.from(new Set(BANK.map((q) => q.topic))).sort().map((t) => `<option value="${t}">${t}</option>`).join("")}</select></label>
    <div class="q-nav"><button type="button" class="btn" id="sim-topic-go">Iniciar por assunto</button></div>
  `;
  home.appendChild(customBox);
  customBox.querySelectorAll("[data-sc]").forEach((b) => b.addEventListener("click", () => startCustomSim(b.dataset.sc)));
  const topicGo = document.getElementById("sim-topic-go");
  if (topicGo) topicGo.addEventListener("click", () => {
    const sel = document.getElementById("sim-topic");
    if (sel && sel.value) startCustomSim("topic:" + sel.value);
  });
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function startCustomSim(kind) {
  const ans = loadAnswers();
  let pool = BANK.slice();
  let title = "Treino direcionado";
  if (kind === "Português" || kind === "Legislação" || kind === "Específicas") {
    pool = pool.filter((q) => q.disc === kind);
    title = "Treino · " + kind;
  } else if (kind === "wrong") {
    pool = pool.filter((q) => ans[q.id] && ans[q.id].ok === false);
    title = "Treino · questões erradas";
  } else if (kind === "open") {
    pool = pool.filter((q) => !ans[q.id]);
    title = "Treino · não respondidas";
  } else if (kind === "weak") {
    const weak = topicStats(2)[0];
    pool = weak ? pool.filter((q) => q.topic === weak.topic) : [];
    title = "Treino · menor aproveitamento" + (weak ? " · " + weak.topic : "");
  } else if (kind === "mix") {
    const buckets = ["Português", "Legislação", "Específicas"].map((d) => shuffle(pool.filter((q) => q.disc === d)));
    const mixed = [];
    const max = Math.max(buckets[0].length, buckets[1].length, buckets[2].length);
    for (let i = 0; i < max; i++) buckets.forEach((b) => { if (b[i]) mixed.push(b[i]); });
    pool = mixed;
    title = "Treino misto intercalado";
  } else if (String(kind).indexOf("topic:") === 0) {
    const t = String(kind).slice(6);
    pool = pool.filter((q) => q.topic === t);
    title = "Treino · " + t;
  }
  pool = kind === "mix" ? pool.slice(0, 15) : shuffle(pool).slice(0, 15);
  if (!pool.length) {
    const home = document.getElementById("sim-home");
    if (home) home.insertAdjacentHTML("afterbegin", `<article class="card warn"><h3>Sem questões neste recorte</h3><p>Troque o filtro do treino direcionado.</p></article>`);
    return;
  }
  simState = { n: title, paper: pool, i: 0, choices: Array(pool.length).fill(null), start: Date.now(), left: Math.max(20 * 60, pool.length * 90), custom: true };
  document.getElementById("sim-home").hidden = true;
  document.getElementById("sim-run").hidden = false;
  if (simTimer) clearInterval(simTimer);
  simTimer = setInterval(() => {
    if (!simState) return;
    simState.left -= 1;
    if (simState.left <= 0) finishSim(true);
    else {
      const t = document.getElementById("sim-timer");
      if (t) t.textContent = formatTime(simState.left);
    }
  }, 1000);
  renderSimRun();
}

function startSim(n) {
  const paper = n === 1 ? SIM_A : SIM_B;
  if (paper.length !== 30) {
    const home = document.getElementById("sim-home");
    if (home) home.insertAdjacentHTML("afterbegin", `<article class="card warn"><h3>Simulado incompleto</h3><p>Há ${paper.length} questões montadas, não 30. Banco PT ${byDisc("Português").length}, Leg ${byDisc("Legislação").length}, Esp ${byDisc("Específicas").length}.</p></article>`);
    return;
  }
  if (window.TFPlatform) window.TFPlatform.tfSetOrigin("simulado");
  simState = { n, paper, i: 0, choices: Array(paper.length).fill(null), start: Date.now(), left: 3 * 60 * 60 };
  document.getElementById("sim-home").hidden = true;
  document.getElementById("sim-run").hidden = false;
  if (simTimer) clearInterval(simTimer);
  simTimer = setInterval(() => {
    if (!simState) return;
    simState.left -= 1;
    if (simState.left <= 0) finishSim(true);
    else {
      const t = document.getElementById("sim-timer");
      if (t) t.textContent = formatTime(simState.left);
    }
  }, 1000);
  renderSimRun();
}

function formatTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

function renderSimRun() {
  const run = document.getElementById("sim-run");
  if (!run || !simState) return;
  const q = simState.paper[simState.i];
  const ch = simState.choices[simState.i];
  const total = simState.paper.length;
  const custom = !!simState.custom;
  run.innerHTML = `
    <div class="sim-head">
      <div><p class="phase">${custom ? simState.n : "Simulado " + simState.n} · treino${custom ? " direcionado" : ""}</p><p>${q.disc} · peso ${weightOf(q.disc)}${custom ? " · não é a prova oficial" : ""}</p></div>
      <div class="timer" id="sim-timer">${formatTime(simState.left)}</div>
    </div>
    <div class="q-grid">
      ${simState.paper.map((_, i) => `<button class="${i === simState.i ? "on" : ""} ${simState.choices[i] != null ? "marked" : ""}" data-jump="${i}">${i + 1}</button>`).join("")}
    </div>
    <article class="q-card">
      <p class="tag">${q.topic} · ${q.art}</p>
      <h3>${simState.i + 1}/${total}. ${q.stem}</h3>
      ${presentedChoices(q).map((p) => `<button class="q-opt ${ch === p.originalIndex ? "sel" : ""}" data-choice="${p.originalIndex}">${p.letter}) ${p.text}</button>`).join("")}
      <div class="q-nav">
        <button class="btn" id="sim-prev">Anterior</button>
        <button class="btn" id="sim-next">Próxima</button>
        <button class="btn primary" id="sim-end">Entregar</button>
      </div>
    </article>
  `;
  run.querySelectorAll("button[data-jump]").forEach((b) => b.addEventListener("click", () => { simState.i = Number(b.dataset.jump); renderSimRun(); }));
  run.querySelectorAll("button[data-choice]").forEach((b) => b.addEventListener("click", () => { simState.choices[simState.i] = Number(b.dataset.choice); renderSimRun(); }));
  document.getElementById("sim-prev").addEventListener("click", () => { simState.i = (simState.i + total - 1) % total; renderSimRun(); });
  document.getElementById("sim-next").addEventListener("click", () => { simState.i = (simState.i + 1) % total; renderSimRun(); });
  document.getElementById("sim-end").addEventListener("click", () => finishSim(false));
}

function finishSim(auto) {
  if (!simState) return;
  if (simTimer) { clearInterval(simTimer); simTimer = null; }
  const paper = simState.paper;
  const custom = !!simState.custom;
  const blank = paper.filter((_, i) => simState.choices[i] == null).length;
  let pt = 0, leg = 0, esp = 0, ptN = 0, legN = 0, espN = 0, okN = 0;
  const byTopic = {};
  paper.forEach((q, i) => {
    const ok = simState.choices[i] === q.answer;
    const w = custom ? 1 : weightOf(q.disc);
    if (window.TFPlatform && typeof window.TFPlatform.tfRecordAttempt === "function" && simState.choices[i] != null) {
      const presented = presentedChoices(q);
      const pi = presented.findIndex((p) => p.originalIndex === simState.choices[i]);
      window.TFPlatform.tfRecordAttempt(q, pi < 0 ? 0 : pi, "simulado");
    }
    if (!ok) addToCaderno(q, simState.choices[i]);
    if (ok) okN += 1;
    byTopic[q.topic] = byTopic[q.topic] || { n: 0, ok: 0 };
    byTopic[q.topic].n += 1;
    if (ok) byTopic[q.topic].ok += 1;
    if (q.disc === "Português") { if (ok) pt += w; ptN += ok ? 1 : 0; }
    else if (q.disc === "Legislação") { if (ok) leg += w; legN += ok ? 1 : 0; }
    else { if (ok) esp += w; espN += ok ? 1 : 0; }
  });
  const score = pt + leg + esp;
  const maxScore = custom ? paper.length : 80;
  const used = Math.max(0, Math.round((Date.now() - (simState.start || Date.now())) / 1000));
  const rec = {
    n: simState.n,
    when: new Date().toLocaleString("pt-BR"),
    score, pt, leg, esp, ptN, legN, espN,
    auto: !!auto,
    custom,
    total: paper.length,
    okN,
    blank,
    used
  };
  const hist = loadSims();
  hist.unshift(rec);
  saveSims(hist.slice(0, 20));
  const prev = hist[1];
  const topicLines = Object.keys(byTopic).map((k) => {
    const x = byTopic[k];
    return k + ": " + x.ok + "/" + x.n;
  }).slice(0, 8);
  const weakNow = Object.keys(byTopic).map((k) => Object.assign({ k }, byTopic[k])).sort((a, b) => (a.ok / a.n) - (b.ok / b.n))[0];
  const run = document.getElementById("sim-run");
  run.hidden = false;
  document.getElementById("sim-home").hidden = true;
  run.innerHTML = `
    <article class="card ${(!custom && score >= 40) || (custom && okN * 2 >= paper.length) ? "good" : "bad"}">
      <h3>${auto ? "Tempo esgotado. " : ""}Resultado · ${custom ? rec.n : "Simulado " + rec.n}</h3>
      <p><b>${score}/${maxScore}</b>${custom ? " · treino direcionado (sem pesos oficiais)." : " · mínimo oficial 40. Meta 68–72. " + (score >= 40 ? "Acima do corte." : "Abaixo do corte.")}</p>
      <ul>
        <li>Acertos: ${okN}/${paper.length} · em branco: ${blank} · tempo: ${formatTime(used)}</li>
        <li>Português: ${ptN} acerto(s) · ${pt} pts</li>
        <li>Legislação: ${legN} acerto(s) · ${leg} pts</li>
        <li>Específicas: ${espN} acerto(s) · ${esp} pts${custom ? "" : " (1º critério por nota, após preferência ≥60 anos)"}</li>
        ${custom ? "" : "<li class='tree-meta'>Em seguida: Português, Legislação e maior idade. Habilitação = 40 pts, não é nomeação.</li>"}
        ${topicLines.length ? "<li>Por assunto: " + topicLines.join(" · ") + "</li>" : ""}
        ${weakNow ? "<li>Próximo reforço: " + weakNow.k + " (" + weakNow.ok + "/" + weakNow.n + ")</li>" : ""}
        ${prev && !custom && !prev.custom ? "<li>Comparação: último " + rec.score + "/80 vs anterior " + prev.score + "/80.</li>" : ""}
      </ul>
      <button class="btn primary" id="sim-back">Voltar</button>
    </article>
    <details class="adv-filters" open>
      <summary>Questões incorretas e revisão</summary>
      ${paper.filter((q, i) => simState.choices[i] !== q.answer).length ? paper.map((q, i) => {
        const choice = simState.choices[i];
        const ok = choice === q.answer;
        if (ok) return "";
        return `<article class="q-card"><p class="tag">${i + 1} · ${q.disc} · errado</p><h3>${q.stem}</h3><p class="explain">Sua resposta: ${choice == null ? "em branco" : "ABCD"[choice]}. Gabarito: ${"ABCD"[q.answer]}. ${q.why}</p></article>`;
      }).join("") : "<p>Nenhuma incorreta neste simulado.</p>"}
    </details>
  `;
  document.getElementById("sim-back").addEventListener("click", () => { simState = null; renderSimHome(); });
  try { renderCaderno(); } catch (_) {}
  try { renderToday(); } catch (_) {}
}

try { renderSimHome(); } catch (_) {}

const cadKey = "tango-fiscal-caderno";
function loadCaderno() {
  try { return JSON.parse(lsGet(cadKey) || "[]"); } catch { return []; }
}
function saveCaderno(arr) { lsSet(cadKey, JSON.stringify(arr)); }
try { regradeStoredAnswers(); } catch (_) {}
try { renderQuestoes(); } catch (_) {}

function addDays(ts, n) {
  const d = new Date(ts);
  d.setDate(d.getDate() + n);
  return d.getTime();
}

function addToCaderno(q, choice) {
  if (!q || !q.id) return;
  const list = loadCaderno();
  const now = Date.now();
  const rec = typeof loadAnswers === "function" ? loadAnswers()[q.id] : null;
  const chosen = typeof choice === "number" ? choice : (rec && typeof rec.choice === "number" ? rec.choice : null);
  const found = list.find((c) => c.id === q.id);
  if (found) {
    found.misses = (found.misses || 1) + 1;
    found.last = now;
    found.due = addDays(now, 1);
    found.step = 0;
    if (chosen != null) found.choice = chosen;
    found.answer = q.answer;
  } else {
    list.unshift({
      id: q.id,
      disc: q.disc,
      topic: q.topic,
      art: q.art,
      stem: q.stem,
      why: q.why,
      misses: 1,
      last: now,
      due: addDays(now, 1),
      step: 0,
      choice: chosen,
      answer: q.answer
    });
  }
  saveCaderno(list);
}

function stepLabel(step) {
  return ["D+1", "D+3", "D+7"][step] || "D+7";
}

let cadFilter = "all";

function renderCaderno() {
  const box = document.getElementById("caderno-box");
  if (!box) return;
  if (typeof uiDesempenho !== "undefined" && uiDesempenho === "revisoes" && cadFilter === "all") cadFilter = "due";
  const all = loadCaderno();
  const now = Date.now();
  const due = all.filter((c) => c.due <= now);
  const list = all.filter((c) => {
    if (cadFilter === "due") return c.due <= now;
    if (cadFilter === "d1") return (c.step || 0) === 0;
    if (cadFilter === "d3") return c.step === 1;
    if (cadFilter === "d7") return c.step === 2;
    return true;
  });
  const repeats = all.filter((c) => (c.misses || 1) > 1);
  const topicHits = {};
  all.forEach((c) => { topicHits[c.topic] = (topicHits[c.topic] || 0) + (c.misses || 1); });
  const hotTopics = Object.keys(topicHits).sort((a, b) => topicHits[b] - topicHits[a]).slice(0, 5);
  if (!all.length) {
    box.innerHTML = `<article class="card"><h3>Nenhum erro registrado</h3><p>Ainda não há fichas. Erre uma questão no banco ou no simulado e ela entra aqui no mesmo dia, com D+1, D+3 e D+7.</p><div class="q-nav"><button type="button" class="btn primary" id="cad-go-q">Começar a resolver questões</button></div></article>`;
    const go = document.getElementById("cad-go-q");
    if (go) go.addEventListener("click", () => goPanel("questoes"));
    return;
  }
  box.innerHTML = `
    <div class="filters" id="cad-filters">
      <button type="button" class="chip ${cadFilter === "all" ? "active" : ""}" data-cf="all">Todas</button>
      <button type="button" class="chip ${cadFilter === "due" ? "active" : ""}" data-cf="due">Revisar agora (${due.length})</button>
      <button type="button" class="chip ${cadFilter === "d1" ? "active" : ""}" data-cf="d1">D+1</button>
      <button type="button" class="chip ${cadFilter === "d3" ? "active" : ""}" data-cf="d3">D+3</button>
      <button type="button" class="chip ${cadFilter === "d7" ? "active" : ""}" data-cf="d7">D+7</button>
    </div>
    <div class="dash q-dash">
      <div class="stat"><b>${due.length}</b><span>revisar hoje</span></div>
      <div class="stat"><b>${all.filter((c) => (c.step || 0) === 0).length}</b><span>D+1</span></div>
      <div class="stat"><b>${all.filter((c) => c.step === 1).length}</b><span>D+3</span></div>
      <div class="stat"><b>${all.filter((c) => c.step === 2).length}</b><span>D+7</span></div>
    </div>
    <article class="card">
      <h3>${all.length} fichas · ${due.length} para revisar agora · ${list.length} neste filtro</h3>
      <p>Errar de novo volta para D+1. Acertar avança D+1 → D+3 → D+7. Depois some da fila ativa. Resolver de novo abre a questão original sem apagar esta ficha.</p>
      ${repeats.length ? `<p><b>Reincidentes:</b> ${repeats.length} questão(ões) errada(s) mais de uma vez.</p>` : ""}
      ${hotTopics.length ? `<p><b>Assuntos com reincidência:</b> ${hotTopics.map((t) => t + " (" + topicHits[t] + ")").join(", ")}.</p>` : ""}
    </article>
    ${list.length ? list.map((c) => {
      const late = c.due <= now;
      const dueDate = new Date(c.due).toLocaleDateString("pt-BR");
      const extra = (c.misses || 1) > 1 ? " repeat" : "";
      return `<article class="q-card${late ? " due-now" : ""}${extra}">
        <p class="tag">${c.disc} · ${c.topic} · ${stepLabel(c.step)} · ${c.misses} erro${c.misses > 1 ? "s" : ""} ${late ? "· revisar hoje" : "· " + dueDate}${(c.misses || 1) > 1 ? " · reincidência" : ""}</p>
        <h3>${c.stem}</h3>
        <p class="explain"><b>${c.art}.</b> ${c.why}</p>
        <div class="q-nav">
           <button class="btn primary" data-ok="${c.id}">Acertei na revisão</button>
          <button class="btn" data-bad="${c.id}">Errei de novo</button>
          <button class="btn" data-retry="${c.id}">Resolver de novo</button>
        </div>
      </article>`;
    }).join("") : `<article class="card"><h3>Nenhuma ficha neste filtro</h3><p>Troque D+1, D+3, D+7 ou Revisar agora.</p></article>`}
  `;
  box.querySelectorAll("button[data-cf]").forEach((btn) => {
    btn.addEventListener("click", () => { cadFilter = btn.dataset.cf; renderCaderno(); });
  });
  box.querySelectorAll("button[data-ok]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const arr = loadCaderno();
      const item = arr.find((c) => c.id === btn.dataset.ok);
      if (!item) return;
      item.step = (item.step || 0) + 1;
      item.last = Date.now();
      if (item.step >= 3) {
        saveCaderno(arr.filter((c) => c.id !== item.id));
      } else {
        const gap = item.step === 1 ? 3 : 7;
        item.due = addDays(item.last, gap);
        saveCaderno(arr);
      }
      renderCaderno();
    });
  });
  box.querySelectorAll("button[data-bad]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const arr = loadCaderno();
      const item = arr.find((c) => c.id === btn.dataset.bad);
      if (!item) return;
      item.misses = (item.misses || 1) + 1;
      item.step = 0;
      item.last = Date.now();
      item.due = addDays(item.last, 1);
      saveCaderno(arr);
      renderCaderno();
    });
  });
  box.querySelectorAll("button[data-retry]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const qid = btn.dataset.retry;
      const ans = loadAnswers();
      if (ans[qid]) {
        delete ans[qid];
        saveAnswers(ans);
      }
      const q = BANK.find((x) => x.id === qid);
      qFilter = q ? q.disc : "all";
      const list = bankList();
      qIndex = Math.max(0, list.findIndex((x) => x.id === qid));
      goPanel("questoes");
    });
  });
}

try { renderCaderno(); } catch (_) {}
try { renderToday(); } catch (_) {}

const cardsKey = "tango-fiscal-cards";
function loadCards() {
  try { return JSON.parse(lsGet(cardsKey) || "{}"); } catch { return {}; }
}
function saveCards(map) { lsSet(cardsKey, JSON.stringify(map)); }

const CARDS = [
  { id: "c01", disc: "Legislação", front: "Prazo de posse na Lei 946 (Art. 35)?", back: "30 dias da publicação da nomeação, prorrogável por igual período. Sem posse: nomeação sem efeito (Art. 35, §4º)." },
  { id: "c02", disc: "Legislação", front: "Prazo de exercício na Lei 946 (Art. 36)?", back: "15 dias da posse, prorrogável por igual período. Sem exercício: exoneração de ofício (Art. 50, II)." },
  { id: "c03", disc: "Legislação", front: "Validade do concurso na Lei 946 (Art. 14)?", back: "Até 2 anos da homologação, prorrogável uma vez por igual período." },
  { id: "c04", disc: "Legislação", front: "7 formas de provimento (Art. 20)?", back: "Nomeação, recondução, reintegração, reversão, aproveitamento, promoção e readaptação. Exoneração NÃO é provimento." },
  { id: "c05", disc: "Legislação", front: "Vacância (Art. 49) — hipóteses?", back: "Exoneração, demissão, readaptação, aposentadoria, falecimento e posse em cargo inacumulável." },
  { id: "c06", disc: "Legislação", front: "Estágio probatório (Art. 39)?", back: "3 anos a contar do exercício. Insuficiência: exoneração (Art. 45), não demissão." },
  { id: "c07", disc: "Legislação", front: "Sindicância × PAD — prazos?", back: "Sindicância 30+30 (Art. 231). PAD 60+60, comissão de 3 efetivos (Arts. 239 e 242)." },
  { id: "c08", disc: "Legislação", front: "Abandono × inassiduidade (Art. 232)?", back: "Abandono: ausência intencional >30 dias consecutivos. Inassiduidade: 60 dias interpolados em 12 meses." },
  { id: "c09", disc: "Legislação", front: "Prescrição da ação disciplinar (Art. 271)?", back: "5 anos (demissão/cassação/destituição), 2 anos (suspensão), 180 dias (advertência)." },
  { id: "c10", disc: "Legislação", front: "Casamento / falecimento — Art. 176?", back: "8 dias cada, comprovação em até 48 horas da ocorrência." },
  { id: "c11", disc: "Legislação", front: "Recurso administrativo (Art. 198)?", back: "15 dias da ciência. Se provido, efeitos retroagem." },
  { id: "c12", disc: "Legislação", front: "LOM Art. 20, I e II?", back: "I: legislar sobre interesse local. II: suplementar legislação federal e estadual, no que couber." },
  { id: "c13", disc: "Legislação", front: "Emenda à LOM (Art. 69)?", back: "Proposta de 2/3 dos vereadores, do Prefeito ou popular (5%). Dois turnos, 10 dias de interstício, 2/3 em cada turno." },
  { id: "c14", disc: "Específicas", front: "LIMPE (CF Art. 37, caput)?", back: "Legalidade, impessoalidade, moralidade, publicidade e eficiência." },
  { id: "c15", disc: "Específicas", front: "Elementos × atributos do ato?", back: "Elementos: COFIFOMO (competência, finalidade, forma, motivo, objeto). Atributos: presunção de legitimidade, imperatividade, autoexecutoriedade, tipicidade." },
  { id: "c16", disc: "Específicas", front: "Anulação × revogação?", back: "Anulação: ilegalidade, ex tunc. Revogação: conveniência, ex nunc; só a Administração revoga." },
  { id: "c17", disc: "Específicas", front: "Simples × complexo × composto?", back: "Simples: um órgão. Complexo: vontades de órgãos diversos num só ato. Composto: principal + acessório." },
  { id: "c18", disc: "Específicas", front: "Vinculado × discricionário?", back: "Vinculado: a lei não deixa escolha. Discricionário: mérito (conveniência/oportunidade) nos limites da lei." },
  { id: "c19", disc: "Específicas", front: "Bens públicos pela destinação?", back: "Uso comum (rua, praça), uso especial (repartição) e dominicais (patrimônio disponível)." },
  { id: "c20", disc: "Específicas", front: "Improbidade após Lei 14.230/2021?", back: "Exige dolo. Culpa isolada não basta." },
  { id: "c21", disc: "Específicas", front: "Phishing × ransomware × backup?", back: "Phishing: engenharia social. Ransomware: criptografa e pede resgate. Backup: cópia de segurança." },
  { id: "c22", disc: "Específicas", front: "RAM × HD/SSD?", back: "RAM: volátil, trabalho rápido. HD/SSD: armazenamento permanente." },
  { id: "c23", disc: "Específicas", front: "HC × habeas data × MS?", back: "HC: locomoção (LXVIII). Habeas data: dados em registro público (LXXII). MS: direito líquido e certo residual (LXIX)." },
  { id: "c24", disc: "Português", front: "Crase: quando NÃO usar?", back: "A pé (masculino). À ela (pronome). Sentido aproximado 'a uma hora'." },
  { id: "c25", disc: "Português", front: "Haver (=existir) e fazer (tempo)?", back: "Impessoais: havia irregularidades; faz dois anos. Não 'haviam' nem 'fazem' nesses sentidos." }
];

let cardFilter = "all";
let cardI = 0;
let cardShow = false;

function renderFlashcards() {
  const box = document.getElementById("cards-box");
  if (!box) return;
  const map = loadCards();
  const now = Date.now();
  let list = CARDS.filter((c) => cardFilter === "all" || c.disc === cardFilter);
  const due = list.filter((c) => !map[c.id] || (map[c.id].due || 0) <= now);
  if (!list.length) {
    box.innerHTML = `<article class="card"><h3>Nenhum cartão neste filtro</h3></article>`;
    return;
  }
  if (cardI >= list.length) cardI = 0;
  const c = list[cardI];
  const rec = map[c.id];
  const isDue = !rec || (rec.due || 0) <= now;
  box.innerHTML = `
    <div class="dash dash-3">
      <div class="stat"><b>${CARDS.length}</b><span>cartões objetivos</span></div>
      <div class="stat"><b>${due.length}</b><span>para revisar agora neste filtro</span></div>
      <div class="stat"><b>${Object.keys(map).length}</b><span>já praticados</span></div>
    </div>
    <div class="filters">
      <button type="button" class="chip ${cardFilter === "all" ? "active" : ""}" data-cf2="all">Todos</button>
      <button type="button" class="chip ${cardFilter === "Legislação" ? "active" : ""}" data-cf2="Legislação">Legislação</button>
      <button type="button" class="chip ${cardFilter === "Específicas" ? "active" : ""}" data-cf2="Específicas">Específicas</button>
      <button type="button" class="chip ${cardFilter === "Português" ? "active" : ""}" data-cf2="Português">Português</button>
    </div>
    <article class="q-card card-face">
      <p class="tag">${c.disc} · ${cardI + 1}/${list.length}${isDue ? " · revisar" : ""}</p>
      <h3>${c.front}</h3>
      ${cardShow ? `<p class="explain"><b>Resposta.</b> ${c.back}</p>` : `<p class="tree-meta">Tente lembrar antes de revelar. Recuperação ativa.</p>`}
      <div class="q-nav">
        ${cardShow ? "" : `<button type="button" class="btn primary" id="card-show">Revelar</button>`}
        ${cardShow ? `<button type="button" class="btn primary" id="card-ok">Lembrei</button><button type="button" class="btn" id="card-bad">Não lembrei</button>` : ""}
        <button type="button" class="btn" id="card-prev">Anterior</button>
        <button type="button" class="btn" id="card-next">Próximo</button>
      </div>
    </article>
  `;
  box.querySelectorAll("[data-cf2]").forEach((b) => b.addEventListener("click", () => { cardFilter = b.dataset.cf2; cardI = 0; cardShow = false; renderFlashcards(); }));
  const sh = document.getElementById("card-show");
  if (sh) sh.addEventListener("click", () => { cardShow = true; renderFlashcards(); });
  const ok = document.getElementById("card-ok");
  if (ok) ok.addEventListener("click", () => {
    const m = loadCards();
    const cur = m[c.id] || { step: 0 };
    cur.step = Math.min((cur.step || 0) + 1, 3);
    cur.last = Date.now();
    const gap = cur.step === 1 ? 1 : cur.step === 2 ? 3 : 7;
    cur.due = addDays(cur.last, gap);
    m[c.id] = cur;
    saveCards(m);
    cardShow = false;
    cardI = (cardI + 1) % list.length;
    renderFlashcards();
  });
  const bad = document.getElementById("card-bad");
  if (bad) bad.addEventListener("click", () => {
    const m = loadCards();
    m[c.id] = { step: 0, last: Date.now(), due: addDays(Date.now(), 1) };
    saveCards(m);
    cardShow = false;
    cardI = (cardI + 1) % list.length;
    renderFlashcards();
  });
  const prev = document.getElementById("card-prev");
  if (prev) prev.addEventListener("click", () => { cardI = (cardI + list.length - 1) % list.length; cardShow = false; renderFlashcards(); });
  const nxt = document.getElementById("card-next");
  if (nxt) nxt.addEventListener("click", () => { cardI = (cardI + 1) % list.length; cardShow = false; renderFlashcards(); });
}
try { renderFlashcards(); } catch (_) {}

function collectBackup() {
  const blocks = {};
  DAYS.forEach((d) => {
    d.blocks.forEach((_, i) => {
      const k = "b-" + d.id + "-" + i;
      const v = lsGet(k);
      if (v != null) blocks[k] = v;
    });
  });
  const extra = {};
  ["tango-fiscal-attempts", "tango-fiscal-shuffle", "tango-fiscal-qstate", "tango-fiscal-goals"].forEach((k) => {
    extra[k] = lsGet(k);
  });
  return {
    v: 1,
    when: new Date().toISOString(),
    done: loadDone(),
    blocks,
    edital: loadEdital(),
    answers: loadAnswers(),
    sims: loadSims(),
    caderno: loadCaderno(),
    review: loadReview(),
    theme: currentTheme(),
    cards: typeof loadCards === "function" ? loadCards() : {},
    qfilters: lsGet(qFilterSaveKey) || null,
    attempts: extra["tango-fiscal-attempts"],
    shuffle: extra["tango-fiscal-shuffle"],
    qstate: extra["tango-fiscal-qstate"],
    goals: extra["tango-fiscal-goals"]
  };
}

function applyBackup(data) {
  if (!data || typeof data !== "object") throw new Error("arquivo inválido");
  if (data.v != null && data.v !== 1) throw new Error("versão de backup desconhecida");
  if (data.done != null && (typeof data.done !== "object" || Array.isArray(data.done))) throw new Error("campo done inválido");
  if (data.edital != null && (typeof data.edital !== "object" || Array.isArray(data.edital))) throw new Error("campo edital inválido");
  if (data.answers != null && (typeof data.answers !== "object" || Array.isArray(data.answers))) throw new Error("campo answers inválido");
  if (data.sims != null && !Array.isArray(data.sims)) throw new Error("campo sims inválido");
  if (data.caderno != null && !Array.isArray(data.caderno)) throw new Error("campo caderno inválido");
  if (data.blocks != null && (typeof data.blocks !== "object" || Array.isArray(data.blocks))) throw new Error("campo blocks inválido");
  if (data.review != null && (typeof data.review !== "object" || Array.isArray(data.review))) throw new Error("campo review inválido");
  if (data.cards != null && (typeof data.cards !== "object" || Array.isArray(data.cards))) throw new Error("campo cards inválido");
  if (data.done) saveDone(data.done);
  if (data.edital) saveEdital(data.edital);
  if (data.answers) saveAnswers(data.answers);
  if (data.sims) saveSims(data.sims);
  if (data.caderno) saveCaderno(data.caderno);
  if (data.review) saveReview(data.review);
  if (data.cards && typeof saveCards === "function") saveCards(data.cards);
  if (data.qfilters && typeof data.qfilters === "string") lsSet(qFilterSaveKey, data.qfilters);
  if (data.attempts) lsSet("tango-fiscal-attempts", typeof data.attempts === "string" ? data.attempts : JSON.stringify(data.attempts));
  if (data.shuffle) lsSet("tango-fiscal-shuffle", typeof data.shuffle === "string" ? data.shuffle : JSON.stringify(data.shuffle));
  if (data.qstate) lsSet("tango-fiscal-qstate", typeof data.qstate === "string" ? data.qstate : JSON.stringify(data.qstate));
  if (data.goals) lsSet("tango-fiscal-goals", typeof data.goals === "string" ? data.goals : JSON.stringify(data.goals));
  if (data.theme === "dark" || data.theme === "light") applyTheme(data.theme, true);
  try { regradeStoredAnswers(); } catch (_) {}
  if (data.blocks) {
    Object.keys(data.blocks).forEach((k) => {
      if (/^b-2026-11-\d{2}-\d$/.test(k)) lsSet(k, data.blocks[k] === "1" ? "1" : "0");
    });
  }
}

function renderStatsLive() {
  const el = document.getElementById("stats-live");
  if (!el) return;
  const g = answerStats();
  const discs = discStats();
  const weak = topicStats(2);
  const untouched = unansweredTopics();
  const best = discs.slice().sort((a, b) => (b.done ? b.pct : -1) - (a.done ? a.pct : -1))[0];
  const worst = discs.filter((d) => d.done >= 2).sort((a, b) => a.pct - b.pct)[0];
  const revN = Object.keys(loadReview()).length;
  const cad = typeof loadCaderno === "function" ? loadCaderno() : [];
  const due = cad.filter((c) => c.due <= Date.now()).length;
  let rec = "Responda ao menos duas questões por disciplina para eu apontar dificuldade recorrente. Percentuais ignoram questões em branco.";
  if (worst && best && worst.disc !== best.disc && worst.done >= 2 && best.done >= 2) {
    rec = "Seu aproveitamento em " + worst.disc + " (" + worst.pct + "%) está abaixo de " + best.disc + " (" + best.pct + "%). ";
    if (weak[0]) rec += "Priorize " + weak[0].topic + " na próxima sessão de recuperação ativa.";
  } else if (weak[0]) {
    rec = "Minha maior dificuldade (mínimo 2 respostas no assunto): " + weak[0].key + " · " + weak[0].pct + "% (" + weak[0].ok + "/" + weak[0].n + "). Revise com questões, não só releitura.";
  }
  el.innerHTML = `
    <article class="card">
      <h3>Desempenho no banco</h3>
      <div class="dash q-dash">
        <div class="stat"><b>${g.done}</b><span>resolvidas no total</span></div>
        <div class="stat"><b>${g.pct}%</b><span>acerto geral (só respondidas)</span></div>
        <div class="stat"><b>${revN}</b><span>marcadas para revisar</span></div>
        <div class="stat"><b>${due}</b><span>caderno para hoje</span></div>
      </div>
      <div class="disc-bars">
        ${discs.map((d) => `<div class="bar-row"><div class="bar-meta"><span>${d.disc}</span><b>${d.done ? d.pct + "%" : "sem amostra"} · ${d.ok}/${d.done || 0}</b></div><div class="bar"><i style="width:${d.done ? d.pct : 0}%"></i></div></div>`).join("")}
      </div>
    </article>
    <article class="card ${weak[0] ? "warn" : "good"}">
      <h3>Minha maior dificuldade</h3>
      <p>${rec}</p>
      ${weak.length ? `<ul>${weak.slice(0, 5).map((t) => `<li>${t.key}: ${t.pct}% (${t.ok}/${t.n})</li>`).join("")}</ul>` : "<p>Ainda não há assunto com pelo menos 2 respostas para ranquear.</p>"}
      ${untouched.length ? `<p class="tree-meta">Assuntos ainda sem prática: ${untouched.map((t) => t.topic).slice(0, 8).join(", ")}${untouched.length > 8 ? "…" : ""}.</p>` : ""}
    </article>
  `;
}
try { renderStatsLive(); } catch (_) {}

const btnExport = document.getElementById("btn-export");
if (btnExport) {
  btnExport.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(collectBackup(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tango-fiscal-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

const btnImport = document.getElementById("btn-import");
if (btnImport) {
  btnImport.addEventListener("change", () => {
    const file = btnImport.files && btnImport.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        applyBackup(JSON.parse(reader.result));
        renderToday();
        renderCal(document.querySelector(".chip.active") ? document.querySelector(".chip.active").dataset.filter : "all");
        renderEdital();
        renderQuestoes();
        try { renderSimHome(); } catch (_) {}
        try { renderCobertura(); } catch (_) {}
        try { renderMateriais(); } catch (_) {}
        try { renderFlashcards(); } catch (_) {}
        renderCaderno();
        try { renderStatsLive(); } catch (_) {}
      } catch (err) {
        const bar = document.querySelector(".backup-bar span");
        if (bar) bar.textContent = "Importação falhou: " + (err && err.message ? err.message : "JSON inválido.");
      }
      btnImport.value = "";
    };
    reader.readAsText(file);
  });
}
