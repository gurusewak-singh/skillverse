import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type Request } from 'express';
import { CreateReviewDto } from './dto/create-review.dto';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Req() req: Request, @Body() createReviewDto: CreateReviewDto) {
    const reviewerId = (req.user as any).id;
    return this.reviewsService.create(reviewerId, createReviewDto);
  }
}
