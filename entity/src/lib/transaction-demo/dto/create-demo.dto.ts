import { IsNotEmpty, IsNumber, MaxLength } from "class-validator"

export class CreateDemoDto {
    @IsNotEmpty()
    @MaxLength(100)
    demo_name:string;

    @IsNotEmpty()
    @MaxLength(255)
    action: string;

    @IsNotEmpty()
    @IsNumber()
    updated_by_user_id: number;

    testArr = []

}