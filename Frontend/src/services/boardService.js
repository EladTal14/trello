import { httpService } from './httpService.js'

export const boardService = {
    query,
    remove,
    save,
    getBoardById,
    getGroupIdxById,
}

function query() {
    return httpService.get(`board`)
}

function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}
function save(board) {
    if (board._id) {
        return httpService.put(`board/${board._id}`, board)
    } else {
        return httpService.post('board', board)
    }
}

function getBoardById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function getGroupIdxById(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        return groupIdx
    } catch (err) {
        console.log('err boardService GET GROUP IDX BY ID', err)
    }
}

