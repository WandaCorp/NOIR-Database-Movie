import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { G as useSettings, q as cn } from "./router-CZUuLSOP.mjs";
import { n as PosterCard } from "./poster-card-CFViesV3.mjs";
import { t as Skeleton } from "./skeleton-Bj7frTpe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-grid-C1wUflpk.js
var import_jsx_runtime = require_jsx_runtime();
function MediaGrid({ items, mediaType, loading }) {
	const posterSize = useSettings((s) => s.posterSize);
	const density = useSettings((s) => s.density);
	const cols = posterSize === "sm" ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8" : posterSize === "lg" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6";
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid", cols, density === "compact" ? "gap-2" : "gap-4"),
		children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[2/3] rounded-lg" }, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid", cols, density === "compact" ? "gap-2" : "gap-4"),
		children: items.map((item, i) => {
			const type = mediaType === "mixed" ? item.media_type === "tv" ? "tv" : item.media_type === "person" ? "person" : "movie" : mediaType;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
				item,
				mediaType: type,
				eager: i < 6
			}, `${type}-${item.id}-${i}`);
		})
	});
}
//#endregion
export { MediaGrid as t };
