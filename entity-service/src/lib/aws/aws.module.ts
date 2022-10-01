import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsService } from './aws.service';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: `env/${process.env.NODE_ENV || 'local'}.env`
    })
],
  providers: [AwsService , ConfigService],
  exports: [AwsService],
})
export class AwsModule {}
