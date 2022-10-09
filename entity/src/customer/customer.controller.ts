import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { UserPatterns } from 'src/common/pattern';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get('/sign-in')
    signIn(

    ) {
        return { code: 200, message: 'Login successfull.', version: 1.1 };
    }

    @Get('/hello') getHello() {
        return this.customerService.getHello()
    }

    @EventPattern(UserPatterns.UserCreated)
    public async stationCreatedHandler(@Payload() data: { id: number, name: string }, @Ctx() context: NatsStreamingContext) {
        console.log(`received message: ${JSON.stringify(data)}`)
        context.message.ack()
    }

    @EventPattern(UserPatterns.UserUpdated)
    public async stationUpdatedHandler(@Payload() data: {message : string}, @Ctx() context: NatsStreamingContext){
        console.log(`received message: ${JSON.stringify(data)}`);
        context.message.ack();
    }
}
