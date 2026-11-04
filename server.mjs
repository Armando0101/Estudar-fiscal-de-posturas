import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { createAuth } from "./src/auth.mjs";
import { handleApi } from "./src/api.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const dataDir = path.join(root, "data");
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "app.sqlite");
const sqlite = new DatabaseSync(dbPath);
const sql = fs.readFileSync(path.join(root, "migrations/0001_init.sql"), "utf8");
sqlite.exec(sql);

const env = {
  DB: sqlite,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "dev-secret-change-me-please-32b",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:" + port,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:" + port
};

const auth = createAuth(sqlite, env);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function safeFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const rel = decoded === "/" ? "/index.html" : decoded;
  const full = path.normalize(path.join(root, rel));
  if (!full.startsWith(root)) return null;
  if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) return null;
  return full;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, env.BETTER_AUTH_URL);
    const headers = new Headers();
    for (let i = 0; i < req.rawHeaders.length; i += 2) headers.append(req.rawHeaders[i], req.rawHeaders[i + 1]);
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks);
    const request = new Request(url, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : body
    });

    if (url.pathname.startsWith("/api/auth")) {
      const out = await auth.handler(request);
      res.statusCode = out.status;
      out.headers.forEach((v, k) => res.setHeader(k, v));
      res.end(Buffer.from(await out.arrayBuffer()));
      return;
    }
    if (url.pathname.startsWith("/api/")) {
      const out = await handleApi(request, env, auth);
      res.statusCode = out.status;
      out.headers.forEach((v, k) => res.setHeader(k, v));
      res.end(Buffer.from(await out.arrayBuffer()));
      return;
    }

    const file = safeFile(url.pathname);
    if (!file) {
      res.statusCode = 404;
      res.setHeader("content-type", "text/plain; charset=utf-8");
      res.end("Not found");
      return;
    }
    const ext = path.extname(file);
    res.setHeader("content-type", MIME[ext] || "application/octet-stream");
    res.setHeader("cache-control", "no-store");
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Erro interno");
  }
});

server.listen(port, "0.0.0.0", () => {
  process.stdout.write("Tanguá planner em http://localhost:" + port + "\n");
});
