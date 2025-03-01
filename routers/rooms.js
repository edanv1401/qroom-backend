'use-strict';

import path from 'path';
import qr from 'qr-image';
import express from 'express';
import { fileURLToPath } from 'url';

const roomRouter = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const teachers = process.env.TEACHERS ?? [];
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
    }
    res.send(response);
});

export default roomRouter;