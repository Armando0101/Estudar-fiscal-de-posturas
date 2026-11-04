import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { wrapDb } from "../src/db.mjs";
import { handleApi } from "../src/api.mjs";
import { sha256Hex, randomId } from "../src/crypto-util.mjs";
import { SCHEDULE, isDayComplete } from "../src/schedule.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const sql = fs.readFileSync(path.join(root, "../migrations/0001_init.sql"), "utf8");

function memDb() {
  const raw = new DatabaseSync(":memory:");
  raw.exec(sql);
  return raw;
}

function mockAuth(user) {
  return {
    api: {
      getSession: async () => (user ? { user } : null),
      signUpEmail: async () => ({ error: { message: "mock" } }),
      signInUsername: async () => ({ error: { message: "mock" } }),
      signOut: async () => ({}),
      setPassword: async () => ({}),
      changePassword: async () => ({})
    }
  };
}

async function call(db, auth, pathName, opts) {
  const o = opts || {};
  const req = new Request("http://localhost:8787" + pathName, {
    method: o.method || "GET",
    headers: { "content-type": "application/json", cookie: o.cookie || "" },
    body: o.body ? JSON.stringify(o.body) : undefined
  });
  const env = {
    DB: db,
    BETTER_AUTH_URL: "http://localhost:8787",
    ALLOWED_ORIGINS: "http://localhost:8787"
  };
  return handleApi(req, env, auth);
}

test("health responde sem autenticação", async () => {
  const db = memDb();
  const res = await call(db, mockAuth(null), "/api/health");
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.ok, true);
});

test("APIs autenticadas recusam visitante", async () => {
  const db = memDb();
  const auth = mockAuth(null);
  for (const p of ["/api/me", "/api/sync", "/api/groups", "/api/ranking?group=x"]) {
    const res = await call(db, auth, p);
    assert.equal(res.status, 401, p);
  }
});

test("origem de tentativa inválida é rejeitada", async () => {
  const db = memDb();
  const user = { id: "u1", username: "ana", name: "Ana", email: "u-1@internal.tango-fiscal.invalid" };
  db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
    .run(user.id, user.name, user.email, 0, new Date().toISOString(), new Date().toISOString(), "ana", "ana");
  const res = await call(db, mockAuth(user), "/api/attempts", {
    method: "POST",
    body: { questionId: "q01", origin: "hack", correct: true, order: ["c0", "c1", "c2", "c3"] }
  });
  assert.equal(res.status, 400);
});

test("tentativa válida grava histórico e estado atual", async () => {
  const db = memDb();
  const user = { id: "u1", username: "ana", name: "Ana", email: "u-1@internal.tango-fiscal.invalid" };
  db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
    .run(user.id, user.name, user.email, 0, new Date().toISOString(), new Date().toISOString(), "ana", "ana");
  const res = await call(db, mockAuth(user), "/api/attempts", {
    method: "POST",
    body: {
      questionId: "q01",
      origin: "cronograma",
      dayId: "2026-11-02",
      correct: true,
      choiceId: "c2",
      order: ["c1", "c0", "c2", "c3"],
      correctPos: 2
    }
  });
  assert.equal(res.status, 200);
  const wrapped = wrapDb(db);
  const att = await wrapped.get("SELECT origin, correct, question_id FROM question_attempts WHERE user_id = ?", [user.id]);
  assert.equal(att.origin, "cronograma");
  assert.equal(att.correct, 1);
  assert.equal(att.question_id, "q01");
  const st = await wrapped.get("SELECT question_id FROM question_current_state WHERE user_id = ?", [user.id]);
  assert.equal(st.question_id, "q01");
});

