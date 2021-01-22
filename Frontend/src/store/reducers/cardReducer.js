const initialState = {
  currCard: null,
  currGroup: null,
  isAddOpen: false
}

export function cardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CARD':
      return { ...state, currCard: { ...action.card } }
    case 'SET_GROUP':
      return { ...state, currGroup: { ...action.group } }
    case 'CLEAR_STATE':
      return { ...state, currGroup: action.clear, currCard: action.clear }
    case 'TOGGLE_ADD_CARD':
      return { ...state, isAddOpen: action.isAddOpen }
    default:
      return state
  }
}

// case 'ADD_LABEL':
//   return { ...state, currCard: { ...state.currCard, labels: [action.label, ...state.currCard.labels] } }