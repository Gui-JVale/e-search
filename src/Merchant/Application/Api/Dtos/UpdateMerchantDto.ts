import { IsString } from "class-validator";
import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: "UpdateMerchantRequest" })
export class UpdateMerchantDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  domain: string;
}
