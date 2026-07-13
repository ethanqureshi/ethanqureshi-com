"use client";

import { Fragment, useEffect, useState } from "react";

// A 3x3x3 Rubik's cube built from plain divs and CSS 3D transforms. Every part
// of the animation (fly-in, the turns, the colour resolve, the counter, the
// fade-out) is a CSS keyframe, so it starts at first paint and never waits on
// React. The component itself only owns dismissal.
//
// Turning a real cube needs a different grouping of cubies per move — an R turn
// and a U turn share no DOM parent — so a fixed slice-per-div structure can only
// ever turn one axis. Instead each cubie carries a chain of nested rotation
// wrappers, one per move it takes part in, applied outermost-last. A wrapper
// rotates about the cube's centre, so during move i the cubie's world transform
// is R_i(t) · (everything already done to it): a true quarter turn on a true
// arc, on whichever axis that move needs.

const FACES = ["U", "D", "F", "B", "R", "L"] as const;
type Face = (typeof FACES)[number];
type Axis = "x" | "y" | "z";
type Vec = [number, number, number];

// Solved state, straight off the site palette. The three faces the camera
// settles on — U, F, R — are the site's three signature colours: bone,
// terracotta, charcoal. The hidden three carry the supporting tones.
const SOLVED: Record<Face, string> = {
  U: "#f5f0e8", // bone
  F: "#b8563f", // terracotta
  R: "#221e1a", // warm charcoal
  D: "#e6ddd0", // surface
  L: "#8a3d2c", // deep terracotta
  B: "#6f655a", // warm grey
};

// Outward normals, in CSS space: +x right, +y DOWN, +z toward the viewer.
const NORMAL: Record<Face, Vec> = {
  U: [0, -1, 0],
  D: [0, 1, 0],
  F: [0, 0, 1],
  B: [0, 0, -1],
  R: [1, 0, 0],
  L: [-1, 0, 0],
};

// The solve: eight quarter turns, one per 215ms, hitting every face of the cube
// plus two middle slices. Order and direction are arbitrary — the stickers are
// recoloured by where each face *ends up* pointing, so any sequence lands on a
// solid, solved cube. Must stay in step with the rcT0..rcT7 keyframes in
// globals.css.
const MOVES: { axis: Axis; layer: number; deg: number }[] = [
  { axis: "x", layer: 1, deg: 90 }, // R
  { axis: "y", layer: -1, deg: -90 }, // U
  { axis: "z", layer: 1, deg: 90 }, // F
  { axis: "x", layer: -1, deg: 90 }, // L
  { axis: "y", layer: 1, deg: 90 }, // D
  { axis: "z", layer: -1, deg: -90 }, // B
  { axis: "x", layer: 0, deg: -90 }, // M
  { axis: "y", layer: 0, deg: 90 }, // E
];

const AXIS_INDEX: Record<Axis, number> = { x: 0, y: 1, z: 2 };

// Rotate an integer vector a quarter turn, using CSS's own rotation matrices so
// the maths and the rendering agree.
function rot([x, y, z]: Vec, axis: Axis, deg: number): Vec {
  const s = Math.round(Math.sin((deg * Math.PI) / 180));
  const c = Math.round(Math.cos((deg * Math.PI) / 180));
  if (axis === "x") return [x, y * c - z * s, y * s + z * c];
  if (axis === "y") return [x * c + z * s, y, -x * s + z * c];
  return [x * c - y * s, x * s + y * c, z];
}

const faceAt = (n: Vec) =>
  FACES.find((f) => NORMAL[f].every((v, i) => v === n[i]))!;

