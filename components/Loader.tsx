"use client";

import { Fragment, useEffect, useState } from "react";

// A 3x3x3 Rubik's cube built from plain divs and CSS 3D transforms. Every part
// of the animation (fly-in, the sixteen turns, the counter, the fade-out) is a
// CSS keyframe, so it starts at first paint and never waits on React. The
// component itself only owns dismissal.
//
// This is a real cube: every sticker is painted once, at its true colour, and
// no sticker ever changes colour. The cube starts genuinely scrambled and is
// physically turned back to solved by the sixteen quarter turns in MOVES.
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
type Move = { axis: Axis; layer: number; deg: number };

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

// The solve: sixteen quarter turns, one per 120ms, touching all six faces.
//
// These are not random. A random scramble played backwards lurches — it looks
// like flailing, then snaps together in the last two turns. This sequence was
// found by walking *backwards* from a solved cube and only ever accepting a
// move that made the cube strictly less solved, so played forwards every single
// turn leaves the cube strictly more solved than the one before it. Its
// solvedness climbs 10 → 13 → 16 → 18 → 19 → 20 → 21 → 22 → 23 → 24 → 25 → 26
// → 28 → 30 → 32 → 42 → 54 stickers: it never regresses and it is never solved
// early. (The last turn always gains exactly 12 — the state one quarter turn
// from solved is necessarily 42/54, on any cube. Real solves land the same way.)
//
// Must stay in step with the rcT0..rcT15 keyframes in globals.css.
const MOVES: Move[] = [
  { axis: "y", layer: 1, deg: -90 }, // D'
  { axis: "z", layer: -1, deg: -90 }, // B'
  { axis: "y", layer: -1, deg: 90 }, // U
  { axis: "z", layer: 1, deg: -90 }, // F'
  { axis: "y", layer: -1, deg: 90 }, // U
  { axis: "z", layer: 1, deg: -90 }, // F'
  { axis: "x", layer: -1, deg: 90 }, // L
  { axis: "y", layer: -1, deg: 90 }, // U
  { axis: "x", layer: 1, deg: -90 }, // R'
  { axis: "z", layer: 1, deg: 90 }, // F
  { axis: "y", layer: 1, deg: 90 }, // D
  { axis: "x", layer: 1, deg: 90 }, // R
  { axis: "z", layer: 1, deg: -90 }, // F'
  { axis: "x", layer: 1, deg: -90 }, // R'
  { axis: "y", layer: 1, deg: 90 }, // D
  { axis: "x", layer: 1, deg: -90 }, // R'
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

const C = 56; // cubie edge, px

type Cubie = {
  home: Vec;
  pos: Vec;
  // The cubie's own axes, in world space. Together they are its orientation.
  basis: { x: Vec; y: Vec; z: Vec };
  rides: number[];
};

// Work out the scrambled cube and the whole solve once, at module scope.
//
// The scramble is simply the solve undone — the same moves in reverse, each
// turned the other way — so the cube we start from is exactly the cube these
// sixteen turns put back together. Nothing is randomised at runtime, so server
// and client render identical markup.
const CUBIES = (() => {
  const cubies: Cubie[] = [];
  for (const x of [-1, 0, 1])
    for (const y of [-1, 0, 1])
      for (const z of [-1, 0, 1]) {
        if (x === 0 && y === 0 && z === 0) continue; // never visible
        cubies.push({
          home: [x, y, z],
          pos: [x, y, z],
          basis: { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1] },
          rides: [],
        });
      }

  const turn = (m: Move) => {
    for (const c of cubies) {
      if (c.pos[AXIS_INDEX[m.axis]] !== m.layer) continue;
      c.pos = rot(c.pos, m.axis, m.deg);
      c.basis = {
        x: rot(c.basis.x, m.axis, m.deg),
        y: rot(c.basis.y, m.axis, m.deg),
        z: rot(c.basis.z, m.axis, m.deg),
      };
    }
  };

  // Scramble: the solve, backwards.
  for (const m of [...MOVES].reverse()) turn({ ...m, deg: -m.deg });

  const start = cubies.map((c) => ({
    pos: c.pos,
    basis: c.basis,
  }));

  // Now play the solve, noting which turns each cubie rides. The layer test uses
  // the cubie's *current* position, exactly as a real turn grabs whatever is
  // sitting in that layer right now.
  MOVES.forEach((m, i) => {
    for (const c of cubies) {
      if (c.pos[AXIS_INDEX[m.axis]] !== m.layer) continue;
      c.rides.push(i);
    }
    turn(m);
  });

  return cubies.map((c, i) => {
    const { pos, basis } = start[i];
    // The cubie's starting transform: rotated into its scrambled orientation,
    // then dropped into its scrambled slot. Column-major, so each column is
    // where one of the cubie's own axes points in world space.
    const b = basis;
    const t = [pos[0] * C, pos[1] * C, pos[2] * C];
    return {
      key: c.home.join(","),
      matrix: `matrix3d(${b.x[0]},${b.x[1]},${b.x[2]},0,${b.y[0]},${b.y[1]},${b.y[2]},0,${b.z[0]},${b.z[1]},${b.z[2]},0,${t[0]},${t[1]},${t[2]},1)`,
      // Ascending: the render loop wraps each move in turn and the *last* one
      // wrapped ends up outermost, giving a world transform of
      // R_last · … · R_first · start. Reversing this list silently transposes the
      // composition and the cubies land on top of each other.
      chain: c.rides,
      // A sticker exists where the cubie sat on the outside of the solved cube,
      // and it keeps that colour forever.
      faces: FACES.map((f) => ({
        f,
        color: NORMAL[f].some((v, j) => v !== 0 && v === c.home[j])
          ? SOLVED[f]
          : null,
      })),
    };
  });
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
            // Wrap the cubie in one rotation layer per turn it rides.
            let node = (
              <div className="rc-cubie" style={{ transform: c.matrix }}>
                {c.faces.map((face) => (
                  <div
                    key={face.f}
                    className={`rc-face rc-${face.f.toLowerCase()}`}
                    style={
                      face.color ? { background: face.color } : undefined
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
