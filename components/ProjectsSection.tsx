import Image from "next/image";
import Reveal from "./Reveal";

const projects = [
  {
    href: "https://matpad.app",
    logo: "/matpad-icon.png",
    logoAlt: "MatPad",
    logoBg: "#0b0b0d",
    imgSize: 56,
    label: "2026 · AI · Wrestling · SaaS",
    title: "MatPad",
    description:
      "Registration, payments, rosters, and digital waivers for wrestling camps, in one platform.",
  },
  {
    href: "https://studysong.org",
    logo: "/studysong-icon.png",
    logoAlt: "StudySong",
    logoBg: "#6b3df5",
    imgSize: 56,
    label: "2026 · AI · Study · Music",
    title: "StudySong",
    description:
      "Turns any notes into a study song with AI-written lyrics, AI vocals, and subscription tiers.",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="slide">
      <div className="deck-panel">
        <Reveal className="slide-head">
          <p className="t-label">Projects</p>
          <h2 className="t-h2">What I&apos;ve Built</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project) => (
            <Reveal key={project.href} initialY={24}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-6 md:p-8 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center overflow-hidden"
                  style={{ background: project.logoBg, borderRadius: "12px" }}
                >
                  <Image
                    src={project.logo}
                    alt={project.logoAlt}
                    width={project.imgSize}
                    height={project.imgSize}
                    quality={95}
                    priority
                    className="h-full w-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <p className="t-meta mb-2" style={{ color: "var(--accent)" }}>
                  {project.label}
                </p>

                <h3 className="t-h3 mb-2" style={{ fontSize: "20px" }}>
                  {project.title}
                </h3>

                <p className="t-small mb-6 flex-1" style={{ fontSize: "14px" }}>
                  {project.description}
                </p>

                <span
                  className="t-meta inline-flex items-center gap-2 transition-colors duration-200"
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
