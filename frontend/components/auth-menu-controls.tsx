"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/auth-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuthMenuControls() {
  const { isAuthenticated, isInitialized, signOut, user } = useAuth();

  if (!isInitialized) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "border-white/30 bg-transparent text-white hover:bg-white/10",
          )}
          href="/app/profile"
        >
          {user?.email ?? "Profile"}
        </Link>
        <button
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "bg-white text-black hover:bg-white/90",
          )}
          onClick={() => void signOut()}
          type="button"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "border-white/30 bg-transparent text-white hover:bg-white/10",
        )}
        href="/app/login"
      >
        Sign in
      </Link>
      <Link
        className={cn(
          buttonVariants({ variant: "default", size: "sm" }),
          "bg-white text-black hover:bg-white/90",
        )}
        href="/app/register"
      >
        Sign up
      </Link>
    </>
  );
}
