import faker from 'faker'
import { Item } from '../lib/common/item.interface'
import { User } from '../lib/common/user.interface'
import { times, random } from 'lodash'

export const login = {
  sucess: {
    data: { firstname: faker.name.firstName() }
  }
}

export const item = (): Item => {
  const i = faker.commerce
  const city = faker.address.cityName
  const itm: Item = {
    title: i.productName(),
    description: i.productDescription(),
    price: i.price(),
    originalPrice: i.price(),
    location: city(),
    _id: faker.datatype.uuid(),
    createDate: faker.date.recent().toISOString(),
    owner: faker.datatype.uuid(),
    imageUrls: times(random(1, 5), () => faker.image.technics(40, 40))
  }
  return itm
}

export const user = (): User => {
  const usr: User = {
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName()
  }
  return usr
}
