import { FavoriteButton } from "@/components/media/favorite-button";
import { MediaLink } from "@/components/media/media-link";
import { RatingBadge } from "@/components/media/rating-badge";
import { formatYear, mediaDate, mediaTitle } from "@/lib/format";
import { useSettings } from "@/lib/settings";
import { posterUrl } from "@/lib/tmdb/image";
import type { MediaListItem } from "@/lib/tmdb/types";

export function PosterCard({
  item,
  mediaType,
  eager = false,
}: {
  item: MediaListItem;
  mediaType: "movie" | "tv" | "person";
  eager?: boolean;
}) {
  const posterSize = useSettings((s) => s.posterSize);
  const quality = useSettings((s) => s.imageQuality);
  const title = mediaTitle(item);
  const year = formatYear(mediaDate(item));
  const poster = posterUrl(item.poster_path || item.profile_path, quality, posterSize);

  return (
    <article className="group relative min-w-0">
      <MediaLink
        mediaType={mediaType}
        id={item.id}
        className="block rounded-lg focus-visible:ring-2 focus-visible:ring-accent"
        ariaLabel={title}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-surface-2">
          {poster ? (
            <img
              src={poster}
              alt=""
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover transition-transform duration-250 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex size-full items-center justify-center px-3 text-center text-xs text-subtle">
              Sin imagen
            </div>
          )}
          {mediaType !== "person" ? (
            <div className="absolute top-2 left-2">
              <RatingBadge average={item.vote_average} count={item.vote_count} compact />
            </div>
          ) : null}
        </div>
        <div className="mt-2 pr-8">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug">{title}</h3>
          {year || item.known_for_department ? (
            <p className="mt-0.5 text-xs text-muted">
              {mediaType === "person" ? item.known_for_department : year}
            </p>
          ) : null}
        </div>
      </MediaLink>
      {mediaType !== "person" ? (
        <div className="absolute top-1 right-1 z-10">
          <FavoriteButton
            item={{
              id: item.id,
              mediaType,
              title,
              posterPath: item.poster_path,
              year,
              voteAverage: item.vote_average,
              voteCount: item.vote_count,
            }}
            className="size-10 min-h-10 bg-bg/50 hover:bg-bg/80"
          />
        </div>
      ) : null}
    </article>
  );
}
