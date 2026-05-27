import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Map,
  BookOpen,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Bell,
  Search,
  ChevronRight,
  Sparkles,
  Target,
  Trophy,
  Clock3,
} from "lucide-react";

export default function Dashboard() {
  const [goal, setGoal] = useState("");
  const [userName, setUserName] = useState("User");

  const navigate = useNavigate();

  useEffect(() => {
    const savedGoal =
      localStorage.getItem("goal") ||
      localStorage.getItem("cp_role") ||
      "Frontend Developer";

    // USER NAME FROM LOGIN
    const savedUser =
      localStorage.getItem("userName") ||
      localStorage.getItem("name") ||
      localStorage.getItem("username") ||
      "Kanchan";

    setGoal(savedGoal);
    setUserName(savedUser);
  }, []);

  const cards = [
    {
      title: "Roadmap",
      desc: "Step-by-step learning path",
      icon: Map,
      route: "/roadmap",
    },
    {
      title: "Resources",
      desc: "Courses & learning materials",
      icon: BookOpen,
      route: "/resources",
    },
    {
      title: "Jobs",
      desc: "Recommended opportunities",
      icon: Briefcase,
      route: "/jobs",
    },
    {
      title: "AI Mentor",
      desc: "Career guidance assistant",
      icon: MessageSquare,
      route: "/chat",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex">

      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 bg-[#0F172A] hidden lg:flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="px-8 py-7 border-b border-white/5">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-violet-500 flex items-center justify-center">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  CareerPilot
                </h2>

                <p className="text-xs text-gray-400">
                  AI Career Platform
                </p>
              </div>

            </div>

          </div>

          {/* MENU */}
          <div className="p-5 space-y-2">

            <button className="w-full flex items-center gap-3 bg-violet-500/10 text-violet-400 px-4 py-3 rounded-xl">
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => navigate("/roadmap")}
              className="w-full flex items-center gap-3 hover:bg-white/5 text-gray-300 px-4 py-3 rounded-xl transition-all"
            >
              <Map size={18} />
              Roadmap
            </button>

            <button
              onClick={() => navigate("/resources")}
              className="w-full flex items-center gap-3 hover:bg-white/5 text-gray-300 px-4 py-3 rounded-xl transition-all"
            >
              <BookOpen size={18} />
              Resources
            </button>

            <button
              onClick={() => navigate("/jobs")}
              className="w-full flex items-center gap-3 hover:bg-white/5 text-gray-300 px-4 py-3 rounded-xl transition-all"
            >
              <Briefcase size={18} />
              Jobs
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="w-full flex items-center gap-3 hover:bg-white/5 text-gray-300 px-4 py-3 rounded-xl transition-all"
            >
              <MessageSquare size={18} />
              AI Mentor
            </button>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="p-5">

          <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20 rounded-2xl p-5">

            <Trophy className="text-yellow-400 mb-4" size={28} />

            <h3 className="font-semibold mb-2">
              Keep Growing 🚀
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Build projects consistently and improve your skills daily.
            </p>

          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* TOPBAR */}
        <div className="h-20 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl px-6 flex items-center justify-between">

          {/* SEARCH */}
          <div className="hidden md:flex items-center gap-3 bg-[#111827] border border-white/5 rounded-xl px-4 py-3 w-[350px]">

            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search roadmap, jobs, resources..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
            />

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 ml-auto">

            <button className="w-11 h-11 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-center hover:bg-white/5 transition-all">
              <Bell size={18} className="text-gray-300" />
            </button>

            <div className="flex items-center gap-3 bg-[#111827] border border-white/5 px-4 py-2 rounded-xl">

              {/* USER ICON */}
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center font-semibold uppercase">
                {userName.charAt(0)}
              </div>

              {/* USER INFO */}
              <div className="hidden sm:block">
                <h4 className="text-sm font-medium">
                  Hello {userName} 👋
                </h4>

                <p className="text-xs text-gray-400">
                  {goal}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* HERO */}
          <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/10 rounded-3xl p-8 mb-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>

                <div className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 px-4 py-2 rounded-full text-sm mb-5">
                  <Sparkles size={16} />
                  AI Career Dashboard
                </div>

                <h1 className="text-4xl font-bold leading-tight mb-4">
                  Welcome back, {userName} 👋
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                  Continue building your journey toward becoming a successful{" "}
                  <span className="text-violet-400 font-medium">
                    {goal}
                  </span>.
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 min-w-[160px]">

                  <TrendingUp
                    className="text-green-400 mb-3"
                    size={24}
                  />

                  <h3 className="text-2xl font-semibold">
                    85%
                  </h3>

                  <p className="text-sm text-gray-400">
                    Career Growth
                  </p>

                </div>

                <div className="bg-[#111827] border border-white/5 rounded-2xl p-5 min-w-[160px]">

                  <Clock3
                    className="text-violet-400 mb-3"
                    size={24}
                  />

                  <h3 className="text-2xl font-semibold">
                    Daily
                  </h3>

                  <p className="text-sm text-gray-400">
                    Learning Progress
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {cards.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  onClick={() => navigate(item.route)}
                  className="bg-[#111827] border border-white/5 hover:border-violet-500/20 rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
                >

                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-5">
                    <Icon className="text-violet-400" size={25} />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 text-violet-400 text-sm font-medium">
                    Open
                    <ChevronRight size={16} />
                  </div>

                </button>
              );
            })}

          </div>

        </div>

      </main>

    </div>
  );
}