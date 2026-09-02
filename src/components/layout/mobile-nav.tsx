import { Link } from "@tanstack/react-router";
import { Clapperboard, Heart, House, LayoutGrid, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/", label: "Inicio", icon: House },
  { to: "/peliculas", label: "Cine", icon: Clapperboard },
  { to: "/series", label: "Series", icon: Tv },
  { to: "/generos", label: "Géneros", icon: LayoutGrid },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
] as const;

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Navegación inferior"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] text-muted",
                )}
                activeProps={{ className: "text-accent" }}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
