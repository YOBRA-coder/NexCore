import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  TrendingUp,
  ArrowLeft,
  Share2,
  Check,
  CheckCircle2,
} from "lucide-react";
import { JOBS } from "../utils/data";
import { GENERAL_JOB } from "./Careers";
import { JobApplyForm } from "../components/JobApplyForm";

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [copied, setCopied] = useState(false);

  const job = id === "general" ? GENERAL_JOB : JOBS.find((j) => j.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: 68, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontFamily: "var(--fd)", color: "var(--t)", fontSize: 26 }}>Role not found</h1>
        <p style={{ color: "var(--t2)", fontFamily: "var(--fb)" }}>This job may have closed or the link is incorrect.</p>
        <Link to="/careers" className="btn-p">View all open roles</Link>
      </div>
    );
  }

  const share = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${job.title} — Yobby Technologies`,
      text: `We're hiring: ${job.title} (${job.department}). Apply here:`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      /* fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingTop: 68 }}>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div className="mesh" />
        <div className="grid-bg" />

        <div style={{ maxWidth: 980, margin: "0 auto", padding: "3.5rem 1.5rem 5rem", position: "relative" }}>
          <button className="job-back-link" onClick={() => navigate("/careers")}>
            <ArrowLeft size={15} /> All open roles
          </button>

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="job-detail-hero"
            style={{ borderLeft: `3px solid ${job.accent}` }}
          >
            <div className="job-detail-icon" style={{ background: job.accent + "18", color: job.accent }}>
              {job.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="job-detail-badges">
                <span className="job-level" style={{ color: job.accent }}>{job.level}</span>
                {job.posted && <span className="job-posted">{job.posted}</span>}
              </div>

              <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.7rem,4vw,2.4rem)", color: "var(--t)", letterSpacing: "-.02em", marginTop: 6 }}>
                {job.title}
              </h1>

              <div className="job-meta" style={{ marginTop: 14 }}>
                <span><Briefcase size={13} /> {job.department}</span>
                <span><MapPin size={13} /> {job.location}</span>
                <span><Clock size={13} /> {job.type}</span>
              </div>
            </div>

            <button className="job-share-btn" onClick={share}>
              {copied ? <><Check size={14} /> Copied</> : <><Share2 size={14} /> Share</>}
            </button>
          </motion.div>

          {/* BODY */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="job-detail-grid"
          >
            <div className="job-detail-body">
              <p className="job-detail-lead">{job.description}</p>

              {job.responsibilities.length > 0 && (
                <>
                  <h3><TrendingUp size={16} /> What you'll do</h3>
                  <ul className="job-detail-list">
                    {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </>
              )}

              {job.requirements.length > 0 && (
                <>
                  <h3><CheckCircle2 size={16} /> What we're looking for</h3>
                  <ul className="job-detail-list">
                    {job.requirements.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </>
              )}

              <div className="job-detail-note">
                Remote-friendly, async-first team based out of Nakuru, Kenya. We ship real products for real clients — expect fast iteration and direct ownership from day one.
              </div>
            </div>

            {/* APPLY FORM */}
            <div className="job-detail-apply" id="apply">
              <div className="job-detail-apply-card">
                <JobApplyForm job={job} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
