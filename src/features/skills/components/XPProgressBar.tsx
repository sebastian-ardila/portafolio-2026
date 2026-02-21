import { useXPAnimation } from '../hooks/useXPAnimation'

interface XPProgressBarProps {
  xp: number
  maxXp: number
  level: number
}

export function XPProgressBar({ xp, maxXp, level }: XPProgressBarProps) {
  const { ref, percentage } = useXPAnimation(xp, maxXp)

  return (
    <div ref={ref} className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-xs text-foreground/50">
          {xp.toLocaleString()} / {maxXp.toLocaleString()} XP
        </span>
        <span className="font-mono text-xs font-bold text-cyan">
          LVL {level}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
