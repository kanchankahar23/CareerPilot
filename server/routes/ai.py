from fastapi import APIRouter, HTTPException
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

# ✅ Two separate routers
chat_router = APIRouter(tags=["Chat"])
router = APIRouter(prefix="/ai", tags=["AI"])

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ── 🔥 /career-chat (UPDATED WITH STRUCTURED JSON) ─────────────────────────────
@chat_router.post("/career-chat")
async def career_chat(data: dict):
    prompt = data.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    # ✅ YOUR UPDATED SYSTEM PROMPT (STRICT JSON OUTPUT)
    system_prompt = """
You are CareerPilot AI, a professional career assistant for students and developers.

You MUST always return response in STRICT JSON format only.

Do NOT include any extra text, explanation, or markdown.

JSON FORMAT:

{
  "title": "short title",
  "summary": "clear explanation in 2-3 lines",
  "points": ["point 1", "point 2", "point 3"],
  "steps": ["step 1", "step 2", "step 3"],
  "example": "real-world example or project idea"
}

RULES:
- Always return valid JSON
- Keep language simple and clear
- Focus on career, coding, interview, roadmap, resume, DSA, web dev
- If question is simple, still return structured format
- Never return plain text
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    # 🔥 SAFE JSON PARSING (VERY IMPORTANT)
    try:
        if "```" in raw:
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]

        parsed = json.loads(raw.strip())

    except Exception:
        # fallback so frontend never breaks
        parsed = {
            "title": "Response",
            "summary": raw,
            "points": [],
            "steps": [],
            "example": ""
        }

    return {
        "response": parsed
    }


# ── /ai/roadmap ───────────────────────────────────────
@router.post("/roadmap")
async def generate_roadmap(data: dict):
    interests = data.get("interests", [])
    role = data.get("role", "")

    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    prompt = f"""
You are a career roadmap expert. Generate a detailed career roadmap for someone who wants to become a "{role}" with interests in {', '.join(interests)}.

Return ONLY a valid JSON object, no extra text.
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a career roadmap expert. Always respond with valid JSON only."},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    try:
        if "```" in raw:
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        roadmap = json.loads(raw.strip())
    except Exception:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Try again.")

    return roadmap


# ── /ai/jobs ──────────────────────────────────────────
@router.post("/jobs")
async def generate_jobs(data: dict):
    role = data.get("role", "")
    interests = data.get("interests", [])

    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    prompt = f"""
Generate 6 realistic job listings for a "{role}" with interests in {', '.join(interests)}.

Return ONLY a valid JSON array.
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a job listing expert. Always respond with valid JSON only."},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    try:
        if "```" in raw:
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        jobs = json.loads(raw.strip())
    except Exception:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Try again.")

    return {"jobs": jobs}


# ── /ai/resources ─────────────────────────────────────
@router.post("/resources")
async def generate_resources(data: dict):
    role = data.get("role", "")
    interests = data.get("interests", [])

    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    prompt = f"""
Suggest learning resources for "{role}" with interests in {', '.join(interests)}.

Return ONLY valid JSON.
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a learning resources expert. Always respond with valid JSON only."},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    try:
        if "```" in raw:
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        resources = json.loads(raw.strip())
    except Exception:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Try again.")

    return resources