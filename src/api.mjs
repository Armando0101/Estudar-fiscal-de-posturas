import { wrapDb } from "./db.mjs";
import { randomId, sha256Hex, nowIso } from "./crypto-util.mjs";
import { SCHEDULE, isDayComplete, saoPauloDate, computeStreak, requiredStepIds } from "./schedule.mjs";

const USERNAME_RE = /^[a-zA-Z0-9._]{3,24}$/;
const NICK_RE = /^[\p{L}\p{N} ._-]{2,24}$/u;
const ORIGINS = new Set(["cronograma", "banco", "treino_rapido", "simulado"]);

function json(data, status, headers) {
  const h = new Headers(headers || {});
  h.set("content-type", "application/json; charset=utf-8");
  h.set("cache-control", "no-store");
  return new Response(JSON.stringify(data), { status: status || 200, headers: h });
}

function bad(msg, status) {
  return json({ error: msg }, status || 400);
}

function parseCookies(header) {
  const out = {};
  String(header || "").split(";").forEach((part) => {
    const i = part.indexOf("=");
    if (i < 0) return;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

async function rateLimit(db, key, max, windowMs) {
  const now = Date.now();
  const row = await db.get("SELECT count, reset_at FROM rate_limits WHERE key = ?", [key]);
  if (!row || row.reset_at < now) {
    await db.run("INSERT OR REPLACE INTO rate_limits (key, count, reset_at) VALUES (?, ?, ?)", [key, 1, now + windowMs]);
    return true;
  }
  if (row.count >= max) return false;
  await db.run("UPDATE rate_limits SET count = count + 1 WHERE key = ?", [key]);
  return true;
}

function clientIp(req) {
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "local";
}

async function getSessionUser(auth, req) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session && session.user ? session : null;
}

function internalEmail() {
  return "u-" + randomId(12) + "@internal.tango-fiscal.invalid";
}

function isInternalEmail(email) {
  return String(email || "").endsWith("@internal.tango-fiscal.invalid");
}

async function ensureProfile(db, user, nickname) {
  const existing = await db.get("SELECT * FROM profiles WHERE user_id = ?", [user.id]);
  if (existing) return existing;
  const now = nowIso();
  const nick = nickname || user.name || user.username || "Estudante";
  await db.run(
    "INSERT INTO profiles (user_id, nickname, avatar, recovery_email, recovery_key_hash, ranking_opt_in, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 1, ?, ?)",
    [user.id, nick, null, isInternalEmail(user.email) ? null : user.email, null, now, now]
  );
  return await db.get("SELECT * FROM profiles WHERE user_id = ?", [user.id]);
}

function publicProfile(user, profile) {
  return {
    id: user.id,
    username: user.username,
    nickname: profile.nickname,
    avatar: profile.avatar || null,
    createdAt: profile.created_at,
    rankingOptIn: !!profile.ranking_opt_in,
    hasRecoveryEmail: !!(profile.recovery_email || (user.email && !isInternalEmail(user.email))),
    hasRecoveryKey: !!profile.recovery_key_hash
  };
}

function extractDaycheck(payload) {
  try {
    const data = typeof payload === "string" ? JSON.parse(payload) : payload;
    return (data && data.daycheck) || {};
  } catch {
    return {};
  }
}

async function recomputeCompletions(db, userId, payload) {
  const daycheck = extractDaycheck(payload);
  const done = (payload && payload.done) || {};
  const today = saoPauloDate(Date.now());
  for (const dayId of Object.keys(SCHEDULE)) {
    const rec = daycheck[dayId] || {};
    const complete = isDayComplete(dayId, rec) || !!done[dayId];
    if (complete) {
      const existing = await db.get("SELECT day_id FROM daily_completions WHERE user_id = ? AND day_id = ?", [userId, dayId]);
      if (!existing) {
        await db.run(
          "INSERT INTO daily_completions (user_id, day_id, completed_at) VALUES (?, ?, ?)",
          [userId, dayId, nowIso()]
        );
      }
    }
    await db.run(
      "INSERT OR REPLACE INTO daily_task_completions (user_id, day_id, rec_json, updated_at) VALUES (?, ?, ?, ?)",
      [userId, dayId, JSON.stringify(rec), nowIso()]
    );
  }
  return today;
}

async function streakFor(db, userId, createdAt) {
  const rows = await db.all("SELECT day_id FROM daily_completions WHERE user_id = ?", [userId]);
  const set = new Set(rows.map((r) => r.day_id));
  const createdIso = saoPauloDate(Date.parse(createdAt) || Date.now());
  const today = saoPauloDate(Date.now());
  const st = computeStreak(set, createdIso, today);
  return Object.assign({ completed: Array.from(set).sort() }, st);
}

function authPayload(result) {
  if (!result) return {};
  if (result.response) return result.response;
  if (result.data) return result.data;
  return result;
}

function authUser(result) {
  const payload = authPayload(result);
  return payload.user || result.user || null;
}

function copyAuthCookies(result, headers) {
  if (!result || !result.headers) return;
  const setCookie = result.headers.getSetCookie ? result.headers.getSetCookie() : result.headers.get("set-cookie");
  if (Array.isArray(setCookie)) setCookie.forEach((c) => headers.append("set-cookie", c));
  else if (setCookie) headers.append("set-cookie", setCookie);
}

function corsHeaders(req, env) {
  const origin = req.headers.get("origin") || "";
  const allowed = String(env.ALLOWED_ORIGINS || env.BETTER_AUTH_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const h = {
    "access-control-allow-credentials": "true",
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  };
  if (!origin) return h;
  if (allowed.includes(origin) || allowed.includes("*")) h["access-control-allow-origin"] = origin;
  return h;
}

export async function handleApi(req, env, auth) {
  const url = new URL(req.url);
  const db = wrapDb(env.DB);
  const cors = corsHeaders(req, env);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

  const withCors = (res) => {
    const h = new Headers(res.headers);
    Object.keys(cors).forEach((k) => h.set(k, cors[k]));
    return new Response(res.body, { status: res.status, headers: h });
  };

  try {
    if (url.pathname === "/api/register" && req.method === "POST") {
      if (!(await rateLimit(db, "reg:" + clientIp(req), 8, 10 * 60 * 1000))) return withCors(bad("Muitas tentativas. Aguarde alguns minutos.", 429));
      const body = await req.json().catch(() => ({}));
      const username = String(body.username || "").trim();
      const password = String(body.password || "");
      const nickname = String(body.nickname || "").trim();
      const recoveryEmail = String(body.recoveryEmail || "").trim().toLowerCase();
      if (!USERNAME_RE.test(username)) return withCors(bad("Nome de usuário: 3 a 24 caracteres, letras, números, ponto ou _."));
      if (password.length < 8) return withCors(bad("A senha precisa ter pelo menos 8 caracteres."));
      if (!NICK_RE.test(nickname)) return withCors(bad("Apelido: 2 a 24 caracteres."));
      if (recoveryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail)) return withCors(bad("E-mail de recuperação inválido."));
      const taken = await db.get("SELECT id FROM user WHERE username = ?", [username.toLowerCase()]);
      if (taken) return withCors(bad("Não foi possível criar a conta com esses dados.", 400));
      const email = recoveryEmail || internalEmail();
      const result = await auth.api.signUpEmail({
        body: { email, password, name: nickname, username },
        headers: req.headers,
        returnHeaders: true
      });
      if (!result || result.error) {
        const msg = (result && result.error && result.error.message) || "Não foi possível criar a conta.";
        return withCors(bad(msg, 400));
      }
      const user = authUser(result);
      if (!user) return withCors(bad("Cadastro incompleto.", 500));
      const recoveryKey = randomId(16);
      const recoveryHash = await sha256Hex(recoveryKey);
      const now = nowIso();
      await db.run(
        "INSERT OR REPLACE INTO profiles (user_id, nickname, avatar, recovery_email, recovery_key_hash, ranking_opt_in, created_at, updated_at) VALUES (?, ?, NULL, ?, ?, 1, ?, ?)",
        [user.id, nickname, recoveryEmail || null, recoveryHash, now, now]
      );
      const headers = new Headers(cors);
      headers.set("content-type", "application/json; charset=utf-8");
      copyAuthCookies(result, headers);
      return new Response(JSON.stringify({
        ok: true,
        recoveryKey,
        user: { id: user.id, username, nickname }
      }), { status: 201, headers });
    }

    if (url.pathname === "/api/login" && req.method === "POST") {
      if (!(await rateLimit(db, "login:" + clientIp(req), 12, 10 * 60 * 1000))) return withCors(bad("Muitas tentativas de login.", 429));
      const body = await req.json().catch(() => ({}));
      const username = String(body.username || "").trim();
      const password = String(body.password || "");
      if (!username || !password) return withCors(bad("Informe usuário e senha."));
      try {
        const result = await auth.api.signInUsername({
          body: { username, password },
          headers: req.headers,
          returnHeaders: true
        });
        const user = authUser(result);
        if (!result || result.error || !user) {
          return withCors(bad("Usuário ou senha inválidos.", 401));
        }
        await ensureProfile(db, user, user.name);
        const headers = new Headers(cors);
        headers.set("content-type", "application/json; charset=utf-8");
        copyAuthCookies(result, headers);
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
      } catch {
        return withCors(bad("Usuário ou senha inválidos.", 401));
      }
    }

    if (url.pathname === "/api/logout" && req.method === "POST") {
      const result = await auth.api.signOut({ headers: req.headers, returnHeaders: true });
      const headers = new Headers(cors);
      headers.set("content-type", "application/json; charset=utf-8");
      copyAuthCookies(result, headers);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }

    if (url.pathname === "/api/recover" && req.method === "POST") {
      if (!(await rateLimit(db, "rec:" + clientIp(req), 8, 10 * 60 * 1000))) return withCors(bad("Muitas tentativas.", 429));
      const body = await req.json().catch(() => ({}));
      const username = String(body.username || "").trim().toLowerCase();
      const recoveryKey = String(body.recoveryKey || "").trim();
      const newPassword = String(body.newPassword || "");
      if (!username || !recoveryKey || newPassword.length < 8) return withCors(bad("Informe usuário, chave e nova senha (mín. 8)."));
      const user = await db.get("SELECT * FROM user WHERE username = ?", [username]);
      if (!user) return withCors(bad("Não foi possível recuperar a conta.", 400));
      const profile = await db.get("SELECT * FROM profiles WHERE user_id = ?", [user.id]);
      if (!profile || !profile.recovery_key_hash) return withCors(bad("Não foi possível recuperar a conta.", 400));
      const hash = await sha256Hex(recoveryKey);
      if (hash !== profile.recovery_key_hash) return withCors(bad("Não foi possível recuperar a conta.", 400));
      await auth.api.setPassword({
        body: { newPassword },
        headers: new Headers({ "user-id": user.id })
      }).catch(() => null);
      const account = await db.get("SELECT id FROM account WHERE userId = ? AND providerId = ?", [user.id, "credential"]);
      if (account) {
        const ctx = await auth.$context;
        if (ctx && ctx.password && ctx.password.hash) {
          const hashed = await ctx.password.hash(newPassword);
          await db.run("UPDATE account SET password = ? WHERE id = ?", [hashed, account.id]);
        }
      }
      return withCors(json({ ok: true }));
    }

    const session = await getSessionUser(auth, req);
    const needAuth = url.pathname.startsWith("/api/") && url.pathname !== "/api/health";
    if (url.pathname === "/api/health") return withCors(json({ ok: true }));
    if (url.pathname === "/api/session" && req.method === "GET") {
      if (!session) return withCors(json({ user: null }));
      const profile = await ensureProfile(db, session.user, session.user.name);
      const streak = await streakFor(db, session.user.id, profile.created_at);
      return withCors(json({ user: publicProfile(session.user, profile), streak }));
    }
    if (!session) return withCors(bad("Não autenticado.", 401));
    const user = session.user;
    const profile = await ensureProfile(db, user, user.name);

    if (url.pathname === "/api/me" && req.method === "GET") {
      const streak = await streakFor(db, user.id, profile.created_at);
      const attempts = await db.all("SELECT origin, correct FROM question_attempts WHERE user_id = ?", [user.id]);
      const byOrigin = {};
      attempts.forEach((a) => {
        const o = a.origin || "banco";
        byOrigin[o] = byOrigin[o] || { n: 0, ok: 0 };
        byOrigin[o].n += 1;
        if (a.correct) byOrigin[o].ok += 1;
      });
      const groups = await db.all(
        "SELECT g.id, g.name, g.owner_id FROM study_group_members m JOIN study_groups g ON g.id = m.group_id WHERE m.user_id = ?",
        [user.id]
      );
      return withCors(json({
        user: publicProfile(user, profile),
        streak,
        stats: { totalAttempts: attempts.length, byOrigin },
        groups
      }));
    }

    if (url.pathname === "/api/me" && req.method === "PATCH") {
      const body = await req.json().catch(() => ({}));
      let nick = profile.nickname;
      if (body.nickname != null) {
        nick = String(body.nickname).trim();
        if (!NICK_RE.test(nick)) return withCors(bad("Apelido inválido."));
      }
      let opt = profile.ranking_opt_in;
      if (body.rankingOptIn != null) opt = body.rankingOptIn ? 1 : 0;
      let avatar = profile.avatar;
      if (body.avatar != null) {
        const av = String(body.avatar);
        if (av && av.length > 200000) return withCors(bad("Avatar grande demais."));
        avatar = av || null;
      }
      let recEmail = profile.recovery_email;
      if (body.recoveryEmail != null) {
        const em = String(body.recoveryEmail).trim().toLowerCase();
        if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return withCors(bad("E-mail inválido."));
        recEmail = em || null;
        if (recEmail) {
          const clash = await db.get("SELECT id FROM user WHERE email = ? AND id != ?", [recEmail, user.id]);
          if (clash) return withCors(bad("Este e-mail já está em uso."));
          await db.run("UPDATE user SET email = ? WHERE id = ?", [recEmail, user.id]);
        }
      }
      await db.run(
        "UPDATE profiles SET nickname = ?, avatar = ?, recovery_email = ?, ranking_opt_in = ?, updated_at = ? WHERE user_id = ?",
        [nick, avatar, recEmail, opt, nowIso(), user.id]
      );
      return withCors(json({ ok: true }));
    }

    if (url.pathname === "/api/me/password" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const current = String(body.currentPassword || "");
      const next = String(body.newPassword || "");
      if (next.length < 8) return withCors(bad("Nova senha: mínimo 8 caracteres."));
      try {
        await auth.api.changePassword({
          body: { currentPassword: current, newPassword: next },
          headers: req.headers
        });
        return withCors(json({ ok: true }));
      } catch {
        return withCors(bad("Não foi possível alterar a senha.", 400));
      }
    }

    if (url.pathname === "/api/me/delete" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (String(body.confirm || "") !== user.username) return withCors(bad("Digite o nome de usuário para confirmar."));
      await db.run("DELETE FROM user WHERE id = ?", [user.id]);
      await auth.api.signOut({ headers: req.headers }).catch(() => {});
      return withCors(json({ ok: true }));
    }

    if (url.pathname === "/api/sync" && req.method === "GET") {
      const row = await db.get("SELECT payload, updated_at, version FROM progress_records WHERE user_id = ?", [user.id]);
      const mig = await db.get("SELECT migrated FROM migration_flags WHERE user_id = ?", [user.id]);
      return withCors(json({
        payload: row ? JSON.parse(row.payload) : null,
        updatedAt: row ? row.updated_at : null,
        version: row ? row.version : 0,
        migrated: !!(mig && mig.migrated)
      }));
    }

    if (url.pathname === "/api/sync" && req.method === "PUT") {
      const body = await req.json().catch(() => ({}));
      const payload = body.payload;
      if (!payload || typeof payload !== "object") return withCors(bad("Payload inválido."));
      const incoming = Number(body.version || 0);
      const row = await db.get("SELECT version, updated_at FROM progress_records WHERE user_id = ?", [user.id]);
      if (row && incoming && incoming < row.version) {
        return withCors(json({ conflict: true, serverVersion: row.version, serverUpdatedAt: row.updated_at }, 409));
      }
      const version = row ? Math.max(row.version, incoming) + 1 : Math.max(1, incoming + 1);
      const updated = nowIso();
      const text = JSON.stringify(payload);
      await db.run(
        "INSERT OR REPLACE INTO progress_records (user_id, payload, updated_at, version) VALUES (?, ?, ?, ?)",
        [user.id, text, updated, version]
      );
      await recomputeCompletions(db, user.id, payload);
      return withCors(json({ ok: true, version, updatedAt: updated }));
    }

    if (url.pathname === "/api/migrate" && req.method === "POST") {
      const flag = await db.get("SELECT migrated FROM migration_flags WHERE user_id = ?", [user.id]);
      if (flag && flag.migrated) return withCors(bad("Migração já concluída para esta conta.", 409));
      const body = await req.json().catch(() => ({}));
      const payload = body.payload;
      if (!payload || typeof payload !== "object") return withCors(bad("Backup inválido."));
      const existing = await db.get("SELECT payload FROM progress_records WHERE user_id = ?", [user.id]);
      let merged = payload;
      if (existing && existing.payload) {
        try { merged = Object.assign(JSON.parse(existing.payload), payload); } catch { merged = payload; }
      }
      await db.run(
        "INSERT OR REPLACE INTO progress_records (user_id, payload, updated_at, version) VALUES (?, ?, ?, ?)",
        [user.id, JSON.stringify(merged), nowIso(), 1]
      );
      await recomputeCompletions(db, user.id, merged);
      await db.run(
        "INSERT OR REPLACE INTO migration_flags (user_id, migrated, migrated_at) VALUES (?, 1, ?)",
        [user.id, nowIso()]
      );
      return withCors(json({ ok: true }));
    }

    if (url.pathname === "/api/attempts" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const origin = String(body.origin || "");
      if (!ORIGINS.has(origin)) return withCors(bad("Origem inválida."));
      const qid = String(body.questionId || "");
      if (!/^q\d{2,3}$/.test(qid)) return withCors(bad("Questão inválida."));
      const order = Array.isArray(body.order) ? body.order : [];
      const id = randomId(12);
      await db.run(
        "INSERT INTO question_attempts (id, user_id, question_id, origin, day_id, subject, disc, choice_id, correct, order_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, user.id, qid, origin, body.dayId || null, body.subject || null, body.disc || null, body.choiceId || null, body.correct ? 1 : 0, JSON.stringify(order), nowIso()]
      );
      await db.run(
        "INSERT OR REPLACE INTO question_current_state (user_id, question_id, choice_id, correct, order_json, origin, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [user.id, qid, body.choiceId || null, body.correct ? 1 : 0, JSON.stringify(order), origin, nowIso()]
      );
      if (Array.isArray(order) && order.length) {
        const pos = typeof body.correctPos === "number" ? body.correctPos : null;
        await db.run(
          "INSERT OR REPLACE INTO question_shuffle_history (user_id, question_id, last_correct_pos, last_order_json, updated_at) VALUES (?, ?, ?, ?, ?)",
          [user.id, qid, pos, JSON.stringify(order), nowIso()]
        );
      }
      return withCors(json({ ok: true, id }));
    }

    if (url.pathname === "/api/attempts/reset-current" && req.method === "POST") {
      await db.run("DELETE FROM question_current_state WHERE user_id = ?", [user.id]);
      return withCors(json({ ok: true }));
    }

    if (url.pathname === "/api/groups" && req.method === "GET") {
      const groups = await db.all(
        "SELECT g.id, g.name, g.owner_id, g.created_at FROM study_group_members m JOIN study_groups g ON g.id = m.group_id WHERE m.user_id = ?",
        [user.id]
      );
      return withCors(json({ groups }));
    }

    if (url.pathname === "/api/groups" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const name = String(body.name || "").trim();
      if (name.length < 2 || name.length > 40) return withCors(bad("Nome do grupo: 2 a 40 caracteres."));
      const id = randomId(8);
      const code = randomId(10);
      const hash = await sha256Hex(code);
      await db.run("INSERT INTO study_groups (id, name, owner_id, invite_hash, created_at) VALUES (?, ?, ?, ?, ?)", [id, name, user.id, hash, nowIso()]);
      await db.run("INSERT INTO study_group_members (group_id, user_id, joined_at) VALUES (?, ?, ?)", [id, user.id, nowIso()]);
      await db.run("INSERT INTO group_invites (id, group_id, code_hash, created_at, revoked) VALUES (?, ?, ?, ?, 0)", [randomId(8), id, hash, nowIso()]);
      return withCors(json({ ok: true, group: { id, name }, inviteCode: code }));
    }

    if (url.pathname === "/api/groups/join" && req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const code = String(body.code || "").trim();
      if (!code) return withCors(bad("Informe o convite."));
      const hash = await sha256Hex(code);
      const inv = await db.get("SELECT * FROM group_invites WHERE code_hash = ? AND revoked = 0", [hash]);
      if (!inv) return withCors(bad("Convite inválido ou revogado.", 400));
      await db.run("INSERT OR IGNORE INTO study_group_members (group_id, user_id, joined_at) VALUES (?, ?, ?)", [inv.group_id, user.id, nowIso()]);
      return withCors(json({ ok: true, groupId: inv.group_id }));
    }

    const groupLeave = url.pathname.match(/^\/api\/groups\/([a-f0-9]+)\/leave$/);
    if (groupLeave && req.method === "POST") {
      const gid = groupLeave[1];
      const mem = await db.get("SELECT user_id FROM study_group_members WHERE group_id = ? AND user_id = ?", [gid, user.id]);
      if (!mem) return withCors(bad("Você não participa deste grupo.", 403));
      await db.run("DELETE FROM study_group_members WHERE group_id = ? AND user_id = ?", [gid, user.id]);
      return withCors(json({ ok: true }));
    }

    const groupInvite = url.pathname.match(/^\/api\/groups\/([a-f0-9]+)\/invite$/);
    if (groupInvite && req.method === "POST") {
      const gid = groupInvite[1];
      const g = await db.get("SELECT * FROM study_groups WHERE id = ?", [gid]);
      if (!g || g.owner_id !== user.id) return withCors(bad("Só o dono gera convite.", 403));
      const code = randomId(10);
      const hash = await sha256Hex(code);
      await db.run("UPDATE group_invites SET revoked = 1 WHERE group_id = ?", [gid]);
      await db.run("INSERT INTO group_invites (id, group_id, code_hash, created_at, revoked) VALUES (?, ?, ?, ?, 0)", [randomId(8), gid, hash, nowIso()]);
      await db.run("UPDATE study_groups SET invite_hash = ? WHERE id = ?", [hash, gid]);
      return withCors(json({ ok: true, inviteCode: code }));
    }

    if (url.pathname === "/api/ranking" && req.method === "GET") {
      const groupId = url.searchParams.get("group");
      if (!groupId) return withCors(bad("Informe o grupo."));
      const mem = await db.get("SELECT user_id FROM study_group_members WHERE group_id = ? AND user_id = ?", [groupId, user.id]);
      if (!mem) return withCors(bad("Acesso negado a este ranking.", 403));
      const members = await db.all(
        "SELECT m.user_id, p.nickname, p.ranking_opt_in, p.created_at FROM study_group_members m JOIN profiles p ON p.user_id = m.user_id WHERE m.group_id = ?",
        [groupId]
      );
      const rows = [];
      for (const m of members) {
        if (!m.ranking_opt_in) continue;
        const st = await streakFor(db, m.user_id, m.created_at);
        rows.push({
          nickname: m.nickname,
          current: st.current,
          best: st.best,
          total: st.total,
          me: m.user_id === user.id
        });
      }
      rows.sort((a, b) => b.current - a.current || b.best - a.best || b.total - a.total);
      const ranked = rows.map((r, i) => Object.assign({ position: i + 1 }, r));
      return withCors(json({ ranking: ranked }));
    }

    return withCors(bad("Não encontrado.", 404));
  } catch (err) {
    return withCors(json({ error: "Falha interna." }, 500));
  }
}

export { parseCookies, requiredStepIds };
