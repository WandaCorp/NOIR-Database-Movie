import { i as __toESM } from "../_runtime.mjs";
import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ChevronRight, f as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as MediaLink, B as mediaDate, G as useSettings, K as Button, M as backdropSrcSet, R as formatYear, T as getTrending, V as mediaTitle, k as tmdbGet, l as Route$14, q as cn, v as filterAdultItems } from "./router-CZUuLSOP.mjs";
import { t as ErrorState } from "./error-state-DjsklK-g.mjs";
import { n as PosterCard, r as RatingBadge, t as FavoriteButton } from "./poster-card-CFViesV3.mjs";
import { t as Skeleton } from "./skeleton-Bj7frTpe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BbbcWk7g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HeroSlider({ items }) {
	const slides = items.filter((i) => i.backdrop_path).slice(0, 8);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const startX = (0, import_react.useRef)(null);
	const count = slides.length;
	const go = (dir) => {
		if (!count) return;
		setIndex((i) => (i + dir + count) % count);
	};
	(0, import_react.useEffect)(() => {
		if (paused || count < 2) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const id = window.setInterval(() => go(1), 7e3);
		return () => window.clearInterval(id);
	}, [
		paused,
		count,
		index
	]);
	if (!slides.length) return null;
	const current = slides[index];
	const type = current.media_type === "tv" ? "tv" : "movie";
	const title = mediaTitle(current);
	const year = formatYear(mediaDate(current));
	const image = backdropSrcSet(current.backdrop_path);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate min-h-[70vw] overflow-hidden md:min-h-[28rem] lg:min-h-[34rem]",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		onPointerDown: (e) => {
			startX.current = e.clientX;
		},
		onPointerUp: (e) => {
			if (startX.current == null) return;
			const dx = e.clientX - startX.current;
			if (dx > 50) go(-1);
			if (dx < -50) go(1);
			startX.current = null;
		},
		"aria-roledescription": "carrusel",
		"aria-label": "Destacados",
		children: [
			image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image.src,
				srcSet: image.srcSet,
				sizes: "100vw",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex min-h-[70vw] max-w-6xl flex-col justify-end px-4 pb-10 md:min-h-[28rem] md:px-8 lg:min-h-[34rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-accent uppercase",
						children: "Destacados"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, {
							average: current.vote_average,
							count: current.vote_count
						}), year ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: year
						}) : null]
					}),
					current.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl line-clamp-3 text-sm text-muted md:text-base",
						children: current.overview
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLink, {
								mediaType: type,
								id: current.id,
								children: "Ver ficha"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, {
							item: {
								id: current.id,
								mediaType: type,
								title,
								posterPath: current.poster_path,
								year,
								voteAverage: current.vote_average,
								voteCount: current.vote_count
							},
							className: "bg-surface/70"
						})]
					})
				]
			}),
			count > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 bg-bg/40 md:inline-flex",
					onClick: () => go(-1),
					"aria-label": "Anterior",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 bg-bg/40 md:inline-flex",
					onClick: () => go(1),
					"aria-label": "Siguiente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5",
					children: slides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Ir a la diapositiva ${i + 1}`,
						"aria-current": i === index,
						className: cn("h-2 min-h-2 rounded-full transition-all", i === index ? "w-6 bg-accent" : "w-2 bg-fg/35"),
						onClick: () => setIndex(i)
					}, slide.id))
				})
			] }) : null
		]
	});
}
function SectionHeading({ title, href, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-end justify-between gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold tracking-tight md:text-xl",
				children: title
			}),
			action,
			href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: href,
				className: "inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-fg",
				children: ["Ver todo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
			}) : null
		]
	});
}
function PosterRow({ title, path, href, mediaType, enabled = true }) {
	const adult = useSettings((s) => s.adultEnabled);
	const density = useSettings((s) => s.density);
	const posterSize = useSettings((s) => s.posterSize);
	const query = useQuery({
		queryKey: [
			"row",
			path,
			adult
		],
		enabled,
		queryFn: () => {
			const q = {
				language: "es-ES",
				include_adult: adult ? "true" : "false"
			};
			if (path.startsWith("movie/")) q.region = "PY";
			return tmdbGet({ data: {
				path,
				query: q
			} });
		}
	});
	const items = filterAdultItems(query.data?.results, adult).slice(0, 16);
	const cardWidth = posterSize === "sm" ? "w-28" : posterSize === "lg" ? "w-40 md:w-44" : "w-32 md:w-36";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			title,
			href
		}), query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			message: "No se pudo cargar esta sección.",
			onRetry: () => void query.refetch()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("scrollbar-thin flex snap-x snap-mandatory overflow-x-auto pb-2", density === "compact" ? "gap-2" : "gap-3 md:gap-4"),
			children: query.isPending ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("aspect-[2/3] shrink-0 rounded-lg", cardWidth) }, i)) : items.map((item, i) => {
				const type = mediaType ?? (item.media_type === "tv" ? "tv" : item.media_type === "person" ? "person" : "movie");
				if (type === "person") return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("snap-start shrink-0", cardWidth),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
						item,
						mediaType: type,
						eager: i < 4
					})
				}, `${type}-${item.id}`);
			})
		})]
	});
}
function Home() {
	const initial = Route$14.useLoaderData();
	const adult = useSettings((s) => s.adultEnabled);
	const visible = useSettings((s) => s.isSectionVisible);
	const trending = useQuery({
		queryKey: ["trending-home", adult],
		queryFn: () => getTrending("week", adult),
		initialData: adult ? void 0 : initial
	});
	const heroItems = filterAdultItems(trending.data?.results, adult);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10 pb-10",
		children: [
			trending.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[70vw] rounded-none md:h-[28rem]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, { items: heroItems }),
			visible("trending") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Tendencias de la semana",
				path: "trending/all/week"
			}) : null,
			visible("popularMovies") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Películas populares",
				path: "movie/popular",
				href: "/peliculas",
				mediaType: "movie"
			}) : null,
			visible("popularTv") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Series populares",
				path: "tv/popular",
				href: "/series",
				mediaType: "tv"
			}) : null,
			visible("topMovies") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Películas mejor valoradas",
				path: "movie/top_rated",
				href: "/peliculas",
				mediaType: "movie"
			}) : null,
			visible("topTv") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Series mejor valoradas",
				path: "tv/top_rated",
				href: "/series",
				mediaType: "tv"
			}) : null,
			visible("upcoming") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Próximos estrenos",
				path: "movie/upcoming",
				href: "/peliculas",
				mediaType: "movie"
			}) : null,
			visible("onAir") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterRow, {
				title: "Series al aire",
				path: "tv/on_the_air",
				href: "/series",
				mediaType: "tv"
			}) : null
		]
	});
}
//#endregion
export { Home as component };
