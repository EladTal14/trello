const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
// Key: sessionId value: socket
var gSocketBySessionIdMap = {}

function emit({ type, data }) {
    gIo.emit(type, data);
}


function connectSockets(http, session) {
    gIo = require("socket.io")(http)

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, { //aware to the user session
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // Keeping the socket inside the map above
        // if (socket.myTopic) {
        //     socket.leave(socket.myTopic)
        // }
        // gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            // if (socket.myTopic) {
            //     socket.leave(socket.myTopic)
            // }
            // if (socket.handshake) {
            //     // removing the user from the map
            //     gSocketBySessionIdMap[socket.handshake.sessionID] = null
            // }
        })
        socket.on('set label', boardId => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            console.log('set label -> boardId', boardId)
            socket.join(boardId)
            socket.myTopic = boardId
        })
        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            // logger.debug('Session ID is', socket.handshake.sessionID)
            socket.myTopic = topic
        })
        socket.on('chat newMsg', msg => {
            // emits to all sockets:
            // gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            gIo.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('card added', (board) => {
            console.log('socket.myTopic', socket.myTopic)
            gIo.to(socket.myTopic).emit('load board', board)
        })
        socket.on('card changed', (board) => {
            console.log('socket.myTopic', socket.myTopic)
            gIo.to(socket.myTopic).emit('load board', board)
        })
        socket.on('card removed', (board) => {
            console.log('socket.myTopic', socket.myTopic)
            gIo.to(socket.myTopic).emit('load board', board)
        })
        socket.on('group added', (board) => {
            console.log('socket.myTopic', socket.myTopic)
            gIo.to(socket.myTopic).emit('load board', board)
        })
        socket.on('render', (board) => {
            console.log('render -> socket.myTopic', socket.myTopic)
            // gIo.to(socket.myTopic).emit('load board', board)
            socket.to(socket.myTopic).emit('load board', board)
        })
    })
}

// Send to all sockets BUT not the current socket 
function broadcast({ type, data }) {
    const store = getStore()
    const { sessionId } = store
    if (!sessionId) return debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return debug('Shouldnt happen, No socket in map', gSocketBySessionIdMap)
    excludedSocket.broadcast.emit(type, data)
}

module.exports = {
    connectSockets,
    emit,
    broadcast
}



