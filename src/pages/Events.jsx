import EventsPreview from '../components/home/EventsPreview'
import EventSetupGallery from '../components/events/EventSetupGallery'
import EventVideoGallery from '../components/events/EventVideoGallery'
import DisplayPackages from '../components/events/DisplayPackages'

export default function Events() {
  return (
    <>
      <EventsPreview isEventPage />
      <EventSetupGallery />
      <EventVideoGallery />
      <DisplayPackages />
    </>
  )
}
