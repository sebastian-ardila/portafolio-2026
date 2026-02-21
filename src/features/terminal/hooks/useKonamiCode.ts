import { useEffect, useRef } from 'react'
import { KONAMI_CODE } from '@/shared/utils/constants'

export function useKonamiCode(callback: () => void) {
  const index = useRef(0)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI_CODE[index.current]) {
        index.current++
        if (index.current === KONAMI_CODE.length) {
          callback()
          index.current = 0
        }
      } else {
        index.current = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callback])
}
