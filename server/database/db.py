from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise ValueError("MONGO_URL is not set in .env")

# ✅ serverSelectionTimeoutMS add karo — fast fail, clear error
client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
db = client["careerpilot"]
users_collection = db["users"]