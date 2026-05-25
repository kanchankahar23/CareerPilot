from fastapi import APIRouter, HTTPException
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

router = APIRouter()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ── existing career chat ──────────────────────────────
@router.post("/career-chat")
async def career_chat(data: dict):
    prompt = data.get("prompt")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are CareerPilot AI, a helpful career advisor. "
                    "Help users with resume tips, job searching, interview prep, "
                    "skill development, and career planning. Be concise and practical."
                )
            },
            {"role": "user", "content": prompt}
        ]
    )
    return {"response": completion.choices[0].message.content}


# ── roadmap generator ─────────────────────────────────
@router.post("/ai/roadmap")
async def generate_roadmap(data: dict):
    interests = data.get("interests", [])
    role = data.get("role", "")

    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    prompt = f"""
You are a career roadmap expert. Generate a detailed career roadmap for someone who wants to become a "{role}" with interests in {', '.join(interests)}.

Return ONLY a valid JSON object like this (no extra text):
{{
  "role": "{role}",
  "duration": "6-12 months",
  "phases": [
    {{
      "phase": 1,
      "title": "Foundation",
      "duration": "1-2 months",
      "skills": ["skill1", "skill2", "skill3"],
      "description": "What to learn in this phase"
    }},
    {{
      "phase": 2,
      "title": "Core Skills",
      "duration": "2-3 months",
      "skills": ["skill1", "skill2"],
      "description": "What to learn in this phase"
    }},
    {{
      "phase": 3,
      "title": "Advanced & Projects",
      "duration": "2-3 months",
      "skills": ["skill1", "skill2"],
      "description": "What to learn in this phase"
    }},
    {{
      "phase": 4,
      "title": "Job Ready",
      "duration": "1-2 months",
      "skills": ["Portfolio", "Resume", "Interview Prep"],
      "description": "Prepare for job applications"
    }}
  ]
}}
"""

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a career roadmap expert. Always respond with valid JSON only."},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    try:
        # strip markdown code fences if present
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        roadmap = json.loads(raw.strip())
    except Exception:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Try again.")

    return roadmap


# ── jobs generator ────────────────────────────────────
@router.post("/ai/jobs")
async def generate_jobs(data: dict):
    role = data.get("role", "")
    interests = data.get("interests", [])

    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    prompt = f"""
Generate 6 realistic job listings for a "{role}" with interests in {', '.join(interests)}.

Return ONLY a valid JSON array like this:
[
  {{
    "title": "Job Title",
    "company": "Company Name",
    "location": "City, Country or Remote",
    "type": "Full-time",
    "salary": "₹8-12 LPA",
    "skills": ["skill1", "skill2", "skill3"],
    "description": "Brief job description in 1-2 lines"
  }}
]
"""

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a job listing expert. Always respond with valid JSON only."},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    try:
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        jobs = json.loads(raw.strip())
    except Exception:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Try again.")

    return {"jobs": jobs}


# ── resources generator ───────────────────────────────
@router.post("/ai/resources")
async def generate_resources(data: dict):
    role = data.get("role", "")
    interests = data.get("interests", [])

    if not role:
        raise HTTPException(status_code=400, detail="Role is required")

    prompt = f"""
Suggest learning resources for someone who wants to become a "{role}" with interests in {', '.join(interests)}.

Return ONLY a valid JSON object like this:
{{
  "youtube": [
    {{
      "title": "Channel or Playlist Name",
      "channel": "Channel Name",
      "url": "https://youtube.com/...",
      "description": "What you will learn"
    }}
  ],
  "websites": [
    {{
      "title": "Website Name",
      "url": "https://...",
      "description": "What you will learn",
      "free": true
    }}
  ],
  "courses": [
    {{
      "title": "Course Name",
      "platform": "Coursera / Udemy / freeCodeCamp",
      "url": "https://...",
      "price": "Free or Paid",
      "description": "What you will learn"
    }}
  ]
}}
"""

    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a learning resources expert. Always respond with valid JSON only."},
            {"role": "user", "content": prompt}
        ]
    )

    raw = completion.choices[0].message.content.strip()

    try:
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        resources = json.loads(raw.strip())
    except Exception:
        raise HTTPException(status_code=500, detail="AI response parsing failed. Try again.")

    return resources