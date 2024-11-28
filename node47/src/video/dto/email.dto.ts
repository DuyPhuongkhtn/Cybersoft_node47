import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailDto {
    @IsEmail() // decorator để validate email
    @ApiProperty() // decorator để swagger biết và show lên UI
    emailTo: string;

    @IsNotEmpty()
    @ApiProperty()
    subject: string;

    @IsNotEmpty()
    @ApiProperty()
    text: string;
}