const TF = {
  user: null,
  streak: null,
  syncState: "idle",
  guest: true,
  version: 0,
  queueTimer: null,
  pending: false,
  inFlight: false,
  applying: false,
  syncSeq: 0,
  dirty: new Set(),
  origin: "banco",
  dayId: null,
  subject: null,
  shuffle: {},
  currentOrder: {}
};

window.TF = TF;

const TF_PAYLOAD_FROM_STORAGE = {
  "tango-fiscal-done": "done",
  "tango-fiscal-edital": "edital",
  "tango-fiscal-answers": "answers",
  "tango-fiscal-review": "review",
  "tango-fiscal-simulados": "sims",
  "tango-fiscal-caderno": "caderno",
  "tango-fiscal-cards": "cards",
  "tango-fiscal-qfilters": "qfilters",
  "tango-fiscal-daycheck": "daycheck",
  "tango-fiscal-notes": "notes",
  "tango-fiscal-watched": "watched",
  "tango-fiscal-attempts": "attempts",
  "tango-fiscal-shuffle": "shuffle",
  "tango-fiscal-qstate": "qstate",
  "tango-fiscal-goals": "goals"
};

function tfPayloadKeyForStorage(k) {
  if (typeof k === "string" && /^b-2026-11-\d{2}-\d$/.test(k)) return "blocks";
  return TF_PAYLOAD_FROM_STORAGE[k] || null;
}

function tfMergeAnswers(remote, local) {
  const out = Object.assign({}, remote && typeof remote === "object" ? remote : {});
  const loc = local && typeof local === "object" ? local : {};
  Object.keys(loc).forEach((id) => {
    const r = out[id];
    const l = loc[id];
    if (!r) { out[id] = l; return; }
    const rt = Number(r && r.at) || 0;
    const lt = Number(l && l.at) || 0;
    out[id] = lt >= rt ? l : r;
  });
  return out;
}

function tfMergeDict(remote, local) {
  return Object.assign({}, remote && typeof remote === "object" ? remote : {}, local && typeof local === "object" ? local : {});
}

function tfMergeDaycheck(remote, local) {
  const out = Object.assign({}, remote && typeof remote === "object" ? remote : {});
  const loc = local && typeof local === "object" ? local : {};
  Object.keys(loc).forEach((day) => {
    out[day] = Object.assign({}, out[day] || {}, loc[day] || {});
  });
  return out;
}

function tfMergeCaderno(remote, local) {
  const map = new Map();
  (Array.isArray(remote) ? remote : []).forEach((x) => { if (x && x.id) map.set(x.id, x); });
  (Array.isArray(local) ? local : []).forEach((x) => {
    if (!x || !x.id) return;
    const prev = map.get(x.id);
    if (!prev) { map.set(x.id, x); return; }
    const newer = (Number(x.last) || 0) >= (Number(prev.last) || 0) ? x : prev;
    const copy = Object.assign({}, newer);
    copy.misses = Math.max(Number(prev.misses) || 0, Number(x.misses) || 0);
    map.set(x.id, copy);
  });
  return Array.from(map.values());
}

function tfMergeSims(remote, local) {
  const map = new Map();
  (Array.isArray(remote) ? remote : []).forEach((x, i) => { map.set((x && (x.id || x.when)) || ("r" + i), x); });
  (Array.isArray(local) ? local : []).forEach((x, i) => { map.set((x && (x.id || x.when)) || ("l" + i), x); });
  return Array.from(map.values());
}

function tfMergeAttempts(remote, local) {
  const parse = (v) => {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") { try { return JSON.parse(v); } catch { return []; } }
    return [];
  };
  const rem = parse(remote);
  const loc = parse(local);
  const seen = new Set();
  const out = [];
  loc.concat(rem).forEach((row) => {
    const id = row && (row.at + ":" + (row.qid || row.questionId || "") + ":" + (row.choiceId || ""));
    if (!id || seen.has(id)) return;
    seen.add(id);
    out.push(row);
  });
  return out.slice(0, 2000);
}

const TF_MERGE = {
  answers: tfMergeAnswers,
  review: tfMergeDict,
  cards: tfMergeDict,
  done: tfMergeDict,
  notes: tfMergeDict,
  watched: tfMergeDict,
  edital: tfMergeDict,
  daycheck: tfMergeDaycheck,
  blocks: tfMergeDict,
  shuffle: tfMergeDict,
  qstate: tfMergeDict,
  goals: tfMergeDict,
  caderno: tfMergeCaderno,
  sims: tfMergeSims,
  attempts: tfMergeAttempts
};

