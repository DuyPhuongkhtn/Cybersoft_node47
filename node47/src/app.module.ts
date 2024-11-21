import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // load tất cả các biến môi trường và sử dụng nhiều nơi
    }),
    UserModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
