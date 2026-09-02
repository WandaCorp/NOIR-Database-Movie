/**
 * Clasificación visual MHD+ — NO es una valoración oficial de TMDb.
 *
 * Se calcula solo con vote_average y vote_count publicados por TMDb:
 *  - Destacada: promedio ≥ 7.5 y al menos 80 votos
 *  - Buena:     promedio ≥ 6.5 y al menos 40 votos
 *  - Regular:   promedio ≥ 5.5 y al menos 40 votos
 *  - Débil:     promedio < 5.5 y al menos 40 votos
 *  - Pocos votos: menos de 40 valoraciones (insuficiente para etiquetar)
 */
export type RatingTier = "great" | "good" | "regular" | "weak" | "sparse";

export type RatingInfo = {
  tier: RatingTier;
  label: string;
  hint: string;
};

export function classifyRating(
  voteAverage?: number | null,
  voteCount?: number | null,
): RatingInfo {
  const avg = voteAverage ?? 0;
  const count = voteCount ?? 0;

  if (count < 40) {
    return {
      tier: "sparse",
      label: "Pocos votos",
      hint: "TMDb reporta menos de 40 votos; MHD+ no etiqueta el título.",
    };
  }
  if (avg >= 7.5 && count >= 80) {
    return {
      tier: "great",
      label: "Destacada",
      hint: "Promedio TMDb ≥ 7.5 con 80 votos o más. Clasificación MHD+, no oficial.",
    };
  }
  if (avg >= 6.5) {
    return {
      tier: "good",
      label: "Buena",
      hint: "Promedio TMDb ≥ 6.5. Clasificación MHD+, no oficial.",
    };
  }
  if (avg >= 5.5) {
    return {
      tier: "regular",
      label: "Regular",
      hint: "Promedio TMDb entre 5.5 y 6.4. Clasificación MHD+, no oficial.",
    };
  }
  return {
    tier: "weak",
    label: "Débil",
    hint: "Promedio TMDb menor a 5.5. Clasificación MHD+, no oficial.",
  };
}
