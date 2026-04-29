import { useState, useEffect, useRef, useCallback } from "react";

// ─── TYPES ────────────────────────────────────────────────────
type Page = "home" | "dashboard" | "services" | "products" | "articles" | "about" | "contact";

interface Project {
  id: string; name: string; category: string; status: "live" | "beta" | "dev";
  tagline: string; description: string; stats: { label: string; value: string }[];
  tags: string[]; accent: string; icon: string; gradient: string;
}
interface Service {
  icon: string; title: string; subtitle: string; description: string;
  features: string[]; accent: string; price: string;
}
interface Article {
  id: string; title: string; excerpt: string; category: string;
  date: string; readTime: string; featured: boolean; accent: string;
}

// ─── DATA ─────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: "forexpro", name: "ForexPro Platform", category: "Forex · FinTech", status: "live", tagline: "Professional-grade trading intelligence", description: "Full-stack forex trading platform with AI signal engine, copy trading, education hub, and journal. 28 API endpoints, 7+ indicators, real-time data.", stats: [{ label: "API Endpoints", value: "28" }, { label: "Indicators", value: "7+" }, { label: "Pairs", value: "50+" }, { label: "Uptime", value: "99.8%" }], tags: ["Python", "FastAPI", "React", "SQLite", "RSI", "MACD"], accent: "#00e5b4", icon: "₣", gradient: "135deg, rgba(0,229,180,0.06) 0%, rgba(0,200,150,0.03) 100%" },
  { id: "cryptobot", name: "CryptoBot Engine", category: "Crypto · Automation", status: "live", tagline: "Autonomous market execution", description: "Node.js trading bot with AI confidence scoring, real-time WebSocket feeds, multi-strategy execution, and live candlestick dashboard.", stats: [{ label: "Strategies", value: "5" }, { label: "Exchange", value: "Binance" }, { label: "Signals/hr", value: "12+" }, { label: "Latency", value: "<50ms" }], tags: ["Node.js", "WebSocket", "Chart.js", "JWT", "AI"], accent: "#f5a623", icon: "₿", gradient: "135deg, rgba(245,166,35,0.06) 0%, rgba(232,146,0,0.03) 100%" },
  { id: "signals", name: "Signal Intelligence", category: "Multi-Asset · AI/ML", status: "beta", tagline: "Multi-asset signal aggregation", description: "ML-powered signal aggregation across forex and crypto. Combines technicals, sentiment scoring, and LSTM models for high-confidence setups.", stats: [{ label: "Accuracy", value: "74%" }, { label: "Assets", value: "120+" }, { label: "Models", value: "3" }, { label: "Alerts/day", value: "40+" }], tags: ["TensorFlow", "Python", "NLP", "LSTM"], accent: "#a855f7", icon: "⚡", gradient: "135deg, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.03) 100%" },
  { id: "riskengine", name: "RiskGuard Engine", category: "Portfolio · Risk", status: "dev", tagline: "Real-time portfolio protection", description: "Dynamic position sizing, drawdown controls, correlation analysis, and automated hedging protocols for professional portfolio managers.", stats: [{ label: "Risk Models", value: "6" }, { label: "Drawdown", value: "Custom" }, { label: "Latency", value: "<5ms" }, { label: "Pairs", value: "All" }], tags: ["Python", "Risk Mgmt", "Hedging", "Portfolio"], accent: "#ef4444", icon: "🛡", gradient: "135deg, rgba(239,68,68,0.06) 0%, rgba(220,38,38,0.03) 100%" },
  { id: "nexweb", name: "NexStore Builder", category: "Web · E-Commerce", status: "beta", tagline: "Full e-commerce in 48 hours", description: "Rapid deployment web platform for SMEs in East Africa. React + Node.js storefront with M-Pesa payments, inventory, and analytics.", stats: [{ label: "Deploy Time", value: "48hr" }, { label: "Payment", value: "M-Pesa" }, { label: "Templates", value: "12" }, { label: "Clients", value: "8" }], tags: ["React", "Node.js", "M-Pesa", "PostgreSQL"], accent: "#0ea5e9", icon: "🛒", gradient: "135deg, rgba(14,165,233,0.06) 0%, rgba(2,132,199,0.03) 100%" },
  { id: "nexai", name: "NexAI Assistant", category: "AI · SaaS", status: "dev", tagline: "Custom AI for your business", description: "White-label AI assistant platform. Train on your business data, deploy as chatbot, email responder, or document analyst.", stats: [{ label: "API", value: "REST" }, { label: "Models", value: "Claude+GPT" }, { label: "Languages", value: "10+" }, { label: "Uptime", value: "99.9%" }], tags: ["Claude API", "OpenAI", "RAG", "Fine-tuning"], accent: "#ec4899", icon: "🧠", gradient: "135deg, rgba(236,72,153,0.06) 0%, rgba(190,24,93,0.03) 100%" }
];

const SERVICES: Service[] = [
  { icon: "🌐", title: "Web Development", subtitle: "Full-Stack · SaaS · E-Commerce", description: "From landing pages to enterprise SaaS. We architect, design, and deploy web applications that scale.", features: ["React / Next.js / Vue frontends", "FastAPI · Node.js backends", "PostgreSQL · Redis databases", "Cloud deployment & CI/CD", "Performance optimization"], accent: "#0ea5e9", price: "From $400" },
  { icon: "📱", title: "Android Development", subtitle: "Native · Cross-Platform · Kotlin", description: "Native Android apps and cross-platform solutions. From MVP to Play Store launch with clean architecture.", features: ["Kotlin / Jetpack Compose", "Flutter cross-platform", "Google Play publishing", "Firebase integration", "Offline-first architecture"], accent: "#22c55e", price: "From $600" },
  { icon: "🧠", title: "AI & Machine Learning", subtitle: "LLMs · Computer Vision · NLP", description: "Integrate intelligence into your products. Custom ML models, AI pipelines, and LLM-powered applications.", features: ["Custom LLM fine-tuning", "Computer vision systems", "NLP & sentiment analysis", "RAG pipelines & chatbots", "Prediction model APIs"], accent: "#a855f7", price: "From $800" },
  { icon: "⚡", title: "Trading Bot Systems", subtitle: "Forex · Crypto · Equities", description: "Production-grade algorithmic trading. Signal engines, execution bots, risk controls — for live markets.", features: ["Multi-exchange execution", "Signal-based automation", "Risk management layers", "MT5 / Binance APIs", "Backtesting & optimization"], accent: "#00e5b4", price: "From $800" },
  { icon: "🎨", title: "UI/UX & Graphic Design", subtitle: "Brand Identity · Motion · Print", description: "Design that converts. Brand identities, product UX, motion graphics, and marketing collateral.", features: ["Brand identity systems", "UI/UX for web & mobile", "Motion graphics & animation", "Social media design kits", "Pitch deck design"], accent: "#f5a623", price: "From $200" },
  { icon: "🛡", title: "Risk & Signal Systems", subtitle: "Portfolio · Signals · Analytics", description: "Enterprise-grade risk infrastructure and signal APIs. Real-time portfolio protection and trading intelligence.", features: ["Dynamic position sizing", "Portfolio correlation engine", "Real-time P&L tracking", "Signal API delivery", "Telegram / Email alerts"], accent: "#ef4444", price: "From $500" },
  { icon: "☁️", title: "Cloud & DevOps", subtitle: "AWS · GCP · Docker · CI/CD", description: "Deploy, monitor, and maintain your infrastructure. Focus on building while we keep the lights on.", features: ["AWS / GCP architecture", "Docker containerization", "CI/CD pipeline setup", "Monitoring & alerting", "99.9% uptime SLAs"], accent: "#6366f1", price: "From $300" },
  { icon: "📊", title: "Data & Analytics", subtitle: "Dashboards · ETL · Reporting", description: "Turn raw data into actionable intelligence. Custom dashboards, ETL pipelines, and automated reporting.", features: ["BI dashboard development", "ETL pipeline design", "Real-time analytics APIs", "Automated reports", "Data visualization"], accent: "#ec4899", price: "From $350" }
];

