import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})


export const boardService = {
    query,
    remove,
    save,
    getBoardById

}


// const baseUrl = 'http://localhost:3030/api/board';
const baseUrl = 'http://localhost:3030/board';

async function query() {
    const res = await axios.get(baseUrl);
    return res.data;
    // return gBoard.board
}

function remove(boardId) {
    return axios.delete(`${baseUrl}/${boardId}`)
}


async function save(board) {
    if (board._id) {
        return axios.put(`${baseUrl}/${board._id}`, board)
    }
    else {
        const res = await axios.post(`${baseUrl}`, board);
        const savedBoard = res.data;
        return savedBoard;
    }
}

async function getBoardById(boardId) {
    console.log(boardId)
    const res = await axios.get(`${baseUrl}/${boardId}`);
    return res.data;
}


