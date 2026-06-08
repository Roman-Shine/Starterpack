"use client";

import { useTranslations } from "next-intl";

export function LandingTitle() {
  const t = useTranslations();

  return <h1 className="text-3xl font-semibold">{t("landingTitle")}</h1>;
}
