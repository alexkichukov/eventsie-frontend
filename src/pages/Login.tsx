import { Formik, Form, Field, FormikErrors } from 'formik'

const Login = () => {
  const initialValues = {
    email: ''
  }

  const validate = (values: typeof initialValues): FormikErrors<typeof initialValues> => {
    return {
      email: 'Error!!'
    }
  }

  return (
    <div className='container flex min-h-[calc(100vh-80px)] items-center justify-center'>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => console.log(values, actions)}
      >
        {({ errors }) => (
          <Form className='flex w-full max-w-xs flex-col'>
            <label htmlFor='email' className='mb-1'>
              Email
            </label>
            <Field id='email' name='email' type='email' placeholder='john.doe@mail.com' />
            {errors.email && <span className='my-2 text-sm text-rose-600'>{errors.email}</span>}
            <button
              type='submit'
              className='mt-4 rounded-sm bg-fuchsia-700 px-4 py-2 font-medium text-white hover:bg-fuchsia-600'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
