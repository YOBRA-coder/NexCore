import type { Project, Service, Article, Job } from './Shared';

// ─── DATA ─────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: "forexpro", name: "YobbyFX Platform", image: "/assets/forex.png", url: "https://forex.yobbytech.com", category: "Forex · FinTech", status: "live", tagline: "Professional-grade trading intelligence", description: "Full-stack forex trading platform with AI signal engine, copy trading, education hub, and journal. 28 API endpoints, 7+ indicators, real-time data.", stats: [{ label: "API Endpoints", value: "28" }, { label: "Indicators", value: "7+" }, { label: "Pairs", value: "50+" }, { label: "Uptime", value: "99.8%" }], tags: ["Python", "FastAPI", "React", "SQLite", "RSI", "MACD"], accent: "#00e5b4", icon: "₣", gradient: "135deg, rgba(0,229,180,0.06) 0%, rgba(0,200,150,0.03) 100%" },
  { id: "cryptobot", name: "YobbyBot Engine", image: "/assets/crypto.png", url: "https://cryprobot.vercel.app", category: "Crypto · Automation", status: "live", tagline: "Autonomous market execution", description: "Python trading bot with AI confidence scoring, real-time WebSocket feeds, multi-strategy execution, and live candlestick dashboard.", stats: [{ label: "Strategies", value: "5" }, { label: "Exchange", value: "Binance" }, { label: "Signals/hr", value: "12+" }, { label: "Latency", value: "<50ms" }], tags: ["Python", "WebSocket", "Chart.js", "JWT", "AI", "PostgreSQL"], accent: "#f5a623", icon: "₿", gradient: "135deg, rgba(245,166,35,0.06) 0%, rgba(232,146,0,0.03) 100%" },
  { id: "pesaapp", name: "Yobby Pesa", image: "/assets/pesaapp2.png", url: "https://pesa-app-ke.vercel.app", category: "Web · Fintech", status: "beta", tagline: "Fintech Crash Games Sports Betting Signals", description: "Complete fintech solution for crash games, sports betting, and signal delivery. and copy trading.", stats: [{ label: "Deploy Time", value: "48hr" }, { label: "Payment", value: "M-Pesa" }, { label: "Templates", value: "12" }, { label: "Clients", value: "8" }], tags: ["React", "Node.js", "M-Pesa", "PostgreSQL", "Redis", "Stripe"], accent: "#0ea5e9", icon: "🛒", gradient: "135deg, rgba(14,165,233,0.06) 0%, rgba(2,132,199,0.03) 100%" },
  { id: "signals", name: "Signal Intelligence", image: "../assets/hero.png", url: "https://zonmrkt.com", category: "Multi-Asset · AI/ML", status: "beta", tagline: "Multi-asset signal aggregation", description: "ML-powered signal aggregation across forex and crypto. Combines technicals, sentiment scoring, and LSTM models for high-confidence setups.", stats: [{ label: "Accuracy", value: "74%" }, { label: "Assets", value: "120+" }, { label: "Models", value: "3" }, { label: "Alerts/day", value: "40+" }], tags: ["TensorFlow", "Python", "NLP", "LSTM"], accent: "#a855f7", icon: "⚡", gradient: "135deg, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.03) 100%" },
  { id: "zonemarket", name: "Zone Market", image: "../assets/zonemarket.jpg", url: "https://zonmrkt.com", category: "Android · E-Commerce", status: "beta", tagline: "Zone Market Where You get Delivered anymoment", description: "ML-powered signal aggregation across forex and crypto. Combines technicals, sentiment scoring, and LSTM models for high-confidence setups.", stats: [{ label: "Accuracy", value: "74%" }, { label: "Assets", value: "120+" }, { label: "Models", value: "3" }, { label: "Alerts/day", value: "40+" }], tags: ["TensorFlow", "Python", "NLP", "LSTM"], accent: "#a855f7", icon: "⚡", gradient: "135deg, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.03) 100%" },
  { id: "riskengine", name: "RiskGuard Engine", image: "/canvas.png", url: "", category: "Portfolio · Risk", status: "dev", tagline: "Real-time portfolio protection", description: "Dynamic position sizing, drawdown controls, correlation analysis, and automated hedging protocols for professional portfolio managers.", stats: [{ label: "Risk Models", value: "6" }, { label: "Drawdown", value: "Custom" }, { label: "Latency", value: "<5ms" }, { label: "Pairs", value: "All" }], tags: ["Python", "Risk Mgmt", "Hedging", "Portfolio"], accent: "#ef4444", icon: "🛡", gradient: "135deg, rgba(239,68,68,0.06) 0%, rgba(220,38,38,0.03) 100%" },
  { id: "yobbyweb", name: "YobbyStore Builder", image: "/canvas.png", url: "", category: "Web · E-Commerce", status: "beta", tagline: "Full e-commerce in 48 hours", description: "Rapid deployment web platform for SMEs in East Africa. React + Node.js storefront with M-Pesa payments, inventory, and analytics.", stats: [{ label: "Deploy Time", value: "48hr" }, { label: "Payment", value: "M-Pesa" }, { label: "Templates", value: "12" }, { label: "Clients", value: "8" }], tags: ["React", "Node.js", "M-Pesa", "PostgreSQL"], accent: "#0ea5e9", icon: "🛒", gradient: "135deg, rgba(14,165,233,0.06) 0%, rgba(2,132,199,0.03) 100%" },
  { id: "yobbyai", name: "YobbyAI Assistant", image: "/canvas.png", url: "", category: "AI · SaaS", status: "dev", tagline: "Custom AI for your business", description: "White-label AI assistant platform. Train on your business data, deploy as chatbot, email responder, or document analyst.", stats: [{ label: "API", value: "REST" }, { label: "Models", value: "Claude+GPT" }, { label: "Languages", value: "10+" }, { label: "Uptime", value: "99.9%" }], tags: ["Claude API", "OpenAI", "RAG", "Fine-tuning"], accent: "#ec4899", icon: "🧠", gradient: "135deg, rgba(236,72,153,0.06) 0%, rgba(190,24,93,0.03) 100%" }
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
  {
    id: "building-a-production-forex-signal-engine-with-fastapi",
    title: "Building a Production Forex Signal Engine with FastAPI",
    excerpt: "Architecting a scalable signal engine with RSI, MACD, Bollinger Bands — from data ingestion to real-time frontend delivery using modern multi-format adaptive images.",
    category: "Engineering",
    date: "Mar 15, 2026",
    readTime: "12 min",
    featured: true,
    accent: "#00e5b4",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    images: {
      avif: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&format=avif&fit=crop&w=1200&q=80",
      webp: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&format=webp&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80"
    },
    author: "Trading Systems Team",
    authorRole: "Yobby Technologies",
    content: `
# Introduction

AI agents and trading intelligence engines are rapidly evolving from passive calculation modules into highly autonomous systems capable of dynamic data routing, state memory management, and low-latency tool execution. 

Modern quantitative platforms require operational layers capable of matching raw streaming inputs with lightning-fast frontends while preserving excellent client-side layout stability.

# Core Signal Engine Architecture

Most modern autonomous trading infrastructure relies on four distributed layers working concurrently:
1. **Data Ingestion (WebSockets & APIs):** Real-time tick streams handling raw liquidity pairs.
2. **Technical Math Engine:** Microservices orchestrating core mathematical transforms including Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and adaptive Bollinger Bands.
3. **Multi-Agent Orchestration Layer:** Rather than executing processing via a single bloated loop, systems run isolated validation, risk profiling, and routing nodes.
4. **Reactive Push Layer:** Pushing transactional telemetry downstream to persistent caches and connected state viewports.

![Forex Signal Flow Engine Topology Overview](https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80)
*Figure 1: High-throughput execution topology showing real-time technical analysis indicators passing through safety verification checkpoints before client notification.*

# Optimization & Interface Performance

Delivering high-density technical analysis requires modern delivery networks. Web performance directly dictates trader response times. To secure smooth visuals, implement next-generation multi-format asset targeting (AVIF/WebP) combined with explicit layout aspect-ratio constraint layers. This limits client layout shift and maximizes pipeline visual fluidity.

# The Infrastructure Horizon

Autonomous trading modules are no longer simple isolated scripts. They represent robust operational infrastructure embedded natively within complex enterprise systems, ensuring high fidelity market execution with minimized transactional risk.
`
  },
  {
    id: "websocket-architecture",
    title: "WebSocket Architecture for Real-Time Crypto Dashboards",
    excerpt: "Sub-100ms latency price feeds with Node.js WebSockets, fallback mock data, and Chart.js candlestick rendering.",
    category: "Architecture",
    date: "Mar 10, 2026",
    readTime: "9 min",
    featured: true,
    accent: "#f5a623",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    images: {
      avif: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&format=avif&fit=crop&w=1200&q=80",
      webp: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&format=webp&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80"
    },
    author: "Yobby Engineering",
    authorRole: "Yobby Technologies",
    content: `
# Introduction

Real-time telemetry and instantaneous price streams form the backbone of modern decentralized trading operations. Traditional stateless HTTP request-response patterns introduce unacceptable performance degradation. Leveraging persistent bi-directional WebSockets allows systems to feed fast candlestick visualizers with sub-100ms pipeline latencies.

# High-Performance System Topology

The execution topology shifts traditional processing workloads to event-driven streams:
- **Streaming Nodes (Node.js/WS):** Maintain persistent channels to upstream exchanges, multiplexing internal broadcasts.
- **Data Ingestion Clusters:** Parse, validate, and buffer inbound orderbook differentials.
- **Failover Generators:** Actively monitor stream health and automatically spin up high-fidelity simulated mock blocks if connectivity fluctuates.
- **Frontend Viewports (React + Chart.js):** Efficiently consume streams while preventing UI thread blocking.

![Real-time Network Telemetry Dashboard Pipeline](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80)
*Figure 2: Production-grade stream broker topology detailing localized pub/sub routing tables and layout-safe data pipelines.*

# Core Engineering Optimizations

To handle sudden volatility spikes without breaking client side visualization performance:
1. **Binary Framing:** Compress stringified payloads into lean binary buffers before network transit.
2. **Throttled Batching:** Accumulate ticks server-side over tight 15ms windows to avoid client rerender flooding.
3. **Visual Frame Guard:** Enforce explicit viewport containers to fully insulate document layouts from sudden visual recalculations.

# Conclusion

Transitioning to dedicated web stream protocols unlocks a premium, real-time trading environment. This enables modern visual layers to seamlessly keep pace with fast asset market trends.
`
  },
  {
    id: "ai-confidence-scoring",
    title: "AI Confidence Scoring in Automated Trading Bots",
    excerpt: "Multi-factor confidence scoring for trade signals, reducing false positives by 34% in live backtests.",
    category: "AI/ML",
    date: "Mar 5, 2026",
    readTime: "8 min",
    featured: false,
    accent: "#a855f7",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    images: {
      avif: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&format=avif&fit=crop&w=1200&q=80",
      webp: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&format=webp&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
    },
    author: "AI & Data Team",
    authorRole: "Yobby Technologies",
    content: `
# Introduction

Algorithmic execution systems typically encounter massive volumes of signal telemetry. However, executing orders on raw mathematical signals without localized semantic analysis frequently leads to margin degradation due to market noise. By wrapping execution paths in deep confidence scoring, systems effectively minimize risk profiles.

# Confidence Scoring Architecture

Confidence models synthesize multi-layered inputs into a normalized metric before placing market orders:
1. **Indicator Convergence:** Cross-checking classic momentum calculations against current moving averages.
2. **Contextual Sentiment Tracking:** Real-time processing of news flow and social sentiment matrices through natural language pipelines.
3. **LSTM Deep Regression:** Feeding short-term price histories into deep learning networks to compute forward probabilities.

![Machine Learning Prediction Confidence Node Analysis](https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80)
*Figure 3: Neural network training topology detailing real-time classification gates and vector alignment checks.*

# Empirical Validation Results

Subjecting the intelligence engine to rigorous multi-year backtests yielded significant real-world improvements:
- **False Signal Abatement:** Decreased operational noise by 34% during consolidation cycles.
- **Drawdown Abatement:** Maximized risk-adjusted returns by automatically sizing down low-confidence setups.
- **Frontend Display:** Leveraged optimized multi-format image assets to construct clean, stable, layout-shift-free research dashboards.

# Summary

Embedding intelligent, multi-layer confidence assessment into trading logic significantly enhances automated execution performance. This enables institutional grade portfolio shielding while maintaining complete transparency via clean, real-time UI dashboards.
`
  },
  {
    id: "mpesa-integration-patterns-for-african-fintech-in-2026",
    title: "M-Pesa Integration Patterns for African Fintech Apps in 2026",
    excerpt: "STK Push, C2B callbacks, reconciliation, and idempotency — practical patterns for shipping reliable M-Pesa payments.",
    category: "Fintech",
    date: "Apr 2, 2026",
    readTime: "10 min",
    featured: true,
    accent: "#22c55e",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    images: {
      avif: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&format=avif&fit=crop&w=1200&q=80",
      webp: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&format=webp&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"
    },
    author: "Yobby Engineering",
    authorRole: "Yobby Technologies",
    content: `
# Introduction

Mobile money networks stand as the foundational financial engine for East African application ecosystems. Crafting reliable interfaces to the Safaricom Daraja API requires building resilient software systems that handle asynchronous callback anomalies, out-of-order event flows, and sudden structural network timeouts smoothly.

# Production Integration Patterns

Enterprise environments rely on clear operational loops to safeguard payment accuracy:
- **STK Push (Lipa na M-Pesa Online):** Instantaneous user prompt invocation on mobile hardware.
- **Asynchronous C2B Handlers:** Dedicated callback servers validating transaction statuses independently of client state.
- **Reconciliation Crons:** Automated processes scanning payment ledgers to catch and settle transactions hanging in an intermediate 'pending' state.

![Mobile Money Payment Reconciliation Architecture Block Diagram](https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80)
*Figure 4: Secure payment flow diagram outlining webhook verification, signature hashing, and layout-safe transaction states.*

# Core Fault Tolerance Safeguards

To survive sudden infrastructure degradation or duplicated webhooks, enforce strict data validation:
1. **Enforced Idempotency:** Guard database mutations using unique validation hashes to prevent duplicate captures.
2. **State Machine Integrity:** Track ledger entries across distinct stages: \`PRE_FLIGHT\`, \`PENDING\`, \`COMPLETED\`, or \`FAILED\`.
3. **Visual Status Buffers:** Prevent sudden layout jumps during processing states by designing pre-sized adaptive display components.

# Final Analysis

Architecting production mobile payment systems is less about tracking the optimal API response and more about designing for asynchronous real-world edge cases. Enforcing strict idempotency ensures complete consistency across all ledger mutations.
`
  }
];

