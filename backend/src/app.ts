import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import route from './routes/index';
import errorHandler from './middlewares/error.middleware';
import { config } from './config';

const app = express();

app.use(morgan('dev'));

app.use(
    cors({
        origin: config.frontendOriginUrl,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', route);

app.use(errorHandler);

export default app;
