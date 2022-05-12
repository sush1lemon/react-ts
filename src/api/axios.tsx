import axios from "axios";

const BASE_URL = 'http://localhost:4000'

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { Accept: 'application/json' },
})
