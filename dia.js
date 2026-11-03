const dayCheckKey = "tango-fiscal-daycheck";
const notesKey = "tango-fiscal-notes";
const watchedKey = "tango-fiscal-watched";

function loadDayCheck() {
  try { return JSON.parse(lsGet(dayCheckKey) || "{}"); } catch { return {}; }
}
function saveDayCheck(map) { lsSet(dayCheckKey, JSON.stringify(map)); }
function loadNotes() {
  try { return JSON.parse(lsGet(notesKey) || "{}"); } catch { return {}; }
}
function saveNotes(map) { lsSet(notesKey, JSON.stringify(map)); }
function loadWatched() {
  try { return JSON.parse(lsGet(watchedKey) || "{}"); } catch { return {}; }
}
function saveWatched(map) { lsSet(watchedKey, JSON.stringify(map)); }

const VLIB = {
  interpLarissa: { id: "rAKtdgx70O0", title: "COMO INTERPRETAR TEXTOS EM CONCURSOS (2025)", author: "Professora Larissa Ataíde", channel: "Professora Larissa Ataíde", subject: "Português", cat: "Português", kind: "principal", watch: "Marque compreensão vs. inferência. Não extrapole o texto." },
  interpTossan: { id: "GXyFAA5GZuU", title: "Interpretação de Texto | Português para Concursos | Aula 01", author: "Mario Tossan", channel: "Escola de Concursados do Mario Tossan", subject: "Português", cat: "Português", kind: "principal", watch: "Acompanhe o método de leitura do enunciado até o fim." },
  morfologia: { id: "ltrzPijgKi4", title: "MORFOLOGIA: CLASSES DE PALAVRAS (Para Concurso)", author: "Prof. Álvaro Ferreira", channel: "Prof. Álvaro Ferreira", subject: "Português", cat: "Português", kind: "principal", watch: "Classes que caem: substantivo, adjetivo, conjunção, preposição." },
  figuras: { id: "CbpM0LBACdQ", title: "FIGURAS DE LINGUAGEM MAIS COBRADAS EM CONCURSOS", author: "Professora Larissa Ataíde", channel: "Professora Larissa Ataíde", subject: "Português", cat: "Português", kind: "principal", watch: "Metáfora, metonímia, hipérbole, eufemismo — exemplos de prova." },
  crase: { id: "FM0uZqFVbpw", title: "LÍNGUA PORTUGUESA | AULA 03 | Regência Verbal, Crase e Concordância Verbal", author: "Fé, Foco & Resultado", channel: "Fé, Foco & Resultado", subject: "Português", cat: "Português", kind: "principal", watch: "Anote os 3 erros clássicos: à pé, haver no sentido de existir, visar a." },
  atosFocus: { id: "wIkiGQpAzeI", title: "Direito Administrativo | Atos Administrativos", author: "Focus Concursos", channel: "Focus Concursos", subject: "Admin", cat: "Direito Administrativo", kind: "principal", watch: "Elementos (COFIFOMO) vs. atributos. Anulação × revogação." },
  atributosPureza: { id: "iiFjeUc-Ygg", title: "Atos Administrativos: Atributos", author: "Prof. Diego Pureza", channel: "Prof. Diego Pureza", subject: "Admin", cat: "Direito Administrativo", kind: "principal", watch: "Presunção de legitimidade, imperatividade, autoexecutoriedade, tipicidade." },
  atributosTossan: { id: "U1939ykaugY", title: "Atributos do Ato Administrativo | Direito Administrativo para Concursos | Aula 14", author: "Mario Tossan", channel: "Escola de Concursados do Mario Tossan", subject: "Admin", cat: "Direito Administrativo", kind: "principal", watch: "Ligue cada atributo a um exemplo de Posturas (apreensão, interdição)." },
  limpe: { id: "YDu8Ftky404", title: "Princípios da Administração Pública — LIMPE | Direito Administrativo para Concursos", author: "Mario Tossan", channel: "Escola de Concursados do Mario Tossan", subject: "Admin", cat: "Direito Administrativo", kind: "principal", watch: "LIMPE no caput do Art. 37. Não confunda com princípios implícitos." },
  bens: { id: "maSCAGbHL-U", title: "Direito Administrativo | Você precisa saber: Bens Públicos", author: "Gran Jurídico", channel: "Gran Jurídico", subject: "Admin", cat: "Direito Administrativo", kind: "principal", watch: "Uso comum, especial, dominical + os três 'in'." },
  policia: { id: "u_0dPgvHxR0", title: "Aula do Poder de Polícia (Direito Administrativo) - Parte 1", author: "TecConcursos", channel: "TecConcursos", subject: "Admin", cat: "Direito Administrativo", kind: "complementar", watch: "Poder de polícia ligado a apreensão e interdição. Complementar." },
  cf3741: { id: "brygY-zoFLM", title: "Constituição Federal Descomplicada: Art. 37 a 41 e 205 a 207", author: "SUA PRIMEIRA APROVAÇÃO", channel: "SUA PRIMEIRA APROVAÇÃO", subject: "Constitucional", cat: "Direito Constitucional", kind: "principal", watch: "Arts. 37–41: LIMPE, concurso, acumulação, estabilidade. Ignore 205–207." },
  windowsRomilton: { id: "pFNCvfqimbE", title: "Noções de sistema operacional (ambiente Windows) CEBRASPE 2026", author: "ROMILTON JÚNIOR", channel: "ROMILTON JÚNIOR", subject: "Informática", cat: "Informática", kind: "principal", watch: "Atalhos, área de trabalho, gerenciador de arquivos. Sem Excel avançado." },
  windowsClica: { id: "DX8yEy7nctg", title: "Noções de Informática: Domine o Windows 10 para Concursos", author: "Clica ali!", channel: "Clica ali!", subject: "Informática", cat: "Informática", kind: "principal", watch: "Painel de controle, explorador de arquivos, atalhos de teclado." }
};

