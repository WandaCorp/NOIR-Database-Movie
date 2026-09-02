import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFavorites, type FavoriteItem } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  item,
  className,
}: {
  item: Omit<FavoriteItem, "savedAt">;
  className?: string;
}) {
  const has = useFavorites((s) => s.has(item.id, item.mediaType));
  const toggle = useFavorites((s) => s.toggle);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("size-11", className)}
      aria-pressed={has}
      aria-label={has ? "Quitar de favoritos" : "Agregar a favoritos"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(item);
        toast.success(added ? "Guardado en favoritos" : "Eliminado de favoritos");
      }}
    >
      <Heart className={cn("size-5", has ? "fill-danger text-danger" : "text-fg")} />
    </Button>
  );
}
