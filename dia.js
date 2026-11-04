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
    phase: "Fase 1 · Fechar o alto rendimento",
    goal: "Fechar o núcleo da prova: atos, prazos da 946 e CF 37–41, sem tentar passar o edital inteiro.",
    result: "Saber distinguir elementos e atributos do ato, recitar 8 prazos da Lei 946 e reconhecer LIMPE no Art. 37.",
    objectives: ["Diferenciar elementos (COFIFOMO) e atributos do ato administrativo.", "Ligar autoexecutoriedade a apreensão e interdição.", "Montar a tabela de prazos da Lei 946 (posse, exercício, PAD).", "Reconhecer LIMPE no Art. 37 e o recorte de 37–41."],
    videos: [v("atosFocus"), v("cf3741"), v("policia", "complementar")],
    qNeed: 30, qTopics: ["Atos", "PAD", "Posse", "Exercício", "Estágio", "Recondução", "CF 37", "Informática"],
    readings: [
      { disc: "Admin", title: "Atos administrativos (Anexo II)", text: "Elementos (COFIFOMO) e atributos. Não inventar artigo de lei federal além do Anexo II." },
      { disc: "Lei 946", title: "Lei Municipal 946/2014", text: "Deveres, proibições, penalidades, sindicância e PAD. Só o PDF de Tanguá.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", arts: "Arts. 35, 36, 39, 26 III, 204–205, 217, 231, 239, 242" },
      { disc: "CF", title: "Constituição Federal", text: "Remédios, LIMPE, concurso, acumulação, estabilidade. Sem PPA, TCU ou processo legislativo federal.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 5º e 37–41" }
    ],
    recall: ["Quais são os 5 elementos e os 4 atributos do ato?", "Qual o prazo de posse e o de exercício na Lei 946?", "O que é LIMPE?", "Scanner é entrada ou saída?"],
    steps: [
      { id: "s1", when: "07:30–07:40", mins: 10, disc: "Específicas", subject: "Preparação — atos", do: "Abra o caderno. Anote três colunas: elementos (COFIFOMO), atributos e extinção (anulação × revogação). Não abra PPA, TCU nem processo legislativo federal." },
      { id: "s2", when: "07:40–08:10", mins: 30, disc: "Específicas", subject: "Leitura — elementos e atributos", do: "Leia: competência, finalidade, forma, motivo e objeto (elementos). Depois: presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade (atributos). Ligue autoexecutoriedade a apreensão e interdição. Não invente artigo de lei federal além do Anexo II." },
      { id: "s3", when: "08:10–08:25", mins: 15, disc: "Específicas", subject: "Videoaula — atos", do: "Assista à aula de atos administrativos. Anote elementos × atributos e anulação (ex tunc) × revogação (ex nunc). A duração é a que o YouTube exibir. Se já viu, releia só as anotações.", video: "atosFocus" },
      { id: "s4", when: "08:25–08:35", mins: 10, disc: "Específicas", subject: "Recuperação ativa", do: "Feche o material. Responda: quais são os 5 elementos? quais são os 4 atributos? o que a autoexecutoriedade autoriza na rua?" },
      { id: "s5", when: "08:35–09:20", mins: 45, disc: "Específicas", subject: "Questões — atos", do: "Abra Questões. Disciplina: Específicas. Assunto: Atos. Resolva 12 questões sem gabarito prévio. Corrija cada uma: leia o porquê da certa e das erradas.", q: { disc: "Específicas", topic: "Atos", n: 12 } },
      { id: "s6", when: "09:20–09:30", mins: 10, disc: "Específicas", subject: "Caderno", do: "Registre cada erro com tema, motivo (desconhecimento, desatenção ou confusão) e fundamento." },
      { id: "s7", when: "10:00–10:25", mins: 25, disc: "Legislação", subject: "Leitura — Lei 946 disciplinar", do: "Abra o PDF oficial da Lei 946/2014. Leia deveres e proibições (Arts. 204–205), penalidades (Art. 217), sindicância (Art. 231: 30+30), PAD (Arts. 239 e 242: 3 efetivos, 60+60). Não use estatuto de outro município.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", hrefLabel: "Abrir Lei 946/2014 (PDF Tanguá)" },
      { id: "s8", when: "10:25–10:45", mins: 20, disc: "Legislação", subject: "Tabela de prazos", do: "Monte a tabela: posse (Art. 35: 30+30 da publicação da nomeação), exercício (Art. 36: 15+15 da posse), estágio (Art. 39: 3 anos do exercício), recondução a pedido (Art. 26, III: 120 dias), sindicância, PAD, abandono (>30 consecutivos) e inassiduidade (60 interpolados/12 meses). Colunas: instituto, prazo, termo inicial, prorrogação, consequência, artigo." },
      { id: "s9", when: "10:45–11:00", mins: 15, disc: "Legislação", subject: "Recuperação ativa — prazos", do: "Feche o PDF. Preencha a tabela de memória. Confira depois com o texto." },
      { id: "s10", when: "11:00–11:45", mins: 45, disc: "Legislação", subject: "Questões — Lei 946", do: "Filtro: Legislação. Assuntos: Posse, Exercício, Estágio, Recondução, PAD, Penalidades. Resolva 10 questões. Não misture com a LOM neste bloco.", q: { disc: "Legislação", topics: ["Posse", "Exercício", "Estágio", "Recondução", "PAD", "Penalidades"], n: 10 } },
      { id: "s11", when: "11:45–12:00", mins: 15, disc: "Legislação", subject: "Correção", do: "Corrija, registre erros e grife no PDF só o artigo que errou." },
      { id: "s12", when: "14:00–14:25", mins: 25, disc: "Específicas", subject: "Leitura — CF Arts. 5º e 37–41", do: "Abra a Constituição no Planalto. Leia Art. 5º (habeas corpus, habeas data, mandado de segurança) e Arts. 37–41 (LIMPE, concurso, acumulação, estabilidade). Sem PPA, TCU ou processo legislativo federal.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", hrefLabel: "Abrir Constituição Federal" },
      { id: "s13", when: "14:25–14:40", mins: 15, disc: "Específicas", subject: "Videoaula — Arts. 37–41", do: "Assista à aula dos Arts. 37 a 41. Anote LIMPE, concurso (Art. 37, II) e estabilidade (Art. 41). Ignore 205–207 se a aula chegar lá.", video: "cf3741" },
      { id: "s14", when: "14:40–15:25", mins: 45, disc: "Específicas", subject: "Questões — CF 37 e Informática", do: "Revise: scanner = entrada; impressora = saída; RAM volátil; HD/SSD permanente; Alt+Tab. Sem Excel avançado. Resolva 8 questões de Informática e CF 37.", q: { disc: "Específicas", topics: ["CF 37", "Informática"], n: 8 } },
      { id: "s15", when: "15:25–16:00", mins: 35, disc: "Fechamento", subject: "Caderno e checklist", do: "Passe a limpo os erros do dia. Marque as etapas cumpridas. Não tente passar o edital inteiro hoje." }
    ]
  },
  "2026-11-03": {
    weekday: "Terça-feira", longDate: "03 de novembro de 2026", discs: "Constitucional (Municípios) e Legislação Municipal",
    phase: "Fase 1",
    goal: "Compreender a organização municipal na Constituição e memorizar os principais prazos da Lei 946/2014.",
    result: "Explicar autonomia municipal, competências do Município e recitar posse, exercício, estágio e recondução sem consultar.",
    objectives: ["Explicar autonomia municipal e lei orgânica (Art. 29: dois turnos, 2/3, interstício de 10 dias).", "Distinguir competências municipais dos demais entes.", "Recitar posse 30+30, exercício 15+15, estágio 3 anos, recondução 120 dias."],
    videos: [],
    qNeed: 16, qTopics: ["Municípios", "Organização do Estado", "Posse", "Exercício", "Estágio", "Recondução"],
    readings: [
      { disc: "CF", title: "Constituição Federal", text: "Arts. 18 a 31, com prioridade para 29, 30 e 31: autonomia, lei orgânica, competências, fiscalização.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 18–31, foco 29–31" },
      { disc: "Lei 946", title: "Lei Municipal 946/2014", text: "Prazos de posse, exercício, estágio e recondução a pedido.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", arts: "Arts. 35, 36, 39, 26 III" }
    ],
    recall: ["O que significa autonomia municipal?", "Qual é a função da Lei Orgânica?", "Quais são exemplos de competências municipais?", "Qual é o prazo para posse e para entrar em exercício?"],
    steps: [
      { id: "s1", when: "19:00–19:05", mins: 5, disc: "Específicas", subject: "Preparação — Municípios", do: "Abra a Constituição Federal no link oficial. Deixe aberto o trecho dos artigos 18 a 31. Não avance para Arts. 37–41 neste bloco.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", hrefLabel: "Abrir Constituição Federal" },
      { id: "s2", when: "19:05–19:20", mins: 15, disc: "Específicas", subject: "Leitura direcionada — Arts. 18–31", do: "Leia os artigos 18 a 31, concentrando a atenção nos artigos 29, 30 e 31. Identifique: autonomia municipal; Lei Orgânica (dois turnos, 2/3, interstício de 10 dias); competências municipais; fiscalização do Município (Art. 31). Não avance para assuntos fora do objetivo da sessão." },
      { id: "s3", when: "19:20–19:30", mins: 10, disc: "Específicas", subject: "Videoaula", do: "Não foi localizada uma videoaula específica e confiável sobre organização do Estado e Municípios (Arts. 18–31). O vídeo de Arts. 37–41 não substitui este conteúdo. Use estes 10 minutos para reler os Arts. 29, 30 e 31 e anotar autonomia, lei orgânica e competências.", noVideo: true },
      { id: "s4", when: "19:30–19:35", mins: 5, disc: "Específicas", subject: "Recuperação ativa", do: "Feche o documento e tente responder: o que significa autonomia municipal? qual é a função da Lei Orgânica? quais são exemplos de competências municipais? como ocorre a fiscalização do Município?" },
      { id: "s5", when: "19:35–19:50", mins: 15, disc: "Específicas", subject: "Questões — Municípios", do: "Abra Questões. Filtro: Específicas → Municípios / Organização do Estado. Resolva 8 questões. Não consulte o gabarito antes de responder. Corrija em seguida.", q: { disc: "Específicas", topics: ["Municípios", "Organização do Estado"], n: 8 } },
      { id: "s6", when: "20:00–20:15", mins: 15, disc: "Legislação", subject: "Leitura — prazos da Lei 946", do: "Abra o PDF oficial da Lei 946/2014. Leia: Art. 35 (posse: 30 dias da publicação da nomeação, prorrogável por igual período); Art. 36 (exercício: 15 dias da posse, prorrogável por igual período); Art. 39 (estágio: 3 anos a contar do exercício); Art. 26, III (recondução a pedido: 120 dias). Identifique prazo, termo inicial e prorrogação.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", hrefLabel: "Abrir Lei 946/2014 (PDF Tanguá)" },
      { id: "s7", when: "20:15–20:25", mins: 10, disc: "Legislação", subject: "Montagem da tabela", do: "Monte a tabela de revisão com posse, exercício, estágio e recondução. Anote prazos e consequências (nomeação sem efeito no Art. 35, §4º; exoneração de ofício no Art. 50, II)." },
      { id: "s8", when: "20:25–20:35", mins: 10, disc: "Legislação", subject: "Recuperação ativa — tabela", do: "Feche o PDF e tente preencher a tabela novamente de memória." },
      { id: "s9", when: "20:35–20:50", mins: 15, disc: "Legislação", subject: "Questões — prazos", do: "Abra Questões. Filtro: Legislação → Posse, Exercício, Estágio, Recondução. Resolva 8 questões.", q: { disc: "Legislação", topics: ["Posse", "Exercício", "Estágio", "Recondução"], n: 8 } },
      { id: "s10", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Correção e caderno", do: "Corrija as respostas. Identifique os conceitos que confundiu. Registre os erros no caderno. Revise os prazos que não conseguiu lembrar. Marque as etapas concluídas. Critério: leituras feitas, questões resolvidas e conceitos explicados sem consultar." }
    ]
  },
  "2026-11-04": {
    weekday: "Quarta-feira", longDate: "04 de novembro de 2026", discs: "Língua Portuguesa e Informática",
    phase: "Fase 1",
    goal: "Treinar interpretação sem extrapolação e segurança da informação (peso 4).",
    result: "Separar compreensão de inferência e definir phishing, ransomware e backup.",
    objectives: ["Separar compreensão (o que o texto diz) de inferência (o que se conclui sem extrapolar).", "Definir phishing, ransomware e backup.", "Resolver 8 questões de interpretação e 8 de informática."],
    videos: [v("interpLarissa"), v("windowsRomilton")],
    qNeed: 16, qTopics: ["Interpretação", "Informática"],
    readings: [
      { disc: "PT", title: "Interpretação de texto", text: "Ideia principal, explícito, implícito. Sem achismo. Anexo II: leitura e interpretação." },
      { disc: "Informática", title: "Segurança da informação", text: "Malware, phishing, ransomware, backup, navegadores. Conceito, sem Excel avançado." }
    ],
    recall: ["O que diferencia compreensão de inferência?", "O que é phishing e o que é ransomware?", "Backup substitui antivírus?"],
    steps: [
      { id: "s1", when: "19:00–19:05", mins: 5, disc: "Português", subject: "Preparação — interpretação", do: "Abra o caderno. Anote duas colunas: o que o texto diz (compreensão) e o que se conclui sem extrapolar (inferência). Proibido completar o texto com conhecimento de mundo." },
      { id: "s2", when: "19:05–19:20", mins: 15, disc: "Português", subject: "Videoaula — interpretação", do: "Assista à aula de interpretação. Marque compreensão versus inferência. Não extrapole o texto. Duração: a que o YouTube exibir.", video: "interpLarissa" },
      { id: "s3", when: "19:20–19:30", mins: 10, disc: "Português", subject: "Recuperação ativa", do: "Feche o vídeo. Explique em uma frase: quando a inferência é lícita em prova objetiva?" },
      { id: "s4", when: "19:30–19:50", mins: 20, disc: "Português", subject: "Questões — interpretação", do: "Filtro: Português → Interpretação. Resolva 8 questões. Não marque a mais longa por ser mais completa. Corrija na hora.", q: { disc: "Português", topic: "Interpretação", n: 8 } },
      { id: "s5", when: "20:00–20:15", mins: 15, disc: "Informática", subject: "Leitura — segurança", do: "Revise: phishing = engenharia social (página ou mensagem falsa); ransomware = criptografia com resgate; backup = cópia de segurança. Navegadores: Chrome (omnibox, modo anônimo) e Internet Explorer (nomeado no edital; Edge o sucedeu). Sem Excel avançado." },
      { id: "s6", when: "20:15–20:25", mins: 10, disc: "Informática", subject: "Videoaula — Windows", do: "Assista à aula de Windows. Anote atalhos e gerenciador de arquivos. Sem Excel avançado.", video: "windowsRomilton" },
      { id: "s7", when: "20:25–20:50", mins: 25, disc: "Informática", subject: "Questões — informática", do: "Filtro: Específicas → Informática. Resolva 8 questões (segurança, hardware, Windows). Corrija cada uma.", q: { disc: "Específicas", topic: "Informática", n: 8 } },
      { id: "s8", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Prazos de memória + caderno", do: "Sem olhar, recitar 8 prazos da Lei 946 (posse, exercício, estágio, recondução, sindicância, PAD, abandono, inassiduidade). Registrar erros de hoje no caderno." }
    ]
  },
  "2026-11-05": {
    weekday: "Quinta-feira", longDate: "05 de novembro de 2026", discs: "Direito Administrativo e Lei Orgânica",
    phase: "Fase 1",
    goal: "Fechar improbidade (dolo pós-14.230), bens públicos e competências da LOM.",
    result: "Afirmar que improbidade exige dolo; classificar os 3 bens; citar competência de interesse local na LOM.",
    objectives: ["Afirmar que improbidade, após a Lei 14.230/2021, exige dolo.", "Classificar bem de uso comum, especial e dominical.", "Ler competências do Município na LOM — sem inventar artigo."],
    videos: [v("bens"), v("limpe")],
    qNeed: 16, qTopics: ["Improbidade", "Bens públicos", "Lei Orgânica", "Municípios"],
    readings: [
      { disc: "Admin", title: "Improbidade e bens", text: "Lei 8.429 com 14.230/21: dolo, atos, penas. Bens: uso comum, especial, dominical + os três in.", href: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm", arts: "Lei 8.429 (com as alterações da Lei 14.230/2021)" },
      { disc: "LOM", title: "Lei Orgânica de Tanguá", text: "Competências do Município (Art. 20) e organização. Só o PDF da LOM; sem número inventado.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", arts: "Art. 20, I e II" }
    ],
    recall: ["A improbidade ainda admite culpa isolada após 14.230/2021?", "Rua e praça são bens de que espécie?", "O que a LOM Art. 20, I, reserva ao Município?"],
    steps: [
      { id: "s1", when: "19:00–19:10", mins: 10, disc: "Específicas", subject: "Leitura — improbidade", do: "Abra a Lei 8.429 no Planalto. Foque a exigência de dolo após a Lei 14.230/2021. Culpa isolada não basta. Não aprofunde jurisprudência de tribunais superiores.", href: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm", hrefLabel: "Abrir Lei 8.429" },
      { id: "s2", when: "19:10–19:25", mins: 15, disc: "Específicas", subject: "Videoaula — bens públicos", do: "Assista à aula de bens públicos. Anote uso comum (ruas, praças), uso especial (repartições) e dominical (patrimônio disponível) e os três in (inalienáveis, imprescritíveis, impenhoráveis), com nuances nos dominicais.", video: "bens" },
      { id: "s3", when: "19:25–19:35", mins: 10, disc: "Específicas", subject: "Recuperação ativa", do: "Feche o material. Classifique: rua, prédio da Prefeitura em uso, terreno vago municipal. Diga se improbidade exige dolo." },
      { id: "s4", when: "19:35–19:50", mins: 15, disc: "Específicas", subject: "Questões — improbidade e bens", do: "Filtro: Específicas → Improbidade e Bens públicos. Resolva 8 questões.", q: { disc: "Específicas", topics: ["Improbidade", "Bens públicos"], n: 8 } },
      { id: "s5", when: "20:00–20:20", mins: 20, disc: "Legislação", subject: "Leitura — LOM Art. 20", do: "Abra o PDF da Lei Orgânica de Tanguá. Leia o Art. 20: legislar sobre interesse local; suplementar legislação federal e estadual no que couber. Não invente número de artigo. Não use lei orgânica de outro município.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", hrefLabel: "Abrir Lei Orgânica de Tanguá" },
      { id: "s6", when: "20:20–20:30", mins: 10, disc: "Legislação", subject: "Recuperação ativa — LOM", do: "Feche o PDF. Cite duas competências municipais com as palavras do Art. 20. Diga o que NÃO é municipal (direito penal, moeda, guerra)." },
      { id: "s7", when: "20:30–20:50", mins: 20, disc: "Legislação", subject: "Questões — LOM", do: "Filtro: Legislação → Lei Orgânica. Resolva 8 questões.", q: { disc: "Legislação", topic: "Lei Orgânica", n: 8 } },
      { id: "s8", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Caderno + Anexo I", do: "Registre erros. Em voz alta, cite 4 atribuições do Fiscal de Posturas (licenciamento, ambulante, feira, publicidade) e o que NÃO é (ISS, crédito tributário, embargo ambiental)." }
    ]
  },
  "2026-11-06": {
    weekday: "Sexta-feira", longDate: "06 de novembro de 2026", discs: "Constitucional e Língua Portuguesa",
    phase: "Fase 1",
    goal: "Remédios do Art. 5º, LIMPE no Art. 37 e gramática de prova (concordância e pontuação).",
    result: "Distinguir HC, habeas data e mandado de segurança; recitar LIMPE; acertar haver/fazer e aposto.",
    objectives: ["Distinguir habeas corpus, habeas data e mandado de segurança.", "Recitar LIMPE e o §1º do Art. 37 (vedação à promoção pessoal).", "Acertar concordância de haver/fazer e pontuação de aposto."],
    videos: [v("cf3741"), v("crase")],
    qNeed: 18, qTopics: ["CF 5º", "CF 37", "Concordância", "Pontuação"],
    readings: [
      { disc: "CF", title: "Constituição Federal", text: "Art. 5º (remédios) e Art. 37 (LIMPE, concurso, acumulação, §1º).", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 5º e 37" },
      { disc: "PT", title: "Concordância e pontuação", text: "Haver/fazer impessoais; aposto com duas vírgulas. Sem morfologia profunda nesta noite." }
    ],
    recall: ["Habeas data protege o quê?", "Quais são os princípios do caput do Art. 37?", "Haviam irregularidades: certo ou errado?"],
    steps: [
      { id: "s1", when: "19:00–19:15", mins: 15, disc: "Específicas", subject: "Leitura — Art. 5º e Art. 37", do: "Abra a CF. Art. 5º, LXVIII (habeas corpus: locomoção), LXXII (habeas data: dados), LXIX (mandado de segurança: direito líquido e certo residual). Art. 37 caput (LIMPE) e §1º (vedação à promoção pessoal).", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", hrefLabel: "Abrir Constituição Federal" },
      { id: "s2", when: "19:15–19:30", mins: 15, disc: "Específicas", subject: "Videoaula — Arts. 37–41", do: "Assista ao recorte de LIMPE, concurso e estabilidade. Ignore 205–207.", video: "cf3741" },
      { id: "s3", when: "19:30–19:35", mins: 5, disc: "Específicas", subject: "Recuperação ativa", do: "Feche. Distinga HC, habeas data e MS em uma frase cada. Recite LIMPE." },
      { id: "s4", when: "19:35–19:50", mins: 15, disc: "Específicas", subject: "Questões — CF 5º e 37", do: "Filtro: Específicas → CF 5º e CF 37. Resolva 8 questões.", q: { disc: "Específicas", topics: ["CF 5º", "CF 37"], n: 8 } },
      { id: "s5", when: "20:00–20:15", mins: 15, disc: "Português", subject: "Videoaula — crase, regência, concordância", do: "Assista à aula. Anote: à pé (erro), haver no sentido de existir (impessoal), visar a.", video: "crase" },
      { id: "s6", when: "20:15–20:50", mins: 35, disc: "Português", subject: "Questões — concordância e pontuação", do: "Filtro: Português → Concordância e Pontuação. Resolva 10 questões. Pare se errar 2 do mesmo tipo e releia a regra.", q: { disc: "Português", topics: ["Concordância", "Pontuação"], n: 10 } },
      { id: "s7", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Releitura dos erros da semana", do: "Abra o caderno. Releia só as questões que errou desde 02/11. Não abra tema novo." }
    ]
  },
  "2026-11-07": {
    weekday: "Sábado", longDate: "07 de novembro de 2026", discs: "Português, Direito Administrativo e Lei 946",
    phase: "Fase 1",
    goal: "Fechar crase/regência/pontuação e treinar atos em volume, com lei seca da 946.",
    result: "Eliminar à pé e à ela; diferenciar vinculado/discricionário e anulação/revogação; grifar capítulos menos lidos da 946.",
    objectives: ["Eliminar à pé, à ela e crase em a pé.", "Diferenciar ato vinculado e discricionário; anulação (ex tunc) e revogação (ex nunc).", "Grifar capítulos menos lidos da Lei 946."],
    videos: [v("crase"), v("atributosPureza")],
    qNeed: 28, qTopics: ["Crase", "Regência", "Pontuação", "Atos"],
    readings: [
      { disc: "PT", title: "Crase, regência e pontuação", text: "Os três que mais derrubam em prova de nível médio. Sem morfologia profunda o dia todo." },
      { disc: "Admin", title: "Atos, agentes, polícia, bens", text: "Revisão ativa do que já leu. Teoria só da questão errada." },
      { disc: "Lei 946", title: "Lei seca grifada", text: "Capítulos menos lidos + flashcards de prazos.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf" }
    ],
    recall: ["Por que não há crase em a pé?", "Anulação tem efeito ex tunc ou ex nunc?", "Cite as 7 formas de provimento do Art. 20."],
    steps: [
      { id: "s1", when: "07:30–07:50", mins: 20, disc: "Português", subject: "Videoaula — crase e regência", do: "Assista à aula. Anote os erros clássicos: à pé, à ela, haver existencial, visar a, aspirar a.", video: "crase" },
      { id: "s2", when: "07:50–08:00", mins: 10, disc: "Português", subject: "Recuperação ativa", do: "Feche. Escreva 3 frases com crase certa e 3 sem crase. Confira depois." },
      { id: "s3", when: "08:00–09:20", mins: 80, disc: "Português", subject: "Questões — crase, regência, pontuação", do: "Filtro: Português → Crase, Regência, Pontuação. Resolva 16 questões. Pare se errar 2 do mesmo tipo e releia a regra antes de continuar.", q: { disc: "Português", topics: ["Crase", "Regência", "Pontuação"], n: 16 } },
      { id: "s4", when: "09:20–09:30", mins: 10, disc: "Português", subject: "Caderno", do: "Registre só os tipos que errou. Não copie enunciado inteiro." },
      { id: "s5", when: "10:00–10:20", mins: 20, disc: "Específicas", subject: "Videoaula — atributos", do: "Assista à aula de atributos. Ligue cada atributo a um exemplo de Posturas (apreensão, interdição).", video: "atributosPureza" },
      { id: "s6", when: "10:20–11:40", mins: 80, disc: "Específicas", subject: "Questões — atos", do: "Filtro: Específicas → Atos. Resolva 12 questões. Teoria só da que errar.", q: { disc: "Específicas", topic: "Atos", n: 12 } },
      { id: "s7", when: "11:40–12:00", mins: 20, disc: "Específicas", subject: "Correção", do: "Caderno: anulação × revogação; vinculado × discricionário; simples × complexo × composto." },
      { id: "s8", when: "14:00–15:20", mins: 80, disc: "Legislação", subject: "Leitura seca grifada da Lei 946", do: "Abra o PDF. Passe os capítulos menos lidos (direitos, licenças Art. 127 §5º no estágio, proibições Art. 205). Grife só prazos e vedações. 15 flashcards de prazos se já tiver o baralho; senão, 15 fichas no papel.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", hrefLabel: "Abrir Lei 946/2014 (PDF Tanguá)" },
      { id: "s9", when: "15:20–16:00", mins: 40, disc: "Legislação", subject: "Recuperação + fechamento", do: "Feche o PDF. Recite 8 prazos. Marque etapas. Sem matéria de outro município." }
    ]
  },
  "2026-11-08": {
    weekday: "Domingo", longDate: "08 de novembro de 2026", discs: "Constitucional, LOM e simulado 1",
    phase: "Fase 1",
    goal: "Primeiro simulado no formato da prova (30 questões, 4 alternativas A–D, máximo 3 horas) e correção ficha a ficha.",
    result: "Entregar 30 questões no formato 10+10+10 (pesos 2/2/4) e registrar cada erro com tema, motivo e artigo.",
    objectives: ["Resolver 30 questões no formato da prova (10 Português, 10 Legislação, 10 Específicas).", "Corrigir cada erro com tema, motivo e artigo.", "Não misturar legislação de outro município."],
    videos: [v("limpe")],
    qNeed: 12, qTopics: ["CF 1º", "Municípios", "CF 37", "Atos"],
    sim: 1,
    readings: [
      { disc: "CF + LOM", title: "Revisão rápida", text: "CF Arts. 1º–5º, 29–31, 37–41 e competências/quóruns da LOM. Sem lei de outro município.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 1º–5º, 29–31, 37–41" }
    ],
    recall: ["Qual o quórum da lei orgânica no Art. 29 da CF?", "LIMPE está em qual artigo?", "Como você vai ordenar as 30 questões no simulado?"],
    steps: [
      { id: "s1", when: "07:30–08:30", mins: 60, disc: "Específicas", subject: "Questões — CF e Municípios", do: "Filtro: Específicas → CF 1º, Municípios, CF 37. Resolva 12 questões como aquecimento. Corrija na hora.", q: { disc: "Específicas", topics: ["CF 1º", "Municípios", "CF 37"], n: 12 } },
      { id: "s2", when: "08:30–09:30", mins: 60, disc: "Legislação", subject: "LOM — competências e quóruns", do: "Abra a LOM. Relia Art. 20 (competência), Art. 43 (Câmara), Art. 69 (emenda: 2/3, dois turnos, 10 dias), Art. 94 (Prefeito). Sem artigo inventado.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", hrefLabel: "Abrir Lei Orgânica de Tanguá" },
      { id: "s3", when: "10:00–11:30", mins: 90, disc: "Simulado", subject: "Simulado 1 — formato da prova", do: "Abra a aba Simulados. Simulado 1: 10 Português, 10 Legislação, 10 Específicas, 4 alternativas A–D. Máximo 3 horas; treine em cerca de 1h30. Sem consulta. Estratégia: específicas primeiro (peso 4), depois legislação, Português por último." },
      { id: "s4", when: "14:00–16:00", mins: 120, disc: "Correção", subject: "Correção ficha a ficha", do: "Corrija uma a uma. Todo erro vira ficha no caderno: tema, por que errou, artigo certo. Não marque o dia concluído antes de terminar a correção." }
    ]
  },
  "2026-11-09": {
    weekday: "Segunda-feira", longDate: "09 de novembro de 2026", discs: "Direito Administrativo e Português",
    phase: "Fase 2 · Questões em massa",
    goal: "12 questões de atos e 10 de reescrita/pontuação/crase. Conferir homologação após 17h.",
    result: "Classificar ato simples, complexo e composto; acertar crase; anotar se a inscrição foi homologada.",
    objectives: ["Classificar ato simples, complexo e composto; geral e individual.", "Acertar reescrita e crase em 10 itens.", "Anotar se a inscrição foi homologada (Anexo III: 09/11)."],
    videos: [v("atributosTossan"), v("crase")],
    qNeed: 22, qTopics: ["Atos", "Crase", "Pontuação"],
    readings: [
      { disc: "Admin", title: "Classificação dos atos", text: "Elementos, atributos, classificação, extinção. Simples, complexo, composto; geral e individual." },
      { disc: "PT", title: "Reescrita, pontuação e crase", text: "Só os três. Sem fonologia nesta noite." }
    ],
    recall: ["O que diferencia ato complexo de composto?", "Um decreto de horário de comércio é ato geral ou individual?", "A inscrição foi homologada?"],
    steps: [
      { id: "s1", when: "19:00–19:10", mins: 10, disc: "Específicas", subject: "Videoaula — atributos na rua", do: "Assista à aula de atributos. Ligue cada atributo a apreensão e interdição.", video: "atributosTossan" },
      { id: "s2", when: "19:10–19:20", mins: 10, disc: "Específicas", subject: "Recuperação ativa", do: "Feche. Defina ato simples, complexo e composto em uma frase cada." },
      { id: "s3", when: "19:20–19:50", mins: 30, disc: "Específicas", subject: "Questões — atos", do: "Filtro: Específicas → Atos. Resolva 12 questões (elementos, atributos, classificação, extinção).", q: { disc: "Específicas", topic: "Atos", n: 12 } },
      { id: "s4", when: "20:00–20:10", mins: 10, disc: "Português", subject: "Videoaula — crase", do: "Se ainda não viu a aula de crase, assista agora. Se já viu, pule para as questões.", video: "crase" },
      { id: "s5", when: "20:10–20:50", mins: 40, disc: "Português", subject: "Questões — crase e pontuação", do: "Filtro: Português → Crase e Pontuação. Resolva 10 questões.", q: { disc: "Português", topics: ["Crase", "Pontuação"], n: 10 } },
      { id: "s6", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Homologação + 8 prazos", do: "Após 17h: conferir inscrição homologada no site da banca. Recitar 8 prazos da 946. Registrar erros.", href: "https://concursos.ibdoprojetos.org.br/informacoes/107", hrefLabel: "Abrir página do certame IBDO" }
    ]
  },
  "2026-11-10": {
    weekday: "Terça-feira", longDate: "10 de novembro de 2026", discs: "Lei 946 e CF servidores",
    phase: "Fase 2",
    goal: "Cruzar provimento/vacância da 946 com Arts. 37–41. Anote as divergências CF × estatuto.",
    result: "Listar as 7 formas de provimento e as hipóteses de vacância; dizer que exoneração não é penalidade.",
    objectives: ["Listar as 7 formas de provimento (Art. 20) e as hipóteses de vacância (Art. 49).", "Dizer que exoneração não é penalidade (Art. 217).", "Comparar estabilidade CF Art. 41 com Lei 946 Arts. 39/47."],
    videos: [v("cf3741")],
    qNeed: 16, qTopics: ["Provimento", "Vacância", "Nomeação", "Estabilidade", "CF 37", "Servidores CF", "Provimento CF"],
    readings: [
      { disc: "Lei 946", title: "Provimento e vacância", text: "Arts. 20–32 e 49. Nomeação, recondução, reintegração, reversão, aproveitamento, promoção, readaptação. Vacância: exoneração, demissão, readaptação, aposentadoria, falecimento, posse em cargo inacumulável.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", arts: "Arts. 20–32 e 49" },
      { disc: "CF", title: "Servidores", text: "Arts. 37–41: concurso, acumulação, estabilidade.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 37–41" }
    ],
    recall: ["Cite as 7 formas de provimento.", "Exoneração é penalidade?", "Estabilidade na CF exige quantos anos de efetivo exercício?"],
    steps: [
      { id: "s1", when: "19:00–19:20", mins: 20, disc: "Legislação", subject: "Leitura — Arts. 20 e 49", do: "Abra a Lei 946. Art. 20 (7 formas) e Art. 49 (vacância). Marque: exoneração esvazia o cargo; demissão é pena (Art. 217).", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", hrefLabel: "Abrir Lei 946/2014 (PDF Tanguá)" },
      { id: "s2", when: "19:20–19:30", mins: 10, disc: "Legislação", subject: "Recuperação ativa", do: "Feche. Liste as 7 formas e as 6 hipóteses de vacância de memória." },
      { id: "s3", when: "19:30–19:50", mins: 20, disc: "Legislação", subject: "Questões — provimento e vacância", do: "Filtro: Legislação → Provimento, Vacância, Nomeação, Estabilidade. Resolva 8 questões.", q: { disc: "Legislação", topics: ["Provimento", "Vacância", "Nomeação", "Estabilidade"], n: 8 } },
      { id: "s4", when: "20:00–20:15", mins: 15, disc: "Específicas", subject: "Leitura — CF 37–41", do: "Abra a CF. Compare Art. 41 (3 anos de efetivo exercício, concurso) com Lei 946 Arts. 39 e 47. Anote divergências no caderno — a banca costuma cruzar texto constitucional e estatuto local; não há evidência transcrita de prova IBDO neste cruzamento.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", hrefLabel: "Abrir Constituição Federal" },
      { id: "s5", when: "20:15–20:50", mins: 35, disc: "Específicas", subject: "Questões — servidores CF", do: "Filtro: Específicas → CF 37, Servidores CF, Provimento CF. Resolva 8 questões.", q: { disc: "Específicas", topics: ["CF 37", "Servidores CF", "Provimento CF"], n: 8 } },
      { id: "s6", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Caderno de divergências", do: "Anote CF × Lei 946. Não invente prazo que não esteja no PDF." }
    ]
  },
  "2026-11-11": {
    weekday: "Quarta-feira", longDate: "11 de novembro de 2026", discs: "Direito Administrativo e Informática",
    phase: "Fase 2",
    goal: "Fechar improbidade, princípios, direta/indireta, bens e 10 questões de Windows/Office/hardware.",
    result: "Separar administração direta e indireta; acertar hardware; recitar LIMPE sem misturar razoabilidade.",
    objectives: ["Separar administração direta e indireta (autarquia, fundação, EP, SEM).", "Acertar hardware: scanner = entrada; RAM volátil; HD/SSD permanente.", "Recitar LIMPE sem misturar razoabilidade."],
    videos: [v("bens"), v("windowsClica")],
    qNeed: 20, qTopics: ["Improbidade", "Administração", "Bens públicos", "Informática", "CF 37"],
    readings: [
      { disc: "Admin", title: "Princípios, direta/indireta, bens, improbidade", text: "LIMPE no caput. Indireta: autarquia, fundação, empresa pública, sociedade de economia mista." },
      { disc: "Informática", title: "Windows, Office, hardware, segurança", text: "Atalhos, Word/Excel básico, scanner/RAM. Sem VBA." }
    ],
    recall: ["Autarquia é direta ou indireta?", "Razoabilidade está no caput do Art. 37?", "Alt+Tab faz o quê?"],
    steps: [
      { id: "s1", when: "19:00–19:10", mins: 10, disc: "Específicas", subject: "Leitura — direta e indireta", do: "Direta: órgãos da pessoa política. Indireta: autarquia, fundação pública, empresa pública, sociedade de economia mista. LIMPE no caput; razoabilidade não está no caput." },
      { id: "s2", when: "19:10–19:20", mins: 10, disc: "Específicas", subject: "Recuperação ativa", do: "Cite as 4 entidades da indireta. Recite LIMPE." },
      { id: "s3", when: "19:20–19:50", mins: 30, disc: "Específicas", subject: "Questões — admin", do: "Filtro: Específicas → Improbidade, Administração, Bens públicos, CF 37. Resolva 10 questões.", q: { disc: "Específicas", topics: ["Improbidade", "Administração", "Bens públicos", "CF 37"], n: 10 } },
      { id: "s4", when: "20:00–20:15", mins: 15, disc: "Informática", subject: "Videoaula — Windows", do: "Assista à aula. Anote Painel de controle, explorador e atalhos.", video: "windowsClica" },
      { id: "s5", when: "20:15–20:50", mins: 35, disc: "Informática", subject: "Questões — informática", do: "Filtro: Específicas → Informática. Resolva 10 questões (Windows, Word, Excel básico, hardware, segurança).", q: { disc: "Específicas", topic: "Informática", n: 10 } },
      { id: "s6", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Atalhos na parede", do: "Atalhos que errou viram lista visível. Caderno de erros." }
    ]
  },
  "2026-11-12": {
    weekday: "Quinta-feira", longDate: "12 de novembro de 2026", discs: "Lei Orgânica e Português",
    phase: "Fase 2",
    goal: "LOM (competências, processo legislativo municipal) e 10 questões de orações/concordância.",
    result: "Identificar competências do Município, Prefeito e Câmara no texto da LOM; acertar haver/fazer e aposto.",
    objectives: ["Identificar competências do Município, Prefeito e Câmara no texto da LOM — sem artigo inventado.", "Acertar concordância verbal (haver/fazer/existir) e aposto com duas vírgulas."],
    videos: [v("morfologia"), v("crase")],
    qNeed: 18, qTopics: ["Lei Orgânica", "Concordância", "Pontuação", "Sintaxe"],
    readings: [
      { disc: "LOM", title: "Lei Orgânica de Tanguá", text: "Competências, processo legislativo municipal, Administração Municipal. Só o PDF.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", arts: "Arts. 20, 43, 69, 94" },
      { disc: "PT", title: "Orações e concordância", text: "Coordenadas e subordinadas; haver/fazer; aposto." }
    ],
    recall: ["Quem exerce o Legislativo em Tanguá?", "Qual o quórum de emenda à LOM?", "Fazem dois anos: certo ou errado?"],
    steps: [
      { id: "s1", when: "19:00–19:25", mins: 25, disc: "Legislação", subject: "Leitura — LOM Arts. 20, 43, 69, 94", do: "Abra o PDF. Art. 20 (Município), Art. 43 (Câmara, legislatura de 4 anos), Art. 69 (emenda: proposta de 2/3, dois turnos, interstício de 10 dias, aprovação por 2/3; também Prefeito e 5% do eleitorado), Art. 94 (Prefeito: sancionar, promulgar, vetar). Sem artigo inventado.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", hrefLabel: "Abrir Lei Orgânica de Tanguá" },
      { id: "s2", when: "19:25–19:35", mins: 10, disc: "Legislação", subject: "Recuperação ativa", do: "Feche. Diga competências do Município, da Câmara e do Prefeito sem olhar." },
      { id: "s3", when: "19:35–19:50", mins: 15, disc: "Legislação", subject: "Questões — LOM", do: "Filtro: Legislação → Lei Orgânica. Resolva 8 questões.", q: { disc: "Legislação", topic: "Lei Orgânica", n: 8 } },
      { id: "s4", when: "20:00–20:10", mins: 10, disc: "Português", subject: "Videoaula — classes", do: "Assista ao recorte de classes (substantivo, adjetivo, conjunção, preposição). Se já viu, vá às questões.", video: "morfologia" },
      { id: "s5", when: "20:10–20:50", mins: 40, disc: "Português", subject: "Questões — sintaxe e concordância", do: "Filtro: Português → Sintaxe, Concordância, Pontuação. Resolva 10 questões.", q: { disc: "Português", topics: ["Sintaxe", "Concordância", "Pontuação"], n: 10 } },
      { id: "s6", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Caderno", do: "Registre erros. Sem tema novo." }
    ]
  },
  "2026-11-13": {
    weekday: "Sexta-feira", longDate: "13 de novembro de 2026", discs: "Constitucional, ética e Anexo I",
    phase: "Fase 2",
    goal: "12 questões de CF 1º–5º/37 e marcar o que NÃO é Posturas (Tributos e Meio Ambiente).",
    result: "Recitar fundamentos do Art. 1º; dizer que ISS não é de Posturas; citar circo com engenheiro habilitado.",
    objectives: ["Recitar fundamentos do Art. 1º e Poderes do Art. 2º.", "Dizer que ISS e crédito tributário não são do Fiscal de Posturas.", "Citar circo: documento de engenheiro habilitado (Anexo I)."],
    videos: [v("limpe")],
    qNeed: 18, qTopics: ["CF 1º", "CF 5º", "CF 37", "Ética", "Anexo I"],
    readings: [
      { disc: "CF", title: "Princípios fundamentais e Art. 37", text: "Arts. 1º–5º e 37. Sem TCU/orçamento federal nesta noite.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 1º–5º e 37" },
      { disc: "Anexo I", title: "Atribuições do cargo 101", text: "Licenciamento, ambulante, feira, publicidade, horário, inflamáveis, apreensão, eventos, circo, denúncias. Não é Tributos nem Meio Ambiente." }
    ],
    recall: ["Cite os fundamentos do Art. 1º.", "ISS é atribuição de qual fiscal?", "O que o Anexo I exige para circo?"],
    steps: [
      { id: "s1", when: "19:00–19:15", mins: 15, disc: "Específicas", subject: "Leitura — Arts. 1º, 2º, 5º, 37", do: "Art. 1º (fundamentos; pluralismo político; soberania). Art. 2º (três Poderes). Art. 5º remédios. Art. 37 LIMPE. Sem TCU nesta noite.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", hrefLabel: "Abrir Constituição Federal" },
      { id: "s2", when: "19:15–19:50", mins: 35, disc: "Específicas", subject: "Questões — CF", do: "Filtro: Específicas → CF 1º, CF 5º, CF 37. Resolva 10 questões.", q: { disc: "Específicas", topics: ["CF 1º", "CF 5º", "CF 37"], n: 10 } },
      { id: "s3", when: "20:00–20:20", mins: 20, disc: "Específicas", subject: "Leitura integral do Anexo I", do: "Leia as atribuições do Fiscal de Posturas. Marque o que NÃO é: lançar ISS, constituir crédito tributário, embargo ambiental. Marque o que é: licença comercial, ambulante, feira, banca, publicidade, horário, inflamáveis, apreensão, eventos, circo (engenheiro habilitado), denúncias e relatórios." },
      { id: "s4", when: "20:20–20:50", mins: 30, disc: "Específicas", subject: "Questões — ética e Anexo I", do: "Filtro: Específicas → Ética e Anexo I. Resolva 8 questões.", q: { disc: "Específicas", topics: ["Ética", "Anexo I"], n: 8 } },
      { id: "s5", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Armadilhas entre os três fiscais", do: "Em voz alta: Posturas × Tributos × Meio Ambiente. Caderno." }
    ]
  },
  "2026-11-14": {
    weekday: "Sábado", longDate: "14 de novembro de 2026", discs: "Específicas (peso 4) e legislação grifada",
    phase: "Fase 2",
    goal: "36 questões de específicas + leitura integral dos grifos da 946 e da LOM.",
    result: "Manter ritmo de questão (teoria só do que errou) e passar os grifos sem reler o estatuto inteiro.",
    objectives: ["Manter ritmo de questão: teoria só do que errou.", "Passar os grifos da 946 e da LOM sem reler o estatuto inteiro.", "Fazer 15 flashcards de competências, vedações, prazos e quóruns."],
    videos: [v("atosFocus"), v("atributosTossan", "complementar")],
    qNeed: 36, qTopics: ["Atos", "CF 37", "Informática", "Ética", "Improbidade"],
    readings: [
      { disc: "Específicas", title: "Admin, Constitucional, Informática, Ética", text: "Volume. Teoria só da questão errada." },
      { disc: "Leis", title: "Grifos da Lei 946 e da LOM", text: "Só o que já está grifado.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf" }
    ],
    recall: ["Anulação × revogação, de memória.", "Cite 3 atribuições que NÃO são de Posturas.", "Quórum de emenda à LOM?"],
    steps: [
      { id: "s1", when: "07:30–09:30", mins: 120, disc: "Específicas", subject: "Maratona peso 4", do: "Filtro: Específicas. Resolva 24 questões nesta ordem sugerida: Atos 8, CF 37 6, Informática 6, Ética/Improbidade 4. Teoria só da que errar. Não misture Português neste bloco.", q: { disc: "Específicas", topics: ["Atos", "CF 37", "Informática", "Ética", "Improbidade"], n: 24 } },
      { id: "s2", when: "10:00–12:00", mins: 120, disc: "Legislação", subject: "Grifos da 946 e da LOM", do: "Abra os PDFs. Passe somente os trechos já grifados. Se um prazo não estiver na tabela, acrescente agora.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", hrefLabel: "Abrir Lei 946/2014 (PDF Tanguá)" },
      { id: "s3", when: "14:00–16:00", mins: 120, disc: "Revisão", subject: "Flashcards + 12 questões restantes", do: "15 perguntas rápidas (competências, vedações, prazos, quóruns). Depois 12 questões de Específicas nos temas fracos do caderno.", q: { disc: "Específicas", topics: ["Atos", "CF 37", "Informática"], n: 12 } }
    ]
  },
  "2026-11-15": {
    weekday: "Domingo", longDate: "15 de novembro de 2026", discs: "Português e simulado 2",
    phase: "Fase 2",
    goal: "16 questões de PT + simulado 2 no formato da prova. Os 5 temas que mais derrubam mandam na semana 3.",
    result: "Entregar o simulado 2, comparar com o 1 e listar os 5 temas fracos.",
    objectives: ["Fechar interpretação, crase, pontuação, concordância e regência em volume.", "Entregar o simulado 2 (após ≥60 anos: específicas, depois PT, legislação e idade).", "Listar os 5 temas fracos."],
    videos: [v("interpTossan"), v("figuras")],
    qNeed: 16, qTopics: ["Interpretação", "Crase", "Pontuação", "Concordância", "Regência"],
    sim: 2,
    readings: [
      { disc: "PT", title: "Interpretação e gramática de prova", text: "Interpretação, crase, pontuação, concordância, regência." }
    ],
    recall: ["Quais 5 temas mais derrubaram você?", "A ordem do simulado foi específicas primeiro?", "Metonímia ou metáfora em A Câmara aprovou a lei?"],
    steps: [
      { id: "s1", when: "07:30–07:50", mins: 20, disc: "Português", subject: "Videoaula — interpretação", do: "Assista à aula. Acompanhe o método de leitura do enunciado até o fim.", video: "interpTossan" },
      { id: "s2", when: "07:50–09:30", mins: 100, disc: "Português", subject: "Questões — PT", do: "Filtro: Português → Interpretação, Crase, Pontuação, Concordância, Regência. Resolva 16 questões.", q: { disc: "Português", topics: ["Interpretação", "Crase", "Pontuação", "Concordância", "Regência"], n: 16 } },
      { id: "s3", when: "10:00–11:30", mins: 90, disc: "Simulado", subject: "Simulado 2 — formato da prova", do: "Aba Simulados. 30 questões, 10+10+10, A–D, máximo 3 horas. Sem consulta. Critério de desempate do edital (idade ≥60 anos): específicas, depois PT, legislação e idade — use só se precisar desempate, não para estudar fora do Anexo II." },
      { id: "s4", when: "14:00–16:00", mins: 120, disc: "Correção", subject: "Caderno + 5 temas fracos", do: "Corrija ficha a ficha. Liste os 5 temas que mais derrubam. Esses temas mandam na semana 3. Não marque concluído antes da correção." }
    ]
  },
  "2026-11-16": {
    weekday: "Segunda-feira", longDate: "16 de novembro de 2026", discs: "Admin (revisão) e regime disciplinar",
    phase: "Fase 3 · Precisão",
    goal: "Quadro-resumo de atos/provimento/bens. Sem material novo. Só fichas vermelhas.",
    result: "Redigir de memória anulação × revogação, 7 provimentos e 3 bens; recitar prazos disciplinares.",
    objectives: ["Redigir de memória: anulação × revogação; 7 provimentos; 3 bens.", "Recitar sindicância 30+30, PAD 60+60, abandono >30, inassiduidade 60/12.", "Revisar só o caderno vermelho."],
    videos: [v("atributosPureza")],
    qNeed: 10, qTopics: ["Atos", "PAD", "Abandono", "Prescrição", "Penalidades"],
    readings: [
      { disc: "Admin", title: "Quadro-resumo", text: "Sem material novo. Só o que já estudou." },
      { disc: "Lei 946", title: "Regime disciplinar e prazos", text: "Arts. 217, 231, 232, 239, 242, 271.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", arts: "Arts. 217, 231, 232, 239, 242, 271" }
    ],
    recall: ["Sindicância: prazo?", "PAD: prazo e composição da comissão?", "Advertência prescreve em quanto tempo?"],
    steps: [
      { id: "s1", when: "19:00–19:20", mins: 20, disc: "Específicas", subject: "Quadro-resumo de memória", do: "Sem material novo. Escreva: anulação × revogação; 7 provimentos; 3 espécies de bens. Confira depois com o caderno." },
      { id: "s2", when: "19:20–19:50", mins: 30, disc: "Específicas", subject: "Fichas vermelhas — atos", do: "Abra o caderno de erros. Resolva até 8 questões de Atos que você já errou (filtro: erradas), se houver. Senão, 8 novas de Atos.", q: { disc: "Específicas", topic: "Atos", n: 8 } },
      { id: "s3", when: "20:00–20:20", mins: 20, disc: "Legislação", subject: "Leitura — Arts. 217, 231, 232, 242, 271", do: "Penalidades (217; exoneração não está). Sindicância 30+30. Abandono >30 consecutivos; inassiduidade 60 interpolados/12 meses. PAD 60+60, 3 efetivos. Prescrição: 5 anos / 2 anos / 180 dias.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-0946-2014.pdf", hrefLabel: "Abrir Lei 946/2014 (PDF Tanguá)" },
      { id: "s4", when: "20:20–20:50", mins: 30, disc: "Legislação", subject: "Questões — disciplinar", do: "Filtro: Legislação → PAD, Abandono, Prescrição, Penalidades. Resolva 8 questões.", q: { disc: "Legislação", topics: ["PAD", "Abandono", "Prescrição", "Penalidades"], n: 8 } },
      { id: "s5", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Só fichas vermelhas", do: "Caderno. Sem matéria nova." }
    ]
  },
  "2026-11-17": {
    weekday: "Terça-feira", longDate: "17 de novembro de 2026", discs: "CF seca e Português dos erros",
    phase: "Fase 3",
    goal: "Leitura seca dos Arts. 1º–5º, 29–31 e 37–41. Após 17h: local de prova no site da banca.",
    result: "Ler os artigos sem resumo de terceiro; treinar só PT fraco; anotar local, horário e rota.",
    objectives: ["Ler os artigos sem resumo de terceiro.", "Treinar só os tópicos de PT que mais errou nos simulados.", "Anotar local, horário e rota. Documento físico original."],
    videos: [v("cf3741")],
    qNeed: 10, qTopics: ["CF 1º", "CF 5º", "Municípios", "CF 37"],
    readings: [
      { disc: "CF", title: "Texto seco", text: "Arts. 1º–5º, 29–31 e 37–41, sem resumo de terceiro.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", arts: "Arts. 1º–5º, 29–31 e 37–41" },
      { disc: "PT", title: "Tópicos fracos", text: "Somente o que os simulados derrubaram." }
    ],
    recall: ["Onde é a prova e a que horas fecham os portões?", "Art. 29: quórum da lei orgânica?", "Qual tópico de PT ainda derruba você?"],
    steps: [
      { id: "s1", when: "19:00–19:35", mins: 35, disc: "Específicas", subject: "Leitura seca da CF", do: "Abra o Planalto. Leia Arts. 1º–5º, 29–31 e 37–41 no texto. Sem resumo. Sem TCU aprofundado.", href: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", hrefLabel: "Abrir Constituição Federal" },
      { id: "s2", when: "19:35–19:50", mins: 15, disc: "Específicas", subject: "Questões — CF", do: "Filtro: Específicas → CF 1º, CF 5º, Municípios, CF 37. Resolva 8 questões.", q: { disc: "Específicas", topics: ["CF 1º", "CF 5º", "Municípios", "CF 37"], n: 8 } },
      { id: "s3", when: "20:00–20:50", mins: 50, disc: "Português", subject: "Só os tópicos fracos", do: "Abra o caderno dos simulados. Estude somente o tipo que mais errou (crase, concordância, pontuação ou interpretação). Resolva 8 questões desse tipo. Sem tema novo de gramática.", q: { disc: "Português", topics: ["Crase", "Concordância", "Pontuação", "Interpretação"], n: 8 } },
      { id: "s4", when: "20:50–21:10", mins: 20, disc: "Prova", subject: "Local, horário e rota", do: "Após 17h: local de prova e relação candidato x vaga em ibdoprojetos.org.br. Anote endereço, fechamento dos portões, rota e documento original físico. Sem documento no celular.", href: "https://concursos.ibdoprojetos.org.br/informacoes/107", hrefLabel: "Abrir página do certame IBDO" }
    ]
  },
  "2026-11-18": {
    weekday: "Quarta-feira", longDate: "18 de novembro de 2026", discs: "Lei Orgânica e Informática",
    phase: "Fase 3",
    goal: "Competências do Município/Prefeito/Câmara + atalhos Windows/Office/Chrome.",
    result: "Dizer o que é competência do Município sem citar artigo não conferido; acertar hardware e atalhos.",
    objectives: ["Dizer o que é competência do Município sem citar artigo não conferido.", "Acertar hardware (scanner/RAM) e atalhos de Windows.", "Passar o caderno de erros da informática."],
    videos: [v("windowsRomilton"), v("windowsClica", "complementar")],
    qNeed: 16, qTopics: ["Lei Orgânica", "Informática", "Municípios"],
    readings: [
      { disc: "LOM", title: "Competências", text: "Município, Prefeito e Câmara. Só o PDF.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", arts: "Arts. 20, 43, 94" },
      { disc: "Informática", title: "Atalhos e hardware", text: "Windows/Office/Chrome + scanner/RAM/backup." }
    ],
    recall: ["Compete ao Município legislar sobre o quê?", "RAM é volátil?", "Modo anônimo do Chrome garante anonimato absoluto?"],
    steps: [
      { id: "s1", when: "19:00–19:20", mins: 20, disc: "Legislação", subject: "Leitura — LOM", do: "Arts. 20, 43 e 94. Sem artigo não conferido.", href: "https://tangua.rj.gov.br/wp-content/uploads/2025/10/Lei-Organica-Municipal.pdf", hrefLabel: "Abrir Lei Orgânica de Tanguá" },
      { id: "s2", when: "19:20–19:50", mins: 30, disc: "Legislação", subject: "Questões — LOM e Municípios", do: "Filtro: Legislação → Lei Orgânica. Resolva 8 questões.", q: { disc: "Legislação", topic: "Lei Orgânica", n: 8 } },
      { id: "s3", when: "20:00–20:15", mins: 15, disc: "Informática", subject: "Videoaula — Windows", do: "Se ainda não viu, assista. Se já viu, revise a lista de atalhos.", video: "windowsRomilton" },
      { id: "s4", when: "20:15–20:50", mins: 35, disc: "Informática", subject: "Questões — informática", do: "Filtro: Específicas → Informática. Resolva 8 questões. Priorize as que já errou.", q: { disc: "Específicas", topic: "Informática", n: 8 } },
      { id: "s5", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Caderno de informática", do: "Atalhos e hardware que errou. Sem matéria nova." }
    ]
  },
  "2026-11-19": {
    weekday: "Quinta-feira", longDate: "19 de novembro de 2026", discs: "Improbidade, ética, Anexo I e Português",
    phase: "Fase 3",
    goal: "Última passagem em improbidade/ética/atribuições e 10 questões de crase/concordância/regência.",
    result: "Comparar Posturas × Tributos × Meio Ambiente; acertar 10 itens de gramática; última passagem nos prazos.",
    objectives: ["Comparar Posturas × Tributos × Meio Ambiente em voz alta.", "Acertar 10 itens de crase, concordância, regência e conjunções.", "Última passagem nos prazos da 946."],
    videos: [v("bens"), v("figuras")],
    qNeed: 18, qTopics: ["Improbidade", "Ética", "Anexo I", "Crase", "Concordância", "Regência", "Coesão"],
    readings: [
      { disc: "Específicas", title: "Improbidade, ética e Anexo I", text: "Dolo; deveres; o que não é Posturas." },
      { disc: "PT", title: "Crase, concordância, regência, conjunções", text: "Só gramática de prova." }
    ],
    recall: ["Improbidade exige dolo?", "Presente de fiscalizado: permitido?", "Contudo expressa o quê?"],
    steps: [
      { id: "s1", when: "19:00–19:15", mins: 15, disc: "Específicas", subject: "Revisão — improbidade, ética, Anexo I", do: "Dolo após 14.230. Presente em razão da função é proibido (Lei 946 Art. 205, XII). Anexo I: Posturas não lança ISS." },
      { id: "s2", when: "19:15–19:50", mins: 35, disc: "Específicas", subject: "Questões", do: "Filtro: Específicas → Improbidade, Ética, Anexo I. Resolva 8 questões.", q: { disc: "Específicas", topics: ["Improbidade", "Ética", "Anexo I"], n: 8 } },
      { id: "s3", when: "20:00–20:50", mins: 50, disc: "Português", subject: "Questões — gramática de prova", do: "Filtro: Português → Crase, Concordância, Regência, Coesão. Resolva 10 questões.", q: { disc: "Português", topics: ["Crase", "Concordância", "Regência", "Coesão"], n: 10 } },
      { id: "s4", when: "20:50–21:10", mins: 20, disc: "Fechamento", subject: "Última passagem nos prazos", do: "Recite a tabela da 946 sem olhar. Caderno." }
    ]
  },
  "2026-11-20": {
    weekday: "Sexta-feira", longDate: "20 de novembro de 2026", discs: "Caderno de erros e específicas",
    phase: "Fase 3",
    goal: "Consciência Negra: se folgar, 5h30 no caderno + 24 específicas. Se trabalhar, só 19:00–21:10. Sem matéria nova.",
    result: "Zerar fichas vermelhas; revisar tabelas de prazos; 16 a 24 específicas, sem tema novo.",
    objectives: ["Zerar fichas vermelhas do caderno.", "Revisar tabelas de prazos da 946 e da LOM.", "Fazer 16 a 24 específicas, sem tema novo."],
    videos: [v("atosFocus")],
    qNeed: 24, qTopics: ["Atos", "CF 37", "Anexo I", "Informática"],
    readings: [
      { disc: "Caderno", title: "Erros inteiros + tabelas de prazos", text: "Sem matéria nova." }
    ],
    recall: ["Quais fichas ainda estão vermelhas?", "Posse e exercício, de memória?", "O que você não vai estudar de novo hoje?"],
    steps: [
      { id: "s1", when: "Folga 07:30–12:00", mins: 270, disc: "Caderno", subject: "Erros + prazos", do: "Se folgar: caderno de erros inteiro + tabelas de prazos da 946 e da LOM. Sem matéria nova. Se trabalhar, pule para a etapa da noite." },
      { id: "s2", when: "Folga 14:00–16:00", mins: 120, disc: "Específicas", subject: "24 questões de específicas", do: "Filtro: Específicas → Atos, CF 37, Anexo I, Informática. Resolva 24. Teoria só do erro.", q: { disc: "Específicas", topics: ["Atos", "CF 37", "Anexo I", "Informática"], n: 24 } },
      { id: "s3", when: "Se trabalhar 19:00–21:10", mins: 130, disc: "Caderno", subject: "Versão noite", do: "Se trabalhar: caderno de erros + 16 específicas. Sem matéria nova.", q: { disc: "Específicas", topics: ["Atos", "CF 37", "Anexo I", "Informática"], n: 16 } }
    ]
  },
  "2026-11-21": {
    weekday: "Sábado", longDate: "21 de novembro de 2026", discs: "Revisão leve",
    phase: "Fase 3",
    goal: "Só resumos de manhã. Tarde e noite livres. Dormir 21:30. Sem questão nova.",
    result: "Relembrar atos, bens, prazos, atribuições e crase. Separar documento e caneta. Não abrir material novo.",
    objectives: ["Relembrar atos, bens, prazos da 946, atribuições, crase/conjunções.", "Separar RG/CNH físico, CCI, caneta transparente azul ou preta.", "Não abrir material novo."],
    videos: [],
    qNeed: 0, qTopics: [],
    readings: [
      { disc: "Resumos", title: "Só o caderno", text: "Atos, bens públicos, prazos da 946, atribuições, crase/conjunções. Sem questão nova." }
    ],
    recall: ["Documento original está separado?", "Caneta transparente?", "Horário de dormir: 21:30?"],
    steps: [
      { id: "s1", when: "08:00–11:00", mins: 180, disc: "Revisão leve", subject: "Só resumos", do: "Só resumos: atos, bens públicos, prazos da 946, atribuições, crase/conjunções. Sem questão nova. Sem vídeo novo. Sem PDF novo." },
      { id: "s2", when: "Tarde e noite", mins: 0, disc: "Descanso", subject: "Logística e sono", do: "Descanso. Separe RG/CNH físico, CCI, caneta esferográfica azul ou preta de corpo transparente. Dormir 21:30. Sem conteúdo novo." }
    ]
  },
  "2026-11-22": {
    weekday: "Domingo", longDate: "22 de novembro de 2026", discs: "Prova",
    phase: "Prova",
    goal: "Hoje é o dia da prova. Sem conteúdo novo e sem simulado.",
    result: "Chegar 1 hora antes do fechamento dos portões, com documento original físico.",
    objectives: ["Chegar 1 hora antes do fechamento dos portões.", "Documento original físico com foto. Sem documento no celular.", "Específicas primeiro (peso 4), depois legislação, Português por último.", "Não deixar em branco: chute consciente nos últimos 10 min."],
    videos: [],
    qNeed: 0, qTopics: [],
    exam: true,
    readings: [

    ],
    recall: ["Documento original físico?", "Estratégia: específicas primeiro?", "Não deixar em branco?"],
    steps: [
      { id: "s1", when: "Manhã", mins: 60, disc: "Prova", subject: "Chegada", do: "Chegue 1 hora antes do fechamento dos portões. Documento original físico com foto. Sem documento no celular. Local conforme divulgação de 17/11 em ibdoprojetos.org.br.", href: "https://concursos.ibdoprojetos.org.br/informacoes/107", hrefLabel: "Abrir página do certame IBDO" },
      { id: "s2", when: "Prova", mins: 180, disc: "Prova", subject: "Estratégia", do: "30 questões, 4 alternativas A–D, 3 horas, mínimo 40/80. Faça primeiro as 10 específicas (peso 4). Depois legislação. Português por último, começando pelos textos. Não deixe em branco: chute consciente nos últimos 10 min." }
    ]
  }
};

function dayQs(plan, filter) {
  if (typeof BANK === "undefined") return [];
  const f = filter || {};
  const topics = f.topics || (f.topic ? [f.topic] : (plan && plan.qTopics) || []);
  if (!topics.length) return [];
  const keys = topics.map((t) => String(t).toLowerCase());
  return BANK.filter((q) => {
    if (f.disc && q.disc !== f.disc) return false;
    const blob = (q.topic + " " + (q.sub || "") + " " + (q.art || "")).toLowerCase();
    return keys.some((k) => blob.indexOf(k.toLowerCase()) >= 0 || q.topic.toLowerCase() === k);
  });
}

function stepIds(plan) {
  return ((plan && plan.steps) || []).map((s) => "st-" + s.id);
}

function checkIds(plan) {
  return CHECK_ITEMS.map((c) => c.id).concat(stepIds(plan));
}

function dayProgress(id) {
  const all = loadDayCheck();
  const rec = all[id] || {};
  const plan = DAY_PLAN[id] || {};
  const steps = stepIds(plan);
  const legacyN = CHECK_ITEMS.filter((c) => rec[c.id]).length;
  const stepN = steps.filter((sid) => rec[sid]).length;
  const total = CHECK_ITEMS.length + steps.length;
  const n = legacyN + stepN;
  const pct = total ? Math.round(n * 100 / total) : 0;
  return { rec, n, pct, legacyN, stepN, stepTotal: steps.length, total };
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

function openQuestoesFilter(disc, topics, dayId) {
  if (typeof qFilter !== "undefined") qFilter = disc || "all";
  if (typeof qTopic !== "undefined") qTopic = (topics && topics.length === 1) ? topics[0] : "all";
  if (typeof qSub !== "undefined") qSub = "all";
  if (typeof qIndex !== "undefined") qIndex = 0;
  if (typeof qPick !== "undefined") qPick = null;
  if (typeof qEdital !== "undefined") qEdital = null;
  if (window.TFPlatform) window.TFPlatform.tfSetOrigin("cronograma", dayId || null);
  location.hash = "";
  openPanel("questoes");
  if (typeof renderQuestoes === "function") renderQuestoes();
}

function escHtml(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
  const wrongQs = doneQs.filter((q) => ans[q.id].ok === false);
  const pctQ = doneQs.length ? Math.round(okQs.length * 100 / doneQs.length) : 0;
  const cad = typeof loadCaderno === "function" ? loadCaderno() : [];
  const dueCad = cad.filter((c) => c.due <= Date.now());
  const st = dayStatus(day);
  const hashUrl = location.href.split("#")[0] + "#dia-" + id;
  const steps = plan.steps || [];
  const minsSum = steps.reduce((a, s) => a + (s.mins || 0), 0);

  const navHtml = `
    <div class="dia-nav">
      <button type="button" class="btn" data-back-cal>Voltar ao cronograma</button>
      ${prev ? `<button type="button" class="btn" data-go-dia="${prev.id}">Dia anterior · ${prev.date}</button>` : ""}
      ${next ? `<button type="button" class="btn" data-go-dia="${next.id}">Próximo dia · ${next.date}</button>` : ""}
      <button type="button" class="btn" data-copy="${escHtml(hashUrl)}">Copiar endereço deste dia</button>
      <button type="button" class="btn" data-go-q>Abrir Questões</button>
      <button type="button" class="btn" data-go-cad>Abrir caderno de erros</button>
    </div>`;

  if (plan.exam) {
    box.innerHTML = navHtml + `
      <article class="card good dia-head">
        <p class="phase">${escHtml(plan.weekday)} · ${escHtml(plan.longDate)}</p>
        <h2>Hoje é o dia da sua prova!</h2>
        <p>Fiscal de Posturas · Tanguá/RJ · IBDO · 3 horas · 30 questões A–D · mínimo 40 / 80.</p>
        <p>Local: conforme divulgação de 17/11 em ibdoprojetos.org.br. Confirme o endereço e o fechamento dos portões.</p>
      </article>
      <ol class="dia-steps">
        ${(plan.steps || []).map((s, i) => `
          <li class="dia-step">
            <div class="dia-step-num">${i + 1}</div>
            <div class="dia-step-body">
              <p class="when">${escHtml(s.when)} · ${escHtml(s.disc)}</p>
              <h3>${escHtml(s.subject)}</h3>
              <p>${escHtml(s.do)}</p>
              ${s.href ? `<p><a class="btn gold" href="${s.href}" target="_blank" rel="noopener">${escHtml(s.hrefLabel || "Abrir")}</a></p>` : ""}
              <label class="check"><input type="checkbox" data-dc="st-${s.id}" ${p.rec["st-" + s.id] ? "checked" : ""}/> Etapa ${i + 1} concluída</label>
            </div>
          </li>`).join("")}
      </ol>
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
    `;
    bindDiaNav(box, id);
    return;
  }

  const stepHtml = steps.map((s, i) => {
    const vid = s.video ? VLIB[s.video] : null;
    const qf = s.q;
    const qList = qf ? dayQs(plan, qf) : [];
    const qN = qf && qf.n ? qf.n : 0;
    const actions = [];
    if (s.href) actions.push(`<a class="btn gold" href="${s.href}" target="_blank" rel="noopener">${escHtml(s.hrefLabel || "Abrir documento")}</a>`);
    if (vid) actions.push(`<a class="btn gold" href="https://www.youtube.com/watch?v=${vid.id}" target="_blank" rel="noopener">Assistir no YouTube</a>`);
    if (qf) {
      const topics = qf.topics || (qf.topic ? [qf.topic] : []);
      actions.push(`<button type="button" class="btn gold" data-qdisc="${escHtml(qf.disc || "")}" data-qtopics="${escHtml(topics.join("|"))}">Abrir Questões filtradas</button>`);
    }
    if (plan.sim && s.disc === "Simulado") {
      actions.push(`<button type="button" class="btn gold" data-go-sim="${plan.sim}">Abrir simulado ${plan.sim}</button>`);
    }
    return `
      <li class="dia-step ${p.rec["st-" + s.id] ? "done" : ""}">
        <div class="dia-step-num">${i + 1}</div>
        <div class="dia-step-body">
          <p class="when">${escHtml(s.when)}${s.mins ? " · " + s.mins + " min" : ""} · ${escHtml(s.disc)}</p>
          <h3>Etapa ${i + 1} — ${escHtml(s.subject)}</h3>
          <p>${escHtml(s.do)}</p>
          ${s.noVideo ? `<p class="tree-meta">Não foi localizada uma videoaula específica e confiável para este assunto. Utilize a leitura indicada e prossiga para os exercícios.</p>` : ""}
          ${vid ? `<div class="yt-card">
            <p class="phase">${vid.kind === "complementar" ? "Complementar" : "Obrigatória"} · ${escHtml(vid.subject)}</p>
            <h3>${escHtml(vid.title)}</h3>
            <p>${escHtml(vid.author)} · ${escHtml(vid.channel)}</p>
            <p>O que observar: ${escHtml(vid.watch)}</p>
            <p class="tree-meta">Duração: a que o YouTube exibir. Não inventei minuto.</p>
            <div class="yt-wrap">
              <iframe src="https://www.youtube-nocookie.com/embed/${vid.id}" title="${escHtml(vid.title)}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="q-nav">
              <button type="button" class="btn ${watched[vid.id] ? "gold" : ""}" data-watch="${vid.id}">${watched[vid.id] ? "Assistido" : "Marcar como assistido"}</button>
            </div>
          </div>` : ""}
          ${qf ? `<p class="tree-meta">Meta desta etapa: ${qN || "—"} questão(ões). Banco no filtro: ${qList.length}.</p>` : ""}
          ${actions.length ? `<div class="q-nav">${actions.join("")}</div>` : ""}
          <label class="check"><input type="checkbox" data-dc="st-${s.id}" ${p.rec["st-" + s.id] ? "checked" : ""}/> Etapa ${i + 1} concluída</label>
        </div>
      </li>`;
  }).join("");

  const readHtml = (plan.readings || []).map((r, i) => `
    <article class="card">
      <p class="phase">Leitura ${i + 1} · ${escHtml(r.disc)}</p>
      <h3>${escHtml(r.title || r.disc)}</h3>
      ${r.arts ? `<p><b>Trecho:</b> ${escHtml(r.arts)}</p>` : ""}
      <p>${escHtml(r.text)}</p>
      ${r.href ? `<p><a class="btn gold" href="${r.href}" target="_blank" rel="noopener">Abrir ${escHtml(r.title || "documento")}</a></p>` : ""}
    </article>`).join("") || "<article class='card'><p>Sem leitura nova.</p></article>";

  const vids = plan.videos || [];
  const vidLibHtml = vids.length ? vids.map((vid) => `
    <div class="yt-card">
      <p class="phase">${vid.kind === "complementar" ? "Complementar" : "Obrigatória"} · ${escHtml(vid.subject)}</p>
      <h3>${escHtml(vid.title)}</h3>
      <p>${escHtml(vid.author)} · ${escHtml(vid.channel)}</p>
      <p>O que observar: ${escHtml(vid.watch)}</p>
      <p class="tree-meta">Duração: a que o YouTube exibir. Não inventei minuto.</p>
      <div class="q-nav">
        <a class="btn gold" href="https://www.youtube.com/watch?v=${vid.id}" target="_blank" rel="noopener">Assistir no YouTube</a>
        <button type="button" class="btn ${watched[vid.id] ? "gold" : ""}" data-watch="${vid.id}">${watched[vid.id] ? "Assistido" : "Marcar como assistido"}</button>
      </div>
    </div>`).join("") : "<p>Sem videoaula cadastrada neste dia, ou a etapa correspondente pede só leitura.</p>";

  box.innerHTML = `
    ${navHtml}
    <article class="card dia-head ${day.id === todayIso() ? "good" : ""}">
      <p class="phase">${escHtml((plan.phase || day.phase || "").toUpperCase())}</p>
      <p class="kicker">${escHtml(plan.weekday)} · ${escHtml(plan.longDate)}</p>
      <h2>${escHtml(day.title)}</h2>
      <p>Concurso: Fiscal de Posturas – Tanguá/RJ. Banca: IBDO. Tempo previsto: ${escHtml(day.hours)}. ${escHtml(day.tag)}</p>
      <p>Disciplinas: ${escHtml(plan.discs)}</p>
      <p><b>Objetivo:</b> ${escHtml(plan.goal)}</p>
      ${plan.result ? `<p><b>Até o fim da sessão:</b> ${escHtml(plan.result)}</p>` : ""}
      <div class="prog"><i style="width:${p.pct}%"></i></div>
      <p class="tree-meta">Progresso: ${p.pct}% · ${p.stepN}/${p.stepTotal} etapas · ${p.legacyN}/${CHECK_ITEMS.length} checklist antigo · ${statusLabel(st)}${minsSum ? " · etapas somam " + minsSum + " min" : ""}</p>
    </article>
    <article class="card">
      <h3>Ao finalizar hoje, você deverá conseguir</h3>
      <ol>${(plan.objectives || []).map((o) => `<li>${escHtml(o)}</li>`).join("")}</ol>
    </article>
    <article class="card">
      <h3>Roteiro passo a passo</h3>
      <p class="tree-meta">Siga a ordem. Cada etapa tem horário, o que abrir, o que ler e o que fazer depois. Marque o checkbox só quando cumprir.</p>
      <ol class="dia-steps">${stepHtml}</ol>
    </article>
    <article class="card">
      <h3>Leituras indicadas</h3>
    </article>
    ${readHtml}
    <article class="card">
      <h3>Videoaulas deste dia</h3>
      ${vidLibHtml}
    </article>
    <article class="card">
      <h3>Questões deste dia</h3>
      <p>Meta do dia: ${plan.qNeed} questão(ões) no tema. Banco ligado: ${qs.length}. Resolvidas: ${doneQs.length}. Acertos: ${okQs.length}${doneQs.length ? " · " + pctQ + "%" : ""}. Erros registrados neste tema: ${wrongQs.length}.</p>
      ${plan.sim ? `<p>Há simulado ${plan.sim} programado. Abra a aba Simulados para o cronômetro de 3h.</p><button type="button" class="btn gold" data-go-sim="${plan.sim}">Abrir simulado ${plan.sim}</button>` : ""}
      ${qs.length ? `<ul class="q-list">${qs.slice(0, 12).map((q) => {
        const a = ans[q.id];
        const stq = a ? (a.ok ? "certo" : "errado") : "aberta";
        return `<li><button type="button" class="btn" data-open-q="${q.id}">${q.id}</button> ${escHtml(q.disc)} · ${escHtml(q.topic)} · ${stq}</li>`;
      }).join("")}${qs.length > 12 ? "<li>Mais " + (qs.length - 12) + " no banco, pelo filtro da aba Questões.</li>" : ""}</ul>
      <button type="button" class="btn gold" data-open-q="${qs[0].id}">Resolver a primeira do dia</button>` : "<p>Sem questão nova neste dia. Use o caderno de erros.</p>"}
      <p class="tree-meta">Não consulte o gabarito antes de responder. Depois: leia a justificativa da certa e das erradas, identifique se o erro foi desconhecimento, desatenção ou confusão, e registre no caderno.</p>
    </article>
    <article class="card">
      <h3>Revisão ativa — responda sem consultar</h3>
      <ol>${(plan.recall || []).map((r) => `<li>${escHtml(r)}</li>`).join("")}</ol>
    </article>
    <article class="card">
      <h3>Revisões para hoje</h3>
      ${dueCad.length ? `<ul>${dueCad.map((c) => `<li>${escHtml(c.disc)} · ${escHtml(c.topic)} · ${escHtml(c.id)} · ${escHtml(c.stem)}</li>`).join("")}</ul>` : "<p>Nenhuma ficha do caderno vence hoje. Não criei revisão de assunto que você ainda não errou.</p>"}
      <button type="button" class="btn" data-go-cad>Abrir caderno de erros</button>
    </article>
    <article class="card">
      <h3>Checklist antigo (compatível com o progresso já salvo)</h3>
      ${CHECK_ITEMS.map((c) => `<label class="check"><input type="checkbox" data-dc="${c.id}" ${p.rec[c.id] ? "checked" : ""}/> ${escHtml(c.label)}</label>`).join("")}
      <p class="tree-meta">Os checkboxes das etapas acima são novos (st-s1…). Os sete itens desta lista continuam válidos. Nada foi apagado.</p>
    </article>
    <article class="card">
      <h3>Resumo do dia</h3>
      <div class="dash dash-3">
        <p class="stat"><b>${p.stepN}/${p.stepTotal}</b><span>etapas</span></p>
        <p class="stat"><b>${doneQs.length}</b><span>questões resolvidas neste tema</span></p>
        <p class="stat"><b>${okQs.length}</b><span>acertos · ${wrongQs.length} erros</span></p>
      </div>
      <p>O que precisa revisar depois: as fichas vermelhas do caderno e as perguntas da revisão ativa que você não soube responder.</p>
    </article>
    <article class="card">
      <h3>Anotações do dia ${escHtml(day.date)}</h3>
      <textarea id="dia-notes" rows="7" placeholder="Resumos, dúvidas, prazos, erros recorrentes, o que observar na aula. Só deste dia.">${notes[id] ? escHtml(notes[id]) : ""}</textarea>
    </article>
    <article class="card">
      <h3>Antes de encerrar o dia</h3>
      <p>O que aprendi? O que ainda tenho dificuldade? Quantas questões acertei neste tema (${okQs.length}/${doneQs.length || 0})? O que preciso revisar amanhã?</p>
      <p class="tree-meta">Responda no caderno de anotações acima. Marque "Dia concluído" só quando o checklist estiver honesto. Não marque o dia antes de terminar a correção.</p>
    </article>
    ${navHtml}
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
    if (typeof qTopic !== "undefined" && q) qTopic = q.topic || "all";
    const list = typeof bankList === "function" ? bankList() : BANK;
    qIndex = Math.max(0, list.findIndex((x) => x.id === qid));
    qPick = null;
    if (window.TFPlatform) window.TFPlatform.tfSetOrigin("cronograma", id);
    location.hash = "";
    openPanel("questoes");
    if (typeof renderQuestoes === "function") renderQuestoes();
  }));
  box.querySelectorAll("[data-qdisc]").forEach((b) => {
    b.addEventListener("click", () => {
      const topics = (b.dataset.qtopics || "").split("|").filter(Boolean);
      openQuestoesFilter(b.dataset.qdisc, topics, id);
    });
  });
  box.querySelectorAll("[data-go-q]").forEach((b) => b.addEventListener("click", () => {
    if (window.TFPlatform) window.TFPlatform.tfSetOrigin("cronograma", id);
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
        <p class="tree-meta">${(plan.steps || []).length || d.blocks.length} etapa(s) · ${d.hours} · ${p.pct}%</p>
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
