import { DonationPrompt } from '@/components/donation-prompt'
import { getSiteTexts } from '@/lib/site-texts'

export async function DonationPromptSlot() {
  const texts = await getSiteTexts([
    'donations.popup_title',
    'donations.popup_description',
    'donations.popup_button',
    'donations.popup_later',
  ])

  return (
    <DonationPrompt
      texts={{
        title: texts['donations.popup_title'],
        description: texts['donations.popup_description'],
        button: texts['donations.popup_button'],
        later: texts['donations.popup_later'],
      }}
    />
  )
}
