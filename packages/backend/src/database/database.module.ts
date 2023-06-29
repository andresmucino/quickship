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
          type: 'postgres',
          host: host,
          port: Number(port),
          url: url,
          username: username,
          password: password,
          database: database,
          autoLoadEntities: true,
          migrationsRun: true,
          logging: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
