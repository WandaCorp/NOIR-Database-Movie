import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal/legal-layout";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad · MHD+" },
      { name: "description", content: "Política de privacidad de MHD+." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalLayout title="Política de privacidad" updated="1 de septiembre de 2026">
      <p>
        MHD+ es un sitio informativo de consulta de películas y series. No crea cuentas de usuario
        ni almacena un catálogo propio: el contenido se obtiene en el momento desde The Movie
        Database (TMDb).
      </p>
      <p>
        Este texto describe el funcionamiento real del sitio. No sustituye asesoramiento jurídico.
        Si tenés dudas sobre obligaciones concretas, consultá a un profesional habilitado en
        Paraguay.
      </p>

      <h2>Marco normativo considerado</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Constitución Nacional de la República del Paraguay, art. 33 (intimidad personal y
          familiar) y disposiciones conexas sobre dignidad e información.
        </li>
        <li>
          Ley N.º 1334/98 de Defensa del Consumidor y del Usuario, en cuanto MHD+ se ofrezca como
          servicio de información accesible al público.
        </li>
        <li>
          Ley N.º 4868/2013 de Comercio Electrónico, en lo que resulte aplicable a un sitio
          accesible por internet. MHD+ no realiza ventas en línea.
        </li>
        <li>
          Ley N.º 6534/2020, de protección de datos personales crediticios. Esa norma regula
          principalmente información crediticia y burós; MHD+ no opera como buró de crédito ni
          trata datos crediticios.
        </li>
        <li>
          Ley N.º 7593/2025 de Protección de Datos Personales, promulgada el 27 de noviembre de
          2025. Fuentes jurídicas públicas indican que la ley fue promulgada y que su vigencia plena
          está sujeta a un período de reglamentación (comunicado en torno a 24 meses, con
          operatividad esperada hacia 2027). Hasta que entre en vigor y se reglamente, no debe
          leerse este aviso como si el régimen completo ya fuese exigible. Se recomienda revisar el
          texto oficial y su reglamentación cuando se publiquen.
        </li>
      </ul>

      <h2>Datos que se tratan</h2>
      <p>MHD+ no pide nombre, correo, documento ni cuenta. En particular:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Favoritos y ajustes se guardan en el almacenamiento local del navegador (localStorage) de
          este dispositivo. No se envían a un servidor de MHD+ ni se sincronizan entre equipos.
        </li>
        <li>
          Las consultas al catálogo pasan por un proxy propio hacia TMDb. El proxy añade la clave de
          API del servidor y reenvía parámetros de búsqueda (texto, página, filtros, idioma).
        </li>
        <li>
          TMDb, YouTube (si se reproduce un tráiler) y la red de entrega de imágenes de TMDb pueden
          registrar direcciones IP, identificadores técnicos y registros de acceso según sus propias
          políticas.
        </li>
      </ul>

      <h2>Finalidad</h2>
      <p>
        Mostrar fichas, búsquedas y recomendaciones de cine y series, y recordar preferencias
        locales (favoritos, tamaño de pósters, filtro de contenido para adultos).
      </p>

      <h2>Conservación</h2>
      <p>
        Los favoritos y ajustes permanecen en el navegador hasta que la persona los borre (vaciar
        favoritos, desactivar la opción o limpiar los datos del sitio). MHD+ no conserva una copia
        de esa lista en un servidor propio.
      </p>

      <h2>Transferencias y terceros</h2>
      <p>
        El catálogo proviene de TMDb. Los tráileres se incrustan desde YouTube en el dominio
        youtube-nocookie.com. Esos proveedores están fuera de Paraguay y aplican sus propias
        políticas. MHD+ no controla su tratamiento de datos.
      </p>

      <h2>Derechos</h2>
      <p>
        Como no hay cuenta ni base de usuarios, no existe un perfil que MHD+ pueda rectificar o
        portar. Podés borrar favoritos y ajustes desde la interfaz o desde la configuración del
        navegador. Para datos que obren en TMDb, corresponde ejercer derechos ante ese servicio.
      </p>

      <h2>Menores</h2>
      <p>
        El sitio puede mostrar fichas de títulos de todo tipo. El contenido marcado por TMDb como
        para adultos está oculto por defecto. Eso no equivale a un control parental completo.
      </p>

      <h2>Contacto</h2>
      <p>
        Este despliegue de demostración no publica un domicilio comercial. Para una versión
        productiva conviene identificar al responsable del sitio y un canal de contacto, y revisar
        el texto con un abogado. Ver también{" "}
        <Link to="/aviso-legal">aviso legal</Link>, <Link to="/terminos">términos</Link> y{" "}
        <Link to="/cookies">cookies</Link>.
      </p>
    </LegalLayout>
  );
}
