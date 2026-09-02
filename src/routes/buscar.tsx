import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { MediaGrid } from "@/components/media/media-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { filterAdultItems } from "@/lib/filter-adult";
import { useSettings } from "@/lib/settings";
import { searchByType, searchMulti } from "@/lib/tmdb/api";

type Search = {
  q: string;
  tipo: "all" | "movie" | "tv" | "person";
  year: string;
  page: number;
};

export const Route = createFileRoute("/buscar")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
    tipo: s.tipo === "movie" || s.tipo === "tv" || s.tipo === "person" ? s.tipo : "all",
    year: typeof s.year === "string" ? s.year : "",
    page: Number(s.page) > 0 ? Number(s.page) : 1,
  }),
  head: ({ match }) => {
    const q = (match.search as Search).q;
    return {
      meta: [
        { title: q ? `Buscar “${q}” · MHD+` : "Buscar · MHD+" },
        { name: "description", content: "Buscá películas, series y personas en TMDb." },
      ],
    };
  },
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const adult = useSettings((s) => s.adultEnabled);
  const debounced = useDebounce(search.q.trim(), 280);

  const query = useQuery({
    queryKey: ["search", debounced, search.tipo, search.year, search.page, adult],
    enabled: debounced.length >= 2,
    queryFn: () => {
      if (search.tipo === "all") return searchMulti(debounced, search.page, adult);
      const extra: Record<string, string> = {};
      if (search.year && search.tipo === "movie") extra.year = search.year;
      if (search.year && search.tipo === "tv") extra.first_air_date_year = search.year;
      return searchByType(search.tipo, debounced, search.page, adult, extra);
    },
  });

  const items = filterAdultItems(query.data?.results, adult).filter((item) => {
    if (search.tipo !== "all") return true;
    if (!search.year) return true;
    const date = item.release_date || item.first_air_date || "";
    return date.startsWith(search.year);
  });
  const totalPages = Math.min(query.data?.total_pages ?? 1, 20);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Buscar</h1>
      <form
        className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          void navigate({
            search: {
              q: String(data.get("q") ?? ""),
              tipo: String(data.get("tipo") ?? "all") as Search["tipo"],
              year: String(data.get("year") ?? ""),
              page: 1,
            },
          });
        }}
      >
        <label className="flex flex-col gap-1 text-xs text-muted sm:col-span-2">
          Consulta
          <Input name="q" defaultValue={search.q} placeholder="Título, persona…" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          Tipo
          <Select
            name="tipo"
            value={search.tipo}
            onChange={(e) =>
              void navigate({ search: { ...search, tipo: e.target.value as Search["tipo"], page: 1 } })
            }
          >
            <option value="all">Todo</option>
            <option value="movie">Películas</option>
            <option value="tv">Series</option>
            <option value="person">Personas</option>
          </Select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-muted">
          Año
          <Input name="year" defaultValue={search.year} inputMode="numeric" placeholder="p. ej. 2024" />
        </label>
        <Button type="submit" className="sm:col-span-2 lg:col-span-4">
          Aplicar
        </Button>
      </form>

      <div className="mt-8">
        {debounced.length < 2 ? (
          <EmptyState title="Escribí al menos 2 caracteres" description="La búsqueda consulta TMDb con un breve retraso para evitar pedidos de más." />
        ) : query.isError ? (
          <ErrorState message="No se pudo completar la búsqueda." onRetry={() => void query.refetch()} />
        ) : query.isPending ? (
          <MediaGrid items={[]} mediaType="mixed" loading />
        ) : items.length === 0 ? (
          <EmptyState title="Sin resultados" description="Probá con otro término o quitá los filtros." />
        ) : (
          <>
            <MediaGrid items={items} mediaType={search.tipo === "all" ? "mixed" : search.tipo} />
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                disabled={search.page <= 1}
                onClick={() => void navigate({ search: { ...search, page: search.page - 1 } })}
              >
                Anterior
              </Button>
              <span className="text-sm tabular-nums text-muted">
                {search.page} / {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={search.page >= totalPages}
                onClick={() => void navigate({ search: { ...search, page: search.page + 1 } })}
              >
                Siguiente
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
