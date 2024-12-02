import mongoose from 'mongoose';
import logger from './logger.config';
import { config } from '.';
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        logger.info('MongoDB connected');
    } catch (err: any) {
        logger.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
