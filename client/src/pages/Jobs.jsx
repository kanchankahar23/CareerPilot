import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Briefcase, MapPin, IndianRupee, Loader2 } from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interests = JSON.parse(localStorage.getItem("cp_interests") || "[]");
    const role = localStorage.getItem("cp_role") || "";
    if (!role) { navigate("/onboarding"); return; }

    axios.post(`${import.meta.env.VITE_API_URL}/ai/jobs`, { interests, role })
      .then((res) => { setJobs(res.data.jobs); setLoading(false); })
      .catch(() => { setError("Failed to load jobs."); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-violet-400 animate-spin" size={40} />
      <p className="text-gray-400">Finding jobs for you...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Job Opportunities</h1>
          <p className="text-gray-400 text-sm">Based on your selected role: <span className="text-violet-400">{localStorage.getItem("cp_role")}</span></p>
        </div>

        {error && <p className="text-red-400 text-center mb-6">{error}</p>}

        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                  <p className="text-violet-400 text-sm">{job.company}</p>
                </div>
                <span className="text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{job.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                <span className="flex items-center gap-1"><IndianRupee size={12} />{job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill, i) => (
                  <span key={i} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={() => navigate("/resources")} className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
            View Learning Resources →
          </button>
        </div>
      </div>
    </div>
  );
}