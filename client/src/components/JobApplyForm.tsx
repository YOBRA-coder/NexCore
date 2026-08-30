import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Job } from "../utils/Shared";

export function JobApplyForm({ job, onClose }: { job: Job; onClose?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formElement = e.target;
    const formData = new FormData(formElement);
    formData.append("access_key", "b488cb22-e436-419f-8e87-4192024a5c0c");
    formData.append("subject", `Job Application — ${job.title}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSent(true);
        // Delay form resetting until after it unmounts to prevent Framer Motion crashes
        setTimeout(() => formElement.reset(), 500);
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="success"
          style={{ padding: "3rem 1rem" }}
        >
          <div className="emoji"><CheckCircle2 size={40} color="#00e5b4" /></div>
          <h2>Application Received</h2>
          <p>Thanks for applying to {job.title}. We review every application and will reach out if it's a fit.</p>
          {onClose && <button className="btn" onClick={onClose}>Close</button>}
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="form"
        >
          <div className="apply-header" style={{ borderLeft: `3px solid ${job.accent}` }}>
            <span style={{ fontSize: 22 }}>{job.icon}</span>
            <div>
              <h2 style={{ fontSize: 19, color: "var(--t)", fontFamily: "var(--fd)" }}>{job.title}</h2>
              <span style={{ fontSize: 12, color: "var(--t3)" }}>{job.department} · {job.location}</span>
            </div>
          </div>
          
          <input type="hidden" name="position" value={job.title} />
          
          <div className="row">
            <input type="text" name="name" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
          </div>
          
          <div className="row">
            <input type="tel" name="phone" placeholder="Phone Number" />
            <input type="text" name="portfolio" placeholder="Portfolio / LinkedIn / GitHub URL" />
          </div>
          
          <textarea 
            name="message" 
            rows={5} 
            placeholder={`Tell us why you're a great fit for ${job.title === "General Application" ? "our team" : "this role"}...`} 
            required 
          />
          
          <div className="upload">
            <label>Attach Resume / CV</label>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
            <small>PDF or Word document</small>
          </div>

          {errorMessage && (
            <div style={{ color: "red", fontSize: 14, marginBottom: "1rem" }}>
              {errorMessage}
            </div>
          )}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application →"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