const ARTICLES: Article[] = [
  { id: "1", title: "Building a Production Forex Signal Engine with FastAPI", excerpt: "Architecting a scalable signal engine with RSI, MACD, Bollinger Bands — from data ingestion to real-time frontend delivery.", category: "Engineering", date: "Mar 15, 2026", readTime: "12 min", featured: true, accent: "#00e5b4" },
  { id: "2", title: "WebSocket Architecture for Real-Time Crypto Dashboards", excerpt: "Sub-100ms latency price feeds with Node.js WebSockets, fallback mock data, and Chart.js candlestick rendering.", category: "Architecture", date: "Mar 10, 2026", readTime: "9 min", featured: true, accent: "#f5a623" },
  { id: "3", title: "AI Confidence Scoring in Automated Trading Bots", excerpt: "Multi-factor confidence scoring for trade signals, reducing false positives by 34% in live backtests.", category: "AI/ML", date: "Mar 5, 2026", readTime: "8 min", featured: false, accent: "#a855f7" },
  { id: "4", title: "How We Built a Cross-Platform Android App in 6 Weeks", excerpt: "Flutter architecture, state management, Firebase integration, and going from MVP to Play Store in record time.", category: "Mobile", date: "Feb 28, 2026", readTime: "10 min", featured: false, accent: "#22c55e" },
  { id: "5", title: "Designing Brand Identity Systems for Startups in 2026", excerpt: "A practical guide to cohesive visual identities — typography, color systems, logo variants, and motion principles.", category: "Design", date: "Feb 20, 2026", readTime: "7 min", featured: false, accent: "#f5a623" },
  { id: "6", title: "RAG Pipelines: Building Custom LLM Apps on Your Own Data", excerpt: "From document ingestion to query-time retrieval — how we build production RAG systems for enterprise clients.", category: "AI/ML", date: "Feb 12, 2026", readTime: "11 min", featured: false, accent: "#ec4899" }
];

const STACK = ["React · TypeScript","Python · FastAPI","Node.js · Express","Kotlin · Flutter","TensorFlow · PyTorch","PostgreSQL · Redis","AWS · GCP · Docker","Figma · After Effects","Claude API · OpenAI","WebSocket · REST","M-Pesa · Stripe","Binance · Twelve Data"];

// ─── GLOBAL CSS ───────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#05060f;--bg2:#080a18;--bg3:#0c0e22;
  --s:rgba(255,255,255,0.028);--sh:rgba(255,255,255,0.052);
  --b:rgba(255,255,255,0.07);--ba:rgba(139,92,246,0.22);
  --t:#ffffff;--t2:rgba(255,255,255,0.6);--t3:rgba(255,255,255,0.32);
  --v:#7c3aed;--v2:#a855f7;--teal:#00e5b4;--gold:#f5a623;
  --fd:'Clash Display',sans-serif;--fb:'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--t);font-family:var(--fb);overflow-x:hidden}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.28);border-radius:99px}
