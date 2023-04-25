import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      // installSubscriptionHandlers: true,
      // introspection: true,
      playground: true,
      // context: ({
      //   req,
      // }: {
      //   req: { headers: Record<string, string> };
      // }): GqlContext => ({ request: req }),
    }),
    // ProductModule,
    // CustomerModule,
    // ProviderModule,
    // OrderModule,
    // DatabaseModule,
    // UserModule
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
