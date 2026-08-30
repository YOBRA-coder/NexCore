import type { Project,Service,Article,Job } from './Shared';
// ─── DATA ─────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: "forexpro", name: "ForexPro Platform", image: "/assets/forex.png", url: "https://forexpro-frontend.vercel.app", category: "Forex · FinTech", status: "live", tagline: "Professional-grade trading intelligence", description: "Full-stack forex trading platform with AI signal engine, copy trading, education hub, and journal. 28 API endpoints, 7+ indicators, real-time data.", stats: [{ label: "API Endpoints", value: "28" }, { label: "Indicators", value: "7+" }, { label: "Pairs", value: "50+" }, { label: "Uptime", value: "99.8%" }], tags: ["Python", "FastAPI", "React", "SQLite", "RSI", "MACD"], accent: "#00e5b4", icon: "₣", gradient: "135deg, rgba(0,229,180,0.06) 0%, rgba(0,200,150,0.03) 100%" },
  { id: "cryptobot", name: "CryptoBot Engine", image: "/assets/crypto.png", url: "https://cryprobot.vercel.app", category: "Crypto · Automation", status: "live", tagline: "Autonomous market execution", description: "Python trading bot with AI confidence scoring, real-time WebSocket feeds, multi-strategy execution, and live candlestick dashboard.", stats: [{ label: "Strategies", value: "5" }, { label: "Exchange", value: "Binance" }, { label: "Signals/hr", value: "12+" }, { label: "Latency", value: "<50ms" }], tags: ["Python", "WebSocket", "Chart.js", "JWT", "AI", "PostgreSQL"], accent: "#f5a623", icon: "₿", gradient: "135deg, rgba(245,166,35,0.06) 0%, rgba(232,146,0,0.03) 100%" },
  { id: "pesaapp", name: "Pesa App", image: "/assets/pesaapp2.png", url: "https://pesa-app-ke.vercel.app", category: "Web · Fintech", status: "beta", tagline: "Fintech Crash Games Sports Betting Signals", description: "Complete fintech solution for crash games, sports betting, and signal delivery. and copy trading.", stats: [{ label: "Deploy Time", value: "48hr" }, { label: "Payment", value: "M-Pesa" }, { label: "Templates", value: "12" }, { label: "Clients", value: "8" }], tags: ["React", "Node.js", "M-Pesa", "PostgreSQL", "Redis", "Stripe",], accent: "#0ea5e9", icon: "🛒", gradient: "135deg, rgba(14,165,233,0.06) 0%, rgba(2,132,199,0.03) 100%" },
  { id: "signals", name: "Signal Intelligence", image: "../assets/hero.png", url: "", category: "Multi-Asset · AI/ML", status: "beta", tagline: "Multi-asset signal aggregation", description: "ML-powered signal aggregation across forex and crypto. Combines technicals, sentiment scoring, and LSTM models for high-confidence setups.", stats: [{ label: "Accuracy", value: "74%" }, { label: "Assets", value: "120+" }, { label: "Models", value: "3" }, { label: "Alerts/day", value: "40+" }], tags: ["TensorFlow", "Python", "NLP", "LSTM"], accent: "#a855f7", icon: "⚡", gradient: "135deg, rgba(168,85,247,0.06) 0%, rgba(124,58,237,0.03) 100%" },
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
  { id: "building-a-production-forex-signal-engine-with-fastapi", title: "Building a Production Forex Signal Engine with FastAPI", excerpt: "Architecting a scalable signal engine with RSI, MACD, Bollinger Bands — from data ingestion to real-time frontend delivery.", category: "Engineering", date: "Mar 15, 2026", readTime: "12 min", featured: true, accent: "#00e5b4", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80", author: "Trading Systems Team", authorRole: "Yobby Technologies", content: `
# Introduction

AI agents are rapidly evolving from passive tools into autonomous systems capable of planning, reasoning, memory management, and tool execution.

Modern AI systems are no longer simple chat interfaces.

They are becoming operational layers for software.

# Architecture

Most modern autonomous agents are built around four core systems:

        - Memory
        - Planning
        - Tool execution
        - Reflection loops
 
These systems work together to create adaptive behavior.

# Multi-Agent Systems

A major trend is orchestration.

Instead of one giant model, systems are evolving into coordinated agents with specialized responsibilities.

Examples:

    - Research agents
    - Coding agents
    - Validation agents
    - Routing agents

# The Future

The future of AI agents is not chat.

It is infrastructure.

Agents will become operational workers embedded into products, internal tooling, and enterprise workflows.
` },
  { id: "websocket-architecture", title: "WebSocket Architecture for Real-Time Crypto Dashboards", excerpt: "Sub-100ms latency price feeds with Node.js WebSockets, fallback mock data, and Chart.js candlestick rendering.", category: "Architecture", date: "Mar 10, 2026", readTime: "9 min", featured: true, accent: "#f5a623", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80", author: "Yobby Engineering", authorRole: "Yobby Technologies", content: `
# Introduction

Real-time data is critical for trading platforms.

WebSockets provide a way to push live updates to clients with low latency.

# Architecture

Our architecture consists of:

    - WebSocket server (Node.js)
    - Data ingestion layer (exchange APIs)
    - Fallback mock data generator
    - Frontend dashboard (React + Chart.js)

# Performance Optimization

Key optimizations include:

    - Efficient data parsing
    - Batching updates
    - Client-side throttling
    - Connection health monitoring

# Conclusion

WebSockets enable us to deliver real-time market data with sub-100ms latency, providing traders with the information they need to make informed decisions.
` },
  { id: "ai-confidence-scoring", title: "AI Confidence Scoring in Automated Trading Bots", excerpt: "Multi-factor confidence scoring for trade signals, reducing false positives by 34% in live backtests.", category: "AI/ML", date: "Mar 5, 2026", readTime: "8 min", featured: false, accent: "#a855f7", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80", author: "AI & Data Team", authorRole: "Yobby Technologies", content: `
# Introduction

Automated trading bots can generate a high volume of signals, but not all signals are created equal.

Confidence scoring helps filter out low-quality signals, improving overall performance.

# Methodology

Our confidence scoring system combines:

    - Technical indicators (RSI, MACD)
    - Sentiment analysis from news and social media
    - Historical performance of similar signals
    - LSTM-based predictive modeling

# Results

In live backtests, our confidence scoring system reduced false positives by 34%, leading to more profitable trades and improved risk management.

# Conclusion

AI confidence scoring is a powerful tool for enhancing the performance of automated trading bots, providing traders with higher-quality signals and better outcomes.
`},
  { id: "how-we-built-a-cross-platform-android-app-in-6-weeks", title: "How We Built a Cross-Platform Android App in 6 Weeks", excerpt: "Flutter architecture, state management, Firebase integration, and going from MVP to Play Store in record time.", category: "Mobile", date: "Feb 28, 2026", readTime: "10 min", featured: false, accent: "#22c55e", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80", author: "Mobile Team", authorRole: "Yobby Technologies", content: `

# Introduction

Building a cross-platform app can be challenging, but with the right tools and approach, it's achievable within a short timeframe.

# Architecture

Our Flutter architecture includes:

    - Reusable widgets
    - State management with Provider
    - Firebase integration for backend services
    - Responsive design for different screen sizes

# Development Process

We followed a rapid development process:

    - MVP creation in 2 weeks
    - UI/UX refinement in 2 weeks
    - Testing and optimization in 2 weeks

# Conclusion

By leveraging Flutter's capabilities, we were able to deliver a high-quality cross-platform app in record time, meeting our stakeholders' expectations.
` },
  { id: "designing-brand-identity-systems-for-startups-in-2026", title: "Designing Brand Identity Systems for Startups in 2026", excerpt: "A practical guide to cohesive visual identities — typography, color systems, logo variants, and motion principles.", category: "Design", date: "Feb 20, 2026", readTime: "7 min", featured: false, accent: "#f5a623", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80", author: "Design Team", authorRole: "Yobby Technologies", content: `

# Introduction

A strong brand identity is crucial for startups to establish a unique presence in the market.

# Brand Identity Components

Our brand identity system includes:

    - Typography guidelines
    - Color palette and usage rules
    - Logo variations and applications
    - Motion principles for digital experiences

# Implementation

Implementing a cohesive brand identity involves:

    - Consistent application across all touchpoints
    - Clear communication of brand values
    - Regular review and updates to maintain relevance

# Conclusion

A well-defined brand identity helps startups build trust and recognition in the marketplace.
` },
  { id: "rag-pipelines-building-custom-llm-apps-on-your-own-data", title: "RAG Pipelines: Building Custom LLM Apps on Your Own Data", excerpt: "From document ingestion to query-time retrieval — how we build production RAG systems for enterprise clients.", category: "AI/ML",  date: "Feb 12, 2026", readTime: "11 min", featured: false, accent: "#ec4899", image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1200&q=80", author: "AI & Data Team", authorRole: "Yobby Technologies", content: `

# Introduction

Retrieval-Augmented Generation (RAG) is a powerful approach for building custom LLM applications that can access and utilize private data.

# Pipeline Components

Our RAG pipeline includes:

    - Document ingestion and preprocessing
    - Vector database integration (e.g., FAISS)
    - Query-time retrieval mechanisms
    - LLM integration for response generation

# Implementation Details

Implementing a production-ready RAG system requires attention to:

    - Data quality and consistency
    - Vector search performance optimization
    - LLM prompt engineering and fine-tuning
    - Monitoring and logging for continuous improvement

# Conclusion

RAG pipelines enable organizations to create sophisticated AI applications that leverage their proprietary data while maintaining control over the generated responses.
` },
  { id: "mpesa-integration-patterns-for-african-fintech-in-2026", title: "M-Pesa Integration Patterns for African Fintech Apps in 2026", excerpt: "STK Push, C2B callbacks, reconciliation, and idempotency — practical patterns for shipping reliable M-Pesa payments.", category: "Fintech", date: "Apr 2, 2026", readTime: "10 min", featured: true, accent: "#22c55e", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80", author: "Yobby Engineering", authorRole: "Yobby Technologies", content: `
# Introduction

M-Pesa is the default payment rail for most consumer and SME products built for the East African market. Getting the integration right — not just the happy path — is what separates a demo from a product people trust with their money.

# Core Flows

Most apps need three flows working together:

    - STK Push (Lipa na M-Pesa Online) for customer-initiated payments
    - C2B callbacks for confirming payment status asynchronously
    - B2C / B2B for payouts, refunds, and settlements

# Reliability Patterns

Daraja's callbacks are not guaranteed to arrive instantly, and can arrive more than once. We design around that:

    - Idempotency keys on every transaction record
    - A reconciliation job that polls M-Pesa's transaction status API for anything stuck "pending" past a threshold
    - Webhook signature/IP validation before trusting a callback
    - Clear user-facing states: pending, confirmed, failed, expired

# Handling Failure Gracefully

STK push prompts can time out, get cancelled, or fail silently on the user's phone. We always:

    - Poll for status rather than only waiting on the callback
    - Give users a manual "I've paid" fallback that triggers a status recheck
    - Log every raw Daraja response for support and audit purposes

# Conclusion

M-Pesa integration is less about the initial API call and more about designing for a payment network that is asynchronous, occasionally duplicated, and used by people on patchy connections. Build for that reality from day one.
` },
  { id: "event-driven-architecture-for-trading-infrastructure", title: "Why We Moved Our Trading Infrastructure to Event-Driven Architecture", excerpt: "Migrating from request-response polling to a pub/sub event bus — and what it did for latency, reliability, and scale.", category: "Architecture", date: "Mar 26, 2026", readTime: "9 min", featured: false, accent: "#0ea5e9", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", author: "Trading Systems Team", authorRole: "Yobby Technologies", content: `
# The Problem With Polling

Our first-generation signal engine polled exchange APIs on a fixed interval. It worked, until it didn't — every new strategy meant more polling load, and latency crept up as we added pairs and clients.

# Moving to Events

We rebuilt around a lightweight event bus: exchange feeds publish price ticks, strategies subscribe to only the symbols they care about, and downstream consumers (alerts, dashboards, execution) react independently.

    - Price ticks and order events as first-class messages
    - Strategies as independent subscribers, not a monolith loop
    - Consumers scale horizontally without touching producers

# What Changed

    - Signal latency dropped from ~800ms to under 50ms
    - Adding a new strategy no longer increases load on existing ones
    - A crashed consumer no longer takes down the whole pipeline

# Trade-offs

Event-driven systems trade simplicity for flexibility. Debugging a chain of async events takes better tooling — structured logging and distributed tracing stopped being optional for us.

# Conclusion

For anything reacting to live market data, request-response polling has a ceiling. An event bus removed ours.
` },
  { id: "prompt-engineering-lessons-from-production", title: "Prompt Engineering for Production: Lessons from Shipping Claude-Powered Tools", excerpt: "What actually moves reliability in production LLM features — structured outputs, evals, and guarding against silent drift.", category: "AI/ML", date: "Mar 20, 2026", readTime: "9 min", featured: false, accent: "#a855f7", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80", author: "AI & Data Team", authorRole: "Yobby Technologies", content: `
# Prompting Is Not the Hard Part

Getting a good response once is easy. Getting a consistent, safe, well-formatted response across thousands of real user inputs — that's the actual engineering problem.

# What Actually Helped

    - Structured output formats (JSON schemas) over free-form text whenever the output feeds another system
    - Few-shot examples that cover edge cases, not just the happy path
    - Explicit constraints stated positively ("respond in under 100 words") rather than negatively
    - Separating instructions from user-supplied data clearly, to reduce prompt injection risk

# Evaluation Beats Vibes

We stopped trusting "it looks good in the playground" early on. Every prompt change now runs against a small regression set of real (anonymized) past inputs before shipping, so we catch silent quality drift.

# Guarding Against Drift

Model updates can subtly change behavior. We version-pin prompts to model versions where it matters, and monitor output shape (not just content) in production — a spike in malformed JSON tells us something changed upstream before a user complains.

# Conclusion

Production LLM features live or die on the boring parts: structure, evaluation, and monitoring — not the cleverness of the prompt itself.
` },
  { id: "shipping-playbook-idea-to-play-store-2026", title: "From Idea to Play Store: Our 2026 Product Shipping Playbook", excerpt: "The exact process we run for every client build — scoping, weekly demos, and what keeps timelines honest.", category: "Product", date: "Mar 1, 2026", readTime: "6 min", featured: false, accent: "#f5a623", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", author: "Product Team", authorRole: "Yobby Technologies", content: `
# Why We Standardized This

Every client project used to start from a blank page. Standardizing the process cut our average delivery time and — more importantly — cut the number of surprises near the deadline.

# The Four Stages

    - Scope: a one-page brief locking down what "done" means before any code is written
    - Build: weekly demos, not a single reveal at the end
    - Harden: a dedicated pass for edge cases, error states, and performance before launch
    - Ship: staged rollout, monitoring, and a short post-launch support window

# What Keeps Timelines Honest

    - Every scope change gets priced and scheduled explicitly — nothing slips in "for free" and silently pushes the deadline
    - Weekly demos mean misunderstandings surface in week one, not week five
    - We separate "must-have for launch" from "fast-follow" ruthlessly

# Conclusion

Good process is invisible when it's working. Clients don't remember the playbook — they remember that the date they were told at kickoff was the date they got their app.
` },
  { id: "cloud-cost-optimization-for-small-dev-studios", title: "Cloud Cost Optimization for Small Dev Studios", excerpt: "Practical, unglamorous ways we keep client infrastructure bills predictable without sacrificing reliability.", category: "Infrastructure", date: "Feb 8, 2026", readTime: "7 min", featured: false, accent: "#6366f1", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80", author: "Yobby Engineering", authorRole: "Yobby Technologies", content: `
# The Trap Small Studios Fall Into

It's easy to over-provision "just in case" and end up paying enterprise-scale bills for a client app with a few hundred users. We audit every project's infrastructure against its actual traffic, not its aspirational traffic.

# What We Actually Do

    - Right-size compute instances based on real usage graphs, not guesswork
    - Use managed services (databases, queues) where the ops overhead isn't worth owning
    - Set billing alerts on every project from day one, not after the first surprise invoice
    - Cache aggressively at the edge for anything that doesn't need to hit the origin every time

# Autoscaling Done Carefully

Autoscaling is not a substitute for sane limits. We always cap maximum instance count — an unbounded autoscaler during a traffic spike (or an attack) can turn a slow day into a very expensive one.

# Conclusion

Cost optimization isn't a one-time audit — it's a habit built into how we provision from the start. Predictable bills are as much a feature as uptime is.
` },
];

const JOBS: Job[] = [
  { id: "senior-fullstack-engineer", title: "Senior Full-Stack Engineer", department: "Engineering", type: "Full-time", location: "Remote · Nakuru, KE", level: "Senior", accent: "#0ea5e9", icon: "🌐", posted: "Posted this week", description: "Own end-to-end delivery on client SaaS and internal products — React/TypeScript frontends backed by FastAPI or Node.js services.", responsibilities: ["Ship production features across React + FastAPI/Node stacks", "Design database schemas and REST/WebSocket APIs", "Review PRs and mentor junior engineers", "Work directly with clients during scoping calls"], requirements: ["3+ years with React/TypeScript in production", "Solid backend experience (FastAPI, Node.js, or similar)", "Comfortable with PostgreSQL and cloud deployment", "Clear communicator, self-directed"] },
  { id: "android-flutter-developer", title: "Android / Flutter Developer", department: "Mobile", type: "Full-time", location: "Remote · Nakuru, KE", level: "Mid–Senior", accent: "#22c55e", icon: "📱", posted: "Posted this week", description: "Build and ship native Android and cross-platform Flutter apps from MVP through Play Store launch for our clients and our own products.", responsibilities: ["Build Kotlin/Jetpack Compose and Flutter apps", "Integrate Firebase, REST APIs, and payment SDKs (M-Pesa)", "Publish and maintain apps on the Play Store", "Optimize for offline-first, low-bandwidth environments"], requirements: ["2+ years Android (Kotlin) or Flutter experience", "Published at least one app to the Play Store", "Experience with Firebase and REST integrations", "Bonus: M-Pesa or mobile-money integration experience"] },
  { id: "ai-ml-engineer", title: "AI/ML Engineer", department: "AI & Data", type: "Full-time", location: "Remote", level: "Mid–Senior", accent: "#a855f7", icon: "🧠", posted: "2 weeks ago", description: "Build LLM-powered products — RAG pipelines, fine-tuned models, and signal/prediction systems for trading and business clients.", responsibilities: ["Design and ship RAG pipelines and LLM-backed chatbots", "Build and evaluate ML models for signal/prediction systems", "Integrate Claude API / OpenAI into production apps", "Own model evaluation, monitoring, and iteration"], requirements: ["Experience with LLM APIs (Claude, OpenAI) in production", "Python, and comfort with a vector DB / RAG stack", "Bonus: experience with TensorFlow/PyTorch or NLP", "Strong grasp of prompt engineering and evaluation"] },
  { id: "algo-trading-engineer", title: "Algorithmic Trading Engineer", department: "Trading Systems", type: "Contract / Full-time", location: "Remote", level: "Senior", accent: "#00e5b4", icon: "⚡", posted: "2 weeks ago", description: "Build production trading bots and signal engines across forex, crypto, and equities — from strategy logic to live execution.", responsibilities: ["Build and maintain signal engines and execution bots", "Implement risk controls, position sizing, and backtesting", "Integrate MT5 / Binance and other broker/exchange APIs", "Monitor live systems and iterate on strategy performance"], requirements: ["Experience building live trading systems (forex or crypto)", "Strong Python skills, comfortable with WebSocket data feeds", "Understanding of risk management and backtesting", "Bonus: MT5, Binance API, or TradingView Pine Script"] },
  { id: "ui-ux-product-designer", title: "UI/UX & Product Designer", department: "Design", type: "Full-time", location: "Remote · Nakuru, KE", level: "Mid", accent: "#f5a623", icon: "🎨", posted: "3 weeks ago", description: "Design brand identities, product UX, and marketing collateral for client projects and Yobby's own product line.", responsibilities: ["Design UI/UX for web and mobile products", "Build brand identity systems for client startups", "Create motion graphics and social/marketing assets", "Run quick usability passes on shipped features"], requirements: ["Portfolio showing product UI/UX and brand work", "Proficiency in Figma; After Effects a plus", "Comfortable presenting design decisions to clients", "Eye for premium, modern visual design"] },
  { id: "cloud-devops-engineer", title: "Cloud & DevOps Engineer", department: "Infrastructure", type: "Part-time / Contract", location: "Remote", level: "Mid–Senior", accent: "#6366f1", icon: "☁️", posted: "1 month ago", description: "Keep client and internal infrastructure fast, secure, and reliably deployed across AWS/GCP with proper CI/CD and monitoring.", responsibilities: ["Design and maintain AWS/GCP infrastructure", "Containerize services with Docker and set up CI/CD", "Set up monitoring, alerting, and uptime SLAs", "Support engineers with deployment issues"], requirements: ["Hands-on AWS or GCP experience", "Docker and CI/CD pipeline setup experience", "Comfortable owning uptime/monitoring for live systems", "Bonus: experience supporting fintech or trading infra"] },
];

const STACK = ["React · TypeScript","Python · FastAPI","Node.js · Express","Kotlin · Flutter","TensorFlow · PyTorch","PostgreSQL · Redis","AWS · GCP · Docker","Figma · After Effects","Claude API · OpenAI","WebSocket · REST","M-Pesa · Stripe","Binance · Twelve Data"];

export {PROJECTS,SERVICES,ARTICLES,JOBS,STACK}