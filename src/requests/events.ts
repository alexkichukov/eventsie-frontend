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
}

export const getEvents = async (config?: GetEventsConfig): Promise<Event[]> => {
  // Set up query parameter filters
  const filters: string[] = []
  if (config) {
    if (config.id) filters.push(`id=${config.id.join(',')}`)
  }

  try {
    const response = await client.get('/events?' + filters.join('&'))
    return response.data as Event[]
  } catch {
    throw new Error('Could not fetch events')
  }
}
