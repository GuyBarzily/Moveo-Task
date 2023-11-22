const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Import the cors middleware


const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        methods: ['GET', 'POST'],
    },
});


app.use(cors());

let mentorSocket = null;

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);

        if (!mentorSocket) {
            mentorSocket = socket;
            // Send a message to the mentor indicating their mentor status
            mentorSocket.emit('mentorStatus', true);
        }
    });

    socket.on('codeChange', ({ roomId, code }) => {
        io.to(roomId).emit('codeChange', code);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        if (mentorSocket) {
            mentorSocket = null;
        }
    });
});

const port = 8080; // Choose a port number for the WebSocket server
server.listen(port, () => {
    console.log(`WebSocket server is running on http://localhost:${port}`);
});
