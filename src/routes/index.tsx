import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { HeroSlider } from "@/components/media/hero-slider";
import { PosterRow } from "@/components/media/poster-row";
import { Skeleton } from "@/components/ui/skeleton";
import { filterAdultItems } from "@/lib/filter-adult";
import { useSettings } from "@/lib/settings";
import { getTrending } from "@/lib/tmdb/api";

export const Route = createFileRoute("/")({
  loader: () => getTrending("week", false),
  head: () => ({
    meta: [
      { title: "MHD+ · Cine y series" },
      {
        name: "description",
        content: "Descubrí películas y series populares, mejor valoradas y próximos estrenos.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const initial = Route.useLoaderData();
  const adult = useSettings((s) => s.adultEnabled);
  const visible = useSettings((s) => s.isSectionVisible);
  const trending = useQuery({
    queryKey: ["trending-home", adult],
    queryFn: () => getTrending("week", adult),
    initialData: adult ? undefined : initial,
  });
  const heroItems = filterAdultItems(trending.data?.results, adult);

  return (
    <div className="space-y-10 pb-10">
      {trending.isPending ? (
        <Skeleton className="h-[70vw] rounded-none md:h-[28rem]" />
      ) : (
        <HeroSlider items={heroItems} />
      )}
      {visible("trending") ? (
        <PosterRow title="Tendencias de la semana" path="trending/all/week" />
      ) : null}
      {visible("popularMovies") ? (
        <PosterRow title="Películas populares" path="movie/popular" href="/peliculas" mediaType="movie" />
      ) : null}
      {visible("popularTv") ? (
        <PosterRow title="Series populares" path="tv/popular" href="/series" mediaType="tv" />
      ) : null}
      {visible("topMovies") ? (
        <PosterRow
          title="Películas mejor valoradas"
          path="movie/top_rated"
          href="/peliculas"
          mediaType="movie"
        />
      ) : null}
      {visible("topTv") ? (
        <PosterRow title="Series mejor valoradas" path="tv/top_rated" href="/series" mediaType="tv" />
      ) : null}
      {visible("upcoming") ? (
        <PosterRow title="Próximos estrenos" path="movie/upcoming" href="/peliculas" mediaType="movie" />
      ) : null}
      {visible("onAir") ? (
        <PosterRow title="Series al aire" path="tv/on_the_air" href="/series" mediaType="tv" />
      ) : null}
    </div>
  );
}
