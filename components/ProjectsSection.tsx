import Image from "next/image";
import Reveal from "./Reveal";

const projects = [
  {
    href: "https://matpad.app",
    logo: "/matpad-logo.png",
    logoAlt: "MatPad",
    logoBg: "#0f1a2e",
    cover: false,
    coverPos: "center",
    imgSize: 78,
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
    cover: false,
    coverPos: "center",
    imgSize: 116,
    label: "2026 · AI · Study · Music",
    title: "StudySong",
    description:
      "Turn any notes into a study song — AI-written lyrics and AI vocals, with subscription tiers.",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-6 py-8 md:px-12 md:py-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-10 mb-5 md:mb-7">
          <Reveal>
            <p
              className="font-display font-bold uppercase tracking-[0.35em] text-[10px] mb-3"
              style={{ color: "var(--accent)" }}
            >
              Projects
            </p>
            <h2
              className="font-display font-black uppercase leading-[0.95] text-white"
              style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
            >
              What I&apos;ve Built
            </h2>
          </Reveal>
          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Reveal key={project.href} initialY={24}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                }}
              >
                <div
                  className="relative h-[150px] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.logoBg}, var(--bg))`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={project.logo}
                      alt={project.logoAlt}
                      width={project.imgSize}
                      height={project.imgSize}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                    style={{
                      background: "linear-gradient(transparent, var(--surface))",
                    }}
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <p
                    className="font-body text-[10px] uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {project.label}
                  </p>
                  <p className="font-display font-black uppercase text-white text-[22px] md:text-[24px] leading-none mb-2.5">
                    {project.title}
                  </p>
                  <p
                    className="font-body text-[13px] leading-[1.6] mb-6 flex-1"
                    style={{ color: "var(--text-2)" }}
                  >
                    {project.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 group-hover:text-white"
                    style={{ color: "var(--text-2)" }}
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
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
