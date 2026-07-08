"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = ["bio", "experience", "projects", "contact"] as const;
type Section = (typeof sections)[number];

const labels: Record<Section, string> = {
  bio: "Bio",
  experience: "Experience",
  projects: "Projects",
  contact: "Contact",
};

interface NavProps {
  /** When provided, Nav runs in deck mode: clicks page slides instead of scrolling. */
  onNavigate?: (id: string) => void;
  /** Active slide id in deck mode (e.g. "hero", "bio"). */
  active?: string;
}

export default function Nav({ onNavigate, active }: NavProps = {}) {
  const deckMode = typeof onNavigate === "function";
  const [scrollActive, setScrollActive] = useState<Section>("bio");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Scroll-spy is only used in the legacy (non-deck) scroll pages.
  useEffect(() => {
    if (deckMode || !isHome) return;
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setScrollActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [deckMode, isHome]);

  const handleNav = (id: string) => {
    if (deckMode) {
      onNavigate!(id);
    } else if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const isActive = (id: Section) =>
    deckMode ? active === id : isHome && scrollActive === id;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 py-4 md:px-12 md:py-5"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(245,240,232,0.82)",
        borderBottom: "1px solid rgba(184,86,63,0.14)",
      }}
    >
      {deckMode ? (
        <button
          onClick={() => handleNav("hero")}
          aria-label="Return to top"
          title="Return to top"
          className="font-mono text-[13px] tracking-[0.22em] transition-colors duration-200 hover:text-[var(--accent)]"
          style={{ color: "var(--text-1)" }}
        >
          EQ
        </button>
      ) : (
        <Link
          href="/"
          aria-label="Return home"
          className="font-mono text-[13px] tracking-[0.22em] transition-colors duration-200 hover:text-[var(--accent)]"
          style={{ color: "var(--text-1)" }}
        >
          EQ
        </Link>
      )}
      <div className="flex gap-5 md:gap-8">
        {sections.map((id) => {
          const activeNow = isActive(id);
          return (
            <button
              key={id}
              onClick={() => handleNav(id)}
              aria-current={activeNow ? "true" : undefined}
              className={`nav-item relative font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em]${
                activeNow ? " is-active" : ""
              }`}
            >
              {labels[id]}
              <span
                className={`nav-underline${activeNow ? " is-active" : ""}`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
