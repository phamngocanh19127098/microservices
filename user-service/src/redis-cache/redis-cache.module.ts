import { Module, CacheModule } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheController } from './redis-cache.controller';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIST_PORT'),
        auth_pass: configService.get('REDIST_AUTH_PASS'),
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
  controllers: [RedisCacheController]
})
export class RedisCacheModule {}
