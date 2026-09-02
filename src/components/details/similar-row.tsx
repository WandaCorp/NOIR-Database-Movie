import { PosterCard } from "@/components/media/poster-card";
import { filterAdultItems } from "@/lib/filter-adult";
import { useSettings } from "@/lib/settings";
import type { MediaListItem } from "@/lib/tmdb/types";

export function SimilarRow({
  title,
  items,
  mediaType,
}: {
  title: string;
  items?: MediaListItem[];
  mediaType: "movie" | "tv";
}) {
  const adult = useSettings((s) => s.adultEnabled);
  const list = filterAdultItems(items, adult).slice(0, 14);
  if (!list.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="scrollbar-thin mt-3 flex gap-3 overflow-x-auto pb-2">
        {list.map((item) => (
          <div key={item.id} className="w-32 shrink-0 md:w-36">
            <PosterCard item={item} mediaType={mediaType} />
          </div>
        ))}
      </div>
    </section>
  );
}
