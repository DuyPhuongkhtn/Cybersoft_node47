import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateVideoDto {
    @IsNotEmpty({message: "Video name không được để trống"})
    @ApiProperty() // show attribute ra ngoài giao diện swagger
    video_name: string;

    @IsNotEmpty({message:"thumbnail không được để trống"})
    @ApiProperty()
    thumbnail: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    views: number;

    @ApiProperty()
    source: string;

    // @ApiProperty()
    user_id: number;

    @ApiProperty()
    type_id: number;
}

// DTO cho upload 1 hình ảnh
export class FileUploadDto {
    @ApiProperty({type: 'string', format:'binary'})
    hinhAnh: any;
}

// DTO cho upload nhiều hình ảnh
export class FilesUploadDto {
    @ApiProperty({type: 'array', items: {type: 'string', format: 'binary'}})
    hinhAnhs: any[];
}
