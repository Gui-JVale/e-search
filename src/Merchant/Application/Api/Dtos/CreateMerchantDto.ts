import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly domain: string;

  @IsString()
  @IsNotEmpty()
  readonly externalId: string;

  @IsString()
  @IsEnum(["shopify"])
  @IsNotEmpty()
  readonly platform: string;
}
