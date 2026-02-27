import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const initialMessage: Message = {
  role: "assistant",
  content:
    "Hi! I'm an AI assistant trained on my resume, projects, and experience in robotics and ROS. Ask me anything about my work, skills, or background.",
};

const ASSISTANT_API_URL =
  import.meta.env.VITE_ASSISTANT_API_URL ||
  "https://your-vercel-app.vercel.app/api/assistant";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-assistant", handleOpen);
    return () => window.removeEventListener("open-assistant", handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch(ASSISTANT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach AI assistant");
      }

      const data = (await response.json()) as { answer?: string; error?: string };

      if (data.error || !data.answer) {
        throw new Error(data.error || "No answer returned from AI assistant");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer as string },
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "Sorry, the AI assistant is temporarily unavailable. Please try again in a moment."
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I had an issue reaching the AI backend. Please try your question again shortly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-14 px-5 shadow-lg"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Ask AI
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-medium text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Resume & Projects</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`${
                    message.role === "assistant"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-1">
                    {message.role === "assistant" ? "Assistant" : "You"}
                  </span>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              ))}
              {isLoading && (
                <div className="text-muted-foreground">
                  <span className="text-xs font-mono uppercase tracking-wider block mb-1">
                    Assistant
                  </span>
                  <p className="text-sm">...</p>
                </div>
              )}
              {error && (
                <div className="text-xs text-red-500">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, or experience"
                  className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
