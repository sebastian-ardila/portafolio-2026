import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait for page to render, then scroll to the element
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      }, 200)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
