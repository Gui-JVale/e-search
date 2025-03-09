// import { Module } from "@nestjs/common";
// import { ClientsModule, Transport } from "@nestjs/microservices";
// import { EventsService } from "./Events.service";
// import { EventHandlers } from "./Handlers";

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: "MERCHANT_SERVICE",
//         transport: Transport.RMQ,
//         options: {
//           urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
//           queue: "merchant_queue",
//           queueOptions: {
//             durable: true,
//           },
//         },
//       },
//     ]),
//   ],
//   providers: [EventsService, ...EventHandlers],
//   exports: [EventsService],
// })
// export class EventsModule {}
