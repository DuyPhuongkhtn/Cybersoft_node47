import { VideoDto } from "./video.dto";

export class ListVideoDto {
    videos: VideoDto[];

    page: number;

    size: number;
}