import express from 'express';
import morgan from 'morgan';
import route from './routes/index';
import errorHandler from './middlewares/error.middleware';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', route);

app.use(errorHandler);

export default app;
