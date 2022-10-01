import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDemoDto } from './dto/create-demo.dto';
import { FileInfo } from './dto/file-info.dto';
import { TransactionDemoService } from './transaction-demo.service';

@Controller('transaction-demo')
export class TransactionDemoController {

    constructor(
        private transactionDemoService: TransactionDemoService,
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getDemoFunction(
        //Some params
        @Query('id') id: number
    ){
        return this.transactionDemoService.getDemoFunction(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    postDemoFunction(
        @Body(ValidationPipe) createDemoDto : CreateDemoDto,
    ){
        return this.transactionDemoService.postDemoFunction(createDemoDto);
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    // @UsePipes(ValidationPipe) //can use dto to update
    putDemoFunction(
        // @Body(ValidationPipe) updateDemoDto : CreateDemoDto,
        @Query('id') id: number,
        @Query('action') action: string
    ){
        return this.transactionDemoService.putDemoFunction(id , action);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    deleteDemoFunction(
        @Query('id') id: number,
    ){
        return this.transactionDemoService.deleteDemoFunction(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    transactionMoreTableAtservice(
        @Body(ValidationPipe) createDemoDto : CreateDemoDto,
    ){
        return this.transactionDemoService.transactionMoreTableAtservice(createDemoDto);
    }


    //Upload Image Demo
    @Post('/image')
    @UseGuards(AuthGuard('jwt'))
    async getPreSignedUrl(
        @Body(ValidationPipe) fileInfo: FileInfo) {
        return await this.transactionDemoService.getPreSignedUrlToUpload(fileInfo);
    }
}
