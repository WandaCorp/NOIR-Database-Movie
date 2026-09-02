import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as string, i as record, r as object } from "../_libs/zod.mjs";
import { n as tmdbFetch } from "./proxy.server-UAW_b2w2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/functions-B-ketTnc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var tmdbGet_createServerFn_handler = createServerRpc({
	id: "f96f1630547c1f33899dd2a29f5d45a879a8e906f1de1c12b9d1324b02410ead",
	name: "tmdbGet",
	filename: "src/lib/tmdb/functions.ts"
}, (opts) => tmdbGet.__executeServer(opts));
var tmdbGet = createServerFn({
	method: "GET",
	strict: { output: false }
}).validator(object({
	path: string().min(1).max(200),
	query: record(string(), string()).optional()
})).handler(tmdbGet_createServerFn_handler, async ({ data }) => {
	return tmdbFetch(data.path, data.query);
});
//#endregion
export { tmdbGet_createServerFn_handler };
