import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { FaCheck } from 'react-icons/fa'
import { setUser } from '@/store/auth'
import { toast } from 'react-toastify'
import { useDispatch } from '@/hooks'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: ''
  }

  const schema = Yup.object({
    email: Yup.string().required('Required field').email('Invalid email'),
    password: Yup.string().required('Required field').min(8, 'At least 8 characters')
  })

  // Returns a JSX element for the info label to the right of the main label
  const getInfoLabel = (touched: boolean | undefined, error: string | undefined) => {
    if (touched) {
      if (error) return <span className='text-sm text-rose-600'>{error}</span>
      else return <FaCheck className='text-xs text-green-500' />
    }
  }

  const onSubmit = async ({ email, password }: typeof initialValues) => {
    const id = toast.loading('Logging in...')

    const body = JSON.stringify({
      email: email.trim(),
      password
    })

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()

      // An error occured
      if (!response.ok)
        return toast.update(id, {
          render: data.message,
          type: 'error',
          isLoading: false,
          autoClose: 5000
        })

      // Success - show notification, save jwt token, navigate to home
      toast.update(id, {
        render: 'Success!',
        type: 'success',
        isLoading: false,
        autoClose: 5000
      })
      dispatch(setUser(data))
      navigate('/', { replace: true })
    } catch (e) {
      toast.update(id, {
        render: 'Unexpected error',
        type: 'error',
        isLoading: false,
        autoClose: 5000
      })
    }
  }

  return (
    <div className='container flex min-h-[calc(100vh-80px)] items-center justify-center'>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className='flex w-full max-w-xs flex-col'>
            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='email' className='mr-auto'>
                Email
              </label>
              {getInfoLabel(touched.email, errors.email)}
            </div>
            <Field id='email' name='email' type='text' placeholder='Email' />

            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='password' className='mr-auto'>
                Password
              </label>
              {getInfoLabel(touched.password, errors.password)}
            </div>
            <Field
              id='password'
              name='password'
              type='password'
              placeholder='Must be least 8 characters'
            />

            <button
              type='submit'
              className='mt-7 rounded-sm bg-fuchsia-700 px-4 py-2 font-medium text-white hover:bg-fuchsia-600'
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
