import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal/legal-layout";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · MHD+" },
      { name: "description", content: "Aviso legal de MHD+." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Aviso legal" updated="1 de septiembre de 2026">
      <h2>Identificación</h2>
      <p>
        MHD+ es un visor web de cine y series. Esta instancia se ofrece como producto de
        demostración. No se publica aquí un RUC, domicilio fiscal ni representante legal. Una
        versión comercial debería completar esos datos conforme a la legislación paraguaya
        aplicable (incluidas, cuando correspondan, normas de identificación del prestador y de
        comercio electrónico).
      </p>

      <h2>Objeto</h2>
      <p>
        Facilitar la consulta de información de películas, series y personas obtenida de The Movie
        Database (TMDb). MHD+ no vende entradas, no licencia películas y no aloja archivos
        audiovisuales propios, salvo la interfaz y el código del visor.
      </p>

      <h2>Relación con TMDb</h2>
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB. Los logotipos,
        datos e imágenes de títulos son responsabilidad de TMDb y de los titulares de derechos. MHD+
        no es un producto oficial de IMDb, Netflix, Letterboxd ni TMDb.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        El diseño, el código y la marca MHD+ pertenecen a quien explota este sitio, en la medida de
        los derechos que realmente ostente. El material de las fichas (pósters, stills, nombres
        comerciales) no se cede por el hecho de mostrarse.
      </p>

      <h2>Enlaces y videos</h2>
      <p>
        Los tráileres se reproducen desde YouTube. Los sitios oficiales enlazados en cada ficha son
        ajenos a MHD+. El acceso a esos destinos se rige por sus propias condiciones.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        La información puede estar incompleta, desactualizada o traducida de forma automática por
        TMDb. MHD+ no garantiza disponibilidad continua. En cuanto resulte de aplicación la Ley N.º
        1334/98 de Defensa del Consumidor y del Usuario, los derechos que esa norma reconoce no se
        entienden renunciados por este aviso, en la medida en que sean irrenunciables.
      </p>

      <h2>Jurisdicción</h2>
      <p>
        Cualquier controversia con un responsable establecido en Paraguay se analizará, en
        principio, conforme al derecho paraguayo y a las reglas de competencia vigentes, incluido el
        fuero del consumidor cuando corresponda. Este párrafo es orientativo y no constituye un
        pacto de jurisdicción si la ley no lo permite.
      </p>

      <p>
        Documentos relacionados: <Link to="/privacidad">privacidad</Link>,{" "}
        <Link to="/terminos">términos</Link> y <Link to="/cookies">cookies</Link>.
      </p>
    </LegalLayout>
  );
}
