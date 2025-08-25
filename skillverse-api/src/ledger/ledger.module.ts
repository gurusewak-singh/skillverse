import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LedgerController],
  providers: [LedgerService, PrismaService],
  exports: [LedgerService],
})
export class LedgerModule {}
