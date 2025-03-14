// import { Module } from '@nestjs/common';
// import { ImageService } from './image.service';
// import { ImageController } from './image.controller';
// import { PrismaService } from '@modules/prisma/prisma.service';

// @Module({
//   controllers: [ImageController],
//   providers: [ImageService, PrismaService],
// })
// export class ImageModule {}

import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from '@modules/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../uploads'),
        filename: (req, file, callback) => {
          callback(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, PrismaService],
})
export class ImageModule {}


