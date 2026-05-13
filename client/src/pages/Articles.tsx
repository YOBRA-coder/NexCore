import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { ARTICLES } from "../utils/data";

export function Articles() {
  const featured = ARTICLES.filter(a => a.featured);
  const rest = ARTICLES.filter(a => !a.featured);
  const { scrollYProgress } = useScroll();
  return (
    <div className="articles-page">
     <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>      
      {/* BACKGROUND */}
      <div className="articles-bg" />

      <div className="articles-container">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="articles-hero"
        >
          <div className="chip">
            KNOWLEDGE BASE
          </div>

          <h1>
            Build{" "}
            <span className="gtext">
              Intelligence
            </span>
          </h1>

          <p>
            Engineering deep-dives, system architecture,
            AI workflows, product thinking, and strategy.
          </p>
        </motion.div>

        {/* FEATURED */}
        <div className="featured-grid">
          {featured.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .1 }}
            >
              <Link
                to={`/articles/${a.id}`}
                className="featured-card"
              >
                <div
                  className="featured-image"
                  style={{
                    backgroundImage: `url(${a.image})`
                  }}
                />

                <div className="featured-overlay" />

                <div className="featured-content">

                  <div className="featured-top">
                    <span
                      className="pill"
                      style={{
                        background: a.accent + "22",
                        color: a.accent
                      }}
                    >
                      {a.category}
                    </span>

                    <span className="featured-badge">
                      Featured
                    </span>
                  </div>

                  <h2>{a.title}</h2>

                  <p>{a.excerpt}</p>

                  <div className="featured-meta">
                    <span>{a.date}</span>
                    <span>•</span>
                    <span>{a.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ARTICLES */}
        <div className="articles-grid">
          {rest.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .06 }}
            >
              <Link
                to={`/articles/${a.id}`}
                className="article-card"
              >
                <div
                  className="article-thumb"
                  style={{
                    backgroundImage: `url(${a.image})`
                  }}
                />

                <div className="article-body">

                  <span
                    className="pill"
                    style={{
                      background: a.accent + "18",
                      color: a.accent
                    }}
                  >
                    {a.category}
                  </span>

                  <h3>{a.title}</h3>

                  <p>{a.excerpt}</p>

                  <div className="article-meta">
                    <span>{a.date}</span>
                    <span>{a.readTime}</span>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}