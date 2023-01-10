import { Test, TestingModule } from '@nestjs/testing';
import { UserFollwoersService } from './user.follwoers.service';

describe('UserFollwoersService', () => {
  let service: UserFollwoersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollwoersService],
    }).compile();

    service = module.get<UserFollwoersService>(UserFollwoersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
