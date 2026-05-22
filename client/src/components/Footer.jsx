import { GitBranch, Link2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowUpRight,Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#020617] overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl">
                <Sparkles size={20} className="text-white" />
              </div> */}

              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  CareerPilot AI
                </h2>

                <p className="text-xs text-gray-500">
                  Smart Career Guidance
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-powered career guidance platform helping students
              discover learning paths, prepare for interviews,
              and grow their careers with confidence 🚀
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">

              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-violet-600/20 hover:border-violet-500/30 transition"
              >
                <GitBranch size={18} className="text-gray-300" />
              </a>

              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-violet-600/20 hover:border-violet-500/30 transition"
              >
                <Link2 size={18} className="text-gray-300" />
              </a>

              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-violet-600/20 hover:border-violet-500/30 transition"
              >
                <X size={18} className="text-gray-300" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Product
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">

              <li>
                <Link
                  to="/skills"
                  className="hover:text-violet-300 transition"
                >
                  Career Roadmap
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-violet-300 transition"
                >
                  AI Career Assistant
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-violet-300 transition"
                >
                  Resume Analyzer
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="hover:text-violet-300 transition"
                >
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="#"
                  className="hover:text-violet-300 transition flex items-center gap-1"
                >
                  Learning Paths
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-violet-300 transition flex items-center gap-1"
                >
                  Career Blogs
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-violet-300 transition flex items-center gap-1"
                >
                  AI Guidance
                  <ArrowUpRight size={14} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-violet-300 transition flex items-center gap-1"
                >
                  Tech Community
                  <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-400 mb-5">
              Get career tips, AI updates, and learning resources directly in your inbox.
            </p>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 text-sm text-white outline-none flex-1"
              />

              <button className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 hover:opacity-90 transition">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">

          <p className="text-sm text-gray-500">
            © 2026 CareerPilot AI. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">

            <Link
              to="/"
              className="hover:text-violet-300 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="hover:text-violet-300 transition"
            >
              Terms of Service
            </Link>

            <Link
              to="/"
              className="hover:text-violet-300 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}