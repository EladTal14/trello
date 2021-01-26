
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find().toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {
            _id: ObjectId(board._id),
            title: board.title,
            createdAt: board.createdAt,
            groups: board.groups,
            members: board.members,
            activities: board.activities,
            style: board.style,
            labels: board.labels
        }
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ '_id': boardToSave._id }, { $set: boardToSave })
        return boardToSave;
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const boardToAdd = {
            _id: ObjectId(board._id),
            title: board.title,
            createdAt: Date.now(),
            groups: [],
            members: [],
            activities: [],
            style: board.style,
            labels: [
                { id: '12346a12341', title: 'Low Priority', color: '#57b041' },
                { id: '1234a12342', title: 'Medium Priority', color: '#f8c800' },
                { id: '1235a12353', title: 'High Priority', color: '#ee473c' },
                { id: '1235a12355', title: 'Improvment', color: '#ff9615' },
                { id: '1235a12354', title: 'Meeting', color: '#b300b3' },
                { id: '1235a12356', title: 'Re Do', color: '#00c8e0' },
                { id: '1235a123579', title: 'After QA', color: '#7c898e' },
            ]
        }
        const collection = await dbService.getCollection('board')
        await collection.insertOne(boardToAdd)
        return boardToAdd
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}