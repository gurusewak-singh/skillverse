import { Controller, Get, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { type Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    // req.user is attached by the JwtStrategy from Sprint 1
    const userId = (req.user as any).id;
    return this.usersService.update(userId, updateUserDto);
  }
}
