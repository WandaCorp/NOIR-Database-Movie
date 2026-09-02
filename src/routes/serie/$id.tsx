import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CreditsList } from "@/components/details/credits-list";
import { ImageGallery } from "@/components/details/image-gallery";
import { Seasons } from "@/components/details/seasons";
import { SimilarRow } from "@/components/details/similar-row";
import { StatsCharts } from "@/components/details/stats-charts";
import { VideoSection } from "@/components/details/video-section";
import { FavoriteButton } from "@/components/media/favorite-button";
import { RatingBadge } from "@/components/media/rating-badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatNumber, formatRuntime, formatYear, mediaTitle } from "@/lib/format";
import { genreSearch } from "@/lib/genre-search";
import { throwIfMissing } from "@/lib/not-found";
import { useSettings } from "@/lib/settings";
import { getTvDetails } from "@/lib/tmdb/api";
import { backdropSrcSet, posterUrl } from "@/lib/tmdb/image";

export const Route = createFileRoute("/serie/$id")({
  loader: async ({ params }) => {
    try {
      return await getTvDetails(params.id);
    } catch (error) {
      throwIfMissing(error);
    }
  },
  head: ({ loaderData }) => {
    const title = loaderData ? mediaTitle(loaderData) : "Serie";
    const overview = loaderData?.overview?.slice(0, 160) ?? "Ficha de serie en MHD+.";
    return {
      meta: [
        { title: `${title} · MHD+` },
        { name: "description", content: overview },
      ],
    };
  },
  component: SeriesDetailPage,
});

function SeriesDetailPage() {
  const show = Route.useLoaderData();
  const adultEnabled = useSettings((s) => s.adultEnabled);
  const title = mediaTitle(show);
  const year = formatYear(show.first_air_date);
  const poster = posterUrl(show.poster_path, "high", "lg");
  const backdrop = backdropSrcSet(show.backdrop_path);
  const runtime = show.episode_run_time?.[0];
  const languages = show.spoken_languages?.map((l) => l.name).filter(Boolean).join(", ");
  const countries = show.production_countries?.map((c) => c.name).join(", ");
  const companies = show.production_companies?.map((c) => c.name).join(", ");
  const creators = show.created_by?.map((c) => c.name).join(", ");

  if (show.adult && !adultEnabled) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Título marcado para adultos</h1>
        <p className="mt-3 text-sm text-muted">
          TMDb identifica este contenido como para adultos. Activá la opción en Ajustes para ver la
          ficha.
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
            {poster ? <img src={poster} alt={`Póster de ${title}`} className="w-full" /> : <div className="aspect-[2/3]" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-widest text-accent uppercase">Serie</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            {show.original_name && show.original_name !== title ? (
              <p className="mt-1 text-sm text-muted">{show.original_name}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <RatingBadge average={show.vote_average} count={show.vote_count} />
              {year ? <span className="text-sm text-muted">{year}</span> : null}
              {show.number_of_seasons ? (
                <span className="text-sm text-muted">{show.number_of_seasons} temporadas</span>
              ) : null}
              {show.number_of_episodes ? (
                <span className="text-sm text-muted">{show.number_of_episodes} episodios</span>
              ) : null}
            </div>
            {show.overview ? (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed md:text-base">{show.overview}</p>
            ) : null}
            {show.genres?.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {show.genres.map((g) => (
                  <li key={g.id}>
                    <Link
                      to="/generos/$id"
                      params={{ id: String(g.id) }}
                      search={genreSearch("tv")}
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
                  id: show.id,
                  mediaType: "tv",
                  title,
                  posterPath: show.poster_path,
                  year,
                  voteAverage: show.vote_average,
                  voteCount: show.vote_count,
                }}
                className="bg-surface"
              />
              {show.homepage ? (
                <Button asChild variant="outline">
                  <a href={show.homepage} target="_blank" rel="noreferrer">
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
          <Info label="Primera emisión" value={formatDate(show.first_air_date)} />
          <Info label="Última emisión" value={formatDate(show.last_air_date)} />
          <Info label="Duración ep." value={formatRuntime(runtime)} />
          <Info label="Estado" value={show.status} />
          <Info label="Creación" value={creators} />
          <Info label="Idiomas" value={languages} />
          <Info label="Países" value={countries} />
          <Info label="Compañías" value={companies} />
        </dl>

        <StatsCharts
          voteAverage={show.vote_average}
          voteCount={show.vote_count}
          popularity={show.popularity}
          seasons={show.seasons}
        />
        <Seasons tvId={String(show.id)} seasons={show.seasons} />
        <CreditsList cast={show.credits?.cast} crew={show.credits?.crew} />
        <VideoSection videos={show.videos?.results} />
        <ImageGallery id={String(show.id)} type="tv" />
        <SimilarRow title="Recomendaciones" items={show.recommendations?.results} mediaType="tv" />
        <SimilarRow title="Similares" items={show.similar?.results} mediaType="tv" />
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
