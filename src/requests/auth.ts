import client from './client'

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await client.get(`/user/${id}`)
    return response.data
  } catch {
    throw new Error('Could not fetch user data')
  }
}

export const favouriteEvent = async (
  user: AuthUser,
  favourite: boolean,
  eventID: string
): Promise<string[]> => {
  try {
    const response = await client.post(
      `/${favourite ? '' : 'un'}favouriteEvent`,
      { eventID },
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
    return response.data.favouriteEvents
  } catch {
    throw new Error(`Could not ${favourite ? '' : 'un'}favourite event`)
  }
}

export const attendEvent = async (
  user: AuthUser,
  attend: boolean,
  eventID: string
): Promise<string[]> => {
  try {
    const response = await client.post(
      `/${attend ? '' : 'un'}attendEvent`,
      { eventID },
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
    return response.data.attendingEvents
  } catch {
    throw new Error(`Could not ${attend ? 'add event to' : 'remove event from'} attending`)
  }
}