function v(key, kind) {
  const x = VLIB[key];
  return Object.assign({}, x, kind ? { kind: kind } : {});
}

const CHECK_ITEMS = [
  { id: "video", label: "Videoaula assistida" },
  { id: "leitura", label: "Leitura realizada" },
  { id: "resumo", label: "Resumo ou anotações" },
  { id: "questoes", label: "Questões concluídas" },
  { id: "correcao", label: "Correção dos erros" },
  { id: "revisao", label: "Revisão do conteúdo" },
  { id: "dia", label: "Dia concluído" }
];

const DAY_PLAN = {
  "2026-11-02": {
    weekday: "Segunda-feira", longDate: "02 de novembro de 2026", discs: "Direito Administrativo, Legislação Municipal, Constitucional e Informática",
    goal: "Fechar o núcleo da prova: atos, prazos da 946 e CF 37–41, sem tentar passar o edital inteiro.",
    objectives: ["Diferenciar elementos e atributos do ato administrativo.", "Ligar autoexecutoriedade a apreensão e interdição.", "Montar a tabela de prazos da Lei 946 (posse, exercício, PAD).", "Reconhecer LIMPE no Art. 37 e o recorte de 37–41."],
    videos: [v("atosFocus"), v("cf3741"), v("policia", "complementar")],
    qNeed: 25, qTopics: ["Atos", "PAD", "CF 37", "Informática"],
    readings: [{ disc: "Admin", text: "Atos: elementos (COFIFOMO) e atributos. Não inventar artigo de lei federal além do Anexo II." }, { disc: "Lei 946", text: "Direitos, vantagens, deveres, proibições, penalidades, sindicância e PAD. Arts. 204–271 conferidos no PDF." }, { disc: "CF", text: "Arts. 5º e 37–41. Sem PPA, TCU ou processo legislativo federal." }]
  },
  "2026-11-03": {
    weekday: "Terça-feira", longDate: "03 de novembro de 2026", discs: "Constitucional (Municípios) e Legislação Municipal",
    goal: "Dominar CF Arts. 18–31 no recorte municipal e recitar 8 prazos da 946.",
    objectives: ["Explicar autonomia municipal e lei orgânica (Art. 29: dois turnos, 2/3, interstício de 10 dias).", "Distinguir competências municipais dos demais entes.", "Recitar posse 30+30, exercício 15+15, estágio 3 anos, recondução 120 dias."],
    videos: [v("cf3741"), v("limpe", "complementar")],
    qNeed: 22, qTopics: ["Municípios", "Posse", "Exercício", "Estágio", "Recondução"],
    readings: [{ disc: "CF", text: "Arts. 18–31, foco 29–31." }, { disc: "Lei 946", text: "Tabela de prazos: Arts. 35, 36, 39, 26 III." }]
  },
  "2026-11-04": {
    weekday: "Quarta-feira", longDate: "04 de novembro de 2026", discs: "Língua Portuguesa e Informática",
    goal: "Treinar interpretação sem extrapolação e segurança da informação (peso 4).",
    objectives: ["Separar compreensão (o que o texto diz) de inferência (o que se conclui sem extrapolar).", "Definir phishing, ransomware e backup.", "Resolver 15 questões de texto e 20 de informática."],
    videos: [v("interpLarissa"), v("windowsRomilton")],
    qNeed: 35, qTopics: ["Interpretação", "Informática", "Crase"],
    readings: [{ disc: "PT", text: "Interpretação: ideia principal, explícito, implícito. Sem achismo." }, { disc: "Informática", text: "Malware, phishing, backup, navegadores. Conceito + atalho, sem Excel avançado." }]
  },
  "2026-11-05": {
    weekday: "Quinta-feira", longDate: "05 de novembro de 2026", discs: "Direito Administrativo e Lei Orgânica",
    goal: "Fechar improbidade (dolo pós-14.230), bens públicos e competências da LOM.",
    objectives: ["Afirmar que improbidade, após a Lei 14.230/2021, exige dolo.", "Classificar bem de uso comum, especial e dominical.", "Ler competências do Município, bens municipais e organização político-administrativa na LOM — sem inventar artigo."],
    videos: [v("bens"), v("limpe")],
    qNeed: 15, qTopics: ["Improbidade", "Bens públicos", "Municípios", "Ética"],
    readings: [{ disc: "Admin", text: "Lei 8.429 com 14.230/21: dolo, atos, penas. Bens públicos: 3 espécies + 3 'in'." }, { disc: "LOM", text: "Competências do Município, bens municipais. Só o que estiver no PDF da LOM; sem número inventado." }]
  },
  "2026-11-06": {
    weekday: "Sexta-feira", longDate: "06 de novembro de 2026", discs: "Constitucional e Língua Portuguesa",
    goal: "Remédios do Art. 5º, LIMPE no Art. 37 e gramática de prova (concordância e pontuação).",
    objectives: ["Distinguir habeas corpus, habeas data e mandado de segurança.", "Recitar LIMPE e o §1º do Art. 37 (vedação à promoção pessoal).", "Acertar concordância de haver/fazer e pontuação de aposto."],
    videos: [v("cf3741"), v("crase")],
    qNeed: 40, qTopics: ["CF 5º", "CF 37", "Concordância", "Pontuação"],
    readings: [{ disc: "CF", text: "Art. 5º (remédios) e Art. 37 (LIMPE, concurso, acumulação)." }, { disc: "PT", text: "Concordância nominal/verbal + pontuação. Sem morfologia profunda nesta noite." }]
  },
  "2026-11-07": {
    weekday: "Sábado", longDate: "07 de novembro de 2026", discs: "Português, Direito Administrativo e Lei 946",
    goal: "Fechar crase/regência/pontuação e treinar atos em volume, com lei seca da 946.",
    objectives: ["Eliminar 'à pé', 'à ela' e crase em 'a pé'.", "Diferenciar ato vinculado e discricionário; anulação (ex tunc) e revogação (ex nunc).", "Grifar capítulos menos lidos da Lei 946."],
    videos: [v("crase"), v("atributosPureza")],
    qNeed: 40, qTopics: ["Crase", "Regência", "Pontuação", "Atos"],
    readings: [{ disc: "PT", text: "Crase, regência e pontuação — os três que mais caem." }, { disc: "Admin", text: "Atos, agentes, poder de polícia, improbidade, bens." }, { disc: "Lei 946", text: "Leitura seca grifada + 15 flashcards de prazos." }]
  },
  "2026-11-08": {
    weekday: "Domingo", longDate: "08 de novembro de 2026", discs: "Constitucional, LOM e simulado 1",
    goal: "Primeiro simulado no formato IBDO (30q, 3h, máx. 80) e correção ficha a ficha.",
    objectives: ["Resolver 30 questões no formato da prova (10+10+10, pesos 2/2/4).", "Corrigir cada erro com tema, motivo e artigo.", "Não misturar legislação de outro município."],
    videos: [v("limpe")],
    qNeed: 30, qTopics: ["CF 1º", "Municípios", "CF 37", "Atos"],
    sim: 1,
    readings: [{ disc: "CF + LOM", text: "30 questões de CF (1º–5º, 29–31, 37–41) e competências/quóruns da LOM." }]
  },
  "2026-11-09": {
    weekday: "Segunda-feira", longDate: "09 de novembro de 2026", discs: "Direito Administrativo e Português",
    goal: "30 questões de atos e 25 de reescrita/pontuação/crase. Conferir homologação após 17h.",
    objectives: ["Classificar ato simples, complexo e composto; geral e individual.", "Acertar reescrita e crase em 25 itens.", "Anotar se a inscrição foi homologada (Anexo III: 09/11)."],
    videos: [v("atributosTossan"), v("crase")],
    qNeed: 55, qTopics: ["Atos", "Crase", "Pontuação"],
    readings: [{ disc: "Admin", text: "Elementos, atributos, classificação, extinção." }, { disc: "PT", text: "Reescrita, pontuação e crase." }]
  },
  "2026-11-10": {
    weekday: "Terça-feira", longDate: "10 de novembro de 2026", discs: "Lei 946 e CF servidores",
    goal: "Cruzar provimento/vacância da 946 com Arts. 37–41. A banca ama a divergência.",
    objectives: ["Listar as 7 formas de provimento (Art. 20) e as hipóteses de vacância (Art. 49).", "Dizer que exoneração não é penalidade (Art. 217).", "Comparar estabilidade CF Art. 41 com Lei 946 Arts. 39/47."],
    videos: [v("cf3741")],
    qNeed: 37, qTopics: ["Provimento", "Vacância", "Nomeação", "Estabilidade", "CF 37"],
    readings: [{ disc: "Lei 946", text: "Provimento, vacância, direitos e vantagens. Arts. 20–32 e 49." }, { disc: "CF", text: "Agentes/servidores nos Arts. 37–41." }]
  },
  "2026-11-11": {
    weekday: "Quarta-feira", longDate: "11 de novembro de 2026", discs: "Direito Administrativo e Informática",
    goal: "Fechar improbidade, princípios, direta/indireta, bens e 25 questões de Windows/Office/hardware.",
    objectives: ["Separar administração direta e indireta (autarquia, fundação, EP, SEM).", "Acertar hardware: scanner = entrada; RAM volátil; HD/SSD permanente.", "Recitar LIMPE sem misturar razoabilidade."],
    videos: [v("bens"), v("windowsClica")],
    qNeed: 50, qTopics: ["Improbidade", "Administração", "Bens públicos", "Informática", "CF 37"],
    readings: [{ disc: "Admin", text: "Improbidade, princípios, direta/indireta, bens." }, { disc: "Informática", text: "Windows, Word, Excel básico, hardware e segurança." }]
  },
  "2026-11-12": {
    weekday: "Quinta-feira", longDate: "12 de novembro de 2026", discs: "Lei Orgânica e Português",
    goal: "LOM (competências, processo legislativo municipal) e 25 questões de orações/concordância.",
    objectives: ["Identificar competências do Município, Prefeito e Câmara no texto da LOM — sem artigo inventado.", "Acertar concordância verbal (haver/fazer/existir) e aposto com duas vírgulas."],
    videos: [v("morfologia"), v("crase")],
    qNeed: 25, qTopics: ["Municípios", "Concordância", "Pontuação", "Sintaxe"],
    readings: [{ disc: "LOM", text: "Competências, processo legislativo municipal, Administração Municipal. Só o PDF." }, { disc: "PT", text: "Orações e concordância." }]
  },
  "2026-11-13": {
    weekday: "Sexta-feira", longDate: "13 de novembro de 2026", discs: "Constitucional, ética e Anexo I",
    goal: "30 questões de CF 1º–5º/37 e marcar o que NÃO é Posturas (Tributos e Meio Ambiente).",
    objectives: ["Recitar fundamentos do Art. 1º e Poderes do Art. 2º.", "Dizer que ISS e crédito tributário não são do Fiscal de Posturas.", "Citar circo: documento de engenheiro habilitado (Anexo I)."],
    videos: [v("limpe")],
    qNeed: 30, qTopics: ["CF 1º", "CF 5º", "CF 37", "Ética", "Anexo I"],
    readings: [{ disc: "CF", text: "Princípios fundamentais, Art. 5º, Art. 37. Sem TCU/orçamento federal." }, { disc: "Anexo I", text: "Atribuições integrais. Armadilhas entre Posturas, Tributos e Meio Ambiente." }]
  },
  "2026-11-14": {
    weekday: "Sábado", longDate: "14 de novembro de 2026", discs: "Específicas (peso 4) e legislação grifada",
    goal: "60 questões de específicas + leitura integral dos grifos da 946 e da LOM.",
    objectives: ["Manter ritmo de questão: teoria só do que errou.", "Passar os grifos da 946 e da LOM sem reler o estatuto inteiro.", "Fazer 30 flashcards de competências, vedações, prazos e quóruns."],
    videos: [v("atosFocus"), v("atributosTossan", "complementar")],
    qNeed: 60, qTopics: ["Atos", "CF 37", "Informática", "Ética", "Improbidade"],
    readings: [{ disc: "Específicas", text: "Admin 25, Constitucional 20, Informática 10, Ética 5." }, { disc: "Leis", text: "Grifos da Lei 946 e da LOM." }]
  },
  "2026-11-15": {
    weekday: "Domingo", longDate: "15 de novembro de 2026", discs: "Português e simulado 2",
    goal: "45 questões de PT + simulado 2 no formato da prova. Os 5 temas que mais derrubam mandam na semana 3.",
    objectives: ["Fechar interpretação, crase, pontuação, concordância e regência em volume.", "Entregar o simulado 2 e comparar com o 1 (específicas = 1º desempate).", "Listar os 5 temas fracos."],
    videos: [v("interpTossan"), v("figuras")],
    qNeed: 45, qTopics: ["Interpretação", "Crase", "Pontuação", "Concordância", "Regência"],
    sim: 2,
    readings: [{ disc: "PT", text: "Interpretação, crase, pontuação, concordância, regência." }]
  },
  "2026-11-16": {
    weekday: "Segunda-feira", longDate: "16 de novembro de 2026", discs: "Admin (revisão) e regime disciplinar",
    goal: "Quadro-resumo de atos/provimento/bens. Sem material novo. Só fichas vermelhas.",
    objectives: ["Redigir de memória: anulação × revogação; 7 provimentos; 3 bens.", "Recitar sindicância 30+30, PAD 60+60, abandono >30, inassiduidade 60/12.", "Revisar só o caderno vermelho."],
    videos: [v("atributosPureza")],
    qNeed: 10, qTopics: ["Atos", "PAD", "Abandono", "Prescrição", "Penalidades"],
    readings: [{ disc: "Admin", text: "Quadro-resumo. Sem material novo." }, { disc: "Lei 946", text: "Regime disciplinar e prazos. Arts. 217, 231, 232, 239, 242, 271." }]
  },
  "2026-11-17": {
    weekday: "Terça-feira", longDate: "17 de novembro de 2026", discs: "CF seca e Português dos erros",
    goal: "Leitura seca dos Arts. 1º–5º, 29–31 e 37–41. Após 17h: local de prova no site da banca.",
    objectives: ["Ler os artigos sem resumo de terceiro.", "Treinar só os tópicos de PT que mais errou nos simulados.", "Anotar local, horário e rota. Documento físico original."],
    videos: [v("cf3741")],
    qNeed: 10, qTopics: ["CF 1º", "CF 5º", "Municípios", "CF 37"],
    readings: [{ disc: "CF", text: "Arts. 1º–5º, 29–31 e 37–41, texto seco." }, { disc: "PT", text: "Somente tópicos fracos dos simulados." }]
  },
  "2026-11-18": {
    weekday: "Quarta-feira", longDate: "18 de novembro de 2026", discs: "Lei Orgânica e Informática",
    goal: "Competências do Município/Prefeito/Câmara + atalhos Windows/Office/Chrome.",
    objectives: ["Dizer o que é competência do Município sem citar artigo não conferido.", "Acertar hardware (scanner/RAM) e atalhos de Windows.", "Passar o caderno de erros da informática."],
    videos: [v("windowsRomilton"), v("windowsClica", "complementar")],
    qNeed: 20, qTopics: ["Municípios", "Informática"],
    readings: [{ disc: "LOM", text: "Competências do Município, Prefeito e Câmara." }, { disc: "Informática", text: "Atalhos Windows/Office/Chrome + hardware e segurança." }]
  },
  "2026-11-19": {
    weekday: "Quinta-feira", longDate: "19 de novembro de 2026", discs: "Improbidade, ética, Anexo I e Português",
    goal: "Última passagem em improbidade/ética/atribuições e 20 questões de crase/concordância/regência.",
    objectives: ["Comparar Posturas × Tributos × Meio Ambiente em voz alta.", "Acertar 20 itens de crase, concordância, regência e conjunções.", "Última passagem nos prazos da 946."],
    videos: [v("bens"), v("figuras")],
    qNeed: 20, qTopics: ["Improbidade", "Ética", "Anexo I", "Crase", "Concordância", "Regência", "Coesão"],
    readings: [{ disc: "Específicas", text: "Improbidade, ética e Anexo I." }, { disc: "PT", text: "Crase, concordância, regência, conjunções." }]
  },
  "2026-11-20": {
    weekday: "Sexta-feira", longDate: "20 de novembro de 2026", discs: "Caderno de erros e específicas",
    goal: "Consciência Negra: se folgar, 5h30 no caderno + 30 específicas. Se trabalhar, só 19:00–21:10. Sem matéria nova.",
    objectives: ["Zerar fichas vermelhas do caderno.", "Revisar tabelas de prazos da 946 e da LOM.", "Fazer 20 a 30 específicas, sem tema novo."],
    videos: [v("atosFocus")],
    qNeed: 30, qTopics: ["Atos", "CF 37", "Anexo I", "Informática"],
    readings: [{ disc: "Caderno", text: "Erros inteiros + tabelas de prazos. Sem matéria nova." }]
  },
  "2026-11-21": {
    weekday: "Sábado", longDate: "21 de novembro de 2026", discs: "Revisão leve",
    goal: "Só resumos de manhã. Tarde e noite livres. Dormir 21:30. Sem questão nova.",
    objectives: ["Relembrar atos, bens, prazos da 946, atribuições, crase/conjunções.", "Separar RG/CNH físico, CCI, caneta transparente azul ou preta.", "Não abrir material novo."],
    videos: [v("interpLarissa")],
    qNeed: 0, qTopics: [],
    readings: [{ disc: "Resumos", text: "Atos, bens públicos, prazos da 946, atribuições, crase/conjunções. Sem questão nova." }]
  },
  "2026-11-22": {
    weekday: "Domingo", longDate: "22 de novembro de 2026", discs: "Prova",
    goal: "Hoje é o dia da prova. Sem conteúdo novo e sem simulado.",
    exam: true,
    objectives: ["Chegar 1 hora antes do fechamento dos portões.", "Documento original físico com foto. Sem documento no celular.", "Específicas primeiro (peso 4), depois legislação, Português por último.", "Não deixar em branco: chute consciente nos últimos 10 min."],
    videos: [],
    qNeed: 0, qTopics: [],
    readings: []
  }
};

