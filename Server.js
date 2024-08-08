const {createServer} =require('node:http')
const express = require("express")
const {join} = require("node:path");
const app = express();
const server = createServer(app)

const Server = require("socket.io")
const io = Server(server)

const PORT = process.env.PORT || 8000;

app.get('/', (req,res)=>{
    return res.sendFile(join(__dirname,"/public/chat.html"))
})

io.on('connection',(socket) => {
    console.log("A User connected.........")
    socket.on('chat Message', (msg) =>{
        io.emit("chat Message",msg);
    })
})

server.listen(PORT,()=>{
    console.log(`Server Running in port ${PORT}`)
})