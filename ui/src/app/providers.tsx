"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient(queryConfig));

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
