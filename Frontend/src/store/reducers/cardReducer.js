
const initialState = {
  currCard: null,
  currGroup: null
}

export function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CARD':
      return { ...state, currCard: { ...action.card } }
    case 'SET_GROUP':
      return { ...state, currGroup: { ...action.group } }
    case 'CLEAR_STATE':
      return { ...state, currGroup: action.clear, currCard: action.clear }
    default:
      return state
  }
}
