import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Application } from "Application";
import { Logger, ObservabilityModule } from "@esearch/shared";
import dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  ObservabilityModule.initializeSdk();
  const app = await NestFactory.create(Application);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // const logger = new Logger();
  // logger.setContext("Merchant Microservice");
  // app.useLogger(logger);

  // // Connect to microservice transport
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
  //     queue: "merchant_queue",
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  // // Start microservice
  // await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle("eSearch API")
    .setDescription("The eSearch Merchant Service API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
