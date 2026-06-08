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

export type RegisterPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  remember_me: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
  remember_me: boolean;
};

export type RegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  rememberMe: boolean;
};

export type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};
