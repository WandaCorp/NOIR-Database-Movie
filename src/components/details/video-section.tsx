import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Video } from "@/lib/tmdb/types";

function pickVideos(videos?: Video[]) {
  const yt = (videos ?? []).filter((v) => v.site === "YouTube");
  const trailers = yt.filter((v) => v.type === "Trailer");
  const rest = yt.filter((v) => v.type !== "Trailer");
  const ordered = [...trailers.filter((v) => v.official), ...trailers, ...rest];
  const seen = new Set<string>();
  return ordered.filter((v) => {
    if (seen.has(v.key)) return false;
    seen.add(v.key);
    return true;
  });
}

export function VideoSection({ videos }: { videos?: Video[] }) {
  const list = pickVideos(videos).slice(0, 6);
  const [active, setActive] = useState(list[0]?.key ?? "");

  if (!list.length) return null;
  const current = list.find((v) => v.key === active) ?? list[0]!;

  return (
    <section>
      <h2 className="text-lg font-semibold">Videos</h2>
      <p className="mt-1 text-xs text-muted">
        Reproductor de YouTube (dominio youtube-nocookie.com). El servicio externo puede usar
        cookies propias.
      </p>
      <div className="mt-3 overflow-hidden rounded-xl bg-surface">
        <div className="aspect-video">
          <iframe
            title={current.name}
            src={`https://www.youtube-nocookie.com/embed/${current.key}`}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
      {list.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {list.map((video) => (
            <Button
              key={video.id}
              type="button"
              size="sm"
              variant={video.key === current.key ? "default" : "outline"}
              onClick={() => setActive(video.key)}
            >
              {video.name}
            </Button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
