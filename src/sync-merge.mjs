export const PAYLOAD_FROM_STORAGE = {
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

export function payloadKeyForStorage(k) {
  if (typeof k === "string" && /^b-2026-11-\d{2}-\d$/.test(k)) return "blocks";
  return PAYLOAD_FROM_STORAGE[k] || null;
}

function mergeAnswers(remote, local) {
  const out = Object.assign({}, remote && typeof remote === "object" ? remote : {});
  const loc = local && typeof local === "object" ? local : {};
  Object.keys(loc).forEach((id) => {
    const r = out[id];
    const l = loc[id];
    if (!r) {
      out[id] = l;
      return;
    }
    const rt = Number(r && r.at) || 0;
    const lt = Number(l && l.at) || 0;
    out[id] = lt >= rt ? l : r;
  });
  return out;
}

function mergeDict(remote, local) {
  return Object.assign({}, remote && typeof remote === "object" ? remote : {}, local && typeof local === "object" ? local : {});
}

function mergeDaycheck(remote, local) {
  const out = Object.assign({}, remote && typeof remote === "object" ? remote : {});
  const loc = local && typeof local === "object" ? local : {};
  Object.keys(loc).forEach((day) => {
    out[day] = Object.assign({}, out[day] || {}, loc[day] || {});
  });
  return out;
}

function mergeCaderno(remote, local) {
  const map = new Map();
  (Array.isArray(remote) ? remote : []).forEach((x) => {
    if (x && x.id) map.set(x.id, x);
  });
  (Array.isArray(local) ? local : []).forEach((x) => {
    if (!x || !x.id) return;
    const prev = map.get(x.id);
    if (!prev) {
      map.set(x.id, x);
      return;
    }
    const newer = (Number(x.last) || 0) >= (Number(prev.last) || 0) ? x : prev;
    const copy = Object.assign({}, newer);
    copy.misses = Math.max(Number(prev.misses) || 0, Number(x.misses) || 0);
    map.set(x.id, copy);
  });
  return Array.from(map.values());
}

function mergeSims(remote, local) {
  const map = new Map();
  (Array.isArray(remote) ? remote : []).forEach((x, i) => {
    map.set((x && (x.id || x.when)) || ("r" + i), x);
  });
  (Array.isArray(local) ? local : []).forEach((x, i) => {
    map.set((x && (x.id || x.when)) || ("l" + i), x);
  });
  return Array.from(map.values());
}

function mergeAttempts(remote, local) {
  const parse = (v) => {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") {
      try { return JSON.parse(v); } catch { return []; }
    }
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

const MERGE = {
  answers: mergeAnswers,
  review: mergeDict,
  cards: mergeDict,
  done: mergeDict,
  notes: mergeDict,
  watched: mergeDict,
  edital: mergeDict,
  daycheck: mergeDaycheck,
  blocks: mergeDict,
  shuffle: mergeDict,
  qstate: mergeDict,
  goals: mergeDict,
  caderno: mergeCaderno,
  sims: mergeSims,
  attempts: mergeAttempts
};

export function mergePreferLocal(remote, local, dirtyKeys) {
  const rem = remote && typeof remote === "object" ? remote : {};
  const loc = local && typeof local === "object" ? local : {};
  const dirty = dirtyKeys instanceof Set ? dirtyKeys : new Set(dirtyKeys || []);
  const out = Object.assign({}, rem);
  const keys = new Set(Object.keys(rem).concat(Object.keys(loc)));
  keys.forEach((k) => {
    if (k === "v" || k === "when") {
      out[k] = loc[k] != null ? loc[k] : rem[k];
      return;
    }
    const isDirty = dirty.has(k) || (dirty.size === 0 && loc[k] !== undefined);
    if (!isDirty) {
      out[k] = rem[k] !== undefined ? rem[k] : loc[k];
      return;
    }
    const fn = MERGE[k];
    if (fn) out[k] = fn(rem[k], loc[k]);
    else out[k] = loc[k] !== undefined ? loc[k] : rem[k];
  });
  return out;
}

export function isStaleResponse(sentSeq, currentSeq) {
  return Number(currentSeq) > Number(sentSeq);
}
