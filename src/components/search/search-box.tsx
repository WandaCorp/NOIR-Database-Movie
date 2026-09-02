import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { MediaLink } from "@/components/media/media-link";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { filterAdultItems } from "@/lib/filter-adult";
import { formatYear, mediaDate, mediaTitle } from "@/lib/format";
import { useSettings } from "@/lib/settings";
import { searchMulti } from "@/lib/tmdb/api";
import { posterUrl } from "@/lib/tmdb/image";
import type { MediaListItem } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

function itemType(item: MediaListItem): "movie" | "tv" | "person" {
  if (item.media_type === "tv") return "tv";
  if (item.media_type === "person") return "person";
  return "movie";
}

const emptySearch = { tipo: "all" as const, year: "", page: 1 };

export function SearchBox({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const debounced = useDebounce(q.trim(), 320);
  const adult = useSettings((s) => s.adultEnabled);
  const navigate = useNavigate();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const query = useQuery({
    queryKey: ["search-preview", debounced, adult],
    enabled: debounced.length >= 2,
    queryFn: () => searchMulti(debounced, 1, adult),
  });

  const results = filterAdultItems(query.data?.results, adult).slice(0, 8);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={rootRef} className={cn("relative w-full max-w-md", className)}>
      <label className="sr-only" htmlFor="mhd-search">
        Buscar películas, series o personas
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
      <Input
        id="mhd-search"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        autoComplete="off"
        placeholder="Buscar títulos o personas"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && q.trim()) {
            setOpen(false);
            void navigate({ to: "/buscar", search: { ...emptySearch, q: q.trim() } });
          }
          if (e.key === "Escape") setOpen(false);
        }}
        className="pl-9 pr-10"
      />
      {q ? (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted hover:text-fg"
          onClick={() => setQ("")}
        >
          <X className="size-4" />
        </button>
      ) : null}
      {open && debounced.length >= 2 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-lg bg-surface p-1 shadow-border"
        >
          {query.isPending ? (
            <li className="px-3 py-3 text-sm text-muted">Buscando…</li>
          ) : results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">Sin resultados</li>
          ) : (
            results.map((item) => {
              const title = mediaTitle(item);
              const img = posterUrl(item.poster_path || item.profile_path, "saver", "sm");
              const type = itemType(item);
              return (
                <li key={`${item.media_type}-${item.id}`} role="option">
                  <MediaLink
                    mediaType={type}
                    id={item.id}
                    className="flex min-h-12 items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-2"
                    ariaLabel={title}
                  >
                    <span className="contents" onClick={() => setOpen(false)}>
                      {img ? (
                        <img src={img} alt="" className="h-12 w-8 rounded-sm object-cover" />
                      ) : (
                        <span className="h-12 w-8 rounded-sm bg-surface-2" />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm">{title}</span>
                        <span className="block text-xs text-muted">
                          {type === "person"
                            ? "Persona"
                            : type === "tv"
                              ? `Serie · ${formatYear(mediaDate(item))}`
                              : `Película · ${formatYear(mediaDate(item))}`}
                        </span>
                      </span>
                    </span>
                  </MediaLink>
                </li>
              );
            })
          )}
          <li>
            <button
              type="button"
              className="block w-full rounded-md px-3 py-2 text-left text-sm text-accent hover:bg-surface-2"
              onClick={() => {
                setOpen(false);
                void navigate({ to: "/buscar", search: { ...emptySearch, q: debounced } });
              }}
            >
              Ver todos los resultados
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
