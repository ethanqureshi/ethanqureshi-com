"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import CursorDot from "@/components/CursorDot";
import ScrollProgress from "@/components/ScrollProgress";

function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setTimeout(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(24px)", ...style }}
    >
      {children}
    </div>
  );
}

export default function MatPadPage() {
  return (
    <>
      <CursorDot />
      <ScrollProgress />
      <Nav />
      <main className="min-h-screen px-6 pt-28 pb-16 md:px-12 md:pt-36 md:pb-24">
        <div className="max-w-[820px] mx-auto">
          <Reveal className="mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 hover:text-white"
              style={{ color: "var(--text-2)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 7H3M3 7L7 3M3 7L7 11" />
              </svg>
              Back
            </Link>
          </Reveal>

          <Reveal delay={100} className="flex items-center gap-5 mb-8">
            <div
              className="w-20 h-20 flex items-center justify-center overflow-hidden"
              style={{ borderRadius: "14px", background: "#0b0b0d" }}
            >
              <Image
                src="/matpad-icon.png"
                alt="MatPad"
                width={80}
                height={80}
                quality={95}
                className="h-full w-full"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p
                className="font-display font-bold uppercase tracking-[0.35em] text-[10px] mb-1"
                style={{ color: "var(--accent)" }}
              >
                Projects
              </p>
              <h1
                className="font-display font-black uppercase text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 0.95 }}
              >
                MATPAD
              </h1>
            </div>
          </Reveal>

          <div
            style={{
              height: "1px",
              marginBottom: "2.5rem",
              background: "var(--border)",
            }}
          />

          <Reveal delay={300}>
            <div
              className="font-body text-[15px] leading-[1.85] space-y-5 mb-10"
              style={{ color: "var(--text-2)" }}
            >
              <p>
                MatPad is a full-stack wrestling camp management platform built
                on Next.js, React, Supabase, and Stripe Connect. It consolidates
                the fragmented tools coaches rely on, like Venmo, Google Forms,
                and group texts, into one unified administrative system for camp
                directors.
              </p>
              <p>
                The platform ships a complete product suite: online registration,
                automated payment processing, roster management with check-in
                tracking, one-click parent email communication, digital waivers,
                coach profile pages, and a public camp directory with integrated
                map view.
              </p>
              <p>
                Wrestling has long lacked purpose-built software. MatPad changes
                that. If you&apos;re a coach, athletic director, or potential
                partner, reach out.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400} className="flex gap-3">
            <a
              href="https://matpad.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-black uppercase tracking-[0.1em] text-[13px] px-7 py-3 text-white transition-all duration-150 hover:opacity-85 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", borderRadius: "2px" }}
            >
              Visit MatPad
            </a>
            <Link
              href="/#contact"
              className="font-display font-bold uppercase tracking-[0.1em] text-[13px] px-7 py-3 transition-all duration-150 hover:-translate-y-0.5"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-2)",
                borderRadius: "2px",
              }}
            >
              Contact
            </Link>
          </Reveal>
        </div>
      </main>
      <footer
        className="px-6 py-6 md:px-12 md:py-8 font-body text-[11px] uppercase tracking-[0.12em]"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
      >
        © 2026 Ethan Qureshi
      </footer>
    </>
  );
}
