import { Test, TestingModule } from '@nestjs/testing';
import { ReactResolver } from './react.resolver';
import { ReactService } from './react.service';

describe('ReactResolver', () => {
  let resolver: ReactResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactResolver, ReactService],
    }).compile();

    resolver = module.get<ReactResolver>(ReactResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
