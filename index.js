'use-strict';

import express from 'express'
import routerStudent from './routers/students.js';
import routerRoom from './routers/rooms.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/students', routerStudent);
app.use('/rooms', routerRoom);

app.listen(port, () => {
    console.log(`app listening in port ${port}`);
});
