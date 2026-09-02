import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { MediaGrid } from "@/components/media/media-grid";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useInView } from "@/hooks/use-in-view";
import { filterAdultItems } from "@/lib/filter-adult";
import { useSettings } from "@/lib/settings";
import { discoverMedia, getGenres } from "@/lib/tmdb/api";
import type { MediaListItem } from "@/lib/tmdb/types";

const YEAR_OPTIONS = Array.from({ length: 46 }, (_, i) => String(2026 - i));

type SortValue =
  | "popularity.desc"
  | "vote_average.desc"
  | "primary_release_date.desc"
  | "first_air_date.desc"
  | "original_title.asc"
  | "name.asc";

export type CatalogFilters = {
  sort: SortValue;
  year: string;
  genre: string;
  pageMode: "infinite" | "pages";
  page: number;
};

export function defaultCatalogFilters(sort: SortValue): CatalogFilters {
  return { sort, year: "", genre: "", pageMode: "infinite", page: 1 };
}

export function CatalogView({
  type,
  title,
  description,
  fixedGenre,
  filters,
  onFilters,
}: {
  type: "movie" | "tv";
  title: string;
  description?: string;
  fixedGenre?: string;
  filters: CatalogFilters;
  onFilters: (next: CatalogFilters) => void;
}) {
  const adult = useSettings((s) => s.adultEnabled);
  const defaultSort = useSettings((s) => s.defaultSort);
  const genres = useQuery({
    queryKey: ["genres", type],
    queryFn: () => getGenres(type),
  });

  const paramsFor = (page: number) => {
    const sort =
      filters.sort === "primary_release_date.desc" && type === "tv"
        ? "first_air_date.desc"
        : filters.sort === "original_title.asc" && type === "tv"
          ? "name.asc"
          : filters.sort === "first_air_date.desc" && type === "movie"
            ? "primary_release_date.desc"
            : filters.sort === "name.asc" && type === "movie"
              ? "original_title.asc"
              : filters.sort;
    const query: Record<string, string> = {
      page: String(page),
      sort_by: sort || defaultSort,
      include_adult: adult ? "true" : "false",
    };
    if (sort.startsWith("vote_average")) query["vote_count.gte"] = "50";
    const genre = fixedGenre || filters.genre;
    if (genre) query.with_genres = genre;
    if (filters.year) {
      if (type === "movie") query.primary_release_year = filters.year;
      else query.first_air_date_year = filters.year;
    }
    return query;
  };

  const infinite = useInfiniteQuery({
    queryKey: ["discover", type, filters.sort, filters.year, filters.genre, fixedGenre, adult],
    enabled: filters.pageMode === "infinite",
    initialPageParam: 1,
    queryFn: ({ pageParam }) => discoverMedia(type, paramsFor(pageParam as number)),
    getNextPageParam: (last) =>
      last.page < last.total_pages && last.page < 20 ? last.page + 1 : undefined,
  });

  const paged = useQuery({
    queryKey: ["discover-page", type, filters, fixedGenre, adult],
    enabled: filters.pageMode === "pages",
    queryFn: () => discoverMedia(type, paramsFor(filters.page)),
  });

  const items = useMemo(() => {
    const raw: MediaListItem[] =
      filters.pageMode === "infinite"
        ? (infinite.data?.pages.flatMap((p) => p.results) ?? [])
        : (paged.data?.results ?? []);
    return filterAdultItems(raw, adult);
  }, [adult, filters.pageMode, infinite.data, paged.data]);

  const { ref, inView } = useInView(filters.pageMode === "infinite");
  useEffect(() => {
    if (inView && infinite.hasNextPage && !infinite.isFetchingNextPage) {
      void infinite.fetchNextPage();
    }
  }, [inView, infinite]);

  const loading = filters.pageMode === "infinite" ? infinite.isPending : paged.isPending;
  const error = filters.pageMode === "infinite" ? infinite.isError : paged.isError;
  const refetch = filters.pageMode === "infinite" ? infinite.refetch : paged.refetch;
  const totalPages =
    filters.pageMode === "pages" ? Math.min(paged.data?.total_pages ?? 1, 20) : 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p> : null}
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        <label className="flex min-w-40 flex-col gap-1 text-xs text-muted">
          Ordenar
          <Select
            value={filters.sort}
            onChange={(e) => onFilters({ ...filters, sort: e.target.value as SortValue, page: 1 })}
          >
            <option value="popularity.desc">Popularidad</option>
            <option value="vote_average.desc">Valoración</option>
            <option value={type === "tv" ? "first_air_date.desc" : "primary_release_date.desc"}>
              Fecha
            </option>
            <option value={type === "tv" ? "name.asc" : "original_title.asc"}>Alfabético</option>
          </Select>
        </label>
        <label className="flex min-w-32 flex-col gap-1 text-xs text-muted">
          Año
          <Select
            value={filters.year}
            onChange={(e) => onFilters({ ...filters, year: e.target.value, page: 1 })}
          >
            <option value="">Todos</option>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
        </label>
        {!fixedGenre ? (
          <label className="flex min-w-40 flex-col gap-1 text-xs text-muted">
            Género
            <Select
              value={filters.genre}
              onChange={(e) => onFilters({ ...filters, genre: e.target.value, page: 1 })}
            >
              <option value="">Todos</option>
              {(genres.data?.genres ?? []).map((g) => (
                <option key={g.id} value={String(g.id)}>
                  {g.name}
                </option>
              ))}
            </Select>
          </label>
        ) : null}
        <label className="flex min-w-36 flex-col gap-1 text-xs text-muted">
          Navegación
          <Select
            value={filters.pageMode}
            onChange={(e) =>
              onFilters({
                ...filters,
                pageMode: e.target.value as "infinite" | "pages",
                page: 1,
              })
            }
          >
            <option value="infinite">Desplazamiento infinito</option>
            <option value="pages">Páginas</option>
          </Select>
        </label>
      </div>

      {error ? (
        <ErrorState message="No se pudo cargar el catálogo." onRetry={() => void refetch()} />
      ) : loading ? (
        <MediaGrid items={[]} mediaType={type} loading />
      ) : items.length === 0 ? (
        <EmptyState title="Sin resultados" description="Probá con otros filtros." />
      ) : (
        <>
          <MediaGrid items={items} mediaType={type} />
          {filters.pageMode === "infinite" ? (
            <div ref={ref} className="h-16" />
          ) : (
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                disabled={filters.page <= 1}
                onClick={() => onFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
              >
                Anterior
              </Button>
              <span className="text-sm tabular-nums text-muted">
                {filters.page} / {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={filters.page >= totalPages}
                onClick={() => onFilters({ ...filters, page: filters.page + 1 })}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
