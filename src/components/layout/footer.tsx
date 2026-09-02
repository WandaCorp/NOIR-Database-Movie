import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-md">
          <p className="text-sm font-semibold">MHD+</p>
          <p className="mt-2 text-sm text-muted">
            Explorador de cine y series alimentado por The Movie Database. Este producto usa la API
            de TMDB, pero no está avalado ni certificado por TMDB.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Legal">
          <Link to="/privacidad" className="min-h-11 py-2 text-muted hover:text-fg">
            Privacidad
          </Link>
          <Link to="/terminos" className="min-h-11 py-2 text-muted hover:text-fg">
            Términos
          </Link>
          <Link to="/cookies" className="min-h-11 py-2 text-muted hover:text-fg">
            Cookies
          </Link>
          <Link to="/aviso-legal" className="min-h-11 py-2 text-muted hover:text-fg">
            Aviso legal
          </Link>
        </nav>
      </div>
    </footer>
  );
}
