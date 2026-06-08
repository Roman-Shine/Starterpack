"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { ComponentProps, ReactNode, useState } from "react";

import { AuthProvider } from "@/components/providers/auth-provider";

type Props = {
  children: ReactNode;
  locale: string;
  messages: NonNullable<ComponentProps<typeof NextIntlClientProvider>["messages"]>;
};

export function AppProviders({ children, locale, messages }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
