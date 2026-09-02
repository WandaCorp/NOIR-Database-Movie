import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppProviders } from "@/components/providers";
import { AppShell } from "@/components/layout/app-shell";
import { AppErrorComponent } from "@/lib/error-component";
import appCss from "../styles.css?url";

const APP_NAME = "MHD+";

function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-sm text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Página no encontrada</h1>
      <p className="mt-2 text-sm text-muted">
        El enlace no existe o el título ya no está disponible en TMDb.
      </p>
      <a href="/" className="mt-6 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg">
        Ir al inicio
      </a>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} · Cine y series` },
      {
        name: "description",
        content:
          "MHD+ es un explorador de películas y series con datos de The Movie Database (TMDb).",
      },
      { name: "theme-color", content: "#070708" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: AppErrorComponent,
});

function RootComponent() {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <AppProviders>
            <AppShell>
              <Outlet />
            </AppShell>
          </AppProviders>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
