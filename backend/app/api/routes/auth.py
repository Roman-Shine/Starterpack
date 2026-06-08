from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session

from app.crud.user import create_user, get_user_by_email
from app.db.session import get_db
from app.schemas.auth import (
    AuthProvidersResponse,
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    TwoFactorStatusResponse,
    UserRead,
)
from app.services.auth import (
    authenticate_user,
    clear_auth_cookies,
    create_access_token,
    create_refresh_token,
    get_user_from_access_cookie,
    get_user_from_refresh_cookie,
    hash_password,
    set_access_cookie,
    set_auth_cookies,
)


router = APIRouter()


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, response: Response, db: Session = Depends(get_db)) -> AuthResponse:
    existing_user = get_user_by_email(db, email=payload.email)
    if existing_user is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user = create_user(
        db,
        email=str(payload.email),
        password_hash=hash_password(payload.password),
        first_name=payload.first_name,
        last_name=payload.last_name,
    )
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id, payload.remember_me)
    set_auth_cookies(
        response,
        access_token=access_token,
        refresh_token=refresh_token,
        remember_me=payload.remember_me,
    )
    return AuthResponse(
        user=UserRead.model_validate(user),
        access_token=access_token,
        two_factor_required=False,
        oauth_google_available=False,
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)) -> AuthResponse:
    user = authenticate_user(db, email=str(payload.email), password=payload.password)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id, payload.remember_me)
    set_auth_cookies(
        response,
        access_token=access_token,
        refresh_token=refresh_token,
        remember_me=payload.remember_me,
    )
    return AuthResponse(
        user=UserRead.model_validate(user),
        access_token=access_token,
        two_factor_required=user.two_factor_enabled,
        oauth_google_available=False,
    )


@router.post("/refresh", response_model=AuthResponse)
def refresh_session(request: Request, response: Response, db: Session = Depends(get_db)) -> AuthResponse:
    user = get_user_from_refresh_cookie(request, db)
    access_token = create_access_token(user.id)
    set_access_cookie(response, access_token=access_token)
    return AuthResponse(
        user=UserRead.model_validate(user),
        access_token=access_token,
        two_factor_required=user.two_factor_enabled,
        oauth_google_available=False,
    )


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response) -> None:
    clear_auth_cookies(response)


@router.get("/me", response_model=UserRead)
def get_me(request: Request, db: Session = Depends(get_db)) -> UserRead:
    user = get_user_from_access_cookie(request, db)
    return UserRead.model_validate(user)


@router.get("/providers", response_model=AuthProvidersResponse)
def auth_providers() -> AuthProvidersResponse:
    return AuthProvidersResponse(google=False)


@router.get("/2fa/status", response_model=TwoFactorStatusResponse)
def two_factor_status(request: Request, db: Session = Depends(get_db)) -> TwoFactorStatusResponse:
    user = get_user_from_access_cookie(request, db)
    return TwoFactorStatusResponse(enabled=user.two_factor_enabled)
