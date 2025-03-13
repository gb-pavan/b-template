import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(); // Calls the PrismaClient constructor
  }

  async onModuleInit() {
    await this.$connect();
    console.log('🚀 Connected to MongoDB');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Disconnected from MongoDB');
  }
}

