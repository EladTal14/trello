import Axios from 'axios'
import { httpService } from './httpService.js'
const axios = Axios.create({
    withCredentials: true
})

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    query,
    login,
    logout,
    signup,
    // loadUser
}


// const baseUrl = 'http://localhost:3030/api/user'
// const baseUrl = 'http://localhost:3030/user'
const baseUrl = 'http://localhost:3030/api/auth';

async function query() {
    return httpService.get(`user`)
}



async function login(credentials){
    return httpService.post(`login`, credentials);
    // return _handleLogin(user);
}

async function logout() {
    return httpService.post(`logout`);
    // storageService.clear();
}

// function _handleLogin(user) {
//     storageService.store(STORAGE_KEY, user)
//     return user
// }

async function signup(credentials){
    console.log('credentials',credentials)
    return httpService.post(`signup`, credentials);
    // return _handleLogin(user);
}

// async function loadUser(){
//     const user = storageService.load(STORAGE_KEY)
//     console.log('user', user);
//     return user
// }