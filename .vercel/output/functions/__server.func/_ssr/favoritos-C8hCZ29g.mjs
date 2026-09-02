import { i as __toESM } from "../_runtime.mjs";
import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { K as Button, _ as AlertDialogTitle, d as AlertDialog, f as AlertDialogAction, g as AlertDialogFooter, h as AlertDialogDescription, m as AlertDialogContent, p as AlertDialogCancel } from "./router-CZUuLSOP.mjs";
import { i as useFavorites, n as PosterCard } from "./poster-card-CFViesV3.mjs";
import { t as EmptyState } from "./empty-state-h3wyNPTg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favoritos-C8hCZ29g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavoritosPage() {
	const items = useFavorites((s) => s.items);
	const clear = useFavorites((s) => s.clear);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Favoritos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Se guardan en este dispositivo (localStorage). No hay cuenta ni sincronización."
				})] }), items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setConfirm(true),
					children: "Vaciar lista"
				}) : null]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Todavía no hay favoritos",
				description: "Marcá películas o series con el corazón para encontrarlas después."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6",
				children: items.map((item) => {
					const media = {
						id: item.id,
						title: item.title,
						poster_path: item.posterPath,
						release_date: item.year,
						vote_average: item.voteAverage,
						vote_count: item.voteCount
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
						item: media,
						mediaType: item.mediaType
					}, `${item.mediaType}-${item.id}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "¿Vaciar favoritos?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Se eliminará toda la lista guardada en este navegador. Esta acción no se puede deshacer." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: () => {
							clear();
							setConfirm(false);
						},
						children: "Vaciar"
					})] })
				] })
			})
		]
	});
}
//#endregion
export { FavoritosPage as component };
