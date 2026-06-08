"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const AuthMenuControls = dynamic(
  () => import("@/components/auth-menu-controls").then((mod) => mod.AuthMenuControls),
  { ssr: false, loading: () => null },
);

export function TopMenu() {
  return (
    <header className="border-b border-primary bg-primary text-primary-foreground">
      <div className="flex h-14 w-full items-center gap-3 px-6">
        <Link className="text-sm font-semibold tracking-tight text-primary-foreground hover:opacity-80" href="/">
          Landing
        </Link>
        <div className="ml-4 flex items-center gap-2">
          <Link className="text-sm text-primary-foreground/90 hover:text-primary-foreground" href="/app/public">
            Public
          </Link>
          <Link className="text-sm text-primary-foreground/90 hover:text-primary-foreground" href="/app/private">
            Private
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <AuthMenuControls />
        </div>
      </div>
    </header>
  );
}
