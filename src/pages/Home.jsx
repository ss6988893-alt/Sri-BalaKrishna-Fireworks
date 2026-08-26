import HeroSlider from '../components/home/HeroSlider'
import CategoryPreview from '../components/home/CategoryPreview'
import StatsBar from '../components/home/StatsBar'
import EventsPreview from '../components/home/EventsPreview'
import CustomerShowcase from '../components/home/CustomerShowcase'

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <CategoryPreview />
      <StatsBar />
      <EventsPreview />
      <CustomerShowcase />
    </div>
  )
}
