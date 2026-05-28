import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles
} from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm CareerPilot AI 🚀 Ask me anything about careers, interviews, roadmap, resume, or tech skills."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg }
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}career-chat`,
        {
          prompt: userMsg
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.response
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong 😅 Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-4">

          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
            <Sparkles size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-white font-semibold text-lg">
              CareerPilot AI
            </h1>

            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-gray-400">
                AI Career Assistant Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-3 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
              )}

              <div
                className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-7 shadow-lg transition-all duration-300 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-md"
                    : "bg-white/5 backdrop-blur-lg border border-white/10 text-gray-200 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>

              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {/* LOADING */}
          {loading && (
            <div className="flex items-end gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-lg px-5 py-4 rounded-3xl rounded-bl-md">
                <Loader2
                  size={20}
                  className="text-violet-400 animate-spin"
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="border-t border-white/10 bg-[#020617]/80 backdrop-blur-xl px-4 py-5">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-violet-500 transition-all">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              placeholder="Ask about career, roadmap, interviews, skills..."
              className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none text-sm"
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 text-white p-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              <Send size={18} />
            </button>

          </div>

          <p className="text-center text-xs text-gray-500 mt-3">
            CareerPilot AI can make mistakes. Verify important career advice.
          </p>

        </div>
      </div>
    </div>
  );
}