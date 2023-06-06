import { createLogger, format, transports } from 'winston'
const { combine, timestamp, printf, prettyPrint } = format
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp)
  return `[ ${level}: ${message} [${date.toString()}]`
})

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success_%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const error_logger = createLogger({
  level: 'error',
  format: combine(timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error_%DATE%.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, error_logger }
