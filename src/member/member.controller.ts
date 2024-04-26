import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The member has been successfully created.',
    type: CreateMemberDto,
  })
  @ApiConflictResponse({
    description: 'The member already exists.',
  })
  @ApiBadRequestResponse({
    description: 'The request is invalid.',
  })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The members have been successfully retrieved.',
    type: [CreateMemberDto],
  })
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':code')
  @ApiOkResponse({
    description: 'The member has been successfully retrieved.',
    type: CreateMemberDto,
  })
  @ApiNotFoundResponse({
    description: 'The member does not exist.',
  })
  findOne(@Param('code') code: string) {
    return this.memberService.findOne(code);
  }

  @Patch(':code')
  @ApiOkResponse({
    description: 'The member has been successfully updated.',
    type: CreateMemberDto,
  })
  @ApiNotFoundResponse({
    description: 'The member does not exist.',
  })
  @ApiConflictResponse({
    description: 'The member already exists.',
  })
  update(
    @Param('code') code: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(code, updateMemberDto);
  }

  @Delete(':code')
  @ApiOkResponse({
    description: 'The member has been successfully removed.',
    type: CreateMemberDto,
  })
  @ApiNotFoundResponse({
    description: 'The member does not exist.',
  })
  remove(@Param('code') code: string) {
    return this.memberService.remove(code);
  }
}
