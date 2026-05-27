import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const projects = [
  {
    href: "/projects/matpad",
    logo: "/matpad-logo.png",
    logoAlt: "MatPad",
    logoBg: "#0f1a2e",
    label: "2026 · AI · Wrestling · SaaS",
    title: "MatPad",
    description:
      "A full-stack wrestling camp management platform consolidating online registration, automated payments, roster management, digital waivers, and a public camp directory into one system for coaches.",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-6 py-16 md:px-12 md:py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12 md:mb-16">
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

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {projects.map((project) => (
            <Reveal key={project.href} initialY={24}>
              <Link
                href={project.href}
                className="group block p-6 md:p-7 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden"
                    style={{
                      borderRadius: "12px",
                      background: project.logoBg,
                    }}
                  >
                    <Image
                      src={project.logo}
                      alt={project.logoAlt}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <svg
                    className="opacity-30 group-hover:opacity-70 transition-opacity duration-200"
                    width="16"
                    height="16"
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
                </div>

                <p
                  className="font-body text-[10px] uppercase tracking-[0.12em] mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {project.label}
                </p>

                <p
                  className="font-display font-black uppercase text-white text-[18px] md:text-[20px] leading-tight mb-3"
                >
                  {project.title}
                </p>

                <p
                  className="font-body text-[13px] md:text-[14px] leading-[1.75]"
                  style={{ color: "var(--text-2)" }}
                >
                  {project.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
