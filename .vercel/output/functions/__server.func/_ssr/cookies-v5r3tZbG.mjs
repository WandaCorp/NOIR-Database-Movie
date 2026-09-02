import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LegalLayout } from "./legal-layout-akw-tRXr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookies-v5r3tZbG.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Información sobre cookies",
		updated: "1 de septiembre de 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "MHD+ no instala un sistema propio de consentimiento de cookies y no muestra un banner de aceptación o rechazo. Esta página solo describe, con transparencia, tecnologías que pueden aparecer al usar el sitio." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Lo que MHD+ no hace" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-2 pl-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No establece cookies propias para analytics, publicidad o preferencias." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No guarda el consentimiento de cookies." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Las preferencias (favoritos, ajustes, filtro de adultos) se guardan en localStorage del navegador, que no es una cookie." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Terceros que sí pueden usar cookies u otras tecnologías" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Al cargar recursos de terceros, esos servicios pueden usar cookies, almacenamiento local u otros identificadores según sus políticas. En este sitio se usan realmente:" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-2 pl-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "The Movie Database (TMDb)" }), " y su red de imágenes (image.tmdb.org): entregan pósters, fondos y datos del catálogo."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "YouTube" }), ", a través de youtube-nocookie.com, cuando se reproduce un tráiler o video disponible. Google/YouTube pueden establecer cookies u otros identificadores al interactuar con el reproductor."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "MHD+ no incluye redes publicitarias propias ni un servicio de analítica propio. Las fuentes de texto (Plus Jakarta Sans) se sirven desde el propio sitio, no desde Google Fonts." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Cómo limitarlas" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "El navegador permite bloquear cookies de terceros, usar modo restringido o borrar datos del sitio. Si bloqueás cookies de YouTube, el reproductor puede dejar de funcionar. Borrar localStorage elimina favoritos y ajustes de MHD+." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Normativa" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paraguay no cuenta, a la fecha de esta página, con una norma equivalente al régimen europeo de consentimiento de cookies. La Ley N.º 7593/2025 de Protección de Datos Personales fue promulgada en noviembre de 2025 y, según información pública, aún no está plenamente vigente a la espera de reglamentación. Este texto no afirma que exista una obligación de banner de cookies para este sitio." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Más información en ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacidad",
					children: "privacidad"
				}),
				" y",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/aviso-legal",
					children: "aviso legal"
				}),
				"."
			] })
		]
	});
}
//#endregion
export { Page as component };
