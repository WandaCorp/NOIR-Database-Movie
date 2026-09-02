import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CreditsList } from "@/components/details/credits-list";
import { ImageGallery } from "@/components/details/image-gallery";
import { SimilarRow } from "@/components/details/similar-row";
import { StatsCharts } from "@/components/details/stats-charts";
import { VideoSection } from "@/components/details/video-section";
import { FavoriteButton } from "@/components/media/favorite-button";
import { RatingBadge } from "@/components/media/rating-badge";
import { Button } from "@/components/ui/button";
import {
  formatDate,
  formatMoney,
  formatNumber,
  formatRuntime,
  formatYear,
  mediaTitle,
} from "@/lib/format";
import { genreSearch } from "@/lib/genre-search";
import { throwIfMissing } from "@/lib/not-found";
import { useSettings } from "@/lib/settings";
import { getMovieDetails } from "@/lib/tmdb/api";
import { backdropSrcSet, posterUrl } from "@/lib/tmdb/image";

export const Route = createFileRoute("/pelicula/$id")({
  loader: async ({ params }) => {
    try {
      return await getMovieDetails(params.id);
    } catch (error) {
      throwIfMissing(error);
    }
  },
  head: ({ loaderData }) => {
    const title = loaderData ? mediaTitle(loaderData) : "Película";
    const overview = loaderData?.overview?.slice(0, 160) ?? "Ficha de película en MHD+.";
    return {
      meta: [
        { title: `${title} · MHD+` },
        { name: "description", content: overview },
      ],
    };
  },
  component: MoviePage,
});

function MoviePage() {
  const movie = Route.useLoaderData();
  const adultEnabled = useSettings((s) => s.adultEnabled);
  const title = mediaTitle(movie);
  const year = formatYear(movie.release_date);
  const poster = posterUrl(movie.poster_path, "high", "lg");
  const backdrop = backdropSrcSet(movie.backdrop_path);
  const languages = movie.spoken_languages?.map((l) => l.name).filter(Boolean).join(", ");
  const countries = movie.production_countries?.map((c) => c.name).join(", ");
  const companies = movie.production_companies?.map((c) => c.name).join(", ");

  if (movie.adult && !adultEnabled) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Título marcado para adultos</h1>
        <p className="mt-3 text-sm text-muted">
          TMDb identifica este contenido como para adultos. Activá la opción en Ajustes para ver la
          ficha. MHD+ no afirma que el contenido sea ilegal.
        </p>
      </div>
    );
  }

  return (
    <article>
      <div className="relative isolate">
        {backdrop ? (
          <img
            src={backdrop.src}
            srcSet={backdrop.srcSet}
            sizes="100vw"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:px-8">
          <div className="w-44 shrink-0 overflow-hidden rounded-xl bg-surface-2 md:w-56">
            {poster ? (
              <img src={poster} alt={`Póster de ${title}`} className="w-full" />
            ) : (
              <div className="aspect-[2/3]" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-widest text-accent uppercase">Película</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            {movie.original_title && movie.original_title !== title ? (
              <p className="mt-1 text-sm text-muted">{movie.original_title}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <RatingBadge average={movie.vote_average} count={movie.vote_count} />
              {year ? <span className="text-sm text-muted">{year}</span> : null}
              {movie.runtime ? (
                <span className="text-sm text-muted">{formatRuntime(movie.runtime)}</span>
              ) : null}
              {movie.status ? <span className="text-sm text-muted">{movie.status}</span> : null}
            </div>
            {movie.tagline ? <p className="mt-3 text-sm italic text-muted">{movie.tagline}</p> : null}
            {movie.overview ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed md:text-base">{movie.overview}</p>
            ) : null}
            {movie.genres?.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <li key={g.id}>
                    <Link
                      to="/generos/$id"
                      params={{ id: String(g.id) }}
                      search={genreSearch("movie")}
                      className="inline-flex min-h-9 items-center rounded-full bg-surface-2 px-3 text-xs"
                    >
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              <FavoriteButton
                item={{
                  id: movie.id,
                  mediaType: "movie",
                  title,
                  posterPath: movie.poster_path,
                  year,
                  voteAverage: movie.vote_average,
                  voteCount: movie.vote_count,
                }}
                className="bg-surface"
              />
              {movie.homepage ? (
                <Button asChild variant="outline">
                  <a href={movie.homepage} target="_blank" rel="noreferrer">
                    Sitio oficial
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-8">
        <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <Info label="Estreno" value={formatDate(movie.release_date)} />
          <Info label="Votos" value={formatNumber(movie.vote_count)} />
          <Info label="Presupuesto" value={formatMoney(movie.budget)} />
          <Info label="Ingresos" value={formatMoney(movie.revenue)} />
          <Info label="Idiomas" value={languages} />
          <Info label="Países" value={countries} />
          <Info label="Compañías" value={companies} />
          <Info label="Popularidad" value={formatNumber(Math.round(movie.popularity ?? 0))} />
        </dl>

        <StatsCharts
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          popularity={movie.popularity}
          budget={movie.budget}
          revenue={movie.revenue}
        />
        <CreditsList cast={movie.credits?.cast} crew={movie.credits?.crew} />
        <VideoSection videos={movie.videos?.results} />
        <ImageGallery id={String(movie.id)} type="movie" />
        <SimilarRow title="Recomendaciones" items={movie.recommendations?.results} mediaType="movie" />
        <SimilarRow title="Similares" items={movie.similar?.results} mediaType="movie" />
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
