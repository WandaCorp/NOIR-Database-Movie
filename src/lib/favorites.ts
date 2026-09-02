import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteItem = {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string | null;
  year?: string;
  voteAverage?: number;
  voteCount?: number;
  savedAt: number;
};

type FavoritesState = {
  items: FavoriteItem[];
  add: (item: Omit<FavoriteItem, "savedAt">) => void;
  remove: (id: number, mediaType: "movie" | "tv") => void;
  toggle: (item: Omit<FavoriteItem, "savedAt">) => boolean;
  has: (id: number, mediaType: "movie" | "tv") => boolean;
  clear: () => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id && i.mediaType === item.mediaType)) {
            return state;
          }
          return { items: [{ ...item, savedAt: Date.now() }, ...state.items] };
        }),
      remove: (id, mediaType) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.mediaType === mediaType)),
        })),
      toggle: (item) => {
        const exists = get().has(item.id, item.mediaType);
        if (exists) get().remove(item.id, item.mediaType);
        else get().add(item);
        return !exists;
      },
      has: (id, mediaType) =>
        get().items.some((i) => i.id === id && i.mediaType === mediaType),
      clear: () => set({ items: [] }),
    }),
    { name: "mhd-favorites" },
  ),
);
