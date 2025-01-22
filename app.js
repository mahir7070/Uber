import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userrouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: './.env' });

const app = express();

app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/api/v1', userrouter);

export { app };
