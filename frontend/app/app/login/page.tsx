"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <main className="page justify-center">
      <section className="page-narrow surface stack">
        <h1>{t("loginTitle")}</h1>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button type="button">Login</Button>
      </section>
    </main>
  );
}
