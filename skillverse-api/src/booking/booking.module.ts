import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [LedgerModule], // Import to get access to LedgerService
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
