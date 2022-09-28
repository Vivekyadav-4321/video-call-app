const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 4000
const { v4: uuidv4 } = require('uuid');
var totalusers = 0
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/mainpage.html")
});


app.get('/:room', (req, res) => {
res.sendFile(__dirname+"/index.html")

});


io.on("connection",(socket)=>{

socket.on("joinroom",(roomid,userid)=>{
  totalusers++
  console.log(totalusers);
  socket.join(roomid)
  socket.to(roomid).emit("newuseradded",userid)
  socket.on("disconnect",(socket)=>{
    totalusers--
    console.log(totalusers);
  })
})







})

server.listen(PORT, () => {
    console.log(`server is live at ${PORT}`);
  });