function dayQs(plan) {
  if (!plan || !plan.qTopics || !plan.qTopics.length || typeof BANK === "undefined") return [];
  const keys = plan.qTopics.map((t) => t.toLowerCase());
  return BANK.filter((q) => {
    const blob = (q.disc + " " + q.topic + " " + (q.sub || "") + " " + (q.art || "")).toLowerCase();
    return keys.some((k) => blob.indexOf(k.toLowerCase()) >= 0);
  });
}

function dayProgress(id) {
  const all = loadDayCheck();
  const rec = all[id] || {};
  const n = CHECK_ITEMS.filter((c) => rec[c.id]).length;
  return { rec, n, pct: Math.round(n * 100 / CHECK_ITEMS.length) };
}

function dayStatus(d) {
  const done = loadDone();
  if (d.id === "2026-11-22") return "prova";
  if (d.kind === "simulado") return done[d.id] ? "concluido" : "simulado";
  const p = dayProgress(d.id);
  if (done[d.id] || p.pct === 100) return "concluido";
  if (p.n > 0) return "andamento";
  return "pendente";
}

function statusLabel(s) {
  return { pendente: "Pendente", andamento: "Em andamento", concluido: "Concluído", simulado: "Simulado", prova: "Prova" }[s] || s;
}

function openPanel(name) {
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b.dataset.panel === name));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === name));
  if (typeof syncNav === "function") syncNav(name);
}

