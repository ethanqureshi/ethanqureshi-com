"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

interface ExperienceEntry {
  year: string;
  company: string;
  companyUrl?: string;
  role: string;
  bullets: string[];
}

const entries: ExperienceEntry[] = [
  {
    year: "2026",
    company: "10x",
    companyUrl: "https://www.linkedin.com/company/10x-app",
    role: "Growth & Creator Partnerships",
    bullets: [
      "Growth on Fit AI (fitai.so), an AI-powered workout planner on the iOS App Store.",
      "Built a fully automated Instagram carousel pipeline (Claude Code, Higgsfield CLI, Node.js) — 30+ branded slideshows brief-to-asset. Viral-format systems from competitor research and founder feedback; AI UGC transformation videos via Higgsfield Seedance 2.0 with custom-trained character models.",
      "Manage 20+ contracted creators across TikTok, Instagram, YouTube, and Facebook — approval workflow, onboarding calls, and platform compliance via Discord.",
      "Drive content strategy, hook frameworks, and copy; building toward the Fit AI social profiles at 3+ posts daily.",
    ],
  },
  {
    year: "2026",
    company: "HdL Companies",
    role: "Finance & Corporate Development",
    bullets: [
      "Support finance, accounting, and corporate development at a B2G SaaS firm serving 900+ local-government clients across the U.S.",
      "Financial analysis, contract review, and strategic initiatives under the CFO.",
      "Apply AI tools to streamline internal workflows and accelerate financial analysis.",
    ],
  },
  {
    year: "2026",
    company: "MatPad",
    role: "Founder",
    bullets: [
      "Founded matpad.app — a full-stack wrestling-camp management platform (Next.js, React, Supabase, Stripe Connect) unifying the fragmented tools camp directors rely on.",
      "Shipped registration, automated payments, roster management, one-click parent email, digital waivers, coach profile pages, and a public camp directory.",
    ],
  },
  {
    year: "2026",
    company: "Park Lane",
    role: "Investment Banking",
    bullets: [
      "Company, industry, and financial analysis across sports franchises, leagues, and adjacent businesses; supported live M&A engagements at a sports-focused boutique bank.",
      "Built league/team valuation and revenue analyses (emerging-league comps, expansion-fee benchmarks, bottom-up assumptions); prepped investor-facing materials for senior bankers.",
    ],
  },
  {
    year: "2025",
    company: "JPMorganChase & Co.",
    role: "Global Finance & Business Management",
    bullets: [
      "1 of 332 fellows from 18,000+ applicants for the JPMC Summer Fellowship; shadowed Corporate Controllers across regulatory reporting, strategy, and financial analysis in Global Finance.",
      "Pitched a plan to grow Chase Wealth Plan engagement among younger users — AI reminders, gamified financial-literacy modules, and social community integration.",
    ],
  },
  {
    year: "2024",
    company: "HP Tech Ventures",
    role: "Venture Capital",
    bullets: [
      "Market analysis across AI-enabled productivity tools — a sector projected at $632B by 2028 (29% CAGR); flagged 3+ growth verticals and key competitive risks.",
      "Sourced and evaluated 30+ early-stage startups ($100M+ funding, $1B+ valuations); wrote 5 investment summaries on go-to-market fit, positioning, and partnerships.",
    ],
  },
];

function EntryRow({ entry }: { entry: ExperienceEntry }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      row.style.opacity = "1";
      row.style.transform = "none";
      return;
    }
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          row.style.transition = "opacity 0.8s ease, transform 0.8s ease";
          row.style.opacity = "1";
          row.style.transform = "translateY(0)";
          observer.unobserve(row);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className="group relative py-6 md:py-7 pl-5 md:pl-6"
      style={{
        borderTop: "1px solid var(--border)",
        opacity: 0,
        transform: "translateY(16px)",
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
      <div className="flex items-baseline gap-2.5 mb-1.5">
        <span
          className="font-mono text-[12px] tracking-[0.06em]"
          style={{ color: "var(--accent)" }}
        >
          {entry.year}
        </span>
        <span
          className="font-serif text-[17px] md:text-[18px]"
          style={{ fontWeight: 500, color: "var(--text-1)" }}
        >
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-[var(--accent)]"
            >
              {entry.company}
            </a>
          ) : (
            entry.company
          )}
        </span>
      </div>
      <p
        className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3"
        style={{ color: "var(--text-3)" }}
      >
        {entry.role}
      </p>
      <ul className="space-y-2">
        {entry.bullets.map((bullet, i) => (
          <li
            key={i}
            className="font-body text-[13px] leading-[1.6] flex gap-2.5"
            style={{ color: "var(--text-2)" }}
          >
            <span
              className="mt-[0.5em] shrink-0 w-[4px] h-[4px] rounded-full"
              style={{ background: "var(--accent)" }}
            />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-6 py-12 md:px-12 md:py-16"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1040px] mx-auto">
        <Reveal className="mb-10 md:mb-14">
          <p
            className="font-mono uppercase tracking-[0.24em] text-[11px] mb-4"
            style={{ color: "var(--accent)" }}
          >
            Experience
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              fontWeight: 500,
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              color: "var(--text-1)",
            }}
          >
            The Work
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14">
          {entries.map((entry) => (
            <EntryRow key={entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
