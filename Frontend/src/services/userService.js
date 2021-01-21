import { httpService } from './httpService.js'
import { storageService } from './sessionStorage.js'

const STORAGE_KEY = 'loggedinUser'


export const userService = {
    query,
    login,
    logout,
    signup,
    loadUser
}



// const baseUrl = 'http://localhost:3030/api/user'
// const baseUrl = 'http://localhost:3030/user'
// const baseUrl = 'http://localhost:3030/api/auth';

async function query() {
    return httpService.get(`user`)
}

async function login(credentials) {
    //loadUser()
    const user = await httpService.post(`auth/login`, credentials);
    return _handleLogin(user);
}

async function logout() {//check with liel how to do this
    storageService.clear();
    await httpService.post(`auth/logout`);
}


async function signup(credentials) {
    // console.log('credentials', credentials)
    const newUser = await httpService.post(`auth/signup`, credentials);
    return _handleLogin(newUser);
}

async function loadUser() {
    const user = storageService.load(STORAGE_KEY)
    // console.log('user', user);
    return user
}
function _handleLogin(user) {
    storageService.store(STORAGE_KEY, user)
    return user
}