"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function AuthMenuControls() {
  const { isAuthenticated, isInitialized, signOut, user } = useAuth();

  if (!isInitialized) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <>
        <Button
          asChild
          className="border-white/30 bg-transparent text-white hover:bg-white/10"
          size="sm"
          variant="outline"
        >
          <Link href="/app/profile">{user?.email ?? "Profile"}</Link>
        </Button>
        <Button className="bg-white text-black hover:bg-white/90" onClick={() => void signOut()} size="sm" type="button">
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        asChild
        className="border-white/30 bg-transparent text-white hover:bg-white/10"
        size="sm"
        variant="outline"
      >
        <Link href="/app/login">Sign in</Link>
      </Button>
      <Button asChild className="bg-white text-black hover:bg-white/90" size="sm">
        <Link href="/app/register">Sign up</Link>
      </Button>
    </>
  );
}
