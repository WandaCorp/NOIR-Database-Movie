import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { galleryUrl } from "@/lib/tmdb/image";

export function Lightbox({
  paths,
  index,
  onClose,
  onIndex,
}: {
  paths: string[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const path = paths[index];
  const src = galleryUrl(path, true);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % paths.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + paths.length) % paths.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onIndex, paths.length]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería"
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4"
      onClick={onClose}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        aria-label="Cerrar"
        onClick={onClose}
      >
        <X className="size-5" />
      </Button>
      {paths.length > 1 ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3"
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + paths.length) % paths.length);
            }}
          >
            <ChevronLeft className="size-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3"
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % paths.length);
            }}
          >
            <ChevronRight className="size-6" />
          </Button>
        </>
      ) : null}
      <img
        src={src}
        alt=""
        className="max-h-[90dvh] max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
