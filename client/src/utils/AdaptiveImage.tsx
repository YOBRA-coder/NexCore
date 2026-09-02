import React, { useState } from "react";

interface ImageSources {
  avif?: string;
  webp?: string;
  fallback: string;
}

interface AdaptiveImageProps {
  images?: ImageSources;
  alt: string;
  className?: string;
  aspectRatio?: string; // Enforce layout stability (e.g. "16/9", "21/9")
}

export function AdaptiveImage({ images, alt, className = "", aspectRatio }: AdaptiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!images) {
    return (
      <div 
        className={`image-skeleton-fallback ${className}`} 
        style={{ aspectRatio, background: "var(--bg-muted, #1e293b)", width: "100%" }} 
      />
    );
  }

  return (
    <div 
      className="adaptive-image-container" 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        width: "100%",
        aspectRatio: aspectRatio,
        background: "var(--bg-slate-900, #0f172a)"
      }}
    >
      {/* Visual Skeleton Anchoring to eradicate Cumulative Layout Shift (CLS) */}
      {!isLoaded && (
        <div 
          className="shimmer-skeleton-loader"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite linear",
            zIndex: 1
          }}
        />
      )}

      <picture style={{ width: "100%", height: "100%" }}>
        {images.avif && <source srcSet={images.avif} type="image/avif" />}
        {images.webp && <source srcSet={images.webp} type="image/webp" />}
        <img
          src={images.fallback}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`adaptive-image-element ${className}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "scale(1)" : "scale(1.02)"
          }}
        />
      </picture>
      
      {/* Global Style Injection Tag for the Shimmer Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />
    </div>
  );
}