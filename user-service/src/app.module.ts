import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobModule } from 'src/lib/cron-job/cron-job.module';
import { HealthController } from 'src/lib/health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { AwsModule } from 'src/lib/aws/aws.module';
import { AppGateway } from './app.gateway';
import { CustomerModule } from './customer/customer.module';
@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'local'}.env`,
    }),
    ScheduleModule.forRoot(),
    CronJobModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      // eslint-disable-next-line prettier/prettier
      useFactory: async (configService: ConfigService) => 
        ({
          type: configService.get<string>('TYPEORM_DATABASE_TYPE'),
          host: configService.get<string>('TYPEORM_DATABASE_HOST'),
          port: Number(configService.get<string>('TYPEORM_DATABASE_PORT')),
          username: configService.get<string>('TYPEORM_DATABASE_USERNAME'),
          password: configService.get<string>('TYPEORM_DATABASE_PASSWORD'),
          database: configService.get<string>('TYPEORM_DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: false,
          useUTC: false,
          uuidExtension: 'uuid-ossp',
        } as TypeOrmModuleOptions),
    }),
    TerminusModule,
    AwsModule,
    CustomerModule,
  ],
  controllers: [HealthController],
  providers: [AppGateway],
})
export class AppModule {}
