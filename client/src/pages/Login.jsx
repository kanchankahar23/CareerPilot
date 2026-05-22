import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://localhost:8000/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      navigate('/skills')
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-xl font-medium mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to your CareerAI account</p>

        {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Email address</label>
            <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Password</label>
            <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
              placeholder="Your password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="w-full bg-violet-700 text-white py-2.5 rounded-lg text-sm hover:bg-violet-800">
            Sign in
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          No account yet? <Link to="/register" className="text-violet-700">Create one</Link>
        </p>
      </div>
    </div>
  )
}