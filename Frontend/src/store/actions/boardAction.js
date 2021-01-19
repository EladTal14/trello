import { boardService } from '../../services/boardService.js'


export function loadBoards() { // Action Creator
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('err boardAction LOAD BOARDS', err);
        }
    }
}

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getBoardById(boardId)
            console.log('board from DISPATCH', board)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('err boardAction LOAD BOARD', err);
        }
    }
}

export function saveBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type: (board._id) ? 'UPDATE_BOARD' : 'ADD_BOARD', board: savedBoard })
        } catch (err) {
            console.log('err boardAction SAVE BOARD', err);
        }
    }
}
export function cleanBoard() {
    return (dispatch) => {
        try {
            dispatch({ type: 'CLEAN_BOARD' })
        } catch (err) {
            console.log('err boardAction SAVE BOARD', err);
        }
    }
}

// export function removeBoard(boardId) {
//     return async (dispatch) => {
//         await boardService.remove(boardId)
//         const action = {
//             type: 'REMOVE_BOARD',
//             boardId
//         }
//         dispatch(action)

//     }
// }

// export function updateGroups(groups) {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'UPDATE_GROUPS', groups })
//         } catch (err) {
//             console.log('err boardAction UPDATED GROUPS', err);
//         }
//     }
// }

