
const initialState = {
  loggedInUser: null,
  users: [],
  filterBy: {fullname: ''}
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.users }
    case 'SET_USER':
      return { ...state, currBoard: action.user }
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.user], currBoard: action.user }
    case 'FILTER':
      return { ...state, filterBy: action.filterBy }
    default:
      return state
  }
}
