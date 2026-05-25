from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.ai import router as ai_router, chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(chat_router)  # /career-chat
app.include_router(ai_router)    # /ai/roadmap, /ai/jobs, /ai/resources

@app.get("/")
def home():
    return {"message": "CareerPilot API Running 🚀"}