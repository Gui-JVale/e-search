import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { MerchantViewModel } from "../Models";

@ApiSchema({ name: "GetMerchantsResponse" })
export class GetMerchantsDto {
  @ApiProperty({ type: MerchantViewModel, isArray: true })
  merchants: MerchantViewModel[];
}
