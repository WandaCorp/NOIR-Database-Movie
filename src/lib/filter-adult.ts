import type { MediaListItem } from "./tmdb/types";

export function filterAdultItems<T extends MediaListItem>(
  items: T[] | undefined,
  adultEnabled: boolean,
): T[] {
  if (!items) return [];
  if (adultEnabled) return items;
  return items.filter((item) => item.adult !== true);
}
