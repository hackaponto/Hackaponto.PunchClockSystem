import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

const configs: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [resolve(__dirname, '..', '..', '**/*.entity{.ts,.js}')],
  logging: process.env.NODE_ENV === 'development' ? ['query', 'schema'] : [],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrations: [resolve(__dirname, '..', 'migrations/*{.ts,.js}')],
};

const ssl = () => {
  return { ...configs, ssl: { rejectUnauthorized: false } };
};

const configDatabase = ssl();

export { configDatabase };
