import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import './database/connection';

import orphanageRoutes from './routes/orphanages.routes';

import errorCatcher from './ErrorHandling/errorCatch';

const app = express();

app.use(cors());

app.use(express.json());

app.use(orphanageRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorCatcher);

app.listen(3333, () => console.log('✔ Server Started!'));
