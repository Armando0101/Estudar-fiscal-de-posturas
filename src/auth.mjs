import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";

export function createAuth(database, env) {
  const baseURL = env.BETTER_AUTH_URL || "http://localhost:8787";
  const origins = String(env.ALLOWED_ORIGINS || baseURL)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return betterAuth({
    database,
    secret: env.BETTER_AUTH_SECRET,
    baseURL,
    trustedOrigins: origins,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8
    },
    plugins: [
      username({
        minUsernameLength: 3,
        maxUsernameLength: 24,
        immutableUsername: true
      })
    ],
    rateLimit: {
      enabled: true,
      window: 60,
      max: 30
    },
    advanced: {
      database: { validateSchema: false },
      defaultCookieAttributes: {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        secure: String(baseURL).startsWith("https://")
      }
    }
  });
}
