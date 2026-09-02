import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CatalogView, type CatalogFilters } from "@/components/catalog/catalog-view";
import { getGenres } from "@/lib/tmdb/api";

type Search = CatalogFilters & { tipo: "movie" | "tv" };

export const Route = createFileRoute("/generos/$id")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    tipo: s.tipo === "tv" ? "tv" : "movie",
    sort: typeof s.sort === "string" ? (s.sort as Search["sort"]) : "popularity.desc",
    year: typeof s.year === "string" ? s.year : "",
    genre: "",
    pageMode: s.pageMode === "pages" ? "pages" : "infinite",
    page: Number(s.page) > 0 ? Number(s.page) : 1,
  }),
  component: GenreDetailPage,
});

function GenreDetailPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const genres = useQuery({
    queryKey: ["genres", search.tipo],
    queryFn: () => getGenres(search.tipo),
  });
  const name = genres.data?.genres.find((g) => String(g.id) === id)?.name ?? "Género";

  return (
    <CatalogView
      type={search.tipo}
      title={name}
      description="Títulos de este género según TMDb. Podés cambiar el tipo cine/serie en la URL (?tipo=tv)."
      fixedGenre={id}
      filters={search}
      onFilters={(next) => void navigate({ search: { ...search, ...next } })}
    />
  );
}