function tfMergePreferLocal(remote, local, dirtyKeys) {
  const rem = remote && typeof remote === "object" ? remote : {};
  const loc = local && typeof local === "object" ? local : {};
  const dirty = dirtyKeys instanceof Set ? dirtyKeys : new Set(dirtyKeys || []);
  const out = Object.assign({}, rem);
  const keys = new Set(Object.keys(rem).concat(Object.keys(loc)));
  keys.forEach((k) => {
    if (k === "v" || k === "when" || k === "clientSeq") {
      out[k] = loc[k] != null ? loc[k] : rem[k];
      return;
    }
    const isDirty = dirty.has(k) || (dirty.size === 0 && loc[k] !== undefined);
    if (!isDirty) {
      out[k] = rem[k] !== undefined ? rem[k] : loc[k];
      return;
    }
    const fn = TF_MERGE[k];
    if (fn) out[k] = fn(rem[k], loc[k]);
    else out[k] = loc[k] !== undefined ? loc[k] : rem[k];
  });
  return out;
}

function tfLSGet(k) {
  if (typeof lsGet === "function") return lsGet(k);
  try { return window.localStorage.getItem(k); } catch { return null; }
}
function tfLSSet(k, v) {
  if (typeof lsSet === "function") { lsSet(k, v); return; }
  try { window.localStorage.setItem(k, v); } catch {}
  if (TF.user && !TF.applying) {
    tfMarkDirty(k);
    tfScheduleSync();
  }
}

function tfMarkDirty(storageKey) {
  const pk = tfPayloadKeyForStorage(storageKey);
  if (pk) TF.dirty.add(pk);
  TF.syncSeq += 1;
}

function tfSetSync(state, label) {
  TF.syncState = state;
  const el = document.getElementById("sync-ind");
  if (el) {
    el.dataset.state = state;
    el.textContent = label;
  }
}

function tfCollect() {
  if (typeof collectBackup === "function") return collectBackup();
  return {};
}

function tfApply(data) {
  if (!data) return;
  TF.applying = true;
  try {
    if (typeof applyBackup === "function") applyBackup(data);
  } finally {
    TF.applying = false;
  }
}

