import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(value?: string | null, pattern = "d MMM yyyy"): string {
  if (!value) return "";
  try {
    return format(parseISO(value), pattern, { locale: es });
  } catch {
    return value;
  }
}

export function formatYear(value?: string | null): string {
  if (!value) return "";
  return value.slice(0, 4);
}

export function formatRuntime(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h <= 0) return `${m} min`;
  if (m <= 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function formatMoney(amount?: number | null): string {
  if (amount == null || amount <= 0) return "";
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value?: number | null): string {
  if (value == null) return "";
  return new Intl.NumberFormat("es-PY", { maximumFractionDigits: 0 }).format(value);
}

export function formatDecimal(value?: number | null, digits = 1): string {
  if (value == null || Number.isNaN(value)) return "";
  return new Intl.NumberFormat("es-PY", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function mediaTitle(item: {
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
}): string {
  return item.title || item.name || item.original_title || item.original_name || "Sin título";
}

export function mediaDate(item: { release_date?: string; first_air_date?: string }): string {
  return item.release_date || item.first_air_date || "";
}

export function joinList(values?: Array<string | undefined | null>): string {
  return (values ?? []).filter((v): v is string => Boolean(v && v.trim())).join(" · ");
}
