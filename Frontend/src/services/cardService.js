import Axios from 'axios';
const axios = Axios.create({
  withCredentials: true
})
const BASE_URL = 'http://localhost:3030/board'

export const cardService = {
  query
}

async function query() {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.log('err cardService QUERY CARD', err);
  }
}