function tfRefreshViewsAfterSync() {
  if (typeof window.tfRefreshCronograma === "function") window.tfRefreshCronograma();
  else {
    if (typeof renderCal === "function") {
      renderCal(typeof currentCalFilter === "function" ? currentCalFilter() : "all");
    }
    const m = (typeof location !== "undefined" && location.hash || "").match(/^#dia-(\d{4}-\d{2}-\d{2})$/);
    if (m && typeof renderDiaPage === "function") renderDiaPage(m[1]);
    if (typeof renderToday === "function") renderToday();
  }
  if (typeof renderQuestoes === "function") renderQuestoes();
  if (typeof renderCaderno === "function") renderCaderno();
  if (typeof renderEdital === "function") renderEdital();
  if (typeof renderStatsLive === "function") renderStatsLive();
  if (typeof renderPerfil === "function") renderPerfil();
}

async function tfApi(path, opts) {
  const o = opts || {};
  const res = await fetch(path, {
    method: o.method || "GET",
    credentials: "include",
    headers: o.body ? { "content-type": "application/json" } : undefined,
    body: o.body ? JSON.stringify(o.body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Falha");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function tfScheduleSync() {
  if (!TF.user || TF.applying) return;
  TF.pending = true;
  tfSetSync("pending", "Sincronizando...");
  if (TF.queueTimer) clearTimeout(TF.queueTimer);
  TF.queueTimer = setTimeout(() => { tfFlushSync(); }, 700);
}

async function tfFlushSync() {
  if (!TF.user) return;
  if (TF.inFlight) {
    TF.pending = true;
    return;
  }
  if (!navigator.onLine) {
    tfSetSync("offline", "Sem internet: alterações salvas localmente.");
    return;
  }
  TF.inFlight = true;
  const sentSeq = TF.syncSeq;
  try {
    tfSetSync("pending", "Sincronizando...");
    const payload = tfCollect();
    payload.clientSeq = sentSeq;
    const out = await tfApi("/api/sync", { method: "PUT", body: { payload, version: TF.version } });
    TF.version = out.version || TF.version;
    if (TF.syncSeq !== sentSeq) {
      TF.inFlight = false;
      tfScheduleSync();
      return;
    }
    TF.dirty.clear();
    TF.pending = false;
    tfSetSync("ok", "Salvo na nuvem.");
  } catch (err) {
    if (err.status === 409) {
      try {
        const remote = await tfApi("/api/sync");
        const local = tfCollect();
        const seqAtCollect = TF.syncSeq;
        const merged = tfMergePreferLocal(remote.payload, local, TF.dirty);
        TF.version = remote.version || TF.version;
        if (TF.syncSeq !== seqAtCollect) {
          TF.inFlight = false;
          tfScheduleSync();
          return;
        }
        tfApply(merged);
        if (TF.syncSeq !== seqAtCollect) {
          TF.inFlight = false;
          tfScheduleSync();
          return;
        }
        const out = await tfApi("/api/sync", { method: "PUT", body: { payload: merged, version: TF.version } });
        TF.version = out.version || TF.version;
        if (TF.syncSeq !== sentSeq) {
          TF.inFlight = false;
          tfScheduleSync();
          return;
        }
        TF.dirty.clear();
        TF.pending = false;
        tfSetSync("ok", "Salvo na nuvem.");
      } catch {
        tfSetSync("fail", "Falha de sincronização: tentando novamente.");
        setTimeout(() => { if (!TF.inFlight) tfFlushSync(); }, 4000);
      }
    } else {
      tfSetSync("fail", "Falha de sincronização: tentando novamente.");
      setTimeout(() => { if (!TF.inFlight) tfFlushSync(); }, 4000);
    }
  } finally {
    TF.inFlight = false;
  }
}

function fisherYatesLocal(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function defaultOrder(n) {
  const o = [];
  for (let i = 0; i < n; i++) o.push("c" + i);
  return o;
}

function tfLoadShuffle() {
  try { return JSON.parse(tfLSGet("tango-fiscal-shuffle") || "{}"); } catch { return {}; }
}
function tfSaveShuffle(map) { tfLSSet("tango-fiscal-shuffle", JSON.stringify(map)); }

function tfOrderFor(q) {
  const n = (q.choices || []).length || 4;
  const hist = tfLoadShuffle();
  const last = hist[q.id] && typeof hist[q.id].pos === "number" ? hist[q.id].pos : null;
  if (TF.currentOrder[q.id]) return TF.currentOrder[q.id];
  let order = fisherYatesLocal(defaultOrder(n));
  let guard = 0;
  const posOf = (ord) => ord.indexOf("c" + q.answer);
  while (last != null && posOf(order) === last && guard < 20) {
    order = fisherYatesLocal(defaultOrder(n));
    guard += 1;
  }
  if (last != null && posOf(order) === last) {
    const i = last;
    const j = (i + 1) % n;
    const t = order[i]; order[i] = order[j]; order[j] = t;
  }
  TF.currentOrder[q.id] = order;
  return order;
}

function tfRememberOrder(q, order) {
  const hist = tfLoadShuffle();
  hist[q.id] = { pos: order.indexOf("c" + q.answer), order: order.slice() };
  tfSaveShuffle(hist);
}

function tfPresent(q) {
  const order = tfOrderFor(q);
  return order.map((cid, i) => {
    const idx = Number(cid.slice(1));
    return { letter: "ABCD"[i], choiceId: cid, originalIndex: idx, text: q.choices[idx] };
  });
}

function tfRecordAttempt(q, presentedIndex, origin) {
  const order = TF.currentOrder[q.id] || tfOrderFor(q);
  const cid = order[presentedIndex];
  const original = Number(cid.slice(1));
  const ok = original === q.answer;
  tfRememberOrder(q, order);
  delete TF.currentOrder[q.id];
  const rec = {
    choice: original,
    choiceId: cid,
    ok,
    at: Date.now(),
    origin: origin || TF.origin || "banco",
    dayId: TF.dayId || null,
    order: order.slice()
  };
  const hist = (function () { try { return JSON.parse(tfLSGet("tango-fiscal-attempts") || "[]"); } catch { return []; } })();
  hist.unshift({
    qid: q.id, disc: q.disc, topic: q.topic, ok, origin: rec.origin, dayId: rec.dayId, at: rec.at, choiceId: cid
  });
  tfLSSet("tango-fiscal-attempts", JSON.stringify(hist.slice(0, 2000)));
  if (TF.user && navigator.onLine) {
    tfApi("/api/attempts", {
      method: "POST",
      body: {
        questionId: q.id,
        origin: rec.origin,
        dayId: rec.dayId,
        subject: q.topic,
        disc: q.disc,
        choiceId: cid,
        correct: ok,
        order,
        correctPos: order.indexOf("c" + q.answer)
      }
    }).catch(() => {});
  }
  return rec;
}

function tfOriginStats() {
  let hist = [];
  try { hist = JSON.parse(tfLSGet("tango-fiscal-attempts") || "[]"); } catch { hist = []; }
  const out = { cronograma: { n: 0, ok: 0 }, banco: { n: 0, ok: 0 }, treino_rapido: { n: 0, ok: 0 }, simulado: { n: 0, ok: 0 } };
  hist.forEach((h) => {
    const o = out[h.origin] ? h.origin : "banco";
    out[o].n += 1;
    if (h.ok) out[o].ok += 1;
  });
  return out;
}

function tfEsc(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function tfPaintChrome() {
  const slot = document.getElementById("user-slot");
  if (!slot) return;
  if (!TF.user) {
    slot.innerHTML = `<button type="button" class="btn" id="btn-enter">Entrar</button>`;
    const b = document.getElementById("btn-enter");
    if (b) b.addEventListener("click", () => tfShowGate(true));
    return;
  }
  const nick = tfEsc(TF.user.nickname || TF.user.username);
  const st = TF.streak ? TF.streak.current : 0;
  slot.innerHTML = `
    <span class="user-chip" title="Conta">${nick}</span>
    <span class="streak-chip" title="Sequência atual">${st} dia(s)</span>
    <button type="button" class="btn" data-go-panel="perfil">Perfil</button>
    <button type="button" class="btn" data-go-panel="ranking">Ranking</button>
    <button type="button" class="btn" id="btn-logout">Sair</button>
  `;
  const lo = document.getElementById("btn-logout");
  if (lo) lo.addEventListener("click", tfLogout);
  slot.querySelectorAll("[data-go-panel]").forEach((b) => {
    b.addEventListener("click", () => {
      if (typeof goPanel === "function") goPanel(b.dataset.goPanel);
    });
  });
}

function tfShowGate(force) {
  const gate = document.getElementById("auth-gate");
  if (!gate) return;
  if (!force && TF.user) { gate.hidden = true; return; }
  if (!force && sessionStorage.getItem("tf-guest") === "1") { gate.hidden = true; return; }
  gate.hidden = false;
  gate.innerHTML = `
    <div class="gate-card">
      <p class="kicker">Fiscal de Posturas · Tanguá</p>
      <h2>Estudar juntos, cada um com o seu progresso</h2>
      <p>Crie uma conta para salvar na nuvem e entrar no ranking. Ou continue só neste navegador.</p>
      <div class="gate-tabs">
        <button type="button" class="chip active" data-g="login">Entrar na minha conta</button>
        <button type="button" class="chip" data-g="signup">Criar uma conta</button>
        <button type="button" class="chip" data-g="recover">Recuperar conta</button>
      </div>
      <form id="gate-form" class="gate-form"></form>
      <p class="gate-err" id="gate-err" role="alert"></p>
      <button type="button" class="btn" id="btn-guest">Continuar como visitante</button>
    </div>
  `;
  let mode = "login";
  function paintForm() {
    const form = document.getElementById("gate-form");
    if (mode === "signup") {
      form.innerHTML = `
        <label>Nome de usuário<input name="username" autocomplete="username" required minlength="3" maxlength="24" /></label>
        <label>Senha<input name="password" type="password" autocomplete="new-password" required minlength="8" /></label>
        <label>Apelido no ranking<input name="nickname" required minlength="2" maxlength="24" /></label>
        <label>E-mail de recuperação (opcional)<input name="recoveryEmail" type="email" autocomplete="email" /></label>
        <button type="submit" class="btn primary">Criar conta</button>
      `;
    } else if (mode === "recover") {
      form.innerHTML = `
        <label>Nome de usuário<input name="username" required /></label>
        <label>Chave de recuperação<input name="recoveryKey" required /></label>
        <label>Nova senha<input name="newPassword" type="password" required minlength="8" /></label>
        <button type="submit" class="btn primary">Redefinir senha</button>
      `;
    } else {
      form.innerHTML = `
        <label>Nome de usuário<input name="username" autocomplete="username" required /></label>
        <label>Senha<input name="password" type="password" autocomplete="current-password" required /></label>
        <button type="submit" class="btn primary">Entrar</button>
      `;
    }
  }
  paintForm();
  gate.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.g;
    gate.querySelectorAll("[data-g]").forEach((x) => x.classList.toggle("active", x === b));
    paintForm();
  }));
  document.getElementById("btn-guest").addEventListener("click", () => {
    sessionStorage.setItem("tf-guest", "1");
    TF.guest = true;
    gate.hidden = true;
    tfSetSync("guest", "Visitante: progresso só neste navegador.");
  });
  document.getElementById("gate-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const err = document.getElementById("gate-err");
    err.textContent = "";
    const fd = new FormData(ev.target);
    const body = Object.fromEntries(fd.entries());
    try {
      if (mode === "signup") {
        const out = await tfApi("/api/register", { method: "POST", body });
        tfShowRecoveryOnce(out.recoveryKey);
        await tfAfterLogin();
        gate.hidden = true;
      } else if (mode === "recover") {
        await tfApi("/api/recover", { method: "POST", body });
        err.textContent = "Senha redefinida. Entre com a nova senha.";
        mode = "login";
        paintForm();
      } else {
        await tfApi("/api/login", { method: "POST", body });
        await tfAfterLogin();
        gate.hidden = true;
      }
    } catch (e) {
      err.textContent = e.message || "Não foi possível concluir.";
    }
  });
}

function tfShowRecoveryOnce(key) {
  const gate = document.getElementById("auth-gate");
  if (!gate || !key) return;
  gate.hidden = false;
  gate.innerHTML = `
    <div class="gate-card">
      <h2>Guarde sua chave de recuperação</h2>
      <p>Ela aparece só agora. Sem e-mail e sem esta chave, a perda da senha pode significar perda da conta.</p>
      <p class="recovery-key" id="rec-key">${tfEsc(key)}</p>
      <div class="q-nav">
        <button type="button" class="btn" id="rec-copy">Copiar</button>
        <button type="button" class="btn" id="rec-dl">Baixar</button>
        <button type="button" class="btn primary" id="rec-ok">Já guardei</button>
      </div>
    </div>
  `;
  document.getElementById("rec-copy").addEventListener("click", () => {
    if (navigator.clipboard) navigator.clipboard.writeText(key).catch(() => {});
  });
  document.getElementById("rec-dl").addEventListener("click", () => {
    const blob = new Blob(["Chave de recuperação Tanguá Fiscal\n" + key + "\n"], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tango-fiscal-recuperacao.txt";
    a.click();
  });
  document.getElementById("rec-ok").addEventListener("click", () => { gate.hidden = true; });
}

async function tfAfterLogin() {
  sessionStorage.removeItem("tf-guest");
  TF.guest = false;
  const sess = await tfApi("/api/session");
  TF.user = sess.user;
  TF.streak = sess.streak;
  tfPaintChrome();
  try {
    const remote = await tfApi("/api/sync");
    TF.version = remote.version || 0;
    if (remote.payload) {
      const local = tfCollect();
      if (TF.dirty.size) {
        tfApply(tfMergePreferLocal(remote.payload, local, TF.dirty));
        tfScheduleSync();
      } else {
        tfApply(remote.payload);
      }
    } else tfOfferMigration(remote.migrated);
  } catch {
    tfSetSync("fail", "Falha de sincronização: tentando novamente.");
  }
  tfPaintChrome();
  tfRefreshViewsAfterSync();
  tfSetSync("ok", "Salvo na nuvem.");
}

function tfHasLegacy() {
  try {
    return !!(localStorage.getItem("tango-fiscal-answers") || localStorage.getItem("tango-fiscal-done") || localStorage.getItem("tango-fiscal-daycheck"));
  } catch { return false; }
}

function tfOfferMigration(already) {
  if (already || !tfHasLegacy()) return;
  const bar = document.querySelector(".backup-bar");
  if (!bar) return;
  const box = document.createElement("article");
  box.className = "card warn";
  box.id = "mig-box";
  box.innerHTML = `
    <h3>Migrar progresso deste navegador</h3>
    <p>Encontrei dados antigos neste aparelho. A nuvem não lê automaticamente o armazenamento de outro domínio. Você pode migrar agora ou importar o backup JSON.</p>
    <div class="q-nav">
      <button type="button" class="btn primary" id="mig-go">Migrar para esta conta</button>
      <button type="button" class="btn" id="mig-skip">Agora não</button>
    </div>
  `;
  bar.insertAdjacentElement("afterend", box);
  document.getElementById("mig-go").addEventListener("click", async () => {
    const payload = {
      v: 1,
      done: JSON.parse(localStorage.getItem("tango-fiscal-done") || "{}"),
      edital: JSON.parse(localStorage.getItem("tango-fiscal-edital") || "{}"),
      answers: JSON.parse(localStorage.getItem("tango-fiscal-answers") || "{}"),
      sims: JSON.parse(localStorage.getItem("tango-fiscal-simulados") || "[]"),
      caderno: JSON.parse(localStorage.getItem("tango-fiscal-caderno") || "[]"),
      review: JSON.parse(localStorage.getItem("tango-fiscal-review") || "{}"),
      theme: localStorage.getItem("tango-fiscal-theme"),
      cards: JSON.parse(localStorage.getItem("tango-fiscal-cards") || "{}"),
      qfilters: localStorage.getItem("tango-fiscal-qfilters"),
      daycheck: JSON.parse(localStorage.getItem("tango-fiscal-daycheck") || "{}"),
      notes: JSON.parse(localStorage.getItem("tango-fiscal-notes") || "{}"),
      watched: JSON.parse(localStorage.getItem("tango-fiscal-watched") || "{}")
    };
    try {
      await tfApi("/api/migrate", { method: "POST", body: { payload } });
      tfApply(payload);
      box.innerHTML = "<h3>Migração concluída</h3><p>Os registros antigos neste navegador foram preservados. O uso diário passa a ser automático na nuvem.</p>";
      tfScheduleSync();
    } catch (e) {
      box.insertAdjacentHTML("beforeend", "<p>" + tfEsc(e.message) + "</p>");
    }
  });
  document.getElementById("mig-skip").addEventListener("click", () => box.remove());
}

async function tfLogout() {
  try { await tfApi("/api/logout", { method: "POST" }); } catch {}
  TF.user = null;
  TF.streak = null;
  TF.version = 0;
  TF.currentOrder = {};
  sessionStorage.setItem("tf-guest", "1");
  tfPaintChrome();
  tfSetSync("guest", "Visitante: progresso só neste navegador.");
  if (typeof renderToday === "function") renderToday();
  if (typeof renderQuestoes === "function") renderQuestoes();
}

function renderPerfil() {
  const box = document.getElementById("perfil-box");
  if (!box) return;
  if (!TF.user) {
    box.innerHTML = `<article class="card"><h3>Visitante</h3><p>Entre para ver perfil, nuvem e ranking.</p><button type="button" class="btn primary" id="perfil-enter">Entrar</button></article>`;
    const b = document.getElementById("perfil-enter");
    if (b) b.addEventListener("click", () => tfShowGate(true));
    return;
  }
  const st = TF.streak || { current: 0, best: 0, total: 0, completed: [] };
  const orig = tfOriginStats();
  const pct = (x) => x.n ? Math.round(x.ok * 100 / x.n) : 0;
  const days = (typeof DAYS !== "undefined" ? DAYS : []).filter((d) => d.id >= "2026-11-02" && d.id <= "2026-11-22");
  box.innerHTML = `
    <article class="card">
      <p class="phase">Meu perfil</p>
      <h3>${tfEsc(TF.user.nickname)}</h3>
      <p>@${tfEsc(TF.user.username)} · conta desde ${tfEsc((TF.user.createdAt || "").slice(0, 10))}</p>
      <div class="dash">
        <div class="stat"><b>${st.current}</b><span>sequência atual</span></div>
        <div class="stat"><b>${st.best}</b><span>recorde</span></div>
        <div class="stat"><b>${st.total}</b><span>dias concluídos</span></div>
        <div class="stat"><b>${orig.banco.n + orig.cronograma.n}</b><span>tentativas registradas</span></div>
      </div>
      <p>Você concluiu ${st.total} dia(s) programado(s). Recorde: ${st.best} dia(s) consecutivos. O ranking usa checklists; não comprova atenção real.</p>
    </article>
    <article class="card">
      <h3>Calendário</h3>
      <div class="cal-dots">${days.map((d) => {
        const done = (st.completed || []).indexOf(d.id) >= 0;
        const cls = done ? "done" : (d.id > (st.today || "") ? "future" : "miss");
        return `<span class="cal-dot ${cls}" title="${d.id}">${d.id.slice(8)}</span>`;
      }).join("")}</div>
    </article>
    <article class="card">
      <h3>Desempenho por origem</h3>
      <ul>
        <li>Cronograma: ${orig.cronograma.ok}/${orig.cronograma.n} (${pct(orig.cronograma)}%)</li>
        <li>Banco: ${orig.banco.ok}/${orig.banco.n} (${pct(orig.banco)}%)</li>
        <li>Treino rápido: ${orig.treino_rapido.ok}/${orig.treino_rapido.n} (${pct(orig.treino_rapido)}%)</li>
        <li>Simulados: ${orig.simulado.ok}/${orig.simulado.n} (${pct(orig.simulado)}%)</li>
      </ul>
    </article>
    <article class="card">
      <h3>Conta</h3>
      <form id="perfil-form" class="gate-form">
        <label>Apelido<input name="nickname" value="${tfEsc(TF.user.nickname)}" maxlength="24" /></label>
        <label class="check"><input type="checkbox" name="rankingOptIn" ${TF.user.rankingOptIn ? "checked" : ""}/> Aparecer no ranking do grupo</label>
        <label>E-mail de recuperação (opcional)<input name="recoveryEmail" type="email" /></label>
        <button type="submit" class="btn primary">Salvar perfil</button>
      </form>
      <form id="pass-form" class="gate-form" style="margin-top:12px">
        <label>Senha atual<input name="currentPassword" type="password" /></label>
        <label>Nova senha<input name="newPassword" type="password" minlength="8" /></label>
        <button type="submit" class="btn">Alterar senha</button>
      </form>
      <p class="tree-meta" id="perfil-msg"></p>
      <div class="q-nav">
        <button type="button" class="btn wipe" id="btn-del">Solicitar exclusão da conta</button>
      </div>
    </article>
  `;
  document.getElementById("perfil-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    try {
      await tfApi("/api/me", {
        method: "PATCH",
        body: {
          nickname: fd.get("nickname"),
          rankingOptIn: !!fd.get("rankingOptIn"),
          recoveryEmail: fd.get("recoveryEmail") || undefined
        }
      });
      document.getElementById("perfil-msg").textContent = "Perfil atualizado.";
      const sess = await tfApi("/api/session");
      TF.user = sess.user;
      tfPaintChrome();
    } catch (e) {
      document.getElementById("perfil-msg").textContent = e.message;
    }
  });
  document.getElementById("pass-form").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    try {
      await tfApi("/api/me/password", { method: "POST", body: { currentPassword: fd.get("currentPassword"), newPassword: fd.get("newPassword") } });
      document.getElementById("perfil-msg").textContent = "Senha alterada.";
    } catch (e) {
      document.getElementById("perfil-msg").textContent = e.message;
    }
  });
  document.getElementById("btn-del").addEventListener("click", async () => {
    const u = prompt("Digite seu nome de usuário para excluir a conta.");
    if (!u) return;
    try {
      await tfApi("/api/me/delete", { method: "POST", body: { confirm: u } });
      await tfLogout();
    } catch (e) {
      document.getElementById("perfil-msg").textContent = e.message;
    }
  });
}

