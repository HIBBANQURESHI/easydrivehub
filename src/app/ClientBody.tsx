"use client";

import { ThemeProvider } from "next-themes";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
} 
