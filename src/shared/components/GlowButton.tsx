import { cn } from '@/shared/utils/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  as?: 'button' | 'a'
  href?: string
}

export function GlowButton({
  children,
  variant = 'primary',
  className,
  as = 'button',
  href,
  ...props
}: GlowButtonProps) {
  const classes = cn(
    'group relative inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium transition-all duration-300',
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyan to-purple text-background shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:shadow-[0_0_35px_rgba(0,245,255,0.3)] hover:brightness-110'
      : 'border border-cyan/30 bg-cyan/[0.03] text-cyan backdrop-blur-sm hover:border-cyan/60 hover:bg-cyan/[0.08] hover:shadow-[0_0_25px_rgba(0,245,255,0.12)]',
    className
  )

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  )

  if (as === 'a') {
    const isHash = href?.startsWith('#')
    return (
      <a
        href={href}
        className={classes}
        {...(!isHash && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {inner}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {inner}
    </button>
  )
}
