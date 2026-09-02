import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ImageQuality, PosterDensity } from "./tmdb/image";

export const HOME_SECTION_IDS = [
  "trending",
  "popularMovies",
  "popularTv",
  "topMovies",
  "topTv",
  "upcoming",
  "onAir",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export type SortKey =
  | "popularity.desc"
  | "vote_average.desc"
  | "primary_release_date.desc"
  | "original_title.asc";

type SettingsState = {
  adultEnabled: boolean;
  adultAcknowledged: boolean;
  posterSize: PosterDensity;
  density: "comfortable" | "compact";
  imageQuality: ImageQuality;
  defaultSort: SortKey;
  hiddenSections: HomeSectionId[];
  setAdult: (enabled: boolean) => void;
  acknowledgeAdult: () => void;
  setPosterSize: (size: PosterDensity) => void;
  setDensity: (density: "comfortable" | "compact") => void;
  setImageQuality: (quality: ImageQuality) => void;
  setDefaultSort: (sort: SortKey) => void;
  toggleSection: (id: HomeSectionId) => void;
  isSectionVisible: (id: HomeSectionId) => boolean;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      adultEnabled: false,
      adultAcknowledged: false,
      posterSize: "md",
      density: "comfortable",
      imageQuality: "standard",
      defaultSort: "popularity.desc",
      hiddenSections: [],
      setAdult: (enabled) =>
        set({
          adultEnabled: enabled,
          adultAcknowledged: enabled ? get().adultAcknowledged : false,
        }),
      acknowledgeAdult: () => set({ adultAcknowledged: true, adultEnabled: true }),
      setPosterSize: (posterSize) => set({ posterSize }),
      setDensity: (density) => set({ density }),
      setImageQuality: (imageQuality) => set({ imageQuality }),
      setDefaultSort: (defaultSort) => set({ defaultSort }),
      toggleSection: (id) =>
        set((state) => ({
          hiddenSections: state.hiddenSections.includes(id)
            ? state.hiddenSections.filter((s) => s !== id)
            : [...state.hiddenSections, id],
        })),
      isSectionVisible: (id) => !get().hiddenSections.includes(id),
    }),
    { name: "mhd-settings" },
  ),
);
