import axios from './axios'

export async function getItemList(
  page: number | string | string[],
  limit: number | string | string[],
  filter: string | string[],
  coordinates: any,
  radius: any
) {
  const res = await axios.post(
    'items/page',
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
