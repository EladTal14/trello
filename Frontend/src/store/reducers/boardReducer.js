
const initialState = {
  currBoard: {},
  boards: []
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_BOARD':
      console.log('curr board', state.currBoard );
      return { ...state, currBoard: action.board }
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
