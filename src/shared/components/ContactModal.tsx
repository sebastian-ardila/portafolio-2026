import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChat } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { openTerminal, closeTerminal } from '@/features/terminal/slices/terminalSlice'
import { ContactForm } from './ContactForm'

export function ContactModal() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((s) => s.terminal.isOpen)

  return (
    <>
      {/* Floating action button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => dispatch(openTerminal())}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-background shadow-[0_0_25px_rgba(0,245,255,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(0,245,255,0.4)]"
            aria-label="Open contact form"
          >
            <HiChat size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => dispatch(closeTerminal())}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => dispatch(closeTerminal())}
                className="absolute -top-3 -right-3 z-10 rounded-full border border-card-border bg-background p-1.5 text-foreground/40 transition-colors hover:text-foreground"
              >
                <HiX size={16} />
              </button>
              <ContactForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
