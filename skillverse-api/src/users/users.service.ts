import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        reviewsReceived: {
          include: {
            reviewer: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findAllMentors(params: { skill?: string; page?: number }) {
    const { skill, page = 1 } = params;
    const take = 10; // 10 mentors per page
    const skip = (page - 1) * take;

    const where = skill ? { skillsOffered: { has: skill } } : {};

    const users = await this.prisma.user.findMany({
      where,
      take,
      skip,
      select: {
        // Explicitly select fields to avoid leaking password
        id: true,
        name: true,
        profileImage: true,
        bio: true,
        headline: true,
        skillsOffered: true,
        skillsWanted: true,
        avgRating: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        avgRating: 'desc',
      },
    });

    return users;
  }
}