const JOBS: Job[] = [
  { id: "senior-fullstack-engineer", title: "Senior Full-Stack Engineer", department: "Engineering", type: "Full-time", location: "Remote · Nakuru, KE", level: "Senior", accent: "#0ea5e9", icon: "🌐", posted: "Posted this week", description: "Own end-to-end delivery on client SaaS and internal products — React/TypeScript frontends backed by FastAPI or Node.js services.", responsibilities: ["Ship production features across React + FastAPI/Node stacks", "Design database schemas and REST/WebSocket APIs", "Review PRs and mentor junior engineers", "Work directly with clients during scoping calls"], requirements: ["3+ years with React/TypeScript in production", "Solid backend experience (FastAPI, Node.js, or similar)", "Comfortable with PostgreSQL and cloud deployment", "Clear communicator, self-directed"] },
  { id: "android-flutter-developer", title: "Android / Flutter Developer", department: "Mobile", type: "Full-time", location: "Remote · Nakuru, KE", level: "Mid–Senior", accent: "#22c55e", icon: "📱", posted: "Posted this week", description: "Build and ship native Android and cross-platform Flutter apps from MVP through Play Store launch for our clients and our own products.", responsibilities: ["Build Kotlin/Jetpack Compose and Flutter apps", "Integrate Firebase, REST APIs, and payment SDKs (M-Pesa)", "Publish and maintain apps on the Play Store", "Optimize for offline-first, low-bandwidth environments"], requirements: ["2+ years Android (Kotlin) or Flutter experience", "Published at least one app to the Play Store", "Experience with Firebase and REST integrations", "Bonus: M-Pesa or mobile-money integration experience"] }
];

const STACK = ["React · TypeScript", "Python · FastAPI", "Node.js · Express", "Kotlin · Flutter", "TensorFlow · PyTorch", "PostgreSQL · Redis", "AWS · GCP · Docker", "Figma · After Effects", "Claude API · OpenAI", "WebSocket · REST", "M-Pesa · Stripe", "Binance · Twelve Data"];

export { PROJECTS, SERVICES, ARTICLES, JOBS, STACK };