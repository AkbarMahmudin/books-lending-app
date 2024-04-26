import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: Boolean,
    description: 'Is the member currently on penalty?',
  })
  isPenalty: boolean;

  @ApiProperty({
    type: Date,
    description: 'The date end the penalty',
  })
  endPenalty: Date;
}
