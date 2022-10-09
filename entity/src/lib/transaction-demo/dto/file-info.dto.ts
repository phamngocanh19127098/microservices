/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class FileInfo {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    type: string;
}
