import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

import { EnvService } from '@app/env';

const config: ConnectionOptions = {
  type: 'postgres',
  host: EnvService.get().DB_HOST,
  port: Number(EnvService.get().DB_PORT),
  username: EnvService.get().DB_USERNAME,
  password: EnvService.get().DB_PASSWORD,
  database: EnvService.get().DB_NAME,
  schema: EnvService.get().DB_SCHEMA,
  name: EnvService.get().DB_CONNECTION_NAME,
  logging: getDatabaseLogLevel(),
  synchronize: EnvService.environment() !== 'production',
  entities: [path.resolve('dist/entities/*.js')],
  migrations: [path.resolve('dist/migrations/*.js')],
  cli: {
    migrationsDir: path.resolve('src/migrations'),
  },
};

function getDatabaseLogLevel() {
  let logLevel: LoggerOptions = false;
  if (EnvService.get().DB_LOGGING) {
    logLevel = EnvService.get().DB_LOGGING;
  }
  return logLevel;
}

export = config;
