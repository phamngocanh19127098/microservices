import { NatsStreamingTransport, Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([]),
  NatsStreamingTransport.register(
    {
      clientId: process.env.NATS_CLIENT_ID,
      clusterId: process.env.NATS_CLUSTER,
       connectOptions: {
        url: process.env.NATS_HOST,
      },
    }
  ),
    RedisCacheModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