function openDia(id) {
  if (location.hash !== "#dia-" + id) location.hash = "dia-" + id;
  renderDiaPage(id);
}

function renderDiaPage(id) {
  const box = document.getElementById("dia-box");
  if (!box) return;
  const day = DAYS.find((d) => d.id === id);
  const plan = DAY_PLAN[id];
  if (!day || !plan) {
    box.innerHTML = `<article class="card warn"><h3>Dia não encontrado</h3><p><button type="button" class="btn" data-back-cal>Voltar ao cronograma</button></p></article>`;
    bindDiaNav(box);
    openPanel("dia");
    return;
  }
  openPanel("dia");
  const idx = DAYS.findIndex((d) => d.id === id);
  const prev = DAYS[idx - 1];
  const next = DAYS[idx + 1];
  const p = dayProgress(id);
  const watched = loadWatched();
  const notes = loadNotes();
  const qs = dayQs(plan);
  const ans = typeof loadAnswers === "function" ? loadAnswers() : {};
  const doneQs = qs.filter((q) => ans[q.id]);
  const okQs = doneQs.filter((q) => ans[q.id].ok);
  const pctQ = doneQs.length ? Math.round(okQs.length * 100 / doneQs.length) : 0;
  const cad = typeof loadCaderno === "function" ? loadCaderno() : [];
  const dueCad = cad.filter((c) => c.due <= Date.now());
  const st = dayStatus(day);
  const hashUrl = location.href.split("#")[0] + "#dia-" + id;

  if (plan.exam) {
    box.innerHTML = `
      <article class="card good">
        <p class="phase">22/11/2026</p>
        <h2>Hoje é o dia da sua prova!</h2>
        <p>Fiscal de Posturas · Tanguá/RJ · IBDO · 3 horas · 30 questões A–D · mínimo 40 / 80.</p>
        <p>Local: conforme divulgação de 17/11 em ibdoprojetos.org.br. Confirme o endereço e o fechamento dos portões.</p>
      </article>
      <article class="card">
        <h3>Checklist de prova</h3>
        <ul>
          <li>Documento original físico com foto (RG/CNH). Sem documento no celular.</li>
          <li>Caneta esferográfica azul ou preta, corpo transparente.</li>
          <li>Comprovante de inscrição / CCI, conforme edital.</li>
          <li>Chegue 1 hora antes do fechamento dos portões.</li>
          <li>Estratégia: 10 específicas (peso 4) primeiro; legislação; Português por último, começando pelos textos.</li>
          <li>Não deixe em branco. Chute consciente nos últimos 10 min.</li>
        </ul>
        <p>Sem conteúdo novo. Sem simulado hoje. Você já fez o trabalho.</p>
      </article>
      <div class="q-nav">
        <button type="button" class="btn" data-back-cal>Voltar ao cronograma</button>
        ${prev ? `<button type="button" class="btn" data-go-dia="${prev.id}">Dia anterior</button>` : ""}
      </div>
    `;
    bindDiaNav(box);
    return;
  }

  box.innerHTML = `
    <div class="dia-nav">
      <button type="button" class="btn" data-back-cal>Cronograma</button>
      ${prev ? `<button type="button" class="btn" data-go-dia="${prev.id}">Anterior</button>` : ""}
      ${next ? `<button type="button" class="btn" data-go-dia="${next.id}">Próximo</button>` : ""}
      <button type="button" class="btn" data-copy="${hashUrl}">Copiar endereço deste dia</button>
    </div>
    <article class="card ${day.id === todayIso() ? "good" : ""}">
      <p class="phase">${plan.weekday.toUpperCase()} · ${plan.longDate}</p>
      <h2>${day.title}</h2>
      <p>Concurso: Fiscal de Posturas – Tanguá/RJ. Banca: IBDO. Tempo: ${day.hours}. ${day.tag}</p>
      <p>Disciplinas: ${plan.discs}</p>
      <p>Objetivo: ${plan.goal}</p>
      <div class="prog"><i style="width:${p.pct}%"></i></div>
      <p class="tree-meta">Progresso do dia: ${p.pct}% · ${p.n}/${CHECK_ITEMS.length} tarefas · ${statusLabel(st)}</p>
    </article>
    <article class="card">
      <h3>Ao finalizar hoje, você deverá conseguir</h3>
      <ul>${plan.objectives.map((o) => `<li>${o}</li>`).join("")}</ul>
    </article>
    <article class="card">
      <h3>Cronograma do dia</h3>
      ${day.blocks.map((b, i) => `
        <div class="block">
          <div class="when">${b.when}</div>
          <h3>Bloco ${i + 1}</h3>
          <p>${b.text}</p>
          <p class="tree-meta">Critério: cumprir o bloco no horário e marcar o checkbox antigo se já usava o calendário. Checklist novo fica mais abaixo.</p>
        </div>
      `).join("")}
    </article>
    <article class="card">
      <h3>O que ler</h3>
      ${plan.readings.map((r) => `<p><b>${r.disc}.</b> ${r.text}</p>`).join("") || "<p>Sem leitura nova.</p>"}
    </article>
    <article class="card">
      <h3>Videoaulas deste dia</h3>
      ${plan.videos.length ? plan.videos.map((vid) => `
        <div class="yt-card">
          <p class="phase">${vid.kind === "complementar" ? "Complementar" : "Obrigatória"} · ${vid.subject}</p>
          <h3>${vid.title}</h3>
          <p>${vid.author} · ${vid.channel}</p>
          <p>O que observar: ${vid.watch}</p>
          <p class="tree-meta">Duração: a que o YouTube exibir. Não inventei minuto.</p>
          <div class="yt-wrap">
            <iframe src="https://www.youtube-nocookie.com/embed/${vid.id}" title="${vid.title}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="q-nav">
            <a class="btn gold" href="https://www.youtube.com/watch?v=${vid.id}" target="_blank" rel="noopener">Assistir no YouTube</a>
            <button type="button" class="btn ${watched[vid.id] ? "gold" : ""}" data-watch="${vid.id}">${watched[vid.id] ? "Assistido" : "Marcar como assistido"}</button>
          </div>
        </div>
      `).join("") : "<p>Sem videoaula neste dia.</p>"}
    </article>
    <article class="card">
      <h3>Questões deste dia</h3>
      <p>Meta: ${plan.qNeed} questão(ões) no tema do dia. Banco ligado: ${qs.length}. Resolvidas: ${doneQs.length}. Acertos: ${okQs.length}${doneQs.length ? " · " + pctQ + "%" : ""}.</p>
      ${plan.sim ? `<p>Há simulado ${plan.sim} programado. Abra a aba Simulados para o cronômetro de 3h.</p><button type="button" class="btn gold" data-go-sim="${plan.sim}">Abrir simulado ${plan.sim}</button>` : ""}
      ${qs.length ? `<ul class="q-list">${qs.slice(0, 12).map((q) => {
        const a = ans[q.id];
        const stq = a ? (a.ok ? "certo" : "errado") : "aberta";
        return `<li><button type="button" class="btn" data-open-q="${q.id}">${q.id}</button> ${q.disc} · ${q.topic} · ${stq}</li>`;
      }).join("")}${qs.length > 12 ? "<li>Mais " + (qs.length - 12) + " no banco, pelo filtro da aba Questões.</li>" : ""}</ul>
      <button type="button" class="btn gold" data-open-q="${qs[0].id}">Resolver a primeira do dia</button>` : "<p>Sem questão nova neste dia. Use o caderno de erros.</p>"}
    </article>
    <article class="card">
      <h3>Revisões para hoje</h3>
      ${dueCad.length ? `<ul>${dueCad.map((c) => `<li>${c.disc} · ${c.topic} · ${c.id} · ${c.stem}</li>`).join("")}</ul>` : "<p>Nenhuma ficha do caderno vence hoje. Não criei revisão de assunto que você ainda não errou.</p>"}
      <button type="button" class="btn" data-go-cad>Abrir caderno de erros</button>
    </article>
    <article class="card">
      <h3>Checklist do dia</h3>
      ${CHECK_ITEMS.map((c) => `<label class="check"><input type="checkbox" data-dc="${c.id}" ${p.rec[c.id] ? "checked" : ""}/> ${c.label}</label>`).join("")}
      <div class="prog"><i style="width:${p.pct}%"></i></div>
      <p class="tree-meta">${p.pct}% · só marca quando você clicar. Não marco vídeo nem questão sozinho.</p>
    </article>
    <article class="card">
      <h3>Anotações do dia ${day.date}</h3>
      <textarea id="dia-notes" rows="7" placeholder="Resumos, dúvidas, prazos, erros recorrentes, o que observar na aula. Só deste dia.">${notes[id] ? notes[id].replace(/</g, "&lt;") : ""}</textarea>
    </article>
    <article class="card">
      <h3>Antes de encerrar o dia</h3>
      <p>O que aprendi? O que ainda tenho dificuldade? Quantas questões acertei neste tema (${okQs.length}/${doneQs.length || 0})? O que preciso revisar amanhã?</p>
      <p class="tree-meta">Responda no caderno de anotações acima. Marque "Dia concluído" só quando o checklist estiver honesto.</p>
    </article>
  `;
  bindDiaNav(box, id);
}

