import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { genreSearch } from "@/lib/genre-search";
import { getGenres } from "@/lib/tmdb/api";

export const Route = createFileRoute("/generos/")({
  head: () => ({
    meta: [
      { title: "Géneros · MHD+" },
      { name: "description", content: "Explorá películas y series por género, según TMDb." },
    ],
  }),
  component: GenerosPage,
});

function GenreGroup({
  title,
  type,
}: {
  title: string;
  type: "movie" | "tv";
}) {
  const query = useQuery({
    queryKey: ["genres", type],
    queryFn: () => getGenres(type),
  });

  if (query.isError) {
    return <ErrorState message="No se pudieron cargar los géneros." onRetry={() => void query.refetch()} />;
  }

  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {query.isPending
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg" />)
          : (query.data?.genres ?? []).map((genre) => (
              <li key={`${type}-${genre.id}`}>
                <Link
                  to="/generos/$id"
                  params={{ id: String(genre.id) }}
                  search={genreSearch(type)}
                  className="flex min-h-14 items-center rounded-lg bg-surface px-4 text-sm hover:bg-surface-2"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
      </ul>
    </section>
  );
}

function GenerosPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 md:px-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Géneros</h1>
        <p className="mt-2 text-sm text-muted">
          Las listas salen de los endpoints de géneros de TMDb para cine y televisión.
        </p>
      </header>
      <GenreGroup title="Cine" type="movie" />
      <GenreGroup title="Series" type="tv" />
    </div>
  );
}
