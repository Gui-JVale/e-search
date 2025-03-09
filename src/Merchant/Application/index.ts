import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApiModule } from "./Api";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ApiModule],
})
export class Application {}
