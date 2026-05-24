import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm CareerPilot AI 🚀 Ask me anything about your career, resume, interviews, or skills!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/career-chat", { prompt: userMsg });
      setMessages((prev) => [...prev, { role: "ai", text: res.data.response }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, something went wrong. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="bg-violet-600 p-2 rounded-xl">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold">CareerPilot AI</h1>
            <p className="text-xs text-green-400">● Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-violet-600 text-white rounded-tr-sm"
                  : "bg-[#0f172a] border border-white/10 text-gray-200 rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-[#0f172a] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm">
                <Loader2 size={16} className="text-violet-400 animate-spin" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything about your career..."
            className="flex-1 bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-violet-500 transition"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white p-3 rounded-xl transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}