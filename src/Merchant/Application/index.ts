import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApiModule } from "./Api";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MerchantEntityTypeConfiguration } from "Infrastructure";
import { HttpMetricsMiddleware, ObservabilityModule } from "@esearch/shared";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.local" }),
    ObservabilityModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: +configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USERNAME"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        entities: [MerchantEntityTypeConfiguration],
        synchronize: configService.get("NODE_ENV") !== "production",
        logging: configService.get("NODE_ENV") !== "production",
      }),
      inject: [ConfigService],
    }),
    ApiModule,
  ],
})
export class Application implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpMetricsMiddleware).forRoutes("*");
  }
}
