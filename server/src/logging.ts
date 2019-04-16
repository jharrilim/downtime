import { createLogger, format, transports } from 'winston';

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `[${label}] ${timestamp} - ${level}: ${message}`;
});

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.label({ label: `${process.pid}` }),
        myFormat
    ),
    transports: [new transports.Console()],
})

export { logger };