::selection{background:rgba(139,92,246,0.3);color:#fff}
::placeholder{color:rgba(255,255,255,0.18)!important}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(1.5deg)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse2{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.4}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes scanUp{0%{top:100%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:-10%;opacity:0}}
.au{animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both}
.au1{animation:fadeUp .65s .1s cubic-bezier(.22,1,.36,1) both}
.au2{animation:fadeUp .65s .22s cubic-bezier(.22,1,.36,1) both}
.au3{animation:fadeUp .65s .36s cubic-bezier(.22,1,.36,1) both}
.au4{animation:fadeUp .65s .52s cubic-bezier(.22,1,.36,1) both}
.gtext{background:linear-gradient(130deg,#c084fc 0%,#7c3aed 45%,#00e5b4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gtext-gold{background:linear-gradient(130deg,#f5a623 0%,#ffd166 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.btn-p{background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;cursor:pointer;color:#fff;font-family:var(--fb);font-weight:700;font-size:14px;padding:12px 26px;border-radius:10px;transition:all .25s;position:relative;overflow:hidden;letter-spacing:.01em}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(124,58,237,.42)}
.btn-g{background:transparent;border:1px solid var(--b);cursor:pointer;color:var(--t2);font-family:var(--fb);font-weight:500;font-size:14px;padding:11px 22px;border-radius:10px;transition:all .25s}
.btn-g:hover{border-color:rgba(139,92,246,.35);color:#fff;background:rgba(139,92,246,.06)}
.chip{display:inline-flex;align-items:center;gap:7px;background:rgba(139,92,246,.07);border:1px solid rgba(139,92,246,.18);border-radius:99px;padding:5px 15px;font-family:var(--fm);font-size:11px;color:#a855f7;letter-spacing:.07em;text-transform:uppercase}
.sdot{width:6px;height:6px;border-radius:50%;display:inline-block;position:relative;flex-shrink:0}
.sdot::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid currentColor;animation:pulse2 2.2s infinite}
.card{background:var(--s);border:1px solid var(--b);border-radius:20px;transition:all .3s cubic-bezier(.22,1,.36,1)}
.card:hover{background:var(--sh);transform:translateY(-5px)}
.ticker-wrap{overflow:hidden;white-space:nowrap}
.ticker-inner{display:inline-flex;animation:ticker 28s linear infinite;width:max-content}
.ticker-inner:hover{animation-play-state:paused}
.noise{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.mesh{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.mesh::before{content:'';position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 68%);top:-250px;left:-200px}
.mesh::after{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,180,.07) 0%,transparent 68%);bottom:-150px;right:-100px}
.grid-bg{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(139,92,246,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.035) 1px,transparent 1px);background-size:68px 68px}
input,textarea,select{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--b);border-radius:10px;padding:12px 15px;color:var(--t);font-family:var(--fb);font-size:14px;outline:none;transition:border-color .2s}
input:focus,textarea:focus,select:focus{border-color:rgba(139,92,246,.45)}
select option{background:#0c0e22;color:#fff}
textarea{resize:vertical}
@media(max-width:900px){
  .hm{display:none!important}
  .g2{grid-template-columns:1fr!important}
  .g3{grid-template-columns:1fr!important}
  .g4{grid-template-columns:1fr 1fr!important}
  .mmb{display:flex!important}
}
`;

// ─── UTILS ────────────────────────────────────────────────────
const statusMeta = (s: string) => ({ live: { l: "Live", c: "#00e5b4" }, beta: { l: "Beta", c: "#f5a623" }, dev: { l: "In Dev", c: "#6366f1" } }[s] || { l: s, c: "#888" });

function useCounter(target: number) {
  const [val, setVal] = useState(0);
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let v = 0; const step = target / (1800 / 16);
    const t = setInterval(() => { v = Math.min(v + step, target); setVal(Math.floor(v)); if (v >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [go, target]);
  return { val, ref };
}

// ─── NAV ──────────────────────────────────────────────────────
function Nav({ pg, go }: { pg: Page; go: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links: [string, Page][] = [["Home","home"],["Dashboard","dashboard"],["Services","services"],["Products","products"],["Articles","articles"],["About","about"],["Contact","contact"]];
  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:900,background:scrolled?"rgba(5,6,15,0.9)":"transparent",backdropFilter:scrolled?"blur(22px)":"none",borderBottom:scrolled?"1px solid rgba(139,92,246,0.1)":"none",transition:"all .4s",padding:"0 1.5rem" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68 }}>
          <div onClick={() => { go("home"); setMob(false); }} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:11,userSelect:"none" }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontWeight:700,fontSize:17,color:"#fff",boxShadow:"0 0 18px rgba(124,58,237,.5)" }}>N</div>
            <span style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:19,color:"#fff" }}>Nex<span className="gtext">Core</span></span>
          </div>
          <div className="hm" style={{ display:"flex",gap:2 }}>
            {links.map(([l,p]) => (
              <button key={p} onClick={() => go(p)} style={{ background:"none",border:"none",cursor:"pointer",color:pg===p?"#a855f7":"var(--t2)",fontFamily:"var(--fb)",fontWeight:500,fontSize:13.5,padding:"7px 13px",borderRadius:8,transition:"color .2s",position:"relative" }}>
                {l}
                {pg===p && <span style={{ position:"absolute",bottom:2,left:"50%",transform:"translateX(-50%)",width:14,height:2,borderRadius:2,background:"linear-gradient(90deg,#7c3aed,#a855f7)" }} />}
              </button>
            ))}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <button onClick={() => go("contact")} className="btn-p hm" style={{ fontSize:13,padding:"9px 20px" }}>Start a Project →</button>
            <button onClick={() => setMob(!mob)} className="mmb" style={{ display:"none",background:"var(--s)",border:"1px solid var(--b)",borderRadius:8,padding:"9px 13px",cursor:"pointer",color:"var(--t2)",fontFamily:"var(--fm)",fontSize:14 }}>☰</button>
          </div>
        </div>
      </nav>
      {mob && (
        <div style={{ position:"fixed",top:68,left:0,right:0,bottom:0,zIndex:899,background:"rgba(5,6,15,.97)",backdropFilter:"blur(22px)",display:"flex",flexDirection:"column",padding:"2rem 1.5rem",gap:6 }}>
          {links.map(([l,p]) => (
            <button key={p} onClick={() => { go(p); setMob(false); }} style={{ background:pg===p?"rgba(139,92,246,.1)":"transparent",border:`1px solid ${pg===p?"rgba(139,92,246,.25)":"transparent"}`,cursor:"pointer",color:pg===p?"#a855f7":"var(--t2)",fontFamily:"var(--fb)",fontWeight:500,fontSize:16,padding:"14px 18px",borderRadius:10,textAlign:"left" }}>{l}</button>
          ))}
          <button onClick={() => { go("contact"); setMob(false); }} className="btn-p" style={{ marginTop:16 }}>Start a Project →</button>
        </div>
      )}
    </>
  );
}

// ─── HOME ─────────────────────────────────────────────────────
function HomePage({ go }: { go: (p: Page) => void }) {
  const [mx, setMx] = useState(50); const [my, setMy] = useState(50);
  const heroRef = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    setMx(((e.clientX - r.left) / r.width) * 100);
    setMy(((e.clientY - r.top) / r.height) * 100);
  }, []);
  const c1 = useCounter(12); const c2 = useCounter(47); const c3 = useCounter(99); const c4 = useCounter(8);
  const cats = [
    { icon:"🌐", label:"Web & SaaS", color:"#0ea5e9" },
    { icon:"📱", label:"Android Apps", color:"#22c55e" },
    { icon:"🧠", label:"AI & ML", color:"#a855f7" },
    { icon:"⚡", label:"Trading Bots", color:"#00e5b4" },
    { icon:"🎨", label:"Design", color:"#f5a623" },
    { icon:"☁️", label:"Cloud", color:"#6366f1" }
  ];

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} onMouseMove={onMove} style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:"var(--bg)",paddingTop:68 }}>
        <div className="mesh" />
        <div className="grid-bg" />
        {/* mouse spotlight */}
        <div style={{ position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(750px circle at ${mx}% ${my}%, rgba(124,58,237,.065) 0%, transparent 60%)`, transition:"background .08s" }} />
        {/* orbs */}
        {[[280,"8%","62%","rgba(124,58,237,.08)","0s"],[180,"58%","76%","rgba(0,229,180,.06)","2.5s"],[120,"72%","18%","rgba(245,166,35,.05)","5s"]].map(([s,t,l,c,d],i) => (
          <div key={i} style={{ position:"absolute",width:s as number,height:s as number,borderRadius:"50%",background:`radial-gradient(circle,${c} 0%,transparent 70%)`,top:t as string,left:l as string,animation:`float 9s ${d} ease-in-out infinite`,pointerEvents:"none" }} />
        ))}
        <div style={{ maxWidth:1320,margin:"0 auto",padding:"4rem 1.5rem",position:"relative",width:"100%" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1.15fr .85fr",gap:"4rem",alignItems:"center" }} className="g2">
            {/* LEFT */}
            <div>
              <div className="chip au" style={{ marginBottom:"1.5rem" }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:"#a855f7",boxShadow:"0 0 7px #a855f7",animation:"pulse2 2s infinite" }} />
                We don't just build — we solve
              </div>
              <h1 className="au1" style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2.5rem,5.5vw,4.5rem)",lineHeight:1.05,letterSpacing:"-.025em",color:"#fff",marginBottom:"1.5rem" }}>
                Software &<br />
                <span className="gtext">Digital Solutions</span><br />
                <span style={{ fontFamily:"var(--fd)",fontWeight:400,fontSize:".72em",color:"var(--t2)" }}>that actually work</span>
              </h1>
              <p className="au2" style={{ fontFamily:"var(--fb)",fontSize:17,lineHeight:1.78,color:"var(--t2)",maxWidth:490,marginBottom:"2.5rem" }}>
                NexCore builds web apps, Android apps, AI systems, trading bots, brand identities, and cloud infrastructure — for startups, traders, and businesses across Africa and beyond.
              </p>
              <div className="au3" style={{ display:"flex",gap:11,flexWrap:"wrap",marginBottom:"3rem" }}>
                <button onClick={() => go("services")} className="btn-p" style={{ fontSize:15,padding:"13px 28px" }}>Explore Services →</button>
                <button onClick={() => go("products")} className="btn-g" style={{ fontSize:15 }}>View Our Work</button>
              </div>
              {/* counters */}
              <div className="au4" style={{ display:"flex",gap:"2.2rem",flexWrap:"wrap" }}>
                {[{ r:c1.ref,v:c1.val,s:"+",l:"Projects Built" },{ r:c2.ref,v:c2.val,s:"+",l:"Clients Served" },{ r:c3.ref,v:c3.val,s:"%",l:"Uptime SLA" },{ r:c4.ref,v:c4.val,s:" yrs",l:"Experience" }].map((s,i) => (
                  <div key={i} ref={s.r}>
                    <div style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:29,lineHeight:1,background:"linear-gradient(135deg,#fff,rgba(255,255,255,.65))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{s.v}{s.s}</div>
                    <div style={{ fontFamily:"var(--fb)",fontSize:11.5,color:"var(--t3)",marginTop:5 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* RIGHT — orbit */}
            <div className="hm au2" style={{ position:"relative",display:"flex",alignItems:"center",justifyContent:"center",height:440 }}>
              <div style={{ position:"relative",width:340,height:340 }}>
                {/* rings */}
                {[180,240,300].map((r,i) => (
                  <div key={r} style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:r,height:r,borderRadius:"50%",border:`1px solid rgba(139,92,246,${0.1-i*.025})`,animation:`spin ${20+i*10}s linear infinite ${i%2?"reverse":""}` }} />
                ))}
                {/* hub */}
                <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:96,height:96,borderRadius:"50%",background:"linear-gradient(135deg,rgba(124,58,237,.2),rgba(168,85,247,.12))",border:"1.5px solid rgba(139,92,246,.3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:5,boxShadow:"0 0 50px rgba(124,58,237,.2)" }}>
                  <span style={{ fontFamily:"var(--fd)",fontSize:13,fontWeight:700,color:"#a855f7" }}>Nex</span>
                  <span style={{ fontFamily:"var(--fd)",fontSize:13,fontWeight:700,color:"#00e5b4" }}>Core</span>
                </div>
                {/* orbit icons */}
                {cats.map((cat,i) => {
                  const a = (i/cats.length)*2*Math.PI - Math.PI/2;
                  const rx = Math.cos(a)*152, ry = Math.sin(a)*152;
                  return (
                    <div key={cat.label} style={{ position:"absolute",left:`calc(50% + ${rx}px - 32px)`,top:`calc(50% + ${ry}px - 32px)`,width:64,height:64,borderRadius:15,background:"var(--bg3)",border:`1px solid ${cat.color}22`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,boxShadow:"0 6px 24px rgba(0,0,0,.4)",transition:"all .3s",cursor:"pointer" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color+"66"; (e.currentTarget as HTMLElement).style.transform = "scale(1.12)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color+"22"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    >
                      <span style={{ fontSize:20 }}>{cat.icon}</span>
                      <span style={{ fontFamily:"var(--fb)",fontSize:8,color:"var(--t3)",textAlign:"center",fontWeight:500 }}>{cat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:"linear-gradient(90deg,var(--bg2),rgba(124,58,237,.04),var(--bg2))",borderTop:"1px solid rgba(139,92,246,.1)",borderBottom:"1px solid rgba(139,92,246,.1)",padding:"13px 0",overflow:"hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...STACK,...STACK].map((item,i) => (
              <span key={i} style={{ fontFamily:"var(--fm)",fontSize:12,color:"var(--t3)",letterSpacing:".06em",whiteSpace:"nowrap",padding:"0 2rem",display:"flex",alignItems:"center",gap:".75rem" }}>
                <span style={{ color:"#a855f7",opacity:.5 }}>◆</span>{item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT WE DO */}
      <section style={{ padding:"7rem 1.5rem",background:"var(--bg)",position:"relative" }}>
        <div className="mesh" /><div className="grid-bg" />
        <div style={{ maxWidth:1320,margin:"0 auto",position:"relative" }}>
          <div style={{ textAlign:"center",marginBottom:"4rem" }}>
            <div className="chip" style={{ margin:"0 auto 1.5rem" }}>Our Expertise</div>
            <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(1.9rem,3.5vw,3rem)",color:"#fff",letterSpacing:"-.02em" }}>
              One studio. <span className="gtext">Every layer.</span>
            </h2>
            <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:16,marginTop:14,maxWidth:500,margin:"14px auto 0" }}>
              Web, mobile, AI, trading, design, cloud — we cover the full stack so you don't have to manage 5 different vendors.
            </p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"2.5rem" }} className="g4">
            {SERVICES.map(svc => (
              <div key={svc.title} className="card" onClick={() => go("services")} style={{ padding:"1.6rem",cursor:"pointer" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = svc.accent+"44"; el.style.boxShadow = `0 14px 50px ${svc.accent}14`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--b)"; el.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize:30,marginBottom:"1rem" }}>{svc.icon}</div>
                <div style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:14.5,marginBottom:5 }}>{svc.title}</div>
                <div style={{ fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)",letterSpacing:".05em",marginBottom:"0.75rem" }}>{svc.subtitle}</div>
                <div style={{ fontFamily:"var(--fb)",fontWeight:700,fontSize:13,color:svc.accent }}>{svc.price}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={() => go("services")} className="btn-g">View All Services + Pricing →</button>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ padding:"7rem 1.5rem",background:"var(--bg2)" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"3.5rem",flexWrap:"wrap",gap:"1rem" }}>
            <div>
              <div className="chip" style={{ marginBottom:"1rem" }}>Live Platforms</div>
              <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(1.9rem,3.5vw,3rem)",color:"#fff",letterSpacing:"-.02em" }}>
                Built. <span className="gtext-gold">Deployed.</span> Running.
              </h2>
            </div>
            <button onClick={() => go("products")} className="btn-g">All Platforms →</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }} className="g3">
            {PROJECTS.slice(0,3).map(p => <PCard key={p.id} project={p} go={go} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"6rem 1.5rem",background:"var(--bg)" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
            <div className="chip" style={{ margin:"0 auto 1.25rem" }}>Client Stories</div>
            <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(1.7rem,3vw,2.5rem)",color:"#fff",letterSpacing:"-.02em" }}>What clients say</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }} className="g3">
            {[
              { q:"NexCore delivered our trading bot in 3 weeks. Runs live with real money and hasn't missed a beat.", a:"Alex M.", r:"Forex Trader, Nairobi", c:"#00e5b4" },
              { q:"The Android app they built saved our logistics team 4 hours of manual work every single day.", a:"Sarah K.", r:"Founder, QuickDeliver", c:"#a855f7" },
              { q:"Brand identity + website package was exactly what we needed to pitch investors. Closed our seed round.", a:"James O.", r:"CEO, FinEdge Capital", c:"#f5a623" }
            ].map((t,i) => (
              <div key={i} style={{ padding:"1.75rem",background:"var(--s)",border:"1px solid var(--b)",borderRadius:18,borderTop:`3px solid ${t.c}` }}>
                <p style={{ fontFamily:"var(--fb)",fontSize:14.5,color:"var(--t2)",lineHeight:1.78,marginBottom:"1.25rem",fontStyle:"italic" }}>"{t.q}"</p>
                <div style={{ fontFamily:"var(--fb)",fontWeight:600,color:"#fff",fontSize:14 }}>{t.a}</div>
                <div style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:3 }}>{t.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"7rem 1.5rem",textAlign:"center",background:"linear-gradient(180deg,var(--bg2),var(--bg))",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.07) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"relative",maxWidth:680,margin:"0 auto" }}>
          <div className="chip" style={{ margin:"0 auto 1.5rem" }}>Ready to launch?</div>
          <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2rem,4vw,3.4rem)",color:"#fff",letterSpacing:"-.025em",lineHeight:1.1,marginBottom:"1.25rem" }}>
            Let's build your next<br /><span className="gtext">big thing together</span>
          </h2>
          <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:16.5,lineHeight:1.75,marginBottom:"2.5rem" }}>
            Web app, Android app, AI system, trading bot, brand identity — whatever you need, we scope it and ship it.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={() => go("contact")} className="btn-p" style={{ fontSize:16,padding:"15px 36px" }}>Start a Project →</button>
            <button onClick={() => go("services")} className="btn-g" style={{ fontSize:15 }}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────
function PCard({ project: p, go }: { project: Project; go: (pg: Page) => void }) {
  const sm = statusMeta(p.status);
  return (
    <div onClick={() => go("products")} style={{ background:p.gradient,border:"1px solid var(--b)",borderRadius:20,overflow:"hidden",cursor:"pointer",transition:"all .3s cubic-bezier(.22,1,.36,1)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = p.accent+"44"; el.style.boxShadow = `0 20px 60px ${p.accent}14`; el.style.transform = "translateY(-5px)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--b)"; el.style.boxShadow = "none"; el.style.transform = "none"; }}
    >
      <div style={{ padding:"1.6rem",borderBottom:`1px solid ${p.accent}18` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem" }}>
          <div style={{ width:50,height:50,borderRadius:13,background:p.accent+"18",border:`1.5px solid ${p.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>{p.icon}</div>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <div className="sdot" style={{ color:sm.c,background:sm.c }} />
            <span style={{ fontFamily:"var(--fm)",fontSize:11,color:sm.c,letterSpacing:".06em",textTransform:"uppercase" }}>{sm.l}</span>
          </div>
        </div>
        <div style={{ fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)",letterSpacing:".06em",marginBottom:4 }}>{p.category}</div>
        <h3 style={{ fontFamily:"var(--fd)",fontWeight:700,color:"#fff",fontSize:18,letterSpacing:"-.01em" }}>{p.name}</h3>
        <p style={{ fontFamily:"var(--fb)",fontSize:12,color:"var(--t2)",marginTop:4,fontStyle:"italic" }}>{p.tagline}</p>
      </div>
      <div style={{ padding:"1.25rem 1.6rem" }}>
        <p style={{ fontFamily:"var(--fb)",fontSize:12.5,color:"var(--t3)",lineHeight:1.7,marginBottom:"1.1rem" }}>{p.description.slice(0,100)}...</p>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:"1.1rem" }}>
          {p.stats.slice(0,4).map(s => (
            <div key={s.label} style={{ padding:"9px 11px",background:"rgba(255,255,255,.025)",borderRadius:9 }}>
              <div style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:15,color:p.accent }}>{s.value}</div>
              <div style={{ fontFamily:"var(--fb)",fontSize:10,color:"var(--t3)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
          {p.tags.slice(0,4).map(t => (
            <span key={t} style={{ padding:"3px 8px",background:"rgba(255,255,255,.04)",border:"1px solid var(--b)",borderRadius:6,fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────
function DashboardPage({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState("overview");
  const metrics = [
    { icon:"🚀",label:"Active Platforms",value:"6",delta:"+2 this month",c:"#00e5b4" },
    { icon:"⚡",label:"Total API Endpoints",value:"40+",delta:"Across services",c:"#a855f7" },
    { icon:"📊",label:"Signals Generated",value:"3.2K",delta:"+420 this week",c:"#f5a623" },
    { icon:"🌐",label:"Web Projects Live",value:"9",delta:"3 deploying",c:"#0ea5e9" }
  ];
  return (
    <div style={{ minHeight:"100vh",background:"var(--bg)",paddingTop:68 }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"3rem 1.5rem" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2.5rem",flexWrap:"wrap",gap:"1rem" }}>
          <div>
            <div className="chip" style={{ marginBottom:"0.75rem" }}>Internal</div>
            <h1 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"2.2rem",color:"#fff",letterSpacing:"-.02em" }}>Command Center</h1>
            <p style={{ fontFamily:"var(--fb)",color:"var(--t3)",fontSize:13.5,marginTop:4 }}>NexCore platform status — real-time overview</p>
          </div>
          <div style={{ display:"flex",gap:7,background:"var(--s)",padding:4,borderRadius:12,border:"1px solid var(--b)" }}>
            {["overview","platforms","services","analytics"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ background:tab===t?"rgba(139,92,246,.12)":"transparent",border:`1px solid ${tab===t?"rgba(139,92,246,.25)":"transparent"}`,cursor:"pointer",color:tab===t?"#a855f7":"var(--t3)",fontFamily:"var(--fb)",fontWeight:500,fontSize:13,padding:"8px 16px",borderRadius:8,textTransform:"capitalize",transition:"all .2s" }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"2rem" }} className="g4">
          {metrics.map(m => (
            <div key={m.label} style={{ padding:"1.5rem",background:"var(--s)",border:"1px solid var(--b)",borderRadius:18,borderTop:`3px solid ${m.c}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem" }}>
                <span style={{ fontSize:22 }}>{m.icon}</span>
                <span style={{ fontFamily:"var(--fb)",fontSize:11,color:m.c,background:m.c+"12",padding:"3px 10px",borderRadius:99 }}>{m.delta}</span>
              </div>
              <div style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:28,color:m.c }}>{m.value}</div>
              <div style={{ fontFamily:"var(--fb)",fontSize:12.5,color:"var(--t3)",marginTop:4 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:"1.5rem" }} className="g2">
          <div style={{ background:"var(--s)",border:"1px solid var(--b)",borderRadius:20,padding:"1.75rem" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem" }}>
              <h3 style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:16 }}>Platform Registry</h3>
              <button onClick={() => go("products")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13,color:"#a855f7" }}>View All →</button>
            </div>
            {PROJECTS.map((p,i) => {
              const sm = statusMeta(p.status);
              return (
                <div key={p.id} style={{ display:"flex",alignItems:"center",gap:"1rem",padding:"13px 0",borderBottom:i<PROJECTS.length-1?"1px solid rgba(255,255,255,.04)":"none" }}>
                  <div style={{ width:42,height:42,borderRadius:12,background:p.accent+"18",border:`1px solid ${p.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{p.icon}</div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontFamily:"var(--fb)",fontWeight:600,color:"#fff",fontSize:14 }}>{p.name}</div>
                    <div style={{ fontFamily:"var(--fm)",fontSize:10,color:"var(--t3)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.category}</div>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
                    <div className="sdot" style={{ color:sm.c,background:sm.c }} />
                    <span style={{ fontFamily:"var(--fm)",fontSize:11,color:sm.c,textTransform:"uppercase",letterSpacing:".04em" }}>{sm.l}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
            <div style={{ background:"var(--s)",border:"1px solid var(--b)",borderRadius:20,padding:"1.5rem",flex:1 }}>
              <h3 style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:15,marginBottom:"1.25rem" }}>System Health</h3>
              {[["Signal Engine",100,"#00e5b4"],["API Gateway",100,"#a855f7"],["WebSocket Feed",98,"#f5a623"],["Database",100,"#0ea5e9"],["Auth Layer",100,"#22c55e"]].map(([n,p,c]) => (
                <div key={n as string} style={{ marginBottom:"0.875rem" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                    <span style={{ fontFamily:"var(--fb)",fontSize:12,color:"var(--t2)" }}>{n as string}</span>
                    <span style={{ fontFamily:"var(--fm)",fontSize:11,color:c as string }}>{p as number}%</span>
                  </div>
                  <div style={{ height:3,background:"rgba(255,255,255,.06)",borderRadius:2 }}>
                    <div style={{ height:"100%",width:`${p as number}%`,background:c as string,borderRadius:2 }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(139,92,246,.05)",border:"1px solid rgba(139,92,246,.15)",borderRadius:20,padding:"1.5rem" }}>
              <div style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#a855f7",fontSize:14,marginBottom:"1rem" }}>Quick Actions</div>
              {[["🚀 Launch New Project","contact"],["🛠 All Services","services"],["📊 Browse Platforms","products"],["📖 Read Articles","articles"]].map(([l,p]) => (
                <button key={l} onClick={() => go(p as Page)} style={{ display:"block",width:"100%",textAlign:"left",background:"var(--s)",border:"1px solid var(--b)",cursor:"pointer",color:"var(--t2)",fontFamily:"var(--fb)",fontSize:13,padding:"10px 14px",borderRadius:10,marginBottom:7,transition:"all .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--t2)")}
                >{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────
function ServicesPage({ go }: { go: (p: Page) => void }) {
  return (
    <div style={{ minHeight:"100vh",background:"var(--bg)",paddingTop:68 }}>
      <div style={{ position:"relative",overflow:"hidden" }}>
        <div className="mesh" /><div className="grid-bg" />
        <div style={{ maxWidth:1320,margin:"0 auto",padding:"5rem 1.5rem 4rem",position:"relative" }}>
          <div style={{ textAlign:"center",marginBottom:"4.5rem" }}>
            <div className="chip" style={{ margin:"0 auto 1.5rem" }}>Services & Pricing</div>
            <h1 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2.2rem,4.5vw,3.6rem)",color:"#fff",letterSpacing:"-.025em" }}>
              What We <span className="gtext">Deliver</span>
            </h1>
            <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:17,marginTop:16,maxWidth:540,margin:"16px auto 0" }}>
              Every solution built from scratch, tailored to your workflow. No templates. No shortcuts.
            </p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1.25rem",marginBottom:"5rem" }} className="g2">
            {SERVICES.map(svc => (
              <div key={svc.title} className="card" style={{ padding:"2rem" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = svc.accent+"44"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--b)"; }}
              >
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.25rem" }}>
                  <div>
                    <div style={{ fontSize:32,marginBottom:10 }}>{svc.icon}</div>
                    <h3 style={{ fontFamily:"var(--fd)",fontWeight:700,color:"#fff",fontSize:19,letterSpacing:"-.01em" }}>{svc.title}</h3>
                    <div style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",letterSpacing:".05em",marginTop:4 }}>{svc.subtitle}</div>
                  </div>
                  <div style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:17,color:svc.accent,whiteSpace:"nowrap" }}>{svc.price}</div>
                </div>
                <p style={{ fontFamily:"var(--fb)",fontSize:14,color:"var(--t2)",lineHeight:1.72,marginBottom:"1.25rem" }}>{svc.description}</p>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px 12px",marginBottom:"1.5rem" }}>
                  {svc.features.map(f => (
                    <div key={f} style={{ display:"flex",alignItems:"center",gap:7 }}>
                      <div style={{ width:5,height:5,borderRadius:"50%",background:svc.accent,flexShrink:0 }} />
                      <span style={{ fontFamily:"var(--fb)",fontSize:12.5,color:"var(--t2)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go("contact")} style={{ background:svc.accent+"12",border:`1px solid ${svc.accent}30`,cursor:"pointer",color:svc.accent,fontFamily:"var(--fb)",fontWeight:600,fontSize:13,padding:"10px 20px",borderRadius:10,transition:"all .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = svc.accent+"22")}
                  onMouseLeave={e => (e.currentTarget.style.background = svc.accent+"12")}
                >Request Quote →</button>
              </div>
            ))}
          </div>
          {/* Process */}
          <div style={{ marginBottom:"5rem" }}>
            <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"2rem",color:"#fff",textAlign:"center",letterSpacing:"-.02em",marginBottom:"3rem" }}>How We Work</h2>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem" }} className="g4">
              {[["01","🔍","Discovery","30-min call to understand your goal, constraints, and timeline."],["02","📋","Scoping","Clear deliverables, fixed pricing. You approve before we start."],["03","⚡","Build Sprint","Weekly demos. Full transparency. You see progress throughout."],["04","🚀","Launch","Production deploy with docs, training, and ongoing support options."]].map(([step,icon,title,desc]) => (
                <div key={step} style={{ padding:"1.5rem",background:"var(--s)",border:"1px solid var(--b)",borderRadius:18,textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--fm)",fontSize:11,color:"#a855f7",letterSpacing:".1em",marginBottom:10 }}>{step}</div>
                  <div style={{ fontSize:28,marginBottom:10 }}>{icon}</div>
                  <h3 style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:16,marginBottom:8 }}>{title}</h3>
                  <p style={{ fontFamily:"var(--fb)",fontSize:13,color:"var(--t3)",lineHeight:1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={() => go("contact")} className="btn-p" style={{ fontSize:16,padding:"15px 40px" }}>Start a Conversation →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────
function ProductsPage({ go }: { go: (p: Page) => void }) {
  const [filter, setFilter] = useState("all");
  const cats = ["all","Forex · FinTech","Crypto · Automation","Multi-Asset · AI/ML","Web · E-Commerce","AI · SaaS"];
  const cl: Record<string,string> = { "all":"All","Forex · FinTech":"Forex","Crypto · Automation":"Crypto","Multi-Asset · AI/ML":"AI/ML","Portfolio · Risk":"Risk","Web · E-Commerce":"Web","AI · SaaS":"AI SaaS" };
  const filtered = filter==="all" ? PROJECTS : PROJECTS.filter(p => p.category===filter);
  return (
    <div style={{ minHeight:"100vh",background:"var(--bg)",paddingTop:68 }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"5rem 1.5rem" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"3rem",flexWrap:"wrap",gap:"1.5rem" }}>
          <div>
            <div className="chip" style={{ marginBottom:"1rem" }}>Our Platforms</div>
            <h1 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2rem,4vw,3rem)",color:"#fff",letterSpacing:"-.025em" }}>
              Built & <span className="gtext">Deployed</span>
            </h1>
          </div>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ background:filter===c?"rgba(139,92,246,.12)":"transparent",border:`1px solid ${filter===c?"rgba(139,92,246,.3)":"var(--b)"}`,cursor:"pointer",color:filter===c?"#a855f7":"var(--t3)",fontFamily:"var(--fb)",fontWeight:500,fontSize:12,padding:"7px 14px",borderRadius:99,transition:"all .2s" }}>{cl[c]||c}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem",marginBottom:"3.5rem" }} className="g3">
          {filtered.map(p => <PCard key={p.id} project={p} go={go} />)}
        </div>
        <div style={{ padding:"2.5rem",borderRadius:24,background:"linear-gradient(135deg,rgba(124,58,237,.1),rgba(0,229,180,.05))",border:"1px solid rgba(139,92,246,.2)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem" }}>
          <div>
            <h3 style={{ fontFamily:"var(--fd)",fontWeight:700,color:"#fff",fontSize:20 }}>Have an idea? Let's build it.</h3>
            <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:14,marginTop:6 }}>Web, mobile, AI, trading system — custom solutions built from scratch.</p>
          </div>
          <button onClick={() => go("contact")} className="btn-p">Start a Project →</button>
        </div>
      </div>
    </div>
  );
}

// ─── ARTICLES ─────────────────────────────────────────────────
function ArticlesPage() {
  const featured = ARTICLES.filter(a => a.featured);
  const rest = ARTICLES.filter(a => !a.featured);
  return (
    <div style={{ minHeight:"100vh",background:"var(--bg)",paddingTop:68 }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"5rem 1.5rem" }}>
        <div style={{ marginBottom:"4rem" }}>
          <div className="chip" style={{ marginBottom:"1rem" }}>Knowledge Base</div>
          <h1 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2rem,4vw,3rem)",color:"#fff",letterSpacing:"-.025em" }}>
            Build <span className="gtext">Intelligence</span>
          </h1>
          <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:16,marginTop:12 }}>Engineering deep-dives, strategy breakdowns, and architecture guides</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1.25rem",marginBottom:"2.5rem" }} className="g2">
          {featured.map(a => (
            <div key={a.id} className="card" style={{ padding:"2rem",cursor:"pointer",borderTop:`3px solid ${a.accent}` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = a.accent+"55"}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--b)"; el.style.borderTopColor = a.accent; }}
            >
              <div style={{ display:"flex",gap:8,marginBottom:"1.25rem" }}>
                <span style={{ padding:"4px 12px",borderRadius:99,background:a.accent+"12",color:a.accent,fontSize:11,fontFamily:"var(--fm)",letterSpacing:".06em" }}>{a.category}</span>
                <span style={{ padding:"4px 12px",borderRadius:99,background:"rgba(255,255,255,.05)",color:"var(--t3)",fontSize:11,fontFamily:"var(--fb)" }}>Featured</span>
              </div>
              <h2 style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:18,lineHeight:1.35,marginBottom:10 }}>{a.title}</h2>
              <p style={{ fontFamily:"var(--fb)",fontSize:14,color:"var(--t2)",lineHeight:1.72,marginBottom:"1.5rem" }}>{a.excerpt}</p>
              <div style={{ display:"flex",gap:"1.25rem",alignItems:"center" }}>
                <span style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)" }}>{a.date}</span>
                <span style={{ width:3,height:3,borderRadius:"50%",background:"var(--t3)" }} />
                <span style={{ fontFamily:"var(--fm)",fontSize:11,color:a.accent }}>{a.readTime} read</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem" }} className="g3">
          {rest.map(a => (
            <div key={a.id} className="card" style={{ padding:"1.5rem",cursor:"pointer" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = a.accent+"44"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--b)"}
            >
              <span style={{ padding:"4px 10px",borderRadius:99,background:a.accent+"10",color:a.accent,fontSize:10,fontFamily:"var(--fm)",letterSpacing:".06em" }}>{a.category}</span>
              <h3 style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:15,lineHeight:1.4,margin:"12px 0 8px" }}>{a.title}</h3>
              <p style={{ fontFamily:"var(--fb)",fontSize:12.5,color:"var(--t3)",lineHeight:1.65,marginBottom:"1rem" }}>{a.excerpt.slice(0,88)}...</p>
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <span style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)" }}>{a.date}</span>
                <span style={{ fontFamily:"var(--fm)",fontSize:11,color:a.accent }}>{a.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────
function AboutPage({ go }: { go: (p: Page) => void }) {
  return (
    <div style={{ minHeight:"100vh",background:"var(--bg)",paddingTop:68,position:"relative",overflow:"hidden" }}>
      <div className="mesh" /><div className="grid-bg" />
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"5rem 1.5rem",position:"relative" }}>
        <div style={{ maxWidth:820,marginBottom:"6rem" }}>
          <div className="chip" style={{ marginBottom:"1.25rem" }}>About NexCore</div>
          <h1 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2.2rem,4.5vw,3.8rem)",color:"#fff",letterSpacing:"-.025em",lineHeight:1.08,marginBottom:"1.5rem" }}>
            A digital studio that<br /><span className="gtext">solves real problems</span>
          </h1>
          <p style={{ fontFamily:"var(--fb)",fontSize:17,color:"var(--t2)",lineHeight:1.82,marginBottom:"1rem" }}>
            NexCore is a full-service technology studio based in Nakuru, Kenya. We build web applications, Android apps, AI systems, trading platforms, brand identities, and cloud infrastructure — for clients across Africa and globally.
          </p>
          <p style={{ fontFamily:"var(--fb)",fontSize:17,color:"var(--t2)",lineHeight:1.82 }}>
            Our work runs in production, with real users, every day. We don't prototype indefinitely — we ship.
          </p>
        </div>
        {/* Values */}
        <div style={{ marginBottom:"6rem" }}>
          <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"2rem",color:"#fff",letterSpacing:"-.02em",marginBottom:"2rem" }}>How We Think</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }} className="g3">
            {[
              { icon:"⚡",title:"We Ship",body:"Ideas become production systems. Every project scoped to deliver real value on a real timeline.",accent:"#a855f7" },
              { icon:"🎯",title:"We Solve",body:"We deeply understand the problem before touching code. The best solution isn't always the most complex one.",accent:"#00e5b4" },
              { icon:"🔗",title:"We Own It",body:"Full-stack ownership from database to pixel. One team, end-to-end. No hand-offs, no finger-pointing.",accent:"#f5a623" },
              { icon:"🌍",title:"Africa-Native",body:"Built in Kenya, serving globally. We understand East African markets — M-Pesa, Airtel Money, USSD flows.",accent:"#22c55e" },
              { icon:"📐",title:"Quality First",body:"We don't ship broken things. Every deliverable is tested, documented, and built to be maintained long-term.",accent:"#0ea5e9" },
              { icon:"🤝",title:"Clear Pricing",body:"Fixed-scope, fixed-price. Know exactly what you're getting and what it costs before we write a line of code.",accent:"#ec4899" }
            ].map(v => (
              <div key={v.title} className="card" style={{ padding:"1.5rem" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = v.accent+"40"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--b)"}
              >
                <div style={{ fontSize:26,marginBottom:".75rem" }}>{v.icon}</div>
                <h3 style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:17,marginBottom:8 }}>{v.title}</h3>
                <p style={{ fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t3)",lineHeight:1.72 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Tech Stack */}
        <div style={{ marginBottom:"5rem",padding:"2.5rem",background:"rgba(139,92,246,.04)",border:"1px solid rgba(139,92,246,.12)",borderRadius:24 }}>
          <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"1.6rem",color:"#fff",letterSpacing:"-.02em",marginBottom:"2rem" }}>Our Technology Stack</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2rem" }} className="g4">
            {[
              { layer:"Frontend",c:"#0ea5e9",techs:["React · TypeScript","Next.js · Vue.js","Flutter · Kotlin","Chart.js · D3.js","Figma Handoff"] },
              { layer:"Backend",c:"#a855f7",techs:["Python · FastAPI","Node.js · Express","Django REST","JWT · OAuth2","WebSocket APIs"] },
              { layer:"Data & Storage",c:"#00e5b4",techs:["PostgreSQL","SQLite · Redis","Firebase · Supabase","MongoDB","ETL Pipelines"] },
              { layer:"Cloud & Creative",c:"#f5a623",techs:["AWS · GCP · Docker","CI/CD · Nginx","After Effects","Adobe Illustrator","Figma · Framer"] }
            ].map(g => (
              <div key={g.layer}>
                <div style={{ fontFamily:"var(--fm)",fontSize:10,color:g.c,letterSpacing:".1em",textTransform:"uppercase",marginBottom:12 }}>{g.layer}</div>
                {g.techs.map(t => (
                  <div key={t} style={{ fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t2)",marginBottom:7,display:"flex",alignItems:"center",gap:8 }}>
                    <div style={{ width:4,height:4,borderRadius:"50%",background:g.c,opacity:.6,flexShrink:0 }} />
                    {t}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Africa Impact */}
        <div style={{ marginBottom:"5rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center" }} className="g2">
          <div>
            <div className="chip" style={{ marginBottom:"1.25rem" }}>Our Mission</div>
            <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"2rem",color:"#fff",letterSpacing:"-.02em",marginBottom:"1rem" }}>
              Building Africa's<br /><span className="gtext-gold">Digital Infrastructure</span>
            </h2>
            <p style={{ fontFamily:"var(--fb)",fontSize:15,color:"var(--t2)",lineHeight:1.82 }}>
              From Nakuru to Nairobi to Lagos to London — building technology that solves Africa-specific problems while meeting global quality standards. M-Pesa integrations, USSD flows, low-bandwidth optimization, and localized AI.
            </p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
            {[["Countries Served","5+","#a855f7"],["Industries Covered","8","#00e5b4"],["M-Pesa Projects","4","#f5a623"],["Avg Delivery","3 wks","#0ea5e9"]].map(([l,v,c]) => (
              <div key={l} style={{ padding:"1.5rem",background:"var(--s)",border:`1px solid ${c as string}22`,borderRadius:16,textAlign:"center" }}>
                <div style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:28,color:c as string }}>{v}</div>
                <div style={{ fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={() => go("contact")} className="btn-p" style={{ fontSize:16,padding:"15px 40px" }}>Work With Us →</button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name:"",email:"",company:"",service:"",budget:"",timeline:"",message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSent(true); }, 1600); };
  return (
    <div style={{ minHeight:"100vh",background:"var(--bg)",paddingTop:68,position:"relative",overflow:"hidden" }}>
      <div className="mesh" /><div className="grid-bg" />
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"5rem 1.5rem",position:"relative" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1.15fr",gap:"5rem",alignItems:"start" }} className="g2">
          <div>
            <div className="chip" style={{ marginBottom:"1.25rem" }}>Let's Talk</div>
            <h1 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2rem,4vw,3.2rem)",color:"#fff",letterSpacing:"-.025em",lineHeight:1.1,marginBottom:"1.25rem" }}>
              Let's build<br /><span className="gtext">something real</span>
            </h1>
            <p style={{ fontFamily:"var(--fb)",fontSize:16,color:"var(--t2)",lineHeight:1.8,marginBottom:"3rem" }}>
              Tell us what you're trying to build. We scope it within 24 hours and give you a clear timeline and fixed price.
            </p>
            {[["⚡","24hr Response","We reply to every inquiry within 24 hours, often same day."],["📋","Fixed Pricing","No hourly billing. You know the exact cost before we start."],["🌍","Remote-First","Kenya-based, serving clients worldwide. Async-friendly workflow."],["🔒","NDA Available","Confidentiality agreements available for all client projects."]].map(([icon,title,body]) => (
              <div key={title} style={{ display:"flex",gap:14,marginBottom:"1.5rem" }}>
                <div style={{ width:40,height:40,borderRadius:10,background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily:"var(--fd)",fontWeight:600,color:"#fff",fontSize:15 }}>{title}</div>
                  <div style={{ fontFamily:"var(--fb)",fontSize:13,color:"var(--t3)",lineHeight:1.6,marginTop:3 }}>{body}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:"2.5rem",padding:"1.5rem",background:"rgba(139,92,246,.05)",border:"1px solid rgba(139,92,246,.15)",borderRadius:18 }}>
              <div style={{ fontFamily:"var(--fm)",fontSize:10,color:"#a855f7",letterSpacing:".1em",marginBottom:12 }}>DIRECT CONTACT</div>
              {[["📧","hello@nexcore.dev"],["💬","Telegram: @NexCoreHQ"],["🐙","GitHub: /nexcore-dev"],["📍","Nakuru, Kenya 🇰🇪 · Remote Worldwide"]].map(([i,t]) => (
                <div key={t} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                  <span style={{ fontSize:16 }}>{i}</span>
                  <span style={{ fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t2)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Form */}
          <div style={{ background:"var(--s)",border:"1px solid var(--b)",borderRadius:24,padding:"2.5rem" }}>
            {sent ? (
              <div style={{ textAlign:"center",padding:"4rem 1rem" }}>
                <div style={{ fontSize:56,marginBottom:"1.25rem",animation:"float 3s ease-in-out infinite" }}>🚀</div>
                <h3 style={{ fontFamily:"var(--fd)",fontWeight:700,color:"#fff",fontSize:22,marginBottom:10 }}>Message Received!</h3>
                <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:15,lineHeight:1.72 }}>We'll review your brief and respond with a scoping proposal within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-g" style={{ marginTop:"2rem" }}>Send Another →</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 style={{ fontFamily:"var(--fd)",fontWeight:700,color:"#fff",fontSize:19,marginBottom:"2rem" }}>Project Brief</h3>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem" }}>
                  {[["name","Your Name","John Doe","text"],["email","Email","john@company.com","email"]].map(([k,l,ph,t]) => (
                    <div key={k}>
                      <label style={{ display:"block",fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginBottom:7 }}>{l}</label>
                      <input type={t} placeholder={ph} value={(form as any)[k]} onChange={update(k)} required />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:"1rem" }}>
                  <label style={{ display:"block",fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginBottom:7 }}>Company (optional)</label>
                  <input type="text" placeholder="Acme Corp" value={form.company} onChange={update("company")} />
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem" }}>
                  <div>
                    <label style={{ display:"block",fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginBottom:7 }}>Service Needed</label>
                    <select value={form.service} onChange={update("service")} required>
                      <option value="">Select...</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      <option value="custom">Custom / Multiple</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block",fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginBottom:7 }}>Budget Range</label>
                    <select value={form.budget} onChange={update("budget")}>
                      <option value="">Select...</option>
                      {["Under $500","$500 – $1,500","$1,500 – $5,000","$5,000 – $15,000","$15,000+","Let's discuss"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom:"1rem" }}>
                  <label style={{ display:"block",fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginBottom:7 }}>Timeline</label>
                  <select value={form.timeline} onChange={update("timeline")}>
                    <option value="">Select...</option>
                    {["ASAP (Rush)","2 – 4 weeks","1 – 2 months","3+ months","Flexible"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:"2rem" }}>
                  <label style={{ display:"block",fontFamily:"var(--fb)",fontSize:12,color:"var(--t3)",marginBottom:7 }}>Project Description *</label>
                  <textarea placeholder="Describe what you want to build, the problem you're solving, and any technical requirements..." rows={5} value={form.message} onChange={update("message")} required />
                </div>
                <button type="submit" className="btn-p" style={{ width:"100%",fontSize:15,padding:"15px",opacity:loading?.7:1 }} disabled={loading}>
                  {loading ? "Sending..." : "Send Project Brief →"}
                </button>
                <p style={{ fontFamily:"var(--fb)",fontSize:11.5,color:"var(--t3)",textAlign:"center",marginTop:"1rem" }}>We'll respond within 24 hours with a scoping proposal.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer style={{ background:"#020309",borderTop:"1px solid rgba(139,92,246,.08)",padding:"4rem 1.5rem 2.5rem" }}>
      <div style={{ maxWidth:1320,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1fr",gap:"3rem",marginBottom:"3rem" }} className="g4">
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:"1.25rem" }}>
              <div style={{ width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontWeight:700,fontSize:16,color:"#fff" }}>N</div>
              <span style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:18,color:"#fff" }}>NexCore</span>
            </div>
            <p style={{ fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t3)",lineHeight:1.75,maxWidth:300 }}>
              We don't just build — we solve. Full-service digital studio: web, mobile, AI, trading, design, and cloud.
            </p>
            <div style={{ display:"flex",gap:8,marginTop:"1.5rem" }}>
              {["🐙","🐦","💼","📱"].map((icon,i) => (
                <div key={i} style={{ width:36,height:36,borderRadius:10,background:"var(--s)",border:"1px solid var(--b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,cursor:"pointer",transition:"all .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,.3)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--b)"}
                >{icon}</div>
              ))}
            </div>
          </div>
          {[
            { title:"Company", items:[["Home","home"],["About","about"],["Articles","articles"],["Contact","contact"]] },
            { title:"Platform", items:[["Dashboard","dashboard"],["Products","products"],["Services","services"]] },
            { title:"Services", items:[["Web Development","services"],["Android Apps","services"],["AI & ML","services"],["Trading Bots","services"],["Design","services"]] }
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:"var(--fm)",fontSize:10,color:"#a855f7",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem" }}>{col.title}</div>
              {col.items.map(([l,p]) => (
                <button key={l} onClick={() => go(p as Page)} style={{ display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t3)",padding:"5px 0",textAlign:"left",transition:"color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--t3)")}
                >{l}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"1.75rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem" }}>
          <span style={{ fontFamily:"var(--fb)",fontSize:12.5,color:"var(--t3)" }}>© 2026 NexCore Solutions. Built in Nakuru, Kenya 🇰🇪</span>
          <div style={{ display:"flex",gap:"1.5rem",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div className="sdot" style={{ color:"#00e5b4",background:"#00e5b4" }} />
              <span style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)" }}>All systems operational</span>
            </div>
            <span style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)" }}>v3.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const go = useCallback((p: Page) => { setPage(p); setTimeout(() => window.scrollTo({ top:0, behavior:"smooth" }), 0); }, []);
  const render = () => {
    switch (page) {
      case "home":      return <HomePage go={go} />;
      case "dashboard": return <DashboardPage go={go} />;
      case "services":  return <ServicesPage go={go} />;
      case "products":  return <ProductsPage go={go} />;
      case "articles":  return <ArticlesPage />;
      case "about":     return <AboutPage go={go} />;
      case "contact":   return <ContactPage />;
      default:          return <HomePage go={go} />;
    }
  };
  return (
    <div style={{ background:"var(--bg)",minHeight:"100vh" }}>
      <style>{G}</style>
      <style>{`@media(max-width:900px){.mmb{display:flex!important}}`}</style>
      <div className="noise" />
      <Nav pg={page} go={go} />
      <main>{render()}</main>
      <Footer go={go} />
    </div>
  );
}
