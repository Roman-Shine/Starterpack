export type AuthUser = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  auth_provider: string;
  two_factor_enabled: boolean;
  created_at: string;
};

export type AuthResponse = {
  user: AuthUser;
  access_token: string;
  two_factor_required: boolean;
  oauth_google_available: boolean;
};

type RegisterPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  remember_me: boolean;
};

type LoginPayload = {
  email: string;
  password: string;
  remember_me: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = typeof body?.detail === "string" ? body.detail : "Request failed";
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function refreshSession(): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/refresh", { method: "POST" });
}

export function logout(): Promise<void> {
  return request<void>("/auth/logout", { method: "POST" });
}

export function getMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me");
}
