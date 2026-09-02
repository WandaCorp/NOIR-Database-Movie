import { k as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as ExternalLink } from "./_libs/lucide-react.mjs";
import { F as formatMoney, G as useSettings, H as posterUrl, I as formatNumber, K as Button, L as formatRuntime, M as backdropSrcSet, N as formatDate, R as formatYear, V as mediaTitle, i as Route$3 } from "./_ssr/router-CZUuLSOP.mjs";
import { r as RatingBadge, t as FavoriteButton } from "./_ssr/poster-card-CFViesV3.mjs";
import { t as genreSearch } from "./_ssr/genre-search-BvliK7C9.mjs";
import { a as VideoSection, i as StatsCharts, n as ImageGallery, r as SimilarRow, t as CreditsList } from "./_ssr/video-section-C6tKGRAq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BsQiUdTZ.js
var import_jsx_runtime = require_jsx_runtime();
function MoviePage() {
	const movie = Route$3.useLoaderData();
	const adultEnabled = useSettings((s) => s.adultEnabled);
	const title = mediaTitle(movie);
	const year = formatYear(movie.release_date);
	const poster = posterUrl(movie.poster_path, "high", "lg");
	const backdrop = backdropSrcSet(movie.backdrop_path);
	const languages = movie.spoken_languages?.map((l) => l.name).filter(Boolean).join(", ");
	const countries = movie.production_countries?.map((c) => c.name).join(", ");
	const companies = movie.production_companies?.map((c) => c.name).join(", ");
	if (movie.adult && !adultEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold",
			children: "Título marcado para adultos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "TMDb identifica este contenido como para adultos. Activá la opción en Ajustes para ver la ficha. MHD+ no afirma que el contenido sea ilegal."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative isolate",
		children: [
			backdrop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: backdrop.src,
				srcSet: backdrop.srcSet,
				sizes: "100vw",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-35"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-44 shrink-0 overflow-hidden rounded-xl bg-surface-2 md:w-56",
					children: poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: poster,
						alt: `Póster de ${title}`,
						className: "w-full"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[2/3]" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-accent uppercase",
							children: "Película"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-3xl font-semibold tracking-tight md:text-4xl",
							children: title
						}),
						movie.original_title && movie.original_title !== title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: movie.original_title
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, {
									average: movie.vote_average,
									count: movie.vote_count
								}),
								year ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: year
								}) : null,
								movie.runtime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: formatRuntime(movie.runtime)
								}) : null,
								movie.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: movie.status
								}) : null
							]
						}),
						movie.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm italic text-muted",
							children: movie.tagline
						}) : null,
						movie.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-3xl text-sm leading-relaxed md:text-base",
							children: movie.overview
						}) : null,
						movie.genres?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: movie.genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/generos/$id",
								params: { id: String(g.id) },
								search: genreSearch("movie"),
								className: "inline-flex min-h-9 items-center rounded-full bg-surface-2 px-3 text-xs",
								children: g.name
							}) }, g.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, {
								item: {
									id: movie.id,
									mediaType: "movie",
									title,
									posterPath: movie.poster_path,
									year,
									voteAverage: movie.vote_average,
									voteCount: movie.vote_count
								},
								className: "bg-surface"
							}), movie.homepage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: movie.homepage,
									target: "_blank",
									rel: "noreferrer",
									children: ["Sitio oficial", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })]
								})
							}) : null]
						})
					]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-12 px-4 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-4 text-sm md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Estreno",
						value: formatDate(movie.release_date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Votos",
						value: formatNumber(movie.vote_count)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Presupuesto",
						value: formatMoney(movie.budget)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Ingresos",
						value: formatMoney(movie.revenue)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Idiomas",
						value: languages
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Países",
						value: countries
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Compañías",
						value: companies
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Popularidad",
						value: formatNumber(Math.round(movie.popularity ?? 0))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCharts, {
				voteAverage: movie.vote_average,
				voteCount: movie.vote_count,
				popularity: movie.popularity,
				budget: movie.budget,
				revenue: movie.revenue
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsList, {
				cast: movie.credits?.cast,
				crew: movie.credits?.crew
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoSection, { videos: movie.videos?.results }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageGallery, {
				id: String(movie.id),
				type: "movie"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimilarRow, {
				title: "Recomendaciones",
				items: movie.recommendations?.results,
				mediaType: "movie"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimilarRow, {
				title: "Similares",
				items: movie.similar?.results,
				mediaType: "movie"
			})
		]
	})] });
}
function Info({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1",
		children: value
	})] });
}
//#endregion
export { MoviePage as component };
