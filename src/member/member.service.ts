import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './repositories/member.repository';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  create(createMemberDto: CreateMemberDto) {
    return this.memberRepository.create(createMemberDto);
  }

  findAll() {
    return this.memberRepository.findAll();
  }

  findOne(code: string) {
    return this.memberRepository.findOne({ code });
  }

  update(code: string, updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update({
      where: { code },
      data: updateMemberDto,
    });
  }

  remove(code: string) {
    return this.memberRepository.remove({ code });
  }
}
