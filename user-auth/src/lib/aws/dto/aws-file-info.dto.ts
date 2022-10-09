import { IsNotEmpty } from "class-validator";

import { AwsBucketAction } from "../enum/aws-bucket-action.enum";

export class AwsFileInfo {
    @IsNotEmpty()
    bucketAction: AwsBucketAction;
    @IsNotEmpty()
    key: string;
    @IsNotEmpty()
    contentType: string;
    ACL: string;
}
