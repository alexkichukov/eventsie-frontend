import { useSelector } from '@/hooks'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  favouriteEvents: string[]
  attendingEvents: string[]
}

const User = () => {
  const { id } = useParams<{ id: string }>()

  const [user, setUser] = useState<UserData | null>(null)

  // Whether the authenticated user is viewing their own page
  const isOwner = useSelector((state) => state.auth.user?.id === id)

  // Fetch data
  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${id}`)
        const data: UserData = await response.json()

        if (response.ok) setUser(data)
      } catch {}
    }

    fetchData()
  }, [])

  if (!user)
    return (
      <div className='container'>
        <h2>Loading...</h2>
      </div>
    )

  const favouriteEvents = (
    <div className='mt-6 mb-10 rounded-md bg-neutral-800 p-3'>
      <h3 className='text-xl text-neutral-200'>Favourite Events:</h3>
      {user.favouriteEvents.length > 0 ? (
        user.favouriteEvents.map(() => 'test')
      ) : (
        <div className='flex h-24 items-center justify-center text-neutral-400'>
          <div>
            There seems to be nothing. Favourite some{' '}
            <Link to='/' className='text-neutral-300 underline'>
              events
            </Link>{' '}
            and they will show up here!
          </div>
        </div>
      )}
    </div>
  )

  const attendingEvents = (
    <div className='mt-6 rounded-md bg-neutral-800 p-3'>
      <h3 className='text-xl text-neutral-200'>{isOwner ? 'Events you are attending:' : ''}</h3>
      {user.favouriteEvents.length > 0 ? (
        user.favouriteEvents.map(() => 'test')
      ) : (
        <div className='flex h-24 items-center justify-center text-neutral-400'>
          <div>
            There seems to be nothing. Browse{' '}
            <Link to='/' className='text-neutral-300 underline'>
              events
            </Link>{' '}
            and choose some to attend.
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className='container pt-20'>
      <h1 className='text-4xl text-neutral-50'>{user.firstName + ' ' + user.lastName}</h1>
      <p className='my-2 text-neutral-400'>{user.email}</p>

      {isOwner && user.favouriteEvents && favouriteEvents}
      {attendingEvents}
    </div>
  )
}

export default User
