import { useState, useEffect } from 'react'
import { SECTION_IDS } from '@/shared/utils/constants'

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const ids = Object.values(SECTION_IDS)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}
