import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // load tất cả các biến môi trường và sử dụng nhiều nơi
    }),
    UserModule, VideoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
