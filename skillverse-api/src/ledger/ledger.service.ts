import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LedgerEntryType } from '@prisma/client';

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calculates the current credit balance for a given user.
   * This is the source of truth for a user's balance.
   * @param userId The ID of the user.
   * @returns The user's total credit balance.
   */
  async getUserBalance(userId: string): Promise<number> {
    const result = await this.prisma.ledgerEntry.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
      },
    });
    return result._sum.amount || 0;
  }

  /**
   * Retrieves a paginated history of a user's ledger entries.
   * @param userId The ID of the user.
   * @param page The page number for pagination.
   * @param limit The number of items per page.
   * @returns A list of ledger entries.
   */
  async getLedgerHistory(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.prisma.ledgerEntry.findMany({
      where: { userId },
      take: limit,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * The single, trusted entry point for creating all credit transactions.
   * This will be called by other services (Payments, Sessions) in future sprints.
   * @param data The details of the ledger entry to create.
   * @returns The newly created ledger entry.
   */
  async addLedgerEntry(data: {
    userId: string;
    amount: number;
    type: LedgerEntryType;
    referenceId: string;
  }) {
    return this.prisma.ledgerEntry.create({
      data,
    });
  }
}
