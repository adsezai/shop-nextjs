import axios from './axios'

export async function getItemList(page: number, limit: number, filter: string, coordinates: any, radius: any) {
  const res = await axios.post(
    'items/paginated',
    {
      searchOptions: {
        page,
        limit,
        filter,
        coordinates,
        radius
      }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res.data
}

export async function getItem(id: string | string[]) {
  const res = await axios.get(`items/item/${id}`)
  return res.data
}
