"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PHOTOS = ["/headshot.png", "/headshot-glitch.png", "/headshot-film.png"];

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'>" +
  "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#g)'/></svg>";
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

const CSS = `
.eq-hero{position:relative;}
.eq-atmos{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.eq-sky{position:absolute;inset:0;background:radial-gradient(120% 80% at 78% -12%,rgba(212,98,42,.20),transparent 55%),linear-gradient(180deg,rgba(255,140,60,.05),transparent 42%);}
.eq-aurora{position:absolute;border-radius:50%;filter:blur(45px);will-change:transform,opacity;}
.eq-aurora.a1{top:-16%;right:-8%;width:70vw;max-width:820px;aspect-ratio:1.2;background:radial-gradient(ellipse,rgba(212,98,42,.30),rgba(212,98,42,.06) 46%,transparent 70%);animation:eqAur1 26s ease-in-out infinite;}
.eq-aurora.a2{top:6%;right:22%;width:48vw;max-width:520px;aspect-ratio:1;background:radial-gradient(circle,rgba(255,165,75,.16),transparent 66%);animation:eqAur2 34s ease-in-out infinite;}
.eq-atmos-fade{position:absolute;left:0;right:0;bottom:0;height:42%;background:linear-gradient(transparent,var(--bg));}
@keyframes eqAur1{0%,100%{transform:translate(0,0) scale(1);opacity:.95;}50%{transform:translate(-4%,3%) scale(1.09);opacity:1;}}
@keyframes eqAur2{0%,100%{transform:translate(0,0) scale(1.06);opacity:.65;}50%{transform:translate(6%,-4%) scale(1);opacity:.9;}}

.eq-eyebrow{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.34em;
  font-size:10.5px;font-weight:500;color:var(--accent);margin:0 0 12px;}
.eq-name{font-family:var(--font-barlow);font-weight:900;text-transform:uppercase;
  line-height:.82;letter-spacing:-.035em;color:#f5efe6;margin:0 0 14px;
  font-size:clamp(2.75rem,8vw,5.5rem);display:flex;flex-direction:column;}
.eq-name span{display:block;}
.eq-bar{height:2px;width:0;background:var(--accent);margin:0 0 16px;}
.eq-hero.is-loaded .eq-bar{width:64px;transition:width .7s cubic-bezier(.16,1,.3,1) .42s;}
.eq-meta{font-family:var(--font-mono);font-size:11px;letter-spacing:.05em;
  color:var(--text-2);line-height:1.75;margin:0 0 22px;}
.eq-cta{display:flex;gap:14px;flex-wrap:wrap;}
.eq-btn{font-family:var(--font-barlow);font-weight:800;text-transform:uppercase;letter-spacing:.12em;
  font-size:13px;padding:14px 30px;border-radius:2px;cursor:pointer;border:1px solid transparent;
  transition:transform .15s ease,opacity .15s ease,background .15s ease,border-color .15s ease,color .15s ease;}
.eq-btn-primary{background:var(--accent);color:#0d0b0a;}
.eq-btn-primary:hover{transform:translateY(-2px);opacity:.9;}
.eq-btn-ghost{background:transparent;border-color:var(--border);color:var(--text-2);}
.eq-btn-ghost:hover{transform:translateY(-2px);border-color:var(--accent);color:#f5efe6;}
.eq-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}

.eq-rise{opacity:0;transform:translateY(18px);
  transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1);}
.eq-hero.is-loaded .eq-rise{opacity:1;transform:none;}
.eq-hero.is-loaded .eq-rise.d1{transition-delay:.10s;}
.eq-hero.is-loaded .eq-rise.d2{transition-delay:.22s;}
.eq-hero.is-loaded .eq-rise.d4{transition-delay:.48s;}
.eq-hero.is-loaded .eq-rise.d5{transition-delay:.60s;}

.eq-portrait{position:relative;z-index:1;width:100%;max-width:340px;margin:0 auto;}
@media(min-width:768px){.eq-portrait{max-width:400px;}}
.eq-frame{position:relative;aspect-ratio:4/5;border-radius:4px;overflow:hidden;background:var(--surface);
  box-shadow:0 0 0 1px var(--border),0 44px 120px -50px rgba(0,0,0,.85),0 0 70px -30px rgba(212,98,42,.14);
  opacity:0;transform:scale(1.05);will-change:transform,opacity;}
.eq-hero.is-loaded .eq-frame{opacity:1;transform:scale(1);
  transition:transform .8s cubic-bezier(.16,1,.3,1),opacity .7s ease;}

.eq-layer{position:absolute;inset:0;}
.eq-photo{opacity:0;transition:opacity .5s ease;filter:sepia(.42) saturate(1.15) hue-rotate(-6deg) brightness(1.02) contrast(1.02);}
.eq-photo.is-on{opacity:1;}

.eq-grain{position:absolute;inset:-20%;background-image:${GRAIN};background-size:150px 150px;
  mix-blend-mode:overlay;opacity:.10;pointer-events:none;animation:eqGrainIn 2.6s ease-out both;}
@keyframes eqGrainIn{from{opacity:0;transform:translate(0,0);}to{opacity:.10;transform:translate(2%,1.5%);}}

.eq-ghost{position:absolute;inset:0;background-size:cover;background-position:center;
  opacity:0;mix-blend-mode:screen;pointer-events:none;will-change:transform,opacity;}
.eq-ghost-r{filter:grayscale(1) brightness(1.1) sepia(1) saturate(5) hue-rotate(-20deg);}
.eq-ghost-c{filter:grayscale(1) brightness(1.1) sepia(1) saturate(5) hue-rotate(160deg);}
.eq-portrait.is-shimmer .eq-ghost-r{animation:eqGhostR .5s ease both;}
.eq-portrait.is-shimmer .eq-ghost-c{animation:eqGhostC .5s ease both;}
@keyframes eqGhostR{0%{opacity:0;transform:translate3d(0,0,0);}12%{opacity:.8;transform:translate3d(-8px,1px,0);}
  40%{opacity:.55;transform:translate3d(5px,-1px,0);}68%{opacity:.3;transform:translate3d(-3px,0,0);}
  100%{opacity:0;transform:translate3d(0,0,0);}}
@keyframes eqGhostC{0%{opacity:0;transform:translate3d(0,0,0);}12%{opacity:.8;transform:translate3d(8px,-1px,0);}
  40%{opacity:.55;transform:translate3d(-5px,1px,0);}68%{opacity:.3;transform:translate3d(3px,0,0);}
  100%{opacity:0;transform:translate3d(0,0,0);}}

.eq-dither{position:absolute;inset:-20%;background-image:${GRAIN};background-size:220px 220px;
  mix-blend-mode:screen;opacity:0;pointer-events:none;}
.eq-portrait.is-shimmer .eq-dither{animation:eqDither .5s steps(3) both;}
@keyframes eqDither{0%{opacity:0;}25%{opacity:.28;}60%{opacity:.10;}100%{opacity:0;}}

.eq-vignette{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 120px 12px rgba(13,11,10,.5);}
.eq-fade{position:absolute;left:0;right:0;bottom:0;height:30%;pointer-events:none;
  background:linear-gradient(transparent,var(--bg));}

@media(hover:none),(pointer:coarse){.eq-ghost,.eq-dither{display:none!important;}}
@media(prefers-reduced-motion:reduce){
  .eq-hero .eq-rise,.eq-hero .eq-frame{opacity:1!important;transform:none!important;transition:none!important;}
  .eq-bar{width:64px!important;transition:none!important;}
  .eq-grain{animation:none!important;opacity:.1;}
  .eq-aurora{animation:none!important;}
  .eq-ghost,.eq-dither{display:none!important;}
  .eq-photo{transition:opacity .2s linear;}
}
`;

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState(0);
  const [shimmer, setShimmer] = useState(false);
  const timers = useRef<number[]>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const cycleTo = (p: number) => {
    setPhase(p);
    if (reduced.current) return;
    setShimmer(true);
    timers.current.push(window.setTimeout(() => setShimmer(false), 500));
  };

  const handleEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    clearTimers();
    cycleTo(1);
    timers.current.push(window.setTimeout(() => cycleTo(2), 1400));
  };

  const handleLeave = () => {
    clearTimers();
    cycleTo(0);
  };

  useEffect(() => () => clearTimers(), []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className={`eq-hero relative min-h-[75vh] grid grid-cols-1 md:grid-cols-[54fr_46fr] items-center gap-8 md:gap-12 px-6 pt-24 pb-12 md:px-14 md:pt-28 md:pb-16 overflow-hidden${
        loaded ? " is-loaded" : ""
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Duotone: black -> #0d0b0a, white -> warm off-white, orange-tinted midtones */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute" }}
      >
        <filter id="eq-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.051 0.58 0.957" />
            <feFuncG type="table" tableValues="0.043 0.42 0.929" />
            <feFuncB type="table" tableValues="0.039 0.30 0.894" />
          </feComponentTransfer>
        </filter>
      </svg>

      <div className="eq-atmos" aria-hidden="true">
        <div className="eq-sky" />
        <div className="eq-aurora a1" />
        <div className="eq-aurora a2" />
        <div className="eq-atmos-fade" />
      </div>

      <div className="relative z-10">
        <p className="eq-rise d1 eq-eyebrow">
          Division I Wrestler at Cornell University
        </p>

        <h1 className="eq-rise d2 eq-name">
          <span>Ethan</span>
          <span>Qureshi</span>
        </h1>

        <div className="eq-rise d2 eq-bar" aria-hidden="true" />

        <p className="eq-rise d4 eq-meta">
          10x · HdL Companies · HP Tech Ventures · JPMorganChase · Park Lane ·
          MatPad
        </p>

        <div className="eq-rise d5 eq-cta">
          <button
            onClick={() => scrollTo("experience")}
            className="eq-btn eq-btn-primary"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="eq-btn eq-btn-ghost"
          >
            Contact
          </button>
        </div>
      </div>

      <div
        className={`eq-portrait${shimmer ? " is-shimmer" : ""}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="eq-frame">
          <div className={`eq-layer eq-photo${phase === 0 ? " is-on" : ""}`}>
            <Image
              src={PHOTOS[0]}
              alt="Ethan Qureshi"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 46vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div className={`eq-layer eq-photo${phase === 1 ? " is-on" : ""}`}>
            <Image
              src={PHOTOS[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 46vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div className={`eq-layer eq-photo${phase === 2 ? " is-on" : ""}`}>
            <Image
              src={PHOTOS[2]}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 46vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          <div className="eq-grain" />
          <div
            className="eq-ghost eq-ghost-r"
            style={{ backgroundImage: `url(${PHOTOS[phase]})` }}
          />
          <div
            className="eq-ghost eq-ghost-c"
            style={{ backgroundImage: `url(${PHOTOS[phase]})` }}
          />
          <div className="eq-dither" />
          <div className="eq-vignette" />
          <div className="eq-fade" />
        </div>
      </div>
    </section>
  );
}
