import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type Request } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Req() req: Request, @Body() createBookingDto: CreateBookingDto) {
    const learnerId = (req.user as any).id;
    return this.bookingService.create(learnerId, createBookingDto);
  }

  @Patch(':sessionId/confirm')
  confirm(@Req() req: Request, @Param('sessionId') sessionId: string) {
    const mentorId = (req.user as any).id;
    return this.bookingService.confirm(sessionId, mentorId);
  }

  @Patch(':sessionId/cancel')
  cancel(@Req() req: Request, @Param('sessionId') sessionId: string) {
    const userId = (req.user as any).id;
    return this.bookingService.cancel(sessionId, userId);
  }
}
