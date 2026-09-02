import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function MediaLink({
  mediaType,
  id,
  className,
  children,
  ariaLabel,
}: {
  mediaType: "movie" | "tv" | "person";
  id: number | string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const params = { id: String(id) };
  if (mediaType === "tv") {
    return (
      <Link to="/serie/$id" params={params} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (mediaType === "person") {
    return (
      <Link to="/persona/$id" params={params} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/pelicula/$id" params={params} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
