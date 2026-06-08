import type { Metadata } from "next";
import { ReactNode } from "react";

import { AppProviders } from "@/components/providers/app-providers";
import { TopMenu } from "@/components/top-menu";
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
          <TopMenu />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
