import type { Project, Service, Article, Job } from './Shared';

// ─── DATA ─────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: "yobbyforex", name: "YobbyFX Platform", image: "/assets/forex.png", url: "https://forex.yobbytech.com", category: "Forex · FinTech", status: "live", tagline: "Professional-grade trading intelligence", description: "Full-stack forex trading platform with AI signal engine, copy trading, education hub, and journal. 28 API endpoints, 7+ indicators, real-time data.", stats: [{ label: "API Endpoints", value: "28" }, { label: "Indicators", value: "7+" }, { label: "Pairs", value: "50+" }, { label: "Uptime", value: "99.8%" }], tags: ["Python", "FastAPI", "React", "SQLite", "RSI", "MACD"], accent: "#00e5b4", icon: "₣", gradient: "135deg, rgba(0,229,180,0.06) 0%, rgba(0,200,150,0.03) 100%" },
  { id: "yobbybot", name: "YobbyBot Engine", image: "/assets/crypto.png", url: "https://cryprobot.yobbytech.com", category: "Crypto · Automation", status: "live", tagline: "Autonomous market execution", description: "Python trading bot with AI confidence scoring, real-time WebSocket feeds, multi-strategy execution, and live candlestick dashboard.", stats: [{ label: "Strategies", value: "5" }, { label: "Exchange", value: "Binance" }, { label: "Signals/hr", value: "12+" }, { label: "Latency", value: "<50ms" }], tags: ["Python", "WebSocket", "Chart.js", "JWT", "AI", "PostgreSQL"], accent: "#f5a623", icon: "₿", gradient: "135deg, rgba(245,166,35,0.06) 0%, rgba(232,146,0,0.03) 100%" },
  { id: "yobbypesa", name: "Yobby Pesa", image: "/assets/pesaapp2.png", url: "https://pesa-app.yobbytech.com", category: "Web · Fintech", status: "beta", tagline: "Fintech Crash Games Sports Betting Signals", description: "Complete fintech solution for crash games, sports betting, and signal delivery. and copy trading.", stats: [{ label: "Deploy Time", value: "48hr" }, { label: "Payment", value: "M-Pesa" }, { label: "Templates", value: "12" }, { label: "Clients", value: "8" }], tags: ["React", "Node.js", "M-Pesa", "PostgreSQL", "Redis", "Stripe"], accent: "#0ea5e9", icon: "🛒", gradient: "135deg, rgba(14,165,233,0.06) 0%, rgba(2,132,199,0.03) 100%" },
  { id: "signals", name: "Signal Intelligence", image: "/assets/hero.png", url: "", category: "Multi-Asset · AI/ML", status: "beta", tagline: "Multi-asset signal aggregation", description: "ML-powered signal aggregation across forex and crypto. Combines technicals, sentiment scoring, and LSTM models for high-confidence setups.", stats: [{ label: "Accuracy", value: "74%" }, { label: "Assets", value: "120+" }, { label: "Models", value: "3" }, { label: "Alerts/day", value: "40+" }], tags: ["TensorFlow", "Python", "NLP", "LSTM"], accent: "#a855f7", icon: "⚡", gradient: "135deg, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.03) 100%" },
  { id: "zonemarket", name: "Zone Market", image: "/assets/zonemarket.jpg", url: "https://zonmrkt.com", category: "Android · E-Commerce", status: "beta", tagline: "Zone Market Where You get Delivered anymoment", description: "ML-powered signal aggregation across forex and crypto. Combines technicals, sentiment scoring, and LSTM models for high-confidence setups.", stats: [{ label: "Accuracy", value: "74%" }, { label: "Assets", value: "120+" }, { label: "Models", value: "3" }, { label: "Alerts/day", value: "40+" }], tags: ["TensorFlow", "Python", "NLP", "LSTM"], accent: "#a855f7", icon: "⚡", gradient: "135deg, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.03) 100%" },
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
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote · Kenya",
    level: "Senior",
    accent: "#0ea5e9",
    icon: "🌐",
    posted: "Posted this week",

    description:
      "Lead the design and delivery of production-grade web platforms and SaaS products using modern React, TypeScript, FastAPI, and Node.js technologies.",

    responsibilities: [
      "Design, build, test, and ship production features across React, TypeScript, FastAPI, and Node.js",
      "Design scalable database schemas and reliable REST and WebSocket APIs",
      "Own features end-to-end from technical planning through deployment and monitoring",
      "Review pull requests, improve engineering standards, and mentor junior developers",
      "Collaborate with product, design, and clients to translate requirements into technical solutions"
    ],

    requirements: [
      "3+ years of professional experience building production applications with React and TypeScript",
      "Strong backend development experience with FastAPI, Node.js, or a comparable framework",
      "Solid understanding of PostgreSQL, API design, authentication, and application security",
      "Experience deploying and maintaining applications in a cloud environment",
      "Strong problem-solving, communication, and independent working skills"
    ]
  },

  {
    id: "android-flutter-developer",
    title: "Android / Flutter Developer",
    department: "Mobile",
    type: "Full-time",
    location: "Remote · Kenya",
    level: "Mid–Senior",
    accent: "#22c55e",
    icon: "📱",
    posted: "Posted this week",

    description:
      "Build reliable, high-quality mobile applications for our clients and internal products, from early MVP development through production release and ongoing improvement.",

    responsibilities: [
      "Develop Android applications using Kotlin and modern Jetpack technologies",
      "Build cross-platform mobile experiences using Flutter and Dart",
      "Integrate Firebase, REST APIs, authentication, analytics, and mobile payment services",
      "Prepare, release, and maintain applications for the Google Play Store",
      "Optimize applications for performance, reliability, offline usage, and low-bandwidth environments"
    ],

    requirements: [
      "2+ years of professional Android development with Kotlin or Flutter development",
      "Experience building and shipping at least one production mobile application",
      "Practical experience integrating REST APIs and Firebase services",
      "Understanding of mobile application architecture, state management, and secure data handling",
      "Experience with mobile money or payment integrations such as M-Pesa is an advantage"
    ]
  },

  {
    id: "quant-trading-systems-engineer",
    title: "Quant / Trading Systems Engineer",
    department: "Fintech",
    type: "Full-time",
    location: "Remote · Kenya",
    level: "Senior",
    accent: "#f59e0b",
    icon: "⚡",
    posted: "Posted today",

    description:
      "Design and engineer real-time quantitative trading infrastructure, algorithmic signal systems, market-data pipelines, and automated execution platforms across global financial markets.",

    responsibilities: [
      "Develop real-time trading systems, signal engines, and automated execution pipelines",
      "Integrate exchange, brokerage, and market-data APIs using REST and WebSocket protocols",
      "Design risk controls, position management, portfolio monitoring, and trading telemetry",
      "Build reliable backtesting and simulation systems using historical market data",
      "Analyze system performance, latency, execution quality, and strategy behaviour",
      "Develop monitoring and safeguards for automated trading environments"
    ],

    requirements: [
      "3+ years of professional software engineering experience with Python, Go, C++, or similar",
      "Strong understanding of financial markets, order types, market data, and WebSocket systems",
      "Experience building high-throughput or real-time systems",
      "Strong mathematical, statistical, analytical, or quantitative problem-solving ability",
      "Understanding of trading risk management and historical-data analysis",
      "Experience with algorithmic trading systems is strongly preferred"
    ]
  },

  {
    id: "ai-solutions-engineer",
    title: "AI / Machine Learning Solutions Engineer",
    department: "AI & ML",
    type: "Full-time",
    location: "Remote · Kenya",
    level: "Mid–Senior",
    accent: "#a855f7",
    icon: "🧠",
    posted: "Posted today",

    description:
      "Build production AI systems that turn large language models, retrieval systems, and intelligent agents into practical solutions for real-world business workflows.",

    responsibilities: [
      "Design and deploy production-grade LLM and generative AI applications",
      "Build Retrieval-Augmented Generation systems using embeddings and vector search",
      "Develop intelligent agents capable of executing structured business workflows",
      "Integrate proprietary and open-source model APIs into scalable backend services",
      "Design evaluation, observability, safety, and reliability mechanisms for AI systems",
      "Build AI services and integrations using Python and FastAPI"
    ],

    requirements: [
      "2+ years of experience delivering production NLP, machine learning, or generative AI solutions",
      "Strong Python development skills and experience building backend services",
      "Hands-on experience with RAG architectures, embeddings, and vector databases",
      "Experience with frameworks such as LangChain, LlamaIndex, or comparable tooling",
      "Understanding of LLM inference, token optimization, evaluation, and prompt engineering",
      "Experience with model fine-tuning, AI agents, or AI safety practices is an advantage"
    ]
  },

  {
    id: "cloud-devops-engineer",
    title: "Cloud & DevOps Infrastructure Engineer",
    department: "Operations",
    type: "Full-time",
    location: "Remote · Kenya",
    level: "Mid–Senior",
    accent: "#ef4444",
    icon: "☁️",
    posted: "Posted yesterday",

    description:
      "Own the infrastructure behind our applications by building secure cloud environments, automated deployment pipelines, observability systems, and highly available production platforms.",

    responsibilities: [
      "Design and maintain secure, scalable AWS or Google Cloud infrastructure",
      "Provision infrastructure using Terraform and Infrastructure as Code practices",
      "Build and maintain CI/CD pipelines using GitHub Actions or comparable tooling",
      "Containerize and operate production workloads using Docker",
      "Implement monitoring, logging, alerting, backups, and disaster-recovery practices",
      "Improve deployment reliability, system performance, security, and availability"
    ],

    requirements: [
      "3+ years of professional experience managing AWS, Google Cloud, or comparable cloud environments",
      "Strong experience with Docker, Linux, networking, and shell scripting",
      "Practical Infrastructure as Code experience, preferably Terraform",
      "Experience designing CI/CD pipelines and automated deployment workflows",
      "Strong understanding of PostgreSQL, caching, backups, and production databases",
      "Experience with monitoring, observability, security, and zero-downtime deployments"
    ]
  },

  {
    id: "product-ui-ux-designer",
    title: "Product (UI/UX) Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote · Kenya",
    level: "Mid-Level",
    accent: "#ec4899",
    icon: "🎨",
    posted: "Posted 3 days ago",

    description:
      "Design intuitive, accessible, and visually polished digital products across web, mobile, SaaS, and fintech experiences.",

    responsibilities: [
      "Design responsive web and mobile interfaces from concept through final delivery",
      "Create high-fidelity prototypes and interactive product experiences in Figma",
      "Develop and maintain reusable design-system components and visual patterns",
      "Work closely with product managers and engineers throughout the development lifecycle",
      "Translate complex workflows and business requirements into simple user experiences",
      "Conduct design reviews and continuously improve usability and visual consistency"
    ],

    requirements: [
      "2+ years of professional product or UI/UX design experience",
      "Strong portfolio demonstrating real-world SaaS, web, mobile, or fintech products",
      "Advanced proficiency with Figma and modern interface-design workflows",
      "Strong understanding of typography, spacing, responsive layouts, and visual hierarchy",
      "Ability to communicate design decisions clearly and collaborate with engineers",
      "Working knowledge of HTML/CSS or Tailwind CSS is an advantage"
    ]
  }
];


const STACK = ["React · TypeScript", "Python · FastAPI", "Node.js · Express", "Kotlin · Flutter", "TensorFlow · PyTorch", "PostgreSQL · Redis", "AWS · GCP · Docker", "Figma · After Effects", "Claude API · OpenAI", "WebSocket · REST", "M-Pesa · Stripe", "Binance · Twelve Data"];

export { PROJECTS, SERVICES, ARTICLES, JOBS, STACK };