import { useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { SERVICES } from "../utils/data";
import { SEO, SITE_URL } from "../components/SEO";

// ─── REQUEST A QUOTE ────────────────────────────────────────────
// A dedicated, indexable page for quote requests (separate from the
// general Contact page) so it can be crawled, ranked, and offered by
// Google as its own sitelink under a search for the company name.
export function RequestQuote() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append("subject", "New Quote Request — yobbytech.com");
    formData.append("access_key", "b488cb22-e436-419f-8e87-4192024a5c0c");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        formElement.reset();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const { scrollYProgress } = useScroll();

  return (
    <section className="contact-wrap">
      <SEO
        title="Request a Quote"
        description="Get a free, no-obligation quote from Yobby Technologies for web apps, mobile apps, fintech/M-Pesa integrations, AI, and trading bot projects. Tell us your scope and budget — we reply within 24 hours."
        path="/request-quote"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Custom software quote request",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "KE",
          url: `${SITE_URL}/request-quote`,
        }}
      />

      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="contact-grid"
      >
        {/* LEFT */}
        <div>
          <div className="chip">GET A QUOTE</div>

          <h1 className="title">
            Know your cost
            <span> upfront.</span>
          </h1>

          <p className="desc">
            Give us the scope, budget range, and timeline and
            we'll send back a clear, itemized quote — usually
            within 24 hours, no obligation.
          </p>

          <div className="features">
            {[
              "📧 hello@yobbytech.com",
              "📱 +254 726 553 481",
              "⚡ Reply in 24 hours",
              "📄 Itemized, fixed pricing",
              "🔒 NDA Friendly",
              "🌍 Remote Worldwide",
            ].map((item) => (
              <motion.div whileHover={{ x: 6 }} key={item} className="feature">
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <motion.div layout className="form-card">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="success"
              >
                <div className="emoji">📄</div>
                <h2>Quote Request Sent</h2>
                <p>
                  We received your request and will send your
                  quote within 24 hours.
                </p>
                <button className="btn" onClick={() => setSent(false)}>
                  Request Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="form"
              >
                <div className="row">
                  <input type="text" name="name" placeholder="Your Name" required />
                  <input type="email" name="email" placeholder="Email Address" required />
                </div>

                <input type="text" name="company" placeholder="Company (optional)" />

                <div className="row">
                  <select name="service" required defaultValue="">
                    <option value="">What do you need?</option>
                    {SERVICES.map((s) => (
                      <option key={s.subtitle}>{s.title}</option>
                    ))}
                    <option>Something else</option>
                  </select>

                  <select name="budget" required defaultValue="">
                    <option value="">Estimated Budget</option>
                    <option>Under $1k</option>
                    <option>$1k – $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k+</option>
                  </select>
                </div>

                <select name="timeline" defaultValue="">
                  <option value="">Timeline</option>
                  <option>ASAP</option>
                  <option>2-4 weeks</option>
                  <option>1-2 months</option>
                  <option>Flexible</option>
                </select>

                <textarea
                  name="message"
                  rows={6}
                  placeholder="Describe what you need built, key features, and any deadlines..."
                  required
                />

                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Get My Quote →"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
