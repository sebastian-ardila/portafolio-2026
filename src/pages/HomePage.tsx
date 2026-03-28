import { HeroSection } from '@/features/hero'
import { ProjectsSection } from '@/features/projects'
import { BlogSection } from '@/features/blog'
import { ContactSection } from '@/features/contact'
export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}
