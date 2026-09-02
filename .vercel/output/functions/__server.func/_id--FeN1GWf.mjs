import { i as __toESM } from "./_runtime.mjs";
import { k as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as ExternalLink, p as ChevronDown } from "./_libs/lucide-react.mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { G as useSettings, H as posterUrl, K as Button, L as formatRuntime, M as backdropSrcSet, N as formatDate, P as formatDecimal, R as formatYear, V as mediaTitle, W as stillUrl, n as Route$1, q as cn, w as getSeason } from "./_ssr/router-CZUuLSOP.mjs";
import { t as ErrorState } from "./_ssr/error-state-DjsklK-g.mjs";
import { r as RatingBadge, t as FavoriteButton } from "./_ssr/poster-card-CFViesV3.mjs";
import { t as Skeleton } from "./_ssr/skeleton-Bj7frTpe.mjs";
import { t as genreSearch } from "./_ssr/genre-search-BvliK7C9.mjs";
import { a as VideoSection, i as StatsCharts, n as ImageGallery, r as SimilarRow, t as CreditsList } from "./_ssr/video-section-C6tKGRAq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id--FeN1GWf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SeasonPanel({ tvId, season, open, onToggle }) {
	const query = useQuery({
		queryKey: [
			"season",
			tvId,
			season.season_number
		],
		enabled: open,
		queryFn: () => getSeason(tvId, season.season_number)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left",
			"aria-expanded": open,
			onClick: onToggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-medium",
				children: season.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted",
				children: [season.episode_count ? `${season.episode_count} episodios` : null, season.air_date ? ` · ${formatDate(season.air_date, "yyyy")}` : null]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 transition-transform", open && "rotate-180") })]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border px-4 py-3",
			children: query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-md" }, i))
			}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				message: "No se pudieron cargar los episodios.",
				onRetry: () => void query.refetch()
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: (query.data?.episodes ?? []).map((ep) => {
					const still = stillUrl(ep.still_path);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-16 w-28 shrink-0 overflow-hidden rounded-md bg-surface-2",
							children: still ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: still,
								alt: "",
								loading: "lazy",
								className: "size-full object-cover"
							}) : null
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [
										ep.episode_number,
										". ",
										ep.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										formatDate(ep.air_date),
										ep.runtime ? ` · ${formatRuntime(ep.runtime)}` : null,
										ep.vote_average ? ` · ${formatDecimal(ep.vote_average)}` : null
									]
								}),
								ep.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-3 text-xs text-muted",
									children: ep.overview
								}) : null
							]
						})]
					}, ep.id);
				})
			})
		}) : null]
	});
}
function Seasons({ tvId, seasons }) {
	const list = (seasons ?? []).filter((s) => s.season_number >= 0);
	const [open, setOpen] = (0, import_react.useState)(list[0]?.season_number ?? null);
	if (!list.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-lg font-semibold",
		children: "Temporadas"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 space-y-2",
		children: list.map((season) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonPanel, {
			tvId,
			season,
			open: open === season.season_number,
			onToggle: () => setOpen((current) => current === season.season_number ? null : season.season_number)
		}, season.id))
	})] });
}
function SeriesDetailPage() {
	const show = Route$1.useLoaderData();
	const adultEnabled = useSettings((s) => s.adultEnabled);
	const title = mediaTitle(show);
	const year = formatYear(show.first_air_date);
	const poster = posterUrl(show.poster_path, "high", "lg");
	const backdrop = backdropSrcSet(show.backdrop_path);
	const runtime = show.episode_run_time?.[0];
	const languages = show.spoken_languages?.map((l) => l.name).filter(Boolean).join(", ");
	const countries = show.production_countries?.map((c) => c.name).join(", ");
	const companies = show.production_companies?.map((c) => c.name).join(", ");
	const creators = show.created_by?.map((c) => c.name).join(", ");
	if (show.adult && !adultEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold",
			children: "Título marcado para adultos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "TMDb identifica este contenido como para adultos. Activá la opción en Ajustes para ver la ficha."
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
							children: "Serie"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-3xl font-semibold tracking-tight md:text-4xl",
							children: title
						}),
						show.original_name && show.original_name !== title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: show.original_name
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, {
									average: show.vote_average,
									count: show.vote_count
								}),
								year ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: year
								}) : null,
								show.number_of_seasons ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted",
									children: [show.number_of_seasons, " temporadas"]
								}) : null,
								show.number_of_episodes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted",
									children: [show.number_of_episodes, " episodios"]
								}) : null
							]
						}),
						show.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-3xl text-sm leading-relaxed md:text-base",
							children: show.overview
						}) : null,
						show.genres?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: show.genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/generos/$id",
								params: { id: String(g.id) },
								search: genreSearch("tv"),
								className: "inline-flex min-h-9 items-center rounded-full bg-surface-2 px-3 text-xs",
								children: g.name
							}) }, g.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, {
								item: {
									id: show.id,
									mediaType: "tv",
									title,
									posterPath: show.poster_path,
									year,
									voteAverage: show.vote_average,
									voteCount: show.vote_count
								},
								className: "bg-surface"
							}), show.homepage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: show.homepage,
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
						label: "Primera emisión",
						value: formatDate(show.first_air_date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Última emisión",
						value: formatDate(show.last_air_date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Duración ep.",
						value: formatRuntime(runtime)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Estado",
						value: show.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
						label: "Creación",
						value: creators
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
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsCharts, {
				voteAverage: show.vote_average,
				voteCount: show.vote_count,
				popularity: show.popularity,
				seasons: show.seasons
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seasons, {
				tvId: String(show.id),
				seasons: show.seasons
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsList, {
				cast: show.credits?.cast,
				crew: show.credits?.crew
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoSection, { videos: show.videos?.results }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageGallery, {
				id: String(show.id),
				type: "tv"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimilarRow, {
				title: "Recomendaciones",
				items: show.recommendations?.results,
				mediaType: "tv"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimilarRow, {
				title: "Similares",
				items: show.similar?.results,
				mediaType: "tv"
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
export { SeriesDetailPage as component };
