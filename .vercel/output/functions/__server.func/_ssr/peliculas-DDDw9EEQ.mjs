import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { s as Route$9 } from "./router-CZUuLSOP.mjs";
import { t as CatalogView } from "./catalog-view-7_xvV6rb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/peliculas-DDDw9EEQ.js
var import_jsx_runtime = require_jsx_runtime();
function PeliculasPage() {
	const search = Route$9.useSearch();
	const navigate = Route$9.useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogView, {
		type: "movie",
		title: "Películas",
		description: "Explorá el catálogo de cine de TMDb. Los resultados se cargan de a poco para no saturar la API.",
		filters: search,
		onFilters: (next) => void navigate({ search: next })
	});
}
//#endregion
export { PeliculasPage as component };
