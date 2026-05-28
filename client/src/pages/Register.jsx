import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Sparkles,
  User,
  Mail,
  LockKeyhole,
  ArrowRight,
} from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        form
      );

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 overflow-hidden relative">

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-violet-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="bg-violet-600 p-4 rounded-2xl shadow-lg">
            <Sparkles className="text-white" size={28} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-white mb-2">
            Create Account 🚀
          </h2>

          <p className="text-gray-400 text-sm">
            Start your AI-powered career journey today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Full Name
            </label>

            <div className="flex items-center gap-3 bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 focus-within:border-violet-500 transition">

              <User
                size={18}
                className="text-violet-400"
              />

              <input
                type="text"
                placeholder="Kanchan Kahar"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
                className="bg-transparent w-full outline-none text-sm text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Email Address
            </label>

            <div className="flex items-center gap-3 bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 focus-within:border-violet-500 transition">

              <Mail
                size={18}
                className="text-violet-400"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
                className="bg-transparent w-full outline-none text-sm text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">
              Password
            </label>

            <div className="flex items-center gap-3 bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 focus-within:border-violet-500 transition">

              <LockKeyhole
                size={18}
                className="text-violet-400"
              />

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
                className="bg-transparent w-full outline-none text-sm text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
          >
            Create Account
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-400 hover:text-violet-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}