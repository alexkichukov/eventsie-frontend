import { Formik, Form, Field, FormikErrors } from 'formik'

const SignUp = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  const validate = (values: typeof initialValues): FormikErrors<typeof initialValues> => {
    return {
      firstName: 'Invalid first name',
      lastName: 'Invalid last name',
      email: 'Invalid email',
      password: 'Invalid password'
    }
  }

  // Returns a JSX element for the info label to the right of the main label
  const getInfoLabel = (touched: boolean | undefined, error: string | undefined) => {
    if (touched) {
      if (error) return <span className='text-sm text-rose-600'>{error}</span>
      else return <span>checkmark</span>
    }
  }

  return (
    <div className='container flex min-h-[calc(100vh-80px)] items-center justify-center'>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => console.log(values, actions)}
      >
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
              {touched.lastName && errors.lastName && (
                <span className='text-sm text-rose-600'>{errors.lastName}</span>
              )}
            </div>
            <Field id='lastName' name='lastName' type='text' placeholder='Doe' />

            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='email' className='mr-auto'>
                Email
              </label>
              {touched.email && errors.email && (
                <span className='text-sm text-rose-600'>{errors.email}</span>
              )}
            </div>
            <Field id='email' name='email' type='email' placeholder='john.doe@mail.com' />

            <div className='mt-4 mb-1 flex items-center'>
              <label htmlFor='password' className='mr-auto'>
                Password
              </label>
              {touched.password && errors.password && (
                <span className='text-sm text-rose-600'>{errors.password}</span>
              )}
            </div>
            <Field
              id='password'
              name='password'
              type='password'
              placeholder='Must be least 8 characters'
            />

            <button
              type='submit'
              className='mt-6 rounded-sm bg-fuchsia-700 px-4 py-2 font-medium text-white hover:bg-fuchsia-600'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
