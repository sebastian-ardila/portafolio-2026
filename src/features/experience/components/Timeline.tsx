import { TimelineItem } from './TimelineItem'
import { experience } from '@/config/experience'

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 hidden h-full w-0.5 bg-gradient-to-b from-cyan/50 via-purple/50 to-transparent md:left-1/2 md:block md:-translate-x-1/2" />

      <div className="flex flex-col gap-8 md:gap-12">
        {experience.map((item, i) => (
          <TimelineItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
