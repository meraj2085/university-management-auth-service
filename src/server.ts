import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { error_logger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  error_logger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    error_logger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        error_logger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', async () => {
  try {
    await server.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