function bindDiaNav(box, id) {
  box.querySelectorAll("[data-back-cal]").forEach((b) => b.addEventListener("click", () => {
    location.hash = "";
    openPanel("calendario");
    renderCal(currentCalFilter());
  }));
  box.querySelectorAll("[data-go-dia]").forEach((b) => b.addEventListener("click", () => openDia(b.dataset.goDia)));
  box.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => {
    const t = b.dataset.copy;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).catch(() => {});
    b.textContent = "Endereço copiado";
  }));
  box.querySelectorAll("[data-watch]").forEach((b) => b.addEventListener("click", () => {
    const map = loadWatched();
    map[b.dataset.watch] = !map[b.dataset.watch];
    saveWatched(map);
    if (id) renderDiaPage(id);
    if (typeof renderMateriais === "function") renderMateriais();
  }));
  box.querySelectorAll("[data-dc]").forEach((input) => {
    input.addEventListener("change", () => {
      const all = loadDayCheck();
      all[id] = all[id] || {};
      all[id][input.dataset.dc] = input.checked;
      saveDayCheck(all);
      if (input.dataset.dc === "dia") {
        const map = loadDone();
        map[id] = input.checked;
        saveDone(map);
      }
      renderDiaPage(id);
      if (typeof renderToday === "function") renderToday();
    });
  });
  const ta = document.getElementById("dia-notes");
  if (ta) {
    ta.addEventListener("input", () => {
      const map = loadNotes();
      map[id] = ta.value;
      saveNotes(map);
    });
  }
  box.querySelectorAll("[data-open-q]").forEach((b) => b.addEventListener("click", () => {
    const qid = b.dataset.openQ;
    const q = BANK.find((x) => x.id === qid);
    if (q) qFilter = q.disc;
    const list = typeof bankList === "function" ? bankList() : BANK;
    qIndex = Math.max(0, list.findIndex((x) => x.id === qid));
    qPick = null;
    location.hash = "";
    openPanel("questoes");
    if (typeof renderQuestoes === "function") renderQuestoes();
  }));
  box.querySelectorAll("[data-go-sim]").forEach((b) => {
    b.addEventListener("click", () => {
      location.hash = "";
      openPanel("simulados");
      if (typeof renderSimHome === "function") renderSimHome();
    });
  });
  box.querySelectorAll("[data-go-cad]").forEach((b) => b.addEventListener("click", () => {
    location.hash = "";
    openPanel("caderno");
    if (typeof renderCaderno === "function") renderCaderno();
  }));
}

