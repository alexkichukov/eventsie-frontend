import { FaBookmark, FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './EventCard.css'

interface Props {
  img: string
  title: string
  priceFrom: string
  location: string
  host: {
    name: string
    url: string
  }
}

const EventCard = ({ img, title, priceFrom, location, host }: Props) => (
  <div className='card pointer w-full max-w-[290px] cursor-pointer rounded-xl border border-neutral-900 bg-neutral-800 transition'>
    <div className='relative h-20 overflow-hidden rounded-tl-xl rounded-tr-xl'>
      <div className='absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-800 opacity-[0.15]'></div>
      <img src={img} className='transition' />
    </div>
    <div className='relative p-6'>
      <div className='absolute right-5 -top-5 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-neutral-900 transition hover:bg-neutral-700'>
        <FaBookmark />
      </div>
      <div className=''>
        <h3 className='text-xl font-medium text-neutral-200'>{title}</h3>
        <h4 className='text-neutral-400'>Starts at ${priceFrom}</h4>
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
            <Link
              to={host.url}
              className='font-medium text-neutral-100 hover:text-neutral-300 hover:underline'
            >
              {host.name}
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default EventCard
