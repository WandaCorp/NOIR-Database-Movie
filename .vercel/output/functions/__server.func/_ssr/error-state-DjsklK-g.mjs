import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { K as Button } from "./router-CZUuLSOP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/error-state-DjsklK-g.js
var import_jsx_runtime = require_jsx_runtime();
function ErrorState({ message = "No se pudo cargar el contenido.", onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 px-6 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md text-sm text-muted",
			children: message
		}), onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: onRetry,
			children: "Reintentar"
		}) : null]
	});
}
//#endregion
export { ErrorState as t };
