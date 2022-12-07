import client from './client'

export const favouriteEvent = (favourite: boolean) => {
  client.post('/favourite')
}