test("reset-current limpa estado atual e preserva histórico", async () => {
  const db = memDb();
  const user = { id: "u1", username: "ana", name: "Ana", email: "u-1@internal.tango-fiscal.invalid" };
  db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
    .run(user.id, user.name, user.email, 0, new Date().toISOString(), new Date().toISOString(), "ana", "ana");
  const auth = mockAuth(user);
  await call(db, auth, "/api/attempts", {
    method: "POST",
    body: { questionId: "q02", origin: "banco", correct: false, choiceId: "c0", order: ["c0", "c1", "c2", "c3"] }
  });
  const res = await call(db, auth, "/api/attempts/reset-current", { method: "POST" });
  assert.equal(res.status, 200);
  const wrapped = wrapDb(db);
  const cur = await wrapped.get("SELECT question_id FROM question_current_state WHERE user_id = ?", [user.id]);
  assert.equal(cur, null);
  const att = await wrapped.get("SELECT question_id FROM question_attempts WHERE user_id = ?", [user.id]);
  assert.equal(att.question_id, "q02");
});

test("sync PUT incrementa versão e 409 quando cliente está atrasado", async () => {
  const db = memDb();
  const user = { id: "u1", username: "ana", name: "Ana", email: "u-1@internal.tango-fiscal.invalid" };
  db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
    .run(user.id, user.name, user.email, 0, new Date().toISOString(), new Date().toISOString(), "ana", "ana");
  const auth = mockAuth(user);
  const a = await call(db, auth, "/api/sync", { method: "PUT", body: { payload: { v: 1, done: {} }, version: 0 } });
  assert.equal(a.status, 200);
  const first = await a.json();
  assert.ok(first.version >= 1);
  const b = await call(db, auth, "/api/sync", { method: "PUT", body: { payload: { v: 1, done: { x: 1 } }, version: first.version } });
  assert.equal(b.status, 200);
  const conflict = await call(db, auth, "/api/sync", { method: "PUT", body: { payload: { v: 1 }, version: 1 } });
  assert.equal(conflict.status, 409);
});

test("conclusão de dia no payload vira daily_completions", async () => {
  const db = memDb();
  const user = { id: "u1", username: "ana", name: "Ana", email: "u-1@internal.tango-fiscal.invalid" };
  db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
    .run(user.id, user.name, user.email, 0, new Date().toISOString(), new Date().toISOString(), "ana", "ana");
  const rec = {};
  SCHEDULE["2026-11-02"].steps;
  for (let i = 1; i <= SCHEDULE["2026-11-02"].steps; i++) rec["st-s" + i] = true;
  assert.equal(isDayComplete("2026-11-02", rec), true);
  const auth = mockAuth(user);
  const res = await call(db, auth, "/api/sync", {
    method: "PUT",
    body: { payload: { v: 1, daycheck: { "2026-11-02": rec } }, version: 0 }
  });
  assert.equal(res.status, 200);
  const row = wrapDb(db);
  const done = await row.get("SELECT day_id FROM daily_completions WHERE user_id = ? AND day_id = ?", [user.id, "2026-11-02"]);
  assert.equal(done.day_id, "2026-11-02");
});

test("grupo: ranking recusa quem não é membro; opt-out some da lista", async () => {
  const db = memDb();
  const now = new Date().toISOString();
  const insertUser = (id, username) => {
    db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
      .run(id, username, id + "@internal.tango-fiscal.invalid", 0, now, now, username, username);
    db.prepare("INSERT INTO profiles (user_id, nickname, avatar, recovery_email, recovery_key_hash, ranking_opt_in, created_at, updated_at) VALUES (?,?,NULL,NULL,NULL,1,?,?)")
      .run(id, username, now, now);
  };
  insertUser("u1", "ana");
  insertUser("u2", "bia");
  insertUser("u3", "cris");
  db.prepare("INSERT INTO study_groups (id, name, owner_id, invite_hash, created_at) VALUES (?,?,?,?,?)")
    .run("g1", "Turma", "u1", "h", now);
  db.prepare("INSERT INTO study_group_members (group_id, user_id, joined_at) VALUES (?,?,?)").run("g1", "u1", now);
  db.prepare("INSERT INTO study_group_members (group_id, user_id, joined_at) VALUES (?,?,?)").run("g1", "u2", now);
  db.prepare("UPDATE profiles SET ranking_opt_in = 0 WHERE user_id = ?").run("u2");
  const outsider = await call(db, mockAuth({ id: "u3", username: "cris", name: "cris", email: "u3@internal.tango-fiscal.invalid" }), "/api/ranking?group=g1");
  assert.equal(outsider.status, 403);
  const inside = await call(db, mockAuth({ id: "u1", username: "ana", name: "ana", email: "u1@internal.tango-fiscal.invalid" }), "/api/ranking?group=g1");
  assert.equal(inside.status, 200);
  const data = await inside.json();
  assert.equal(data.ranking.length, 1);
  assert.equal(data.ranking[0].nickname, "ana");
  assert.equal("pct" in data.ranking[0], false);
});

