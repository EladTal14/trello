const boardService = require('./board.service')
const logger = require('../../services/logger.service')

async function getBoards(req, res) {
    try {
        const boards = await boardService.query()
        res.send(boards)
    } catch (err) {
        logger.error('Failed to get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}
async function addBoard(req, res) {
    try {
        var board = req.body
        board = await boardService.add(board)
        res.send(board)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body
        const savedBoard = await boardService.update(board)
        res.send(savedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard,
    addBoard
}