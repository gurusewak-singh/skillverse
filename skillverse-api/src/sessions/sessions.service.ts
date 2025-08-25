import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerService } from '../ledger/ledger.service';
import { LedgerEntryType, SessionStatus } from '@prisma/client';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(
    private prisma: PrismaService,
    private ledgerService: LedgerService,
  ) {}

  /**
   * Marks a session as complete and executes the atomic credit exchange.
   * @param sessionId The ID of the session to complete.
   * @param mentorId The ID of the user attempting to complete the session (must be the host).
   * @returns The updated session object.
   */
  async completeSession(sessionId: string, mentorId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Session not found.');
    }
    if (session.hostId !== mentorId) {
      throw new ForbiddenException(
        'Only the mentor can complete this session.',
      );
    }
    if (session.status !== SessionStatus.CONFIRMED) {
      throw new BadRequestException(
        'Only a confirmed session can be completed.',
      );
    }

    // **CRITICAL ATOMIC TRANSACTION**
    // This ensures that all database operations succeed or all of them fail.
    // The ledger remains consistent.
    try {
      const updatedSession = await this.prisma.$transaction(async (tx) => {
        // 1. Update the session status to COMPLETED
        const completedSession = await tx.session.update({
          where: { id: sessionId },
          data: { status: SessionStatus.COMPLETED },
        });

        // 2. Debit the learner's account (-1 credit)
        await this.ledgerService.addLedgerEntryWithTransaction(tx, {
          userId: session.learnerId,
          amount: -1,
          type: LedgerEntryType.SPENT,
          referenceId: sessionId,
        });

        // 3. Credit the mentor's account (+1 credit)
        await this.ledgerService.addLedgerEntryWithTransaction(tx, {
          userId: session.hostId,
          amount: 1,
          type: LedgerEntryType.EARNED,
          referenceId: sessionId,
        });

        this.logger.log(
          `Session ${sessionId} completed. Credit exchanged between learner ${session.learnerId} and mentor ${session.hostId}.`,
        );

        return completedSession;
      });
      return updatedSession;
    } catch (error) {
      this.logger.error(
        `Transaction failed for completing session ${sessionId}`,
        error,
      );
      throw new BadRequestException(
        'Failed to complete session. Please try again.',
      );
    }
  }

  /**
   * Generates a token for a real-time video session.
   * In a real application, this would involve an SDK like Agora or Daily.
   * For now, we will simulate it.
   * @param sessionId The ID of the session.
   * @param userId The ID of the user requesting the token.
   * @returns A simulated video session token.
   */
  async generateVideoToken(sessionId: string, userId: string) {
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
    if (session.status !== SessionStatus.CONFIRMED) {
      throw new BadRequestException(
        'Video session can only be joined for confirmed sessions.',
      );
    }

    // --- SIMULATED TOKEN GENERATION ---
    // In a real implementation, you would replace this with:
    // const agoraToken = Agora.RtcTokenBuilder.buildTokenWithUid(...);
    // return { token: agoraToken };
    const simulatedToken = `SIMULATED_TOKEN_FOR_SESSION_${sessionId}_USER_${userId}_${Date.now()}`;
    this.logger.log(`Generated video token for session ${sessionId}`);

    return { token: simulatedToken };
  }
}
