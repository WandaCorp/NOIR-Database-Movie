import { i as __toESM } from "../_runtime.mjs";
import { k as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as ChevronRight, f as ChevronLeft, t as X } from "../_libs/lucide-react.mjs";
import { K as Button, z as galleryUrl } from "./router-CZUuLSOP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lightbox-BZUE8WuB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Lightbox({ paths, index, onClose, onIndex }) {
	const path = paths[index];
	const src = galleryUrl(path, true);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") onIndex((index + 1) % paths.length);
			if (e.key === "ArrowLeft") onIndex((index - 1 + paths.length) % paths.length);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		index,
		onClose,
		onIndex,
		paths.length
	]);
	if (!src) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Galería",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4",
		onClick: onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute top-4 right-4",
				"aria-label": "Cerrar",
				onClick: onClose,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			}),
			paths.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute left-3",
				"aria-label": "Anterior",
				onClick: (e) => {
					e.stopPropagation();
					onIndex((index - 1 + paths.length) % paths.length);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute right-3",
				"aria-label": "Siguiente",
				onClick: (e) => {
					e.stopPropagation();
					onIndex((index + 1) % paths.length);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6" })
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "max-h-[90dvh] max-w-full object-contain",
				onClick: (e) => e.stopPropagation()
			})
		]
	});
}
//#endregion
export { Lightbox as t };
