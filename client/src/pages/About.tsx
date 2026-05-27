import { motion, useScroll, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function About() {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
  return (
    <div className="about-page">
    <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>

      {/* Background Effects */}
      <div className="bg-grid" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="noise" />

      <div className="containerAbout">
        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="show"
          className="heroAbout"
        >
          <motion.div variants={fadeUp} className="chip">
            About YobbyTech
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1}>
            A digital studio that
            <span> solves real problems</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2}>
            YobbyTech is a full-service technology studio based in
            Nakuru, Kenya. We build web applications, AI systems,
            trading platforms, Android apps, and cloud infrastructure
            for clients across Africa and globally.
          </motion.p>

          <motion.p variants={fadeUp} custom={3}>
            We don't prototype forever. We build systems that ship,
            scale, and generate value in the real world.
          </motion.p>
        </motion.section>

        {/* VALUES */}
        <section className="section">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp}>
              How We Think
            </motion.h2>

            <div className="values-grid">
              {[
                {
                  icon: "⚡",
                  title: "We Ship",
                  body:
                    "Ideas become production systems with real business impact.",
                  color: "#8b5cf6",
                },
                {
                  icon: "🎯",
                  title: "We Solve",
                  body:
                    "We deeply understand the problem before touching code.",
                  color: "#00e5b4",
                },
                {
                  icon: "🔗",
                  title: "We Own It",
                  body:
                    "Full-stack ownership from infrastructure to UI.",
                  color: "#f59e0b",
                },
                {
                  icon: "🌍",
                  title: "Africa-Native",
                  body:
                    "Built in Kenya with deep understanding of local systems.",
                  color: "#22c55e",
                },
                {
                  icon: "📐",
                  title: "Quality First",
                  body:
                    "Everything tested, documented, and built long-term.",
                  color: "#0ea5e9",
                },
                {
                  icon: "🤝",
                  title: "Clear Pricing",
                  body:
                    "Transparent scope, transparent cost, zero surprises.",
                  color: "#ec4899",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="value-card"
                  style={{
                    borderColor: `${item.color}30`,
                  }}
                >
                  <div
                    className="glow"
                    style={{ background: item.color }}
                  />

                  <div className="icon">{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* TECH STACK */}
        <section className="section stack-section">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Technology Stack
          </motion.h2>

          <div className="stack-grid">
            {[
              {
                title: "Frontend",
                tech: ["React", "Next.js", "Vue", "Flutter"],
                color: "#0ea5e9",
              },
              {
                title: "Backend",
                tech: ["FastAPI", "Node.js", "Django", "WebSockets"],
                color: "#8b5cf6",
              },
              {
                title: "Database",
                tech: ["PostgreSQL", "Redis", "MongoDB", "Firebase"],
                color: "#00e5b4",
              },
              {
                title: "Cloud",
                tech: ["AWS", "Docker", "CI/CD", "Nginx"],
                color: "#f59e0b",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="stack-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="stack-line"
                  style={{ background: item.color }}
                />

                <h3>{item.title}</h3>

                {item.tech.map((t) => (
                  <div key={t} className="tech">
                    {t}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          {[
            ["Countries Served", "5+"],
            ["Projects Delivered", "40+"],
            ["Avg Delivery", "3 Weeks"],
            ["Client Retention", "92%"],
          ].map(([label, value], i) => (
            <motion.div
              key={label}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3>{value}</h3>
              <span>{label}</span>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <motion.section
          className="cta"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>
            Let’s build something exceptional.
          </h2>

          <button
            className="cta-btn"
            onClick={() => navigate("/contact")}
          >
            Work With Us
          </button>
        </motion.section>
      </div>
   
    </div>
    
  );
}