async function renderRanking() {
  const box = document.getElementById("ranking-box");
  if (!box) return;
  if (!TF.user) {
    box.innerHTML = `<article class="card"><h3>Ranking privado</h3><p>Entre na sua conta para criar ou entrar em um grupo.</p></article>`;
    return;
  }
  let groups = [];
  try {
    const g = await tfApi("/api/groups");
    groups = g.groups || [];
  } catch {
    groups = [];
  }
  box.innerHTML = `
    <article class="card">
      <h3>Grupos de estudo</h3>
      <p>O ranking é privado por grupo. Só apelido, sequência, recorde e dias concluídos.</p>
      <form id="g-create" class="gate-form">
        <label>Nome do grupo<input name="name" required minlength="2" maxlength="40" /></label>
        <button class="btn primary" type="submit">Criar grupo</button>
      </form>
      <form id="g-join" class="gate-form">
        <label>Código de convite<input name="code" required /></label>
        <button class="btn" type="submit">Entrar</button>
      </form>
      <p id="g-msg" class="tree-meta"></p>
    </article>
    <div id="g-list"></div>
  `;
  document.getElementById("g-create").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const name = new FormData(ev.target).get("name");
    try {
      const out = await tfApi("/api/groups", { method: "POST", body: { name } });
      document.getElementById("g-msg").textContent = "Grupo criado. Convite (mostre só agora): " + out.inviteCode;
      renderRanking();
    } catch (e) { document.getElementById("g-msg").textContent = e.message; }
  });
  document.getElementById("g-join").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const code = new FormData(ev.target).get("code");
    try {
      await tfApi("/api/groups/join", { method: "POST", body: { code } });
      renderRanking();
    } catch (e) { document.getElementById("g-msg").textContent = e.message; }
  });
  const list = document.getElementById("g-list");
  for (const g of groups) {
    const art = document.createElement("article");
    art.className = "card";
    let rank = [];
    try {
      const r = await tfApi("/api/ranking?group=" + encodeURIComponent(g.id));
      rank = r.ranking || [];
    } catch { rank = []; }
    const podium = rank.slice(0, 3);
    const rest = rank.slice(3);
    art.innerHTML = `
      <h3>${tfEsc(g.name)}</h3>
      <div class="podium">${podium.map((p) => `<div class="podium-item"><b>${p.position}º</b><span>${tfEsc(p.nickname)}</span><span>${p.current} dia(s)</span></div>`).join("") || "<p>Ninguém no ranking ainda (ative a participação no perfil).</p>"}</div>
      ${rest.length ? `<ul>${rest.map((p) => `<li>${p.position}º · ${tfEsc(p.nickname)} · sequência ${p.current} · recorde ${p.best} · ${p.total} dia(s)</li>`).join("")}</ul>` : ""}
      <div class="q-nav">
        ${g.owner_id === TF.user.id ? `<button type="button" class="btn" data-inv="${g.id}">Novo convite</button>` : ""}
        <button type="button" class="btn" data-leave="${g.id}">Sair do grupo</button>
      </div>
    `;
    list.appendChild(art);
  }
  list.querySelectorAll("[data-leave]").forEach((b) => b.addEventListener("click", async () => {
    await tfApi("/api/groups/" + b.dataset.leave + "/leave", { method: "POST" });
    renderRanking();
  }));
  list.querySelectorAll("[data-inv]").forEach((b) => b.addEventListener("click", async () => {
    const out = await tfApi("/api/groups/" + b.dataset.inv + "/invite", { method: "POST" });
    document.getElementById("g-msg").textContent = "Novo convite: " + out.inviteCode;
  }));
}

