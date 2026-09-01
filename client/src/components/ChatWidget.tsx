import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Mail, Phone, ArrowRight, Moon } from "lucide-react";
import { matchIntent, type ChatAction, type Chip } from "../utils/assistant";
import { askAI, type AIChatMessage } from "../utils/aiChat";

type Msg = { from: "bot" | "user"; text: string; action?: ChatAction };

const QUICK_REPLIES = [
  "What services do you offer?",
  "I have a project idea",
  "Do you have open jobs?",
  "Toggle dark mode",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hey! 👋 I'm the Yobby Assistant. Ask me anything — services, pricing, a project idea to scope out, open jobs, articles — or just tell me to switch the site to dark or light mode.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const endRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setUnread(0);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, typing]);

  const goTo = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { from: "user", text };
    const history: AIChatMessage[] = [...messages, userMsg]
      .filter((m) => !m.action || m.from === "user")
      .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

    setMessages((m) => [...m, userMsg]);
    setInput("");

    // 1. Try a deterministic action first — instant, no network call.
    const intent = matchIntent(text);
    if (intent) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { from: "bot", text: intent.text, action: intent.action }]);
        if (!open) setUnread((u) => u + 1);
      }, 350);
      return;
    }

    // 2. Fall back to the real AI for open-ended questions / scoping ideas.
    setTyping(true);
    const reply = await askAI(history);
    setTyping(false);
    setMessages((m) => [...m, { from: "bot", text: reply }]);
    if (!open) setUnread((u) => u + 1);
  };

  const renderAction = (action: ChatAction | undefined) => {
    if (!action) return null;
    if (action.type === "navigate") {
      return (
        <button className="chat-cta-btn" onClick={() => goTo(action.path)}>
          {action.label} <ArrowRight size={13} />
        </button>
      );
    }
    if (action.type === "chips") {
      return (
        <div className="chat-msg-chips">
          {action.chips.map((c: Chip) => (
            <button key={c.path + c.label} onClick={() => goTo(c.path)}>
              {c.label} <ArrowRight size={12} />
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open chat"
      >
        <span className="chat-fab-ring" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && unread > 0 && <span className="chat-fab-badge">{unread}</span>}
      </motion.button>

      {/* PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-header">
              <div className="chat-header-avatar">
                <Sparkles size={16} />
                <span className="chat-live-dot" />
              </div>
              <div>
                <div className="chat-header-title">Yobby Assistant</div>
                <div className="chat-header-sub">Usually replies instantly</div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="chat-body">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "contents" }}>
                  <div className={`chat-bubble chat-${m.from}`}>{m.text}</div>
                  {m.from === "bot" && renderAction(m.action)}
                </motion.div>
              ))}

              {typing && (
                <div className="chat-bubble chat-bot chat-typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && !typing && (
              <div className="chat-quick-replies">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} onClick={() => send(q)}>{q}</button>
                ))}
              </div>
            )}

            <div className="chat-footer-links">
              <button onClick={() => goTo("/products")}>Products</button>
              <button onClick={() => goTo("/services")}>Services</button>
              <button onClick={() => goTo("/request-quote")}>Get a Quote</button>
              <button onClick={() => send("toggle theme")} title="Toggle dark / light mode">
                <Moon size={12} /> Theme
              </button>
            </div>
            <div className="chat-footer-links">
              <button onClick={() => goTo("/contact")}>
                <Mail size={12} /> Contact form
              </button>
              <a href="tel:+254726553481">
                <Phone size={12} /> Call us
              </a>
            </div>

            <form
              className="chat-input-row"
              onSubmit={(e) => { e.preventDefault(); send(input); }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
              />
              <button type="submit" aria-label="Send">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
