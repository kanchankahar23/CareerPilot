from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

print("MONGO_URL:", MONGO_URL)  # 👈 add this

if not MONGO_URL:
    raise ValueError("MONGO_URL is not set in .env")

client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
db = client["careerpilot"]
users_collection = db["users"]