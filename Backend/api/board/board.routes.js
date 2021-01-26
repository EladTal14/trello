const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoards, getBoard, addBoard, updateBoard } = require('./board.controller')
const router = express.Router()

router.get('/', getBoards)
router.get('/:id', getBoard)
router.post('/', addBoard)
router.put('/:id', updateBoard)

module.exports = router