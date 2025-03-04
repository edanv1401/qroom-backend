'use-strict';

import express from 'express'
import routerStudent from './routers/students.js';
import {roomRouter, roomEmmiter} from './routers/rooms.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const port = process.env.PORT ?? 3000;
const connections = [];
const server = http.createServer(app);
const io = new Server(server);

// app configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/students', routerStudent);
app.use('/rooms', roomRouter);;

// socket connections
io.on('connection', (socket) => {
    connections.push(socket);
    console.log('app with socket connected');

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
    });
});

roomEmmiter.on('students', (req) => {
    connections.forEach(s => s.emit('server message', req));
});

server.listen(port, () => {
    console.log(`app listening in port ${port}`);
})