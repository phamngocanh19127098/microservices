import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @Get('/sign-in')
    signIn(

    ) {
        return { code: 200, message: 'Login successfull.', version: 1.1 };
    }

    @Get('/hello') async getHello() {
        return await this.customerService.getHello()
    }

}
