import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [SharedModule] // import SharedModule để sử dụng CloudinaryService
})
export class VideoModule {}
