# Auditoria pedagógica — prova IBDO Paraibuna/SP 2019

Documento de análise. Não copia as 30 questões para o banco. Não transporta legislação de Paraibuna para Tanguá. A prova de 2019 é uma amostra; não se afirma que todas as provas da IBDO seguem o mesmo padrão.

## Fonte

Arquivo analisado: `instituto-ibdo-projetos-2019-prefeitura-de-paraibuna-sp-fiscal-de-posturas-prova-2.pdf` (anexo da tarefa).

Método: texto incorporado extraído com pypdf. Sete páginas com texto (não foi necessário OCR). Nenhuma questão ficou ilegível.

- Páginas efetivamente analisadas: 7 de 7.
- Questões lidas: 30 de 30 (enunciados e alternativas).
- Questões não lidas: nenhuma.

## Capa e divergência A–D vs A–E

A página 1 (instruções) afirma: “Só há uma alternativa válida para cada questão com quatro alternativas.”

As questões 1 a 30 apresentam opções **a, b, c, d e e**. Recorre com frequência a “Nenhuma das alternativas anteriores” ou “Todas as alternativas anteriores estão corretas/incorretas”.

Divergência registrada: a capa fala em quatro alternativas; o caderno usa cinco. **O edital de Tanguá 01/2026 determina quatro alternativas (A–D).** O banco do planner permanece com quatro. A prova de 2019 serve como estilo de cobrança, não como modelo de quantidade de opções.

## Distribuição observada (Paraibuna 2019)

| Bloco | Questões | Disciplina no caderno |
|---|---|---|
| 1–10 | 10 | Língua Portuguesa (texto-base Q1–Q3; gramática Q4–Q10) |
| 11–20 | 10 | Legislação (Lei Complementar nº 75/2018 de Paraibuna) |
| 21–30 | 10 | Conhecimentos específicos (admin, tributário municipal, improbidade, CF, informática) |

Não há gabarito oficial neste PDF. Esta auditoria não inventa respostas oficiais.

## Padrões observados nesta prova (não generalizar)

Características efetivamente lidas no PDF:

- Enunciado direto, muitas vezes “Sob a luz da Lei Complementar nº 75…”.
- Marcadores **CORRETA**, **INCORRETA**, **EXCETO**, **NÃO**.
- Afirmações I, II, III (e IV) com “assinale a sequência” ou “o número de afirmativas corretas”.
- Texto literário longo para Q1–Q3 (tipo textual, narrador, “NÃO se adequa”).
- Gramática pontual: preposição, tempo verbal, interjeição, regência, grafia, formação de palavras.
- Direito administrativo em noções: princípios, atos, poder disciplinar, improbidade.
- Informática objetiva e curta: Excel `#REF!`, backup, registrador, caractere inválido no Windows.
- Distrator “nenhuma/todas as anteriores”.
- Legislação 100% municipal de **Paraibuna**. Prazos, sanções e conceitos dali não valem para a Lei 946/2014 de Tanguá.

O que **não** se afirma:

- Frequência percentual “típica da IBDO”.
- Que Tanguá 2026 repetirá informática de Excel ou ISS municipal.
- Que cinco alternativas serão usadas em Tanguá.

## Banco atual do planner (conferido no código)

Confirmado em `app.js` nesta branch:

- IDs `q01` a `q120` (120 únicos).
- Legislação 33 · Específicas 52 · Português 35.
- Fácil 35 · média 65 · difícil 20.
- Quatro alternativas A–D em todas.
- Conteúdo jurídico: Lei 946/2014, LOM de Tanguá, CF e Anexo I/II do edital 01/2026. Lei 657/2007 só complementar.

## Tabela comparativa (estilo de cobrança)

