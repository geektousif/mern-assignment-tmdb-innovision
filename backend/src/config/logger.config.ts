import { format, transports, createLogger } from 'winston';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        format.colorize(),
        label({ label: 'dev-backend' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat,
    ),
    transports: [new transports.Console()],
});

export default logger;
