import { useState } from "react";
import { submitInquiry } from "../api.js";

export default function Contact() {
  const [status, setStatus] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    try {
      await submitInquiry(data);
      setStatus("Thanks! We will reach out shortly.");
      e.currentTarget.reset();
    } catch {
      console.log("FRONTEND ERROR:", err);
      setStatus("Submission failed. Please try again.");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="text-[clamp(24px,2.6vw,36px)] font-bold mb-6">
          Let’s talk about your project
        </h2>
        <form className="card" onSubmit={onSubmit}>
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
            <label className="flex flex-col gap-2 text-muted font-semibold w-full">
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
              />
            </label>
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Send message
          </button>
          {!!status && (
            <p className="text-muted mt-3" role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
