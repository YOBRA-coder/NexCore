import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";
import { JOBS } from "../utils/data";
import type { Job } from "../utils/Shared";
import { JobApplyForm } from "../components/JobApplyForm";
import { SEO, SITE_URL } from "../components/SEO";

export const GENERAL_JOB: Job = {
  id: "general",
  title: "General Application",
  department: "Open",
  type: "Any",
  location: "Remote",
  level: "Any",
  accent: "#a855f7",
  icon: "✨",
  posted: "",
  description: "We're always open to hearing from strong engineers, designers, and traders — even without a listed role open.",
  responsibilities: [],
  requirements: [],
};

// ─── CAREERS ──────────────────────────────────────────────────
export function Careers() {
  const [dept, setDept] = useState("All");
  const [openGeneral, setOpenGeneral] = useState(false);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(JOBS.map((j) => j.department)))],
    []
  );

  const filtered = useMemo(
    () => (dept === "All" ? JOBS : JOBS.filter((j) => j.department === dept)),
    [dept]
  );

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: 68 }}>
      <SEO
        title="Careers"
        description="Open engineering, design, and trading roles at Yobby Technologies — a remote-friendly digital studio building web, mobile, fintech and AI products."
        path="/careers"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: filtered.map((j, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/careers/${j.id}`,
            name: j.title,
          })),
        }}
      />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div className="mesh" />
        <div className="grid-bg" />

        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "5rem 1.5rem 4rem", position: "relative" }}>
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div className="chip" style={{ margin: "0 auto 1.5rem" }}>
              <Sparkles size={12} /> We're hiring
            </div>

            <h1
              style={{
                fontFamily: "var(--fd)",
                fontWeight: 700,
                fontSize: "clamp(2.2rem,4.5vw,3.6rem)",
                color: "var(--t)",
                letterSpacing: "-.03em",
              }}
            >
              Build the future <span className="gtext">with us.</span>
            </h1>

            <p
              style={{
                fontFamily: "var(--fb)",
                color: "var(--t2)",
                fontSize: 17,
                marginTop: 16,
                maxWidth: 560,
                marginInline: "auto",
              }}
            >
              We're a small, fast-moving studio shipping real products for real clients. Remote-friendly, outcome-driven, and always building something new.
            </p>

            <div className="careers-perks">
              {["🌍 Remote-first", "💰 Competitive pay", "⚡ Real shipped work", "📈 Room to grow"].map((p) => (
                <span key={p} className="careers-perk">{p}</span>
              ))}
            </div>
          </motion.div>

          {/* FILTERS */}
          <div className="products-filters" style={{ marginBottom: "2.5rem" }}>
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`filter-btn ${dept === d ? "filter-active" : ""}`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* JOB LIST */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "5rem" }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((job) => (
                <motion.div
                  key={job.id}
                  variants={item}
                  layout
                  whileHover={{ y: -4 }}
                  className="job-card"
                  style={{ borderLeft: `3px solid ${job.accent}`, cursor: "pointer" }}
                  onClick={() => navigate(`/careers/${job.id}`)}
                >
                  <div className="job-card-icon" style={{ background: job.accent + "18", color: job.accent }}>
                    {job.icon}
                  </div>

                  <div className="job-card-body">
                    <div className="job-card-top">
                      <h3>{job.title}</h3>
                      <span className="job-posted">{job.posted}</span>
                    </div>

                    <p className="job-desc">{job.description}</p>

                    <div className="job-meta">
                      <span><Briefcase size={13} /> {job.department}</span>
                      <span><MapPin size={13} /> {job.location}</span>
                      <span><Clock size={13} /> {job.type}</span>
                      <span className="job-level" style={{ color: job.accent }}>{job.level}</span>
                    </div>
                  </div>

                  <button
                    className="job-apply-btn"
                    onClick={(e) => { e.stopPropagation(); navigate(`/careers/${job.id}`); }}
                  >
                    View & Apply <ArrowRight size={15} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--t3)" }}>
                No open roles in this department right now.
              </div>
            )}
          </motion.div>

          {/* NO ROLE FIT CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="careers-open-cta"
          >
            <div>
              <h3>Don't see the right role?</h3>
              <p>We're always open to hearing from strong engineers, designers, and traders. Send us your work.</p>
            </div>
            <button className="btn-p" onClick={() => setOpenGeneral(true)}>
              Send Open Application →
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {openGeneral && (
          <motion.div
            className="preview-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenGeneral(false)}
          >
            <motion.div
              className="apply-modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setOpenGeneral(false)} className="close-btn">
                <X size={18} />
              </button>
              <div style={{ padding: "2rem" }}>
                <JobApplyForm job={GENERAL_JOB} onClose={() => setOpenGeneral(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
