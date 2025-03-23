import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";

import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Guid, ILogger, TracingInterceptor } from "@esearch/shared";

import { IMerchantRepository, Merchant } from "DomainTemp";

import {
  CreateMerchantDto,
  UpdateMerchantDto,
  GetMerchantDto,
  GetMerchantsDto,
} from "./Dtos";
import { MerchantViewModel } from "./Models";

@ApiTags("Merchants")
@Controller("merchants")
@UseInterceptors(TracingInterceptor)
export class MerchantControllers {
  constructor(
    @Inject(IMerchantRepository)
    private _merchantRepository: IMerchantRepository,
    @Inject(ILogger)
    private _logger: ILogger,
  ) {
    this._logger.setContext("MerchantControllers");
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    this._logger.info("Create merchant request received");

    const exists = await this._merchantRepository.getByExternalIdAsync(
      createMerchantDto.externalId,
    );

    if (exists) {
      throw new HttpException(
        "Merchant already exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    this._logger.info("Creating merchant - ", createMerchantDto.name);

    const merchant = new Merchant(createMerchantDto);
    this._merchantRepository.create(merchant);

    const result = await this._merchantRepository.unitOfWork.saveChangesAsync();

    if (!result) {
      throw new HttpException(
        "Failed to create merchant",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    this._logger.info("Merchant created successfully");
    return HttpStatus.CREATED;
  }

  @Put(":id")
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async update(
    @Param("id") id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    this._logger.info("Update merchant request received");
    const guid = Guid.parse(id);
    const merchant = await this._merchantRepository.getByGlobalIdAsync(guid);

    if (!merchant) {
      throw new HttpException("Merchant not found", HttpStatus.NOT_FOUND);
    }

    this._logger.info("Updating merchant - ", merchant.name);

    if (updateMerchantDto.name) {
      merchant.setName(updateMerchantDto.name);
    }

    if (updateMerchantDto.domain) {
      merchant.setDomain(updateMerchantDto.domain);
    }

    this._merchantRepository.update(merchant);

    await this._merchantRepository.unitOfWork.saveChangesAsync();

    this._logger.info("Merchant updated successfully");

    return HttpStatus.OK;
  }

  @Get()
  @ApiOkResponse({ type: GetMerchantsDto })
  async list(): Promise<GetMerchantsDto> {
    const merchants = await this._merchantRepository.listAsync();
    return {
      merchants: merchants.map((merchant) => new MerchantViewModel(merchant)),
    };
  }

  @Get(":id")
  @ApiOkResponse({ type: GetMerchantDto })
  async findOne(
    @Param("id") id: string,
  ): Promise<{ merchant: MerchantViewModel }> {
    const guid = Guid.parse(id);
    const merchant = await this._merchantRepository.getByGlobalIdAsync(guid);
    if (!merchant) {
      throw new HttpException("Merchant not found", HttpStatus.NOT_FOUND);
    }
    return { merchant: new MerchantViewModel(merchant) };
  }
}
