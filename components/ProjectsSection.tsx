import Image from "next/image";
import Reveal from "./Reveal";

const projects = [
  {
    href: "https://matpad.app",
    logo: "/matpad-logo.png",
    logoAlt: "MatPad",
    logoBg: "#0f1a2e",
    imgSize: 40,
    label: "2026 · AI · Wrestling · SaaS",
    title: "MatPad",
    description:
      "Registration, payments, rosters, and digital waivers for wrestling camps in one platform.",
  },
  {
    href: "https://studysong.org",
    logo: "/studysong-logo.png",
    logoAlt: "StudySong",
    logoBg: "#1b1233",
    imgSize: 52,
    label: "2026 · AI · Study · Music",
    title: "StudySong",
    description:
      "Turn any notes into a study song, with AI-written lyrics, AI vocals, and subscription tiers.",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-6 py-12 md:px-12 md:py-16"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="deck-panel max-w-[1040px] mx-auto">
        <Reveal className="mb-8 md:mb-10">
          <p
            className="font-mono uppercase tracking-[0.24em] text-[11px] mb-4"
            style={{ color: "var(--accent)" }}
          >
            Projects
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
            What I&apos;ve Built
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Reveal key={project.href} initialY={24}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-7 md:p-8 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center overflow-hidden"
                  style={{ background: project.logoBg, borderRadius: "12px" }}
                >
                  <Image
                    src={project.logo}
                    alt={project.logoAlt}
                    width={project.imgSize}
                    height={project.imgSize}
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <p
                  className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {project.label}
                </p>

                <h3
                  className="font-display mb-3"
                  style={{
                    fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)",
                    fontWeight: 700,
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    color: "var(--text-1)",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="font-body text-[13px] md:text-[14px] leading-[1.65] mb-6 flex-1"
                  style={{ color: "var(--text-2)" }}
                >
                  {project.description}
                </p>

                <span
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200"
                  style={{ color: "var(--accent)" }}
                >
                  View Project
                  <svg
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
