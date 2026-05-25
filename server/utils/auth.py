from jose import jwt


from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from passlib.context import CryptContext
import os
import logging

# ✅ Fix: bcrypt warning suppress karo
logging.getLogger("passlib").setLevel(logging.ERROR)

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in .env")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(days=1)
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token