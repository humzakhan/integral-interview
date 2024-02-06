import { config } from '../config';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: config.isProduction ? 'info' : 'debug',
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/status.log' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
});

if (!config.isProduction) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}] ${message}`;
        })
      ),
    })
  );
}