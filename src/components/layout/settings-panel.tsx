import { Settings } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { HOME_SECTION_IDS, useSettings, type HomeSectionId } from "@/lib/settings";

const SECTION_LABEL: Record<HomeSectionId, string> = {
  trending: "Tendencias",
  popularMovies: "Películas populares",
  popularTv: "Series populares",
  topMovies: "Películas mejor valoradas",
  topTv: "Series mejor valoradas",
  upcoming: "Próximos estrenos",
  onAir: "Series al aire",
};

export function SettingsPanel() {
  const settings = useSettings();
  const [confirmAdult, setConfirmAdult] = useState(false);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Ajustes de visualización">
            <Settings className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Ajustes</SheetTitle>
          <SheetDescription>
            Preferencias locales de este dispositivo. No se envían a un servidor.
          </SheetDescription>
          <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
            <section>
              <h3 className="text-sm font-medium">Contenido para adultos</h3>
              <p className="mt-1 text-xs text-muted">
                Desactivado por defecto. MHD+ usa únicamente la marca `adult` de TMDb; no afirma
                legalidad ni adecuación.
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-sm">Mostrar títulos para adultos</span>
                <Switch
                  checked={settings.adultEnabled}
                  onCheckedChange={(next) => {
                    if (next) setConfirmAdult(true);
                    else settings.setAdult(false);
                  }}
                  aria-label="Mostrar contenido para adultos"
                />
              </div>
              {settings.adultEnabled ? (
                <p className="mt-2 text-xs text-warning">Contenido para adultos habilitado.</p>
              ) : null}
            </section>

            <Separator />

            <section className="space-y-3">
              <h3 className="text-sm font-medium">Presentación</h3>
              <label className="flex flex-col gap-1 text-sm">
                Tamaño de pósters
                <Select
                  value={settings.posterSize}
                  onChange={(e) => settings.setPosterSize(e.target.value as "sm" | "md" | "lg")}
                >
                  <option value="sm">Compacto</option>
                  <option value="md">Estándar</option>
                  <option value="lg">Grande</option>
                </Select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Densidad
                <Select
                  value={settings.density}
                  onChange={(e) =>
                    settings.setDensity(e.target.value as "comfortable" | "compact")
                  }
                >
                  <option value="comfortable">Cómoda</option>
                  <option value="compact">Densa</option>
                </Select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Calidad de imagen
                <Select
                  value={settings.imageQuality}
                  onChange={(e) =>
                    settings.setImageQuality(e.target.value as "saver" | "standard" | "high")
                  }
                >
                  <option value="saver">Ahorro de datos</option>
                  <option value="standard">Estándar</option>
                  <option value="high">Alta</option>
                </Select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Orden por defecto
                <Select
                  value={settings.defaultSort}
                  onChange={(e) =>
                    settings.setDefaultSort(
                      e.target.value as typeof settings.defaultSort,
                    )
                  }
                >
                  <option value="popularity.desc">Popularidad</option>
                  <option value="vote_average.desc">Valoración</option>
                  <option value="primary_release_date.desc">Fecha</option>
                  <option value="original_title.asc">Alfabético</option>
                </Select>
              </label>
            </section>

            <Separator />

            <section>
              <h3 className="text-sm font-medium">Secciones del inicio</h3>
              <ul className="mt-3 space-y-2">
                {HOME_SECTION_IDS.map((id) => (
                  <li key={id} className="flex items-center justify-between gap-3">
                    <span className="text-sm">{SECTION_LABEL[id]}</span>
                    <Switch
                      checked={!settings.hiddenSections.includes(id)}
                      onCheckedChange={() => settings.toggleSection(id)}
                      aria-label={`Mostrar ${SECTION_LABEL[id]}`}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmAdult} onOpenChange={setConfirmAdult}>
        <AlertDialogContent>
          <AlertDialogTitle>¿Mostrar contenido para adultos?</AlertDialogTitle>
          <AlertDialogDescription>
            TMDb marca algunos títulos como contenido para adultos. Al activar esta opción MHD+
            incluirá esos resultados. No implica un juicio legal ni de adecuación. El estado se
            guarda solo en este navegador.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                settings.acknowledgeAdult();
                setConfirmAdult(false);
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
