"use client";

import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations();

  return (
    <main className="page justify-center">
      <section className="page-narrow surface stack">
        <h1>{t("registerTitle")}</h1>
      </section>
    </main>
  );
}
