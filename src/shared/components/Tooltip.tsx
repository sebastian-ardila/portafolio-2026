import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Position = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  position?: Position
  delay?: number
}

/** Resolved position + pixel coords for the tooltip */
interface TooltipPlacement {
  pos: Position
  top?: number
  bottom?: number
  left?: number
  right?: number
}

const GAP = 6
const PADDING = 8 // min distance from viewport edge

/**
 * Given the trigger rect, the tooltip dimensions, and the preferred position,
 * return the best position that keeps the tooltip fully inside the viewport.
 * Falls back through opposite → perpendicular axes if needed.
 */
function computePlacement(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferred: Position,
): TooltipPlacement {
  const vw = window.innerWidth
  const vh = window.innerHeight

  const fallbackOrder: Record<Position, Position[]> = {
    bottom: ['bottom', 'top', 'right', 'left'],
    top: ['top', 'bottom', 'right', 'left'],
    left: ['left', 'right', 'bottom', 'top'],
    right: ['right', 'left', 'bottom', 'top'],
  }

  for (const pos of fallbackOrder[preferred]) {
    const placement = calcForPosition(pos, triggerRect, tooltipRect, vw, vh)
    if (placement) return placement
  }

  // Ultimate fallback: preferred position, clamped
  return calcClamped(preferred, triggerRect, tooltipRect, vw, vh)
}

function calcForPosition(
  pos: Position,
  r: DOMRect,
  t: DOMRect,
  vw: number,
  vh: number,
): TooltipPlacement | null {
  let top: number
  let left: number

  switch (pos) {
    case 'bottom':
      top = r.bottom + GAP
      left = r.left + r.width / 2 - t.width / 2
      break
    case 'top':
      top = r.top - GAP - t.height
      left = r.left + r.width / 2 - t.width / 2
      break
    case 'right':
      top = r.top + r.height / 2 - t.height / 2
      left = r.right + GAP
      break
    case 'left':
      top = r.top + r.height / 2 - t.height / 2
      left = r.left - GAP - t.width
      break
  }

  // Check if it fits within the viewport
  if (
    top >= PADDING &&
    top + t.height <= vh - PADDING &&
    left >= PADDING &&
    left + t.width <= vw - PADDING
  ) {
    return { pos, top, left }
  }

  return null
}

/** Clamped fallback — use the preferred axis but clamp so it doesn't overflow */
function calcClamped(
  pos: Position,
  r: DOMRect,
  t: DOMRect,
  vw: number,
  vh: number,
): TooltipPlacement {
  let top: number
  let left: number

  switch (pos) {
    case 'bottom':
      top = r.bottom + GAP
      left = r.left + r.width / 2 - t.width / 2
      break
    case 'top':
      top = r.top - GAP - t.height
      left = r.left + r.width / 2 - t.width / 2
      break
    case 'right':
      top = r.top + r.height / 2 - t.height / 2
      left = r.right + GAP
      break
    case 'left':
      top = r.top + r.height / 2 - t.height / 2
      left = r.left - GAP - t.width
      break
  }

  top = Math.max(PADDING, Math.min(top, vh - t.height - PADDING))
  left = Math.max(PADDING, Math.min(left, vw - t.width - PADDING))

  return { pos, top, left }
}

/** Arrow styles per resolved position */
function arrowStyle(pos: Position): React.CSSProperties {
  const color = 'rgba(255,255,255,0.2)'
  switch (pos) {
    case 'bottom':
      return { top: -8, left: '50%', transform: 'translateX(-50%)', borderBottomColor: color }
    case 'top':
      return { bottom: -8, left: '50%', transform: 'translateX(-50%)', borderTopColor: color }
    case 'right':
      return { left: -8, top: '50%', transform: 'translateY(-50%)', borderRightColor: color }
    case 'left':
      return { right: -8, top: '50%', transform: 'translateY(-50%)', borderLeftColor: color }
  }
}

export function Tooltip({ children, content, position = 'bottom', delay = 0 }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [placement, setPlacement] = useState<TooltipPlacement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const show = useCallback(() => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => setVisible(true), delay)
    } else {
      setVisible(true)
    }
  }, [delay])

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setVisible(false)
  }, [])

  // Two-pass positioning: first render offscreen to measure, then place
  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) {
      setPlacement(null)
      return
    }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    setPlacement(computePlacement(triggerRect, tooltipRect, position))
  }, [visible, position])

  // Hide on any scroll (capture phase to catch scrolls on any element)
  useEffect(() => {
    if (!visible) return
    const handleScroll = () => setVisible(false)
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [visible])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const tooltip = visible
    ? createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            zIndex: 9999,
            // Before placement is calculated, render offscreen to measure
            top: placement ? `${placement.top}px` : '-9999px',
            left: placement ? `${placement.left}px` : '-9999px',
            pointerEvents: 'none',
            visibility: placement ? 'visible' : 'hidden',
          }}
          className="whitespace-nowrap rounded-md border border-foreground/20 bg-[#0d0d14] px-2 py-1 font-mono text-xs text-foreground/60 shadow-lg"
        >
          {content}
          {placement && (
            <div
              className="absolute border-[4px] border-transparent"
              style={arrowStyle(placement.pos)}
            />
          )}
        </div>,
        document.body,
      )
    : null

  return (
    <div
      ref={triggerRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      className="inline-flex"
    >
      {children}
      {tooltip}
    </div>
  )
}
