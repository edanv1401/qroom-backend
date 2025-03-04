'use-strict';

import path from 'path';
import qr from 'qr-image';
import express from 'express';
import { fileURLToPath } from 'url';
import { EventEmitter } from 'events';

const roomRouter = express.Router();
const roomEmmiter = new EventEmitter();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const teachers = (process.env.TEACHERS ?? "").split(",");
const students = new Set();
const rooms = {
    1: {
        'subject': 'English',
        'topic': '',
        'start': false,
    },
};


roomRouter.get('/generate/qr', (req, res) => {
    const url = `${req.protocol}://${req.get('host')}/rooms/vinculate/1`;
    const qrImage = qr.image(url, { type: 'png' });
    res.type('png');
    qrImage.pipe(res);
});

roomRouter.get('/vinculate/:roomId', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});


roomRouter.post('/vinculate/:roomId', (req, res) => {
    const email = req.body.email;
    const response = {
        role: 'student',
        ...rooms[req.params.roomId]
    };
    const isTeacher = (currentEmail) => {
        return teachers.find(t => t === currentEmail) ?? false;
    }
    if (isTeacher(email)) {
        response.role = 'teacher';
    }else{
        students.add(email);
        roomEmmiter.emit('students', Array.from(students));
    }
    res.send(response);
});

roomRouter.post('/assign-topic', (req, res) => {
    console.log(req.body);
    const { roomId, topic } = req.body;
    rooms[roomId].topic = topic;
    rooms[roomId].start = true;
    res.send(rooms[roomId]);
});

roomRouter.get('/reset/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    rooms[roomId].start = false;
    rooms[roomId].topic = '';
    res.send(rooms);
});

export {roomRouter, roomEmmiter};