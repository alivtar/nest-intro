import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  autoLoadEntities:
    process.env.DATABASE_AUTO_LOAD_ENTITIES === 'true' ? true : false,
  synchronize: process.env.DATABASE_PORT === 'true' ? true : false,
}));
