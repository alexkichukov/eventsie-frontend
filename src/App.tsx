import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { setCategories } from '@/store/events'
import { useDispatch } from '@/hooks'
import { useEffect } from 'react'
import Home from '@/pages/Home'
import User from '@/pages/User'
import Event from '@/pages/Event'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import NewEvent from '@/pages/NewEvent'
import Navigation from '@/components/Navigation'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const dispatch = useDispatch()

  // Get categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories')
        const data = await response.json()

        if (!response.ok) {
          toast.error('An unexpected error occured')
          return
        }

        dispatch(setCategories(data))
      } catch {
        toast.error('An unexpected error occured')
      }
    }
    getCategories()
  }, [])

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/event/:id' element={<Event />} />
        <Route path='/newevent' element={<NewEvent />} />
      </Routes>

      {/* Global level toast */}
      <ToastContainer
        position='bottom-right'
        theme='dark'
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </BrowserRouter>
  )
}

export default App
