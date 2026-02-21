import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollProgress } from './ScrollProgress'
import { BookingModal } from './BookingModal'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { closeBooking } from '@/shared/slices/bookingSlice'

export function Layout() {
  const dispatch = useAppDispatch()
  const bookingOpen = useAppSelector((s) => s.booking.isOpen)
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('es') ? 'es' : 'en'
  }, [i18n.language])

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => dispatch(closeBooking())} />
    </div>
  )
}
