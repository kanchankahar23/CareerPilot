from fastapi import APIRouter, HTTPException
from models.user import RegisterUser, LoginUser
from database.db import users_collection

from utils.auth import (
    hash_password,
    verify_password,
    create_token
)

router = APIRouter()


# REGISTER
@router.post("/register")
async def register(user: RegisterUser):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }

    users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully"
    }


# LOGIN
@router.post("/login")
async def login(user: LoginUser):

    db_user = users_collection.find_one({
        "email": user.email
    })

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        db_user["password"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_token({
        "id": str(db_user["_id"]),
        "email": db_user["email"]
    })

    return {
        "token": token,
        "name": db_user["name"]
    }