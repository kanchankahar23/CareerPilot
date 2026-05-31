
# 🚀 CareerPilot

> An AI-powered Career Recommendation System that helps students and job seekers discover the right career path based on their interests, education, and desired roles.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/Groq_AI-FF6B35?style=for-the-badge)](https://groq.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🌟 Features

### 🎯 Career Recommendation
- Analyze user interests and educational background
- Recommend suitable career paths
- Personalized career guidance

### 🗺️ AI Career Roadmap
- Step-by-step learning path
- Required skills and technologies
- Project recommendations
- Certification suggestions

### 📚 Learning Resources
- Online courses & documentation
- Books and YouTube tutorials
- Practice platforms

### 💼 Job Opportunities
- Relevant job roles and industry opportunities
- Career growth suggestions
- Placement preparation guidance

### 🤖 AI Career Assistant (Powered by Groq AI)
- Career guidance & resume improvement
- Interview preparation
- Skill development & technology recommendations

### 🔐 Authentication System
- User Registration & Login
- JWT Authentication
- Password Hashing with Bcrypt

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Uvicorn
- Python
- JWT Authentication
- Passlib
- Bcrypt

### Database
- MongoDB
- PyMongo

### AI
- Groq AI (Llama Models)

---

## 📂 Project Structure

```bash
CareerPilot/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── routes/
│   │   ├── auth.py
│   │   └── ai.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   └── career.py
│   │
│   ├── database/
│   │   └── db.py
│   │
│   ├── utils/
│   │   └── auth.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kanchankahar23/CareerPilot.git
cd CareerPilot
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

### 3. Backend Setup

**Create & Activate Virtual Environment:**

```bash
# Create
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate
```

**Install Dependencies:**

```bash
pip install fastapi uvicorn pymongo bcrypt python-jose python-dotenv groq email-validator passlib python-multipart
```

**Run the FastAPI Server:**

```bash
uvicorn main:app --reload
```

Backend runs on: **http://localhost:8000**

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
GROQ_API_KEY=your_groq_api_key
```

---

## 🔄 How It Works

```
1. User registers and logs in
        ↓
2. User enters Interests + Education + Desired Career Role
        ↓
3. Groq AI (LLaMA) analyzes the input
        ↓
4. System generates:
   ├── Career Recommendations
   ├── Personalized Roadmap
   ├── Learning Resources
   └── Job Opportunities
        ↓
5. User chats with AI Career Assistant for further guidance
```

---

## 🚀 Future Improvements

- [ ] Resume Builder
- [ ] ATS Resume Checker
- [ ] Mock Interview Simulator
- [ ] Skill Assessment Tests
- [ ] Job Application Tracker
- [ ] AI Resume Analyzer
- [ ] Career Progress Dashboard

---

## 👨‍💻 Author

**Kanchan Kahar**  

---

## ⭐ Support

If you found **CareerPilot** useful, please give it a ⭐ on GitHub and share it with others!

**Happy Coding! 🚀**
