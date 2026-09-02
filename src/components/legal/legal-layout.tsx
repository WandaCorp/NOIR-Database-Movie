import type { ReactNode } from "react";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <p className="text-xs tracking-widest text-muted uppercase">MHD+</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">Última actualización: {updated}</p>
      <div className="prose-legal mt-8 space-y-5 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-fg [&_a]:text-accent [&_a]:underline">
        {children}
      </div>
    </article>
  );
}
