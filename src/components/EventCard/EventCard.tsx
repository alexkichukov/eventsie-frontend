import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { setUser } from '@/store/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import './EventCard.css'

interface Props {
  id: string
  title: string
  priceFrom: number
  priceTo: number
  location: string
  createdBy: {
    name: string
    id: string
  }
}

const EventCard = ({ id, title, priceFrom, priceTo, location, createdBy }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const isFavourite = user && user.favouriteEvents.includes(id)
  const [image] = useState(
    `https://picsum.photos/${400 + Math.floor(Math.random() * 100)}/${
      200 + Math.floor(Math.random() * 100)
    }`
  )

  const setFavourite = async (favourite: boolean) => {
    if (!user) {
      toast.info('You are not logged in')
      return
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
      const body = JSON.stringify({ eventID: id })
      const url = `http://localhost:8080/${favourite ? '' : 'un'}favouriteEvent`
      const response = await fetch(url, { method: 'POST', headers, body })
      const data = await response.json()

      if (!response.ok) {
        toast.error('Unexpected error')
        return
      }

      dispatch(setUser({ favouriteEvents: data.favouriteEvents }))
    } catch {
      toast.error('Unexpected error')
    }
  }

  const priceLabel = () => {
    if (!priceFrom && !priceTo) return 'Free'
    else if (priceFrom && !priceTo) return `Starts from ${priceFrom}$`
    else return `From ${priceFrom}$ to ${priceTo}$`
  }

  return (
    <div
      onClick={() => navigate(`/event/${id}`)}
      className='card pointer w-full max-w-[290px] cursor-pointer rounded-xl border border-neutral-900 bg-neutral-800 transition'
    >
      <div className='relative h-20 overflow-hidden rounded-tl-xl rounded-tr-xl'>
        <div className='absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-800 opacity-[0.15]'></div>
        <img src={image} className='transition' />
      </div>
      <div className='relative p-6'>
        <div
          onClick={(e) => {
            e.stopPropagation()
            setFavourite(!isFavourite)
          }}
          className='absolute right-5 -top-5 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-neutral-900 pt-[2px] text-lg text-neutral-50 transition hover:bg-neutral-700'
        >
          {isFavourite ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
        </div>
        <div className=''>
          <h3 className='text-xl font-medium text-neutral-200'>{title}</h3>
          <h4 className='text-neutral-400'>{priceLabel()}</h4>
          <div className='mt-3 grid grid-cols-[30px_auto] text-fuchsia-300'>
            <FaCalendarAlt className='mt-[2px]' />
            <span>Sat, Jun 18 2022</span>
          </div>
          <div className='mt-3 grid grid-cols-[30px_auto]'>
            <FaMapMarkerAlt className='mt-[2px]' />
            <span>{location}</span>
          </div>
          <div className='mt-3 grid grid-cols-[30px_auto]'>
            <FaUserAlt className='mt-[2px]' />
            <span>
              by{' '}
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/user/${createdBy.id}`)
                }}
                className='font-medium text-neutral-100 hover:text-neutral-300 hover:underline'
              >
                {createdBy.name}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
