import { Inject, Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";

@Injectable() // Dependency injection để nhúng vào module
export class CloudinaryUploadService {
    constructor(@Inject('CLOUDINARY') private cloudinary) {}

    async uploadImage(file: Express.Multer.File, destination: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream(
                {folder: destination}, //define folder trên cloudinary. Nếu folder không có trên cloudinary thì sẽ tạo folder mới
                (error: any, result: UploadApiResponse) => { // upload hình lên cloudinary
                    if(error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(file.buffer); // sau khi config xong thì gửi file lên network
        })
    }
}