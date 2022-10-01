import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { CronJobController } from './cron-job.controller';

@Module({
  imports: [],
  providers: [CronJobService],
  controllers: [CronJobController]
})
export class CronJobModule {}
