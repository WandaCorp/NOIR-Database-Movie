import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal/legal-layout";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos · MHD+" },
      { name: "description", content: "Términos de uso de MHD+." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Términos de uso" updated="1 de septiembre de 2026">
      <p>
        Al usar MHD+ aceptás estas condiciones en la medida en que resulten aplicables. El sitio es
        un visor informativo de datos publicados por The Movie Database (TMDb). No es IMDb,
        Letterboxd ni un servicio de streaming.
      </p>

      <h2>Servicio</h2>
      <p>
        MHD+ muestra títulos, fichas, imágenes, videos enlazados y estadísticas calculadas solo con
        campos que TMDb entrega. No garantiza integridad, vigencia ni exactitud de esos datos. TMDb
        puede cambiar, limitar o retirar información o el acceso a su API.
      </p>

      <h2>Sin cuentas</h2>
      <p>
        No hay registro, inicio de sesión ni perfiles personales en servidores de MHD+. Los
        favoritos viven en el navegador. Si borrás los datos del sitio, se pierden.
      </p>

      <h2>Uso permitido</h2>
      <p>
        El sitio se ofrece para consulta personal. No debe usarse para saturar la API de TMDb, para
        extraer masivamente el catálogo ni para hacer pasar a MHD+ como fuente original de los
        datos. El uso de la API de TMDb está sujeto a los términos de The Movie Database.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Pósters, fotografías, marcas y sinopsis pertenecen a sus titulares. Se muestran a través de
        TMDb. MHD+ no reivindica derechos sobre ese material. El nombre MHD+ identifica a este
        visor.
      </p>

      <h2>Clasificaciones MHD+</h2>
      <p>
        Las etiquetas “Destacada”, “Buena”, “Regular”, “Débil” o “Pocos votos” son una regla local
        documentada (promedio y cantidad de votos de TMDb). No son una valoración oficial de TMDb
        ni una calificación legal de contenidos.
      </p>

      <h2>Contenido para adultos</h2>
      <p>
        Por defecto se ocultan títulos que TMDb marca como `adult`. Si activás la opción, confirmás
        que querés verlos. MHD+ no afirma que ese material sea ilegal o inapropiado; solo sigue la
        clasificación del proveedor.
      </p>

      <h2>Exclusión de responsabilidad</h2>
      <p>
        El sitio se ofrece “tal cual”. En la medida permitida por la legislación paraguaya,
        incluido el régimen de defensa del consumidor cuando corresponda, MHD+ no responde por
        interrupciones, errores de TMDb, enlaces de terceros ni decisiones tomadas a partir de la
        información mostrada.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Para una versión productiva con responsable identificado en Paraguay, suele aplicarse la
        legislación de la República del Paraguay y, en su caso, los tribunales competentes según las
        normas de competencia y de defensa del consumidor. Este aviso es general: un contrato o
        un domicilio distintos pueden cambiar el análisis. Revisá el{" "}
        <Link to="/aviso-legal">aviso legal</Link> y la <Link to="/privacidad">privacidad</Link>.
      </p>
    </LegalLayout>
  );
}
