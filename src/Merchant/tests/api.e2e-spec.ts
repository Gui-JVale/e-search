import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import request from "supertest";
import { MerchantRecord } from "Infrastructure";
import { Application } from "../Application";
import { CreateMerchantDto } from "../Application/Api/Dtos/CreateMerchantDto";

describe("MerchantController (e2e)", () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env.test",
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: "postgres",
            host: configService.get("DATABASE_HOST"),
            port: +configService.get("DATABASE_PORT"),
            username: configService.get("DATABASE_USERNAME"),
            password: configService.get("DATABASE_PASSWORD"),
            database: configService.get("DATABASE_NAME"),
            entities: [MerchantRecord],
            logging: false,
          }),
          inject: [ConfigService],
        }),
        Application,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/merchants (POST)", () => {
    const createMerchantDto: CreateMerchantDto = {
      externalId: "test-external-id",
      domain: "test-store.myshopify.com",
      platform: "shopify",
      name: "Test Store",
    };

    it("should create a new merchant", () => {
      return request(app.getHttpServer())
        .post("/merchants")
        .send(createMerchantDto)
        .expect(201);
    });

    it("should fail when creating merchant with duplicate externalId", async () => {
      // First creation should succeed
      await request(app.getHttpServer())
        .post("/merchants")
        .send(createMerchantDto)
        .expect(201);

      // Second creation with same externalId should fail
      return request(app.getHttpServer())
        .post("/merchants")
        .send(createMerchantDto)
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBe("Merchant already exists");
        });
    });

    it("should fail with invalid data", () => {
      return request(app.getHttpServer())
        .post("/merchants")
        .send({
          // Missing required fields
          name: "Test Store",
        })
        .expect(400);
    });
  });

  describe("/merchants (GET)", () => {
    beforeEach(async () => {
      // Create test merchants
      const merchants = [
        {
          externalId: "test-1",
          domain: "test1.myshopify.com",
          platform: "shopify",
          name: "Test Store 1",
        },
        {
          externalId: "test-2",
          domain: "test2.myshopify.com",
          platform: "shopify",
          name: "Test Store 2",
        },
      ];

      for (const merchant of merchants) {
        await request(app.getHttpServer()).post("/merchants").send(merchant);
      }
    });

    it("should return all merchants", () => {
      return request(app.getHttpServer())
        .get("/merchants")
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.merchants)).toBe(true);
          expect(res.body.merchants.length).toBe(2);
          expect(res.body.merchants[0]).toHaveProperty("guid");
          expect(res.body.merchants[0]).toHaveProperty("externalId");
          expect(res.body.merchants[0]).toHaveProperty("domain");
          expect(res.body.merchants[0]).toHaveProperty("platform");
          expect(res.body.merchants[0]).toHaveProperty("name");
        });
    });
  });

  describe("/merchants/:guid (GET)", () => {
    let merchantGuid: string;

    beforeEach(async () => {
      // Create a test merchant and store its GUID
      const response = await request(app.getHttpServer())
        .post("/merchants")
        .send({
          externalId: "test-get-one",
          domain: "test-get-one.myshopify.com",
          platform: "shopify",
          name: "Test Get One Store",
        });

      merchantGuid = response.body.guid;
    });

    it("should return a merchant by guid", () => {
      return request(app.getHttpServer())
        .get(`/merchants/${merchantGuid}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("guid", merchantGuid);
          expect(res.body).toHaveProperty("externalId", "test-get-one");
          expect(res.body).toHaveProperty(
            "domain",
            "test-get-one.myshopify.com",
          );
        });
    });

    it("should return 404 for non-existent merchant", () => {
      return request(app.getHttpServer())
        .get("/merchants/non-existent-guid")
        .expect(404);
    });
  });

  describe("/health (GET)", () => {
    it("should return health check status", () => {
      return request(app.getHttpServer())
        .get("/health")
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty("status", "ok");
          expect(res.body).toHaveProperty("timestamp");
        });
    });
  });
});
