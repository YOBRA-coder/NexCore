import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

const DISMISS_KEY = "yb_promo_dismissed_v1";

export function PromoBanner() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(DISMISS_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* noop */ }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="promo-banner-wrap"
        >
          <div className="promo-banner">
            <div className="promo-banner-text">
              <Sparkles size={15} />
              <span>
                <strong>Launch offer:</strong> 20% off your first project this month — mention code&nbsp;
                <span className="promo-code">LAUNCH20</span>
              </span>
            </div>
            <div className="promo-banner-actions">
              <button
                className="promo-banner-cta"
                onClick={() => navigate("/contact", { state: { message: "Hi! I'd like to claim the LAUNCH20 offer for my project:\n\n" } })}
              >
                Claim offer <ArrowRight size={13} />
              </button>
              <button className="promo-banner-close" onClick={dismiss} aria-label="Dismiss">
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
