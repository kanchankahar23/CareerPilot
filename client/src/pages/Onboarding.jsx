import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Check } from "lucide-react";

const INTERESTS = [
  { id: "technology", label: "💻 Technology", desc: "Software, AI, Data" },
  { id: "management", label: "📊 Management", desc: "Leadership, Strategy" },
  { id: "design", label: "🎨 Design", desc: "UI/UX, Graphics" },
  { id: "finance", label: "💰 Finance", desc: "Banking, Investment" },
  { id: "marketing", label: "📢 Marketing", desc: "Digital, Brand" },
  { id: "healthcare", label: "🏥 Healthcare", desc: "Medical, Pharma" },
  { id: "education", label: "📚 Education", desc: "Teaching, EdTech" },
  { id: "entrepreneurship", label: "🚀 Entrepreneurship", desc: "Startup, Business" },
];

const ROLES = {
  technology: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer", "AI/ML Engineer", "Cybersecurity Analyst"],
  management: ["Product Manager", "Project Manager", "Business Analyst", "Operations Manager", "HR Manager"],
  design: ["UI/UX Designer", "Graphic Designer", "Product Designer", "Motion Designer"],
  finance: ["Financial Analyst", "Investment Banker", "CA/Accountant", "Risk Analyst"],
  marketing: ["Digital Marketer", "SEO Specialist", "Content Strategist", "Social Media Manager"],
  healthcare: ["Doctor", "Pharmacist", "Healthcare Analyst", "Medical Writer"],
  education: ["Teacher", "Curriculum Designer", "EdTech Developer", "Corporate Trainer"],
  entrepreneurship: ["Startup Founder", "Business Development Manager", "Venture Analyst"],
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  
  const navigate = useNavigate();

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const availableRoles = selectedInterests.flatMap((i) => ROLES[i] || []);
  const uniqueRoles = [...new Set(availableRoles)];

  const handleNext = () => {
    if (step === 1 && selectedInterests.length > 0) setStep(2);
    else if (step === 2 && selectedRole) {
      localStorage.setItem("cp_interests", JSON.stringify(selectedInterests));
      localStorage.setItem("cp_role", selectedRole);
      navigate("/roadmap");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-violet-600 p-3 rounded-2xl">
              <Sparkles className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === 1 ? "What are your interests?" : "Choose your target role"}
          </h1>
          <p className="text-gray-400 text-sm">
            {step === 1
              ? "Select all that apply — we'll personalize your career path"
              : "Pick the role you want to grow into"}
          </p>
          {/* Progress */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? "bg-violet-500" : "bg-white/10"}`} />
            <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? "bg-violet-500" : "bg-white/10"}`} />
          </div>
        </div>

        {/* Step 1 — Interests */}
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {INTERESTS.map((item) => {
              const selected = selectedInterests.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleInterest(item.id)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-200 ${
                    selected
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-white/10 bg-[#0f172a] hover:border-violet-500/40"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-2 right-2 bg-violet-600 rounded-full p-0.5">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                  <div className="text-xl mb-1">{item.label.split(" ")[0]}</div>
                  <div className="text-sm font-medium text-white">
                    {item.label.split(" ").slice(1).join(" ")}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2 — Roles */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {uniqueRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                  selectedRole === role
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-white/10 bg-[#0f172a] text-gray-300 hover:border-violet-500/40"
                }`}
              >
                <span className="font-medium">{role}</span>
              </button>
            ))}
          </div>
        )}

        {/* Next Button */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={step === 1 ? selectedInterests.length === 0 : !selectedRole}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-all"
          >
            {step === 2 ? "Generate My Roadmap" : "Next"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}