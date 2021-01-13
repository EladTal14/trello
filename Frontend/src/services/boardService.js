import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})


export const boardService = {
    query,
    remove,
    save,
    getBoardById,
    getGroupIdxById

}


// const baseUrl = 'http://localhost:3030/api/board';
const baseUrl = 'http://localhost:3030/board';

async function query() {
    const res = await axios.get(baseUrl);
    console.log(res.data);
    return res.data;
    // return gBoard.board
}

async function remove(boardId) {
    return await axios.delete(`${baseUrl}/${boardId}`)
}


async function save(board) {
    if (board._id) {
        const res = await axios.put(`${baseUrl}/${board._id}`, board)
        const savedBoard = res.data;
        return savedBoard;
    }
    else {
        const res = await axios.post(`${baseUrl}`, board);
        const savedBoard = res.data;
        return savedBoard;
    }
}

async function getBoardById(boardId) {
    const res = await axios.get(`${baseUrl}/${boardId}`);
    return res.data;
}

async function getGroupIdxById(boardId, groupId) {
    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    console.log('index', groupIdx)
    return groupIdx
}


