import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '@/hooks'
import { setUser } from '@/store/auth'
import { toast } from 'react-toastify'

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const logout = () => {
    navigate('/')
    dispatch(setUser(null))
    toast(`You've been logged out`)
  }

  // Links to display when authenticated
  const authLinks = () => (
    <>
      <NavLink
        to={`/newevent`}
        className={({ isActive }) =>
          `mr-8 flex items-center rounded-sm bg-white px-4 py-2 font-medium text-fuchsia-700 hover:bg-neutral-100 ${
            isActive ? 'underline' : ''
          }`
        }
      >
        Add Event
      </NavLink>
      <NavLink
        to={`/user/${user!.id}`}
        className={({ isActive }) =>
          `mr-8 font-medium text-neutral-100 hover:text-neutral-300 ${isActive ? 'underline' : ''}`
        }
      >
        Account
      </NavLink>
      <button
        onClick={logout}
        className='bg-transparent font-medium text-neutral-100 hover:text-neutral-300'
      >
        Logout
      </button>
    </>
  )

  // Links to display when not authenticated
  const notAuthLinks = () => (
    <>
      <NavLink
        to='/login'
        className={({ isActive }) =>
          `mr-8 font-medium text-neutral-100 hover:text-neutral-300 ${isActive ? 'underline' : ''}`
        }
      >
        Login
      </NavLink>
      <NavLink
        to='/signup'
        className={({ isActive }) =>
          `rounded-sm bg-white px-4 py-2 font-medium text-fuchsia-700 hover:bg-neutral-100 ${
            isActive ? 'underline' : ''
          }`
        }
      >
        Sign Up
      </NavLink>
    </>
  )

  return (
    <>
      <nav className='fixed w-full bg-fuchsia-700 shadow-sm'>
        <div className='container flex h-20 items-center'>
          <NavLink to='/' className='mr-auto text-xl font-medium text-white'>
            Eventsie
          </NavLink>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `mr-8 font-medium text-neutral-100 hover:text-neutral-300 ${
                isActive ? 'underline' : ''
              }`
            }
          >
            Home
          </NavLink>
          {user ? authLinks() : notAuthLinks()}
        </div>
      </nav>

      {/* Space that goes under the navigation */}
      <div className='h-20'></div>
    </>
  )
}

export default Navigation
