import { boardService } from '../../services/boardService.js'


export  function loadBoards() { // Action Creator
    return async (dispatch) => {
        const boards = await boardService.query()
        const action = {
            type: 'SET_BOARDS',
            boards,
        }
        dispatch(action)

    }
}

export  function loadBoard(boardId) { 
    return async (dispatch) => {
        const board = await boardService.getBoardById(boardId)
        console.log('action board', board);
        const action = {
            type: 'SET_BOARD',
            board
        }
        dispatch(action)

    }
}

export  function saveBoard(board) { 
    return async (dispatch) => {
        const saveBoard = await boardService.save(board)
        const action = {
            type: (board._id) ? 'SAVE_BOARD' : 'ADD_BOARD',
            board: saveBoard
          }
        dispatch(action)

    }
}

export  function removeBoard(boardId) { 
    return async (dispatch) => {
        await boardService.remove(boardId)
        const action = {
            type: 'REMOVE_BOARD',
            boardId
          }
        dispatch(action)

    }
}

