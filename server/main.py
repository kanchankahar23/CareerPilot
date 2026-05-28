from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.ai import router as ai_router, chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
         "https://career-pilot-eight.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

app.include_router(chat_router)

app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "CareerPilot API Running 🚀"
    }