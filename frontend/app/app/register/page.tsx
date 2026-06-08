"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();
  const { signUp, registerPending, registerError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUp({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        rememberMe,
      });
      router.push("/app/private");
    } catch {
      return;
    }
  };

  return (
    <main className="page justify-center">
      <form className="page-narrow surface stack" onSubmit={onSubmit}>
        <h1>{t("registerTitle")}</h1>
        <Input onChange={(event) => setEmail(event.target.value)} placeholder="Email" required type="email" value={email} />
        <Input
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
        <Input
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="First name (optional)"
          type="text"
          value={firstName}
        />
        <Input onChange={(event) => setLastName(event.target.value)} placeholder="Last name (optional)" type="text" value={lastName} />
        <label className="flex items-center gap-2 text-sm">
          <input checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" />
          Remember me
        </label>
        {registerError ? <p className="text-sm text-red-600">{registerError}</p> : null}
        <Button disabled={registerPending} type="submit">
          {registerPending ? "Loading..." : "Register"}
        </Button>
      </form>
    </main>
  );
}
