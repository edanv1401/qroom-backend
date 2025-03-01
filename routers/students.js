'use strict';

import express from 'express';
const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
    res.send('Hello from studentRouter');
});

export default studentRouter;