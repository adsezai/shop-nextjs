import axios from 'axios'

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    //Authorization: `Bearer ${process.env.AUTH_TOKEN}`
  },
  responseType: 'json'
})
