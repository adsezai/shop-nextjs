import axios from './axios'

export async function getItem(id: string | string[]) {
  const res = await axios.get(`items/item/${id}`)
  return res.data
}
