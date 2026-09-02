import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as getGenres } from "./router-CZUuLSOP.mjs";
import { t as ErrorState } from "./error-state-DjsklK-g.mjs";
import { t as Skeleton } from "./skeleton-Bj7frTpe.mjs";
import { t as genreSearch } from "./genre-search-BvliK7C9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generos-bXmxK7AX.js
var import_jsx_runtime = require_jsx_runtime();
function GenreGroup({ title, type }) {
	const query = useQuery({
		queryKey: ["genres", type],
		queryFn: () => getGenres(type)
	});
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		message: "No se pudieron cargar los géneros.",
		onRetry: () => void query.refetch()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-lg font-semibold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
		children: query.isPending ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-lg" }, i)) : (query.data?.genres ?? []).map((genre) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/generos/$id",
			params: { id: String(genre.id) },
			search: genreSearch(type),
			className: "flex min-h-14 items-center rounded-lg bg-surface px-4 text-sm hover:bg-surface-2",
			children: genre.name
		}) }, `${type}-${genre.id}`))
	})] });
}
function GenerosPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-10 px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight md:text-3xl",
				children: "Géneros"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Las listas salen de los endpoints de géneros de TMDb para cine y televisión."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreGroup, {
				title: "Cine",
				type: "movie"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreGroup, {
				title: "Series",
				type: "tv"
			})
		]
	});
}
//#endregion
export { GenerosPage as component };
