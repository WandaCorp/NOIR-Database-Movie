import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (count, error) => {
          const status = (error as { status?: number }).status;
          if (status === 404 || status === 401) return false;
          return count < 2;
        },
      },
    },
  });
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(makeQueryClient);
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            className: "bg-surface text-fg border-border",
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
