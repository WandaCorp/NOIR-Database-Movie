import { tmdbGet } from "./functions";
import type {
  GenreList,
  MovieDetails,
  Paged,
  MediaListItem,
  PersonDetails,
  SeasonDetails,
  TvDetails,
} from "./types";

export { tmdbGet };

function q(extra?: Record<string, string>): Record<string, string> {
  return { language: "es-ES", ...extra };
}

export async function getTrending(window: "day" | "week" = "week", adult = false) {
  return tmdbGet({
    data: {
      path: `/trending/all/${window}`,
      query: q({ include_adult: adult ? "true" : "false" }),
    },
  }) as Promise<Paged<MediaListItem>>;
}

export async function getMovieList(
  kind: "popular" | "top_rated" | "upcoming" | "now_playing",
  page = 1,
  adult = false,
) {
  return tmdbGet({
    data: {
      path: `/movie/${kind}`,
      query: q({ page: String(page), include_adult: adult ? "true" : "false", region: "PY" }),
    },
  }) as Promise<Paged<MediaListItem>>;
}

export async function getTvList(
  kind: "popular" | "top_rated" | "on_the_air" | "airing_today",
  page = 1,
  adult = false,
) {
  return tmdbGet({
    data: {
      path: `/tv/${kind}`,
      query: q({ page: String(page), include_adult: adult ? "true" : "false" }),
    },
  }) as Promise<Paged<MediaListItem>>;
}

export async function getMovieDetails(id: string | number, adult = false) {
  return tmdbGet({
    data: {
      path: `/movie/${id}`,
      query: q({
        include_adult: adult ? "true" : "false",
        append_to_response: "credits,videos,recommendations,similar,release_dates",
      }),
    },
  }) as Promise<MovieDetails>;
}

export async function getTvDetails(id: string | number, adult = false) {
  return tmdbGet({
    data: {
      path: `/tv/${id}`,
      query: q({
        include_adult: adult ? "true" : "false",
        append_to_response: "credits,videos,recommendations,similar,content_ratings",
      }),
    },
  }) as Promise<TvDetails>;
}

export async function getPersonDetails(id: string | number) {
  return tmdbGet({
    data: {
      path: `/person/${id}`,
      query: q({ append_to_response: "combined_credits,images" }),
    },
  }) as Promise<PersonDetails>;
}

export async function getSeason(tvId: string | number, seasonNumber: number) {
  return tmdbGet({
    data: { path: `/tv/${tvId}/season/${seasonNumber}`, query: q() },
  }) as Promise<SeasonDetails>;
}

export async function getMovieImages(id: string | number) {
  return tmdbGet({
    data: {
      path: `/movie/${id}/images`,
      query: { include_image_language: "es,en,null" },
    },
  }) as Promise<{ posters: { file_path: string }[]; backdrops: { file_path: string }[] }>;
}

export async function getTvImages(id: string | number) {
  return tmdbGet({
    data: {
      path: `/tv/${id}/images`,
      query: { include_image_language: "es,en,null" },
    },
  }) as Promise<{ posters: { file_path: string }[]; backdrops: { file_path: string }[] }>;
}

export async function getGenres(type: "movie" | "tv") {
  return tmdbGet({ data: { path: `/genre/${type}/list`, query: q() } }) as Promise<GenreList>;
}

export async function discoverMedia(type: "movie" | "tv", params: Record<string, string>) {
  return tmdbGet({
    data: { path: `/discover/${type}`, query: q(params) },
  }) as Promise<Paged<MediaListItem>>;
}

export async function searchMulti(query: string, page = 1, adult = false) {
  return tmdbGet({
    data: {
      path: "/search/multi",
      query: q({
        query,
        page: String(page),
        include_adult: adult ? "true" : "false",
      }),
    },
  }) as Promise<Paged<MediaListItem>>;
}

export async function searchByType(
  type: "movie" | "tv" | "person",
  query: string,
  page = 1,
  adult = false,
  extra?: Record<string, string>,
) {
  return tmdbGet({
    data: {
      path: `/search/${type}`,
      query: q({
        query,
        page: String(page),
        include_adult: adult ? "true" : "false",
        ...extra,
      }),
    },
  }) as Promise<Paged<MediaListItem>>;
}
