import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  X,
  ExternalLink,
} from "lucide-react";
import { PROJECTS } from "../utils/data";
import {PCard} from "../components/PCard";
import { SEO } from "../components/SEO";



export function Products() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<any | null>(null);

  const cats = [
    "all",
    "Forex · FinTech",
    "Crypto · Automation",
    "Multi-Asset · AI/ML",
    "Web · E-Commerce",
    "AI · SaaS",
  ];

  const cl: Record<string, string> = {
    all: "All",
    "Forex · FinTech": "Forex",
    "Crypto · Automation": "Crypto",
    "Multi-Asset · AI/ML": "AI/ML",
    "Web · E-Commerce": "Web",
    "AI · SaaS": "AI SaaS",
  };
  const { scrollYProgress } = useScroll();
  const filtered = useMemo(() => {
    return filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="products-page">
    <SEO
      title="Products"
      description="Explore web apps, mobile apps, fintech and trading platforms built by Yobby Technologies for clients across Kenya and Africa."
      path="/products"
    />
    <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>
      <div className="products-bg products-bg-1" />
      <div className="products-bg products-bg-2" />

      <div className="products-wrap">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="products-hero"
        >
          <div>
            <div className="products-chip">
              <Sparkles size={14} />
              Our Platforms
            </div>

            <h1 className="products-title">
              Built &
              <span className="gtext"> Deployed</span>
            </h1>

            <p className="products-sub">
              AI platforms, fintech systems, automation products, and scalable
              SaaS experiences built for performance and growth.
            </p>
          </div>

          <div className="products-stats">
            <div className="stat">
              <h3>{PROJECTS.length}+</h3>
              <span>Products</span>
            </div>

            <div className="stat">
              <h3>AI</h3>
              <span>Powered</span>
            </div>

            <div className="stat">
              <h3>24/7</h3>
              <span>Systems</span>
            </div>
          </div>
        </motion.div>

        {/* FILTERS */}
        <div className="products-filters">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`filter-btn ${
                filter === c ? "filter-active" : ""
              }`}
            >
              {cl[c] || c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="products-grid"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <PCard
                  project={p}
                  onPreview={() => setActive(p)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="products-cta">
          <div>
            <h3>Have an idea? Let’s build it.</h3>

            <p>
              Web, mobile, AI, trading systems — custom products built from
              scratch.
            </p>
          </div>

          <button
            onClick={() => navigate("/contact")}
            className="products-cta-btn"
          >
            Start a Project
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <PreviewModal
            project={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}



/* ------------------------------------------------ */
/* REQUEST BUTTON — routes into Contact with context */
/* ------------------------------------------------ */

function RequestProjectButton({ project }: { project: any }) {
  const navigate = useNavigate();
  return (
    <button
      className="products-cta-btn products-cta-btn-ghost"
      onClick={() =>
        navigate("/contact", {
          state: {
            projectName: project.name,
            message: `Hi! I saw ${project.name} in your portfolio and I'd like something similar built for me. Here's what I need:\n\n`,
          },
        })
      }
    >
      Request Something Like This
      <ArrowRight size={16} />
    </button>
  );
}

/* ------------------------------------------------ */
/* MODAL */
/* ------------------------------------------------ */

function PreviewModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  const isLive = project.status === "live";
  const isBeta = project.status === "beta";

  return (
    <motion.div
      className="preview-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="preview-modal"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button onClick={onClose} className="close-btn">
          <X size={18} />
        </button>

        {/* PREVIEW */}
        <div className="iframe-wrap">
          {(isLive || isBeta) && project.url ? (
            <>
              <iframe
                src={project.url}
                title={project.name}
                className="project-iframe"
                loading="lazy"
                allow="fullscreen"
              />

              {/* optional beta overlay */}
      
            </>
          ) : (
            <div className="image-preview-fallback">
              <img
                src={project.image}
                alt={project.name}
                className="preview-image"
              />

              <div className="dev-overlay">
                <h3>Currently In Development</h3>

                <p>
                  Live preview unavailable at the moment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="preview-content">
          <div className="preview-category">
            {project.category}
          </div>

          <h2>{project.name}</h2>

          <p>{project.description}</p>

          {project.tags && (
            <div className="product-tags">
              {project.tags.map((t: string) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}

          <div className="preview-actions">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="products-cta-btn"
              >
                Open Full Project
                <ExternalLink size={16} />
              </a>
            )}

            <RequestProjectButton project={project} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}