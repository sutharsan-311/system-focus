import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { Terminal, Send, Power, Trash2, PowerOff, Copy } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface Message {
  role: "assistant" | "user";
  content: string;
}

const initialMessage: Message = {
  role: "assistant",
  content:
    "Hi! I'm Eon, Sutharsan's AI assistant. I'm trained on his resume, projects, and experience in robotics and ROS. Ask me anything about his work, skills, or background.",
};

const suggestedPrompts = [
  "What robotics projects have you done?",
  "Tell me about your ROS experience",
  "What skills do you have?",
  "Where are you located?",
];

const ASSISTANT_API_URL =
  import.meta.env.VITE_ASSISTANT_API_URL ||
  "https://your-vercel-app.vercel.app/api/assistant";

const STORAGE_KEY = "ask-ai-chat";

const markdownComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
      {children}
    </a>
  ),
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isBlock = className?.includes("language-");
    return isBlock ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="bg-[#21262d] px-1 rounded text-foreground/90">{children}</code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="my-2 p-3 rounded-lg bg-[#0d1117] border border-border/60 overflow-x-auto text-sm">
      {children}
    </pre>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
  p: ({ children }: { children?: React.ReactNode }) => <p className="my-1">{children}</p>,
};

function loadFromStorage(): { messages: Message[]; isEnabled: boolean } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { messages?: Message[]; isEnabled?: boolean };
    if (!Array.isArray(data.messages) || data.messages.length === 0) return null;
    const isEnabled = typeof data.isEnabled === "boolean" ? data.isEnabled : false;
    return { messages: data.messages, isEnabled };
  } catch {
    return null;
  }
}

function saveToStorage(messages: Message[], isEnabled: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, isEnabled }));
  } catch {
    // ignore
  }
}

