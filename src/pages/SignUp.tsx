import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { FaCheck } from 'react-icons/fa'
import { setUser } from '@/store/auth'
import { toast } from 'react-toastify'
import { useDispatch } from '@/hooks'
import * as Yup from 'yup'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const schema = Yup.object({
    firstName: Yup.string().required('Required field').min(2, 'At least 2 characters'),
    lastName: Yup.string().required('Required field').min(2, 'At least 2 characters'),
    email: Yup.string().required('Required field').email('Invalid email'),
    password: Yup.string().required('Required field').min(8, 'At least 8 characters'),
    confirmPassword: Yup.string()
      .required('Required field')
      .oneOf([Yup.ref('password')], 'Must match password')
  })

  // Returns a JSX element for the info label to the right of the main label
  const getInfoLabel = (touched: boolean | undefined, error: string | undefined) => {
    if (touched) {
      if (error) return <span className='text-sm text-rose-600'>{error}</span>
      else return <FaCheck className='text-xs text-green-500' />
    }
  }

  // Register user on submit
  const onSubmit = async ({ firstName, lastName, email, password }: typeof initialValues) => {
    const id = toast.loading('Registering...')

    const body = JSON.stringify({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password
    })

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()

      // An error occured
      if (!response.ok) {
        return toast.update(id, {
          render: data.message,
          type: 'error',
          isLoading: false,
          autoClose: 5000
        })
      }

      // Success - show notification, save jwt token, navigate to home
      toast.update(id, { render: 'Success!', type: 'success', isLoading: false, autoClose: 5000 })
      dispatch(setUser(data))
      navigate('/', { replace: true })
    } catch {
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
            <div className='mb-1 flex items-center'>
              <label htmlFor='firstName' className='mr-auto'>
                First Name
              </label>
              {getInfoLabel(touched.firstName, errors.firstName)}
            </div>
            <Field id='firstName' name='firstName' type='text' placeholder='John' />

            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='lastName' className='mr-auto'>
                Last Name
              </label>
              {getInfoLabel(touched.lastName, errors.lastName)}
            </div>
            <Field id='lastName' name='lastName' type='text' placeholder='Doe' />

            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='email' className='mr-auto'>
                Email
              </label>
              {getInfoLabel(touched.email, errors.email)}
            </div>
            <Field id='email' name='email' type='email' placeholder='john.doe@mail.com' />

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

            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='confirmPassword' className='mr-auto'>
                Confirm Password
              </label>
              {getInfoLabel(touched.confirmPassword, errors.confirmPassword)}
            </div>
            <Field
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Must be least 8 characters'
            />

            <button
              type='submit'
              className='mt-7 rounded-sm bg-fuchsia-700 px-4 py-2 font-medium text-white hover:bg-fuchsia-600'
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
