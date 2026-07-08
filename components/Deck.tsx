"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import BioSection from "./BioSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";

const slides = [
  { id: "hero", Comp: HeroSection },
  { id: "bio", Comp: BioSection },
  { id: "experience", Comp: ExperienceSection },
  { id: "projects", Comp: ProjectsSection },
  { id: "contact", Comp: ContactSection },
] as const;

// Per-slide ASCII-dither background (in /public/bg). Hero draws its own dune,
// so it's omitted here. Swap any filename to restyle that page.
const slideBg: Record<string, string> = {
  bio: "/bg/bio.webp",
  experience: "/bg/experience.webp",
  projects: "/bg/projects.webp",
  contact: "/hero-dune.webp",
};

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const indexRef = useRef(0);
  const lock = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Each slide remounts on change; a slide taller than the viewport (dense
  // slides, short screens) can otherwise render scrolled partway down under
  // `justify-content: safe center` (the browser sets the scroller's initial
  // position after first paint). Pin it to the top — immediately and again
  // after paint — so the header is always visible and the panel scrolls from
  // there.
  useEffect(() => {
    const pin = () => {
      const el = document.querySelector<HTMLElement>(".slide-scroll");
      if (el) el.scrollTop = 0;
    };
    pin();
    const r = requestAnimationFrame(pin);
    return () => cancelAnimationFrame(r);
  }, [index]);

  // Direct jump (nav, dots); clamps to range.
  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (clamped === indexRef.current) return;
    setDir(clamped > indexRef.current ? 1 : -1);
    setIndex(clamped);
  }, []);

  // Relative paging (keys, wheel, swipe, chevron). Clamps at the ends: the last
  // page does not loop to the first, nor the first back to the last.
  const step = useCallback((delta: number) => {
    setIndex((cur) => {
      const next = Math.max(0, Math.min(slides.length - 1, cur + delta));
      if (next !== cur) setDir(delta > 0 ? 1 : -1);
      return next;
    });
  }, []);

  const goById = useCallback(
    (id: string) => {
      const i = slides.findIndex((s) => s.id === id);
      if (i >= 0) go(i);
    },
    [go]
  );

  // Lock body scroll while the deck is mounted (home only; other routes scroll).
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Paging: keyboard, wheel, touch, and hero-button (deck:navigate) events.
  useEffect(() => {
    const advance = (delta: number) => {
      if (lock.current) return;
      lock.current = true;
      step(delta);
      window.setTimeout(() => {
        lock.current = false;
      }, 750);
    };

    const isTyping = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return (
        !!el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      const k = e.key;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(k)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(k)) {
        e.preventDefault();
        step(-1);
      } else if (k === "Home") {
        go(0);
      } else if (k === "End") {
        go(slides.length - 1);
      }
    };

    // When the active slide scrolls internally (mobile dense slides), let it
    // scroll until it reaches the edge, then page in that direction.
    // Walk up from the pointer/touch target: if any scroll region (the slide
    // scroll layer, or the Experience panel) can still scroll in this
    // direction, let it scroll instead of paging.
    const canPage = (down: boolean, target: EventTarget | null) => {
      let el = target as HTMLElement | null;
      while (el && !(el.classList && el.classList.contains("deck"))) {
        const oy = getComputedStyle(el).overflowY;
        if (
          (oy === "auto" || oy === "scroll") &&
          el.scrollHeight - el.clientHeight > 2
        ) {
          const atTop = el.scrollTop <= 0;
          const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if (down ? !atBottom : !atTop) return false;
        }
        el = el.parentElement;
      }
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (isTyping(e.target)) return;
      if (Math.abs(e.deltaY) < 24) return;
      const down = e.deltaY > 0;
      if (!canPage(down, e.target)) return;
      advance(down ? 1 : -1);
    };

    let touchY = 0;
    let touchTarget: EventTarget | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchTarget = e.target;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isTyping(e.target)) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) <= 45) return;
      const down = dy > 0;
      if (!canPage(down, touchTarget)) return;
      advance(down ? 1 : -1);
    };

    const onNavigate = (e: Event) =>
      goById((e as CustomEvent<string>).detail);

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("deck:navigate", onNavigate as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("deck:navigate", onNavigate as EventListener);
    };
  }, [go, goById, step]);

  const { Comp, id } = slides[index];

  return (
    <>
      <Nav active={id} onNavigate={goById} />

      <main className="deck">
        <div
          key={id}
          className="deck-slide"
          style={{ "--enter": dir > 0 ? "18px" : "-18px" } as React.CSSProperties}
        >
          {slideBg[id] && (
            <>
              <div
                className="slide-bg"
                style={{ backgroundImage: `url(${slideBg[id]})` }}
                aria-hidden="true"
              />
              <div className="slide-veil" aria-hidden="true" />
            </>
          )}
          <div className="slide-scroll">
            <Comp />
          </div>
        </div>
      </main>

      <nav className="deck-dots" aria-label="Sections">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => go(i)}
            aria-label={s.id}
            aria-current={i === index}
            className={`deck-dot${i === index ? " is-active" : ""}`}
          />
        ))}
      </nav>

      {index > 0 && (
        <button
          type="button"
          className="deck-nav deck-nav-up"
          onClick={() => step(-1)}
          aria-label="Previous section"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 15l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {index < slides.length - 1 && (
        <button
          type="button"
          className="deck-nav deck-nav-down"
          onClick={() => step(1)}
          aria-label="Next section"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="deck-foot">
        <span className="deck-copy">© 2026 Ethan Qureshi</span>
      </div>
    </>
  );
}
