"use client";

import { useEffect, useRef, ReactNode } from "react";
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
      "Drive content strategy, hook frameworks, and copy; building toward Fit AI's social profiles at 3+ posts daily.",
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
      "1 of 332 fellows from 18,000+ applicants for JPMC's Summer Fellowship; shadowed Corporate Controllers across regulatory reporting, strategy, and financial analysis in Global Finance.",
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
      className="group relative py-5 md:py-6 pl-5 md:pl-6 transition-colors duration-200"
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
      <div className="flex items-baseline gap-2.5 mb-1">
        <span
          className="font-display font-black text-[12px] tracking-[0.1em]"
          style={{ color: "var(--accent)" }}
        >
          {entry.year}
        </span>
        <span className="font-display font-black uppercase text-white text-[15px] md:text-[16px] leading-tight">
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-200"
            >
              {entry.company}
            </a>
          ) : (
            entry.company
          )}
        </span>
      </div>
      <p
        className="font-body text-[11px] uppercase tracking-[0.1em] mb-3"
        style={{ color: "var(--text-3)" }}
      >
        {entry.role}
      </p>
      <ul className="space-y-1.5">
        {entry.bullets.map((bullet, i) => (
          <li
            key={i}
            className="font-body text-[12.5px] md:text-[13px] leading-[1.55] flex gap-2.5"
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
      className="px-6 py-8 md:px-12 md:py-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10 mb-5 md:mb-7">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {entries.map((entry) => (
            <EntryRow key={entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
