import { IsEmail, IsInt, IsNotEmpty, IsDateString, Min, Max } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  date: string;

  @IsInt()
  @Min(1)
  @Max(10)
  guests: number;
}
