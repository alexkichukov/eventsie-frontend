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
