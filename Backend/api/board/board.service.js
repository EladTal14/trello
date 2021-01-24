
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const boardService = require('../board/board.service')
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
        // boards = boards.map(board => {
        //     user.createdBy = ObjectId(user._id).getTimestamp()
        //     // Returning fake fresh data
        //     // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
        //     return board
        // })
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

        // user.givenBoards = await boardService.query({ byUserId: ObjectId(user._id) })
        // user.givenBoards = user.givenBoards.map(board => {
        //     delete board.byUser
        //     return board
        // })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}
// async function getById(boardId) {
//     try {
//         const collection = await dbService.getCollection('board')
//         const board = await collection.findOne({ '_id': ObjectId(boardId) })

//         // user.givenBoards = await boardService.query({ byUserId: ObjectId(user._id) })
//         // user.givenBoards = user.givenBoards.map(board => {
//         //     delete board.byUser
//         //     return board
//         // })
//         return board
//     } catch (err) {
//         logger.error(`while finding board ${boardId}`, err)
//         throw err
//     }
// }


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
        // peek only updatable fields!
        const boardToSave = {
            _id: ObjectId(board._id),
            title: board.title,
            createdAt: board.createdAt,
            //createdBy:TODO user
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
        // peek only updatable fields!
        const boardToAdd = {
            _id: ObjectId(board._id),
            title: board.title,
            createdAt: Date.now(),
            //createdBy:TODO user
            groups: [],
            members: [],
            activities: [],
            // style: {backgroundImage: (board.style? board.style.backgroundImage : '')},
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


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}




// const collection = await dbService.getCollection('board')
// const board = await collection.findOne({ '_id': ObjectId(boardId) })
// const txtCriteria = { $regex: 'a', $options: 'i' }
// criteria.$or = [{ board: txtCriteria }]

// db.quiz.aggregate(
//     //Match the documents by query. Search for science course
//     {"$match":{"name":"Science"}},

//     //De-normalize the nested array of chapters.
//     {"$unwind":"$chapters"},
//     {"$unwind":"$chapters.tests"},

//     //Match the document with test name Science Chapter
//     {"$match":{"chapters.tests.name":"ScienceChap1test2"}},

//     //Unwind nested questions array
//     {"$unwind":"$chapters.tests.questions"},

//     //Match questions of type mcq
//     {"$match":{"chapters.tests.questions.type":"mcq"}}
// ).pretty()