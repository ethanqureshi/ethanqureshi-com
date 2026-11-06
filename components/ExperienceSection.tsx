"use client";

import Reveal from "./Reveal";

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
      "Leading community and creator growth for a grappling sports-tech app with 100k+ downloads and $400K ARR, ahead of its major relaunch.",
      "Directing and tracking the full network of influencers and creators driving the app's growth.",
    ],
  },
  {
    period: "August 2026 to Present",
    company: "EQ Trading",
    logo: "/logos/eqtrading.svg",
    coverLogo: true,
    role: "Futures Trader · Self-employed",
    bullets: [
      "5 figures/mo in revenue trading NQ (Nasdaq-100) futures across prop firms",
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

// Experience spans two deck slides so the full-size type fits one screen on
// each without internal scrolling: the 2026 roles first, then earlier roles.
const RECENT_COUNT = 4;

function ExperienceSlide({
  id,
  heading,
  list,
}: {
  id: string;
  heading: string;
  list: ExperienceEntry[];
}) {
  return (
    <section id={id} className="slide exp-slide">
      <div className="deck-panel exp-panel">
        <Reveal className="slide-head">
          <p className="t-label">Experience</p>
          <h2 className="t-h2">{heading}</h2>
        </Reveal>

        <div className="exp-cols">
          {list.map((entry) => (
            <EntryRow key={entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ExperienceSection() {
  return (
    <ExperienceSlide
      id="experience"
      heading="The Work"
      list={entries.slice(0, RECENT_COUNT)}
    />
  );
}

export function ExperienceSectionEarlier() {
  return (
    <ExperienceSlide
      id="experience-2"
      heading="Earlier Work"
      list={entries.slice(RECENT_COUNT)}
    />
  );
}
