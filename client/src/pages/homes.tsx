import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import { SERVICES } from "../utils/data";


const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Homes() {
  const heroRef = React.useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = React.useState({
    x: 50,
    y: 50,
  });

  const { scrollYProgress } = useScroll();

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.15]
  );

  const onMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="home">
      {/* PROGRESS BAR */}
      <motion.div
        className="progress"
        style={{
          scaleX: scrollYProgress,
        }}
      />

      {/* HERO */}
      <section
        ref={heroRef}
        onMouseMove={onMove}
        className="hero"
      >
        {/* BG */}
        <motion.div
          style={{ scale }}
          className="aurora"
        />

        <div className="grid-bg" />

        {/* SPOTLIGHT */}
        <div
          className="spotlight"
          style={{
            background: `radial-gradient(
              700px circle at ${mouse.x}% ${mouse.y}%,
              rgba(124,58,237,.18),
              transparent 60%
            )`,
          }}
        />

        {/* PARTICLES */}
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.span
            key={i}
            className="particle"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration:
                Math.random() * 5 + 4,
              repeat: Infinity,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <div className="container hero-grid">
          {/* LEFT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="chip">
              <span className="dot" />
              Enterprise Digital Studio
            </div>

            <h1 className="hero-title">
              Software &
              <br />
              <span className="gtext">
                Digital Solutions
              </span>
              <br />
              <span className="hero-sub">
                engineered for modern businesses
              </span>
            </h1>

            <p className="hero-desc">
              YobbyTech builds AI systems,
              trading infrastructure,
              cloud platforms, mobile apps,
              and scalable digital products
              for startups and enterprises.
            </p>

            <div className="hero-actions">
              <button className="btn-primary">
                Explore Services →
              </button>

              <button className="btn-secondary">
                View Portfolio
              </button>
            </div>

            {/* STATS */}
            <div className="stats">
              {[
                {
                  value: 120,
                  suffix: "+",
                  label: "Projects",
                },
                {
                  value: 80,
                  suffix: "+",
                  label: "Clients",
                },
                {
                  value: 99,
                  suffix: "%",
                  label: "Uptime",
                },
                {
                  value: 5,
                  suffix: "yrs",
                  label: "Experience",
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -8,
                  }}
                  className="stat-card"
                >
                  <div className="stat-number">
                    <CountUp
                      end={s.value}
                      duration={3}
                    />
                    {s.suffix}
                  </div>

                  <div className="stat-label">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="dashboard-wrap"
          >
            <Tilt
              glareEnable
              glareMaxOpacity={0.12}
              scale={1.03}
            >
              <div className="dashboard">
                <div className="dash-top">
                  <div>
                    <h4>Yobby Technologies Analytics</h4>
                    <p>
                      Real-time infrastructure
                    </p>
                  </div>

                  <div className="live">
                    <span />
                    LIVE
                  </div>
                </div>

                {/* CHART */}
                <div className="chart">
                  <div className="chart-glow" />

                  <svg viewBox="0 0 500 200">
                    <path
                      d="M0 160 C100 120 180 40 260 80 C340 120 420 20 500 60"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* GRID */}
                <div className="mini-grid">
                  <div className="mini purple">
                    <span>Revenue</span>
                    <h3>$84k</h3>
                  </div>

                  <div className="mini green">
                    <span>Users</span>
                    <h3>24.8k</h3>
                  </div>

                  <div className="mini gold">
                    <span>AI Tasks</span>
                    <h3>18M</h3>
                  </div>

                  <div className="mini blue">
                    <span>Latency</span>
                    <h3>12ms</h3>
                  </div>
                </div>

                {/* FLOATING */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="float-card left"
                >
                  AI ACTIVE
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="float-card right"
                >
                  CLOUD ONLINE
                </motion.div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="section-head"
          >
            <div className="chip">
              Our Expertise
            </div>

            <h2>
              One Studio.
              <span className="gtext">
                {" "}
                Every Layer.
              </span>
            </h2>

            <p>
              We build everything from
              frontend interfaces to AI
              infrastructure and cloud systems.
            </p>
          </motion.div>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <Tilt
                glareEnable
                glareMaxOpacity={0.1}
                key={i}
              >
                <motion.div
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  className="service-card"
                >
                  <div
                    className="icon"
                    style={{
                      background: `${svc.accent}22`,
                    }}
                  >
                    {svc.icon}
                  </div>

                  <h3>{svc.title}</h3>

                  <p>{svc.subtitle}</p>

                  <div
                    className="price"
                    style={{
                      color: svc.accent,
                    }}
                  >
                    {svc.price}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
