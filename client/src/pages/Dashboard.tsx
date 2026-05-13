import { useState } from "react";
import { PROJECTS } from "../utils/data";
import { statusMeta, type Page } from "../utils/Shared";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── DASHBOARD ────────────────────────────────────────────────
export function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const metrics = [
    { icon:"🚀",label:"Active Platforms",value:"6",delta:"+2 this month",c:"#00e5b4" },
    { icon:"⚡",label:"Total API Endpoints",value:"40+",delta:"Across services",c:"#a855f7" },
    { icon:"📊",label:"Signals Generated",value:"3.2K",delta:"+420 this week",c:"#f5a623" },
    { icon:"🌐",label:"Web Projects Live",value:"9",delta:"3 deploying",c:"#0ea5e9" }
  ];
   const { scrollYProgress } = useScroll();

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.15]
  );
  return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top, rgba(168,85,247,.12), transparent 35%), var(--bg)",
      paddingTop: 72,
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Ambient Blur */}
    <motion.div
      animate={{
        x: [0, 40, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        top: -120,
        right: -120,
        width: 420,
        height: 420,
        borderRadius: "50%",
        background: "rgba(168,85,247,.18)",
        filter: "blur(120px)",
        pointerEvents: "none",
      }}
    />

    <motion.div
      className="progress"
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background:
          "linear-gradient(90deg,#a855f7,#7c3aed,#22c55e)",
        transformOrigin: "0%",
        zIndex: 999,
      }}
    />

    <div
      style={{
        maxWidth: 1380,
        margin: "0 auto",
        padding: "3rem 1.5rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* HERO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.8rem",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="chip"
            style={{
              marginBottom: "1rem",
              background: "rgba(168,85,247,.12)",
              border: "1px solid rgba(168,85,247,.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            Internal Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            style={{
              fontFamily: "var(--fd)",
              fontWeight: 800,
              fontSize: "3rem",
              lineHeight: 1,
              color: "#fff",
              letterSpacing: "-.04em",
              marginBottom: 10,
            }}
          >
            NexCore Command Center
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--fb)",
              color: "var(--t3)",
              fontSize: 14,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Unified monitoring, analytics, infrastructure health,
            and operational intelligence across the NexCore ecosystem.
          </motion.p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "rgba(255,255,255,.03)",
            padding: 6,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          {["overview", "platforms", "services", "analytics"].map(
            (t) => (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background:
                    tab === t
                      ? "linear-gradient(135deg,#9333ea,#7c3aed)"
                      : "transparent",
                  border:
                    tab === t
                      ? "1px solid rgba(255,255,255,.12)"
                      : "1px solid transparent",
                  cursor: "pointer",
                  color: tab === t ? "#fff" : "var(--t3)",
                  fontFamily: "var(--fb)",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: "10px 18px",
                  borderRadius: 12,
                  textTransform: "capitalize",
                  transition: "all .25s ease",
                  boxShadow:
                    tab === t
                      ? "0 10px 30px rgba(124,58,237,.35)"
                      : "none",
                }}
              >
                {t}
              </motion.button>
            )
          )}
        </div>
      </div>

      {/* METRICS */}
      <div
        className="g4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1.1rem",
          marginBottom: "2rem",
        }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "1.6rem",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 24,
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at top right, ${m.c}22, transparent 40%)`,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: `${m.c}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  border: `1px solid ${m.c}33`,
                }}
              >
                {m.icon}
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: m.c,
                  background: `${m.c}16`,
                  border: `1px solid ${m.c}22`,
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                {m.delta}
              </div>
            </div>

            <div
              style={{
                fontFamily: "var(--fd)",
                fontWeight: 800,
                fontSize: 34,
                color: "#fff",
                position: "relative",
                zIndex: 2,
              }}
            >{m.value}</div>

            <div
              style={{
                fontFamily: "var(--fb)",
                fontSize: 13,
                color: "var(--t3)",
                marginTop: 6,
                position: "relative",
                zIndex: 2,
              }}
            >
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div
        className="g2"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 26,
            padding: "1.8rem",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.8rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--fd)",
                fontWeight: 700,
                color: "#fff",
                fontSize: 17,
              }}
            >
              Platform Registry
            </h3>

            <motion.button
              whileHover={{ x: 3 }}
              onClick={() => navigate("/products")}
              style={{
                background: "transparent",
                border: "none",
                color: "#a855f7",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              View All →
            </motion.button>
          </div>

          {PROJECTS.map((p, i) => {
            const sm = statusMeta(p.status);

            return (
              <motion.div
                key={p.id}
                whileHover={{
                  x: 4,
                  backgroundColor: "rgba(255,255,255,.02)",
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "14px 10px",
                  borderRadius: 16,
                  marginBottom: 6,
                  transition: "all .2s ease",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: `${p.accent}18`,
                    border: `1px solid ${p.accent}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    boxShadow: `0 0 30px ${p.accent}18`,
                  }}
                >
                  {p.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: 14,
                    }}
                  >
                    {p.name}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--t3)",
                      marginTop: 4,
                    }}
                  >
                    {p.category}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: sm.c,
                    }}
                  />

                  <span
                    style={{
                      color: sm.c,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".08em",
                    }}
                  >
                    {sm.l}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDEBAR */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* HEALTH */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015))",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 24,
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                color: "#fff",
                marginBottom: "1.4rem",
              }}
            >
              System Health
            </h3>

            {[
              ["Signal Engine", 100, "#00e5b4"],
              ["API Gateway", 100, "#a855f7"],
              ["WebSocket Feed", 98, "#f59e0b"],
              ["Database", 100, "#0ea5e9"],
            ].map(([n, p, c]) => (
              <div
                key={n as string}
                style={{ marginBottom: "1rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 7,
                  }}
                >
                  <span style={{ color: "var(--t2)", fontSize: 12 }}>
                    {n as string}
                  </span>

                  <span style={{ color: c as string, fontSize: 12 }}>
                    {p as number}%
                  </span>
                </div>

                <div
                  style={{
                    height: 6,
                    borderRadius: 999,
                    background: "rgba(255,255,255,.05)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p}%` }}
                    transition={{ duration: 1.2 }}
                    style={{
                      height: "100%",
                      background: c as string,
                      borderRadius: 999,
                      boxShadow: `0 0 18px ${c}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}