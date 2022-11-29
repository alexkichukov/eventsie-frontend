import EventCard from '@/components/EventCard'

const Home = () => {
  return (
    <>
      <div className='mx-auto max-w-7xl py-10'>
        <h1 className='text-3xl'>Browse hundreds of events</h1>
        <p className='mt-2 max-w-2xl'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam asperiores harum quod
          doloribus illum sint saepe accusamus corporis ratione aperiam!
        </p>
      </div>

      <div className='container'>
        <h2 className='mb-4 text-2xl'>Events:</h2>
        <div className='grid grid-cols-4 justify-between'>
          <EventCard
            img='https://source.unsplash.com/random/400x200'
            title='Title'
            priceFrom='5'
            location='Grand Hotel Millennium Sofia, 89B bulevard "Vitosha", 1463 Sofia'
            host={{ name: 'Company', url: '/' }}
          />
          <EventCard
            img='https://source.unsplash.com/random/400x200'
            title='Title'
            priceFrom='5'
            location='Grand Hotel Millennium Sofia'
            host={{ name: 'Company', url: '/' }}
          />
          <EventCard
            img='https://source.unsplash.com/random/400x200'
            title='Title'
            priceFrom='5'
            location='Grand Hotel Millennium Sofia, 89B bulevard "Vitosha", 1463 Sofia'
            host={{ name: 'Other Company', url: '/' }}
          />
          <EventCard
            img='https://source.unsplash.com/random/400x200'
            title='Title'
            priceFrom='5'
            location='Grand Hotel Millennium Sofia, 89B bulevard "Vitosha", 1463 Sofia'
            host={{ name: 'Company', url: '/' }}
          />
        </div>
      </div>
    </>
  )
}

export default Home
