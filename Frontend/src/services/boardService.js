import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})


export const boardService = {
    query,
    remove,
    save,
    getBoardById,
    getGroupIdxById,
    getUpdatedGroups

}


// const baseUrl = 'http://localhost:3030/api/board';
const baseUrl = 'http://localhost:3030/board';

async function query() {
    try {
        const res = await axios.get(baseUrl);
        return res.data;

    } catch (err) {
        console.log('err boardService QUERY BOARD', err);
    }
}

async function remove(boardId) {
    try {
        return await axios.delete(`${baseUrl}/${boardId}`)

    } catch (err) {
        console.log('err boardService REMOVE BOARD', err);
    }
}


async function save(board) {
    try {
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
    } catch (err) {
        console.log('err boardService SAVE BOARD', err);
    }
}

async function getBoardById(boardId) {
    try {
        const res = await axios.get(`${baseUrl}/${boardId}`);
        return res.data;
    } catch (err) {
        console.log('err boardService GET BOARD BY ID', err);
    }
}

async function getGroupIdxById(boardId, groupId) {
    try {
        const board = await getBoardById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        return groupIdx

    } catch (err) {
        console.log('err boardService GET GROUP IDX BY ID', err);
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
        console.log('err boardService GET UPDATE GROUPS', err);
    }
}


