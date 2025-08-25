import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  hostId: string; // The ID of the mentor the user wants to book

  @IsNotEmpty()
  @IsDateString()
  scheduledTime: string; // ISO 8601 format string

  @IsNotEmpty()
  @IsInt()
  @Min(30) // Minimum session duration of 30 minutes
  duration: number;
}
