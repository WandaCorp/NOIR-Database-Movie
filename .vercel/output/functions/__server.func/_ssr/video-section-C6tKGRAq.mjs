import { i as __toESM } from "../_runtime.mjs";
import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as MediaLink, C as getMovieImages, E as getTvImages, F as formatMoney, G as useSettings, I as formatNumber, K as Button, P as formatDecimal, U as profileUrl, v as filterAdultItems, z as galleryUrl } from "./router-CZUuLSOP.mjs";
import { n as PosterCard } from "./poster-card-CFViesV3.mjs";
import { t as Skeleton } from "./skeleton-Bj7frTpe.mjs";
import { t as Lightbox } from "./lightbox-BZUE8WuB.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video-section-C6tKGRAq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreditsList({ cast, crew }) {
	const directors = (crew ?? []).filter((c) => c.job === "Director");
	const uniqueWriters = (crew ?? []).filter((c) => [
		"Writer",
		"Screenplay",
		"Story",
		"Characters"
	].includes(c.job ?? "")).filter((w, i, arr) => arr.findIndex((x) => x.id === w.id && x.job === w.job) === i);
	const topCast = (cast ?? []).slice(0, 16);
	if (!topCast.length && !directors.length && !uniqueWriters.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [directors.length || uniqueWriters.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Equipo"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-3 grid gap-3 sm:grid-cols-2",
			children: [directors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs text-muted",
				children: "Dirección"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 text-sm",
				children: directors.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i > 0 ? ", " : "", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLink, {
					mediaType: "person",
					id: d.id,
					className: "hover:text-accent",
					children: d.name
				})] }, `${d.id}-${d.job}`))
			})] }) : null, uniqueWriters.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs text-muted",
				children: "Guion"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 text-sm",
				children: uniqueWriters.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					i > 0 ? ", " : "",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLink, {
						mediaType: "person",
						id: d.id,
						className: "hover:text-accent",
						children: d.name
					}),
					d.job ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							" (",
							d.job,
							")"
						]
					}) : null
				] }, `${d.id}-${d.job}`))
			})] }) : null]
		})] }) : null, topCast.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Reparto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "scrollbar-thin mt-3 flex gap-3 overflow-x-auto pb-2",
			children: topCast.map((person) => {
				const img = profileUrl(person.profile_path);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "w-28 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MediaLink, {
						mediaType: "person",
						id: person.id,
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[2/3] overflow-hidden rounded-lg bg-surface-2",
								children: img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img,
									alt: "",
									loading: "lazy",
									className: "size-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-full place-items-center text-xs text-subtle",
									children: "Sin foto"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm font-medium",
								children: person.name
							}),
							person.character ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-2 text-xs text-muted",
								children: person.character
							}) : null
						]
					})
				}, person.credit_id ?? `${person.id}-${person.character}`);
			})
		})] }) : null]
	});
}
function ImageGallery({ id, type }) {
	const query = useQuery({
		queryKey: [
			"images",
			type,
			id
		],
		queryFn: () => type === "movie" ? getMovieImages(id) : getTvImages(id)
	});
	const [openIndex, setOpenIndex] = (0, import_react.useState)(null);
	const posters = (query.data?.posters ?? []).map((p) => p.file_path).slice(0, 12);
	const all = [...(query.data?.backdrops ?? []).map((p) => p.file_path).slice(0, 12), ...posters];
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2 md:grid-cols-4",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-video rounded-lg" }, i))
	});
	if (!all.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Imágenes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid grid-cols-2 gap-2 md:grid-cols-4",
			children: all.slice(0, 8).map((path, i) => {
				const src = galleryUrl(path);
				if (!src) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "overflow-hidden rounded-lg",
					onClick: () => setOpenIndex(i),
					"aria-label": `Abrir imagen ${i + 1}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						loading: "lazy",
						className: "aspect-video size-full object-cover"
					})
				}, path);
			})
		}),
		openIndex != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
			paths: all,
			index: openIndex,
			onClose: () => setOpenIndex(null),
			onIndex: setOpenIndex
		}) : null
	] });
}
function SimilarRow({ title, items, mediaType }) {
	const adult = useSettings((s) => s.adultEnabled);
	const list = filterAdultItems(items, adult).slice(0, 14);
	if (!list.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-lg font-semibold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrollbar-thin mt-3 flex gap-3 overflow-x-auto pb-2",
		children: list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-32 shrink-0 md:w-36",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
				item,
				mediaType
			})
		}, item.id))
	})] });
}
function ChartBlock({ title, description, data, unit }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!data.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": title,
		className: "rounded-xl bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-52",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "color-mix(in oklab, var(--color-fg) 8%, transparent)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false,
								width: 48
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "color-mix(in oklab, var(--color-fg) 6%, transparent)" },
								contentStyle: {
									background: "var(--color-surface-2)",
									border: "1px solid var(--color-border)",
									borderRadius: 8,
									color: "var(--color-fg)"
								},
								formatter: (value) => [unit === "usd" ? formatMoney(Number(value)) : `${formatNumber(Number(value))}${unit ? ` ${unit}` : ""}`, ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "value",
								fill: "var(--color-accent)",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-full rounded-md" })
			})
		]
	});
}
function StatsCharts({ voteAverage, voteCount, popularity, budget, revenue, seasons }) {
	const scoreData = [{
		name: "Promedio",
		value: Number((voteAverage ?? 0).toFixed(2))
	}, {
		name: "Escala 10",
		value: 10
	}];
	const volumeData = [{
		name: "Votos",
		value: voteCount ?? 0
	}, {
		name: "Popularidad",
		value: Math.round(popularity ?? 0)
	}].filter((d) => d.value > 0);
	const moneyData = [];
	if (budget && budget > 0) moneyData.push({
		name: "Presupuesto",
		value: budget
	});
	if (revenue && revenue > 0) moneyData.push({
		name: "Ingresos",
		value: revenue
	});
	const seasonData = seasons?.filter((s) => (s.vote_average ?? 0) > 0).map((s) => ({
		name: s.name.replace("Temporada ", "T"),
		value: Number((s.vote_average ?? 0).toFixed(2))
	})) ?? [];
	if (!(volumeData.length > 0 || moneyData.length > 0 || seasonData.length > 0 || (voteAverage ?? 0) > 0)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Estadísticas"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: "Solo datos publicados por TMDb. La etiqueta de calidad MHD+ es una regla local, no una valoración oficial."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [
				(voteAverage ?? 0) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
					title: "Puntuación media",
					description: `Promedio ${formatDecimal(voteAverage)} sobre 10, según TMDb.`,
					data: scoreData
				}) : null,
				volumeData.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
					title: "Volumen",
					description: "Cantidad de votos y popularidad relativa informadas por TMDb.",
					data: volumeData
				}) : null,
				moneyData.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
					title: "Presupuesto e ingresos",
					description: "Cifras en USD cuando TMDb las publica. Pueden estar incompletas.",
					data: moneyData,
					unit: "usd"
				}) : null,
				seasonData.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBlock, {
					title: "Promedio por temporada",
					description: "vote_average de cada temporada según TMDb.",
					data: seasonData
				}) : null
			]
		})]
	});
}
function pickVideos(videos) {
	const yt = (videos ?? []).filter((v) => v.site === "YouTube");
	const trailers = yt.filter((v) => v.type === "Trailer");
	const rest = yt.filter((v) => v.type !== "Trailer");
	const ordered = [
		...trailers.filter((v) => v.official),
		...trailers,
		...rest
	];
	const seen = /* @__PURE__ */ new Set();
	return ordered.filter((v) => {
		if (seen.has(v.key)) return false;
		seen.add(v.key);
		return true;
	});
}
function VideoSection({ videos }) {
	const list = pickVideos(videos).slice(0, 6);
	const [active, setActive] = (0, import_react.useState)(list[0]?.key ?? "");
	if (!list.length) return null;
	const current = list.find((v) => v.key === active) ?? list[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: "Videos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: "Reproductor de YouTube (dominio youtube-nocookie.com). El servicio externo puede usar cookies propias."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 overflow-hidden rounded-xl bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: current.name,
					src: `https://www.youtube-nocookie.com/embed/${current.key}`,
					className: "size-full",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
					allowFullScreen: true,
					loading: "lazy"
				})
			})
		}),
		list.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: list.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: video.key === current.key ? "default" : "outline",
				onClick: () => setActive(video.key),
				children: video.name
			}, video.id))
		}) : null
	] });
}
//#endregion
export { VideoSection as a, StatsCharts as i, ImageGallery as n, SimilarRow as r, CreditsList as t };
