/**
 * Allowlist of TMDb v3 paths the proxy will forward.
 * Blocks open-relay abuse (account, auth, write endpoints).
 */
const ALLOWED: RegExp[] = [
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
  /^discover\/(movie|tv)$/,
];

const ALLOWED_QUERY = new Set([
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
  "with_runtime.lte",
]);

export function normalizeTmdbPath(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.includes("://") || trimmed.includes("..")) {
    throw new Error("Ruta TMDb no válida");
  }
  return trimmed.replace(/^\/+/, "").split("?")[0] ?? "";
}

export function assertAllowedPath(path: string): void {
  if (!ALLOWED.some((re) => re.test(path))) {
    throw new Error("Endpoint TMDb no permitido");
  }
}

export function sanitizeQuery(
  query: Record<string, string> | undefined,
): Record<string, string> {
  const out: Record<string, string> = {};
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
