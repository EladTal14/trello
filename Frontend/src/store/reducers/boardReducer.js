const initialState = {
  currBoard: null,
  boards: [],
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_BOARD':
      return { ...state, currBoard: { ...action.board } }
    case 'UPDATE_BOARD':
      return { ...state, currBoard: action.board }
    case 'CLEAN_BOARD':
      return { ...state, currBoard: null }
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.board], currBoard: { ...action.board } }
    case 'SAVE_BOARD':
      return {
        ...state, boards: state.boards.map(board => {
          if (board._id === action.board._id) return action.board
          else return board
        })
      }
    default:
      return state
  }
}
