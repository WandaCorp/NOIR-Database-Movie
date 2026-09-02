import { PosterCard } from "@/components/media/poster-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/lib/settings";
import type { MediaListItem } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function MediaGrid({
  items,
  mediaType,
  loading,
}: {
  items: MediaListItem[];
  mediaType: "movie" | "tv" | "person" | "mixed";
  loading?: boolean;
}) {
  const posterSize = useSettings((s) => s.posterSize);
  const density = useSettings((s) => s.density);

  const cols =
    posterSize === "sm"
      ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
      : posterSize === "lg"
        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6";

  if (loading) {
    return (
      <div className={cn("grid", cols, density === "compact" ? "gap-2" : "gap-4")}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid", cols, density === "compact" ? "gap-2" : "gap-4")}>
      {items.map((item, i) => {
        const type =
          mediaType === "mixed"
            ? item.media_type === "tv"
              ? "tv"
              : item.media_type === "person"
                ? "person"
                : "movie"
            : mediaType;
        return <PosterCard key={`${type}-${item.id}-${i}`} item={item} mediaType={type} eager={i < 6} />;
      })}
    </div>
  );
}
