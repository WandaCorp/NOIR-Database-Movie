export function genreSearch(tipo: "movie" | "tv") {
  return {
    tipo,
    sort: "popularity.desc" as const,
    year: "",
    genre: "",
    pageMode: "infinite" as const,
    page: 1,
  };
}
