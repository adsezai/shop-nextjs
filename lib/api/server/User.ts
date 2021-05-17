import axios from './axios'

export async function getUserInfo(id: string | string[]) {
  const res = await axios.get(`users/user/${id}`)
  return res.data
}
