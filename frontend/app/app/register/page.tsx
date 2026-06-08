"use client";

import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">{t("registerTitle")}</h1>
    </main>
  );
}
