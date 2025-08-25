import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':id/complete')
  completeSession(@Req() req: Request, @Param('id') sessionId: string) {
    const mentorId = (req.user as any).id;
    return this.sessionsService.completeSession(sessionId, mentorId);
  }

  @Get(':id/video-token')
  getVideoToken(@Req() req: Request, @Param('id') sessionId: string) {
    const userId = (req.user as any).id;
    return this.sessionsService.generateVideoToken(sessionId, userId);
  }
}
