import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { config } from '../config';
import logger from '../config/logger.config';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    const response = {
        status,
        message,
        ...(config.env === 'development' && { stack: err.stack }),
        errors: err.errors || [],
    };

    logger.error(err.stack || message);

    res.status(status).json(response);
};

export default errorHandler;
