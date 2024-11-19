import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Response } from 'express';
import { ApiQuery } from '@nestjs/swagger';
import { VideoDto } from './dto/video.dto';
import { ListVideoDto } from './dto/list-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Res() res: Response
  ): Promise<Response<VideoDto>> {
    let newVideo = await this.videoService.create(createVideoDto);
    return res.status(HttpStatus.CREATED).json(newVideo);
  }
  // page, size, keyword <= query
  @Get()
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'size', required: false, type: Number})
  @ApiQuery({name: "keyword", required: false, type: String})
  async findAll(
    @Query('page') page: number, // by default thì query trên swagger sẽ là required
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res: Response
  ): Promise<Response<ListVideoDto>> {
    // by default các value như query, param, header,....se có kiểu dữ liệu là string
    // => phải ép kiểu về đúng định dạng
    const formatPage = page ? Number(page): 1;
    const formatSize = size ? Number(size): 10;
    let videos = await this.videoService.findAll(formatPage, formatSize, keyword);
    return res.status(HttpStatus.OK).json({videos, page, size});
    // [
    //   {
    //     "video_name": "Introduction to Coding",
    //     "thumbnail": "deadpool.jpg",
    //     "description": "Learn the basics of coding",
    //     "views": 1500,
    //     "source": "youtube.com"
    //   }
    //   page:1,
    //   size: 10
    // ]
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
