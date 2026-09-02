const BASE = "https://image.tmdb.org/t/p";

export type ImageQuality = "saver" | "standard" | "high";
export type PosterDensity = "sm" | "md" | "lg";

const POSTER_SIZE: Record<ImageQuality, Record<PosterDensity, string>> = {
  saver: { sm: "w185", md: "w185", lg: "w342" },
  standard: { sm: "w185", md: "w342", lg: "w500" },
  high: { sm: "w342", md: "w500", lg: "w780" },
};

export function tmdbImage(
  path: string | null | undefined,
  size: string,
): string | undefined {
  if (!path) return undefined;
  return `${BASE}/${size}${path}`;
}

export function posterUrl(
  path: string | null | undefined,
  quality: ImageQuality = "standard",
  density: PosterDensity = "md",
): string | undefined {
  return tmdbImage(path, POSTER_SIZE[quality][density]);
}

export function backdropSrcSet(path: string | null | undefined): {
  src: string;
  srcSet: string;
} | undefined {
  const w780 = tmdbImage(path, "w780");
  const w1280 = tmdbImage(path, "w1280");
  if (!w780 || !w1280) return undefined;
  return { src: w780, srcSet: `${w780} 780w, ${w1280} 1280w` };
}

export function profileUrl(path: string | null | undefined, large = false): string | undefined {
  return tmdbImage(path, large ? "w185" : "w185");
}

export function stillUrl(path: string | null | undefined): string | undefined {
  return tmdbImage(path, "w300");
}

export function galleryUrl(path: string | null | undefined, large = false): string | undefined {
  return tmdbImage(path, large ? "w780" : "w342");
}
