import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Express } from 'express';
import { join } from 'path';
import { promises as fs } from 'fs';
import { ObjectId } from 'bson';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  // async uploadImage(file: Express.Multer.File) {
  //   try {
  //     if (!file || !file.buffer) {
  //       throw new BadRequestException('File buffer is empty');
  //     }

  //     // 🔥 Fix: Get absolute path safely
  //     const baseDir = process.cwd(); // Gets the root directory
  //     const uploadDir = join(baseDir, 'uploads'); // Store images in 'uploads/' at project root
  //     console.log('Resolved upload directory:', uploadDir);

  //     await fs.mkdir(uploadDir, { recursive: true });

  //     const uploadPath = join(uploadDir, file.originalname);
  //     console.log('Saving file to:', uploadPath);

  //     await fs.writeFile(uploadPath, file.buffer);

  //     // Save image metadata to DB
  //     const image = await this.prisma.image.create({
  //       data: {
  //         filename: file.originalname,
  //         path: uploadPath,
  //       },
  //     });

  //     console.log('Image uploaded successfully:', image);

  //     return { message: 'Image uploaded successfully', image };
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     throw new InternalServerErrorException('Failed to upload image');
  //   }
  // }

async uploadImage(file: Express.Multer.File) {
  try {
    if (!file || !file.buffer) {
      throw new BadRequestException('File buffer is empty');
    }

    const uploadDir = join(process.cwd(), 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadPath = join(uploadDir, file.originalname);
    await fs.writeFile(uploadPath, file.buffer);

    const image = await this.prisma.image.create({
      data: {
        filename: file.originalname,
        path: uploadPath,
      },
    });

    return { message: 'Image uploaded successfully', image };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new InternalServerErrorException('Failed to upload image');
  }
}


  async getAllImages() {
    return this.prisma.image.findMany();
  }

  async getImageById(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const image = await this.prisma.image.findUnique({
      where: { id },
    });

    return image;
  }
}


