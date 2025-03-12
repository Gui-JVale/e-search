import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

@ApiSchema({ name: "CreateMerchantRequest" })
export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly domain: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The ID of the merchant on the ecommerce platform",
  })
  readonly externalId: string;

  @IsString()
  @IsEnum(["shopify"])
  @IsNotEmpty()
  @ApiProperty({ enum: ["shopify"] })
  readonly platform: string;
}
