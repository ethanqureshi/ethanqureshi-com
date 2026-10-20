import Reveal from "./Reveal";

const education = [
  {
    school: "Cornell University",
    logo: "/logos/cornell.png",
    meta: "The Dyson School · B.S.",
    location: "Ithaca, NY",
    lines: [
      ["Degree", "Applied Economics & Management"],
      ["Concentrations", "Finance, Business Analytics"],
      ["Honors", "Cornell Tradition Fellow, Graham Morin 11th Man Award"],
    ],
  },
  {
    school: "The University of Edinburgh",
    logo: "/logos/edinburgh.png",
    meta: "Visiting Undergraduate",
    location: "Edinburgh, Scotland",
    lines: [
      ["Coursework", "International Business, Behavioral Finance, Sociology"],
    ],
  },
];

export default function BioSection() {
  return (
    <section id="bio" className="slide">
      <div className="deck-panel grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-0 md:gap-14">
        <Reveal>
          <p className="t-label">Bio</p>
          <h2 className="t-h2">About Me</h2>

          <div className="edu">
            <p className="t-label">Education</p>
            {education.map((e) => (
              <div key={e.school} className="edu-item">
                <div className="exp-head">
                  <span className="co-mark co-mark--seal" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.logo} alt="" decoding="async" />
                  </span>
                  <h3 className="t-h3">{e.school}</h3>
                </div>
                <p className="t-meta">{e.meta}</p>
                <p className="t-meta edu-loc">{e.location}</p>
                {e.lines.map(([k, v]) => (
                  <p key={k} className="t-small">
                    <span className="edu-key">{k}:</span> {v}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="t-body space-y-4 mt-8 md:mt-0">
            <p>
              Raised in Southern California by immigrant parents, I grew up
              playing soccer, swimming, and more before finding my deepest
              commitment in jiu-jitsu, where I became a multiple-time youth
              national and world champion.
            </p>
            <p>
              In high school I switched to wrestling, becoming a California
              Freestyle State Champion and NHSCA Senior Nationals All-American
              before being recruited to Cornell. Since I
              joined, the team has finished 18th, 7th, 3rd, and 2nd at the NCAA
              Championships.
            </p>
            <p>
              In my first collegiate season I received the Graham Morin 11th Man
              Award, given to the nonstarter with the greatest contributions to
              the team.
            </p>
            <p>
              Off the mat, work in venture capital, global finance, and
              investment banking turned into a passion for building.
            </p>
            <p>
              Today I lead community and creator growth at Wrestle AI, at the
              intersection of sports, community, and AI. Before that, I drove
              growth for Fit AI, an AI-powered fitness app, and built MatPad, a
              camp management platform for wrestling directors. Next, I want to
              build at the frontier of AI: founding a company, joining a
              high-conviction early-stage team, or shipping products with real
              impact.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
