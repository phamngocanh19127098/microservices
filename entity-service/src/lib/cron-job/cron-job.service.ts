import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronJobService {
    private readonly logger = new Logger(CronJobService.name);

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Singapore' })
    async CronExample() {
      this.logger.debug('CronExample run every 12:00 AM');
      if (!this.checkCronJobProcess()) { return; }
      else {
        // To do function cron-job
      }

    }

    private checkCronJobProcess() {
        if (process.env.NODE_APP_INSTANCE === '0' || process.env.NODE_APP_INSTANCE === null || process.env.NODE_APP_INSTANCE === undefined) {
          this.logger.debug(`CONTINUE JOB AT PROCESS ${process.env.NODE_APP_INSTANCE}`);
          return true;
        } else {
          this.logger.debug(`CANCEL JOB AT PROCESS ${process.env.NODE_APP_INSTANCE}`);
          return false;
        }
    }
}
