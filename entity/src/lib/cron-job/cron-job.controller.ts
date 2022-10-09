import { Controller } from '@nestjs/common';
import { CronJobService } from './cron-job.service';

@Controller('cron-job')
export class CronJobController {
    constructor(private cronJobService: CronJobService) { }
}
