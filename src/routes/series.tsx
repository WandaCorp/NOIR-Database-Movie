import { createFileRoute } from "@tanstack/react-router";
import { CatalogView, type CatalogFilters } from "@/components/catalog/catalog-view";

type Search = CatalogFilters;

export const Route = createFileRoute("/series")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    sort: typeof s.sort === "string" ? (s.sort as Search["sort"]) : "popularity.desc",
    year: typeof s.year === "string" ? s.year : "",
    genre: typeof s.genre === "string" ? s.genre : "",
    pageMode: s.pageMode === "pages" ? "pages" : "infinite",
    page: Number(s.page) > 0 ? Number(s.page) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Series · MHD+" },
      { name: "description", content: "Catálogo de series de TMDb, con filtros y ordenamiento." },
    ],
  }),
  component: SeriesPage,
});

function SeriesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <CatalogView
      type="tv"
      title="Series"
      description="Series populares, en emisión y mejor valoradas, según The Movie Database."
      filters={search}
      onFilters={(next) => void navigate({ search: next })}
    />
  );
}
