import Reveal from "./Reveal";

export default function BioSection() {
  return (
    <section
      id="bio"
      className="px-6 py-16 md:px-12 md:py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 max-w-[1100px] mx-auto">
        <Reveal>
          <p
            className="font-display font-bold uppercase tracking-[0.35em] text-[10px] mb-3"
            style={{ color: "var(--accent)" }}
          >
            Bio
          </p>
          <h2
            className="font-display font-black uppercase leading-[0.95] text-white"
            style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
          >
            About Me
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="font-body text-[14px] md:text-[15px] leading-[1.85] space-y-5"
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
              I am currently building MatPad and other AI-native products,
              focused on creating tools that drive efficiency, productivity, and
              real value for the people who use them. I am actively seeking
              opportunities to build at the frontier of AI — whether founding
              something, joining a high-conviction early-stage team, or
              shipping products that create meaningful impact.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
