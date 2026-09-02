import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { tmdbFetch } from "./proxy.server";

export const tmdbGet = createServerFn({ method: "GET", strict: { output: false } })
  .validator(
    z.object({
      path: z.string().min(1).max(200),
      query: z.record(z.string(), z.string()).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return tmdbFetch(data.path, data.query);
  });
