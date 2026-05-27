"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fade = (el: HTMLElement | null, delay: number) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    };

    fade(taglineRef.current, 100);
    fade(nameRef.current, 250);
    setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.transition = "width 0.6s ease";
        barRef.current.style.width = "60px";
      }
    }, 450);
    fade(subtitleRef.current, 550);
    fade(ctaRef.current, 700);
    setTimeout(() => {
      const img = imageRef.current;
      if (!img) return;
      img.style.transition =
        "opacity 0.9s ease, filter 0.9s ease, transform 0.9s ease";
      img.style.opacity = "1";
      img.style.filter = "grayscale(0%)";
      img.style.transform = "scale(1)";
    }, 300);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-[55fr_45fr] items-center px-6 pt-28 pb-16 md:px-12 md:pt-36 md:pb-20 gap-10 md:gap-16 overflow-hidden">
      <div
        className="absolute top-[10%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(179,27,27,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <p
          ref={taglineRef}
          className="font-body uppercase tracking-[0.35em] text-[10px] mb-4"
          style={{ color: "var(--accent)", opacity: 0, transform: "translateY(20px)" }}
        >
          Division I Wrestler at Cornell University
        </p>

        <div
          ref={nameRef}
          className="font-display font-black uppercase leading-[0.9] mb-6"
          style={{
            fontSize: "clamp(3.5rem, 13vw, 8.5rem)",
            letterSpacing: "-0.01em",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          <div>ETHAN</div>
          <div>QURESHI</div>
        </div>

        <div
          ref={barRef}
          className="h-[2px] mb-5"
          style={{ background: "var(--accent)", width: "0px" }}
        />

        <p
          ref={subtitleRef}
          className="font-body text-[13px] mb-9"
          style={{ color: "var(--text-2)", opacity: 0, transform: "translateY(20px)" }}
        >
          HdL Companies · HP Tech Ventures · JPMorganChase · Park Lane · MatPad
        </p>

        <div
          ref={ctaRef}
          className="flex gap-3"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <button
            onClick={() => scrollTo("experience")}
            className="font-display font-black uppercase tracking-[0.1em] text-[13px] px-7 py-3 text-white transition-all duration-150 hover:opacity-85 hover:-translate-y-0.5"
            style={{ background: "var(--accent)", borderRadius: "2px" }}
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="font-display font-bold uppercase tracking-[0.1em] text-[13px] px-7 py-3 transition-all duration-150 hover:-translate-y-0.5"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-2)",
              borderRadius: "2px",
            }}
          >
            Contact
          </button>
        </div>
      </div>

      <div
        ref={imageRef}
        className="w-full max-w-[340px] mx-auto md:max-w-none"
        style={{
          opacity: 0,
          filter: "grayscale(100%)",
          transform: "scale(0.98)",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "9/10",
            borderRadius: "4px",
            boxShadow:
              "0 0 80px rgba(179,27,27,0.18), 0 0 0 1px rgba(179,27,27,0.08)",
          }}
        >
          <Image
            src="/headshot.png"
            alt="Ethan Qureshi"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
            style={{ background: "linear-gradient(transparent, #0a0a0a)" }}
          />
        </div>
      </div>
    </section>
  );
}
