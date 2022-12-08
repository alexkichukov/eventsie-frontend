import { getEvents } from '@/requests/events'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import EventCard from '@/components/EventCard'
import { useSelector } from '@/hooks'

const Events = () => {
  const categories = useSelector((state) => state.events.categories)
  const [events, setEvents] = useState<Event[]>([])
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    setSelectedCategories(categories.reduce((prev, curr) => ({ ...prev, [curr.id]: false }), {}))
  }, [categories])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const categories = Object.entries(selectedCategories)
          .filter(([_, show]) => show)
          .map(([id]) => id)
        const events = await getEvents({ categories })
        setEvents(events)
      } catch {
        toast.error('Could not retrieve events')
      }
    }
    fetchEvents()
  }, [selectedCategories])

  return (
    <>
      <div className='flex justify-around py-5'>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`cursor-pointer transition hover:underline ${
              selectedCategories[category.id]
                ? 'text-fuchsia-500 underline'
                : 'hover:text-fuchsia-500'
            }`}
            onClick={() =>
              setSelectedCategories((prev) => ({
                ...prev,
                [category.id]: !prev[category.id]
              }))
            }
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className='mt-4 mb-16 grid grid-cols-[repeat(4,300px)] justify-between gap-y-6'>
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            priceFrom={event.price.from}
            priceTo={event.price.to}
            location={`${event.location.address}, ${event.location.city}, ${event.location.postcode}`}
            createdBy={{ name: event.createdBy.firstName, id: event.createdBy.id }}
          />
        ))}
      </div>
    </>
  )
}

export default Events
