/* ------------------------------------------------ */
/* CARD (compact — used on Home) */
/* ------------------------------------------------ */

import { motion } from "framer-motion";
import { Globe, Eye, Wrench, ExternalLink, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProjectEngagement } from "../utils/Shared";

export function PCard({
  project,
}: {
  project: any;
}) {
  type ViewMode = "live" | "beta" | "dev";
  const mode: ViewMode = project.status || "live";
  const navigate = useNavigate();
  const { liked, likes, toggleLike } = useProjectEngagement(project.id, project.baseLikes ?? 12);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="product-card"
      style={{ background:project.gradient,border:"1px solid var(--b)",borderRadius:20,overflow:"hidden",cursor:"pointer",transition:"all .3s cubic-bezier(.22,1,.36,1)" }}
      onClick={() => navigate("/products")}
    >
      {/* IMAGE */}
      <div className="product-image-wrap">
        <img
          src={project.image}
          alt={project.name}
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

          <button
            className={`like-badge${liked ? " liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); toggleLike(); }}
            title={liked ? "Unlike" : "Like this project"}
          >
            <Heart size={13} fill={liked ? "#ff5c8a" : "none"} />
            {likes}
          </button>
        </div>

        <div className="product-actions">
           {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
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
        <div className="product-category">
          {project.category}
        </div>

        <h3>{project.name}</h3>

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
