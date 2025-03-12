import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { MerchantViewModel } from "../Models";

@ApiSchema({ name: "GetMerchantResponse" })
export class GetMerchantDto {
  @ApiProperty()
  merchant: MerchantViewModel;
}
