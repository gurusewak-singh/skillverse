import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { SessionStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(reviewerId: string, createReviewDto: CreateReviewDto) {
    const { sessionId, rating, comment } = createReviewDto;

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { review: true }, // Check if a review already exists
    });

    // --- VALIDATION CHECKS ---
    if (!session) {
      throw new NotFoundException('Session not found.');
    }
    if (session.status !== SessionStatus.COMPLETED) {
      throw new BadRequestException(
        'Reviews can only be left for completed sessions.',
      );
    }
    if (session.learnerId !== reviewerId && session.hostId !== reviewerId) {
      throw new ForbiddenException(
        'You were not a participant in this session.',
      );
    }
    if (session.review) {
      throw new BadRequestException(
        'A review has already been submitted for this session.',
      );
    }

    // Determine who is being reviewed
    const revieweeId =
      session.hostId === reviewerId ? session.learnerId : session.hostId;

    // --- DATABASE OPERATIONS ---
    const newReview = await this.prisma.review.create({
      data: {
        sessionId,
        reviewerId,
        revieweeId,
        rating,
        comment,
      },
    });

    // After creating the review, update the reviewee's average rating
    await this.updateUserAverageRating(revieweeId);

    return newReview;
  }

  /**
   * Recalculates and updates the average rating for a given user.
   * This should be called after a new review is created.
   * @param userId The ID of the user (the reviewee) whose rating needs updating.
   */
  private async updateUserAverageRating(userId: string) {
    const result = await this.prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        revieweeId: userId,
      },
    });

    const newAverageRating = result._avg.rating || 0;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        avgRating: parseFloat(newAverageRating.toFixed(2)), // Round to 2 decimal places
      },
    });
  }
}
