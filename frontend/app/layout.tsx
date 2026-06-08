import type { Metadata } from "next";
import { ReactNode } from "react";

import { AppProviders } from "@/components/providers/app-providers";
import messages from "@/messages/ru.json";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starterpack Frontend",
  description: "Starterpack frontend base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <AppProviders locale="ru" messages={messages}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
