import { Link } from 'react-router-dom'

const features = [
  { icon: '🗺️', title: 'Career roadmap', desc: 'Step-by-step learning path with timelines tailored to your goal' },
  { icon: '📚', title: 'Curated resources', desc: 'YouTube, docs, and courses picked for each learning step' },
  { icon: '💼', title: 'Job suggestions', desc: 'Roles you can apply for right now based on your current skills' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-xs px-3 py-1 rounded-full mb-6">
          ✨ Powered by AI
        </div>
        <h1 className="text-4xl font-medium leading-tight mb-4">
          Your personalized career roadmap, built by AI
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Enter your skills and where you want to go. Get a step-by-step roadmap, curated resources, and job suggestions instantly.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/register" className="px-6 py-2.5 bg-violet-700 text-white rounded-lg hover:bg-violet-800 text-sm">
            Get started free
          </Link>
          <Link to="/login" className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm">
            Sign in
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto px-4">
        {features.map((f, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-medium text-sm mb-1">{f.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}