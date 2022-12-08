import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaTrash, FaPen } from 'react-icons/fa'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { favouriteEvent, getEvent } from '@/requests'
import { useDispatch, useSelector } from '@/hooks'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { setUser } from '@/store/auth'
import { attendEvent } from '@/requests/auth'
import { deleteEvent } from '@/requests/events'

const Event = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  if (!id) return <Navigate to='/' />

  const [image] = useState(
    `https://picsum.photos/${1900 + Math.floor(Math.random() * 300)}/${
      300 + Math.floor(Math.random() * 100)
    }`
  )
  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const isFavourite = user !== null && user.favouriteEvents.includes(id)
  const isAttending = user !== null && user.attendingEvents.includes(id)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEvent(id)
        setEvent(event)
      } catch (e) {
        toast.error((e as Error).message)
        setError(true)
      }
    }
    fetchEvent()
  }, [id])

  const onClickFavourite = async () => {
    if (!user) {
      toast.info('You need to be logged in')
      return
    }

    try {
      const newFavourites = await favouriteEvent(user, !isFavourite, id)
      dispatch(setUser({ favouriteEvents: newFavourites }))
    } catch {
      toast.error('Unexpected error')
    }
  }

  const onClickAttend = async () => {
    if (!user) {
      toast.info('You need to be logged in')
      return
    }

    try {
      const newAttending = await attendEvent(user, !isAttending, id)
      dispatch(setUser({ attendingEvents: newAttending }))
    } catch {
      toast.error('Unexpected error')
    }
  }

  const onClickDelete = async () => {
    if (!user) {
      toast.info('You need to be logged in')
      return
    }

    try {
      await deleteEvent(id, user)
      navigate('/', { replace: true })
      toast.success('Event deleted')
    } catch {
      toast.error('Could not delete event')
    }
  }

  if (error) return <div className='container py-20 text-center text-red-500'>Unexpected error</div>
  if (!event) return <div className='container py-20 text-center text-neutral-500'>Loading...</div>

  const priceLabel = () => {
    if (!event.price.from && !event.price.to) return <>Free</>
    else if (event.price.from && !event.price.to)
      return (
        <>
          Starts from <span className='font-medium text-neutral-100'>{event.price.from}$</span>
        </>
      )
    else
      return (
        <>
          From <span className='font-medium text-neutral-100'>{event.price.from}$</span> to{' '}
          <span className='font-medium text-neutral-100'>{event.price.to}$</span>
        </>
      )
  }

  return (
    <>
      <div className='relative h-[200px]'>
        <div className='absolute top-0 left-0 h-full w-full bg-violet-800 opacity-30'></div>
        <img className='h-full w-full object-cover' src={image} />
      </div>
      <div className='container grid grid-cols-[1fr_250px] items-start gap-16 py-14'>
        {/* Left side */}
        <div>
          <h1 className='text-3xl text-white'>{event.title}</h1>
          <p className='mt-4 text-neutral-500'>Price</p>
          <h4 className='text-lg'>{priceLabel()}</h4>
          <p className='mt-4 text-neutral-500'>Date</p>
          <h4 className='text-lg'>{event.date}</h4>
          <p className='mt-4 text-neutral-500'>Location</p>
          <h4 className='text-lg'>
            {event.location.address}, {event.location.city}, {event.location.postcode}
          </h4>
          <p className='mt-4 text-neutral-500'>Description</p>
          <h4 className='text-lg'>{event.description}</h4>
          <p className='mt-4 text-neutral-500'>Tags</p>
          <h4 className='text-lg'>{event.tags.join(', ')}</h4>
          <p className='mt-4 text-neutral-500'>Created By</p>
          <Link
            to={`/user/${event.createdBy.id}`}
            className='text-lg text-neutral-100 hover:underline'
          >
            {event.createdBy.firstName} {event.createdBy.lastName}
          </Link>
        </div>

        {/* Right side */}
        <div className='grid gap-4'>
          <button
            onClick={() => onClickAttend()}
            className='flex w-full items-center justify-center bg-fuchsia-700 font-medium transition hover:bg-fuchsia-600'
          >
            {isAttending ? (
              <>
                Unattend
                <FaBookmark className='ml-2' />
              </>
            ) : (
              <>
                Attend
                <FaRegBookmark className='ml-2' />
              </>
            )}
          </button>
          <button
            onClick={() => onClickFavourite()}
            className='flex w-full items-center justify-center transition hover:bg-neutral-700'
          >
            {isFavourite ? (
              <>
                Unfavourite
                <FaHeart className='ml-2 text-red-500' />
              </>
            ) : (
              <>
                Favourite
                <FaRegHeart className='ml-2' />
              </>
            )}
          </button>
          {user && (user.id === event.createdBy.id || user.role === 'admin') && (
            <>
              <button
                onClick={() => navigate(`/edit-event/${event.id}`)}
                className='flex w-full items-center justify-center transition hover:bg-neutral-700'
              >
                Edit
                <FaPen className='ml-2' />
              </button>
              <button
                onClick={() => onClickDelete()}
                className='flex w-full items-center justify-center bg-red-800 transition hover:bg-red-700'
              >
                Delete
                <FaTrash className='ml-2' />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Event