window.tfScheduleSync = tfScheduleSync;
window.tfFlushSync = tfFlushSync;
window.tfMarkDirty = tfMarkDirty;
window.tfMergePreferLocal = tfMergePreferLocal;
window.TFPlatform = {
  TF, tfApi, tfOrderFor, tfPresent, tfRecordAttempt, tfOriginStats,
  tfScheduleSync, tfFlushSync, tfSetSync, tfMarkDirty, tfMergePreferLocal,
  tfRefreshViewsAfterSync,
  renderPerfil, renderRanking, tfShowGate, tfSetOrigin: function (o, dayId) {
    TF.origin = o || "banco";
    TF.dayId = dayId || null;
  }
};

window.addEventListener("online", () => { if (TF.user) tfFlushSync(); });
window.addEventListener("offline", () => tfSetSync("offline", "Sem internet: alterações salvas localmente."));

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const sess = await tfApi("/api/session");
    if (sess.user) {
      TF.user = sess.user;
      TF.streak = sess.streak;
      TF.guest = false;
      tfPaintChrome();
      const remote = await tfApi("/api/sync");
      TF.version = remote.version || 0;
      if (remote.payload) {
        const local = tfCollect();
        if (TF.dirty.size) {
          tfApply(tfMergePreferLocal(remote.payload, local, TF.dirty));
          tfScheduleSync();
        } else {
          tfApply(remote.payload);
        }
      } else tfOfferMigration(remote.migrated);
      tfRefreshViewsAfterSync();
      tfSetSync("ok", "Salvo na nuvem.");
    } else {
      tfPaintChrome();
      tfShowGate(false);
    }
  } catch {
    tfPaintChrome();
    tfShowGate(false);
    tfSetSync("offline", "Sem internet: alterações salvas localmente.");
  }
});
