import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MerchantEntityTypeConfiguration } from "../EntityConfigurations/MerchantEntityTypeConfiguration";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
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
    // Register your entities for repository injection
    TypeOrmModule.forFeature([MerchantEntityTypeConfiguration]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
