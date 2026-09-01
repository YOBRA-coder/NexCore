import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SERVICES } from "../utils/data";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { uploadFileToCloud } from "../utils/fileUpload";
import { SEO } from "../components/SEO";

export function Contact() {
  const location = useLocation() as { state?: { service?: string; projectName?: string; message?: string } };
  const prefillService = location.state?.service || "";
  const prefillMessage = location.state?.message || "";
  const prefillNote = location.state?.projectName
    ? `Referencing project: ${location.state.projectName}`
    : "";

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

const submit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  const formElement = e.target;
  const formData = new FormData(formElement);

  // 1. Grab the raw file from the form state
  const rawFile = formData.get("attachment") as File;

  if (rawFile && rawFile.size > 0) {
    // 2. Fire the upload function to store it in the cloud
    const cloudFileUrl = await uploadFileToCloud(rawFile);
    
    if (cloudFileUrl) {
      // 3. Inject the link as text into Web3Forms payload
      formData.append("Attachment Link", cloudFileUrl);
    }
  }

  // 4. CRITICAL: Clean out the binary block so Web3Forms free tier accepts the submit call
  formData.delete("attachment");

  // 5. Append Access Key and fire to Web3Forms
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
        title="Contact"
        description="Get in touch with Yobby Technologies for web, mobile, fintech and AI project inquiries. We reply within 24 hours."
        path="/contact"
      />
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>
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
              "📧 hello@yobbytech.com",
              "📱 +254 726 553 481",
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

                {prefillNote && (
                  <div className="prefill-chip">
                    ✨ {prefillNote}
                  </div>
                )}

                <div className="row">
                  <select
                    name="service"
                    required
                    defaultValue={prefillService}
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
                  defaultValue={prefillMessage}
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