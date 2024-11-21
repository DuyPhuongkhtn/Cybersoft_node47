import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { CloudinaryUploadService } from "./cloud-upload.service";

@Module({
    imports: [CloudinaryModule], // import module CloudinaryModule vào SharedModule
    providers:[CloudinaryUploadService],
    exports: [CloudinaryUploadService] // export CloudinaryService để sử dụng ở các module khác
})
export class SharedModule{}