import { boardService } from '../../services/boardService.js'


export  function loadBoard() { // Action Creator
    return async (dispatch) => {
        const board = await boardService.query()
        const action = {
            type: 'SET_BOARD',
            board,
        }
        dispatch(action)

    }
}