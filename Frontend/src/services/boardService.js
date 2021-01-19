import { httpService } from './httpService.js'

export const boardService = {
    query,
    remove,
    save,
    getBoardById,
    getGroupIdxById,
    getUpdatedGroups

}

async function query() {
    return httpService.get(`board`)

}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

async function save(board) {
    if (board._id) {
        const savedBoard = await httpService.put(`board/${board._id}`, board)
        return savedBoard
    } else {
        const savedBoard = await httpService.post('board', board)
        return savedBoard
    }
}

async function getBoardById(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    return board

}

async function getGroupIdxById(boardId, groupId) {
    try {//delete try and catch????
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        return groupIdx
    } catch (err) {
        console.log('err boardService GET GROUP IDX BY ID', err)
    }
}

function getUpdatedGroups(oldGroups, newGroups) {
    try {
        const updatedGroups = oldGroups.filter(oldGroup => {
            return newGroups.map(newGroup => {
                if (newGroup.id === oldGroup.id) return newGroup
                else return oldGroup
            })
        })
        return updatedGroups
    } catch (err) {
        console.log('err boardService GET UPDATE GROUPS', err)
    }
}


