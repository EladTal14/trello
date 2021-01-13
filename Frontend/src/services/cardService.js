import Axios from 'axios';
const axios = Axios.create({
  withCredentials: true
})
const BASE_URL = 'http://localhost:3030/board'

export const cardService = {
  query
}

function query() {
  return axios.get(BASE_URL)
    .then((res) => {
      return res.data
    })
}