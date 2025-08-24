import { IsOptional, IsString, IsArray, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  profileImage?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skillsOffered?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skillsWanted?: string[];
}
