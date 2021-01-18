
const initialState = {
  // loggedInUser: null,
  loggedInUser: JSON.parse(sessionStorage.getItem('loggedinUser')) || null,
  users: [],
  filterBy: { fullname: '' }
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'SET_USER':
      return { ...state, loggedInUser: action.user }
    case 'LOGIN':
      return { ...state, loggedInUser: { ...action.user } }
    case 'LOGOUT':
      return { ...state, loggedInUser: null }
    case 'SIGNUP':
      return { ...state, users: [...state.users, action.user], loggedInUser: action.user }
    default:
      return state
  }
}
