import { NavLink } from 'react-router-dom'

const Navigation = () => (
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
        <NavLink
          to='/login'
          className={({ isActive }) =>
            `mr-8 font-medium text-neutral-100 hover:text-neutral-300 ${
              isActive ? 'underline' : ''
            }`
          }
        >
          Login
        </NavLink>
        <NavLink
          to='/signup'
          className={({ isActive }) =>
            `mr-8 rounded-sm bg-white px-4 py-2 font-medium text-fuchsia-700 hover:bg-neutral-100 ${
              isActive ? 'underline' : ''
            }`
          }
        >
          Sign Up
        </NavLink>
      </div>
    </nav>

    {/* Space that goes under the navigation */}
    <div className='h-20'></div>
  </>
)

export default Navigation
