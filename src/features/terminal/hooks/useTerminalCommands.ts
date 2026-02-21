import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/hooks'
import { addLine, clearHistory, minimizeTerminal, setPickerMode } from '../slices/terminalSlice'
import { openBooking } from '@/shared/slices/bookingSlice'
import { profile } from '@/config/profile'

export function useTerminalCommands() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('terminal')

  const execute = useCallback(
    (cmd: string) => {
      const command = cmd.trim().toLowerCase()

      const commands: Record<string, () => string> = {
        help: () =>
          [
            t('help.title'),
            '',
            t('help.about'),
            t('help.skills'),
            t('help.experience'),
            t('help.contact'),
            t('help.resume'),
            t('help.book'),
            t('help.clear'),
            t('help.exit'),
            '',
            t('help.sudo'),
          ].join('\n'),

        about: () =>
          [
            `${profile.name}`,
            `${profile.role} @ RunMyProcess`,
            '',
            t('about.yearsExp', { count: profile.stats.yearsExperience }),
            t('about.line2'),
            t('about.techMastered', { count: profile.stats.technologiesMastered }),
            '',
            t('about.education'),
            t('about.location', { location: profile.location }),
          ].join('\n'),

        skills: () =>
          [
            '  React         ████████████████████  7 yrs',
            '  TypeScript    ██████████████         5 yrs',
            '  JavaScript    ██████████████████████ 9 yrs',
            '  Node.js       ████████████████       6 yrs',
            '  Redux         ██████████████         5 yrs',
            '  WebSockets    ████████████           4 yrs',
            '  GraphQL       ██████                 2 yrs',
            '  MongoDB       ████████████           4 yrs',
          ].join('\n'),

        experience: () =>
          [
            '  2024-now   Director of UX      RunMyProcess',
            '  2024       Sr. Software Eng.   RunMyProcess',
            '  2020-2023  Software Eng. II    VeriTran',
            '  2019       Impl. Consultant    VeriTran',
            '  2018-2019  Full Stack Dev      ExcelAscent',
            '  2018       Backend Dev         TD7',
            '  2017-2018  Software Dev        Onyx Soft',
          ].join('\n'),

        contact: () =>
          [
            `GitHub:   ${profile.social.github}`,
            `LinkedIn: ${profile.social.linkedin}`,
          ].join('\n'),

        resume: () => {
          dispatch(setPickerMode('resume'))
          return t('resume.prompt')
        },

        book: () => {
          setTimeout(() => {
            dispatch(openBooking())
          }, 500)
          return t('book.opening')
        },

        'sudo hire-sebastian': () => {
          setTimeout(() => {
            dispatch(openBooking())
          }, 2500)
          return [
            `\uD83C\uDF89 ${t('sudo.achievement')}`,
            '',
            t('sudo.sending'),
            t('sudo.progress'),
            '',
            `\u2705 ${t('sudo.received')}`,
            t('sudo.openingCalendar'),
          ].join('\n')
        },

        clear: () => {
          dispatch(clearHistory())
          return ''
        },

        exit: () => {
          dispatch(minimizeTerminal())
          return ''
        },
      }

      const handler = commands[command]
      if (handler) {
        const output = handler()
        if (output) {
          dispatch(addLine({ type: 'output', text: output }))
        }
      } else {
        dispatch(
          addLine({
            type: 'output',
            text: t('notFound', { cmd }),
          })
        )
      }
    },
    [dispatch, t]
  )

  return execute
}
