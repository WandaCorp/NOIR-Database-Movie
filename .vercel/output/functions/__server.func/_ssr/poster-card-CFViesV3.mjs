import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { c as Heart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as MediaLink, B as mediaDate, G as useSettings, H as posterUrl, K as Button, P as formatDecimal, R as formatYear, V as mediaTitle, j as Tooltip, q as cn } from "./router-CZUuLSOP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/poster-card-CFViesV3.js
var import_jsx_runtime = require_jsx_runtime();
var useFavorites = create()(persist((set, get) => ({
	items: [],
	add: (item) => set((state) => {
		if (state.items.some((i) => i.id === item.id && i.mediaType === item.mediaType)) return state;
		return { items: [{
			...item,
			savedAt: Date.now()
		}, ...state.items] };
	}),
	remove: (id, mediaType) => set((state) => ({ items: state.items.filter((i) => !(i.id === id && i.mediaType === mediaType)) })),
	toggle: (item) => {
		const exists = get().has(item.id, item.mediaType);
		if (exists) get().remove(item.id, item.mediaType);
		else get().add(item);
		return !exists;
	},
	has: (id, mediaType) => get().items.some((i) => i.id === id && i.mediaType === mediaType),
	clear: () => set({ items: [] })
}), { name: "mhd-favorites" }));
function FavoriteButton({ item, className }) {
	const has = useFavorites((s) => s.has(item.id, item.mediaType));
	const toggle = useFavorites((s) => s.toggle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "ghost",
		size: "icon",
		className: cn("size-11", className),
		"aria-pressed": has,
		"aria-label": has ? "Quitar de favoritos" : "Agregar a favoritos",
		onClick: (e) => {
			e.preventDefault();
			e.stopPropagation();
			const added = toggle(item);
			toast.success(added ? "Guardado en favoritos" : "Eliminado de favoritos");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-5", has ? "fill-danger text-danger" : "text-fg") })
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { tone: {
		muted: "bg-surface-2 text-muted",
		accent: "bg-accent/15 text-accent",
		success: "bg-success/15 text-success",
		warning: "bg-warning/15 text-warning",
		danger: "bg-danger/15 text-danger"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({
			tone,
			className
		})),
		...props
	});
}
function classifyRating(voteAverage, voteCount) {
	const avg = voteAverage ?? 0;
	const count = voteCount ?? 0;
	if (count < 40) return {
		tier: "sparse",
		label: "Pocos votos",
		hint: "TMDb reporta menos de 40 votos; MHD+ no etiqueta el título."
	};
	if (avg >= 7.5 && count >= 80) return {
		tier: "great",
		label: "Destacada",
		hint: "Promedio TMDb ≥ 7.5 con 80 votos o más. Clasificación MHD+, no oficial."
	};
	if (avg >= 6.5) return {
		tier: "good",
		label: "Buena",
		hint: "Promedio TMDb ≥ 6.5. Clasificación MHD+, no oficial."
	};
	if (avg >= 5.5) return {
		tier: "regular",
		label: "Regular",
		hint: "Promedio TMDb entre 5.5 y 6.4. Clasificación MHD+, no oficial."
	};
	return {
		tier: "weak",
		label: "Débil",
		hint: "Promedio TMDb menor a 5.5. Clasificación MHD+, no oficial."
	};
}
var TONE = {
	great: "success",
	good: "accent",
	regular: "warning",
	weak: "danger",
	sparse: "muted"
};
function RatingBadge({ average, count, compact = false }) {
	const info = classifyRating(average, count);
	const label = compact ? formatDecimal(average ?? 0) : `${info.label} · ${formatDecimal(average ?? 0)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
		content: info.hint,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: TONE[info.tier],
			"aria-label": info.hint,
			children: label
		}) })
	});
}
function PosterCard({ item, mediaType, eager = false }) {
	const posterSize = useSettings((s) => s.posterSize);
	const quality = useSettings((s) => s.imageQuality);
	const title = mediaTitle(item);
	const year = formatYear(mediaDate(item));
	const poster = posterUrl(item.poster_path || item.profile_path, quality, posterSize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MediaLink, {
			mediaType,
			id: item.id,
			className: "block rounded-lg focus-visible:ring-2 focus-visible:ring-accent",
			ariaLabel: title,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[2/3] overflow-hidden rounded-lg bg-surface-2",
				children: [poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: "",
					loading: eager ? "eager" : "lazy",
					decoding: "async",
					className: "size-full object-cover transition-transform duration-250 group-hover:scale-[1.03]"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-center justify-center px-3 text-center text-xs text-subtle",
					children: "Sin imagen"
				}), mediaType !== "person" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-2 left-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, {
						average: item.vote_average,
						count: item.vote_count,
						compact: true
					})
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 pr-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 text-sm font-medium leading-snug",
					children: title
				}), year || item.known_for_department ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted",
					children: mediaType === "person" ? item.known_for_department : year
				}) : null]
			})]
		}), mediaType !== "person" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-1 right-1 z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, {
				item: {
					id: item.id,
					mediaType,
					title,
					posterPath: item.poster_path,
					year,
					voteAverage: item.vote_average,
					voteCount: item.vote_count
				},
				className: "size-10 min-h-10 bg-bg/50 hover:bg-bg/80"
			})
		}) : null]
	});
}
//#endregion
export { useFavorites as i, PosterCard as n, RatingBadge as r, FavoriteButton as t };
