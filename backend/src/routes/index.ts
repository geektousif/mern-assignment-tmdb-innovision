import express from 'express';
import moviesRouter from './movies.route';

const router = express.Router();

router.use('/movies', moviesRouter);

export default router;
