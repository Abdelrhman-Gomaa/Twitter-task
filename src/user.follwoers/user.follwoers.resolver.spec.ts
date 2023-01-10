import { Test, TestingModule } from '@nestjs/testing';
import { UserFollwoersResolver } from './user.follwoers.resolver';
import { UserFollwoersService } from './user.follwoers.service';

describe('UserFollwoersResolver', () => {
  let resolver: UserFollwoersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollwoersResolver, UserFollwoersService],
    }).compile();

    resolver = module.get<UserFollwoersResolver>(UserFollwoersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