// 54 stickers, nine of each colour, shuffled by a seeded LCG so server and
// client produce the identical scramble (Math.random would hydrate-mismatch).
function scramble(): string[] {
  const pool: string[] = [];
  for (const f of FACES) for (let i = 0; i < 9; i++) pool.push(SOLVED[f]);
  let s = 0x9e3779b9;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

const C = 56; // cubie edge, px

// Run the whole solve once, at module scope, to work out for each cubie: which
// moves it rides (its wrapper chain) and where each of its faces ends up
// pointing (its solved colour).
type Cubie = {
  home: Vec;
  pos: Vec;
  dir: Record<Face, Vec>;
  rides: number[];
  scrambled: Record<Face, string | null>;
};

const CUBIES = (() => {
  const pool = scramble();
  let sticker = 0;

  const cubies: Cubie[] = [];
  for (const x of [-1, 0, 1])
    for (const y of [-1, 0, 1])
      for (const z of [-1, 0, 1]) {
        if (x === 0 && y === 0 && z === 0) continue; // never visible
        const home: Vec = [x, y, z];
        cubies.push({
          home,
          pos: [...home] as Vec,
          // Where each of this cubie's faces currently points. Faces on the
          // outside of the cube get a sticker; the rest stay plastic.
          dir: Object.fromEntries(
            FACES.map((f) => [f, [...NORMAL[f]] as Vec])
          ) as Record<Face, Vec>,
          rides: [] as number[],
          scrambled: Object.fromEntries(
            FACES.map((f) => [
              f,
              NORMAL[f].some((v, i) => v !== 0 && v === home[i])
                ? pool[sticker++]
                : null,
            ])
          ) as Record<Face, string | null>,
        });
      }

  MOVES.forEach((m, i) => {
    for (const c of cubies) {
      if (c.pos[AXIS_INDEX[m.axis]] !== m.layer) continue;
      c.rides.push(i);
      c.pos = rot(c.pos, m.axis, m.deg);
      for (const f of FACES) c.dir[f] = rot(c.dir[f], m.axis, m.deg);
    }
  });

  return cubies.map((c, i) => ({
    key: c.home.join(""),
    home: c.home,
    // Wrapped innermost-first, so this list is ascending: the render loop wraps
    // each move in turn and the *last* one wrapped ends up outermost. That makes
    // the outermost wrapper the final move, giving a world transform of
    // R_last · … · R_first · translate(home) — the order the moves actually
    // happen in. Reversing this list silently transposes the composition and the
    // cubies land on top of each other.
    chain: c.rides,
    // Stickers land in a wave that finishes with the last turn.
    delay: 1500 + (i / 25) * 720,
    faces: FACES.map((f) => ({
      f,
      scrambled: c.scrambled[f],
      solved: c.scrambled[f] ? SOLVED[faceAt(c.dir[f])] : null,
    })),
  }));
})();

export default function Loader() {
  const [gone, setGone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const skip = () => setSkipped(true);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    // Hard cap: the overlay is gone at 3s whatever happens.
    const t = window.setTimeout(() => setGone(true), 3020);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!skipped) return;
    const t = window.setTimeout(() => setGone(true), 170);
    return () => window.clearTimeout(t);
  }, [skipped]);

  if (gone) return null;

  return (
    <div className={`rc${skipped ? " is-skipped" : ""}`} aria-hidden="true">
      <div className="rc-scene">
        <div className="rc-glow" />
        <div className="rc-cube">
          {CUBIES.map((c) => {
            // Wrap the cubie in one rotation layer per move it rides.
            let node = (
              <div
                className="rc-cubie"
                style={{
                  transform: `translate3d(${c.home[0] * C}px, ${
                    c.home[1] * C
                  }px, ${c.home[2] * C}px)`,
                }}
              >
                {c.faces.map((face) => (
                  <div
                    key={face.f}
                    className={`rc-face rc-${face.f.toLowerCase()}${
                      face.solved ? " rc-face--sticker" : ""
                    }`}
                    style={
                      face.solved
                        ? ({
                            "--s": face.scrambled,
                            "--k": face.solved,
                            "--d": `${c.delay}ms`,
                          } as React.CSSProperties)
                        : undefined
                    }
                  />
                ))}
              </div>
            );
            for (const move of c.chain) {
              node = <div className={`rc-turn rc-t${move}`}>{node}</div>;
            }
            // A Fragment, not a div: any plain element here would sit in the
            // cube's 3D context without preserve-3d and flatten everything below
            // it.
            return <Fragment key={c.key}>{node}</Fragment>;
          })}
        </div>
      </div>

      <div className="rc-hud">
        <div className="rc-bar">
          <i />
        </div>
        <div className="rc-meta">
          <span className="rc-label">Loading</span>
          <span className="rc-pct" />
        </div>
      </div>

      <span className="rc-skip">Click anywhere to skip</span>
    </div>
  );
}
