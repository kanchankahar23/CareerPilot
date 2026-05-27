import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { Book, Link, Loader } from "lucide-react";
// import { Youtube, Globe, BookOpen, ExternalLink, Loader2 } from "lucide-react";

export default function Resources() {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interests = JSON.parse(localStorage.getItem("cp_interests") || "[]");
    const role = localStorage.getItem("cp_role") || "";
    if (!role) { navigate("/onboarding"); return; }

    axios.post("http://localhost:8000/ai/resources", { interests, role })
      .then((res) => { setResources(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
      <Loader className="text-violet-400 animate-spin" size={40} />
      <p className="text-gray-400">Curating learning resources...</p>
    </div>
  );

  const Section = ({ icon: Icon, title, color, items, renderItem }) => (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className={color} />
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items?.map((item, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 hover:border-violet-500/30 transition-all">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Learning Resources</h1>
          <p className="text-gray-400 text-sm">Handpicked for <span className="text-violet-400">{localStorage.getItem("cp_role")}</span></p>
        </div>

        <Section  title="YouTube Channels & Playlists" color="text-red-400"
         
          renderItem={(item) => (
            <>
              <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-violet-400 text-xs mb-2">{item.channel}</p>
              <p className="text-gray-400 text-xs mb-3">{item.description}</p>
              <a href={item.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300">
                Watch <Link size={10} />
              </a>
            </>
          )}
        />

        <Section  title="Websites & Platforms" color="text-blue-400"
          items={resources?.websites}
          renderItem={(item) => (
            <>
              <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.free ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {item.free ? "Free" : "Paid"}
                </span>
                <a href={item.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                  Visit <ExternalLink size={10} />
                </a>
              </div>
            </>
          )}
        />

        <Section icon={Book} title="Courses" color="text-green-400"
          items={resources?.courses}
          renderItem={(item) => (
            <>
              <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-violet-400 text-xs mb-2">{item.platform}</p>
              <p className="text-gray-400 text-xs mb-3">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{item.price}</span>
                <a href={item.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300">
                  Enroll <ExternalLink size={10} />
                </a>
              </div>
            </>
          )}
        />

        <div className="flex justify-center">
          <button onClick={() => navigate("/chat")} className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
            Chat with AI Advisor →
          </button>
        </div>
      </div>
    </div>
  );
}