| Questão IBDO 2019 | Assunto | Característica da cobrança | Semelhantes no planner | Recomendação |
|---|---|---|---|---|
| 1 | Tipo/organização do texto | Texto longo; escolher a descrição do gênero | q14, q51, q55, q107 | Planner cobra o conceito sem texto-base. Manter 4 alternativas. Opcional: um texto curto autoral no futuro, sem copiar Bagno. |
| 2 | Interpretação / NÃO | “A alternativa que NÃO se adequa” | q14, q55 | Já há NÃO/EXCETO. Não copiar o trecho literário. |
| 3 | Narrador | Classificação do narrador a partir de recorte | (lacuna) | Fora do núcleo de Posturas; não priorizar. |
| 4 | Preposição / agente da passiva | Valor da preposição destacada | q32 (regência) | Cobertura parcial. Sem alteração obrigatória. |
| 5 | Tempo verbal | Pretérito perfeito vs outros | q31 | Planner foca concordância, não paradigmas de tempo. Nível médio: aceitável deixar como está. |
| 6 | Interjeições INCORRETA | Par INCORRETA + lista | q36, q44 | Tema raro no Anexo II. Não forçar inclusão. |
| 7 | Regência verbal | “Há falha na regência” | q32 | Compatível. |
| 8 | C/I em 5 afirmações | Julgar cada linha e marcar sequência | (poucas no planner) | Formato útil. Se criar novas, usar 4 opções de sequência, legislação de Tanguá, sem copiar as frases. |
| 9 | Grafia ERRO | Uma palavra grafada errada | q33, q46, q47 | Compatível. |
| 10 | Formação de palavras C/I | Justaposição vs aglutinação | q35, q104 | Compatível. |
| 11 | Conceito de servidor / cargo | CORRETA sobre estatuto local | q04, q17, q57, q96 | Manter Lei 946, não LC 75. |
| 12 | Investidura ocorre com | Nomeação vs posse vs exercício | q17 | Já coberto (posse + exercício). |
| 13 | Provimento EXCETO | Lista + EXCETO | q03, q18, q103 | Já no padrão. Conferir se “acesso” de Paraibuna não entrou no banco (não entrou). |
| 14 | Validade do concurso | Prazo + prorrogação | q16 | Já Lei 946 Art. 14 (até 2 anos + 1). Não usar 1/3/4 anos de outra lei. |
| 15 | Prazo de exercício | Número + úteis/corridos | q02, q108 | Já 15+15 da posse na 946. Não copiar “improrrogável” de Paraibuna. |
| 16 | Vencimento × remuneração INCORRETA | Conceito + teto | q92 (licenças; direitos) | Direitos da 946 existem; teto do prefeito de Paraibuna não se copia. |
| 17 | Responsabilidades INCORRETA | Civil, penal, administrativa | q11, q96 | Noções ok; não copiar inciso de contravenção da LC 75. |
| 18 | Sanções EXCETO | Elenco disciplinar | q19 | Art. 217 da 946 já é a fonte. |
| 19 | Sindicância I/II/III | Afirmações + “mais adequada” | q06 | Já 30+30 e resultados da sindicância. |
| 20 | Licença/atestado INCORRETA | Regras de perícia | q92 | Só se houver artigo correspondente na 946; senão não inventar. |
| 21 | Princípios I–IV | Qual princípio NÃO está descrito | q09, q24 | LIMPE + autotutela já aparecem. Manter CF/doutrina do Anexo II. |
| 22 | ISS municipal | Código tributário de Paraibuna | — | **Não transportar.** ISS é Fiscal de Tributos no edital de Tanguá (ver q15). |
| 23 | Improbidade INCORRETO | Lei 8.429 (federal) | q11 | Federal: pode inspirar estilo. Atualizar sempre com 14.230/2021 no planner (já feito). |
| 24 | Atos I–IV | Contar afirmativas corretas | q07, q08, q27, q28, q94, q111 | Formato “quantas estão certas” quase ausente. Candidato a questão nova autoral, 4 opções (0 a 3, ou 1 a 4 sem E). |
| 25 | CF Poder Legislativo NÃO | Senado, Congresso | q118 | Planner recorta noções (Art. 31/70). Não aprofundar processo legislativo federal. |
| 26 | Poder disciplinar | Exemplo de sanção vs exoneração | q19, q103 | Já distingue exoneração e demissão. |
| 27 | Excel `#REF!` | Mensagem de erro | q99, q115 | Planner cobra noções (SOMA), não códigos de erro. 2019 foi específica; Tanguá não lista Excel avançado. |
| 28 | Backup / disponibilidade | Princípios de segurança | q12, q40, q120 | Compatível e já coberto. |
| 29 | Registrador da CPU | Hardware | q29 | Planner distingue RAM/HD; não cobra registrador. Nível médio: opcional. |
| 30 | Nome de arquivo Windows | Caractere inválido | q98, q114 | Estilo próximo (Windows noções). Sem cópia. |

