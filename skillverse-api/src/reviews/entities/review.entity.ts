import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
export class ReviewEntity {
  @Field(() => ID)
  id: string;

  @Field(() => UserEntity) // We can show who left the review
  reviewer: UserEntity;

  @Field(() => Int)
  rating: number;

  @Field({ nullable: true })
  comment?: string;

  @Field()
  createdAt: Date;
}
