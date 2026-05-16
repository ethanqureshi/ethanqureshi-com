import Nav from "@/components/Nav";
import CursorDot from "@/components/CursorDot";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import BioSection from "@/components/BioSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <CursorDot />
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
        className="px-6 py-6 md:px-12 md:py-8 font-body text-[11px] uppercase tracking-[0.12em]"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
      >
        © 2026 Ethan Qureshi
      </footer>
    </>
  );
}
