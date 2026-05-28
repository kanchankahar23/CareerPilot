import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      data: {
        title: "CareerPilot AI 🚀",
        summary:
          "Hi! I am your AI career assistant. Ask me about roadmap, interviews, skills, or projects.",
        points: [],
        steps: [],
        example: ""
      }
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Parse AI response safely
  const parseAIResponse = (text) => {
    try {
      return JSON.parse(text);
    } catch {
      return {
        title: "",
        summary: text,
        points: [],
        steps: [],
        example: ""
      };
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    // user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg }
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}career-chat`,
        { prompt: userMsg }
      );

      const parsed = parseAIResponse(res.data.response);

      // ai message
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          data: parsed
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          data: {
            title: "Error",
            summary: "Something went wrong 😅 Please try again.",
            points: [],
            steps: [],
            example: ""
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">

          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 rounded-2xl">
            <Sparkles size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-white font-semibold text-lg">
              CareerPilot AI
            </h1>
            <p className="text-xs text-gray-400">
              AI Career Assistant 🚀
            </p>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >

              {/* AI ICON */}
              {msg.role === "ai" && (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
              )}

              {/* MESSAGE CARD */}
              <div
                className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-7 shadow-lg ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-md"
                    : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-md"
                }`}
              >

                {/* USER MESSAGE */}
                {msg.role === "user" ? (
                  msg.text
                ) : (
                  <>
                    {msg.data?.title && (
                      <h2 className="text-lg font-bold mb-2 text-white">
                        {msg.data.title}
                      </h2>
                    )}

                    {msg.data?.summary && (
                      <p className="text-gray-300 mb-3">
                        {msg.data.summary}
                      </p>
                    )}

                    {msg.data?.points?.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 mb-3 text-gray-300">
                        {msg.data.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    )}

                    {msg.data?.steps?.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {msg.data.steps.map((s, i) => (
                          <div
                            key={i}
                            className="bg-white/5 p-2 rounded-lg"
                          >
                            {i + 1}. {s}
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.data?.example && (
                      <div className="text-violet-300 text-sm">
                        Example: {msg.data.example}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* USER ICON */}
              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {/* LOADING */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>

              <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-3xl">
                <Loader2 className="text-violet-400 animate-spin" size={20} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t border-white/10 bg-[#020617]/80 px-4 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about roadmap, skills, interviews..."
            className="flex-1 bg-transparent text-white outline-none text-sm"
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 p-3 rounded-xl disabled:opacity-40"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-3">
          CareerPilot AI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}