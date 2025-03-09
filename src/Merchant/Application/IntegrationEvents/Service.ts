// import { Injectable, Inject } from "@nestjs/common";
// import { ClientProxy } from "@nestjs/microservices";
// import { IntegrationEvent } from "./IntegrationEvent";

// @Injectable()
// export class EventsService {
//   constructor(
//     @Inject("MERCHANT_SERVICE") private readonly client: ClientProxy,
//   ) {}

//   async publish<T extends IntegrationEvent>(event: T): Promise<void> {
//     await this.client.emit(event.constructor.name, event).toPromise();
//   }
// }
