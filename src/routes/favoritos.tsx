import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmptyState } from "@/components/common/empty-state";
import { PosterCard } from "@/components/media/poster-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/favorites";
import type { MediaListItem } from "@/lib/tmdb/types";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos · MHD+" },
      { name: "description", content: "Lista de favoritos guardada en este navegador." },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const items = useFavorites((s) => s.items);
  const clear = useFavorites((s) => s.clear);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Favoritos</h1>
          <p className="mt-1 text-sm text-muted">
            Se guardan en este dispositivo (localStorage). No hay cuenta ni sincronización.
          </p>
        </div>
        {items.length ? (
          <Button variant="outline" onClick={() => setConfirm(true)}>
            Vaciar lista
          </Button>
        ) : null}
      </div>
      {items.length === 0 ? (
        <EmptyState
          title="Todavía no hay favoritos"
          description="Marcá películas o series con el corazón para encontrarlas después."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {items.map((item) => {
            const media: MediaListItem = {
              id: item.id,
              title: item.title,
              poster_path: item.posterPath,
              release_date: item.year,
              vote_average: item.voteAverage,
              vote_count: item.voteCount,
            };
            return <PosterCard key={`${item.mediaType}-${item.id}`} item={media} mediaType={item.mediaType} />;
          })}
        </div>
      )}
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogTitle>¿Vaciar favoritos?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará toda la lista guardada en este navegador. Esta acción no se puede deshacer.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clear();
                setConfirm(false);
              }}
            >
              Vaciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
