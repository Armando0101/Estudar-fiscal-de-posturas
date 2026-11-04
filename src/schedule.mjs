export const TZ = "America/Sao_Paulo";

export const SCHEDULE = {
  "2026-11-02": { kind: "study", steps: 15, qNeed: 30 },
  "2026-11-03": { kind: "study", steps: 10, qNeed: 16 },
  "2026-11-04": { kind: "study", steps: 8, qNeed: 16 },
  "2026-11-05": { kind: "study", steps: 8, qNeed: 16 },
  "2026-11-06": { kind: "study", steps: 7, qNeed: 18 },
  "2026-11-07": { kind: "study", steps: 9, qNeed: 28 },
  "2026-11-08": { kind: "study", steps: 4, qNeed: 12 },
  "2026-11-09": { kind: "study", steps: 6, qNeed: 22 },
  "2026-11-10": { kind: "study", steps: 6, qNeed: 16 },
  "2026-11-11": { kind: "study", steps: 6, qNeed: 20 },
  "2026-11-12": { kind: "study", steps: 6, qNeed: 18 },
  "2026-11-13": { kind: "study", steps: 5, qNeed: 18 },
  "2026-11-14": { kind: "study", steps: 3, qNeed: 36 },
  "2026-11-15": { kind: "study", steps: 4, qNeed: 16 },
  "2026-11-16": { kind: "study", steps: 5, qNeed: 10 },
  "2026-11-17": { kind: "study", steps: 4, qNeed: 10 },
  "2026-11-18": { kind: "study", steps: 5, qNeed: 16 },
  "2026-11-19": { kind: "study", steps: 4, qNeed: 18 },
  "2026-11-20": { kind: "study", steps: 3, qNeed: 24 },
  "2026-11-21": { kind: "study", steps: 2, qNeed: 0 },
  "2026-11-22": { kind: "exam", steps: 2, qNeed: 0 }
};

export function stepKey(n) {
  return "st-s" + n;
}

export function requiredStepIds(dayId) {
  const spec = SCHEDULE[dayId];
  if (!spec) return [];
  const ids = [];
  for (let i = 1; i <= spec.steps; i++) ids.push(stepKey(i));
  return ids;
}

export function dayKind(dayId) {
  const spec = SCHEDULE[dayId];
  if (!spec) return "neutral";
  return spec.kind;
}

export function isDayComplete(dayId, rec) {
  const spec = SCHEDULE[dayId];
  if (!spec) return false;
  const map = rec || {};
  return requiredStepIds(dayId).every((id) => !!map[id]);
}

export function saoPauloDate(ts) {
  const d = new Date(ts);
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return fmt.format(d);
}

export function addDaysIso(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + n);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return yy + "-" + mm + "-" + dd;
}

export function computeStreak(completedSet, accountCreatedIso, todayIso) {
  const completed = completedSet instanceof Set ? completedSet : new Set(completedSet || []);
  let current = 0;
  let best = 0;
  let run = 0;
  let cursor = accountCreatedIso;
  if (cursor > todayIso) cursor = todayIso;
  const lastCheck = todayIso;
  let iso = cursor;
  while (iso <= lastCheck) {
    const kind = dayKind(iso);
    const done = completed.has(iso);
    if (kind === "neutral") {
      iso = addDaysIso(iso, 1);
      continue;
    }
    const isToday = iso === todayIso;
    if (done) {
      run += 1;
      if (run > best) best = run;
    } else if (isToday) {
      break;
    } else {
      run = 0;
    }
    iso = addDaysIso(iso, 1);
  }
  current = run;
  if (current > best) best = current;
  return { current, best, total: completed.size };
}

export const SYNC_KEYS = [
  "tango-fiscal-done",
  "tango-fiscal-edital",
  "tango-fiscal-answers",
  "tango-fiscal-review",
  "tango-fiscal-simulados",
  "tango-fiscal-caderno",
  "tango-fiscal-cards",
  "tango-fiscal-qfilters",
  "tango-fiscal-theme",
  "tango-fiscal-daycheck",
  "tango-fiscal-notes",
  "tango-fiscal-watched",
  "tango-fiscal-attempts",
  "tango-fiscal-shuffle",
  "tango-fiscal-qstate",
  "tango-fiscal-goals"
];
