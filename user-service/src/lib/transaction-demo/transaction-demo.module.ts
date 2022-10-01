import { Module } from '@nestjs/common';
import { TransactionDemoService } from './transaction-demo.service';
import { TransactionDemoController } from './transaction-demo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionDemoRepository } from './transaction-demo.repository';
import { AwsModule } from 'src/lib/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionDemoRepository]), AwsModule],
  providers: [TransactionDemoService],
  controllers: [TransactionDemoController],
  exports: [TransactionDemoService],
})
export class TransactionDemoModule {}
