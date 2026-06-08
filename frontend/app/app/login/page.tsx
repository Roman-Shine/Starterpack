"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">{t("loginTitle")}</h1>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button type="button">Login</Button>
    </main>
  );
}
