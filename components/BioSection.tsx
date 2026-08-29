import Reveal from "./Reveal";

export default function BioSection() {
  return (
    <section
      id="bio"
      className="px-6 py-12 md:px-12 md:py-16"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="deck-panel grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 max-w-[1040px] mx-auto">
        <Reveal>
          <p
            className="font-mono uppercase tracking-[0.24em] text-[11px] mb-4"
            style={{ color: "var(--accent)" }}
          >
            Bio
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.45rem, 3.2vw, 1.95rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--text-1)",
            }}
          >
            About Me
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="font-body text-[16px] md:text-[15px] leading-[1.8] md:leading-[1.7] space-y-5 md:space-y-3"
            style={{ color: "var(--text-2)" }}
          >
            <p>
              Raised in Southern California by immigrant parents, I grew up
              playing everything: from soccer, swimming, and more, before
              finding my deepest commitment in jiu-jitsu, where I became a
              multiple-time national and world champion at the youth level.
            </p>
            <p>
              I transitioned to wrestling in high school, where I was a
              California Freestyle State Champion and NHSCA Senior Nationals
              All-American, before being recruited to Cornell University. During
              my time with the program, the team has finished 18th, 7th, 3rd,
              and 2nd at the NCAA Championships.
            </p>
            <p>
              In my first collegiate season, I received the Graham Morin 11th
              Man Award, given to the nonstarter who had the greatest
              contributions to the team.
            </p>
            <p>
              At Cornell, I study Applied Economics and Management at the Dyson
              School, concentrating in Finance and Business Analytics. Beyond
              the mat, my experiences in venture capital, global finance, and
              investment banking have shaped a genuine passion for building.
            </p>
            <p>
              I am currently working at the intersection of sports, community,
              and AI, leading community and creator growth at Wrestle AI while
              driving growth for Fit AI, an AI-powered fitness app. I am actively
              seeking opportunities to build at the frontier of AI, whether
              founding something, joining a high-conviction early-stage team, or
              shipping products that create meaningful impact.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