## Calibragem (sem forçar distribuição)

Observado em 2019 (julgamento qualitativo, sem estatística de banca):

- Português Q1–Q3: média, exigem ler o texto.
- Gramática Q4–Q10: fácil a média, pontuais.
- Legislação Q11–Q20: média, leitura do estatuto local; EXCETO/INCORRETA.
- Específicas Q21–Q26: média a difícil (várias afirmações, CF).
- Informática Q27–Q30: fácil a média, factuais.

No planner:

- Já compatível: prazos da 946, EXCETO de provimento/penalidades, LIMPE, atos, improbidade com dolo, phishing/backup, Anexo I Posturas × Tributos.
- Mais fáceis que o texto-base de 2019: várias de informática (q98–q102, q114, q120) e algumas de figuras/fonologia curtas. Para nível médio municipal isso não é erro; 2019 também teve informática curta.
- Enunciados pouco elaborados (conceituais, sem caso): parte do português de interpretação (q14 e q55 ensinam o método em vez de aplicar num texto). Revisão futura útil, sem urgência de trocar IDs.
- Excessivamente difíceis em relação a 2019: poucas. q22 (reversão), q28 (anulação × revogação), q48–q49 (concordância/colocação), q111 (ato composto) pedem distinção fina, ainda dentro do programa.
- Alternativas óbvias: q37 (conectivo “contudo”) e q45 (hipérbole) são curtas; aceitáveis como fáceis.
- ISS (Q22 da prova antiga): não criar equivalente com código de Paraibuna.

## IDs com recomendação — sem alteração nesta entrega

Nenhuma questão `q01`–`q120` foi reescrita nesta tarefa. Justificativa: a auditoria é comparativa de estilo; copiar Paraibuna ou mudar gabarito sem artigo de Tanguá violaria as regras da spec. Histórico de IDs preservado.

Revisão futura, se desejada, com enunciados **originais**:

| ID | Motivo | O que não fazer |
|---|---|---|
| q14, q55 | Interpretação metalinguística, sem texto | Não colar o texto “A Chegada” |
| q37, q45 | Distratores curtos | Não inflar artificialmente para “parecer IBDO” |
| q98–q102 | Hardware/SO muito diretos | Não copiar `#REF!` nem caractere de arquivo da Q30 |
| (nova, se houver vaga) | Formato I/II/III com 4 sequências | Não usar LC 75 nem ISS de Paraibuna |

## Outras provas da banca

Não foi encontrada, nesta sessão, outra prova IBDO de Fiscal/nível médio com texto extraído e conferido. Portanto: o que está acima vale só para Paraibuna 2019. Inferências sobre “o estilo IBDO” além deste caderno ficam sem confirmação.

## Conclusão para o produto

- Manter 4 alternativas A–D.
- Manter legislação de Tanguá e normas federais do edital.
- Embaralhamento e origens (`cronograma` / `banco` / `treino_rapido` / `simulado`) não alteram o gabarito real.
- A prova de 2019 confirma o valor de EXCETO/INCORRETO, afirmações numeradas e informática objetiva — já presentes em parte do banco.
