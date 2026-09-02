import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  title,
  href,
  action,
}: {
  title: string;
  href?: "/peliculas" | "/series" | "/generos" | "/favoritos";
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="text-lg font-semibold tracking-tight md:text-xl">{title}</h2>
      {action}
      {href ? (
        <Link
          to={href}
          className="inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-fg"
        >
          Ver todo
          <ChevronRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
