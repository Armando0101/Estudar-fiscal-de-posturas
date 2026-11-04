import { createAuth } from "./auth.mjs";
import { handleApi } from "./api.mjs";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const auth = createAuth(env.DB, env);
    if (url.pathname.startsWith("/api/auth")) {
      return auth.handler(request);
    }
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env, auth);
    }
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  }
};
