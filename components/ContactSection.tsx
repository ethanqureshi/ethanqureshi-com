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

  const field =
    "w-full font-body text-[13px] px-4 py-3 bg-transparent resize-none outline-none transition-colors duration-200";
  const fieldStyle = {
    border: "1px solid var(--border)",
    borderRadius: "3px",
    color: "var(--text-1)",
  } as const;

  return (
    <section
      id="contact"
      className="px-6 py-12 md:px-12 md:py-16"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="deck-panel grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-14 max-w-[1040px] mx-auto">
        <Reveal>
          <p
            className="font-mono uppercase tracking-[0.24em] text-[11px] mb-4"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.45rem, 3.2vw, 1.95rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--text-1)",
            }}
          >
            Let&apos;s Talk
          </h2>
          <a
            href="mailto:ethanqureshi7@gmail.com"
            className="block mt-6 font-body text-[13px] transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            ethanqureshi7@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/ethanqureshi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
            style={{ color: "var(--text-2)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
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
              Message sent. I&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
                style={fieldStyle}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
                style={fieldStyle}
              />
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={field}
                style={fieldStyle}
              />
              {status === "error" && (
                <p
                  className="font-body text-[12px]"
                  style={{ color: "var(--accent)" }}
                >
                  Something went wrong. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-mono uppercase tracking-[0.12em] text-[12px] px-8 py-3 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                style={{
                  background: "var(--accent)",
                  color: "#f5f0e8",
                  borderRadius: "2px",
                }}
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
