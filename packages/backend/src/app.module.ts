import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './config/enviroments';
import config from './config';
import { ClientsModule } from './modules/clients/clients.module';
import { DirectionsModule } from './modules/directions/directions.module';
import { MessengersModule } from './modules/messengers/messengers.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { OrderStatusModule } from './modules/order-status/order-status.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { ContactModule } from './modules/contact/contact.module';
import { PackageHistoryModule } from './modules/package-history/package-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    DatabaseModule,
    ClientsModule,
    DirectionsModule,
    ClientsModule,
    MessengersModule,
    DirectionsModule,
    InvoicesModule,
    OrderStatusModule,
    PackagesModule,
    ShipmentModule,
    ContactModule,
    PackageHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
