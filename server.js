const express = require('express')
const router = require('./routes/router')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
require('dotenv').config()
const { ExpressPeerServer } = require('peer')
const peerserver = ExpressPeerServer(server, {
  debug: true,
})
const port = process.env.PORT
app.use('/mypeer', peerserver)
app.set('view engine', 'ejs')
app.use('/join/:roomid', express.static('./public'))
app.use(express.static('./public'))
app.use('/', router)

io.on('connection', (socket) => {
  // console.log('Someone conected')
  socket.on('join-room', (room, userid, myname) => {
    socket.join(room)

    socket.to(room).emit('user-connected', userid, myname)
    socket.on('submit-message', (value, name) => {
      io.to(room).emit('message', value, name)
    })
    socket.on('disconnect', () => {
      socket.to(room).emit('disconnected', userid, myname)
    })
  })
})
server.listen(process.env.PORT || 3030)
