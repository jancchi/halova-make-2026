from fastapi import APIRouter, Depends
from app.models.user import User, UserRead
from app.auth.jwt import get_current_user

router = APIRouter()


@router.get("/ping")
def ping():
    """Public health-check for the API router."""
    return {"pong": True}


@router.get("/protected", response_model=UserRead)
def protected_route(current_user: User = Depends(get_current_user)):
    """Example protected route — swap this out for your own logic."""
    return current_user
