import { IsDateString, IsNotEmpty } from 'class-validator';

export class PepperQueryDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