test("cadastro rejeita username curto e senha curta", async () => {
  const db = memDb();
  const auth = mockAuth(null);
  const a = await call(db, auth, "/api/register", { method: "POST", body: { username: "ab", password: "12345678", nickname: "Ana" } });
  assert.equal(a.status, 400);
  const b = await call(db, auth, "/api/register", { method: "POST", body: { username: "ana01", password: "123", nickname: "Ana" } });
  assert.equal(b.status, 400);
});

test("hash SHA-256 da chave de recuperação é estável", async () => {
  const a = await sha256Hex("chave-teste");
  const b = await sha256Hex("chave-teste");
  assert.equal(a, b);
  assert.equal(a.length, 64);
  assert.notEqual(a, await sha256Hex("outra"));
  assert.match(randomId(8), /^[a-f0-9]{16}$/);
});

test("cadastro e login reais com Better Auth + cookie", async () => {
  const db = memDb();
  const env = {
    DB: db,
    BETTER_AUTH_SECRET: "dev-secret-change-me-please-32bxxxx",
    BETTER_AUTH_URL: "http://localhost:8787",
    ALLOWED_ORIGINS: "http://localhost:8787"
  };
  const { createAuth } = await import("../src/auth.mjs");
  const auth = createAuth(db, env);
  const req = (path, method, body, cookie) => new Request("http://localhost:8787" + path, {
    method,
    headers: { "content-type": "application/json", cookie: cookie || "" },
    body: body ? JSON.stringify(body) : undefined
  });
  const reg = await handleApi(req("/api/register", "POST", { username: "ana01", password: "senha1234", nickname: "Ana" }), env, auth);
  assert.equal(reg.status, 201);
  const created = await reg.json();
  assert.equal(created.ok, true);
  assert.match(created.recoveryKey, /^[a-f0-9]{32}$/);
  const cookie = (reg.headers.getSetCookie ? reg.headers.getSetCookie()[0] : reg.headers.get("set-cookie")) || "";
  assert.match(cookie, /better-auth\.session_token=/);
  const sess = await handleApi(req("/api/session", "GET", null, cookie.split(";")[0]), env, auth);
  const session = await sess.json();
  assert.equal(session.user.username, "ana01");
  assert.equal(session.user.nickname, "Ana");
  const bad = await handleApi(req("/api/login", "POST", { username: "ana01", password: "erradaaaa" }), env, auth);
  assert.equal(bad.status, 401);
  const login = await handleApi(req("/api/login", "POST", { username: "ana01", password: "senha1234" }), env, auth);
  assert.equal(login.status, 200);
});

test("isolamento: tentativas de A não aparecem para B", async () => {
  const db = memDb();
  const now = new Date().toISOString();
  for (const [id, username] of [["u1", "ana"], ["u2", "bia"]]) {
    db.prepare("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt, username, displayUsername) VALUES (?,?,?,?,?,?,?,?)")
      .run(id, username, id + "@internal.tango-fiscal.invalid", 0, now, now, username, username);
  }
  await call(db, mockAuth({ id: "u1", username: "ana", name: "ana", email: "x" }), "/api/attempts", {
    method: "POST",
    body: { questionId: "q10", origin: "banco", correct: true, order: ["c0", "c1", "c2", "c3"] }
  });
  const meB = await call(db, mockAuth({ id: "u2", username: "bia", name: "bia", email: "y" }), "/api/me");
  const data = await meB.json();
  assert.equal(data.stats.totalAttempts, 0);
});
