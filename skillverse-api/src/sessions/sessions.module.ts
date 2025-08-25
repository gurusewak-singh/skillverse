import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { LedgerModule } from '../ledger/ledger.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [LedgerModule], // To inject LedgerService
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService],
})
export class SessionsModule {}
