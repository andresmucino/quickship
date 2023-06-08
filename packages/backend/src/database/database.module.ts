import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { database, host, password, port, url, username } = configService;

        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          // url: url,
          username: 'root',
          password: '123456',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
          // ssl: {
          //   rejectUnauthorized: false,
          // },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
