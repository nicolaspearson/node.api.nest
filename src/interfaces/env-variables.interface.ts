import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export interface IEnvVariables {
  API_BASE_PATH: string;
  API_HOST: string;
  API_PORT: number | string;
  DB_HOST: string;
  DB_PORT: number | string;
  DB_NAME: string;
  DB_LOGGING: LoggerOptions;
  DB_CONNECTION_NAME: string;
  DB_SCHEMA: string;
  DB_PASSWORD: string;
  DB_USERNAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}
