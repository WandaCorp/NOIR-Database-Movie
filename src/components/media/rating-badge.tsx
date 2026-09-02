import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { classifyRating } from "@/lib/tmdb/rating";
import { formatDecimal } from "@/lib/format";

const TONE = {
  great: "success",
  good: "accent",
  regular: "warning",
  weak: "danger",
  sparse: "muted",
} as const;

export function RatingBadge({
  average,
  count,
  compact = false,
}: {
  average?: number | null;
  count?: number | null;
  compact?: boolean;
}) {
  const info = classifyRating(average, count);
  const label = compact
    ? formatDecimal(average ?? 0)
    : `${info.label} · ${formatDecimal(average ?? 0)}`;

  return (
    <Tooltip content={info.hint}>
      <span>
        <Badge tone={TONE[info.tier]} aria-label={info.hint}>
          {label}
        </Badge>
      </span>
    </Tooltip>
  );
}
