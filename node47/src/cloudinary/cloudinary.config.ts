import {v2 as cloudinary} from 'cloudinary';
import {ConfigService} from '@nestjs/config';
import { Injectable } from '@nestjs/common';

// Dependency injection
@Injectable()
export class CloudinaryConfig {
    constructor(private configService: ConfigService) {
        console.log("get data: ", this.configService.get('CLOUDINARY_API_KEY'));
        cloudinary.config({
            cloud_name: "dbpwsvpav",
            api_key: "243795571771327",
            api_secret: "V5Aw67uK9AmIfnkJJcox7RaSVos"
        })
    }
}
