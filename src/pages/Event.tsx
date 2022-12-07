import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getEvent } from '@/requests'
import { useSelector } from '@/hooks'

const Event = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  if (!id) return <Navigate to='/' />

  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState(false)
  const isFavourite = useSelector(
    (state) => state.auth.user && state.auth.user.favouriteEvents.includes(id)
  )

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

  const favourite = async () => {}

  if (error) return <div className='container py-20 text-center text-red-500'>Unexpected error</div>
  if (!event) return <div className='container py-20 text-center text-neutral-500'>Loading...</div>

  return (
    <div className='container grid grid-cols-[1fr_250px] py-20'>
      <div>
        <h1 className='text-3xl text-white'>{event.title}</h1>
      </div>
      <div className='grid gap-4'>
        <button className='flex w-full items-center justify-center bg-fuchsia-700 font-medium transition hover:bg-fuchsia-600'>
          Attend
        </button>
        <button className='flex w-full items-center justify-center'>
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
      </div>
    </div>
  )
}

export default Event
