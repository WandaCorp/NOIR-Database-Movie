import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal/legal-layout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies · MHD+" },
      { name: "description", content: "Información sobre cookies y tecnologías similares en MHD+." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Información sobre cookies" updated="1 de septiembre de 2026">
      <p>
        MHD+ no instala un sistema propio de consentimiento de cookies y no muestra un banner de
        aceptación o rechazo. Esta página solo describe, con transparencia, tecnologías que pueden
        aparecer al usar el sitio.
      </p>

      <h2>Lo que MHD+ no hace</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>No establece cookies propias para analytics, publicidad o preferencias.</li>
        <li>No guarda el consentimiento de cookies.</li>
        <li>
          Las preferencias (favoritos, ajustes, filtro de adultos) se guardan en localStorage del
          navegador, que no es una cookie.
        </li>
      </ul>

      <h2>Terceros que sí pueden usar cookies u otras tecnologías</h2>
      <p>Al cargar recursos de terceros, esos servicios pueden usar cookies, almacenamiento local u otros identificadores según sus políticas. En este sitio se usan realmente:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>The Movie Database (TMDb)</strong> y su red de imágenes (image.tmdb.org): entregan
          pósters, fondos y datos del catálogo.
        </li>
        <li>
          <strong>YouTube</strong>, a través de youtube-nocookie.com, cuando se reproduce un tráiler
          o video disponible. Google/YouTube pueden establecer cookies u otros identificadores al
          interactuar con el reproductor.
        </li>
      </ul>
      <p>
        MHD+ no incluye redes publicitarias propias ni un servicio de analítica propio. Las fuentes
        de texto (Plus Jakarta Sans) se sirven desde el propio sitio, no desde Google Fonts.
      </p>

      <h2>Cómo limitarlas</h2>
      <p>
        El navegador permite bloquear cookies de terceros, usar modo restringido o borrar datos del
        sitio. Si bloqueás cookies de YouTube, el reproductor puede dejar de funcionar. Borrar
        localStorage elimina favoritos y ajustes de MHD+.
      </p>

      <h2>Normativa</h2>
      <p>
        Paraguay no cuenta, a la fecha de esta página, con una norma equivalente al régimen europeo
        de consentimiento de cookies. La Ley N.º 7593/2025 de Protección de Datos Personales fue
        promulgada en noviembre de 2025 y, según información pública, aún no está plenamente
        vigente a la espera de reglamentación. Este texto no afirma que exista una obligación de
        banner de cookies para este sitio.
      </p>
      <p>
        Más información en <Link to="/privacidad">privacidad</Link> y{" "}
        <Link to="/aviso-legal">aviso legal</Link>.
      </p>
    </LegalLayout>
  );
}
