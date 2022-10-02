import { NatsStreamingTransport, Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([]),
  NatsStreamingTransport.register(
    {
     clientId: 'user-service-publisher',
     clusterId: 'my-cluster',
     connectOptions: {
       url: 'http://127.0.0.1:4222',
     },
   }
  ),
],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
