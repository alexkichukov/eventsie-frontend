import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUser } from '@/requests/auth'
import { toast } from 'react-toastify'
import { useSelector } from '@/hooks'
import EventCard from '@/components/EventCard'
import { getEvents } from '@/requests/events'

const User = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) return <Navigate to='/' />

  const authUser = useSelector((state) => state.auth.user)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState(false)
  const [createdEvents, setCreatedEvents] = useState<Event[]>([])
  const [favouriteEvents, setFavouriteEvents] = useState<Event[]>([])
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([])

  // Whether the authenticated user is viewing their own page
  const isOwner = useSelector((state) => state.auth.user?.id === id)

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authUser?.id === id) {
          setUser(authUser)
        } else {
          const user = await getUser(id)
          setUser(user)
        }
      } catch {
        toast.error('Could not retrieve user data')
        setError(true)
      }
    }
    fetchData()
  }, [id, authUser])

  // Fetch events
  useEffect(() => {
    if (!user) return
    const fetchEvents = async () => {
      try {
        if (user.favouriteEvents.length > 0) {
          const favourite = await getEvents({ id: user.favouriteEvents })
          setFavouriteEvents(favourite)
        } else {
          setFavouriteEvents([])
        }

        if (user.attendingEvents.length > 0) {
          const attending = await getEvents({ id: user.attendingEvents })
          setAttendingEvents(attending)
        } else {
          setAttendingEvents([])
        }

        const created = await getEvents({ createdBy: [user.id] })
        setCreatedEvents(created)
      } catch {
        toast.error('Could not retrieve user data')
        setError(true)
      }
    }
    fetchEvents()
  }, [user])

  if (error) return <div className='container py-20 text-center text-red-500'>Unexpected error</div>
  if (!user) return <div className='container py-20 text-center text-neutral-500'>Loading...</div>

  const renderCreatedEvents = () => (
    <>
      <h3 className='mt-8 mb-5 text-xl text-neutral-200'>
        {isOwner ? 'Events you created:' : 'Events this user has created:'}
      </h3>
      {createdEvents.length > 0 ? (
        <div className='grid grid-cols-[repeat(4,300px)] justify-between rounded-md'>
          {createdEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              location={`${event.location.address}, ${event.location.city}, ${event.location.postcode}`}
              priceFrom={event.price.from}
              priceTo={event.price.to}
              createdBy={{ name: event.createdBy.firstName, id: event.createdBy.id }}
            />
          ))}
        </div>
      ) : (
        <div className='text-neutral-400'>
          There seems to be nothing.{' '}
          {isOwner && (
            <>
              Create a{' '}
              <Link to='/newevent' className='text-neutral-300 underline'>
                new event
              </Link>
              !
            </>
          )}
        </div>
      )}
    </>
  )

  const renderFavouriteEvents = () => (
    <>
      <h3 className='mt-8 mb-5 text-xl text-neutral-200'>Your favourite events:</h3>
      {favouriteEvents.length > 0 ? (
        <div className='grid grid-cols-[repeat(4,300px)] justify-between rounded-md'>
          {favouriteEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              location={`${event.location.address}, ${event.location.city}, ${event.location.postcode}`}
              priceFrom={event.price.from}
              priceTo={event.price.to}
              createdBy={{ name: event.createdBy.firstName, id: event.createdBy.id }}
            />
          ))}
        </div>
      ) : (
        <div className='text-neutral-400'>
          There seems to be nothing. Favourite some{' '}
          <Link to='/' className='text-neutral-300 underline'>
            events
          </Link>{' '}
          and they will show up here!
        </div>
      )}
    </>
  )

  const renderAttendingEvents = () => (
    <>
      <h3 className='mt-8 mb-5 text-xl text-neutral-200'>
        {isOwner ? 'Events you are attending:' : 'Events this user is attending:'}
      </h3>
      {attendingEvents.length > 0 ? (
        <div className='grid grid-cols-[repeat(4,300px)] justify-between rounded-md'>
          {attendingEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              location={`${event.location.address}, ${event.location.city}, ${event.location.postcode}`}
              priceFrom={event.price.from}
              priceTo={event.price.to}
              createdBy={{ name: event.createdBy.firstName, id: event.createdBy.id }}
            />
          ))}
        </div>
      ) : (
        <div className='text-neutral-400'>
          There seems to be nothing.{' '}
          {isOwner && (
            <>
              Browse some{' '}
              <Link to='/' className='text-neutral-300 underline'>
                events
              </Link>{' '}
              and click the attend button!
            </>
          )}
        </div>
      )}
    </>
  )

  return (
    <div className='container py-20'>
      <h1 className='text-4xl text-neutral-50'>{user.firstName + ' ' + user.lastName}</h1>
      <p className='my-4 text-lg text-neutral-400'>{user.email}</p>

      {renderCreatedEvents()}
      {renderAttendingEvents()}
      {isOwner && renderFavouriteEvents()}
    </div>
  )
}

export default User
