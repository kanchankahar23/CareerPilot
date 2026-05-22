import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [goal, setGoal] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const roadmap = localStorage.getItem('roadmap')
    if (!roadmap) { navigate('/skills'); return; }
    setData(JSON.parse(roadmap))
    setGoal(localStorage.getItem('goal') || '')
  }, [])

  if (!data) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-1">Your career roadmap</h1>
        <p className="text-sm text-gray-500">Personalized by AI based on your skills and goal</p>
        <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 text-xs px-3 py-1 rounded-full mt-2">
          🎯 {goal}
        </span>
      </div>

      {/* Roadmap */}
      <section className="mb-8">
        <h2 className="font-medium mb-4 flex items-center gap-2">🗺️ Learning roadmap</h2>
        <div className="flex flex-col gap-3">
          {data.roadmap?.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-violet-50 text-violet-700 text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                {step.step}
              </div>
              <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex-1">
                <h3 className="font-medium text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                <span className="inline-block mt-2 text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Gaps */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">⚠️ Skill gaps to close</h2>
        <div className="flex flex-wrap gap-2">
          {data.skill_gaps?.map((gap, i) => (
            <span key={i} className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full">{gap}</span>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">📚 Learning resources</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.resources?.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noreferrer"
              className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition block">
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{r.type}</span>
              <p className="font-medium text-sm mt-2 mb-1">{r.title}</p>
              <p className="text-xs text-violet-600 truncate">{r.url}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section className="mb-8">
        <h2 className="font-medium mb-4">💼 Jobs you can apply for now</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.jobs?.map((job, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
              <h3 className="font-medium text-sm mb-1">{job.title}</h3>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{job.level}</span>
              <div className="flex flex-wrap gap-1 mt-3">
                {job.skills_needed?.map((s, j) => (
                  <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <button onClick={() => navigate('/skills')}
        className="flex items-center gap-2 text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
        🔄 Generate new roadmap
      </button>
    </div>
  )
}