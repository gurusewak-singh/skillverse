import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  headline?: string;

  @Field(() => [String])
  skillsOffered: string[];

  @Field(() => [String])
  skillsWanted: string[];

  @Field(() => Float)
  avgRating: number;

  @Field()
  createdAt: Date;
}
