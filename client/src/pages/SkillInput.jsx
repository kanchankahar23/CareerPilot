import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const QUICK_SKILLS = ['React', 'Python', 'Node.js', 'SQL', 'MongoDB', 'JavaScript', 'TypeScript', 'Django']

export default function SkillInput() {
  const [skills, setSkills] = useState('')
  const [goal, setGoal] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills(prev => prev ? prev + ', ' + skill : skill)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/career/generate`,
        { skills, goal },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      localStorage.setItem('roadmap', JSON.stringify(res.data))
      localStorage.setItem('goal', goal)
      navigate('/dashboard')
    } catch (err) {
      alert('Failed to generate roadmap. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-medium mb-1">Tell us about yourself</h2>
        <p className="text-sm text-gray-500 mb-6">We'll use AI to generate a personalized roadmap for you</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Your current skills</label>
            <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 resize-none h-24"
              placeholder="e.g. HTML, CSS, JavaScript, React basics, Git..."
              value={skills} onChange={e => setSkills(e.target.value)} required />
            <div className="flex flex-wrap gap-2 mt-2">
              {QUICK_SKILLS.map(s => (
                <button type="button" key={s} onClick={() => addSkill(s)}
                  className="text-xs px-3 py-1 bg-violet-50 text-violet-700 rounded-full hover:bg-violet-100">
                  + {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Your career goal</label>
            <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              placeholder="e.g. Become a Full Stack Developer"
              value={goal} onChange={e => setGoal(e.target.value)} required />
          </div>

          <button disabled={loading}
            className="w-full bg-violet-700 text-white py-2.5 rounded-lg text-sm hover:bg-violet-800 disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? (
              <><span className="animate-spin">⏳</span> AI is generating your roadmap...</>
            ) : (
              '✨ Generate my roadmap'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}