function currentCalFilter() {
  const on = document.querySelector("#calendario .chip.active");
  return on ? on.dataset.filter : "all";
}

function renderCal(filter) {
  const done = loadDone();
  const today = todayIso();
  const list = document.getElementById("cal-list");
  if (!list) return;
  const f = filter || "all";
  const items = DAYS.filter((d) => {
    const st = dayStatus(d);
    if (f === "all") return true;
    if (f === "work" || f === "free" || f === "simulado") return d.kind === f;
    if (f === "pending") return st === "pendente" || st === "andamento" || st === "simulado";
    if (f === "done") return st === "concluido";
    if (f === "next") return d.id >= today;
    return true;
  });
  list.innerHTML = items.map((d) => {
    const plan = DAY_PLAN[d.id] || {};
    const p = dayProgress(d.id);
    const st = dayStatus(d);
    const mats = (d.blocks || []).map((b) => (b.when.split("·")[1] || "").trim()).filter(Boolean);
    return `<article class="day day-card ${d.id === today ? "today" : ""} ${st === "concluido" ? "done" : ""}" data-kind="${d.kind}" data-open-dia="${d.id}">
      <div>
        <span class="date">${d.date}</span>
        <span class="kind">${statusLabel(st)}</span>
      </div>
      <div>
        <h3>${d.title}</h3>
        <p>${plan.discs || mats.join(" · ")}</p>
        <p class="tree-meta">${d.blocks.length} bloco(s) · ${d.hours} · ${p.pct}%</p>
        <div class="prog"><i style="width:${p.pct}%"></i></div>
      </div>
      <div class="q-nav" style="flex-direction:column">
        <button type="button" class="btn gold" data-open-dia="${d.id}">Abrir o dia</button>
        <button type="button" data-id="${d.id}">${done[d.id] ? "Concluído" : "Marcar"}</button>
      </div>
    </article>`;
  }).join("") || "<article class='card'><p>Nenhum dia neste filtro.</p></article>";
  list.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const map = loadDone();
      map[btn.dataset.id] = !map[btn.dataset.id];
      saveDone(map);
      renderCal(currentCalFilter());
      if (typeof renderToday === "function") renderToday();
    });
  });
  list.querySelectorAll("[data-open-dia]").forEach((el) => {
    el.addEventListener("click", (ev) => {
      if (ev.target && ev.target.getAttribute("data-id")) return;
      openDia(el.dataset.openDia || el.getAttribute("data-open-dia"));
    });
  });
}

