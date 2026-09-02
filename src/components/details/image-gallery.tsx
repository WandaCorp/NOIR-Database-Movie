import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Lightbox } from "@/components/media/lightbox";
import { Skeleton } from "@/components/ui/skeleton";
import { getMovieImages, getTvImages } from "@/lib/tmdb/api";
import { galleryUrl } from "@/lib/tmdb/image";

export function ImageGallery({
  id,
  type,
}: {
  id: string;
  type: "movie" | "tv";
}) {
  const query = useQuery({
    queryKey: ["images", type, id],
    queryFn: () => (type === "movie" ? getMovieImages(id) : getTvImages(id)),
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const posters = (query.data?.posters ?? []).map((p) => p.file_path).slice(0, 12);
  const backdrops = (query.data?.backdrops ?? []).map((p) => p.file_path).slice(0, 12);
  const all = [...backdrops, ...posters];

  if (query.isPending) {
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video rounded-lg" />
        ))}
      </div>
    );
  }

  if (!all.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold">Imágenes</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
        {all.slice(0, 8).map((path, i) => {
          const src = galleryUrl(path);
          if (!src) return null;
          return (
            <button
              key={path}
              type="button"
              className="overflow-hidden rounded-lg"
              onClick={() => setOpenIndex(i)}
              aria-label={`Abrir imagen ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" className="aspect-video size-full object-cover" />
            </button>
          );
        })}
      </div>
      {openIndex != null ? (
        <Lightbox paths={all} index={openIndex} onClose={() => setOpenIndex(null)} onIndex={setOpenIndex} />
      ) : null}
    </section>
  );
}
