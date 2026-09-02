import { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import { ARTICLES } from "../utils/data";
import { AdaptiveImage } from "../utils/AdaptiveImage";

export function Articles() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const { scrollYProgress } = useScroll();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(ARTICLES.map((a) => a.category)))],
    []
  );

  const matches = (a: (typeof ARTICLES)[number]) => {
    const inCat = cat === "All" || a.category === cat;
    const q = query.trim().toLowerCase();
    const inQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return inCat && inQuery;
  };

  const featured = ARTICLES.filter((a) => a.featured && matches(a));
  const rest = ARTICLES.filter((a) => !a.featured && matches(a));
  const noResults = featured.length === 0 && rest.length === 0;

  return (
    <div className="articles-page">
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <div className="articles-bg" />

      <div className="articles-container">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="articles-hero"
        >
          <div className="chip">KNOWLEDGE BASE</div>
          <h1>
            Build <span className="gtext">Intelligence</span>
          </h1>
          <p>
            Engineering deep-dives, system architecture, AI workflows, product thinking, and strategy — straight from the team shipping the work.
          </p>

          <div className="articles-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
            />
          </div>

          <div className="products-filters" style={{ marginTop: "1.5rem" }}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`filter-btn ${cat === c ? "filter-active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FEATURED ARTICLES */}
        {featured.length > 0 && (
          <div className="featured-grid">
            <AnimatePresence>
              {featured.map((a, i) => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/articles/${a.id}`} className="featured-card" style={{ position: 'relative', overflow: 'hidden', display: 'block' }}>
                    <div className="featured-image-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                      <AdaptiveImage 
                        images={a.images} 
                        alt={a.title} 
                        className="featured-image-raw"
                        aspectRatio="16/9"
                      />
                    </div>
                    <div className="featured-overlay" style={{ zIndex: 1 }} />

                    <div className="featured-content" style={{ position: 'relative', zIndex: 2 }}>
                      <div className="featured-top">
                        <span className="pill" style={{ background: a.accent + "22", color: a.accent }}>
                          {a.category}
                        </span>
                        <span className="featured-badge">Featured</span>
                      </div>

                      <h2>{a.title}</h2>
                      <p>{a.excerpt}</p>

                      <div className="featured-meta">
                        {a.author && (
                          <span className="article-byline">
                            <span className="article-avatar" style={{ background: a.accent }}>
                              {a.author.slice(0, 1)}
                            </span>
                            {a.author}
                          </span>
                        )}
                        <span>{a.date}</span>
                        <span><Clock size={11} /> {a.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* REGULAR ARTICLES GRID */}
        <div className="articles-grid">
          <AnimatePresence>
            {rest.map((a, i) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/articles/${a.id}`} className="article-card" style={{ textDecoration: "none" }}>
                  <AdaptiveImage 
                    images={a.images} 
                    alt={a.title} 
                    className="article-thumb-adaptive" 
                    aspectRatio="16/10"
                  />

                  <div className="article-body">
                    <span className="pill" style={{ background: a.accent + "18", color: a.accent }}>
                      {a.category}
                    </span>

                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>

                    <div className="article-meta">
                      {a.author && (
                        <span className="article-byline">
                          <span className="article-avatar article-avatar-sm" style={{ background: a.accent }}>
                            {a.author.slice(0, 1)}
                          </span>
                          {a.author}
                        </span>
                      )}
                      <span>{a.date} · {a.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {noResults && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--t3)" }}>
            No articles match "{query}"{cat !== "All" ? ` in ${cat}` : ""}.
          </div>
        )}
      </div>
    </div>
  );
}