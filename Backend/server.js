const express = require('express') // ALL
const bodyParser = require('body-parser') //body request
const expressSession = require('express-session') // for session/cookies
const cors = require('cors')
const boardService = require('./services/board.service.js')

const app = express()
const port = 5050
const session = expressSession({
    secret: 'secret is the key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});


// Config the express App
app.use(session)
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors());

// const toyRoutes = require('./api/toy/toy.routes.js')

// ROUTS
// app.use('/api/toy', toyRoutes)


// THE OLD WAY:
// Config the backend routing:
// the toy LIST
// app.get('/api/boards', (req, res) => {
//     boardService.query()
//         .then(boards => {
//             console.log(boards)
//             res.send(boards)
//         })
// })

// // the toy CREATE
// app.post('/api/toy', (req, res) => {
//     const toyToSave = req.body;

//     toyService.save(toyToSave)
//         .then(toy => res.send(toy))
// })

// // the toy READ
// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params

//     toyService.getById(toyId)
//         .then(toy => {
//             res.send(toy)
//         })
// })

// // // the toy DELETE
// app.delete('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params

//     toyService.remove(toyId)
//         .then(() => {
//             res.send('toy has been removed!')
//         })
// })

// // // the toy UPDATE
// app.put('/api/toy/:toyId', (req, res) => {
//     const toy = req.body
//     toyService.save(toy)
//         .then((toy) => res.send(toy))
// })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const path = require('path')
// const cookieParser = require('cookie-parser')
// const expressSession = require('express-session')

// const app = express()
// const http = require('http').createServer(app)

// const session = expressSession({
//     secret: 'coding is amazing',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// })
// // Express App Config
// app.use(cookieParser())
// app.use(bodyParser.json())
// app.use(session)

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.resolve(__dirname, 'public')))
// } else {
//     const corsOptions = {
//         origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
//         credentials: true
//     }
//     app.use(cors(corsOptions))
// }

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
// const reviewRoutes = require('./api/review/review.routes')
// const {connectSockets} = require('./services/socket.service')


// // routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/review', reviewRoutes)
// connectSockets(http, session)

// // Make every server-side-route to match the index.html
// // so when requesting http://localhost:3000/index.html/car/123 it will still respond with
// // our SPA (single page app) (the index.html file) and allow react-router to take it from there
// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// const logger = require('./services/logger.service')
// const port = process.env.PORT || 3030
// http.listen(port, () => {
//     logger.info('Server is running on port: ' + port)
// })

// console.log('I am Here!, am I?')


