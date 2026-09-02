import { k as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { S as getGenres, a as Route$4 } from "./_ssr/router-CZUuLSOP.mjs";
import { t as CatalogView } from "./_ssr/catalog-view-7_xvV6rb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-B8JV7xXY.js
var import_jsx_runtime = require_jsx_runtime();
function GenreDetailPage() {
	const { id } = Route$4.useParams();
	const search = Route$4.useSearch();
	const navigate = Route$4.useNavigate();
	const name = useQuery({
		queryKey: ["genres", search.tipo],
		queryFn: () => getGenres(search.tipo)
	}).data?.genres.find((g) => String(g.id) === id)?.name ?? "Género";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogView, {
		type: search.tipo,
		title: name,
		description: "Títulos de este género según TMDb. Podés cambiar el tipo cine/serie en la URL (?tipo=tv).",
		fixedGenre: id,
		filters: search,
		onFilters: (next) => void navigate({ search: {
			...search,
			...next
		} })
	});
}
//#endregion
export { GenreDetailPage as component };
