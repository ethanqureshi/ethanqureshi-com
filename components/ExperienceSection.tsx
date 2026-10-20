"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Reveal from "./Reveal";

// useLayoutEffect on the client, useEffect on the server (this slide only ever
// mounts client-side, but guard the SSR warning anyway).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ExperienceEntry {
  /** Month-year range, e.g. "June 2025 to July 2025". */
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
  // Ordered most-recent-first: ongoing roles, then past roles by end date.
  {
    period: "August 2026 to Present",
    company: "Wrestle AI",
    companyUrl: "https://wrestleai.app/",
    logo: "/logos/wrestleai.webp",
    coverLogo: true,
    role: "Head of Growth",
    bullets: [
      "Lead community and creator growth for a grappling sports-tech app with 100k+ downloads and $400K ARR, ahead of its major relaunch.",
      "Direct and track the full network of influencers and creators driving the app's growth.",
    ],
  },
  {
    period: "August 2026 to Present",
    company: "EQ Trading",
    logo: "/logos/eqtrading.svg",
    role: "Futures Trader · Self-employed",
    bullets: [
      "Trade NQ (Nasdaq-100) futures across funded accounts at five prop firms, with consistent monthly payouts.",
      "Built a custom risk dashboard and a backtesting engine that tested 25,000+ strategy variants on 7 years of 1-minute Nasdaq-100 futures data.",
    ],
  },
  // MatPad is a product rather than a role; it lives in the Projects section.
  {
    period: "June 2026 to July 2026",
    company: "HdL Companies",
    logo: "/logos/hdl.png",
    role: "Finance & Corporate Development",
    bullets: [
      "Built Excel models forecasting revenue, headcount, and operating expenses across six business units at a B2G SaaS and consulting firm serving 900+ local governments; reported base and stretch budget scenarios directly to the CFO.",
      "Analyzed five years of division-level revenue to scope AI integration across month-end close, reconciliations, and internal reporting; presented prioritized recommendations to the C-suite.",
    ],
  },
  {
    period: "May 2026 to July 2026",
    company: "10x",
    companyUrl: "https://www.linkedin.com/company/10x-app",
    logo: "/logos/10x.png",
    role: "Growth & Creator Partnerships",
    bullets: [
      "Grew Fit AI (fitai.so), an AI-powered workout planner on the iOS App Store.",
      "Built an automated Instagram carousel pipeline (Claude Code, Higgsfield CLI, Node.js) producing 30+ branded slideshows, brief to asset, in viral formats drawn from competitor research and founder feedback; produced AI UGC transformation videos via Higgsfield Seedance 2.0 with custom-trained character models.",
      "Managed 20+ contracted creators across TikTok, Instagram, YouTube, and Facebook, owning approvals, onboarding calls, and platform compliance via Discord.",
    ],
  },
  {
    period: "January 2026 to May 2026",
    company: "Park Lane",
    logo: "/logos/parklane.png",
    role: "Investment Banking",
    bullets: [
      "Company, industry, and financial analysis across sports franchises, leagues, and adjacent businesses; supported live M&A engagements at a sports-focused boutique bank.",
      "Built league and team valuation and revenue analyses (emerging-league comps, expansion-fee benchmarks, bottom-up assumptions); prepared investor-facing materials for senior bankers.",
    ],
  },
  {
    period: "June 2025 to July 2025",
    company: "JPMorganChase & Co.",
    logo: "/logos/jpmorgan.jpg",
    role: "Global Finance & Business Management",
    bullets: [
      "1 of 332 JPMC Summer Fellows selected from 18,000+ applicants; shadowed Corporate Controllers across regulatory reporting, strategy, and financial analysis in Global Finance.",
      "Pitched a plan to grow Chase Wealth Plan engagement among younger users through AI reminders, gamified financial-literacy modules, and social community integration.",
    ],
  },
  {
    period: "September 2024 to October 2024",
    company: "HP Tech Ventures",
    logo: "/logos/hp.png",
    role: "Venture Capital",
    bullets: [
      "Analyzed AI-enabled productivity tools, a sector projected at $632B by 2028 (29% CAGR); flagged 3+ growth verticals and key competitive risks.",
      "Sourced and evaluated 30+ early-stage startups ($100M+ funding, $1B+ valuations); wrote 5 investment summaries on go-to-market fit, positioning, and partnerships.",
    ],
  },
];

function EntryRow({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="exp-entry">
      <div className="exp-head">
        <span
          className={`co-mark${entry.coverLogo ? " co-mark--cover" : ""}`}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.logo} alt="" decoding="async" loading="eager" fetchPriority="high" />
        </span>
        <h3 className="t-h3">
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
        </h3>
      </div>
      <p className="exp-meta t-meta">
        <span className="exp-period">{entry.period}</span>
        <span className="exp-role">{entry.role}</span>
      </p>
      <ul className="exp-bullets">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="t-small">
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
  const innerRef = useRef<HTMLDivElement>(null);

  // Guarantee the whole section is visible with no internal scroll: on desktop,
  // when the panel's natural height would exceed the viewport, scale the
  // panel's *content* down and widen it by the same factor, so the panel keeps
  // the same outer edges as every other slide and the narrower type gains line
  // length (fewer lines). A negative margin collapses the reclaimed height so
  // the slide never becomes scrollable. On mobile it keeps its natural size and
  // scrolls normally.
  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!section || !panel || !inner) return;

    const fit = () => {
      inner.style.transform = "none";
      inner.style.width = "";
      inner.style.marginBottom = "";

      if (window.innerWidth < 768) return;

      const cs = getComputedStyle(section);
      const ps = getComputedStyle(panel);
      const avail =
        window.innerHeight -
        (parseFloat(cs.paddingTop) || 0) -
        (parseFloat(cs.paddingBottom) || 0) -
        (parseFloat(ps.paddingTop) || 0) -
        (parseFloat(ps.paddingBottom) || 0) -
        8;

      // Widening reflows the text shorter, so the scaled height is not linear
      // in the scale: bisect for the largest scale whose content still fits.
      const fits = (sc: number) => {
        inner.style.width = sc < 1 ? `${100 / sc}%` : "";
        return inner.offsetHeight * sc <= avail;
      };
      let scale = 1;
      if (!fits(1)) {
        let lo = 0.5;
        let hi = 1;
        for (let i = 0; i < 8; i++) {
          const mid = (lo + hi) / 2;
          if (fits(mid)) lo = mid;
          else hi = mid;
        }
        scale = lo;
        fits(scale);
      }

      if (scale < 1) {
        const need = inner.offsetHeight;
        inner.style.transformOrigin = "top left";
        inner.style.transform = `scale(${scale})`;
        inner.style.marginBottom = `-${Math.ceil(need - need * scale)}px`;
      } else {
        inner.style.width = "";
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
    <section ref={sectionRef} id="experience" className="slide">
      <div ref={panelRef} className="deck-panel">
        <div ref={innerRef}>
          <Reveal className="slide-head">
            <p className="t-label">Experience</p>
            <h2 className="t-h2">The Work</h2>
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
