import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => [UserEntity], { name: 'mentors' })
  findAllMentors(
    @Args('skill', { type: () => String, nullable: true }) skill?: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page?: number,
  ) {
    return this.usersService.findAllMentors({ skill, page });
  }
}
