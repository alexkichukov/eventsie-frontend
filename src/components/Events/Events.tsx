import { getEvents } from '@/requests/events'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import EventCard from '@/components/EventCard'

const Events = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents()
        setEvents(events)
      } catch {
        toast.error('Could not retrieve events')
      }
    }
    fetchEvents()
  }, [])

  return (
    <div className='grid grid-cols-[repeat(4,300px)] justify-between gap-y-6'>
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          priceFrom={event.price.from}
          priceTo={event.price.to}
          location={`${event.location.address}, ${event.location.city}, ${event.location.postcode}`}
          host={{ name: `${event.createdBy.firstName}`, id: event.createdBy.id }}
        />
      ))}
    </div>
  )
}

export default Events
