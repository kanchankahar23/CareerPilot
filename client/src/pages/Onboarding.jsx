import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Check } from "lucide-react";

const INTERESTS = [
  { id: "software_dev", label: "💻 Software Development", desc: "Web, Mobile, Backend systems" },
  { id: "ai_ml", label: "🤖 Artificial Intelligence & ML", desc: "LLMs, Deep Learning, Data models" },
  { id: "data_science", label: "📊 Data Science & Analytics", desc: "Data analysis, BI, insights" },
  { id: "cybersecurity", label: "🔐 Cybersecurity", desc: "Ethical hacking, security systems" },
  { id: "cloud", label: "☁️ Cloud Computing", desc: "AWS, Azure, DevOps" },
  { id: "devops", label: "⚙️ DevOps & SRE", desc: "CI/CD, automation, infra" },

  { id: "uiux", label: "🎨 UI/UX Design", desc: "User experience, interfaces" },
  { id: "graphic_design", label: "🖌️ Graphic Design", desc: "Branding, visual design" },
  // { id: "motion_design", label: "🎬 Motion Graphics", desc: "Animation, video design" },



  { id: "healthcare", label: "🏥 Healthcare", desc: "Medical systems, pharma" },
  { id: "nursing", label: "🩺 Nursing & Care", desc: "Patient care, hospitals" },
  { id: "pharma", label: "💊 Pharmacy", desc: "Drugs, medicine research" },

  { id: "education", label: "📚 Education", desc: "Teaching, learning systems" },
  { id: "edtech", label: "🧑‍🏫 EdTech", desc: "Online learning platforms" },

  { id: "game_dev", label: "🎮 Game Development", desc: "Unity, Unreal Engine" },
  { id: "ar_vr", label: "🕶️ AR/VR Development", desc: "Virtual & augmented reality" },

  { id: "robotics", label: "🤖 Robotics", desc: "Automation, machines" },
  { id: "iot", label: "📡 IoT", desc: "Smart devices, sensors" },

  { id: "hr", label: "👥 Human Resources", desc: "Hiring, talent management" },
  { id: "law", label: "⚖️ Law & Legal", desc: "Legal studies, advocacy" },
  { id: "civil_services", label: "🏛️ Civil Services", desc: "UPSC, government jobs" },

  { id: "writing", label: "✍️ Writing & Blogging", desc: "Articles, storytelling" },
  { id: "public_speaking", label: "🎤 Public Speaking", desc: "Communication, leadership" },

  { id: "travel", label: "✈️ Travel & Tourism", desc: "Tourism, hospitality" },
  { id: "sports", label: "⚽ Sports & Fitness", desc: "Athletics, training" },
  { id: "psychology", label: "🧠 Psychology", desc: "Human behavior, mind science" },
];
const EDUCATION_LEVELS = [
  { id: "school_10", label: "School (10th Pass)" },
  { id: "school_12", label: "School (12th Pass / Science / Commerce / Arts)" },
  { id: "diploma", label: "Diploma / Polytechnic" },
  { id: "ug_cs", label: "Undergraduate (CS / IT / Engineering)" },
  { id: "ug_other", label: "Undergraduate (Non-Technical)" },
  { id: "pg_cs", label: "Postgraduate (MCA / M.Tech / CS Related)" },
  { id: "pg_other", label: "Postgraduate (MBA / Arts / Other Fields)" },
  { id: "working_dev", label: "Working Professional (Tech)" },
  { id: "working_nondev", label: "Working Professional (Non-Tech)" },
];

