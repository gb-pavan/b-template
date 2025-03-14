import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';
import { diskStorage, memoryStorage } from 'multer';


@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Use memory storage
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.imageService.uploadImage(file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: 200, description: 'List of images' })
  async getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an image by ID' })
  @ApiResponse({ status: 200, description: 'Image details' })
  async getImageById(@Param('id') id: string) {
    const image = await this.imageService.getImageById(id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }
}




