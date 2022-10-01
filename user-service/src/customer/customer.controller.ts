import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {

    @Get('/sign-in')
    signIn(
        
        ) {
        return {code : 200, message:'Login successfull.', version : 1.1};
    }
}