const _renderTodayOrig = renderToday;
renderToday = function () {
  _renderTodayOrig();
  const el = document.getElementById("hoje");
  if (!el) return;
  const id = todayIso();
  const day = DAYS.find((d) => d.id === id) || DAYS[0];
  const p = dayProgress(day.id);
  const plan = DAY_PLAN[day.id];
  const nextStep = el.querySelector(".next-step");
  if (nextStep && plan && plan.goal && !nextStep.querySelector(".day-goal")) {
    const g = document.createElement("p");
    g.className = "day-goal";
    g.textContent = plan.goal;
    const h2 = nextStep.querySelector("h2");
    if (h2) h2.insertAdjacentElement("afterend", g);
  }
  const prog = el.querySelector(".next-step .prog i");
  if (prog) prog.style.width = p.pct + "%";
  const meta = el.querySelector(".next-step .tree-meta");
  if (meta) meta.textContent = day.hours + " previstos · progresso de hoje: " + p.pct + "%";
};

const _collectBackupOrig = collectBackup;
collectBackup = function () {
  const data = _collectBackupOrig();
  data.daycheck = loadDayCheck();
  data.notes = loadNotes();
  data.watched = loadWatched();
  return data;
};

const _applyBackupOrig = applyBackup;
applyBackup = function (data) {
  _applyBackupOrig(data);
  if (data.daycheck != null && (typeof data.daycheck !== "object" || Array.isArray(data.daycheck))) throw new Error("campo daycheck inválido");
  if (data.notes != null && (typeof data.notes !== "object" || Array.isArray(data.notes))) throw new Error("campo notes inválido");
  if (data.watched != null && (typeof data.watched !== "object" || Array.isArray(data.watched))) throw new Error("campo watched inválido");
  if (data.daycheck) saveDayCheck(data.daycheck);
  if (data.notes) saveNotes(data.notes);
  if (data.watched) saveWatched(data.watched);
};

