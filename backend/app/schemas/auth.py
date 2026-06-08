from datetime import datetime
import re

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    remember_me: bool = False

    @field_validator("first_name", "last_name")
    @classmethod
    def normalize_optional_names(cls, value: str | None) -> str | None:
        if value is None:
            return None
        value = value.strip()
        return value or None

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: str) -> str:
        if not re.search(r"[A-Za-z]", value) or not re.search(r"\d", value):
            raise ValueError("Password must contain letters and numbers")
        return value


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    remember_me: bool = False

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, value: str) -> str:
        if not re.search(r"[A-Za-z]", value) or not re.search(r"\d", value):
            raise ValueError("Password must contain letters and numbers")
        return value


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    first_name: str | None
    last_name: str | None
    auth_provider: str
    two_factor_enabled: bool
    created_at: datetime


class AuthResponse(BaseModel):
    user: UserRead
    access_token: str
    two_factor_required: bool
    oauth_google_available: bool


class AuthProvidersResponse(BaseModel):
    google: bool


class TwoFactorStatusResponse(BaseModel):
    enabled: bool
