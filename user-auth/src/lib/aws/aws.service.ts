import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { AwsFileInfo } from './dto/aws-file-info.dto';
import { AwsBucketAction } from './enum/aws-bucket-action.enum';
import { S3AclType } from './enum/aws-s3-acl.enum';

@Injectable()
export class AwsService {
    AWS_S3_BUCKET_NAME: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    s3: AWS.S3;

    constructor(private configService: ConfigService) {
        this.AWS_S3_BUCKET_NAME = configService.get<string>('AWS_S3_BUCKET_NAME');
        this.AWS_ACCESS_KEY_ID = configService.get<string>('AWS_ACCESS_KEY_ID');
        this.AWS_SECRET_ACCESS_KEY = configService.get<string>('AWS_SECRET_ACCESS_KEY');
        AWS.config.update({
            accessKeyId: this.AWS_ACCESS_KEY_ID,
            secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
            region: 'ap-southeast-1'
        });
        this.s3 = new AWS.S3();
    }

    async uploadFile(dataBuffer: Buffer, fileName : string){
        const uploadResult = await this.s3.upload({
            Bucket : this.AWS_S3_BUCKET_NAME,
            Body: dataBuffer,
            Key: fileName
        }).promise()

        return uploadResult.Key
    }

    async generatePresignUrlToDownLoad(key : string){
        return await this.s3.getSignedUrlPromise(AwsBucketAction.GetObject,{
            Bucket: this.AWS_S3_BUCKET_NAME,
            Key : key
        })
    }

    async getPreSignedUrlToUpload(awsFileInfo: AwsFileInfo) {
        try {
            const url = this.s3.getSignedUrl(awsFileInfo.bucketAction, {
                Bucket: this.AWS_S3_BUCKET_NAME,
                Key: awsFileInfo.key,
                Expires: 60,
                ACL: S3AclType.PUBLIC_READ,
                ContentType: awsFileInfo.contentType
            });

            return { code: 200, url };
        }
        catch (error) {
            return { code: 500, awsError: error };
        }
    }


    async escapeRegExpInFileName (fileName: string) {
        return {file_name:fileName.replace(/[*!.=_,@&;: +\-?^${}()|/]/g, '3DD').substr(0,150)}; 
      }
}
