import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const name = localStorage.getItem('name')

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between sticky top-0 z-10">
      <Link to="/" className="text-lg font-medium flex items-center gap-2">
        🗺️ CareerAI
      </Link>
      <div className="flex items-center gap-2">
        {token ? (
          <>
            <span className="text-sm text-gray-500">Hi, {name}</span>
            <Link to="/skills" className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
              New roadmap
            </Link>
            <button onClick={logout} className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
              Login
            </Link>
            <Link to="/register" className="text-sm px-4 py-1.5 bg-violet-700 text-white rounded-lg hover:bg-violet-800">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}