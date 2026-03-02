"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IngredientsProvider, CocktailIngredientsProvider } from "@/hooks/use-ingredients";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 1000 * 60 * 30,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <IngredientsProvider>
          <CocktailIngredientsProvider>
            {children}
          </CocktailIngredientsProvider>
        </IngredientsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
