const express = require('express')
const {createServer} = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const {setupRoutes} = require('./modules/video/controller')
const app = express()
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to allow cookies
}));
const port = 4000
app.use(express.json())

const server = createServer(app);
const io = new Server(server);



io.on('connection', (socket) => { 
  console.log('a user connected');
});
server.listen(port, () => {
    setupRoutes(app)
    console.log(`Example app listening on port ${port}`)
  })
module.exports = app