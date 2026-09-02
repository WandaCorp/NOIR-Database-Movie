import { i as __toESM } from "../_runtime.mjs";
import { E as Slot, a as Overlay2, c as Title2, d as DialogContent, f as DialogDescription, g as DialogTrigger, h as DialogTitle, i as Description2, k as require_jsx_runtime, l as Dialog, m as DialogPortal, n as Cancel, o as Portal2, p as DialogOverlay, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useNavigate, y as useRouter, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2$1 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { n as parseISO, r as format, t as es } from "../_libs/date-fns.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as record, n as number, o as union, r as object, t as literal } from "../_libs/zod.mjs";
import { n as tmdbFetch, t as TmdbHttpError } from "./proxy.server-UAW_b2w2.mjs";
import { a as Search, c as Heart, i as Settings, n as Tv, o as LayoutGrid, r as TriangleAlert, s as House, t as X, u as Clapperboard } from "../_libs/lucide-react.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DGskRq9K.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,background-color,transform,box-shadow] duration-150 disabled:pointer-events-none disabled:opacity-40 outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg hover:bg-surface-2/80",
			ghost: "text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 min-h-11 px-4",
			sm: "h-9 min-h-9 px-3 text-xs",
			lg: "h-12 min-h-12 px-5",
			icon: "size-11 min-h-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/image-El83qfa1.js
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 250,
		children
	});
}
function Tooltip({ content, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root3, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset: 6,
		className: cn("z-50 max-w-xs rounded-md bg-surface-2 px-2.5 py-1.5 text-xs text-fg shadow-border", className),
		children: content
	}) })] });
}
function MediaLink({ mediaType, id, className, children, ariaLabel }) {
	const params = { id: String(id) };
	if (mediaType === "tv") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/serie/$id",
		params,
		className,
		"aria-label": ariaLabel,
		children
	});
	if (mediaType === "person") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/persona/$id",
		params,
		className,
		"aria-label": ariaLabel,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/pelicula/$id",
		params,
		className,
		"aria-label": ariaLabel,
		children
	});
}
function formatDate(value, pattern = "d MMM yyyy") {
	if (!value) return "";
	try {
		return format(parseISO(value), pattern, { locale: es });
	} catch {
		return value;
	}
}
function formatYear(value) {
	if (!value) return "";
	return value.slice(0, 4);
}
function formatRuntime(minutes) {
	if (!minutes || minutes <= 0) return "";
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	if (h <= 0) return `${m} min`;
	if (m <= 0) return `${h} h`;
	return `${h} h ${m} min`;
}
function formatMoney(amount) {
	if (amount == null || amount <= 0) return "";
	return new Intl.NumberFormat("es-PY", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(amount);
}
function formatNumber(value) {
	if (value == null) return "";
	return new Intl.NumberFormat("es-PY", { maximumFractionDigits: 0 }).format(value);
}
function formatDecimal(value, digits = 1) {
	if (value == null || Number.isNaN(value)) return "";
	return new Intl.NumberFormat("es-PY", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(value);
}
function mediaTitle(item) {
	return item.title || item.name || item.original_title || item.original_name || "Sin título";
}
function mediaDate(item) {
	return item.release_date || item.first_air_date || "";
}
var HOME_SECTION_IDS = [
	"trending",
	"popularMovies",
	"popularTv",
	"topMovies",
	"topTv",
	"upcoming",
	"onAir"
];
var useSettings = create()(persist((set, get) => ({
	adultEnabled: false,
	adultAcknowledged: false,
	posterSize: "md",
	density: "comfortable",
	imageQuality: "standard",
	defaultSort: "popularity.desc",
	hiddenSections: [],
	setAdult: (enabled) => set({
		adultEnabled: enabled,
		adultAcknowledged: enabled ? get().adultAcknowledged : false
	}),
	acknowledgeAdult: () => set({
		adultAcknowledged: true,
		adultEnabled: true
	}),
	setPosterSize: (posterSize) => set({ posterSize }),
	setDensity: (density) => set({ density }),
	setImageQuality: (imageQuality) => set({ imageQuality }),
	setDefaultSort: (defaultSort) => set({ defaultSort }),
	toggleSection: (id) => set((state) => ({ hiddenSections: state.hiddenSections.includes(id) ? state.hiddenSections.filter((s) => s !== id) : [...state.hiddenSections, id] })),
	isSectionVisible: (id) => !get().hiddenSections.includes(id)
}), { name: "mhd-settings" }));
var BASE = "https://image.tmdb.org/t/p";
var POSTER_SIZE = {
	saver: {
		sm: "w185",
		md: "w185",
		lg: "w342"
	},
	standard: {
		sm: "w185",
		md: "w342",
		lg: "w500"
	},
	high: {
		sm: "w342",
		md: "w500",
		lg: "w780"
	}
};
function tmdbImage(path, size) {
	if (!path) return void 0;
	return `${BASE}/${size}${path}`;
}
function posterUrl(path, quality = "standard", density = "md") {
	return tmdbImage(path, POSTER_SIZE[quality][density]);
}
function backdropSrcSet(path) {
	const w780 = tmdbImage(path, "w780");
	const w1280 = tmdbImage(path, "w1280");
	if (!w780 || !w1280) return void 0;
	return {
		src: w780,
		srcSet: `${w780} 780w, ${w1280} 1280w`
	};
}
function profileUrl(path, large = false) {
	return tmdbImage(path, large ? "w185" : "w185");
}
function stillUrl(path) {
	return tmdbImage(path, "w300");
}
function galleryUrl(path, large = false) {
	return tmdbImage(path, large ? "w780" : "w342");
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/api-BUa31Ak-.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var tmdbGet = createServerFn({
	method: "GET",
	strict: { output: false }
}).validator(object({
	path: string().min(1).max(200),
	query: record(string(), string()).optional()
})).handler(createSsrRpc("f96f1630547c1f33899dd2a29f5d45a879a8e906f1de1c12b9d1324b02410ead"));
function q(extra) {
	return {
		language: "es-ES",
		...extra
	};
}
async function getTrending(window = "week", adult = false) {
	return tmdbGet({ data: {
		path: `/trending/all/${window}`,
		query: q({ include_adult: adult ? "true" : "false" })
	} });
}
async function getMovieDetails(id, adult = false) {
	return tmdbGet({ data: {
		path: `/movie/${id}`,
		query: q({
			include_adult: adult ? "true" : "false",
			append_to_response: "credits,videos,recommendations,similar,release_dates"
		})
	} });
}
async function getTvDetails(id, adult = false) {
	return tmdbGet({ data: {
		path: `/tv/${id}`,
		query: q({
			include_adult: adult ? "true" : "false",
			append_to_response: "credits,videos,recommendations,similar,content_ratings"
		})
	} });
}
async function getPersonDetails(id) {
	return tmdbGet({ data: {
		path: `/person/${id}`,
		query: q({ append_to_response: "combined_credits,images" })
	} });
}
async function getSeason(tvId, seasonNumber) {
	return tmdbGet({ data: {
		path: `/tv/${tvId}/season/${seasonNumber}`,
		query: q()
	} });
}
async function getMovieImages(id) {
	return tmdbGet({ data: {
		path: `/movie/${id}/images`,
		query: { include_image_language: "es,en,null" }
	} });
}
async function getTvImages(id) {
	return tmdbGet({ data: {
		path: `/tv/${id}/images`,
		query: { include_image_language: "es,en,null" }
	} });
}
async function getGenres(type) {
	return tmdbGet({ data: {
		path: `/genre/${type}/list`,
		query: q()
	} });
}
async function discoverMedia(type, params) {
	return tmdbGet({ data: {
		path: `/discover/${type}`,
		query: q(params)
	} });
}
async function searchMulti(query, page = 1, adult = false) {
	return tmdbGet({ data: {
		path: "/search/multi",
		query: q({
			query,
			page: String(page),
			include_adult: adult ? "true" : "false"
		})
	} });
}
async function searchByType(type, query, page = 1, adult = false, extra) {
	return tmdbGet({ data: {
		path: `/search/${type}`,
		query: q({
			query,
			page: String(page),
			include_adult: adult ? "true" : "false",
			...extra
		})
	} });
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/not-found-BproynMV.js
function throwIfMissing(error) {
	const message = error instanceof Error ? error.message : "";
	if (message.includes("No encontrado") || message.includes("404")) throw notFound();
	throw error;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CZUuLSOP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold tracking-tight",
				children: "Algo salió mal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "Ocurrió un error inesperado. Podés recargar o volver al inicio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Volver al inicio"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function makeQueryClient() {
	return new QueryClient({ defaultOptions: { queries: {
		staleTime: 18e4,
		gcTime: 18e5,
		refetchOnWindowFocus: false,
		retry: (count, error) => {
			const status = error.status;
			if (status === 404 || status === 401) return false;
			return count < 2;
		}
	} } });
}
function AppProviders({ children }) {
	const [client] = (0, import_react.useState)(makeQueryClient);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-center",
			toastOptions: { className: "bg-surface text-fg border-border" }
		})] })
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-16 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: "MHD+"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Explorador de cine y series alimentado por The Movie Database. Este producto usa la API de TMDB, pero no está avalado ni certificado por TMDB."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-wrap gap-x-4 gap-y-2 text-sm",
				"aria-label": "Legal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacidad",
						className: "min-h-11 py-2 text-muted hover:text-fg",
						children: "Privacidad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terminos",
						className: "min-h-11 py-2 text-muted hover:text-fg",
						children: "Términos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cookies",
						className: "min-h-11 py-2 text-muted hover:text-fg",
						children: "Cookies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/aviso-legal",
						className: "min-h-11 py-2 text-muted hover:text-fg",
						children: "Aviso legal"
					})
				]
			})]
		})
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle", "outline-none focus-visible:ring-2 focus-visible:ring-accent/70", className),
		...props
	});
}
function useDebounce(value, delay = 320) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const id = window.setTimeout(() => setDebounced(value), delay);
		return () => window.clearTimeout(id);
	}, [value, delay]);
	return debounced;
}
function filterAdultItems(items, adultEnabled) {
	if (!items) return [];
	if (adultEnabled) return items;
	return items.filter((item) => item.adult !== true);
}
function itemType(item) {
	if (item.media_type === "tv") return "tv";
	if (item.media_type === "person") return "person";
	return "movie";
}
var emptySearch = {
	tipo: "all",
	year: "",
	page: 1
};
function SearchBox({ className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const debounced = useDebounce(q.trim(), 320);
	const adult = useSettings((s) => s.adultEnabled);
	const navigate = useNavigate();
	const listId = (0, import_react.useId)();
	const rootRef = (0, import_react.useRef)(null);
	const query = useQuery({
		queryKey: [
			"search-preview",
			debounced,
			adult
		],
		enabled: debounced.length >= 2,
		queryFn: () => searchMulti(debounced, 1, adult)
	});
	const results = filterAdultItems(query.data?.results, adult).slice(0, 8);
	(0, import_react.useEffect)(() => {
		function onDoc(e) {
			if (!rootRef.current?.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: cn("relative w-full max-w-md", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "mhd-search",
				children: "Buscar películas, series o personas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "mhd-search",
				role: "combobox",
				"aria-expanded": open && results.length > 0,
				"aria-controls": listId,
				autoComplete: "off",
				placeholder: "Buscar títulos o personas",
				value: q,
				onChange: (e) => {
					setQ(e.target.value);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				onKeyDown: (e) => {
					if (e.key === "Enter" && q.trim()) {
						setOpen(false);
						navigate({
							to: "/buscar",
							search: {
								...emptySearch,
								q: q.trim()
							}
						});
					}
					if (e.key === "Escape") setOpen(false);
				},
				className: "pl-9 pr-10"
			}),
			q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Limpiar búsqueda",
				className: "absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted hover:text-fg",
				onClick: () => setQ(""),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}) : null,
			open && debounced.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				id: listId,
				role: "listbox",
				className: "absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-lg bg-surface p-1 shadow-border",
				children: [query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-3 text-sm text-muted",
					children: "Buscando…"
				}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-3 text-sm text-muted",
					children: "Sin resultados"
				}) : results.map((item) => {
					const title = mediaTitle(item);
					const img = posterUrl(item.poster_path || item.profile_path, "saver", "sm");
					const type = itemType(item);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						role: "option",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLink, {
							mediaType: type,
							id: item.id,
							className: "flex min-h-12 items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-2",
							ariaLabel: title,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "contents",
								onClick: () => setOpen(false),
								children: [img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img,
									alt: "",
									className: "h-12 w-8 rounded-sm object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-12 w-8 rounded-sm bg-surface-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm",
										children: title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: type === "person" ? "Persona" : type === "tv" ? `Serie · ${formatYear(mediaDate(item))}` : `Película · ${formatYear(mediaDate(item))}`
									})]
								})]
							})
						})
					}, `${item.media_type}-${item.id}`);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "block w-full rounded-md px-3 py-2 text-left text-sm text-accent hover:bg-surface-2",
					onClick: () => {
						setOpen(false);
						navigate({
							to: "/buscar",
							search: {
								...emptySearch,
								q: debounced
							}
						});
					},
					children: "Ver todos los resultados"
				}) })]
			}) : null
		]
	});
}
var AlertDialog = Root2;
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Portal2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, { className: "fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-1.5rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-6 shadow-border", className),
		...props
	})] });
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("text-lg font-semibold tracking-tight", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("mt-2 text-sm text-muted", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 min-h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg", "outline-none focus-visible:ring-2 focus-visible:ring-accent/70", className),
		...props
	});
}
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: cn("border-0 bg-border h-px w-full", className) });
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(100%,24rem)] flex-col bg-surface p-5 shadow-border", side === "right" ? "top-0 right-0" : "top-0 left-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute top-3 right-3 size-9 min-h-9",
				"aria-label": "Cerrar panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("pr-10 text-lg font-semibold", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("mt-1 text-sm text-muted", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border bg-surface-2 transition-colors", "data-[state=checked]:bg-accent data-[state=checked]:border-accent", "focus-visible:ring-2 focus-visible:ring-accent/70 disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "block size-5 translate-x-0.5 rounded-full bg-fg transition-transform data-[state=checked]:translate-x-[1.35rem] data-[state=checked]:bg-accent-fg" })
	});
}
var SECTION_LABEL = {
	trending: "Tendencias",
	popularMovies: "Películas populares",
	popularTv: "Series populares",
	topMovies: "Películas mejor valoradas",
	topTv: "Series mejor valoradas",
	upcoming: "Próximos estrenos",
	onAir: "Series al aire"
};
function SettingsPanel() {
	const settings = useSettings();
	const [confirmAdult, setConfirmAdult] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": "Ajustes de visualización",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Ajustes" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Preferencias locales de este dispositivo. No se envían a un servidor." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex-1 space-y-6 overflow-y-auto pr-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Contenido para adultos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: "Desactivado por defecto. MHD+ usa únicamente la marca `adult` de TMDb; no afirma legalidad ni adecuación."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Mostrar títulos para adultos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.adultEnabled,
							onCheckedChange: (next) => {
								if (next) setConfirmAdult(true);
								else settings.setAdult(false);
							},
							"aria-label": "Mostrar contenido para adultos"
						})]
					}),
					settings.adultEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-warning",
						children: "Contenido para adultos habilitado."
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Presentación"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm",
							children: ["Tamaño de pósters", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.posterSize,
								onChange: (e) => settings.setPosterSize(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "sm",
										children: "Compacto"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "md",
										children: "Estándar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "lg",
										children: "Grande"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm",
							children: ["Densidad", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.density,
								onChange: (e) => settings.setDensity(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "comfortable",
									children: "Cómoda"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "compact",
									children: "Densa"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm",
							children: ["Calidad de imagen", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.imageQuality,
								onChange: (e) => settings.setImageQuality(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "saver",
										children: "Ahorro de datos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "standard",
										children: "Estándar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "high",
										children: "Alta"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm",
							children: ["Orden por defecto", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.defaultSort,
								onChange: (e) => settings.setDefaultSort(e.target.value),
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
										value: "primary_release_date.desc",
										children: "Fecha"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "original_title.asc",
										children: "Alfabético"
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Secciones del inicio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: HOME_SECTION_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: SECTION_LABEL[id]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: !settings.hiddenSections.includes(id),
							onCheckedChange: () => settings.toggleSection(id),
							"aria-label": `Mostrar ${SECTION_LABEL[id]}`
						})]
					}, id))
				})] })
			]
		})
	] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: confirmAdult,
		onOpenChange: setConfirmAdult,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "¿Mostrar contenido para adultos?" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "TMDb marca algunos títulos como contenido para adultos. Al activar esta opción MHD+ incluirá esos resultados. No implica un juicio legal ni de adecuación. El estado se guarda solo en este navegador." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => {
					settings.acknowledgeAdult();
					setConfirmAdult(false);
				},
				children: "Confirmar"
			})] })
		] })
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Inicio"
	},
	{
		to: "/peliculas",
		label: "Películas"
	},
	{
		to: "/series",
		label: "Series"
	},
	{
		to: "/generos",
		label: "Géneros"
	},
	{
		to: "/favoritos",
		label: "Favoritos"
	}
];
function Header() {
	const adult = useSettings((s) => s.adultEnabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-h-11 items-center gap-2 pr-2",
					"aria-label": "MHD+ inicio",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "size-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-semibold tracking-tight",
						children: "MHD+"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					"aria-label": "Principal",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted hover:text-fg"),
						activeProps: { className: "text-fg font-medium" },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-auto hidden flex-1 justify-end md:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
				}),
				adult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden rounded-full bg-warning/15 px-2 py-1 text-[11px] font-medium text-warning sm:inline",
					children: "Adultos"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 pb-3 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
		})]
	});
}
var ITEMS = [
	{
		to: "/",
		label: "Inicio",
		icon: House
	},
	{
		to: "/peliculas",
		label: "Cine",
		icon: Clapperboard
	},
	{
		to: "/series",
		label: "Series",
		icon: Tv
	},
	{
		to: "/generos",
		label: "Géneros",
		icon: LayoutGrid
	},
	{
		to: "/favoritos",
		label: "Favoritos",
		icon: Heart
	}
];
function MobileNav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] lg:hidden",
		"aria-label": "Navegación inferior",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-5",
			children: ITEMS.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] text-muted"),
					activeProps: { className: "text-accent" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
				}) }, item.to);
			})
		})
	});
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#contenido",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2",
				children: "Saltar al contenido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "contenido",
				className: "flex-1 pb-20 lg:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {})
		]
	});
}
var styles_default = "/assets/styles-DrLISxq6.css";
var APP_NAME = "MHD+";
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-2xl font-semibold",
				children: "Página no encontrada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "El enlace no existe o el título ya no está disponible en TMDb."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-6 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "Ir al inicio"
			})
		]
	});
}
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${APP_NAME} · Cine y series` },
			{
				name: "description",
				content: "MHD+ es un explorador de películas y series con datos de The Movie Database (TMDb)."
			},
			{
				name: "theme-color",
				content: "#070708"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
	errorComponent: AppErrorComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$13 = () => import("./routes-BbbcWk7g.mjs");
var Route$14 = createFileRoute("/")({
	loader: () => getTrending("week", false),
	head: () => ({ meta: [{ title: "MHD+ · Cine y series" }, {
		name: "description",
		content: "Descubrí películas y series populares, mejor valoradas y próximos estrenos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./aviso-legal-B1RFutI-.mjs");
var Route$13 = createFileRoute("/aviso-legal")({
	head: () => ({ meta: [{ title: "Aviso legal · MHD+" }, {
		name: "description",
		content: "Aviso legal de MHD+."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./buscar-C6JI3F-D.mjs");
var Route$12 = createFileRoute("/buscar")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : "",
		tipo: s.tipo === "movie" || s.tipo === "tv" || s.tipo === "person" ? s.tipo : "all",
		year: typeof s.year === "string" ? s.year : "",
		page: Number(s.page) > 0 ? Number(s.page) : 1
	}),
	head: ({ match }) => {
		const q = match.search.q;
		return { meta: [{ title: q ? `Buscar “${q}” · MHD+` : "Buscar · MHD+" }, {
			name: "description",
			content: "Buscá películas, series y personas en TMDb."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./cookies-v5r3tZbG.mjs");
var Route$11 = createFileRoute("/cookies")({
	head: () => ({ meta: [{ title: "Cookies · MHD+" }, {
		name: "description",
		content: "Información sobre cookies y tecnologías similares en MHD+."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./favoritos-C8hCZ29g.mjs");
var Route$10 = createFileRoute("/favoritos")({
	head: () => ({ meta: [{ title: "Favoritos · MHD+" }, {
		name: "description",
		content: "Lista de favoritos guardada en este navegador."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./peliculas-DDDw9EEQ.mjs");
var Route$9 = createFileRoute("/peliculas")({
	validateSearch: (s) => ({
		sort: typeof s.sort === "string" ? s.sort : "popularity.desc",
		year: typeof s.year === "string" ? s.year : "",
		genre: typeof s.genre === "string" ? s.genre : "",
		pageMode: s.pageMode === "pages" ? "pages" : "infinite",
		page: Number(s.page) > 0 ? Number(s.page) : 1
	}),
	head: () => ({ meta: [{ title: "Películas · MHD+" }, {
		name: "description",
		content: "Catálogo de películas de TMDb, con filtros y ordenamiento."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./privacidad-YAauaX7E.mjs");
var Route$8 = createFileRoute("/privacidad")({
	head: () => ({ meta: [{ title: "Privacidad · MHD+" }, {
		name: "description",
		content: "Política de privacidad de MHD+."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./series-CdzZf0tF.mjs");
var Route$7 = createFileRoute("/series")({
	validateSearch: (s) => ({
		sort: typeof s.sort === "string" ? s.sort : "popularity.desc",
		year: typeof s.year === "string" ? s.year : "",
		genre: typeof s.genre === "string" ? s.genre : "",
		pageMode: s.pageMode === "pages" ? "pages" : "infinite",
		page: Number(s.page) > 0 ? Number(s.page) : 1
	}),
	head: () => ({ meta: [{ title: "Series · MHD+" }, {
		name: "description",
		content: "Catálogo de series de TMDb, con filtros y ordenamiento."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./terminos-DRlpmea3.mjs");
var Route$6 = createFileRoute("/terminos")({
	head: () => ({ meta: [{ title: "Términos · MHD+" }, {
		name: "description",
		content: "Términos de uso de MHD+."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./generos-bXmxK7AX.mjs");
var Route$5 = createFileRoute("/generos/")({
	head: () => ({ meta: [{ title: "Géneros · MHD+" }, {
		name: "description",
		content: "Explorá películas y series por género, según TMDb."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_id-B8JV7xXY.mjs");
var Route$4 = createFileRoute("/generos/$id")({
	validateSearch: (s) => ({
		tipo: s.tipo === "tv" ? "tv" : "movie",
		sort: typeof s.sort === "string" ? s.sort : "popularity.desc",
		year: typeof s.year === "string" ? s.year : "",
		genre: "",
		pageMode: s.pageMode === "pages" ? "pages" : "infinite",
		page: Number(s.page) > 0 ? Number(s.page) : 1
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_id-BsQiUdTZ.mjs");
var Route$3 = createFileRoute("/pelicula/$id")({
	loader: async ({ params }) => {
		try {
			return await getMovieDetails(params.id);
		} catch (error) {
			throwIfMissing(error);
		}
	},
	head: ({ loaderData }) => {
		const title = loaderData ? mediaTitle(loaderData) : "Película";
		const overview = loaderData?.overview?.slice(0, 160) ?? "Ficha de película en MHD+.";
		return { meta: [{ title: `${title} · MHD+` }, {
			name: "description",
			content: overview
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_id-DC-wQOzV.mjs");
var Route$2 = createFileRoute("/persona/$id")({
	loader: async ({ params }) => {
		try {
			return await getPersonDetails(params.id);
		} catch (error) {
			throwIfMissing(error);
		}
	},
	head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Persona"} · MHD+` }, {
		name: "description",
		content: loaderData?.biography?.slice(0, 160) || `Perfil de ${loaderData?.name ?? "una persona"} en MHD+.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_id--FeN1GWf.mjs");
var Route$1 = createFileRoute("/serie/$id")({
	loader: async ({ params }) => {
		try {
			return await getTvDetails(params.id);
		} catch (error) {
			throwIfMissing(error);
		}
	},
	head: ({ loaderData }) => {
		const title = loaderData ? mediaTitle(loaderData) : "Serie";
		const overview = loaderData?.overview?.slice(0, 160) ?? "Ficha de serie en MHD+.";
		return { meta: [{ title: `${title} · MHD+` }, {
			name: "description",
			content: overview
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/tmdb/$")({ server: { handlers: { GET: async ({ params, request }) => {
	const url = new URL(request.url);
	const query = {};
	url.searchParams.forEach((value, key) => {
		if (key === "api_key") return;
		query[key] = value;
	});
	try {
		const data = await tmdbFetch(params._splat ?? "", query);
		return Response.json(data, { headers: { "Cache-Control": "public, max-age=120" } });
	} catch (error) {
		const status = error instanceof TmdbHttpError ? error.status : 400;
		const message = error instanceof Error ? error.message : "Error al consultar TMDb";
		return Response.json({ error: message }, { status: status === 429 ? 429 : status });
	}
} } } });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AvisoLegalRoute = Route$13.update({
	id: "/aviso-legal",
	path: "/aviso-legal",
	getParentRoute: () => Route$15
});
var BuscarRoute = Route$12.update({
	id: "/buscar",
	path: "/buscar",
	getParentRoute: () => Route$15
});
var CookiesRoute = Route$11.update({
	id: "/cookies",
	path: "/cookies",
	getParentRoute: () => Route$15
});
var FavoritosRoute = Route$10.update({
	id: "/favoritos",
	path: "/favoritos",
	getParentRoute: () => Route$15
});
var PeliculasRoute = Route$9.update({
	id: "/peliculas",
	path: "/peliculas",
	getParentRoute: () => Route$15
});
var PrivacidadRoute = Route$8.update({
	id: "/privacidad",
	path: "/privacidad",
	getParentRoute: () => Route$15
});
var SeriesRoute = Route$7.update({
	id: "/series",
	path: "/series",
	getParentRoute: () => Route$15
});
var TerminosRoute = Route$6.update({
	id: "/terminos",
	path: "/terminos",
	getParentRoute: () => Route$15
});
var GenerosIndexRoute = Route$5.update({
	id: "/generos/",
	path: "/generos/",
	getParentRoute: () => Route$15
});
var rootRouteChildren = {
	IndexRoute,
	AvisoLegalRoute,
	BuscarRoute,
	CookiesRoute,
	FavoritosRoute,
	PeliculasRoute,
	PrivacidadRoute,
	SeriesRoute,
	TerminosRoute,
	GenerosIdRoute: Route$4.update({
		id: "/generos/$id",
		path: "/generos/$id",
		getParentRoute: () => Route$15
	}),
	PeliculaIdRoute: Route$3.update({
		id: "/pelicula/$id",
		path: "/pelicula/$id",
		getParentRoute: () => Route$15
	}),
	PersonaIdRoute: Route$2.update({
		id: "/persona/$id",
		path: "/persona/$id",
		getParentRoute: () => Route$15
	}),
	SerieIdRoute: Route$1.update({
		id: "/serie/$id",
		path: "/serie/$id",
		getParentRoute: () => Route$15
	}),
	GenerosIndexRoute,
	ApiTmdbSplatRoute: Route.update({
		id: "/api/tmdb/$",
		path: "/api/tmdb/$",
		getParentRoute: () => Route$15
	})
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true,
		defaultPreload: "intent"
	});
}
//#endregion
export { MediaLink as A, mediaDate as B, getMovieImages as C, searchByType as D, getTvImages as E, formatMoney as F, useSettings as G, posterUrl as H, formatNumber as I, Button as K, formatRuntime as L, backdropSrcSet as M, formatDate as N, searchMulti as O, formatDecimal as P, formatYear as R, getGenres as S, getTrending as T, profileUrl as U, mediaTitle as V, stillUrl as W, AlertDialogTitle as _, Route$4 as a, Input as b, Route$12 as c, AlertDialog as d, AlertDialogAction as f, AlertDialogFooter as g, AlertDialogDescription as h, Route$3 as i, Tooltip as j, tmdbGet as k, Route$14 as l, AlertDialogContent as m, Route$1 as n, Route$7 as o, AlertDialogCancel as p, cn as q, Route$2 as r, Route$9 as s, router_exports as t, Select as u, filterAdultItems as v, getSeason as w, discoverMedia as x, useDebounce as y, galleryUrl as z };
