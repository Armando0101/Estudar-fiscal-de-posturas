export function wrapDb(raw) {
  const d1 = typeof raw.prepare === "function" && typeof raw.batch === "function";
  return {
    raw,
    d1,
    async exec(sql) {
      if (d1) {
        const statements = String(sql)
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => raw.prepare(s));
        if (statements.length) await raw.batch(statements);
        return;
      }
      raw.exec(sql);
    },
    async all(sql, params) {
      const p = params || [];
      if (d1) {
        const res = await raw.prepare(sql).bind(...p).all();
        return res.results || [];
      }
      return raw.prepare(sql).all(...p);
    },
    async get(sql, params) {
      const p = params || [];
      if (d1) return await raw.prepare(sql).bind(...p).first();
      return raw.prepare(sql).get(...p) || null;
    },
    async run(sql, params) {
      const p = params || [];
      if (d1) {
        await raw.prepare(sql).bind(...p).run();
        return;
      }
      raw.prepare(sql).run(...p);
    }
  };
}
