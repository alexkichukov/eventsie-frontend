interface AuthUser {
  token: string
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  favouriteEvents: string[]
  attendingEvents: string[]
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  favouriteEvents: string[]
  attendingEvents: string[]
}

interface Event {
  id: string
  title: string
  date: string
  category: string
  description: string
  tags: string[]
  createdBy: {
    id: string
    firstName: string
    lastName: string
  }
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
