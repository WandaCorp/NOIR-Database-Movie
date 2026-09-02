import { assertAllowedPath, normalizeTmdbPath, sanitizeQuery } from "./paths";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TIMEOUT_MS = 12_000;
const MAX_RETRIES = 1;

export type TmdbJson = Record<string, unknown>;

type CacheEntry = { exp: number; payload: TmdbJson };
const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<TmdbJson>>();

function ttlFor(path: string): number {
  if (path === "configuration" || path.startsWith("genre/")) return 12 * 60 * 60 * 1000;
  if (path.startsWith("search/")) return 2 * 60 * 1000;
  if (/^(movie|tv|person)\/\d+/.test(path)) return 10 * 60 * 1000;
  return 5 * 60 * 1000;
}

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (key && key.trim()) return key.trim();
  return "692a43c4c264e6dd28bff9f69c0fa8eb";
}

export class TmdbHttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "TmdbHttpError";
    this.status = status;
  }
}

function cacheKey(path: string, query: Record<string, string>): string {
  const qs = Object.keys(query)
    .sort()
    .map((k) => `${k}=${query[k]}`)
    .join("&");
  return `${path}?${qs}`;
}

async function fetchOnce(url: string): Promise<TmdbJson> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after") ?? "1");
    throw new TmdbHttpError(`rate:${Number.isFinite(retryAfter) ? retryAfter : 1}`, 429);
  }

  if (res.status === 404) {
    throw new TmdbHttpError("No encontrado en TMDb", 404);
  }

  if (!res.ok) {
    throw new TmdbHttpError(`TMDb respondió ${res.status}`, res.status);
  }

  const json: unknown = await res.json();
  if (json == null || typeof json !== "object") {
    throw new TmdbHttpError("Respuesta TMDb inválida", 502);
  }
  return json as TmdbJson;
}

export async function tmdbFetch(
  rawPath: string,
  rawQuery?: Record<string, string>,
): Promise<TmdbJson> {
  const path = normalizeTmdbPath(rawPath);
  assertAllowedPath(path);
  const query = sanitizeQuery(rawQuery);

  if (!query.language) query.language = "es-ES";
  if (query.include_adult !== "true") query.include_adult = "false";

  const key = cacheKey(path, query);
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.exp > now) return hit.payload;

  const pending = inflight.get(key);
  if (pending) return pending;

  const run = (async () => {
    const params = new URLSearchParams({ ...query, api_key: getApiKey() });
    const url = `${TMDB_BASE}/${path}?${params.toString()}`;

    let lastError: unknown;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const payload = await fetchOnce(url);
        cache.set(key, { exp: Date.now() + ttlFor(path), payload });
        if (cache.size > 400) {
          const first = cache.keys().next().value;
          if (first) cache.delete(first);
        }
        return payload;
      } catch (err) {
        lastError = err;
        if (err instanceof TmdbHttpError && err.status === 429 && attempt < MAX_RETRIES) {
          const seconds = Number(err.message.replace("rate:", "")) || 1;
          await new Promise((r) => setTimeout(r, Math.min(seconds, 2) * 1000));
          continue;
        }
        break;
      }
    }
    throw lastError;
  })();

  inflight.set(key, run);
  try {
    return await run;
  } finally {
    inflight.delete(key);
  }
}
