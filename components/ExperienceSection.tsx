"use client";

import { useEffect, useRef, ReactNode } from "react";
import Reveal from "./Reveal";

interface ExperienceEntry {
  year: string;
  company: string;
  role: string;
  bullets: string[];
}

const entries: ExperienceEntry[] = [
  {
    year: "2026",
    company: "HdL Companies",
    role: "Finance & Corporate Development",
    bullets: [
      "Starting June 2026",
    ],
  },
  {
    year: "2026",
    company: "MatPad",
    role: "Founder",
    bullets: [
      "Founded matpad.app, a full-stack wrestling camp management platform built on Next.js, React, Supabase, and Stripe Connect, consolidating the fragmented tools coaches rely on into one unified administrative system for camp directors.",
      "Designed and shipped a complete product suite including online registration, automated payment processing, roster management, one-click parent email communication, digital waivers, coach profile pages, and a public camp directory.",
    ],
  },
  {
    year: "2026",
    company: "Park Lane",
    role: "Investment Banking",
    bullets: [
      "Conducting company, industry, and financial analysis across professional sports franchises, leagues, and adjacent businesses while supporting live M&A advisory engagements at a leading sports-focused boutique investment bank.",
      "Built league and team-specific valuation and revenue analyses using comparable emerging sports leagues, expansion fee benchmarks, and bottom-up operating assumptions; supported preparation of investor-facing materials for senior bankers.",
    ],
  },
  {
    year: "2025",
    company: "JPMorganChase & Co.",
    role: "Global Finance & Business Management",
    bullets: [
      "Selected as 1 of 332 fellows from 18,000+ applicants for JPMC's competitive Summer Fellowship Program; shadowed Corporate Controllers across regulatory reporting, business strategy, and financial analysis in the Global Finance division.",
      "Developed and presented a strategic marketing plan to drive Chase Wealth Plan app engagement among younger demographics, proposing AI-powered reminders, gamified financial literacy modules, and social community integration.",
    ],
  },
  {
    year: "2024",
    company: "HP Tech Ventures",
    role: "Venture Capital",
    bullets: [
      "Delivered in-depth market analysis across AI-enabled productivity tools, spotlighting a sector projected to reach $632B by 2028 at a 29% CAGR, identifying 3+ high-potential growth verticals and outlining key competitive risks and investment implications.",
      "Sourced and evaluated 30+ early-stage startups, including companies with $100M+ in funding and $1B+ valuations; produced 5 detailed investment summaries assessing go-to-market fit, competitive positioning, and strategic partnership opportunities.",
    ],
  },
];

function EntryRow({ entry }: { entry: ExperienceEntry }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          row.style.transition = "opacity 0.7s ease, transform 0.7s ease";
          row.style.opacity = "1";
          row.style.transform = "translateY(0)";
          observer.unobserve(row);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className="group relative py-7 md:py-8 transition-colors duration-200"
      style={{
        borderTop: "1px solid var(--border)",
        opacity: 0,
        transform: "translateY(20px)",
      }}
      onMouseEnter={() => {
        if (barRef.current) barRef.current.style.transform = "scaleY(1)";
      }}
      onMouseLeave={() => {
        if (barRef.current) barRef.current.style.transform = "scaleY(0)";
      }}
    >
      <div
        ref={barRef}
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
        style={{
          background: "var(--accent)",
          transform: "scaleY(0)",
          transition: "transform 0.3s ease",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16 pl-5 md:pl-8">
        <div>
          <p
            className="font-display font-black text-[12px] tracking-[0.1em] mb-1"
            style={{ color: "var(--accent)" }}
          >
            {entry.year}
          </p>
          <p className="font-display font-black uppercase text-white text-[15px] md:text-[16px] leading-tight mb-1">
            {entry.company}
          </p>
          <p
            className="font-body text-[11px] uppercase tracking-[0.1em]"
            style={{ color: "var(--text-3)" }}
          >
            {entry.role}
          </p>
        </div>
        <ul className="space-y-3 self-center">
          {entry.bullets.map((bullet, i) => (
            <li
              key={i}
              className="font-body text-[13px] md:text-[13.5px] leading-[1.75] flex gap-3"
              style={{ color: "var(--text-2)" }}
            >
              <span
                className="mt-[0.55em] shrink-0 w-[4px] h-[4px] rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-6 py-16 md:px-12 md:py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12 md:mb-16">
          <Reveal>
            <p
              className="font-display font-bold uppercase tracking-[0.35em] text-[10px] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Experience
            </p>
            <h2
              className="font-display font-black uppercase leading-[0.95] text-white"
              style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
            >
              The Work
            </h2>
          </Reveal>
          <div />
        </div>

        <div>
          {entries.map((entry) => (
            <EntryRow key={entry.company} entry={entry} />
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
