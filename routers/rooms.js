'use-strict';

import path from 'path';
import qr from 'qr-image';
import express from 'express';
import { fileURLToPath } from 'url';

const roomRouter = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

roomRouter.get('/generate/qr', (req, res) => {
    const url = `${req.protocol}://${req.get('host')}/rooms/vinculate`;
    const qrImage = qr.image(url, { type: 'png' });
    res.type('png');
    qrImage.pipe(res);
});

roomRouter.get('/vinculate', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'form.html'));
});


roomRouter.post('/vinculate', (req, res) => {
    const email = req.body.email;
    res.send(`The student with email: ${email} successfully linked to the class`);
});

export default roomRouter;