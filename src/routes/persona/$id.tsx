import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PosterCard } from "@/components/media/poster-card";
import { Lightbox } from "@/components/media/lightbox";
import { formatDate, formatNumber } from "@/lib/format";
import { throwIfMissing } from "@/lib/not-found";
import { getPersonDetails } from "@/lib/tmdb/api";
import { galleryUrl, profileUrl } from "@/lib/tmdb/image";
import type { MediaListItem } from "@/lib/tmdb/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/persona/$id")({
  loader: async ({ params }) => {
    try {
      return await getPersonDetails(params.id);
    } catch (error) {
      throwIfMissing(error);
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Persona"} · MHD+` },
      {
        name: "description",
        content: loaderData?.biography?.slice(0, 160) || `Perfil de ${loaderData?.name ?? "una persona"} en MHD+.`,
      },
    ],
  }),
  component: PersonPage,
});

function uniqMedia(items: MediaListItem[]) {
  const map = new Map<string, MediaListItem>();
  for (const item of items) {
    const type = item.media_type === "tv" ? "tv" : "movie";
    const key = `${type}-${item.id}`;
    const current = map.get(key);
    if (!current) map.set(key, item);
  }
  return [...map.values()].sort((a, b) => {
    const da = a.release_date || a.first_air_date || "";
    const db = b.release_date || b.first_air_date || "";
    return db.localeCompare(da);
  });
}

function PersonPage() {
  const person = Route.useLoaderData();
  const [tab, setTab] = useState<"acting" | "directing" | "writing" | "other">("acting");
  const [openBio, setOpenBio] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const profile = profileUrl(person.profile_path, true);
  const photos = (person.images?.profiles ?? []).map((p) => p.file_path).slice(0, 16);

  const groups = useMemo(() => {
    const cast = uniqMedia((person.combined_credits?.cast ?? []) as MediaListItem[]);
    const crew = person.combined_credits?.crew ?? [];
    const directing = uniqMedia(crew.filter((c) => c.department === "Directing") as MediaListItem[]);
    const writing = uniqMedia(crew.filter((c) => c.department === "Writing") as MediaListItem[]);
    const other = uniqMedia(
      crew.filter((c) => c.department !== "Directing" && c.department !== "Writing") as MediaListItem[],
    );
    return { acting: cast, directing, writing, other };
  }, [person]);

  const list = groups[tab];
  const bio = person.biography ?? "";
  const short = bio.length > 480 && !openBio ? `${bio.slice(0, 480)}…` : bio;

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-44 shrink-0 overflow-hidden rounded-xl bg-surface-2 md:w-56">
          {profile ? <img src={profile} alt={person.name} className="w-full" /> : <div className="aspect-[2/3]" />}
        </div>
        <div>
          <p className="text-xs tracking-widest text-accent uppercase">Persona</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{person.name}</h1>
          {person.known_for_department ? (
            <p className="mt-1 text-sm text-muted">{person.known_for_department}</p>
          ) : null}
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {person.birthday ? (
              <div>
                <dt className="text-xs text-muted">Nacimiento</dt>
                <dd>{formatDate(person.birthday)}</dd>
              </div>
            ) : null}
            {person.deathday ? (
              <div>
                <dt className="text-xs text-muted">Fallecimiento</dt>
                <dd>{formatDate(person.deathday)}</dd>
              </div>
            ) : null}
            {person.place_of_birth ? (
              <div>
                <dt className="text-xs text-muted">Lugar</dt>
                <dd>{person.place_of_birth}</dd>
              </div>
            ) : null}
            {person.popularity ? (
              <div>
                <dt className="text-xs text-muted">Popularidad</dt>
                <dd>{formatNumber(Math.round(person.popularity))}</dd>
              </div>
            ) : null}
          </dl>
          {short ? (
            <div className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              <p>{short}</p>
              {bio.length > 480 ? (
                <button
                  type="button"
                  className="mt-2 text-accent"
                  onClick={() => setOpenBio((v) => !v)}
                >
                  {openBio ? "Ver menos" : "Leer más"}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {photos.length ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Imágenes</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {photos.map((path, i) => {
              const src = galleryUrl(path);
              if (!src) return null;
              return (
                <button
                  key={path}
                  type="button"
                  className="h-36 w-24 shrink-0 overflow-hidden rounded-lg"
                  onClick={() => setPhoto(i)}
                  aria-label={`Foto ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              );
            })}
          </div>
          {photo != null ? (
            <Lightbox paths={photos} index={photo} onClose={() => setPhoto(null)} onIndex={setPhoto} />
          ) : null}
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Filmografía</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["acting", "Interpretación", groups.acting.length],
              ["directing", "Dirección", groups.directing.length],
              ["writing", "Guion", groups.writing.length],
              ["other", "Otros roles", groups.other.length],
            ] as const
          ).map(([id, label, count]) =>
            count ? (
              <Button
                key={id}
                size="sm"
                variant={tab === id ? "default" : "outline"}
                onClick={() => setTab(id)}
              >
                {label} ({count})
              </Button>
            ) : null,
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {list.map((item) => {
            const type = item.media_type === "tv" ? "tv" : "movie";
            return <PosterCard key={`${type}-${item.id}`} item={item} mediaType={type} />;
          })}
        </div>
      </section>
    </article>
  );
}
