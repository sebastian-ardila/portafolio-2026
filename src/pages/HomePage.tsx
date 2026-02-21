import { HeroSection } from '@/features/hero'
import { AboutSection } from '@/features/about'
import { SkillsSection } from '@/features/skills'
import { ExperienceSection } from '@/features/experience'
import { ProjectsSection } from '@/features/projects'
import { BlogSection } from '@/features/blog'
import { ContactSection } from '@/features/contact'
import { TerminalOverlay } from '@/features/terminal'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <TerminalOverlay />
    </>
  )
}
