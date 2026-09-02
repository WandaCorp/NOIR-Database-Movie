import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { q as cn } from "./router-CZUuLSOP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/empty-state-h3wyNPTg.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, description, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-2 px-6 py-16 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted",
				children: description
			}) : null,
			action
		]
	});
}
//#endregion
export { EmptyState as t };
