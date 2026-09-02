import { MediaLink } from "@/components/media/media-link";
import { profileUrl } from "@/lib/tmdb/image";
import type { CastMember, CrewMember } from "@/lib/tmdb/types";

export function CreditsList({
  cast,
  crew,
}: {
  cast?: CastMember[];
  crew?: CrewMember[];
}) {
  const directors = (crew ?? []).filter((c) => c.job === "Director");
  const writers = (crew ?? []).filter((c) =>
    ["Writer", "Screenplay", "Story", "Characters"].includes(c.job ?? ""),
  );
  const uniqueWriters = writers.filter(
    (w, i, arr) => arr.findIndex((x) => x.id === w.id && x.job === w.job) === i,
  );
  const topCast = (cast ?? []).slice(0, 16);

  if (!topCast.length && !directors.length && !uniqueWriters.length) return null;

  return (
    <div className="space-y-8">
      {directors.length || uniqueWriters.length ? (
        <section>
          <h2 className="text-lg font-semibold">Equipo</h2>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {directors.length ? (
              <div>
                <dt className="text-xs text-muted">Dirección</dt>
                <dd className="mt-1 text-sm">
                  {directors.map((d, i) => (
                    <span key={`${d.id}-${d.job}`}>
                      {i > 0 ? ", " : ""}
                      <MediaLink mediaType="person" id={d.id} className="hover:text-accent">
                        {d.name}
                      </MediaLink>
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
            {uniqueWriters.length ? (
              <div>
                <dt className="text-xs text-muted">Guion</dt>
                <dd className="mt-1 text-sm">
                  {uniqueWriters.map((d, i) => (
                    <span key={`${d.id}-${d.job}`}>
                      {i > 0 ? ", " : ""}
                      <MediaLink mediaType="person" id={d.id} className="hover:text-accent">
                        {d.name}
                      </MediaLink>
                      {d.job ? <span className="text-muted"> ({d.job})</span> : null}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>
      ) : null}

      {topCast.length ? (
        <section>
          <h2 className="text-lg font-semibold">Reparto</h2>
          <ul className="scrollbar-thin mt-3 flex gap-3 overflow-x-auto pb-2">
            {topCast.map((person) => {
              const img = profileUrl(person.profile_path);
              return (
                <li key={person.credit_id ?? `${person.id}-${person.character}`} className="w-28 shrink-0">
                  <MediaLink mediaType="person" id={person.id} className="block">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg bg-surface-2">
                      {img ? (
                        <img src={img} alt="" loading="lazy" className="size-full object-cover" />
                      ) : (
                        <div className="grid size-full place-items-center text-xs text-subtle">
                          Sin foto
                        </div>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-medium">{person.name}</p>
                    {person.character ? (
                      <p className="line-clamp-2 text-xs text-muted">{person.character}</p>
                    ) : null}
                  </MediaLink>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
