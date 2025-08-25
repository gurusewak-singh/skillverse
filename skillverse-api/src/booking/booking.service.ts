import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { LedgerService } from '../ledger/ledger.service';
import { SessionStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private ledgerService: LedgerService,
  ) {}

  async create(learnerId: string, createBookingDto: CreateBookingDto) {
    const { hostId, scheduledTime, duration } = createBookingDto;

    if (learnerId === hostId) {
      throw new BadRequestException('You cannot book a session with yourself.');
    }

    // Check if the mentor (host) exists
    const host = await this.prisma.user.findUnique({ where: { id: hostId } });
    if (!host) {
      throw new NotFoundException('Mentor not found.');
    }

    // **CRITICAL**: Check if the learner has enough credits
    const learnerBalance = await this.ledgerService.getUserBalance(learnerId);
    if (learnerBalance < 1) {
      // In the future, this could be a 402 Payment Required error
      throw new ForbiddenException(
        'Insufficient credits. Please purchase more to book a session.',
      );
    }

    // Create the Session and Booking in a single transaction
    const newSession = await this.prisma.session.create({
      data: {
        hostId,
        learnerId,
        scheduledTime: new Date(scheduledTime),
        duration,
        status: SessionStatus.PENDING, // Starts as pending mentor confirmation
        booking: {
          create: {
            learnerId,
            status: 'PENDING_CONFIRMATION',
          },
        },
      },
      include: {
        booking: true, // Include the created booking in the return object
      },
    });

    return newSession;
  }

  async confirm(sessionId: string, mentorId: string) {
    const session = await this.findSessionForParticipant(sessionId, mentorId);

    if (session.hostId !== mentorId) {
      throw new ForbiddenException('Only the mentor can confirm this session.');
    }

    if (session.status !== SessionStatus.PENDING) {
      throw new BadRequestException('This session cannot be confirmed.');
    }

    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.CONFIRMED,
        booking: {
          update: {
            status: 'CONFIRMED',
          },
        },
      },
    });
  }

  async cancel(sessionId: string, userId: string) {
    const session = await this.findSessionForParticipant(sessionId, userId);

    if (session.status === SessionStatus.COMPLETED || session.status === SessionStatus.CANCELLED) {
      throw new BadRequestException('This session cannot be cancelled.');
    }

    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.CANCELLED,
        booking: {
          update: {
            status: 'CANCELLED',
          },
        },
      },
    });
  }

  // Helper function to ensure a user is part of a session before acting on it
  private async findSessionForParticipant(sessionId: string, userId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Session not found.');
    }

    if (session.hostId !== userId && session.learnerId !== userId) {
      throw new ForbiddenException(
        'You are not a participant in this session.',
      );
    }

    return session;
  }
}
