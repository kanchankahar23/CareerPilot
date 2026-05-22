import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Rocket,
  CheckCircle2,
  Stars,
} from "lucide-react";

const features = [
  {
    icon: <Rocket size={28} />,
    title: "AI Career Roadmap",
    desc: "Get a step-by-step roadmap tailored to your dream career and current skills.",
  },
  {
    icon: <BrainCircuit size={28} />,
    title: "Smart AI Guidance",
    desc: "Receive intelligent career suggestions, learning paths, and interview preparation.",
  },
  {
    icon: <BriefcaseBusiness size={28} />,
    title: "Job Recommendations",
    desc: "Discover internships and job roles based on your skills and progress.",
  },
];

const stats = [
  { value: "10K+", label: "Career Paths" },
  { value: "AI", label: "Smart Guidance" },
  { value: "24/7", label: "Learning Support" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] text-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-24 pb-20">

        {/* Glow Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">

          {/* Left Content */}
          <div>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-violet-300 text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-xl">
              <Sparkles size={16} />
              Powered by AI Career Intelligence
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Build Your
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}Dream Career
              </span>
              {" "}with AI 🚀
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              CareerPilot AI helps students and developers discover career paths,
              generate personalized roadmaps, prepare for interviews, and grow
              with AI-powered guidance.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">

              <Link
                to="/register"
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl font-medium shadow-lg hover:scale-[1.03] transition-all duration-300"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="px-7 py-3 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 transition"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-wrap">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 min-w-[130px]"
                >
                  <h3 className="text-2xl font-bold text-violet-300">
                    {item.value}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Card */}
          <div className="relative">

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 rounded-2xl">
                  <BrainCircuit size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    AI Career Assistant
                  </h3>

                  <p className="text-sm text-gray-400">
                    Personalized recommendations
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
                  <p className="text-sm text-gray-300">
                    👨‍💻 Skills: React, JavaScript
                  </p>

                  <p className="text-sm text-gray-300 mt-2">
                    🎯 Goal: Frontend Developer
                  </p>
                </div>

                <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-2xl p-4">
                  <p className="text-violet-300 text-sm mb-2">
                    AI Recommendation
                  </p>

                  <ul className="space-y-2 text-sm text-gray-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Learn React Router
                    </li>

                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Build Full Stack Projects
                    </li>

                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Practice Interview Questions
                    </li>
                  </ul>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl font-medium hover:scale-[1.02] transition">
                  Generate Roadmap
                </button>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-5 -right-5 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 text-violet-300">
                <Stars size={18} />
                <span className="text-sm font-medium">
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need To Grow 📈
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful AI tools designed to help students and developers
            build successful tech careers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl hover:-translate-y-1 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 w-fit p-4 rounded-2xl text-violet-300 mb-5">
                {f.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {f.title}
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}