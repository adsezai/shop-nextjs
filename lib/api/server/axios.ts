import axios from 'axios'
import { errorByHttpCode } from '../../global/errors'

const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {},
  responseType: 'json'
})
instance.interceptors.response.use(
  function (res) {
    return res
  },
  function (error) {
    // TODO log errors
    if (error.response) {
      // Request made and server responded with error
      errorByHttpCode(error.response.status, JSON.stringify(error.response.data.message) || '')
    } else if (error.request) {
      // The request was made but no response was received
      errorByHttpCode(500, error.message || '')
    } else {
      // Something happened in setting up the request that triggered an Error
      errorByHttpCode(500, error.message || '')
    }
  }
)

export default instance
