from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.services.auth import get_refresh_context, get_user_from_access_cookie


def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    return get_user_from_access_cookie(request, db)


def get_current_user_from_refresh(request: Request, db: Session = Depends(get_db)) -> tuple[User, bool]:
    return get_refresh_context(request, db)
