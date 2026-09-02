export type MediaType = "movie" | "tv" | "person";

export type Genre = { id: number; name: string };

export type Company = {
  id: number;
  name: string;
  logo_path?: string | null;
  origin_country?: string;
};

export type Country = { iso_3166_1: string; name: string };
export type Language = { iso_639_1: string; name: string; english_name?: string };

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at?: string;
};

export type CastMember = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
  order?: number;
  job?: string;
  department?: string;
  credit_id?: string;
};

export type CrewMember = {
  id: number;
  name: string;
  job?: string;
  department?: string;
  profile_path?: string | null;
  credit_id?: string;
};

export type TmdbImage = {
  file_path: string;
  width: number;
  height: number;
  iso_639_1?: string | null;
  vote_average?: number;
};

export type Paged<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MediaListItem = {
  id: number;
  adult?: boolean;
  media_type?: MediaType;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  profile_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  original_language?: string;
  known_for_department?: string;
  known_for?: MediaListItem[];
};

export type MovieDetails = MediaListItem & {
  runtime?: number | null;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
  homepage?: string | null;
  genres?: Genre[];
  production_companies?: Company[];
  production_countries?: Country[];
  spoken_languages?: Language[];
  imdb_id?: string | null;
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  videos?: { results: Video[] };
  recommendations?: Paged<MediaListItem>;
  similar?: Paged<MediaListItem>;
  images?: { posters: TmdbImage[]; backdrops: TmdbImage[] };
  release_dates?: {
    results: Array<{
      iso_3166_1: string;
      release_dates: Array<{ certification: string; type: number }>;
    }>;
  };
};

export type TvSeason = {
  id: number;
  name: string;
  overview?: string;
  season_number: number;
  episode_count?: number;
  air_date?: string | null;
  poster_path?: string | null;
  vote_average?: number;
};

export type TvEpisode = {
  id: number;
  name: string;
  overview?: string;
  episode_number: number;
  season_number: number;
  air_date?: string | null;
  runtime?: number | null;
  still_path?: string | null;
  vote_average?: number;
  vote_count?: number;
};

export type SeasonDetails = TvSeason & {
  episodes: TvEpisode[];
};

export type TvDetails = MediaListItem & {
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  status?: string;
  tagline?: string;
  homepage?: string | null;
  genres?: Genre[];
  created_by?: Array<{ id: number; name: string; profile_path?: string | null }>;
  networks?: Company[];
  production_companies?: Company[];
  production_countries?: Country[];
  spoken_languages?: Language[];
  seasons?: TvSeason[];
  first_air_date?: string;
  last_air_date?: string;
  in_production?: boolean;
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  videos?: { results: Video[] };
  recommendations?: Paged<MediaListItem>;
  similar?: Paged<MediaListItem>;
  images?: { posters: TmdbImage[]; backdrops: TmdbImage[] };
  content_ratings?: {
    results: Array<{ iso_3166_1: string; rating: string }>;
  };
};

export type PersonDetails = {
  id: number;
  name: string;
  adult?: boolean;
  biography?: string;
  birthday?: string | null;
  deathday?: string | null;
  place_of_birth?: string | null;
  profile_path?: string | null;
  popularity?: number;
  known_for_department?: string;
  also_known_as?: string[];
  gender?: number;
  homepage?: string | null;
  combined_credits?: {
    cast: Array<MediaListItem & { character?: string; credit_id?: string }>;
    crew: Array<MediaListItem & { job?: string; department?: string; credit_id?: string }>;
  };
  images?: { profiles: TmdbImage[] };
};

export type GenreList = { genres: Genre[] };
