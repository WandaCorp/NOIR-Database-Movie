import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/common/section-heading";
import { ErrorState } from "@/components/common/error-state";
import { PosterCard } from "@/components/media/poster-card";
import { Skeleton } from "@/components/ui/skeleton";
import { filterAdultItems } from "@/lib/filter-adult";
import { useSettings } from "@/lib/settings";
import { tmdbGet } from "@/lib/tmdb/api";
import type { MediaListItem, Paged } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function PosterRow({
  title,
  path,
  href,
  mediaType,
  enabled = true,
}: {
  title: string;
  path: string;
  href?: "/peliculas" | "/series";
  mediaType?: "movie" | "tv";
  enabled?: boolean;
}) {
  const adult = useSettings((s) => s.adultEnabled);
  const density = useSettings((s) => s.density);
  const posterSize = useSettings((s) => s.posterSize);
  const query = useQuery({
    queryKey: ["row", path, adult],
    enabled,
    queryFn: () => {
      const q: Record<string, string> = {
        language: "es-ES",
        include_adult: adult ? "true" : "false",
      };
      if (path.startsWith("movie/")) q.region = "PY";
      return tmdbGet({ data: { path, query: q } }) as Promise<Paged<MediaListItem>>;
    },
  });

  const items = filterAdultItems(query.data?.results, adult).slice(0, 16);
  const cardWidth =
    posterSize === "sm" ? "w-28" : posterSize === "lg" ? "w-40 md:w-44" : "w-32 md:w-36";

  return (
    <section className="px-4 md:px-8">
      <SectionHeading title={title} href={href} />
      {query.isError ? (
        <ErrorState
          message="No se pudo cargar esta sección."
          onRetry={() => void query.refetch()}
        />
      ) : (
        <div
          className={cn(
            "scrollbar-thin flex snap-x snap-mandatory overflow-x-auto pb-2",
            density === "compact" ? "gap-2" : "gap-3 md:gap-4",
          )}
        >
          {query.isPending
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className={cn("aspect-[2/3] shrink-0 rounded-lg", cardWidth)} />
              ))
            : items.map((item, i) => {
                const type =
                  mediaType ??
                  (item.media_type === "tv" ? "tv" : item.media_type === "person" ? "person" : "movie");
                if (type === "person") return null;
                return (
                  <div key={`${type}-${item.id}`} className={cn("snap-start shrink-0", cardWidth)}>
                    <PosterCard item={item} mediaType={type} eager={i < 4} />
                  </div>
                );
              })}
        </div>
      )}
    </section>
  );
}