const _renderMateriaisOrig = typeof renderMateriais === "function" ? renderMateriais : null;
renderMateriais = function () {
  if (_renderMateriaisOrig) _renderMateriaisOrig();
  const box = document.getElementById("video-lib");
  if (!box) return;
  const watched = loadWatched();
  const lib = Object.keys(VLIB).map((k) => VLIB[k]);
  const uniq = [];
  const seen = {};
  lib.forEach((vid) => { if (!seen[vid.id]) { seen[vid.id] = true; uniq.push(vid); } });
  const daysOf = (id) => Object.keys(DAY_PLAN).filter((d) => (DAY_PLAN[d].videos || []).some((v) => v.id === id));
  const extra = document.createElement("div");
  extra.innerHTML = `
    <article class="card">
      <h3>Biblioteca de videoaulas</h3>
      <p>Aulas conferidas por oEmbed em 02/11/2026. O mesmo vídeo pode aparecer em mais de um dia. Hardware (PecH-7ZulK0) retornou 404 e não foi cadastrado.</p>
      <div class="filters" id="vlib-filters">
        ${["Todos", "Português", "Direito Administrativo", "Direito Constitucional", "Informática"].map((c, i) => `<button type="button" class="chip ${i === 0 ? "active" : ""}" data-vc="${c}">${c}</button>`).join("")}
      </div>
      <div id="vlib-grid" class="grid-3"></div>
    </article>
  `;
  box.appendChild(extra);
  function paint(cat) {
    const grid = document.getElementById("vlib-grid");
    if (!grid) return;
    const list = uniq.filter((v) => cat === "Todos" || v.cat === cat);
    grid.innerHTML = list.map((vid) => `
      <article class="card">
        <img src="https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg" alt="" style="width:100%;border-radius:8px;margin-bottom:8px"/>
        <p class="phase">${vid.kind} · ${vid.cat}</p>
        <h3>${vid.title}</h3>
        <p>${vid.author} · ${vid.channel}</p>
        <p class="tree-meta">Dias: ${daysOf(vid.id).map((d) => d.slice(8)).join(", ") || "—"} · ${watched[vid.id] ? "assistido" : "não assistido"}</p>
        <div class="q-nav">
          <a class="btn gold" href="https://www.youtube.com/watch?v=${vid.id}" target="_blank" rel="noopener">YouTube</a>
          <button type="button" class="btn" data-watch="${vid.id}">${watched[vid.id] ? "Assistido" : "Marcar assistido"}</button>
        </div>
      </article>
    `).join("");
    grid.querySelectorAll("[data-watch]").forEach((b) => b.addEventListener("click", () => {
      const map = loadWatched();
      map[b.dataset.watch] = !map[b.dataset.watch];
      saveWatched(map);
      paint(cat);
    }));
  }
  extra.querySelectorAll("[data-vc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      extra.querySelectorAll("[data-vc]").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      paint(btn.dataset.vc);
    });
  });
  paint("Todos");
};

function routeHash() {
  const m = (location.hash || "").match(/^#dia-(\d{4}-\d{2}-\d{2})$/);
  if (m) {
    renderDiaPage(m[1]);
    return true;
  }
  return false;
}

window.addEventListener("hashchange", () => {
  if (!routeHash() && document.getElementById("dia") && document.getElementById("dia").classList.contains("active")) {
    openPanel("calendario");
  }
});

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.panel !== "dia" && location.hash.indexOf("#dia-") === 0) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  });
});

try { renderCal(currentCalFilter()); } catch (_) {}
try { renderToday(); } catch (_) {}
try { renderMateriais(); } catch (_) {}
try { routeHash(); } catch (_) {}
