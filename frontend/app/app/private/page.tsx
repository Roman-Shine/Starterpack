"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/auth-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PrivatePage() {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <main className="page justify-center">
        <section className="page-narrow surface stack">
          <h1>Загрузка...</h1>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="page justify-center">
        <section className="page-narrow surface stack">
          <h1>Только для авторизированных пользователей</h1>
          <Link className={cn(buttonVariants({ size: "sm" }))} href="/app/login">
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page justify-center">
      <section className="page-narrow surface stack">
        <h1>Только для авторизированных пользователей</h1>
      </section>
    </main>
  );
}
