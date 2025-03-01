'use strict';

import express from 'express';
const teacherRouter = express.Router();


teacherRouter.get('/', (req, res) => {
    res.send('Hello from teacherRouter');
});

export default teacherRouter;
