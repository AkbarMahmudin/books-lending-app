import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Is the member currently on penalty?',
  })
  @IsOptional()
  @IsBoolean()
  isPenalty?: boolean;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'The date end the penalty',
  })
  @IsOptional()
  @IsDateString()
  endPenaltyDate?: Date;
}
