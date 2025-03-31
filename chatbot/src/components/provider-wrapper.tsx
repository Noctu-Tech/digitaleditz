'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
export default function ProviderWrapper({ children }:{ children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false);
  const [queryclient]=useState(()=>new QueryClient());
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <QueryClientProvider client={queryclient}>{children}
    <ReactQueryDevtools/>
    </QueryClientProvider>;
  }

  return (
    <QueryClientProvider client={queryclient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}