export function AIAssistant() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = loadFromStorage();
    return stored ? stored.messages : [initialMessage];
  });
  const [hasHydrated, setHasHydrated] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [dateTime, setDateTime] = useState(() => new Date());
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setIsEnabled(stored.isEnabled);
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    saveToStorage(messages, isEnabled);
  }, [messages, isEnabled, hasHydrated]);

  useEffect(() => {
    const tick = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    if (isEnabled) {
      inputRef.current?.focus();
    }
  }, [isEnabled]);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!isEnabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isEnabled]);

  const handleClearChat = () => {
    setMessages([initialMessage]);
    setInput("");
    setError(null);
    setIsLoading(false);
    saveToStorage([initialMessage], isEnabled);
    toast.success("Chat cleared");
  };

  const handleDisable = () => {
    setIsEnabled(false);
    saveToStorage(messages, false);
  };

  const copyToClipboard = async (text: string) => {
    if (!navigator.clipboard?.writeText) {
      toast.error("Clipboard not available");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const copyAllThread = () => {
    const text = messages
      .map((m) => `${m.role === "user" ? "user" : "Eon"}: ${m.content}`)
      .join("\n\n");
    copyToClipboard(text);
  };

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
    <section
      id="ask-ai"
      className="section-ask-ai py-28 border-t border-border/50"
      role="region"
      aria-labelledby="ask-ai-heading"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <h2
                id="ask-ai-heading"
                className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
              >
                Ask AI
              </h2>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
              <span className={`w-1.5 h-1.5 rounded-full bg-primary ${prefersReducedMotion ? "" : "animate-pulse"}`} />
              RAG-powered
            </span>
          </div>
          <p className="text-muted-foreground mb-10 max-w-2xl text-base leading-relaxed">
            Enable the terminal below to chat with an AI trained on my resume,
            projects, and experience.
          </p>

          {/* Terminal-style box with glow */}
          <div className="relative rounded-[1rem] md:rounded-[1.25rem] border-[0.75px] border-border p-2 md:p-3">
            <GlowingEffect
              spread={36}
              glow={true}
              disabled={isTouchDevice}
              proximity={56}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <div className={`relative rounded-xl overflow-hidden border border-border/70 bg-[#080c10] shadow-2xl shadow-black/60 ring-1 ring-white/[0.03] ${isEnabled ? "terminal-glow" : ""}`}>
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d1117] border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90" />
                </div>
                <div className="flex-1 flex justify-center items-center gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground/80 flex items-center gap-2 tracking-widest uppercase">
                    <Terminal className="w-3 h-3 text-primary/70" />
                    ask-ai — Resume & Projects
                  </span>
                  {isEnabled && (
                    <>
                      <span className="text-[10px] font-mono flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30">
                        <span className={`w-1.5 h-1.5 rounded-full bg-[#3fb950] ${prefersReducedMotion ? "" : "live-dot"}`} />
                        LIVE
                      </span>
                      <button
                        type="button"
                        onClick={handleClearChat}
                        aria-label="Clear chat"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={copyAllThread}
                        aria-label="Copy thread"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDisable}
                        aria-label="Disable chat"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <PowerOff className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/60 tabular-nums shrink-0">
                  <span className="hidden sm:inline">
                    {dateTime.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    <span className="mx-1 text-muted-foreground/40">·</span>
                  </span>
                  {dateTime.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
                </span>
              </div>

              {/* Terminal body */}
              <div className={`terminal-body relative min-h-[300px] max-h-[440px] flex flex-col font-mono text-[13px] bg-[#0b0f14] overflow-hidden ${isEnabled ? "terminal-body-active" : ""}`}>
                {isEnabled && (
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.12)_100%)] z-[3]" aria-hidden />
                )}
                <div className="relative z-[2] flex flex-col flex-1 min-h-0">
                {!isEnabled ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-muted-foreground">
                    <p className="text-foreground/80 font-medium mb-1">
                      <span className="text-[#58a6ff]">$</span> chat disabled
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-8">
                      Click below to enable and start asking questions
                    </p>
                    <GradientButton
                      variant="variant"
                      onClick={() => setIsEnabled(true)}
                      className="font-mono min-w-[140px] px-5 py-2.5 text-sm"
                    >
                      <Power className="w-3.5 h-3.5 mr-2" />
                      Enable chat
                    </GradientButton>
                  </div>
                ) : (
                <>
                  {/* Chat output */}
                  <div
                    ref={messagesContainerRef}
                    className="terminal-scroll flex-1 overflow-y-auto px-5 py-4 space-y-1"
                  >
                    {messages.map((message, i) => (
                      <motion.div
                        key={i}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.15 }}
                        className={`group py-3 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] transition-colors ${i === messages.length - 1 && message.role === "assistant" ? "message-glow" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest block mb-1">
                              {message.role === "user" ? "user" : "Eon"}
                            </span>
                            <span className="text-foreground/95 leading-[1.6] block break-words">
                              {message.role === "user" ? (
                                <>
                                  <span className="text-[#58a6ff]">$</span>{" "}
                                  {message.content}
                                </>
                              ) : (
                                <>
                                  <span className="text-[#3fb950]">&gt;</span>{" "}
                                  <div className="markdown-content [&_p]:my-0.5 [&_pre]:my-2 [&_ul]:my-1.5 [&_ol]:my-1.5 [&_li]:leading-relaxed">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                      {message.content}
                                    </ReactMarkdown>
                                  </div>
                                </>
                              )}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(message.content)}
                            aria-label="Copy message"
                            className="shrink-0 p-1 rounded text-muted-foreground/60 opacity-0 group-hover:opacity-100 hover:text-foreground/80 transition-opacity"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    <AnimatePresence>
                      {isLoading && (
                        <motion.div
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="py-3 border-b border-white/[0.06] processing-shimmer"
                        >
                          <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest block mb-1">Eon</span>
                          <span className="text-[#3fb950]">&gt;</span>{" "}
                          <span className="inline-flex gap-1 items-center">
                            <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                            <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                            <span className="typing-dot w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400/80 text-xs py-2"
                      >
                        {error}
                      </motion.div>
                    )}
                  </div>

                  {/* Suggested prompts */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                      {suggestedPrompts.map((prompt, i) => (
                        <motion.button
                          key={i}
                          type="button"
                          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04, duration: 0.18 }}
                          onClick={() => {
                            setInput(prompt);
                            inputRef.current?.focus();
                          }}
                          whileHover={!prefersReducedMotion ? { scale: 1.01 } : {}}
                          whileTap={!prefersReducedMotion ? { scale: 0.99 } : {}}
                          className="text-[11px] font-mono px-2.5 py-1.5 rounded-md bg-white/5 text-muted-foreground/90 hover:text-foreground hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
                        >
                          {prompt}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Input line */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-[#0d1117]/80"
                  >
                    <span className="text-[#58a6ff] shrink-0">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          (e.target as HTMLInputElement).form?.requestSubmit();
                        }
                      }}
                      placeholder="Ask about projects, skills, or experience..."
                      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-[13px] py-1.5 placeholder:font-normal border-b border-transparent focus:border-[#58a6ff]/40 transition-colors"
                      aria-label="Chat input"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      aria-label="Send message"
                      className="shrink-0 h-8 w-8 rounded flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed text-muted-foreground hover:text-[#58a6ff] hover:bg-white/5 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </>
              )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