const ROLES = {
  software_dev: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "Software Engineer"
  ],

  ai_ml: [
    "AI Engineer",
    "Machine Learning Engineer",
    "NLP Engineer",
    "Data Scientist",
    "Research Scientist"
  ],

  data_science: [
    "Data Analyst",
    "Data Scientist",
    "BI Analyst",
    "Data Engineer"
  ],

  cybersecurity: [
    "Ethical Hacker",
    "Security Analyst",
    "Penetration Tester",
    "SOC Analyst"
  ],

  cloud: [
    "Cloud Engineer",
    "AWS Engineer",
    "Azure Engineer",
    "DevOps Engineer"
  ],

  devops: [
    "DevOps Engineer",
    "SRE Engineer",
    "Cloud Architect"
  ],

  uiux: [
    "UI Designer",
    "UX Designer",
    "Product Designer"
  ],

  graphic_design: [
    "Graphic Designer",
    "Brand Designer",
    "Visual Designer"
  ],

  motion_design: [
    "Motion Designer",
    "Video Editor",
    "3D Animator"
  ],

  finance: [
    "Financial Analyst",
    "Investment Banker",
    "Risk Analyst"
  ],

  stock_market: [
    "Equity Analyst",
    "Trader",
    "Portfolio Manager"
  ],

  accounting: [
    "Chartered Accountant",
    "Auditor",
    "Tax Consultant"
  ],

  fintech: [
    "FinTech Analyst",
    "Product Manager (FinTech)",
    "Payment Systems Engineer"
  ],

  marketing: [
    "Digital Marketer",
    "SEO Specialist",
    "Performance Marketer"
  ],

  content_creation: [
    "Content Writer",
    "YouTuber",
    "Blogger"
  ],

  social_media: [
    "Social Media Manager",
    "Influencer Manager",
    "Growth Marketer"
  ],

  entrepreneurship: [
    "Startup Founder",
    "Business Owner",
    "Product Founder"
  ],

  startup: [
    "VC Analyst",
    "Startup Consultant",
    "Business Strategist"
  ],

  healthcare: [
    "Doctor",
    "Medical Officer",
    "Healthcare Analyst"
  ],

  nursing: [
    "Nurse",
    "Clinical Assistant",
    "Patient Care Specialist"
  ],

  pharma: [
    "Pharmacist",
    "Drug Researcher",
    "Medical Sales Representative"
  ],

  education: [
    "Teacher",
    "Lecturer",
    "Academic Coordinator"
  ],

  edtech: [
    "EdTech Developer",
    "Instructional Designer",
    "LMS Specialist"
  ],

  game_dev: [
    "Game Developer",
    "Unity Developer",
    "Game Designer"
  ],

  ar_vr: [
    "AR Developer",
    "VR Developer",
    "XR Engineer"
  ],

  robotics: [
    "Robotics Engineer",
    "Automation Engineer"
  ],

  iot: [
    "IoT Engineer",
    "Embedded Systems Engineer"
  ],

  hr: [
    "HR Manager",
    "Talent Acquisition Specialist"
  ],

  law: [
    "Lawyer",
    "Legal Advisor"
  ],

  civil_services: [
    "IAS Officer",
    "IPS Officer",
    "Government Administrator"
  ],

  writing: [
    "Content Writer",
    "Technical Writer",
    "Copywriter"
  ],

  public_speaking: [
    "Motivational Speaker",
    "Trainer",
    "Corporate Speaker"
  ],

  travel: [
    "Travel Consultant",
    "Tour Manager"
  ],

  sports: [
    "Athlete",
    "Fitness Trainer",
    "Sports Coach"
  ],

  psychology: [
    "Psychologist",
    "Counselor",
    "Behavioral Analyst"
  ]
};

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [education, setEducation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  // toggle interest
  
  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // reset role when interests change (IMPORTANT FIX)
  const handleInterestChange = (id) => {
    toggleInterest(id);
    setSelectedRole(""); // reset role
  };

  const availableRoles = selectedInterests.flatMap((i) => ROLES[i] || []);
  const uniqueRoles = [...new Set(availableRoles)];

  const handleNext = () => {
    if (step === 1 && selectedInterests.length > 0) {
      setStep(2);
    } 
    else if (step === 2 && education) {
      setStep(3);
    } 
    else if (step === 3 && selectedRole) {
      localStorage.setItem("cp_interests", JSON.stringify(selectedInterests));
      localStorage.setItem("cp_education", education);
      localStorage.setItem("cp_role", selectedRole);
      navigate("/roadmap");
    }
  };

  return (
    <div className="min-h-screen bg-[#01030a] px-2 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-center mb-4"> <div className="bg-violet-600 p-3 rounded-2xl"> <Sparkles className="text-white" size={24} /> </div> </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-3 leading-tight">
  {step === 1 && "Discover the career paths that match your passion"}
  {step === 2 && "Tell us about your academic background"}
  {step === 3 && "Choose the role you aspire to become"}
</h1>

<p className="text-gray-400 text-center mb-8 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
  {step === 1
    ? "Select the fields and industries that genuinely interest you so we can personalize your learning journey and career roadmap."
    : step === 2
    ? "Your education background helps us recommend the right skills, opportunities, and growth path tailored to your current level."
    : "Pick a target role that aligns with your ambitions and we’ll generate a structured roadmap to help you achieve it."}
</p>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
            {INTERESTS.map((item) => {
              const selected = selectedInterests.includes(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleInterestChange(item.id)}
                  className={`relative p-4 rounded-2xl border text-left transition ${
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

        {/* STEP 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {EDUCATION_LEVELS.map((item) => (
              <button
                key={item.id}
                onClick={() => setEducation(item.id)}
                className={`p-4 rounded-2xl border text-left transition ${
                  education === item.id
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-white/10 bg-[#0f172a] text-gray-300 hover:border-violet-500/40"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {uniqueRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-2xl border text-left transition ${
                  selectedRole === role
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-white/10 bg-[#0f172a] text-gray-300 hover:border-violet-500/40"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && selectedInterests.length === 0) ||
              (step === 2 && !education) ||
              (step === 3 && !selectedRole)
            }
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white px-8 py-3 rounded-xl font-medium"
          >
            {step === 3 ? "Generate Roadmap" : "Next"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}