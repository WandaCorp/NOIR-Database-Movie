import { createFileRoute } from "@tanstack/react-router";
import { CatalogView, type CatalogFilters } from "@/components/catalog/catalog-view";

type Search = CatalogFilters;

export const Route = createFileRoute("/peliculas")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    sort: typeof s.sort === "string" ? (s.sort as Search["sort"]) : "popularity.desc",
    year: typeof s.year === "string" ? s.year : "",
    genre: typeof s.genre === "string" ? s.genre : "",
    pageMode: s.pageMode === "pages" ? "pages" : "infinite",
    page: Number(s.page) > 0 ? Number(s.page) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Películas · MHD+" },
      { name: "description", content: "Catálogo de películas de TMDb, con filtros y ordenamiento." },
    ],
  }),
  component: PeliculasPage,
});

function PeliculasPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <CatalogView
      type="movie"
      title="Películas"
      description="Explorá el catálogo de cine de TMDb. Los resultados se cargan de a poco para no saturar la API."
      filters={search}
      onFilters={(next) => void navigate({ search: next })}
    />
  );
}
