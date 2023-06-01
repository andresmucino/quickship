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
          host: "dpg-chc6u93hp8u01655q8d0-a",
          port: 5432,
          url: 'postgres://quickship_ubxn_user:zVPpiKD16PVyFlN29j8fQFa194rtPUB4@dpg-chc6u93hp8u01655q8d0-a.oregon-postgres.render.com/quickship_ubxn',
          username: "quickship_ubxn_user",
          password: "zVPpiKD16PVyFlN29j8fQFa194rtPUB4",
          database: "quickship_ubxn",
          autoLoadEntities: true,
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
