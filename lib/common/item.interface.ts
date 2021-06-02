export interface Item {
  title: string
  price: string
  description: string
  viewedBy?: Array<string>
  categories?: Array<string>
  location?: string
  keywors?: Array<string>
  owner: string
  _id: string
  originalPrice: string
  createDate: string
  __v?: number
}
