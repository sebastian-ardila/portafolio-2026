import { HeroSection } from '@/features/hero'
import { ProjectsSection } from '@/features/projects'
import { BlogSection } from '@/features/blog'
import { ContactSection } from '@/features/contact'
import { TerminalOverlay } from '@/features/terminal'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <TerminalOverlay />
    </>
  )
}
