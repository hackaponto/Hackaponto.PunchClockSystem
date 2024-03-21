import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

const configs: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dev',
  synchronize: true,
  entities: [resolve(__dirname, '..', '..', '**/*.entity{.ts,.js}')],
  //   logging: process.env.NODE_ENV === 'development' ? ['query', 'schema'] : [],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrations: [resolve(__dirname, '..', 'migrations/*{.ts,.js}')],
};

const ssl = () => {
  if (process.env.NODE_ENV !== 'development') {
    const value = { ...configs, ssl: { rejectUnauthorized: false } };
    return value;
  }
  return configs;
};

const configDatabase = ssl();

export { configDatabase };
