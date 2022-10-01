import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from 'aws-sdk';
import { RedisCacheService } from './redis-cache.service';

@Controller('redis-cache')
export class RedisCacheController {
    constructor(
        private redisCacheService: RedisCacheService
    ){}

    // @Get('/:key')
    // test(@Param('key') key){
    //     console.log(process.env.REDIST_PORT);
        
    //     return this.redisCacheService.get(key)
    // }

    // @Post('/:key/:value')
    // set(@Param('key') key, @Param('value') value) {
    //     this.redisCacheService.set(key, value)
    // }
}
