import { useState, useRef } from "react";
import { submitInquiry } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const formRef = useRef(null); // ✅ Added formRef
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      await submitInquiry(data);

      toast.success("Thanks! We will reach out shortly.");

      // Reset form safely
      if (formRef.current) {
        formRef.current.reset();
      }

      setMessage(""); // Reset textarea
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="text-[clamp(24px,2.6vw,36px)] font-bold mb-6">
          Let’s talk about your project
        </h2>

        {/* Attach the ref here */}
        <form ref={formRef} className="card" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-2 text-muted font-semibold">
              <span>Name</span>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                name="name"
                required
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 text-muted font-semibold">
              <span>Email</span>
              <input
                className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </label>

            <label className="md:col-span-2 grid gap-2 text-muted font-semibold">
              <span>What are you looking for?</span>
              <select
                className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                name="service"
                required
              >
                <option value="">Select a service</option>
                <option>Website Building & Hosting</option>
                <option>Social Media Handling</option>
                <option>Digital Marketing</option>
              </select>
            </label>

            <label className="md:col-span-2 grid gap-2 text-muted font-semibold">
              <span>Message</span>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-border bg-[#0e1116] text-text"
                name="message"
                rows="5"
                placeholder="Tell us about your goals"
                required
                maxLength={350}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            Send message
          </button>
        </form>

        <ToastContainer position="top-right" />
      </div>
    </section>
  );
}
