import { useState } from "react";
import { SERVICES } from "../utils/data";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    formData.append(
      "access_key",
      "YOUR_WEB3FORMS_ACCESS_KEY"
    );

    try {
      const res = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setSent(true);
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };
  const { scrollYProgress } = useScroll();

  return (
    <section className="contact-wrap">
    <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="contact-grid"
      >
        {/* LEFT */}
        <div>
          <div className="chip">
            LET'S BUILD
          </div>

          <h1 className="title">
            Build something
            <span> exceptional.</span>
          </h1>

          <p className="desc">
            Tell us about your project,
            goals, timeline, and requirements.
            We’ll reply within 24 hours.
          </p>

          <div className="features">
            {[
              "⚡ Fast Response",
              "🔒 NDA Friendly",
              "🌍 Remote Worldwide",
              "📦 Fixed Pricing",
            ].map((item) => (
              <motion.div
                whileHover={{ x: 6 }}
                key={item}
                className="feature"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <motion.div
          layout
          className="form-card"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="success"
              >
                <div className="emoji">
                  🚀
                </div>

                <h2>Project Brief Sent</h2>

                <p>
                  We received your inquiry and
                  will respond within 24 hours.
                </p>

                <button
                  className="btn"
                  onClick={() => setSent(false)}
                >
                  Send Another
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
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="company"
                  placeholder="Company (optional)"
                />

                <div className="row">
                  <select
                    name="service"
                    required
                  >
                    <option value="">
                      Service Needed
                    </option>

                    {SERVICES.map((s) => (
                      <option key={s.subtitle}>
                        {s.title}
                      </option>
                    ))}
                  </select>

                  <select name="budget">
                    <option value="">
                      Budget
                    </option>

                    <option>
                      Under $1k
                    </option>

                    <option>
                      $1k – $5k
                    </option>

                    <option>
                      $5k – $15k
                    </option>

                    <option>
                      $15k+
                    </option>
                  </select>
                </div>

                <select name="timeline">
                  <option value="">
                    Timeline
                  </option>

                  <option>
                    ASAP
                  </option>

                  <option>
                    2-4 weeks
                  </option>

                  <option>
                    1-2 months
                  </option>

                  <option>
                    Flexible
                  </option>
                </select>

                <textarea
                  name="message"
                  rows={6}
                  placeholder="Describe your project..."
                  required
                />

                {/* FILE UPLOAD */}
                <div className="upload">
                  <label>
                    Attach Files
                  </label>

                  <input
                    type="file"
                    name="attachment"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                  />

                  <small>
                    PDFs, docs, screenshots,
                    zip files allowed
                  </small>
                </div>

                <button
                  className="btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Sending..."
                    : "Send Project Brief →"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}