import EventCard from '@/components/EventCard'

const Events = () => {
  return (
    <div className='grid grid-cols-[repeat(4,auto)] justify-between'>
      <EventCard
        id='637aa2dd18afe47d2bd17882'
        img='https://picsum.photos/400/203'
        title='Title'
        priceFrom='5'
        location='Grand Hotel Millennium Sofia, 89B bulevard "Vitosha", 1463 Sofia'
        host={{ name: 'Company', id: 'asdasdasd' }}
      />
      <EventCard
        id='637aa2dd18afe47d2bd17881'
        img='https://picsum.photos/400/202'
        title='Title'
        priceFrom='5'
        location='Grand Hotel Millennium Sofia'
        host={{ name: 'Company', id: 'asdasdasd' }}
      />
      <EventCard
        id='637aa2dd18afe47d2bd17883'
        img='https://picsum.photos/400/201'
        title='Title'
        priceFrom='5'
        location='Grand Hotel Millennium Sofia, 89B bulevard "Vitosha", 1463 Sofia'
        host={{ name: 'Other Company', id: 'asdasdasd' }}
      />
      <EventCard
        id='637aa2dd18afe47d2bd17884'
        img='https://picsum.photos/400/200'
        title='Title'
        priceFrom='5'
        location='Grand Hotel Millennium Sofia, 89B bulevard "Vitosha", 1463 Sofia'
        host={{ name: 'Company', id: 'asdasdasd' }}
      />
    </div>
  )
}

export default Events
