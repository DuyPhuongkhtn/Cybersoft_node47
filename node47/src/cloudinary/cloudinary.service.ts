import {v2 as cloudinary} from 'cloudinary';

export const CloudinaryService = {
    provide: "CLOUDINARY",
    useFactory: () => cloudinary
}