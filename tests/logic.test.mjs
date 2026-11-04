import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  fisherYates,
  choiceId,
  originalIndex,
  defaultOrder,
  correctPos,
  orderForAnswer
} from "../src/shuffle.mjs";
import {
  SCHEDULE,
  requiredStepIds,
  isDayComplete,
  dayKind,
  saoPauloDate,
  addDaysIso,
  computeStreak,
  SYNC_KEYS
} from "../src/schedule.mjs";

test("banco: 21 dias no cronograma e prova em 22/11", () => {
  const ids = Object.keys(SCHEDULE);
  assert.equal(ids.length, 21);
  assert.equal(SCHEDULE["2026-11-02"].kind, "study");
  assert.equal(SCHEDULE["2026-11-22"].kind, "exam");
  assert.equal(dayKind("2026-11-08"), "study");
  assert.equal(dayKind("2026-12-01"), "neutral");
});

test("conclusão do dia exige todos os st-sN", () => {
  const ids = requiredStepIds("2026-11-02");
  assert.equal(ids.length, 15);
  assert.equal(ids[0], "st-s1");
  assert.equal(ids[14], "st-s15");
  const rec = {};
  ids.forEach((id) => { rec[id] = true; });
  assert.equal(isDayComplete("2026-11-02", rec), true);
  delete rec["st-s7"];
  assert.equal(isDayComplete("2026-11-02", rec), false);
  assert.equal(isDayComplete("2026-11-99", {}), false);
});

test("sequência: hoje incompleto não zera; dia fora do calendário é neutro", () => {
  const created = "2026-11-02";
  const today = "2026-11-05";
  const done = new Set(["2026-11-02", "2026-11-03", "2026-11-04"]);
  const st = computeStreak(done, created, today);
  assert.equal(st.current, 3);
  assert.equal(st.best, 3);
  assert.equal(st.total, 3);
});

test("sequência: falha em dia passado zera a atual e preserva recorde", () => {
  const st = computeStreak(
    new Set(["2026-11-02", "2026-11-03", "2026-11-05"]),
    "2026-11-02",
    "2026-11-05"
  );
  assert.equal(st.current, 1);
  assert.equal(st.best, 2);
});

test("sequência: dia neutro não interrompe", () => {
  const st = computeStreak(
    new Set(["2026-11-21", "2026-11-22"]),
    "2026-11-21",
    "2026-11-24"
  );
  assert.equal(st.current, 2);
  assert.equal(st.best, 2);
});

test("login sozinho não pontua: conjunto vazio", () => {
  const st = computeStreak(new Set(), "2026-11-04", "2026-11-04");
  assert.equal(st.current, 0);
  assert.equal(st.best, 0);
  assert.equal(st.total, 0);
});

