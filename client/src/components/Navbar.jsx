import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Sparkles,
  LogOut,
  UserCircle2,
  LayoutDashboard,
  House,
  BrainCircuit,
  Rocket,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

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

  return (
    <nav className="bg-[#0f172a] border-b border-white/10 px-6 md:px-10 h-20 flex items-center justify-between">

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <div className="bg-violet-600 p-2 rounded-xl">
          <Sparkles className="text-white" size={20} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-white">
            CareerPilot AI
          </h1>

          <p className="text-[11px] text-gray-400 -mt-1">
            Smart Career Guidance
          </p>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-3">

        <NavLink
          to="/"
          className={navLinkStyle}
        >
          <House size={16} />
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={navLinkStyle}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        <NavLink
          to="/career"
          className={navLinkStyle}
        >
          <BrainCircuit size={16} />
          Career AI
        </NavLink>

        <NavLink
          to="/skills"
          className={navLinkStyle}
        >
          <Rocket size={16} />
          Roadmap
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {token ? (
          <>
            {/* User */}
            <div className="hidden lg:flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-xl">
              <UserCircle2
                size={18}
                className="text-violet-400"
              />

              <span className="text-sm font-medium text-gray-200">
                {name}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-[#1e293b] text-gray-200 hover:bg-violet-600 transition-all duration-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded-xl bg-[#1e293b] text-gray-200 hover:bg-violet-600 transition"
            >
              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="text-sm px-5 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all duration-300"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}