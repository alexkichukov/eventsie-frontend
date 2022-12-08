import Events from '@/components/Events'

const Home = () => {
  return (
    <>
      <div className='container pt-20 pb-10'>
        <h1 className='text-3xl text-neutral-50'>Browse hundreds of events</h1>
        <p className='mt-2 max-w-2xl'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam asperiores harum quod
          doloribus illum sint saepe accusamus corporis ratione aperiam!
        </p>
      </div>

      <div className='container'>
        <Events />
      </div>
    </>
  )
}

export default Home
