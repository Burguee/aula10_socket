// Node + Express + Socket.io
const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
    console.log(`Um usuário com o id ${socket.id} conectou ao servidor`)
    // Atribui um nickname padrão para cada cliente
    socket.data.nickname = socket.id.substring(0, 5)


    socket.on('disconnect', () => {
        console.log(`${socket.id} desconectou do servidor`)
    })

    socket.on('chat', (msg) => {
        console.log(`${socket.data.nickname} escreveu ${msg}`)
        io.emit('chat', msg, socket.data.nickname)
    })

    socket.on('trocaNickname', (nickname) => {
        socket.data.nickname = nickname
    })
})

server.listen(3000, () => {
    console.log(`Servidor rodando...`)
})
