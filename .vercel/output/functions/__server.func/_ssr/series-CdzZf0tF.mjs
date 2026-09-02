import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as Route$7 } from "./router-CZUuLSOP.mjs";
import { t as CatalogView } from "./catalog-view-7_xvV6rb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/series-CdzZf0tF.js
var import_jsx_runtime = require_jsx_runtime();
function SeriesPage() {
	const search = Route$7.useSearch();
	const navigate = Route$7.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogView, {
		type: "tv",
		title: "Series",
		description: "Series populares, en emisión y mejor valoradas, según The Movie Database.",
		filters: search,
		onFilters: (next) => void navigate({ search: next })
	});
}
//#endregion
export { SeriesPage as component };
