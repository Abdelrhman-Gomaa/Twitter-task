import { Module } from '@nestjs/common';
import { ReactService } from './react.service';
import { ReactResolver } from './react.resolver';

@Module({
  providers: [ReactResolver, ReactService]
})
export class ReactModule {}
