import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://react-nest-backend.herokuapp.com/" : 'http://localhost:4000';

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {Accept: 'application/json'},
})
