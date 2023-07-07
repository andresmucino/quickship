import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const database = {
    url: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    type: 'postgres',
    autoLoadEntities: true,
    //migrationsRun: true,
    //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //synchronize: true,
    logging: true,

    ssl: {
      rejectUnauthorized: false,
    },
  };
  const app = {
    logLevel: process.env.LOG_LEVEL || 'info',
    port: process.env.APLICATION_PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'production',
  };

  return { database, app };
});
