import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { z } from "zod";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true, credentials: true });

await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? "dev-secret-change-me"
});

app.get("/health", async () => ({ ok: true }));

app.post("/auth/anonymous", async (_req, _reply) => {
  // MVP: anonymous user id. Real auth comes later.
  const userId = crypto.randomUUID();
  const token = app.jwt.sign({ sub: userId, kind: "user" });
  return { userId, token };
});

const shareCreateSchema = z.object({
  reportId: z.string().min(1),
  expiresInMinutes: z.number().int().min(5).max(60 * 24 * 30).default(60 * 24 * 7)
});

app.post("/share/create", async (req, reply) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return reply.code(401).send({ error: "missing_token" });

  try {
    app.jwt.verify(auth.slice("Bearer ".length));
  } catch {
    return reply.code(401).send({ error: "invalid_token" });
  }

  const parsed = shareCreateSchema.safeParse(req.body);
  if (!parsed.success) return reply.code(400).send({ error: "bad_request", details: parsed.error.flatten() });

  // MVP: share token only; no PHI stored server-side.
  const shareId = crypto.randomUUID();
  const expSeconds = Math.floor(Date.now() / 1000) + parsed.data.expiresInMinutes * 60;
  const shareToken = app.jwt.sign(
    { sub: shareId, kind: "share", reportId: parsed.data.reportId, exp: expSeconds },
    { noTimestamp: true }
  );

  return { shareId, shareToken, expiresAt: new Date(expSeconds * 1000).toISOString() };
});

app.get("/share/:token", async (req, reply) => {
  const params = req.params as { token: string };
  try {
    const payload = app.jwt.verify(params.token) as any;
    if (payload.kind !== "share") return reply.code(400).send({ error: "bad_token_kind" });
    // MVP: server does not store report contents; client must use token as envelope.
    return { ok: true, share: { shareId: payload.sub, reportId: payload.reportId, exp: payload.exp } };
  } catch {
    return reply.code(401).send({ error: "invalid_or_expired" });
  }
});

const port = Number(process.env.PORT ?? 8787);
await app.listen({ port, host: "0.0.0.0" });

