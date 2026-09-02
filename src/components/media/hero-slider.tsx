import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/media/favorite-button";
import { MediaLink } from "@/components/media/media-link";
import { RatingBadge } from "@/components/media/rating-badge";
import { formatYear, mediaDate, mediaTitle } from "@/lib/format";
import { backdropSrcSet } from "@/lib/tmdb/image";
import type { MediaListItem } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function HeroSlider({ items }: { items: MediaListItem[] }) {
  const slides = items.filter((i) => i.backdrop_path).slice(0, 8);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const count = slides.length;
  const go = (dir: number) => {
    if (!count) return;
    setIndex((i) => (i + dir + count) % count);
  };

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused, count, index]);

  if (!slides.length) return null;
  const current = slides[index]!;
  const type = current.media_type === "tv" ? "tv" : "movie";
  const title = mediaTitle(current);
  const year = formatYear(mediaDate(current));
  const image = backdropSrcSet(current.backdrop_path);

  return (
    <section
      className="relative isolate min-h-[70vw] overflow-hidden md:min-h-[28rem] lg:min-h-[34rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current == null) return;
        const dx = e.clientX - startX.current;
        if (dx > 50) go(-1);
        if (dx < -50) go(1);
        startX.current = null;
      }}
      aria-roledescription="carrusel"
      aria-label="Destacados"
    >
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="100vw"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
      <div className="relative z-10 mx-auto flex min-h-[70vw] max-w-6xl flex-col justify-end px-4 pb-10 md:min-h-[28rem] md:px-8 lg:min-h-[34rem]">
        <p className="text-xs font-medium tracking-widest text-accent uppercase">Destacados</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <RatingBadge average={current.vote_average} count={current.vote_count} />
          {year ? <span className="text-sm text-muted">{year}</span> : null}
        </div>
        {current.overview ? (
          <p className="mt-3 max-w-2xl line-clamp-3 text-sm text-muted md:text-base">{current.overview}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button asChild>
            <MediaLink mediaType={type} id={current.id}>
              Ver ficha
            </MediaLink>
          </Button>
          <FavoriteButton
            item={{
              id: current.id,
              mediaType: type,
              title,
              posterPath: current.poster_path,
              year,
              voteAverage: current.vote_average,
              voteCount: current.vote_count,
            }}
            className="bg-surface/70"
          />
        </div>
      </div>

      {count > 1 ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 bg-bg/40 md:inline-flex"
            onClick={() => go(-1)}
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 bg-bg/40 md:inline-flex"
            onClick={() => go(1)}
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5" />
          </Button>
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 min-h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-accent" : "w-2 bg-fg/35",
                )}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
