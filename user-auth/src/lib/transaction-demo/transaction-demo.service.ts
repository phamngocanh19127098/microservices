import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from 'src/lib/aws/aws.service';
import { AwsFileInfo } from 'src/lib/aws/dto/aws-file-info.dto';
import { AwsBucketAction } from 'src/lib/aws/enum/aws-bucket-action.enum';
import { StorageFolderNameEnum } from 'src/lib/aws/enum/storage-folder-name.enum';
import { Connection } from 'typeorm';
import { TransactionDemoRepository } from './transaction-demo.repository';

@Injectable()
export class TransactionDemoService {

    constructor(
        @InjectRepository(TransactionDemoRepository)
        private transactionDemoRepository: TransactionDemoRepository,

        private connection: Connection ,//To create transaction 
        private awsService : AwsService
    ) {}

    async getDemoFunction(id){
        return this.transactionDemoRepository.getDemoFunction(id);
    }

    async postDemoFunction(createDemoDto){ //Transaction in repository
        return this.transactionDemoRepository.postDemoFunction(createDemoDto);
    }

    async putDemoFunction(id , action){
        return this.transactionDemoRepository.putDemoFunction(id , action);
    }

    async deleteDemoFunction(id){
        return this.transactionDemoRepository.deleteDemoFunction(id);
    }

    async transactionMoreTableAtservice(createDemoDto){ //Call some services to update some tables
        try{ //Use only 1 try ... catch at start service;
            let demoEx
            await this.connection.manager.transaction(async transactionalEntityManager =>{ //Call service .....
                // demoEx =  await this.transactionDemoRepository.testTransaction(variable , transactionalEntityManager); 
                if(demoEx.code === 200)
                {
                    await this.transactionDemoRepository.testTransaction1(createDemoDto.updated_by_user_id , createDemoDto.action,transactionalEntityManager)
                }
            })
            return demoEx
        }catch(error){
            console.log(error);
            throw new InternalServerErrorException("Error saving data to database");
        }
    }

    //Get preURL upload image AWS
    async getPreSignedUrlToUpload(fileInfo) {
        const response = await this.awsService.escapeRegExpInFileName(fileInfo.name);
    
        const awsFileInfo: AwsFileInfo = new AwsFileInfo();
        awsFileInfo.bucketAction = AwsBucketAction.PutObject;
        awsFileInfo.key = `${StorageFolderNameEnum.DEMO_PHOTO}/demo_image_${response.file_name}`;
        awsFileInfo.contentType = fileInfo.type;
        const awsResult = await this.awsService.getPreSignedUrlToUpload(awsFileInfo);
    
        if (awsResult.code === 200) {
            awsResult['key'] = awsFileInfo.key;
            return awsResult;
        }
    }

    
}
