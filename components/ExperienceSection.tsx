"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Reveal from "./Reveal";

// useLayoutEffect on the client, useEffect on the server (this slide only ever
// mounts client-side, but guard the SSR warning anyway).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ExperienceEntry {
  /** Short year for older roles, full range for the recent ones. */
  period: string;
  company: string;
  companyUrl?: string;
  logo: string;
  /** Full-bleed app-icon tile (own background, fills the chip edge to edge). */
  coverLogo?: boolean;
  role: string;
  bullets: string[];
}

const entries: ExperienceEntry[] = [
  {
    period: "August 2026 to Present",
    company: "Wrestle AI",
    companyUrl: "https://wrestleai.app/",
    logo: "/logos/wrestleai.png",
    coverLogo: true,
    role: "Head of Community",
    bullets: [
      "Leading community and creator growth for a grappling sports-tech app with 100k+ downloads and $400K ARR ahead of its major relaunch.",
      "Organizing, tracking, and directing the full network of influencers and creators driving the app's growth.",
    ],
  },
  {
    period: "2026",
    company: "10x",
    companyUrl: "https://www.linkedin.com/company/10x-app",
    logo: "/logos/10x.png",
    role: "Growth & Creator Partnerships",
    bullets: [
      "Growing Fit AI (fitai.so), an AI-powered workout planner on the iOS App Store.",
      "Built a fully automated Instagram carousel pipeline (Claude Code, Higgsfield CLI, Node.js): 30+ branded slideshows brief-to-asset. Viral-format systems from competitor research and founder feedback; AI UGC transformation videos via Higgsfield Seedance 2.0 with custom-trained character models.",
      "Managed 20+ contracted creators across TikTok, Instagram, YouTube, and Facebook, running approval workflow, onboarding calls, and platform compliance via Discord.",
    ],
  },
  {
    period: "June 2026 to July 2026",
    company: "HdL Companies",
    logo: "/logos/hdl.png",
    role: "Finance & Corporate Development",
    bullets: [
      "Built Excel models forecasting revenue, headcount, and operating expenses across six business units at a B2G SaaS and consulting firm serving 900+ local government clients, reporting directly to the CFO on base and stretch budget scenarios.",
      "Scoped AI integration across month-end close, reconciliations, and internal reporting after analyzing five years of division-level revenue trends, presenting prioritized recommendations to the C-suite.",
    ],
  },
  {
    period: "2026",
    company: "MatPad",
    logo: "/matpad-icon.png",
    coverLogo: true,
    role: "Founder",
    bullets: [
      "Founded matpad.app, a full-stack wrestling-camp management platform (Next.js, React, Supabase, Stripe Connect) unifying the fragmented tools camp directors rely on.",
      "Shipped registration, automated payments, roster management, one-click parent email, digital waivers, coach profile pages, and a public camp directory.",
    ],
  },
  {
    period: "2026",
    company: "Park Lane",
    logo: "/logos/parklane.png",
    role: "Investment Banking",
    bullets: [
      "Company, industry, and financial analysis across sports franchises, leagues, and adjacent businesses; supported live M&A engagements at a sports-focused boutique bank.",
      "Built league/team valuation and revenue analyses (emerging-league comps, expansion-fee benchmarks, bottom-up assumptions); prepped investor-facing materials for senior bankers.",
    ],
  },
  {
    period: "2025",
    company: "JPMorganChase & Co.",
    logo: "/logos/jpmorgan.jpg",
    role: "Global Finance & Business Management",
    bullets: [
      "1 of 332 fellows from 18,000+ applicants for the JPMC Summer Fellowship; shadowed Corporate Controllers across regulatory reporting, strategy, and financial analysis in Global Finance.",
      "Pitched a plan to grow Chase Wealth Plan engagement among younger users: AI reminders, gamified financial-literacy modules, and social community integration.",
    ],
  },
  {
    period: "2024",
    company: "HP Tech Ventures",
    logo: "/logos/hp.png",
    role: "Venture Capital",
    bullets: [
      "Market analysis across AI-enabled productivity tools, a sector projected at $632B by 2028 (29% CAGR); flagged 3+ growth verticals and key competitive risks.",
      "Sourced and evaluated 30+ early-stage startups ($100M+ funding, $1B+ valuations); wrote 5 investment summaries on go-to-market fit, positioning, and partnerships.",
    ],
  },
];

function EntryRow({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="exp-entry group relative pl-4 md:pl-5">
      <span
        className="absolute left-0 top-[14px] bottom-1 w-[2px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
        style={{ background: "var(--accent)" }}
      />
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span
          className={`co-mark${entry.coverLogo ? " co-mark--cover" : ""}`}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.logo} alt="" decoding="async" loading="eager" fetchPriority="high" />
        </span>
        <span
          className="font-mono text-[11px] tracking-[0.06em] whitespace-nowrap"
          style={{ color: "var(--accent)" }}
        >
          {entry.period}
        </span>
        <span
          className="font-display text-[15px]"
          style={{ fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text-1)" }}
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
        className="font-mono text-[10.5px] md:text-[9.5px] uppercase tracking-[0.14em] mt-1.5 mb-2 md:mt-1.5 md:mb-1.5"
        style={{ color: "var(--text-3)" }}
      >
        {entry.role}
      </p>
      <ul className="space-y-2 md:space-y-1.5">
        {entry.bullets.map((bullet, i) => (
          <li
            key={i}
            className="font-body text-[13.5px] md:text-[12px] leading-[1.7] md:leading-[1.5] flex gap-2"
            style={{ color: "var(--text-2)" }}
          >
            <span
              className="mt-[0.55em] shrink-0 w-[3px] h-[3px] rounded-full"
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
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Guarantee the whole section is visible with no internal scroll: on desktop,
  // uniformly scale the panel down whenever its natural height would exceed the
  // viewport, and collapse the reclaimed layout height with a negative margin so
  // the slide never becomes scrollable (the first wheel then pages to the next
  // section). On mobile the panel keeps its natural size and scrolls normally.
  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const fit = () => {
      panel.style.transformOrigin = "top center";
      panel.style.transform = "none";
      panel.style.marginBottom = "";

      if (window.innerWidth < 768) return;

      const need = panel.offsetHeight;
      const cs = getComputedStyle(section);
      const padTop = parseFloat(cs.paddingTop) || 0;
      const padBottom = parseFloat(cs.paddingBottom) || 0;
      const avail = window.innerHeight - padTop - padBottom - 8;
      const scale = Math.min(1, avail / need);

      if (scale < 1) {
        panel.style.transform = `scale(${scale})`;
        panel.style.marginBottom = `-${Math.ceil(need - need * scale)}px`;
      }
    };

    fit();
    const raf = requestAnimationFrame(fit);
    window.addEventListener("resize", fit);
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) fit();
      });
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="px-6 pt-20 pb-10 md:px-12 md:pt-16 md:pb-10"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="max-w-[1040px] w-full mx-auto">
        <div ref={panelRef} className="deck-panel w-full">
          <Reveal className="mb-5 md:mb-4">
            <p
              className="font-mono uppercase tracking-[0.24em] text-[11px] mb-2"
              style={{ color: "var(--accent)" }}
            >
              Experience
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.35rem, 2.6vw, 1.65rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--text-1)",
              }}
            >
              The Work
            </h2>
          </Reveal>

          <div className="exp-cols">
            {entries.map((entry) => (
              <EntryRow key={entry.company} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
