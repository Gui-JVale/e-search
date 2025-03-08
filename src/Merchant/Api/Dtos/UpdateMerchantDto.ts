import { IsString } from "class-validator";

export class UpdateMerchantDto {
  @IsString()
  name: string;
  @IsString()
  domain: string;
}
