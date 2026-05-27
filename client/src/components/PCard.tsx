/* ------------------------------------------------ */
/* CARD */
/* ------------------------------------------------ */

import { motion } from "framer-motion";
import { Globe, Eye, Wrench, ExternalLink } from "lucide-react";

export function PCard({
  project,
  onPreview,
}: {
  project: any;
  onPreview: () => void;
}) {
  type ViewMode = "live" | "beta" | "dev";
  const mode: ViewMode = project.status || "live";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="product-card"
      style={{ background:project.gradient,border:"1px solid var(--b)",borderRadius:20,overflow:"hidden",cursor:"pointer",transition:"all .3s cubic-bezier(.22,1,.36,1)" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = project.accent+"44"; el.style.boxShadow = `0 20px 60px ${project.accent}14`; el.style.transform = "translateY(-5px)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--b)"; el.style.boxShadow = "none"; el.style.transform = "none"; }}
    
    >
      {/* IMAGE */}
      <div className="product-image-wrap" >
        <img
          src={project.image}
          alt={project.title}
          className="product-image"
        />

        <div className="product-overlay" />

        <div className="product-top">
          <div className={`status-badge status-${mode}`}>
            {mode === "live" && <Globe size={12} />}
            {mode === "beta" && <Eye size={12} />}
            {mode === "dev" && <Wrench size={12} />}

            {mode === "live"
              ? "LIVE"
              : mode === "beta"
              ? "BETA"
              : "IN DEV"}
          </div>
        </div>

        <div className="product-actions">
          <button onClick={onPreview} className="action-btn">
            <Eye size={15} />
            Preview
          </button>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="action-btn action-primary"
            >
              Visit
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="product-content">
        <div className="product-category" style={{ color: project.accent  }}>
          {project.category}
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        {project.tags && (
          <div className="product-tags">
            {project.tags.map((t: string) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}