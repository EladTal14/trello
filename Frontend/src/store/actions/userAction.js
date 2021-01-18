import { userService } from '../../services/userService.js'


export function loadUsers() { // Action Creator
    return async (dispatch) => {
        try {
            const users = await userService.query()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('err userAction LOAD BOARDS', err);
        }
    }
}

export function setUserFilter(filterBy) {
    return (dispatch) => { dispatch({ type: 'FILTER', filterBy }) }
}