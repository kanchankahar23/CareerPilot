import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { MapPin, Clock, ChevronRight, Loader2 } from "lucide-react";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interests = JSON.parse(localStorage.getItem("cp_interests") || "[]");
    const role = localStorage.getItem("cp_role") || "";

    if (!role) { navigate("/onboarding"); return; }

    axios.post("http://localhost:8000/ai/roadmap", { interests, role })
      .then((res) => { setRoadmap(res.data); setLoading(false); })
      .catch(() => { setError("Failed to generate roadmap. Try again."); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-violet-400 animate-spin" size={40} />
      <p className="text-gray-400">Generating your personalized roadmap...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-red-400 text-center">
        <p className="mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-violet-600 text-white px-6 py-2 rounded-xl">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-10">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Roadmap to become a
          </h1>
          <span className="text-violet-400 text-3xl font-bold">{roadmap?.role}</span>
          <div className="flex justify-center items-center gap-2 mt-3">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-400 text-sm">{roadmap?.duration}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />
          <div className="space-y-8">
            {roadmap?.phases?.map((phase, idx) => (
              <div key={idx} className="relative pl-16">
                <div className="absolute left-0 w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  {phase.phase}
                </div>
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{phase.title}</h3>
                    <span className="text-xs text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills?.map((skill, i) => (
                      <span key={i} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center mt-10">
          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            View Jobs <ChevronRight size={18} />
          </button>
          <button
            onClick={() => navigate("/resources")}
            className="flex items-center gap-2 border border-violet-500 text-violet-400 hover:bg-violet-500/10 px-6 py-3 rounded-xl font-medium transition-all"
          >
            Learning Resources <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}