import client from './client'

export const getEvent = async (id: string): Promise<Event> => {
  try {
    const response = await client.get(`/events/${id}`)
    return response.data
  } catch {
    throw new Error('Could not fetch event')
  }
}

interface GetEventsConfig {
  id?: string[]
  categories?: string[]
  createdBy?: string[]
}

export const getEvents = async (config?: GetEventsConfig): Promise<Event[]> => {
  // Set up query parameter filters
  const filters: string[] = []
  if (config) {
    if (config.id) filters.push(`id=${config.id.join(',')}`)
    if (config.categories) filters.push(`category=${config.categories.join(',')}`)
    if (config.createdBy) filters.push(`createdBy=${config.createdBy.join(',')}`)
  }

  try {
    const response = await client.get('/events?' + filters.join('&'))
    return response.data as Event[]
  } catch {
    throw new Error('Could not fetch events')
  }
}

export const deleteEvent = async (id: string, user: AuthUser) => {
  try {
    await client.post(
      '/deleteEvent',
      { id },
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
  } catch {
    throw new Error('Could not delete event')
  }
}

interface UpdateEventBody {
  id: string
  title: string
  date: string
  description: string
  category: string
  tags: string[]
  location: {
    address: string
    city: string
    postcode: string
  }
  price: {
    from: number
    to: number
  }
}

export const updateEvent = async (body: UpdateEventBody, user: AuthUser) => {
  try {
    await client.post('/updateEvent', body, { headers: { Authorization: `Bearer ${user.token}` } })
  } catch {
    throw new Error('Could not update event')
  }
}
