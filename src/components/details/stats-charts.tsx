import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDecimal, formatMoney, formatNumber } from "@/lib/format";

type ChartRow = { name: string; value: number };

function ChartBlock({
  title,
  description,
  data,
  unit,
}: {
  title: string;
  description: string;
  data: ChartRow[];
  unit?: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!data.length) return null;

  return (
    <section aria-label={title} className="rounded-xl bg-surface p-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs text-muted">{description}</p>
      <div className="mt-3 h-52">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="color-mix(in oklab, var(--color-fg) 8%, transparent)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <RechartsTooltip
                cursor={{ fill: "color-mix(in oklab, var(--color-fg) 6%, transparent)" }}
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  color: "var(--color-fg)",
                }}
                formatter={(value) => [
                  unit === "usd"
                    ? formatMoney(Number(value))
                    : `${formatNumber(Number(value))}${unit ? ` ${unit}` : ""}`,
                  "",
                ]}
              />
              <Bar dataKey="value" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="skeleton h-full rounded-md" />
        )}
      </div>
    </section>
  );
}

export function StatsCharts({
  voteAverage,
  voteCount,
  popularity,
  budget,
  revenue,
  seasons,
}: {
  voteAverage?: number | null;
  voteCount?: number | null;
  popularity?: number | null;
  budget?: number | null;
  revenue?: number | null;
  seasons?: Array<{ name: string; vote_average?: number }>;
}) {
  const scoreData: ChartRow[] = [
    { name: "Promedio", value: Number((voteAverage ?? 0).toFixed(2)) },
    { name: "Escala 10", value: 10 },
  ];
  const volumeData: ChartRow[] = [
    { name: "Votos", value: voteCount ?? 0 },
    { name: "Popularidad", value: Math.round(popularity ?? 0) },
  ].filter((d) => d.value > 0);

  const moneyData: ChartRow[] = [];
  if (budget && budget > 0) moneyData.push({ name: "Presupuesto", value: budget });
  if (revenue && revenue > 0) moneyData.push({ name: "Ingresos", value: revenue });

  const seasonData =
    seasons
      ?.filter((s) => (s.vote_average ?? 0) > 0)
      .map((s) => ({ name: s.name.replace("Temporada ", "T"), value: Number((s.vote_average ?? 0).toFixed(2)) })) ??
    [];

  const hasAny = volumeData.length > 0 || moneyData.length > 0 || seasonData.length > 0 || (voteAverage ?? 0) > 0;
  if (!hasAny) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Estadísticas</h2>
        <p className="mt-1 text-xs text-muted">
          Solo datos publicados por TMDb. La etiqueta de calidad MHD+ es una regla local, no una
          valoración oficial.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(voteAverage ?? 0) > 0 ? (
          <ChartBlock
            title="Puntuación media"
            description={`Promedio ${formatDecimal(voteAverage)} sobre 10, según TMDb.`}
            data={scoreData}
          />
        ) : null}
        {volumeData.length ? (
          <ChartBlock
            title="Volumen"
            description="Cantidad de votos y popularidad relativa informadas por TMDb."
            data={volumeData}
          />
        ) : null}
        {moneyData.length ? (
          <ChartBlock
            title="Presupuesto e ingresos"
            description="Cifras en USD cuando TMDb las publica. Pueden estar incompletas."
            data={moneyData}
            unit="usd"
          />
        ) : null}
        {seasonData.length > 1 ? (
          <ChartBlock
            title="Promedio por temporada"
            description="vote_average de cada temporada según TMDb."
            data={seasonData}
          />
        ) : null}
      </div>
    </div>
  );
}
