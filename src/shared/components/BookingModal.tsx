import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  const { t } = useTranslation('common')

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-[90vh] w-[90vw] flex-col overflow-hidden rounded-2xl border border-card-border bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
              <h3 className="text-lg font-semibold">{t('booking.title')}</h3>
              <button
                onClick={onClose}
                className="text-foreground/40 transition-colors hover:text-foreground"
              >
                <HiX size={24} />
              </button>
            </div>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0UrInAKw9HTMf1DVGy1jTv12TmZuKuSuMYHB5DNm_0gWQ1MZCUZaqJMkqNJzp8zaB0ehjT14Y5?gv=true"
              className="h-full w-full flex-1 border-0"
              style={{ colorScheme: 'light', background: 'white' }}
              title={t('booking.title')}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
