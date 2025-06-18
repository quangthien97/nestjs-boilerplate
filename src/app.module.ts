import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // <-- Thêm vào mảng imports
      isGlobal: true, // Giúp ConfigModule có sẵn ở mọi nơi mà không cần import lại
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
