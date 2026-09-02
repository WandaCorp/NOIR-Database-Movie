//#region node_modules/.nitro/vite/services/ssr/assets/proxy.server-UAW_b2w2.js
/**
* Allowlist of TMDb v3 paths the proxy will forward.
* Blocks open-relay abuse (account, auth, write endpoints).
*/
var ALLOWED = [
	/^configuration$/,
	/^genre\/(movie|tv)\/list$/,
	/^trending\/(all|movie|tv)\/(day|week)$/,
	/^movie\/(popular|top_rated|upcoming|now_playing)$/,
	/^movie\/\d+$/,
	/^movie\/\d+\/(credits|images|videos|recommendations|similar|release_dates)$/,
	/^tv\/(popular|top_rated|on_the_air|airing_today)$/,
	/^tv\/\d+$/,
	/^tv\/\d+\/(credits|aggregate_credits|images|videos|recommendations|similar|content_ratings)$/,
	/^tv\/\d+\/season\/\d+$/,
	/^person\/popular$/,
	/^person\/\d+$/,
	/^person\/\d+\/(combined_credits|images|movie_credits|tv_credits)$/,
	/^search\/(multi|movie|tv|person)$/,
	/^discover\/(movie|tv)$/
];
var ALLOWED_QUERY = /* @__PURE__ */ new Set([
	"language",
	"page",
	"region",
	"include_adult",
	"query",
	"year",
	"primary_release_year",
	"first_air_date_year",
	"sort_by",
	"with_genres",
	"without_genres",
	"vote_count.gte",
	"vote_average.gte",
	"vote_average.lte",
	"with_original_language",
	"append_to_response",
	"include_image_language",
	"watch_region",
	"air_date.gte",
	"air_date.lte",
	"primary_release_date.gte",
	"primary_release_date.lte",
	"first_air_date.gte",
	"first_air_date.lte",
	"with_runtime.gte",
	"with_runtime.lte"
]);
function normalizeTmdbPath(raw) {
	const trimmed = raw.trim();
	if (!trimmed || trimmed.includes("://") || trimmed.includes("..")) throw new Error("Ruta TMDb no válida");
	return trimmed.replace(/^\/+/, "").split("?")[0] ?? "";
}
function assertAllowedPath(path) {
	if (!ALLOWED.some((re) => re.test(path))) throw new Error("Endpoint TMDb no permitido");
}
function sanitizeQuery(query) {
	const out = {};
	if (!query) return out;
	for (const [key, value] of Object.entries(query)) {
		if (!ALLOWED_QUERY.has(key)) continue;
		if (typeof value !== "string") continue;
		const v = value.trim();
		if (!v || v.length > 200) continue;
		out[key] = v;
	}
	return out;
}
var TMDB_BASE = "https://api.themoviedb.org/3";
var TIMEOUT_MS = 12e3;
var MAX_RETRIES = 1;
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
function ttlFor(path) {
	if (path === "configuration" || path.startsWith("genre/")) return 432e5;
	if (path.startsWith("search/")) return 12e4;
	if (/^(movie|tv|person)\/\d+/.test(path)) return 6e5;
	return 3e5;
}
function getApiKey() {
	const key = process.env.TMDB_API_KEY;
	if (key && key.trim()) return key.trim();
	return "692a43c4c264e6dd28bff9f69c0fa8eb";
}
var TmdbHttpError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "TmdbHttpError";
		this.status = status;
	}
};
function cacheKey(path, query) {
	return `${path}?${Object.keys(query).sort().map((k) => `${k}=${query[k]}`).join("&")}`;
}
async function fetchOnce(url) {
	const res = await fetch(url, {
		headers: { Accept: "application/json" },
		signal: AbortSignal.timeout(TIMEOUT_MS)
	});
	if (res.status === 429) {
		const retryAfter = Number(res.headers.get("retry-after") ?? "1");
		throw new TmdbHttpError(`rate:${Number.isFinite(retryAfter) ? retryAfter : 1}`, 429);
	}
	if (res.status === 404) throw new TmdbHttpError("No encontrado en TMDb", 404);
	if (!res.ok) throw new TmdbHttpError(`TMDb respondió ${res.status}`, res.status);
	const json = await res.json();
	if (json == null || typeof json !== "object") throw new TmdbHttpError("Respuesta TMDb inválida", 502);
	return json;
}
async function tmdbFetch(rawPath, rawQuery) {
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
		const params = new URLSearchParams({
			...query,
			api_key: getApiKey()
		});
		const url = `${TMDB_BASE}/${path}?${params.toString()}`;
		let lastError;
		for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) try {
			const payload = await fetchOnce(url);
			cache.set(key, {
				exp: Date.now() + ttlFor(path),
				payload
			});
			if (cache.size > 400) {
				const first = cache.keys().next().value;
				if (first) cache.delete(first);
			}
			return payload;
		} catch (err) {
			lastError = err;
			if (err instanceof TmdbHttpError && err.status === 429 && attempt < MAX_RETRIES) {
				const seconds = Number(err.message.replace("rate:", "")) || 1;
				await new Promise((r) => setTimeout(r, Math.min(seconds, 2) * 1e3));
				continue;
			}
			break;
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
//#endregion
export { tmdbFetch as n, TmdbHttpError as t };
