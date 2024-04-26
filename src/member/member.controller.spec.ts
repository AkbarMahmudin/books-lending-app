import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MemberRepository } from './repositories/member.repository';

describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [MemberController],
      providers: [MemberService, MemberRepository],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a member', async () => {
    const member = await controller.create({
      code: '001',
      name: 'John Doe',
    });

    expect(member).toBeDefined();
    expect(member.code).toBe('001');
  });

  it('should find all members', async () => {
    const members = await controller.findAll();
    expect(members).toBeInstanceOf(Array);
  });

  it('should find a member by code', async () => {
    const member = await controller.findOne('001');
    expect(member).toBeDefined();
    expect(member.code).toBe('001');
  });

  it('should update a member by code', async () => {
    const member = await controller.update('001', {
      name: 'Jane Doe Updated',
    });
    expect(member).toBeDefined();
    expect(member.name).toEqual('Jane Doe Updated');
  });

  it('should remove a member by code', async () => {
    const member = await controller.remove('001');
    expect(member).toBeDefined();
  });
});
