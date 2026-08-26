import SafetyHero from '../components/safety/SafetyHero'
import DosAndDonts from '../components/safety/DosAndDonts'
import ProductSafetyVisuals from '../components/safety/ProductSafetyVisuals'
import SafeSteps from '../components/safety/SafeSteps'
import CommunityCare from '../components/safety/CommunityCare'
import EmergencyAndChildren from '../components/safety/EmergencyAndChildren'
import SafetyCTA from '../components/safety/SafetyCTA'

export default function SafetyTips() {
  return (
    <div id="safety">
      <SafetyHero />
      <DosAndDonts />
      <ProductSafetyVisuals />
      <SafeSteps />
      <CommunityCare />
      <EmergencyAndChildren />
      <SafetyCTA />
    </div>
  )
}
