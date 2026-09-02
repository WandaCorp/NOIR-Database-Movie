import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "@/components/common/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatDecimal, formatRuntime } from "@/lib/format";
import { getSeason } from "@/lib/tmdb/api";
import { stillUrl } from "@/lib/tmdb/image";
import type { TvSeason } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

function SeasonPanel({
  tvId,
  season,
  open,
  onToggle,
}: {
  tvId: string;
  season: TvSeason;
  open: boolean;
  onToggle: () => void;
}) {
  const query = useQuery({
    queryKey: ["season", tvId, season.season_number],
    enabled: open,
    queryFn: () => getSeason(tvId, season.season_number),
  });

  return (
    <div className="rounded-xl bg-surface">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>
          <span className="block font-medium">{season.name}</span>
          <span className="text-xs text-muted">
            {season.episode_count ? `${season.episode_count} episodios` : null}
            {season.air_date ? ` · ${formatDate(season.air_date, "yyyy")}` : null}
          </span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="border-t border-border px-4 py-3">
          {query.isPending ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-md" />
              ))}
            </div>
          ) : query.isError ? (
            <ErrorState message="No se pudieron cargar los episodios." onRetry={() => void query.refetch()} />
          ) : (
            <ul className="space-y-3">
              {(query.data?.episodes ?? []).map((ep) => {
                const still = stillUrl(ep.still_path);
                return (
                  <li key={ep.id} className="flex gap-3">
                    <div className="h-16 w-28 shrink-0 overflow-hidden rounded-md bg-surface-2">
                      {still ? (
                        <img src={still} alt="" loading="lazy" className="size-full object-cover" />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {ep.episode_number}. {ep.name}
                      </p>
                      <p className="text-xs text-muted">
                        {formatDate(ep.air_date)}
                        {ep.runtime ? ` · ${formatRuntime(ep.runtime)}` : null}
                        {ep.vote_average ? ` · ${formatDecimal(ep.vote_average)}` : null}
                      </p>
                      {ep.overview ? (
                        <p className="mt-1 line-clamp-3 text-xs text-muted">{ep.overview}</p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function Seasons({ tvId, seasons }: { tvId: string; seasons?: TvSeason[] }) {
  const list = (seasons ?? []).filter((s) => s.season_number >= 0);
  const [open, setOpen] = useState<number | null>(list[0]?.season_number ?? null);
  if (!list.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold">Temporadas</h2>
      <div className="mt-3 space-y-2">
        {list.map((season) => (
          <SeasonPanel
            key={season.id}
            tvId={tvId}
            season={season}
            open={open === season.season_number}
            onToggle={() =>
              setOpen((current) => (current === season.season_number ? null : season.season_number))
            }
          />
        ))}
      </div>
    </section>
  );
}
