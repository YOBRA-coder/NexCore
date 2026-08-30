import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Mail, Phone } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does a project cost?",
  "Do you have open jobs?",
  "Talk to a human",
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (/(price|cost|budget|much)/.test(q)) {
    return "Pricing depends on scope — web projects start from $400, Android apps from $600, and AI/trading systems from $800. Want a tailored quote? I can take you to our project form.";
  }
  if (/(job|career|hiring|apply|work with you|position)/.test(q)) {
    return "We're hiring across Engineering, Mobile, AI, Design, and Trading Systems. Head over to our Careers page to see open roles and apply.";
  }
  if (/(service|offer|do you build|what.*(build|make))/.test(q)) {
    return "We build web & SaaS apps, Android apps, AI/ML systems, trading bots, brand & UI design, cloud/DevOps, and data dashboards. Check the Services page for full details and pricing.";
  }
  if (/(human|agent|person|call|whatsapp|phone)/.test(q)) {
    return "Of course — you can reach our team directly at hello@yobbytech.com or +254 726 553 481. Want me to open the contact form for you?";
  }
  if (/(m-?pesa|payment)/.test(q)) {
    return "Yes, M-Pesa integration is one of our specialties, alongside Stripe and card payments — commonly used in our fintech and e-commerce builds.";
  }
  if (/(time|how long|timeline|deadline)/.test(q)) {
    return "Most projects run 2–6 weeks depending on scope, with weekly demos. Rush timelines are possible — just flag it on the project form.";
  }
  if (/(hi|hello|hey|sasa|habari)/.test(q)) {
    return "Hey there! 👋 I'm the Yobby assistant. Ask me about services, pricing, careers, or timelines — or I can connect you to the team.";
  }
  return "Good question — I'd recommend sending it directly to our team so you get a precise answer. Want me to open the project form, or would you rather email hello@yobbytech.com?";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hey! 👋 I'm the Yobby AI assistant. Ask about services, pricing, timelines, or careers — or I'll connect you with the team." },
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

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply(text) }]);
      if (!open) setUnread((u) => u + 1);
    }, 700 + Math.random() * 500);
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chat-bubble chat-${m.from}`}
                >
                  {m.text}
                </motion.div>
              ))}

              {typing && (
                <div className="chat-bubble chat-bot chat-typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 2 && !typing && (
              <div className="chat-quick-replies">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} onClick={() => send(q)}>{q}</button>
                ))}
              </div>
            )}

            <div className="chat-footer-links">
              <button onClick={() => { navigate("/contact"); setOpen(false); }}>
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
                placeholder="Type a message..."
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
