import type { Project,Service,Article } from './Shared';
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
  { id: "building-a-production-forex-signal-engine-with-fastapi", title: "Building a Production Forex Signal Engine with FastAPI", excerpt: "Architecting a scalable signal engine with RSI, MACD, Bollinger Bands — from data ingestion to real-time frontend delivery.", category: "Engineering", date: "Mar 15, 2026", readTime: "12 min", featured: true, accent: "#00e5b4", image: "/assets/forex.png",    content: `
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
  { id: "websocket-architecture", title: "WebSocket Architecture for Real-Time Crypto Dashboards", excerpt: "Sub-100ms latency price feeds with Node.js WebSockets, fallback mock data, and Chart.js candlestick rendering.", category: "Architecture", date: "Mar 10, 2026", readTime: "9 min", featured: true, accent: "#f5a623", image: "/assets/crypto.png", content: `
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
  { id: "ai-confidence-scoring", title: "AI Confidence Scoring in Automated Trading Bots", excerpt: "Multi-factor confidence scoring for trade signals, reducing false positives by 34% in live backtests.", category: "AI/ML", date: "Mar 5, 2026", readTime: "8 min", featured: false, accent: "#a855f7", image: "/assets/forex.png", content: `
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
  { id: "how-we-built-a-cross-platform-android-app-in-6-weeks", title: "How We Built a Cross-Platform Android App in 6 Weeks", excerpt: "Flutter architecture, state management, Firebase integration, and going from MVP to Play Store in record time.", category: "Mobile", date: "Feb 28, 2026", readTime: "10 min", featured: false, accent: "#22c55e", image: "/assets/android.png", content: `

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
  { id: "designing-brand-identity-systems-for-startups-in-2026", title: "Designing Brand Identity Systems for Startups in 2026", excerpt: "A practical guide to cohesive visual identities — typography, color systems, logo variants, and motion principles.", category: "Design", date: "Feb 20, 2026", readTime: "7 min", featured: false, accent: "#f5a623", image: "/assets/design.png", content: `

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
  { id: "rag-pipelines-building-custom-llm-apps-on-your-own-data", title: "RAG Pipelines: Building Custom LLM Apps on Your Own Data", excerpt: "From document ingestion to query-time retrieval — how we build production RAG systems for enterprise clients.", category: "AI/ML",  date: "Feb 12, 2026", readTime: "11 min", featured: false, accent: "#ec4899", image: "/assets/rag.png", content: `

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
` }
];

const STACK = ["React · TypeScript","Python · FastAPI","Node.js · Express","Kotlin · Flutter","TensorFlow · PyTorch","PostgreSQL · Redis","AWS · GCP · Docker","Figma · After Effects","Claude API · OpenAI","WebSocket · REST","M-Pesa · Stripe","Binance · Twelve Data"];

export {PROJECTS,SERVICES,ARTICLES,STACK}