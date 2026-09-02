import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Share2, Check } from "lucide-react";
import { ARTICLES } from "../utils/data";
import { AdaptiveImage } from "../utils/AdaptiveImage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function ArticleView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const article = ARTICLES.find((a) => a.id === slug);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="not-found">
        <div>
          <p>Article not found</p>
          <Link to="/articles" className="btn-p" style={{ marginTop: 16, display: "inline-block" }}>
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const related = ARTICLES.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 3);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.excerpt, url });
        return;
      }
    } catch { /* fallback */ }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  // Pre-process markdown to render inline images with our optimized AdaptiveImage view logic
  const renderMarkdownComponents = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      // Create structural fallback structure for content inline images dynamically
      const contentImages = {
        avif: src ? src.replace('auto=format', 'auto=format&format=avif') : '',
        webp: src ? src.replace('auto=format', 'auto=format&format=webp') : '',
        fallback: src || ''
      };
      return (
        <span className="markdown-adaptive-image-wrap" style={{ display: 'block', margin: '2rem 0' }}>
          <AdaptiveImage images={contentImages} alt={alt || "Article illustration"} aspectRatio="16/10" />
        </span>
      );
    }
  };

  return (
    <div className="article-view">
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />

      {/* COMPREHENSIVE ADAPTIVE HERO BACKGROUND */}
      <div className="article-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ scale, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} className="hero-image-zoom-layer">
          <AdaptiveImage 
            images={article.images} 
            alt={article.title} 
            aspectRatio="21/9"
            className="hero-image-raw"
          />
        </motion.div>
        <div className="article-overlay" style={{ zIndex: 1 }} />

        <div className="article-hero-top" style={{ zIndex: 2, position: 'relative' }}>
          <button className="job-back-link article-back-link" onClick={() => navigate("/articles")}>
            <ArrowLeft size={15} /> All Articles
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="article-hero-content"
          style={{ zIndex: 2, position: 'relative' }}
        >
          <span className="pill" style={{ background: article.accent + "22", color: article.accent }}>
            {article.category}
          </span>

          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>

          <div className="article-info">
            {article.author && (
              <span className="article-byline">
                <span className="article-avatar" style={{ background: article.accent }}>
                  {article.author.slice(0, 1)}
                </span>
                <span>
                  {article.author}
                  {article.authorRole && <span className="article-author-role"> · {article.authorRole}</span>}
                </span>
              </span>
            )}
            <span>{article.date}</span>
            <span><Clock size={12} /> {article.readTime}</span>
          </div>
        </motion.div>
      </div>

      {/* CONTENT BODY SECTION */}
      <div className="article-content">
        <div className="article-body-content">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
            components={renderMarkdownComponents}
          >
            {article.content}
          </ReactMarkdown>

          <div className="article-share-row">
            <button className="job-share-btn" onClick={share}>
              {copied ? <><Check size={14} /> Link copied</> : <><Share2 size={14} /> Share this article</>}
            </button>
          </div>
        </div>

        {/* RELATED ARTICLES SECTION */}
        {related.length > 0 && (
          <div className="article-related">
            <h3>More on {article.category}</h3>
            <div className="article-related-grid">
              {related.map((a) => (
                <Link key={a.id} to={`/articles/${a.id}`} className="article-related-card">
                  <AdaptiveImage 
                    images={a.images} 
                    alt={a.title} 
                    aspectRatio="16/10" 
                    className="article-related-thumb-adaptive" 
                  />
                  <div className="article-related-body">
                    <span className="pill" style={{ background: a.accent + "18", color: a.accent }}>{a.category}</span>
                    <h4>{a.title}</h4>
                    <span className="article-related-meta">{a.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}