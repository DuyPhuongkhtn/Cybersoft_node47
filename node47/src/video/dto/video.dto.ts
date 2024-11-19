import { Exclude, Expose } from "class-transformer";

export class VideoDto {
    @Exclude() // show ra ngoài
    video_id: number;

    @Expose()
    video_name: string;

    @Expose()
    thumbnail: string;

    @Expose()
    description: string;

    @Expose()
    views: number;

    @Expose()
    source: string;

    @Exclude() // ẩn field đi
    user_id: number;

    @Exclude()
    type_id: number;

    // default tất cả những attribute sẽ là required
    // => cần convert required => optional để có thể ẩn/hiện attribute mong muốn
    constructor(partial: Partial<VideoDto>) {
        Object.assign(this, partial);
    }
}