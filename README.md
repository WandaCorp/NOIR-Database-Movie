# MHD+

Explorador de películas y series con datos de [The Movie Database (TMDb)](https://www.themoviedb.org/). Interfaz en español, diseño cinematográfico oscuro, sin cuentas de usuario.

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Cómo probarlo

```bash
npm install
# Opcional: export TMDB_API_KEY=tu_clave
npm run dev
```

El servidor de desarrollo escucha en el puerto 8080. No hace falta una base de datos.

## Arquitectura

```
Navegador  →  createServerFn / /api/tmdb/*  →  TMDb API v3
```

La clave **no** viaja al navegador. El cliente llama a funciones de servidor (`src/lib/tmdb/functions.ts`) o al proxy HTTP `GET /api/tmdb/$`. Ambos usan `src/lib/tmdb/proxy.server.ts`, que:

- inyecta `TMDB_API_KEY`
- restringe la ruta a un allowlist de endpoints de lectura
- sanitiza query params
- cachea respuestas en memoria, deduplica inflight y reintenta un 429

El catálogo no se guarda en una base propia. Favoritos y ajustes viven en `localStorage`.

## Variable de entorno

| Variable        | Dónde                         | Uso                          |
|-----------------|-------------------------------|------------------------------|
| `TMDB_API_KEY`  | servidor / Vercel (Production)| Clave v3 de TMDb             |

En Vercel: Project Settings → Environment Variables → `TMDB_API_KEY`.

`.env.example` documenta el nombre. No subas la clave al frontend (`VITE_*`).

## Rutas

- `/` inicio
- `/peliculas` `/series` catálogos
- `/generos` `/generos/:id`
- `/pelicula/:id` `/serie/:id` `/persona/:id`
- `/buscar` `/favoritos`
- `/privacidad` `/terminos` `/cookies` `/aviso-legal`

## Clasificación MHD+ (no oficial de TMDb)

Usa `vote_average` y `vote_count`:

- Destacada: ≥ 7.5 y ≥ 80 votos
- Buena: ≥ 6.5 y ≥ 40 votos
- Regular: ≥ 5.5
- Débil: < 5.5
- Pocos votos: < 40 valoraciones

## Librerías

| Librería | Para qué | Por qué |
|----------|----------|---------|
| TanStack Start / Router | rutas, SSR, proxy | ya es el runtime del proyecto |
| TanStack Query | caché, infinite scroll, debounce de búsqueda | evita pedidos duplicados a TMDb |
| Recharts | estadísticas en fichas | gráficos accesibles y responsive |
| Zustand | favoritos y ajustes | persistencia simple en localStorage |
| Radix UI | dialog, sheet, switch, tooltip | accesibilidad de teclado |
| Lucide | iconos | set coherente, sin emoji de adorno |
| Sonner | toasts | confirmaciones ligeras |
| Zod | validación del proxy | entradas acotadas |
| date-fns | fechas en español | locale `es` |
| Plus Jakarta Sans (fontsource) | tipografía autoalojada | no depende de Google Fonts |

## Contenido para adultos

Desactivado por defecto. Al activarlo hay confirmación. El filtro usa el campo `adult` de TMDb.

## Cookies

MHD+ no usa cookies propias ni banner de consentimiento. Ver `/cookies`.
