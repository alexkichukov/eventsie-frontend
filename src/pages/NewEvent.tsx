import { Formik, Form, Field } from 'formik'
import { FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const NewEvent = () => {
  const initialValues = {
    title: '',
    date: '',
    category: '',
    tags: '',
    priceFrom: '',
    priceTo: '',
    address: '',
    city: '',
    postcode: '',
    description: ''
  }

  const schema = Yup.object({
    title: Yup.string().required('Required field'),
    date: Yup.string()
      .required('Required field')
      .matches(/^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/, 'Must be a valid date'),
    category: Yup.string().required('Required field'),
    tags: Yup.string()
      .required('Required field')
      .matches(/(\[a-zA-Z]{2,}(,?))+/g),
    priceFrom: Yup.number()
      .required('Required field')
      .positive('Must be a positive number')
      .typeError('Must be a positive number'),
    priceTo: Yup.number()
      .positive('Must be a positive number')
      .typeError('Must be a positive number')
      .moreThan(Yup.ref('priceFrom'), 'Cannot be less than lower price')
  })

  // Returns a JSX element for the info label to the right of the main label
  const getInfoLabel = (touched: boolean | undefined, error: string | undefined) => {
    if (touched) {
      if (error) return <span className='text-sm text-rose-600'>{error}</span>
      else return <FaCheck className='text-xs text-green-500' />
    }
  }

  // Register user on submit
  const onSubmit = async ({
    title,
    date,
    description,
    tags,
    category,
    address,
    city,
    postcode,
    priceFrom,
    priceTo
  }: typeof initialValues) => {
    const id = toast.loading('Registering...')

    const body = JSON.stringify({
      title: title.trim(),
      date: date.trim(),
      description: description.trim(),
      tags
    })

    try {
      const response = await fetch('http://localhost:8080/newevent', {
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
          <Form className='grid grid-cols-[360px_360px] gap-10'>
            {/* Left column */}
            <div className='flex flex-col'>
              <div className='mb-1 flex items-center'>
                <label htmlFor='title' className='mr-auto'>
                  Title
                </label>
                {getInfoLabel(touched.title, errors.title)}
              </div>
              <Field id='title' name='title' type='text' placeholder='Title' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='date' className='mr-auto'>
                  Date
                </label>
                {getInfoLabel(touched.date, errors.date)}
              </div>
              <Field id='date' name='date' type='text' placeholder='30.05.2022 format' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='category' className='mr-auto'>
                  Category
                </label>
                {getInfoLabel(touched.category, errors.category)}
              </div>
              <Field id='category' name='category' placeholder='Select category' as='select'>
                <option value='red'>Red</option>
                <option value='green'>Green</option>
                <option value='blue'>Blue</option>
              </Field>

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='tags' className='mr-auto'>
                  Tags
                </label>
                {getInfoLabel(touched.tags, errors.tags)}
              </div>
              <Field id='tags' name='tags' type='text' placeholder='Comma separated tags' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='priceFrom' className='mr-auto'>
                  Price From
                </label>
                {getInfoLabel(touched.priceFrom, errors.priceFrom)}
              </div>
              <Field id='priceFrom' name='priceFrom' type='text' placeholder='Price lower range' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='priceTo' className='mr-auto'>
                  Price To
                </label>
                {getInfoLabel(touched.priceTo, errors.priceTo)}
              </div>
              <Field
                id='priceTo'
                name='priceTo'
                type='text'
                placeholder='Optional price upper range'
              />
            </div>

            {/* Right column */}
            <div className='flex flex-col'>
              <div className='mb-1 flex items-center'>
                <label htmlFor='address' className='mr-auto'>
                  Address
                </label>
                {getInfoLabel(touched.address, errors.address)}
              </div>
              <Field id='address' name='address' type='text' placeholder='Address of the event' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='city' className='mr-auto'>
                  City
                </label>
                {getInfoLabel(touched.city, errors.city)}
              </div>
              <Field id='city' name='city' type='text' placeholder='City' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='postcode' className='mr-auto'>
                  Postcode
                </label>
                {getInfoLabel(touched.postcode, errors.postcode)}
              </div>
              <Field id='postcode' name='postcode' type='text' placeholder='Postcode' />

              <div className='mt-4 mb-1 flex items-center'>
                <label htmlFor='description' className='mr-auto'>
                  Description
                </label>
                {getInfoLabel(touched.description, errors.description)}
              </div>
              <Field
                id='description'
                name='description'
                as='textarea'
                placeholder='Event description'
                className='h-full'
              />
            </div>

            {/* Submit button */}
            <button
              type='submit'
              className='col-span-2 rounded-sm bg-fuchsia-700 px-4 py-2 font-medium text-white hover:bg-fuchsia-600  '
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewEvent
