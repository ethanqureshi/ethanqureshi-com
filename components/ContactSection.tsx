"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="px-6 py-16 md:px-12 md:py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 max-w-[1100px] mx-auto">
        <Reveal>
          <p
            className="font-display font-bold uppercase tracking-[0.35em] text-[10px] mb-3"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </p>
          <h2
            className="font-display font-black uppercase leading-[0.95] text-white"
            style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
          >
            Let&apos;s
            <br />
            Talk
          </h2>
          <a
            href="https://linkedin.com/in/ethanqureshi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 font-body text-[13px] uppercase tracking-[0.12em] transition-colors duration-200 hover:text-white"
            style={{ color: "var(--text-2)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </Reveal>

        <Reveal delay={100}>
          {status === "sent" ? (
            <p
              className="font-body text-[15px] leading-[1.75]"
              style={{ color: "var(--text-2)" }}
            >
              Message sent — I&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full font-body text-[13px] px-4 py-3 bg-transparent resize-none outline-none transition-colors duration-200 focus:border-[var(--accent)]"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  color: "var(--text-1)",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full font-body text-[13px] px-4 py-3 bg-transparent resize-none outline-none transition-colors duration-200 focus:border-[var(--accent)]"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  color: "var(--text-1)",
                }}
              />
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full font-body text-[13px] px-4 py-3 bg-transparent resize-none outline-none transition-colors duration-200 focus:border-[var(--accent)]"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  color: "var(--text-1)",
                }}
              />
              {status === "error" && (
                <p className="font-body text-[12px]" style={{ color: "var(--accent)" }}>
                  Something went wrong — please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-display font-black uppercase tracking-[0.1em] text-[13px] px-8 py-3 text-white transition-all duration-150 hover:opacity-85 hover:-translate-y-0.5 disabled:opacity-50"
                style={{ background: "var(--accent)", borderRadius: "2px" }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
