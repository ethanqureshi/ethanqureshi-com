"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CSS = `
.eqh-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.eqh-bg::before{content:'';position:absolute;inset:0;
  background:url(/hero-dune.webp) center 42%/cover no-repeat;}
.eqh-bg::after{content:'';position:absolute;inset:0;background:
  radial-gradient(62% 60% at 50% 51%, rgba(245,240,232,.8), rgba(245,240,232,.44) 54%, rgba(245,240,232,0) 82%),
  linear-gradient(180deg, rgba(245,240,232,.55), rgba(245,240,232,0) 20%, rgba(245,240,232,0) 68%, rgba(245,240,232,.9) 100%);}

.eqh-portrait{width:200px;height:250px;border-radius:10px;overflow:hidden;margin:0 0 32px;
  filter:grayscale(1) sepia(.55) saturate(1.5) hue-rotate(-10deg) contrast(.92) brightness(1.04);
  box-shadow:0 30px 64px -30px rgba(60,40,28,.4);outline:1px solid rgba(60,40,28,.08);}
.eqh-portrait img{width:100%;height:100%;object-fit:cover;object-position:center;}

.eqh-eyebrow{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.2em;
  font-size:11px;font-weight:500;color:var(--accent);margin:0 0 22px;}
.eqh-name{font-family:var(--font-display);font-weight:700;color:#453e35;
  font-size:clamp(2rem,4.7vw,3rem);line-height:1.04;letter-spacing:-.03em;margin:0 0 22px;}
.eqh-affil{font-family:var(--font-mono);font-size:12.5px;font-weight:500;letter-spacing:.02em;
  color:#4a4137;line-height:1.85;max-width:33rem;margin:0 0 36px;
  text-shadow:0 1px 0 rgba(245,240,232,.6);}
.eqh-cta{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
.eqh-btn{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.12em;font-size:12px;
  padding:13px 28px;border-radius:2px;cursor:pointer;border:1px solid transparent;
  transition:transform .18s ease,background .18s ease,border-color .18s ease,color .18s ease;}
.eqh-btn-primary{background:var(--accent);color:#f5f0e8;}
.eqh-btn-primary:hover{background:var(--accent-deep);transform:translateY(-1px);}
.eqh-btn-ghost{background:rgba(245,240,232,.35);border-color:rgba(69,62,53,.28);color:#453e35;}
.eqh-btn-ghost:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px);}
.eqh-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}

.eqh-rise{opacity:0;transform:translateY(14px);
  transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1);}
.eqh.is-loaded .eqh-rise{opacity:1;transform:none;}
.eqh.is-loaded .eqh-rise.d0{transition-delay:.02s}
.eqh.is-loaded .eqh-rise.d1{transition-delay:.12s}
.eqh.is-loaded .eqh-rise.d2{transition-delay:.22s}
.eqh.is-loaded .eqh-rise.d3{transition-delay:.32s}
.eqh.is-loaded .eqh-rise.d4{transition-delay:.42s}
@media (prefers-reduced-motion: reduce){
  .eqh-rise{opacity:1 !important;transform:none !important;transition:none !important;}
}
`;

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setLoaded(true);
      return;
    }
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const navigate = (id: string) =>
    window.dispatchEvent(new CustomEvent("deck:navigate", { detail: id }));

  return (
    <section
      className={`eqh relative h-full min-h-full flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden${
        loaded ? " is-loaded" : ""
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="eqh-bg" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[680px] mx-auto flex flex-col items-center">
        <div className="eqh-rise d0 eqh-portrait">
          <Image
            src="/headshot-film.webp"
            alt="Ethan Qureshi"
            width={200}
            height={250}
            priority
          />
        </div>

        <p className="eqh-rise d1 eqh-eyebrow">
          Division I Wrestler at Cornell University
        </p>

        <h1 className="eqh-rise d2 eqh-name">Ethan Qureshi</h1>

        <p className="eqh-rise d3 eqh-affil">
          10x · HdL Companies · HP Tech Ventures · JPMorganChase · Park Lane
        </p>

        <div className="eqh-rise d4 eqh-cta">
          <button
            onClick={() => navigate("experience")}
            className="eqh-btn eqh-btn-primary"
          >
            View Work
          </button>
          <button
            onClick={() => navigate("contact")}
            className="eqh-btn eqh-btn-ghost"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
