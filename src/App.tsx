import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from '@/store'
import Home from '@/pages/Home'
import User from '@/pages/User'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import NewEvent from '@/pages/NewEvent'
import Navigation from '@/components/Navigation'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user/:id' element={<User />} />
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
    </Provider>
  )
}

export default App
