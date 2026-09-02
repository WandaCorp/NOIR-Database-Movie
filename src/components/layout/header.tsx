import { Link } from "@tanstack/react-router";
import { Clapperboard } from "lucide-react";
import { SearchBox } from "@/components/search/search-box";
import { SettingsPanel } from "@/components/layout/settings-panel";
import { useSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/peliculas", label: "Películas" },
  { to: "/series", label: "Series" },
  { to: "/generos", label: "Géneros" },
  { to: "/favoritos", label: "Favoritos" },
] as const;

export function Header() {
  const adult = useSettings((s) => s.adultEnabled);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 md:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-2 pr-2" aria-label="MHD+ inicio">
          <Clapperboard className="size-5 text-accent" />
          <span className="text-lg font-semibold tracking-tight">MHD+</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted hover:text-fg",
              )}
              activeProps={{ className: "text-fg font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden flex-1 justify-end md:flex">
          <SearchBox />
        </div>
        {adult ? (
          <span className="hidden rounded-full bg-warning/15 px-2 py-1 text-[11px] font-medium text-warning sm:inline">
            Adultos
          </span>
        ) : null}
        <SettingsPanel />
      </div>
      <div className="px-4 pb-3 md:hidden">
        <SearchBox />
      </div>
    </header>
  );
}
