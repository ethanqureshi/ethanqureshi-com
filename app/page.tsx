import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <HeroSection />
        <BioSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer
        className="px-6 py-10 md:px-12"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <p
          className="font-mono text-[11px] uppercase tracking-[0.14em] max-w-[1040px] mx-auto"
          style={{ color: "var(--text-3)" }}
        >
          © 2026 Ethan Qureshi
        </p>
      </footer>
    </>
  );
}
