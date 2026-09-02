import { i as __toESM } from "./_runtime.mjs";
import { k as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { I as formatNumber, K as Button, N as formatDate, U as profileUrl, r as Route$2, z as galleryUrl } from "./_ssr/router-CZUuLSOP.mjs";
import { n as PosterCard } from "./_ssr/poster-card-CFViesV3.mjs";
import { t as Lightbox } from "./_ssr/lightbox-BZUE8WuB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DC-wQOzV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function uniqMedia(items) {
	const map = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = `${item.media_type === "tv" ? "tv" : "movie"}-${item.id}`;
		if (!map.get(key)) map.set(key, item);
	}
	return [...map.values()].sort((a, b) => {
		const da = a.release_date || a.first_air_date || "";
		return (b.release_date || b.first_air_date || "").localeCompare(da);
	});
}
function PersonPage() {
	const person = Route$2.useLoaderData();
	const [tab, setTab] = (0, import_react.useState)("acting");
	const [openBio, setOpenBio] = (0, import_react.useState)(false);
	const [photo, setPhoto] = (0, import_react.useState)(null);
	const profile = profileUrl(person.profile_path, true);
	const photos = (person.images?.profiles ?? []).map((p) => p.file_path).slice(0, 16);
	const groups = (0, import_react.useMemo)(() => {
		const cast = uniqMedia(person.combined_credits?.cast ?? []);
		const crew = person.combined_credits?.crew ?? [];
		return {
			acting: cast,
			directing: uniqMedia(crew.filter((c) => c.department === "Directing")),
			writing: uniqMedia(crew.filter((c) => c.department === "Writing")),
			other: uniqMedia(crew.filter((c) => c.department !== "Directing" && c.department !== "Writing"))
		};
	}, [person]);
	const list = groups[tab];
	const bio = person.biography ?? "";
	const short = bio.length > 480 && !openBio ? `${bio.slice(0, 480)}…` : bio;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-44 shrink-0 overflow-hidden rounded-xl bg-surface-2 md:w-56",
					children: profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile,
						alt: person.name,
						className: "w-full"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[2/3]" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-accent uppercase",
						children: "Persona"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl font-semibold tracking-tight",
						children: person.name
					}),
					person.known_for_department ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: person.known_for_department
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm",
						children: [
							person.birthday ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Nacimiento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(person.birthday) })] }) : null,
							person.deathday ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Fallecimiento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(person.deathday) })] }) : null,
							person.place_of_birth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Lugar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: person.place_of_birth })] }) : null,
							person.popularity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: "Popularidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatNumber(Math.round(person.popularity)) })] }) : null
						]
					}),
					short ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 max-w-3xl text-sm leading-relaxed text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: short }), bio.length > 480 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-accent",
							onClick: () => setOpenBio((v) => !v),
							children: openBio ? "Ver menos" : "Leer más"
						}) : null]
					}) : null
				] })]
			}),
			photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Imágenes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2 overflow-x-auto pb-2",
						children: photos.map((path, i) => {
							const src = galleryUrl(path);
							if (!src) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-36 w-24 shrink-0 overflow-hidden rounded-lg",
								onClick: () => setPhoto(i),
								"aria-label": `Foto ${i + 1}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src,
									alt: "",
									loading: "lazy",
									className: "size-full object-cover"
								})
							}, path);
						})
					}),
					photo != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
						paths: photos,
						index: photo,
						onClose: () => setPhoto(null),
						onIndex: setPhoto
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Filmografía"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							[
								"acting",
								"Interpretación",
								groups.acting.length
							],
							[
								"directing",
								"Dirección",
								groups.directing.length
							],
							[
								"writing",
								"Guion",
								groups.writing.length
							],
							[
								"other",
								"Otros roles",
								groups.other.length
							]
						].map(([id, label, count]) => count ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: tab === id ? "default" : "outline",
							onClick: () => setTab(id),
							children: [
								label,
								" (",
								count,
								")"
							]
						}, id) : null)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6",
						children: list.map((item) => {
							const type = item.media_type === "tv" ? "tv" : "movie";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
								item,
								mediaType: type
							}, `${type}-${item.id}`);
						})
					})
				]
			})
		]
	});
}
//#endregion
export { PersonPage as component };
