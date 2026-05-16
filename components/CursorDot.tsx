"use client";

import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX - 5 + "px";
      dot.style.top = e.clientY - 5 + "px";
    };

    const onEnter = () => {
      dot.style.width = "24px";
      dot.style.height = "24px";
    };

    const onLeave = () => {
      dot.style.width = "10px";
      dot.style.height = "10px";
    };

    document.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full pointer-events-none z-[9999] transition-[width,height] duration-200"
      style={{ background: "var(--accent)" }}
    />
  );
}
