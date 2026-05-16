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
        backdropFilter: "blur(12px)",
        background: "rgba(10,10,10,0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Link
        href="/"
        className="font-display font-black text-[20px] md:text-[22px] text-white tracking-wide"
      >
        EQ
      </Link>
      <div className="flex gap-4 md:gap-8">
        {sections.map((id) => {
          const isActive = isHome && active === id;
          return (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="relative text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.12em] font-body transition-colors duration-200"
              style={{ color: isActive ? "var(--text-1)" : "var(--text-2)" }}
            >
              {labels[id]}
              <span
                className="absolute -bottom-1 left-0 right-0 h-[1px] transition-opacity duration-200"
                style={{
                  background: "var(--accent)",
                  opacity: isActive ? 1 : 0,
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
