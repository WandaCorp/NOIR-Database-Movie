import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as searchByType, G as useSettings, K as Button, O as searchMulti, b as Input, c as Route$12, u as Select, v as filterAdultItems, y as useDebounce } from "./router-CZUuLSOP.mjs";
import { t as ErrorState } from "./error-state-DjsklK-g.mjs";
import { t as EmptyState } from "./empty-state-h3wyNPTg.mjs";
import { t as MediaGrid } from "./media-grid-C1wUflpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buscar-C6JI3F-D.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const search = Route$12.useSearch();
	const navigate = Route$12.useNavigate();
	const adult = useSettings((s) => s.adultEnabled);
	const debounced = useDebounce(search.q.trim(), 280);
	const query = useQuery({
		queryKey: [
			"search",
			debounced,
			search.tipo,
			search.year,
			search.page,
			adult
		],
		enabled: debounced.length >= 2,
		queryFn: () => {
			if (search.tipo === "all") return searchMulti(debounced, search.page, adult);
			const extra = {};
			if (search.year && search.tipo === "movie") extra.year = search.year;
			if (search.year && search.tipo === "tv") extra.first_air_date_year = search.year;
			return searchByType(search.tipo, debounced, search.page, adult, extra);
		}
	});
	const items = filterAdultItems(query.data?.results, adult).filter((item) => {
		if (search.tipo !== "all") return true;
		if (!search.year) return true;
		return (item.release_date || item.first_air_date || "").startsWith(search.year);
	});
	const totalPages = Math.min(query.data?.total_pages ?? 1, 20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Buscar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				onSubmit: (e) => {
					e.preventDefault();
					const data = new FormData(e.currentTarget);
					navigate({ search: {
						q: String(data.get("q") ?? ""),
						tipo: String(data.get("tipo") ?? "all"),
						year: String(data.get("year") ?? ""),
						page: 1
					} });
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted sm:col-span-2",
						children: ["Consulta", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "q",
							defaultValue: search.q,
							placeholder: "Título, persona…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted",
						children: ["Tipo", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							name: "tipo",
							value: search.tipo,
							onChange: (e) => void navigate({ search: {
								...search,
								tipo: e.target.value,
								page: 1
							} }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "Todo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "movie",
									children: "Películas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "tv",
									children: "Series"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "person",
									children: "Personas"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-xs text-muted",
						children: ["Año", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "year",
							defaultValue: search.year,
							inputMode: "numeric",
							placeholder: "p. ej. 2024"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "sm:col-span-2 lg:col-span-4",
						children: "Aplicar"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: debounced.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Escribí al menos 2 caracteres",
					description: "La búsqueda consulta TMDb con un breve retraso para evitar pedidos de más."
				}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					message: "No se pudo completar la búsqueda.",
					onRetry: () => void query.refetch()
				}) : query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaGrid, {
					items: [],
					mediaType: "mixed",
					loading: true
				}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Sin resultados",
					description: "Probá con otro término o quitá los filtros."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaGrid, {
					items,
					mediaType: search.tipo === "all" ? "mixed" : search.tipo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: search.page <= 1,
							onClick: () => void navigate({ search: {
								...search,
								page: search.page - 1
							} }),
							children: "Anterior"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm tabular-nums text-muted",
							children: [
								search.page,
								" / ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: search.page >= totalPages,
							onClick: () => void navigate({ search: {
								...search,
								page: search.page + 1
							} }),
							children: "Siguiente"
						})
					]
				})] })
			})
		]
	});
}
//#endregion
export { SearchPage as component };
