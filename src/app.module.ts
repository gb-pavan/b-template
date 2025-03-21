import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [PrismaModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
