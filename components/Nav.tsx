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

export default function Nav() {
  const [active, setActive] = useState<Section>("bio");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const handleNav = (id: Section) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-5 py-4 md:px-12 md:py-5"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(245,240,232,0.82)",
        borderBottom: "1px solid rgba(184,86,63,0.14)",
      }}
    >
      <Link
        href="/"
        className="font-mono text-[13px] tracking-[0.22em]"
        style={{ color: "var(--text-1)" }}
      >
        EQ
      </Link>
      <div className="flex gap-5 md:gap-8">
        {sections.map((id) => {
          const isActive = isHome && active === id;
          return (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="relative font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
              style={{ color: isActive ? "var(--accent)" : "var(--text-2)" }}
            >
              {labels[id]}
              <span
                className="absolute -bottom-1 left-0 right-0 h-[1px] transition-opacity duration-200"
                style={{ background: "var(--accent)", opacity: isActive ? 1 : 0 }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
