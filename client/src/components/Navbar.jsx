import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles,
  LogOut,
  UserCircle2,
  LayoutDashboard,
  House,
  BrainCircuit,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-violet-600 text-white"
        : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
      isActive
        ? "bg-violet-600 text-white"
        : "text-gray-300 hover:bg-[#1e293b] hover:text-white"
    }`;

  return (
    <nav className="bg-[#0f172a] border-b border-white/10 px-6 md:px-10 h-20 flex items-center justify-between relative">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-violet-600 p-2 rounded-xl">
          <Sparkles className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">CareerPilot AI</h1>
          <p className="text-[11px] text-gray-400 -mt-1">
            Smart Career Guidance
          </p>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-3">
        <NavLink to="/" className={navLinkStyle}>
          <House size={16} /> Home
        </NavLink>

        <NavLink to="/career" className={navLinkStyle}>
          <BrainCircuit size={16} /> Career AI
        </NavLink>

        <NavLink to="/dashboard" className={navLinkStyle}>
          <LayoutDashboard size={16} /> Dashboard
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* User / Auth */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              <div className="flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-xl">
                <UserCircle2 size={18} className="text-violet-400" />
                <span className="text-sm text-gray-200">{name}</span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-[#1e293b] text-gray-200 hover:bg-violet-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-xl bg-[#1e293b] text-gray-200 hover:bg-violet-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm px-5 py-2 bg-violet-600 text-white rounded-xl"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0f172a] border-t border-white/10 flex flex-col gap-2 p-4 md:hidden z-50">

          <NavLink to="/" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
            <House size={16} /> Home
          </NavLink>

          <NavLink to="/career" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
            <BrainCircuit size={16} /> Career AI
          </NavLink>

          <NavLink to="/dashboard" className={mobileLinkStyle} onClick={() => setMobileOpen(false)}>
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>

          <hr className="border-white/10 my-2" />

          {token ? (
            <>
              <div className="text-gray-300 px-4 py-2">
                👤 {name}
              </div>

              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="text-left px-4 py-2 text-red-400"
              >
                <LogOut size={16} className="inline mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2">
                Login
              </Link>

              <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-violet-400">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}