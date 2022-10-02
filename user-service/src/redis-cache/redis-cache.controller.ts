import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisCacheService } from './redis-cache.service';

@ApiTags('api/v1/redis-cache')
@Controller('api/v1/redis-cache')
export class RedisCacheController {
    constructor(
        private redisCacheService: RedisCacheService
    ){}

    // @Get('/:key')
    // test(@Param('key') key){
    //     return this.redisCacheService.get(key)
    // }

    // @Post('/:key/:value')
    // set(@Param('key') key, @Param('value') value) {
    //     this.redisCacheService.set(key, value)
    // }
}
