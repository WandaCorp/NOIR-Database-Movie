import { i as __toESM } from "../_runtime.mjs";
import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useQuery, t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { G as useSettings, K as Button, S as getGenres, u as Select, v as filterAdultItems, x as discoverMedia } from "./router-CZUuLSOP.mjs";
import { t as ErrorState } from "./error-state-DjsklK-g.mjs";
import { t as EmptyState } from "./empty-state-h3wyNPTg.mjs";
import { t as MediaGrid } from "./media-grid-C1wUflpk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-view-7_xvV6rb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useInView(enabled = true) {
	const ref = (0, import_react.useRef)(null);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { rootMargin: "600px 0px" });
		observer.observe(node);
		return () => observer.disconnect();
	}, [enabled]);
	return {
		ref,
		inView
	};
}
var YEAR_OPTIONS = Array.from({ length: 46 }, (_, i) => String(2026 - i));
function CatalogView({ type, title, description, fixedGenre, filters, onFilters }) {
	const adult = useSettings((s) => s.adultEnabled);
	const defaultSort = useSettings((s) => s.defaultSort);
	const genres = useQuery({
		queryKey: ["genres", type],
		queryFn: () => getGenres(type)
	});
	const paramsFor = (page) => {
		const sort = filters.sort === "primary_release_date.desc" && type === "tv" ? "first_air_date.desc" : filters.sort === "original_title.asc" && type === "tv" ? "name.asc" : filters.sort === "first_air_date.desc" && type === "movie" ? "primary_release_date.desc" : filters.sort === "name.asc" && type === "movie" ? "original_title.asc" : filters.sort;
		const query = {
			page: String(page),
			sort_by: sort || defaultSort,
			include_adult: adult ? "true" : "false"
		};
		if (sort.startsWith("vote_average")) query["vote_count.gte"] = "50";
		const genre = fixedGenre || filters.genre;
		if (genre) query.with_genres = genre;
		if (filters.year) {
			if (type === "movie") query.primary_release_year = filters.year;
			else query.first_air_date_year = filters.year;
		}
		return query;
	};
	const infinite = useInfiniteQuery({
		queryKey: [
			"discover",
			type,
			filters.sort,
			filters.year,
			filters.genre,
			fixedGenre,
			adult
		],
		enabled: filters.pageMode === "infinite",
		initialPageParam: 1,
		queryFn: ({ pageParam }) => discoverMedia(type, paramsFor(pageParam)),
		getNextPageParam: (last) => last.page < last.total_pages && last.page < 20 ? last.page + 1 : void 0
	});
	const paged = useQuery({
		queryKey: [
			"discover-page",
			type,
			filters,
			fixedGenre,
			adult
		],
		enabled: filters.pageMode === "pages",
		queryFn: () => discoverMedia(type, paramsFor(filters.page))
	});
	const items = (0, import_react.useMemo)(() => {
		const raw = filters.pageMode === "infinite" ? infinite.data?.pages.flatMap((p) => p.results) ?? [] : paged.data?.results ?? [];
		return filterAdultItems(raw, adult);
	}, [
		adult,
		filters.pageMode,
		infinite.data,
		paged.data
	]);
	const { ref, inView } = useInView(filters.pageMode === "infinite");
	(0, import_react.useEffect)(() => {
		if (inView && infinite.hasNextPage && !infinite.isFetchingNextPage) infinite.fetchNextPage();
	}, [inView, infinite]);
	const loading = filters.pageMode === "infinite" ? infinite.isPending : paged.isPending;
	const error = filters.pageMode === "infinite" ? infinite.isError : paged.isError;
	const refetch = filters.pageMode === "infinite" ? infinite.refetch : paged.refetch;
	const totalPages = filters.pageMode === "pages" ? Math.min(paged.data?.total_pages ?? 1, 20) : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight md:text-3xl",
					children: title
				}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: description
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-w-40 flex-col gap-1 text-xs text-muted",
						children: ["Ordenar", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.sort,
							onChange: (e) => onFilters({
								...filters,
								sort: e.target.value,
								page: 1
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "popularity.desc",
									children: "Popularidad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "vote_average.desc",
									children: "Valoración"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: type === "tv" ? "first_air_date.desc" : "primary_release_date.desc",
									children: "Fecha"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: type === "tv" ? "name.asc" : "original_title.asc",
									children: "Alfabético"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-w-32 flex-col gap-1 text-xs text-muted",
						children: ["Año", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.year,
							onChange: (e) => onFilters({
								...filters,
								year: e.target.value,
								page: 1
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Todos"
							}), YEAR_OPTIONS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: y,
								children: y
							}, y))]
						})]
					}),
					!fixedGenre ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-w-40 flex-col gap-1 text-xs text-muted",
						children: ["Género", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.genre,
							onChange: (e) => onFilters({
								...filters,
								genre: e.target.value,
								page: 1
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Todos"
							}), (genres.data?.genres ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: String(g.id),
								children: g.name
							}, g.id))]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-w-36 flex-col gap-1 text-xs text-muted",
						children: ["Navegación", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: filters.pageMode,
							onChange: (e) => onFilters({
								...filters,
								pageMode: e.target.value,
								page: 1
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "infinite",
								children: "Desplazamiento infinito"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pages",
								children: "Páginas"
							})]
						})]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: "No se pudo cargar el catálogo.",
				onRetry: () => void refetch()
			}) : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaGrid, {
				items: [],
				mediaType: type,
				loading: true
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Sin resultados",
				description: "Probá con otros filtros."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaGrid, {
				items,
				mediaType: type
			}), filters.pageMode === "infinite" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref,
				className: "h-16"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: filters.page <= 1,
						onClick: () => onFilters({
							...filters,
							page: Math.max(1, filters.page - 1)
						}),
						children: "Anterior"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm tabular-nums text-muted",
						children: [
							filters.page,
							" / ",
							totalPages
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: filters.page >= totalPages,
						onClick: () => onFilters({
							...filters,
							page: filters.page + 1
						}),
						children: "Siguiente"
					})
				]
			})] })
		]
	});
}
//#endregion
export { CatalogView as t };
