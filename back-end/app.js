require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require("body-parser");

const codeRoutes = require('./routes/codeRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
if (process.env.NODE_ENV === "development") {
    // Swagger configuration
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Moveo-Task API',
                version: '1.0.0',
                description: 'Moveo-Task API',
            },
            servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
        },
        apis: ["./Routes/*.js"], // Adjust the path based on your file structure
    };

    const specs = swaggerJsDoc(swaggerOptions);

    // Swagger route
    app.use('/api-docs', swaggerUI.serve);
    app.get('/api-docs', swaggerUI.setup(specs));
}

app.use('/', codeRoutes);




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

mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then((res) => console.log("connected"))
    .catch((err) => console.log(err));

server.listen(process.env.PORT, () => {
    console.log(`WebSocket server is running on http://localhost:${process.env.PORT}`);
});
