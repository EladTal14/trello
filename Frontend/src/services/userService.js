import Axios from 'axios'
import { httpService } from './httpService.js'
const axios = Axios.create({
    withCredentials: true
})

export const userService = {
    query,
}


// const baseUrl = 'http://localhost:3030/api/board'
// const baseUrl = 'http://localhost:3030/user'

async function query() {
    return httpService.get(`user`)
}