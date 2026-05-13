import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ARTICLES } from "../utils/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function ArticleView() {
  const { slug } = useParams();

  const article = ARTICLES.find(
    a => a.id === slug
  );

const { scrollYProgress } = useScroll();

  const scale = useTransform(
    scrollYProgress, [0, 1], [1, 1.15]
  );
  if (!article) {
    return (
      <div className="not-found">
        Article not found
      </div>
    );
  }

  return (
    <div className="article-view" style={{}}>
      {/* HERO */}
      
      <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>
      <div
        className="article-hero"
        style={{
          backgroundImage: `url(${article.image})`
        }}
      >
         <motion.div style={{ scale }}/>
        <div className="article-overlay" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="article-hero-content"
        >
          <span
            className="pill"
            style={{
              background: article.accent + "22",
              color: article.accent
            }}
          >
            {article.category}
          </span>

          <h1>{article.title}</h1>

          <p>{article.excerpt}</p>

          <div className="article-info">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="article-content">
        <div className="article-body-content">
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
>
  {article.content}
</ReactMarkdown>
</div>
      </div>
    </div>
  );
}