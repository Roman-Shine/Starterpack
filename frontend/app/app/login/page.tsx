"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const { signIn, loginPending, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn({ email, password, rememberMe });
      router.push("/app/private");
    } catch {
      return;
    }
  };

  return (
    <main className="page justify-center">
      <form className="page-narrow surface stack" onSubmit={onSubmit}>
        <h1>{t("loginTitle")}</h1>
        <Input onChange={(event) => setEmail(event.target.value)} placeholder="Email" required type="email" value={email} />
        <Input
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
        <label className="flex items-center gap-2 text-sm">
          <input checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" />
          Remember me
        </label>
        {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
        <Button disabled={loginPending} type="submit">
          {loginPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </main>
  );
}
