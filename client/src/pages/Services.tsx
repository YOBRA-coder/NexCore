import { useNavigate } from "react-router-dom";
import { SERVICES } from "../utils/data";
import { motion, useScroll } from "framer-motion";

// ─── SERVICES ─────────────────────────────────────────────────
export function Services() {
  const navigate = useNavigate();
 

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};
const { scrollYProgress } = useScroll();
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

return (
  <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: 68 }}>
    <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>

    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="mesh" />
      <div className="grid-bg" />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "5rem 1.5rem 4rem", position: "relative" }}>
        
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <div className="chip" style={{ margin: "0 auto 1.5rem" }}>
            Services & Pricing
          </div>

          <h1 style={{
            fontFamily: "var(--fd)",
            fontWeight: 700,
            fontSize: "clamp(2.2rem,4.5vw,3.6rem)",
            color: "var(--t)",
            letterSpacing: "-.03em"
          }}>
            What We <span className="gtext">Deliver</span>
          </h1>

          <p style={{
            fontFamily: "var(--fb)",
            color: "var(--t2)",
            fontSize: 17,
            marginTop: 16,
            maxWidth: 560,
            marginInline: "auto"
          }}>
            Every solution is engineered from scratch — tailored, scalable, and built for performance.
          </p>
        </motion.div>

        {/* SERVICES */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1.25rem",
            marginBottom: "5rem"
          }}
          className="g2"
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card"
              style={{
                padding: "2rem",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* glow accent */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at top left, ${svc.accent}22, transparent 60%)`,
                  pointerEvents: "none"
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: 34 }}>{svc.icon}</div>

                  <h3 style={{
                    fontFamily: "var(--fd)",
                    fontWeight: 700,
                    color: "var(--t)",
                    fontSize: 19
                  }}>
                    {svc.title}
                  </h3>

                  <div style={{
                    fontFamily: "var(--fm)",
                    fontSize: 11,
                    color: "var(--t3)",
                    letterSpacing: ".08em"
                  }}>
                    {svc.subtitle}
                  </div>
                </div>

                <div style={{
                  fontFamily: "var(--fd)",
                  fontWeight: 700,
                  fontSize: 17,
                  color: svc.accent
                }}>
                  {svc.price}
                </div>
              </div>

              <p style={{
                fontFamily: "var(--fb)",
                fontSize: 14,
                color: "var(--t2)",
                lineHeight: 1.7,
                marginBottom: "1.25rem"
              }}>
                {svc.description}
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 12px",
                marginBottom: "1.5rem"
              }}>
                {svc.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: svc.accent
                    }} />
                    <span style={{
                      fontSize: 12.5,
                      color: "var(--t2)"
                    }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  navigate("/contact", {
                    state: {
                      service: svc.title,
                      message: `Hi! I'm interested in ${svc.title} (${svc.subtitle}). Here's what I need:\n\n`,
                    },
                  })
                }
                style={{
                  background: svc.accent + "15",
                  border: `1px solid ${svc.accent}40`,
                  color: svc.accent,
                  padding: "10px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Request Quote →
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* PROCESS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "5rem" }}
        >
          <h2 style={{
            fontFamily: "var(--fd)",
            fontSize: "2rem",
            color: "var(--t)",
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            How We Work
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1rem"
          }} className="g4">

            {[
              ["01", "🔍", "Discovery", "We understand your goals in a focused strategy call."],
              ["02", "📋", "Scoping", "Clear deliverables, timeline, and fixed pricing."],
              ["03", "⚡", "Build Sprint", "Weekly progress updates with real demos."],
              ["04", "🚀", "Launch", "Deployment, optimization, and support."]
            ].map(([step, icon, title, desc]) => (
              <motion.div
                key={step}
                whileHover={{ y: -6 }}
                style={{
                  padding: "1.5rem",
                  background: "var(--s)",
                  border: "1px solid var(--b)",
                  borderRadius: 18,
                  textAlign: "center"
                }}
              >
                <div style={{ color: "#a855f7", fontSize: 11, marginBottom: 10 }}>
                  {step}
                </div>
                <div style={{ fontSize: 28 }}>{icon}</div>
                <h3 style={{ color: "var(--t)", marginTop: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "var(--t3)" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ textAlign: "center" }}
        >
          <button
            onClick={() => navigate("/contact")}
            className="btn-p"
            style={{
              fontSize: 16,
              padding: "15px 40px"
            }}
          >
            Start a Conversation →
          </button>
        </motion.div>

      </div>
    </div>
  </div>
);
}