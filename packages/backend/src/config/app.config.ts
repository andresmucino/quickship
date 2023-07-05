import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const database = {
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    type: 'postgres',
    autoLoadEntities: true,
    //migrationsRun: true,
    logging: true,
    //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  return { database };
});
