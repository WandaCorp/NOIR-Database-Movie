import { createFileRoute } from "@tanstack/react-router";
import { tmdbFetch, TmdbHttpError } from "@/lib/tmdb/proxy.server";

export const Route = createFileRoute("/api/tmdb/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const url = new URL(request.url);
        const query: Record<string, string> = {};
        url.searchParams.forEach((value, key) => {
          if (key === "api_key") return;
          query[key] = value;
        });
        try {
          const data = await tmdbFetch(params._splat ?? "", query);
          return Response.json(data, {
            headers: { "Cache-Control": "public, max-age=120" },
          });
        } catch (error) {
          const status = error instanceof TmdbHttpError ? error.status : 400;
          const message = error instanceof Error ? error.message : "Error al consultar TMDb";
          return Response.json({ error: message }, { status: status === 429 ? 429 : status });
        }
      },
    },
  },
});