test("fuso: saoPauloDate usa America/Sao_Paulo", () => {
  const iso = saoPauloDate(Date.parse("2026-11-04T02:30:00.000Z"));
  assert.match(iso, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(addDaysIso("2026-11-21", 1), "2026-11-22");
  assert.equal(addDaysIso("2026-11-30", 1), "2026-12-01");
});

test("chaves de sync cobrem progresso, tentativas e shuffle", () => {
  for (const k of [
    "tango-fiscal-answers",
    "tango-fiscal-daycheck",
    "tango-fiscal-attempts",
    "tango-fiscal-shuffle",
    "tango-fiscal-simulados",
    "tango-fiscal-caderno"
  ]) {
    assert.ok(SYNC_KEYS.includes(k), k);
  }
});

test("identificadores de alternativa são estáveis", () => {
  assert.equal(choiceId(0), "c0");
  assert.equal(choiceId(3), "c3");
  assert.equal(originalIndex("c2"), 2);
  assert.deepEqual(defaultOrder(4), ["c0", "c1", "c2", "c3"]);
});

test("Fisher-Yates permuta sem perder itens", () => {
  const seq = [0.9, 0.1, 0.4, 0.2];
  let i = 0;
  const rnd = () => seq[i++ % seq.length];
  const out = fisherYates(["c0", "c1", "c2", "c3"], rnd);
  assert.equal(out.length, 4);
  assert.deepEqual([...out].sort(), ["c0", "c1", "c2", "c3"]);
});

test("embaralho evita repetir a posição da correta", () => {
  const rnd = (() => {
    let n = 0;
    return () => {
      n += 1;
      return (n % 10) / 10;
    };
  })();
  const first = orderForAnswer(4, 1, null, rnd);
  const pos = correctPos(first, 1);
  assert.ok(pos >= 0 && pos < 4);
  for (let k = 0; k < 12; k++) {
    const next = orderForAnswer(4, 1, pos, rnd);
    assert.notEqual(correctPos(next, 1), pos);
    assert.equal(next.length, 4);
    assert.ok(next.includes("c1"));
  }
});

test("gabarito real não muda com a ordem apresentada", () => {
  const q = { answer: 2, choices: ["A", "B", "C", "D"] };
  const order = ["c3", "c2", "c0", "c1"];
  assert.equal(correctPos(order, q.answer), 1);
  assert.equal(originalIndex(order[1]), q.answer);
});

test("public/ publica só o frontend, com caminhos relativos", () => {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
  const pub = path.join(root, "public");
  const files = fs.readdirSync(pub).sort();
  assert.deepEqual(files, ["app.js", "dia.js", "index.html", "platform.js", "styles.css"]);
  const html = fs.readFileSync(path.join(pub, "index.html"), "utf8");
  assert.match(html, /href="styles\.css/);
  assert.match(html, /src="app\.js/);
  assert.match(html, /src="dia\.js/);
  assert.match(html, /src="platform\.js/);
  assert.equal(html.includes("src/"), false);
  assert.equal(html.includes("migrations/"), false);
  const wrangler = fs.readFileSync(path.join(root, "wrangler.toml"), "utf8");
  assert.match(wrangler, /directory = "\.\/public"/);
  assert.match(wrangler, /run_worker_first = \["\/api\/\*"\]/);
  const css = fs.readFileSync(path.join(pub, "styles.css"), "utf8");
  assert.match(css, /\.nav-more-menu \{/);
  assert.match(css, /z-index: 30;/);
});

test("bindQuestionCard não sombreia rec no confirm (evita TDZ)", () => {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
  const src = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const start = src.indexOf("function bindQuestionCard(box, q, rec)");
  assert.ok(start >= 0);
  const end = src.indexOf("\nfunction ", start + 1);
  const fn = src.slice(start, end > start ? end : undefined);
  assert.match(fn, /presentedChoices\(q, rec\)/);
  assert.match(fn, /let resultRec = \{ choice: qPick/);
  assert.equal(/\blet rec\b/.test(fn), false);
  assert.match(fn, /Object\.assign\(resultRec, window\.TFPlatform\.tfRecordAttempt/);
  assert.match(fn, /drill\.picks\[q\.id\] = resultRec/);
  assert.match(fn, /next\[q\.id\] = resultRec/);
  assert.match(fn, /addToCaderno\(q, resultRec\.choice\)/);
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /app\.js\?v=20261104c/);
  const pubHtml = fs.readFileSync(path.join(root, "public", "index.html"), "utf8");
  assert.match(pubHtml, /app\.js\?v=20261104c/);
  const pubSrc = fs.readFileSync(path.join(root, "public", "app.js"), "utf8");
  assert.equal(pubSrc.includes("let rec = { choice: qPick"), false);
  assert.equal(pubSrc.includes("let resultRec = { choice: qPick"), true);
});

function confirmQuestionPick({ q, rec, qPick, wantDrill, drill, answers, caderno, tfRecordAttempt, origin }) {
  const presented = (rec && Array.isArray(rec.order) ? rec.order : ["c0", "c1", "c2", "c3"]).map((cid, i) => ({
    letter: "ABCD"[i],
    originalIndex: Number(String(cid).replace(/^c/, ""))
  }));
  const presentedIndex = presented.findIndex((p) => p.originalIndex === qPick);
  const usedOrigin = origin || (wantDrill ? "treino_rapido" : "banco");
  let resultRec = { choice: qPick, ok: qPick === q.answer, at: Date.now(), origin: usedOrigin };
  if (typeof tfRecordAttempt === "function") {
    resultRec = Object.assign(resultRec, tfRecordAttempt(q, presentedIndex < 0 ? 0 : presentedIndex, usedOrigin));
  }
  if (wantDrill && drill) {
    drill.picks[q.id] = resultRec;
    return { resultRec, answers, caderno, feedback: resultRec.ok ? "Certo." : "Errado." };
  }
  answers[q.id] = resultRec;
  if (!resultRec.ok) caderno.push({ id: q.id, choice: resultRec.choice });
  const done = Object.keys(answers).length;
  const okN = Object.values(answers).filter((a) => a.ok).length;
  return {
    resultRec,
    answers,
    caderno,
    feedback: resultRec.ok ? "Certo." : "Errado.",
    stats: { done, ok: okN, pct: done ? Math.round((100 * okN) / done) : 0 }
  };
}

test("responder certo e errado atualiza gabarito, caderno e estatísticas", () => {
  const qOk = { id: "q01", answer: 1 };
  const qBad = { id: "q02", answer: 2 };
  const answers = {};
  const caderno = [];
  const attempts = [];
  const rec = { order: ["c1", "c0", "c2", "c3"] };
  const tfRecordAttempt = (q, presentedIndex, origin) => {
    const order = rec.order;
    const cid = order[presentedIndex];
    const original = Number(cid.slice(1));
    const row = { choice: original, choiceId: cid, ok: original === q.answer, origin, order: order.slice() };
    attempts.push({ qid: q.id, origin, ok: row.ok });
    return row;
  };
  const good = confirmQuestionPick({ q: qOk, rec, qPick: 1, answers, caderno, tfRecordAttempt, origin: "banco" });
  assert.equal(good.feedback, "Certo.");
  assert.equal(good.resultRec.ok, true);
  assert.equal(good.answers.q01.ok, true);
  assert.equal(caderno.length, 0);
  assert.equal(good.stats.done, 1);
  assert.equal(good.stats.pct, 100);
  const bad = confirmQuestionPick({ q: qBad, rec, qPick: 0, answers, caderno, tfRecordAttempt, origin: "banco" });
  assert.equal(bad.feedback, "Errado.");
  assert.equal(bad.resultRec.ok, false);
  assert.equal(bad.answers.q02.choice, 0);
  assert.equal(caderno.length, 1);
  assert.equal(caderno[0].id, "q02");
  assert.equal(bad.stats.done, 2);
  assert.equal(bad.stats.ok, 1);
  assert.equal(attempts.map((a) => a.origin).join(","), "banco,banco");
});

test("treino rápido e redefinir marcações preservam caderno", () => {
  const q = { id: "q10", answer: 3 };
  const answers = {};
  const caderno = [];
  const drill = { picks: {} };
  const rec = { order: ["c0", "c1", "c2", "c3"] };
  const drillHit = confirmQuestionPick({
    q, rec, qPick: 1, wantDrill: true, drill, answers, caderno, origin: "treino_rapido"
  });
  assert.equal(drillHit.feedback, "Errado.");
  assert.equal(drill.picks.q10.origin, "treino_rapido");
  assert.equal(Object.keys(answers).length, 0);
  assert.equal(caderno.length, 0);
  confirmQuestionPick({ q, rec, qPick: 0, answers, caderno, origin: "banco" });
  assert.equal(caderno.length, 1);
  const reset = {};
  assert.equal(Object.keys(reset).length, 0);
  assert.equal(caderno.length, 1);
  const again = confirmQuestionPick({ q: { id: "q11", answer: 0 }, rec, qPick: 0, answers: reset, caderno, origin: "banco" });
  assert.equal(again.resultRec.ok, true);
  assert.equal(again.stats.done, 1);
  assert.equal(caderno.length, 1);
});

test("ranking ordena por sequência, recorde e dias — nunca por acerto", () => {
  const rows = [
    { nickname: "Ana", current: 2, best: 5, total: 10, pct: 99 },
    { nickname: "Bia", current: 4, best: 4, total: 4, pct: 10 },
    { nickname: "Cris", current: 4, best: 6, total: 6, pct: 50 },
    { nickname: "Duda", current: 4, best: 6, total: 9, pct: 1 }
  ];
  rows.sort((a, b) => b.current - a.current || b.best - a.best || b.total - a.total);
  assert.deepEqual(rows.map((r) => r.nickname), ["Duda", "Cris", "Bia", "Ana"]);
});
