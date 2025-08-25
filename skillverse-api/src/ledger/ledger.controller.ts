import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type Request } from 'express';
import { PaginationDto } from './dto/pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get('balance')
  async getBalance(@Req() req: Request) {
    const userId = (req.user as any).id;
    const balance = await this.ledgerService.getUserBalance(userId);
    return { balance };
  }

  @Get('history')
  getHistory(@Req() req: Request, @Query() paginationDto: PaginationDto) {
    const userId = (req.user as any).id;
    const { page = 1, limit = 10 } = paginationDto;
    return this.ledgerService.getLedgerHistory(userId, page, limit);
  }
}
