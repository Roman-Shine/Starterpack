"use client";

import { useMutation } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { AuthUser, getMe, login, logout, refreshSession, register } from "@/lib/auth-api";

const TOKEN_KEY = "auth_access_token";

type RegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  rememberMe: boolean;
};

type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loginError: string | null;
  registerError: string | null;
  loginPending: boolean;
  registerPending: boolean;
  signIn: (input: LoginInput) => Promise<void>;
  signUp: (input: RegisterInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  });
  const [isInitialized, setIsInitialized] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return !localStorage.getItem(TOKEN_KEY);
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      setUser(result.user);
      setToken(result.access_token);
      localStorage.setItem(TOKEN_KEY, result.access_token);
      setLoginError(null);
    },
    onError: (error: Error) => {
      setLoginError(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (result) => {
      setUser(result.user);
      setToken(result.access_token);
      localStorage.setItem(TOKEN_KEY, result.access_token);
      setRegisterError(null);
    },
    onError: (error: Error) => {
      setRegisterError(error.message);
    },
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    const hydrate = async () => {
      try {
        const result = await refreshSession();
        setUser(result.user);
        setToken(result.access_token);
        localStorage.setItem(TOKEN_KEY, result.access_token);
      } catch {
        try {
          const currentUser = await getMe();
          setUser(currentUser);
        } catch {
          setUser(null);
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        }
      } finally {
        setIsInitialized(true);
      }
    };

    void hydrate();
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user),
      isInitialized,
      loginError,
      registerError,
      loginPending: loginMutation.isPending,
      registerPending: registerMutation.isPending,
      signIn: async (input) => {
        await loginMutation.mutateAsync({
          email: input.email,
          password: input.password,
          remember_me: input.rememberMe,
        });
      },
      signUp: async (input) => {
        await registerMutation.mutateAsync({
          email: input.email,
          password: input.password,
          first_name: input.firstName,
          last_name: input.lastName,
          remember_me: input.rememberMe,
        });
      },
      signOut: async () => {
        await logout().catch(() => undefined);
        setUser(null);
        setToken(null);
        setLoginError(null);
        setRegisterError(null);
        localStorage.removeItem(TOKEN_KEY);
      },
    }),
    [
      isInitialized,
      loginError,
      loginMutation,
      registerError,
      registerMutation,
      token,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
