import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );

        const errorMessageParse = errorMessage
          .map((error) => error.charAt(0).toUpperCase() + error.slice(1))
          .join(', ');

        return new BadRequestException(String(errorMessageParse));
      },
      forbidUnknownValues: false,
    }),
  );

  app.enableCors();

  const port = process.env.APLICATION_PORT || 4000;

  await app.listen(port).then(() => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
  });
}
bootstrap();
